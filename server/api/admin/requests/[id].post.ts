import { getAdminDb } from '../../../utils/firebase-admin'
import { verifyAuth } from '../../../utils/verify-auth'
import { createZoomMeeting } from '../../../utils/zoom'
import { sendBookingConfirmation, sendRequestDeclined, sendAdminAppointmentScheduled } from '../../../utils/email'
import { makeJoinToken, buildJoinPageUrl } from '../../../utils/appointments'
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
  const loc = request.locale === 'de' ? 'de' : 'en'

  if (action === 'decline') {
    await db.collection('appointmentRequests').doc(id).update({ status: 'declined' })

    if (request.patientEmail) {
      await sendRequestDeclined({
        to: request.patientEmail,
        name: request.patientName || 'there',
        locale: loc,
      })
    }

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

  const joinToken = makeJoinToken()

  const appointment = await db.collection('appointments').add({
    patientId: request.patientId,
    patientName: request.patientName || '',
    patientEmail: request.patientEmail || '',
    date: Timestamp.fromDate(new Date(date)),
    duration: duration || 60,
    type: request.type || 'initial',
    status: 'scheduled',
    zoomMeetingId,
    zoomJoinUrl,
    joinToken,
    notes: request.reason || '',
    locale: loc,
    createdAt: Timestamp.now(),
  })

  await db.collection('appointmentRequests').doc(id).update({ status: 'accepted' })

  const joinPageUrl = buildJoinPageUrl(appointment.id, joinToken)

  if (request.patientEmail) {
    await sendBookingConfirmation({
      to: request.patientEmail,
      name: request.patientName || 'there',
      date: new Date(date),
      duration: duration || 60,
      joinPageUrl,
      locale: loc,
    })
  }

  await sendAdminAppointmentScheduled({
    patientName: request.patientName || 'Patient',
    date: new Date(date),
    duration: duration || 60,
    joinPageUrl,
    locale: loc,
  })

  return { success: true, zoomJoinUrl }
})
