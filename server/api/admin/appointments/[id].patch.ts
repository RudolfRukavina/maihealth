import { getAdminDb } from '../../../utils/firebase-admin'
import { verifyAuth } from '../../../utils/verify-auth'
import { sendAppointmentCancelled, sendBookingConfirmation } from '../../../utils/email'
import { Timestamp } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const decoded = await verifyAuth(event)
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

  if (body.date) updates.date = Timestamp.fromDate(new Date(body.date))
  if (body.duration) updates.duration = body.duration
  if (body.status) updates.status = body.status
  if (body.notes !== undefined) updates.notes = body.notes

  await db.collection('appointments').doc(id).update(updates)

  const patientEmail = existing.patientEmail
  const patientName = existing.patientName || 'there'

  if (patientEmail) {
    if (body.status === 'cancelled' && existing.status !== 'cancelled') {
      const apptDate = existing.date?.toDate?.() || new Date()
      await sendAppointmentCancelled({ to: patientEmail, name: patientName, date: apptDate })
    }

    if (body.date && body.date !== existing.date?.toDate?.()?.toISOString()) {
      await sendBookingConfirmation({
        to: patientEmail,
        name: patientName,
        date: new Date(body.date),
        duration: body.duration || existing.duration || 60,
        zoomJoinUrl: existing.zoomJoinUrl,
      })
    }
  }

  return { success: true }
})
