import { randomUUID } from 'node:crypto'
import { getAdminDb } from '../utils/firebase-admin'
import { consentRecord } from '../utils/consent'
import { sendNewsletterConfirm } from '../utils/email'
import { Timestamp } from 'firebase-admin/firestore'

/**
 * Double opt-in newsletter signup (required in Germany — UWG §7).
 * The address is only stored as `pending` and is NOT added to the mailing list
 * until the subscriber clicks the confirmation link we email them. We never
 * reveal whether an address already exists (privacy + abuse resistance).
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, locale, consent } = body

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    throw createError({ statusCode: 400, statusMessage: 'A valid email is required' })
  }

  if (consent !== true) {
    throw createError({ statusCode: 400, statusMessage: 'Consent is required to subscribe' })
  }

  const normalizedEmail = String(email).trim().toLowerCase()
  const db = getAdminDb()
  const origin = getRequestURL(event).origin

  const existing = await db.collection('newsletterSubscribers')
    .where('email', '==', normalizedEmail)
    .limit(1)
    .get()

  // Already confirmed — nothing to do, but don't disclose that.
  if (!existing.empty && existing.docs[0].data().status === 'confirmed') {
    return { success: true }
  }

  const confirmToken = randomUUID()
  const unsubscribeToken = randomUUID()

  if (existing.empty) {
    await db.collection('newsletterSubscribers').add({
      email: normalizedEmail,
      locale: locale || 'en',
      status: 'pending',
      confirmToken,
      unsubscribeToken,
      consent: consentRecord(event),
      subscribedAt: Timestamp.now(),
      confirmedAt: null,
    })
  } else {
    // Pending or previously unsubscribed: refresh the token and re-send.
    await existing.docs[0].ref.update({
      locale: locale || 'en',
      status: 'pending',
      confirmToken,
      consent: consentRecord(event),
      subscribedAt: Timestamp.now(),
    })
  }

  await sendNewsletterConfirm({
    to: normalizedEmail,
    confirmUrl: `${origin}/api/newsletter/confirm?token=${confirmToken}`,
  })

  return { success: true }
})
