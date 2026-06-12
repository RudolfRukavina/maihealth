import { getAdminDb } from '../../utils/firebase-admin'
import { verifyAuth } from '../../utils/verify-auth'
import { createZoomMeeting } from '../../utils/zoom'
import { sendBookingConfirmation } from '../../utils/email'
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
    patientEmail: patientEmail || '',
    date: Timestamp.fromDate(new Date(date)),
    duration: duration || 60,
    type: type || 'initial',
    status: 'scheduled',
    zoomMeetingId,
    zoomJoinUrl,
    notes: notes || '',
    createdAt: Timestamp.now(),
  })

  if (patientEmail) {
    await sendBookingConfirmation({
      to: patientEmail,
      name: patientName || 'there',
      date: new Date(date),
      duration: duration || 60,
      zoomJoinUrl,
    })
  }

  return { success: true, appointmentId: appointment.id, zoomJoinUrl }
})
