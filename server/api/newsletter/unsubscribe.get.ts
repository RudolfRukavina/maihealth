import { getAdminDb } from '../../utils/firebase-admin'
import { simplePage } from '../../utils/html-page'
import { Timestamp } from 'firebase-admin/firestore'

/**
 * One-click unsubscribe reached from the link in every newsletter email.
 * The record is kept (as a suppression entry + proof) but marked unsubscribed;
 * the address can be fully erased on request via the admin tools.
 */
export default defineEventHandler(async (event) => {
  setHeader(event, 'content-type', 'text/html; charset=utf-8')
  const token = String(getQuery(event).token || '')

  if (!token) {
    return simplePage({ ok: false, title: 'Invalid link', message: 'This unsubscribe link is missing or malformed.' })
  }

  const db = getAdminDb()
  const snap = await db.collection('newsletterSubscribers')
    .where('unsubscribeToken', '==', token)
    .limit(1)
    .get()

  if (snap.empty) {
    return simplePage({ ok: false, title: 'Link not found', message: 'We could not find a subscription for this link. You may already be unsubscribed.' })
  }

  await snap.docs[0].ref.update({
    status: 'unsubscribed',
    unsubscribedAt: Timestamp.now(),
    confirmToken: null,
  })

  return simplePage({
    title: 'You have been unsubscribed',
    message: 'You will no longer receive the MaiHealth newsletter. We are sorry to see you go — you can resubscribe any time from our website.',
  })
})
