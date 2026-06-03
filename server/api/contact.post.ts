import { Resend } from 'resend'
import { getAdminDb } from '../utils/firebase-admin'
import { Timestamp } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { firstName, lastName, email, phone, message } = body

  if (!firstName || !lastName || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const config = useRuntimeConfig()
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

  if (config.resendApiKey) {
    const resend = new Resend(config.resendApiKey)
    await resend.emails.send({
      from: 'MaiHealth <noreply@maihealth.com>',
      to: config.contactEmail,
      subject: `New contact from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })
  }

  return { success: true }
})
