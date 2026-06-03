import { Resend } from 'resend'
import { getAdminDb } from '../../utils/firebase-admin'
import { verifyAuth } from '../../utils/verify-auth'
import { Timestamp } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const decoded = await verifyAuth(event)
  const body = await readBody(event)
  const { preferredDateStart, preferredDateEnd, preferredTime, type, reason } = body

  if (!preferredDateStart) {
    throw createError({ statusCode: 400, statusMessage: 'Preferred date is required' })
  }

  const config = useRuntimeConfig()
  const db = getAdminDb()

  await db.collection('appointmentRequests').add({
    patientId: decoded.uid,
    patientName: decoded.name || decoded.email,
    patientEmail: decoded.email,
    preferredDateRange: {
      start: Timestamp.fromDate(new Date(preferredDateStart)),
      end: preferredDateEnd ? Timestamp.fromDate(new Date(preferredDateEnd)) : Timestamp.fromDate(new Date(preferredDateStart)),
    },
    preferredTimeOfDay: preferredTime || 'morning',
    type: type || 'initial',
    reason: reason || '',
    status: 'pending',
    createdAt: Timestamp.now(),
  })

  if (config.resendApiKey) {
    const resend = new Resend(config.resendApiKey)
    await resend.emails.send({
      from: 'MaiHealth <noreply@maihealth.com>',
      to: config.contactEmail,
      subject: `New appointment request from ${decoded.name || decoded.email}`,
      html: `
        <h2>New Appointment Request</h2>
        <p><strong>Patient:</strong> ${decoded.name || 'N/A'} (${decoded.email})</p>
        <p><strong>Preferred dates:</strong> ${preferredDateStart}${preferredDateEnd ? ' – ' + preferredDateEnd : ''}</p>
        <p><strong>Preferred time:</strong> ${preferredTime}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Reason:</strong> ${reason || 'Not provided'}</p>
      `,
    })
  }

  return { success: true }
})
