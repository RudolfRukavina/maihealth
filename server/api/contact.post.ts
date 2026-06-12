import { getAdminDb } from '../utils/firebase-admin'
import { sendAdminContactForm } from '../utils/email'
import { Timestamp } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { firstName, lastName, email, phone, message } = body

  if (!firstName || !lastName || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const db = getAdminDb()

  await db.collection('contactSubmissions').add({
    firstName,
    lastName,
    email,
    phone: phone || '',
    message,
    read: false,
    createdAt: Timestamp.now(),
  })

  await sendAdminContactForm({ firstName, lastName, email, phone, message })

  return { success: true }
})
