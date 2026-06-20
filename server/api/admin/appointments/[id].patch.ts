import { getAdminDb } from '../../../utils/firebase-admin'
import { verifyAuth } from '../../../utils/verify-auth'
import { sendAppointmentCancelled, sendBookingConfirmation } from '../../../utils/email'
import { updateZoomMeeting, deleteZoomMeeting } from '../../../utils/zoom'
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
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Appointment ID required' })

  const apptDoc = await db.collection('appointments').doc(id).get()
  if (!apptDoc.exists) {
    throw createError({ statusCode: 404, statusMessage: 'Appointment not found' })
  }
  const existing = apptDoc.data()!

  const body = await readBody(event)
  const updates: Record<string, any> = {}

  if (body.date) {
    updates.date = Timestamp.fromDate(new Date(body.date))
    // New time → allow the 1h-before reminder to fire again.
    updates.reminderSent = false
  }
  if (body.duration) updates.duration = body.duration
  if (body.status) updates.status = body.status
  if (body.notes !== undefined) updates.notes = body.notes

  // Keep the actual Zoom meeting in sync before persisting the change.
  const zoomEnabled = !!(config.zoomClientId && config.zoomClientSecret)
  const isCancelling = body.status === 'cancelled' && existing.status !== 'cancelled'

  if (zoomEnabled && existing.zoomMeetingId) {
    if (isCancelling) {
      await deleteZoomMeeting(existing.zoomMeetingId)
      updates.zoomMeetingId = ''
      updates.zoomJoinUrl = ''
    } else if (body.date || body.duration) {
      const startTime = (body.date ? new Date(body.date) : existing.date?.toDate?.() || new Date()).toISOString()
      await updateZoomMeeting(existing.zoomMeetingId, {
        startTime,
        duration: body.duration || existing.duration || 60,
      })
    }
  }

  await db.collection('appointments').doc(id).update(updates)

  const patientEmail = existing.patientEmail
  const patientName = existing.patientName || 'there'
  const loc = existing.locale === 'de' ? 'de' : 'en'

  if (patientEmail) {
    if (body.status === 'cancelled' && existing.status !== 'cancelled') {
      const apptDate = existing.date?.toDate?.() || new Date()
      await sendAppointmentCancelled({ to: patientEmail, name: patientName, date: apptDate, locale: loc })
    }

    if (body.date && body.date !== existing.date?.toDate?.()?.toISOString()) {
      // Reuse the appointment's join token (backfilling one for older docs).
      let joinToken = existing.joinToken
      if (!joinToken) {
        joinToken = makeJoinToken()
        await db.collection('appointments').doc(id).update({ joinToken })
      }

      await sendBookingConfirmation({
        to: patientEmail,
        name: patientName,
        date: new Date(body.date),
        duration: body.duration || existing.duration || 60,
        joinPageUrl: buildJoinPageUrl(id, joinToken),
        locale: loc,
      })
    }
  }

  return { success: true }
})
