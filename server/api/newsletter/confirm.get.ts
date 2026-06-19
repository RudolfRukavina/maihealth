import { getAdminDb } from '../../utils/firebase-admin'
import { simplePage } from '../../utils/html-page'
import { Timestamp } from 'firebase-admin/firestore'

/**
 * Second step of the double opt-in: the link in the confirmation email.
 * Moves the subscriber from `pending` to `confirmed`.
 */
export default defineEventHandler(async (event) => {
  setHeader(event, 'content-type', 'text/html; charset=utf-8')
  const token = String(getQuery(event).token || '')

  if (!token) {
    return simplePage({ ok: false, title: 'Invalid link', message: 'This confirmation link is missing or malformed.' })
  }

  const db = getAdminDb()
  const snap = await db.collection('newsletterSubscribers')
    .where('confirmToken', '==', token)
    .limit(1)
    .get()

  if (snap.empty) {
    return simplePage({ ok: false, title: 'Link expired', message: 'This confirmation link is no longer valid. It may have already been used. You can subscribe again from our website.' })
  }

  await snap.docs[0].ref.update({
    status: 'confirmed',
    confirmedAt: Timestamp.now(),
    confirmToken: null,
  })

  return simplePage({
    title: 'Subscription confirmed',
    message: 'Thank you — your subscription to the MaiHealth newsletter is now active. You can unsubscribe at any time via the link in every email.',
  })
})
