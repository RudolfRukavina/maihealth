import { getAdminDb } from '../utils/firebase-admin'
import { Timestamp } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, locale } = body

  if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'Email is required' })
  }

  const db = getAdminDb()

  const existing = await db.collection('newsletterSubscribers')
    .where('email', '==', email)
    .limit(1)
    .get()

  if (!existing.empty) {
    return { success: true }
  }

  await db.collection('newsletterSubscribers').add({
    email,
    locale: locale || 'en',
    subscribedAt: Timestamp.now(),
  })

  return { success: true }
})
