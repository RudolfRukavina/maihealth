import { Resend } from 'resend'
import { getAdminDb } from '../../utils/firebase-admin'
import { verifyAuth } from '../../utils/verify-auth'
import { createZoomMeeting } from '../../utils/zoom'
import { Timestamp } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const decoded = await verifyAuth(event)
  const config = useRuntimeConfig()
  const db = getAdminDb()

  const userDoc = await db.collection('users').doc(decoded.uid).get()
  if (!userDoc.exists || userDoc.data()?.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Admin access required' })
  }

  const body = await readBody(event)
  const { patientId, patientName, patientEmail, date, duration, type, notes } = body

  if (!patientId || !date) {
    throw createError({ statusCode: 400, statusMessage: 'Patient and date are required' })
  }

  let zoomMeetingId = ''
  let zoomJoinUrl = ''

  if (config.zoomClientId && config.zoomClientSecret) {
    const meeting = await createZoomMeeting(
      `MaiHealth — ${patientName || 'Patient Consultation'}`,
      new Date(date).toISOString(),
      duration || 60
    )
    zoomMeetingId = meeting.meetingId
    zoomJoinUrl = meeting.joinUrl
  }

  const appointment = await db.collection('appointments').add({
    patientId,
    patientName: patientName || '',
    date: Timestamp.fromDate(new Date(date)),
    duration: duration || 60,
    type: type || 'initial',
    status: 'scheduled',
    zoomMeetingId,
    zoomJoinUrl,
    notes: notes || '',
    createdAt: Timestamp.now(),
  })

  if (config.resendApiKey && patientEmail) {
    const resend = new Resend(config.resendApiKey)
    await resend.emails.send({
      from: 'MaiHealth <noreply@maihealth.com>',
      to: patientEmail,
      subject: 'Your MaiHealth appointment is confirmed',
      html: `
        <h2>Appointment Confirmed</h2>
        <p>Dear ${patientName},</p>
        <p>Your appointment with Dr. med. Mai Wald has been scheduled:</p>
        <p><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p><strong>Time:</strong> ${new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
        <p><strong>Duration:</strong> ${duration || 60} minutes</p>
        ${zoomJoinUrl ? `<p><strong>Video Call:</strong> <a href="${zoomJoinUrl}">Join Zoom Meeting</a></p>` : ''}
        <p>You can also view this appointment in your <a href="https://maihealth.com/portal">patient portal</a>.</p>
        <br>
        <p>Best regards,<br>MaiHealth Team</p>
      `,
    })
  }

  return { success: true, appointmentId: appointment.id, zoomJoinUrl }
})
