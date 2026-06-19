import { getAdminDb } from '../utils/firebase-admin'
import { sendAdminContactForm } from '../utils/email'
import { consentRecord } from '../utils/consent'
import { Timestamp } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { firstName, lastName, email, phone, message, consent } = body

  if (!firstName || !lastName || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  if (consent !== true) {
    throw createError({ statusCode: 400, statusMessage: 'Consent is required to process this request' })
  }

  const db = getAdminDb()

  await db.collection('contactSubmissions').add({
    firstName,
    lastName,
    email,
    phone: phone || '',
    message,
    read: false,
    consent: consentRecord(event),
    createdAt: Timestamp.now(),
  })

  await sendAdminContactForm({ firstName, lastName, email, phone, message })

  return { success: true }
})
