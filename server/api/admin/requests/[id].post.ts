import { Resend } from 'resend'
import { getAdminDb } from '../../../utils/firebase-admin'
import { verifyAuth } from '../../../utils/verify-auth'
import { createZoomMeeting } from '../../../utils/zoom'
import { Timestamp } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const decoded = await verifyAuth(event)
  const config = useRuntimeConfig()
  const db = getAdminDb()

  const userDoc = await db.collection('users').doc(decoded.uid).get()
  if (!userDoc.exists || userDoc.data()?.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Admin access required' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Request ID required' })

  const body = await readBody(event)
  const { action, date, duration } = body

  const requestDoc = await db.collection('appointmentRequests').doc(id).get()
  if (!requestDoc.exists) {
    throw createError({ statusCode: 404, statusMessage: 'Request not found' })
  }

  const request = requestDoc.data()!

  if (action === 'decline') {
    await db.collection('appointmentRequests').doc(id).update({ status: 'declined' })
    return { success: true }
  }

  if (!date) {
    throw createError({ statusCode: 400, statusMessage: 'Date is required to accept' })
  }

  let zoomMeetingId = ''
  let zoomJoinUrl = ''

  if (config.zoomClientId && config.zoomClientSecret) {
    const meeting = await createZoomMeeting(
      `MaiHealth — ${request.patientName || 'Patient Consultation'}`,
      new Date(date).toISOString(),
      duration || 60
    )
    zoomMeetingId = meeting.meetingId
    zoomJoinUrl = meeting.joinUrl
  }

  await db.collection('appointments').add({
    patientId: request.patientId,
    patientName: request.patientName || '',
    date: Timestamp.fromDate(new Date(date)),
    duration: duration || 60,
    type: request.type || 'initial',
    status: 'scheduled',
    zoomMeetingId,
    zoomJoinUrl,
    notes: request.reason || '',
    createdAt: Timestamp.now(),
  })

  await db.collection('appointmentRequests').doc(id).update({ status: 'accepted' })

  if (config.resendApiKey && request.patientEmail) {
    const resend = new Resend(config.resendApiKey)
    await resend.emails.send({
      from: 'MaiHealth <noreply@maihealth.com>',
      to: request.patientEmail,
      subject: 'Your MaiHealth appointment is confirmed',
      html: `
        <h2>Appointment Confirmed</h2>
        <p>Dear ${request.patientName},</p>
        <p>Your appointment request has been accepted:</p>
        <p><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p><strong>Time:</strong> ${new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
        ${zoomJoinUrl ? `<p><strong>Video Call:</strong> <a href="${zoomJoinUrl}">Join Zoom Meeting</a></p>` : ''}
        <p>View your appointments in your <a href="https://maihealth.com/portal">patient portal</a>.</p>
      `,
    })
  }

  return { success: true, zoomJoinUrl }
})
