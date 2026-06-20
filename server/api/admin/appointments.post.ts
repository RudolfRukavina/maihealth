import { getAdminDb } from '../../utils/firebase-admin'
import { verifyAuth } from '../../utils/verify-auth'
import { createZoomMeeting } from '../../utils/zoom'
import { sendBookingConfirmation, sendAdminAppointmentScheduled } from '../../utils/email'
import { makeJoinToken, buildJoinPageUrl } from '../../utils/appointments'
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
  const { patientId, patientName, patientEmail, date, duration, type, notes, locale } = body
  // Admin-created appointment: default to German (the practice's language)
  // unless an explicit locale is provided.
  const loc = locale === 'en' ? 'en' : 'de'

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

  const joinToken = makeJoinToken()

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
    joinToken,
    notes: notes || '',
    locale: loc,
    createdAt: Timestamp.now(),
  })

  const joinPageUrl = buildJoinPageUrl(appointment.id, joinToken)

  if (patientEmail) {
    await sendBookingConfirmation({
      to: patientEmail,
      name: patientName || 'there',
      date: new Date(date),
      duration: duration || 60,
      joinPageUrl,
      locale: loc,
    })
  }

  await sendAdminAppointmentScheduled({
    patientName: patientName || 'Patient',
    date: new Date(date),
    duration: duration || 60,
    joinPageUrl,
    locale: loc,
  })

  return { success: true, appointmentId: appointment.id, zoomJoinUrl }
})
