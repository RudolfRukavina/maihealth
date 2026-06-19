import { getAdminDb } from '../../utils/firebase-admin'
import { verifyAuth } from '../../utils/verify-auth'
import { sendAdminReply } from '../../utils/email'
import { Timestamp } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const decoded = await verifyAuth(event)
  const db = getAdminDb()

  const userDoc = await db.collection('users').doc(decoded.uid).get()
  if (!userDoc.exists || userDoc.data()?.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Admin access required' })
  }

  const body = await readBody(event)
  const { to, subject, message, locale, submissionId } = body

  if (!to || !subject || !message?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Recipient, subject and message are required' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(to))) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid recipient email' })
  }

  const result = await sendAdminReply({ to, subject, message, locale })
  if (!result.ok) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Email service is not configured. Use the "open in mail app" option instead.',
    })
  }

  // Mark the originating contact message as replied (for the inbox view).
  if (submissionId) {
    await db.collection('contactSubmissions').doc(String(submissionId)).update({
      repliedAt: Timestamp.now(),
    }).catch(() => {})
  }

  return { success: true }
})
