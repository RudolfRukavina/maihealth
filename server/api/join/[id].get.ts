import { getAdminDb } from '../../utils/firebase-admin'

// Public endpoint behind the website join page. Requires the appointment id
// (in the path) AND the opaque per-appointment token (in `?t=`). The raw Zoom
// link is only returned once the call is about to start.
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const token = getQuery(event).t

  if (!id || typeof token !== 'string' || !token) {
    throw createError({ statusCode: 400, statusMessage: 'Missing appointment id or token' })
  }

  const db = getAdminDb()
  const doc = await db.collection('appointments').doc(id).get()
  if (!doc.exists) {
    throw createError({ statusCode: 404, statusMessage: 'Appointment not found' })
  }

  const a = doc.data()!
  if (!a.joinToken || a.joinToken !== token) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid join link' })
  }

  const start = a.date?.toDate?.()?.getTime?.() ?? 0
  const duration = a.duration || 60
  const now = Date.now()
  const opensAt = start - 15 * 60 * 1000
  // Allow joining until 30 min after the scheduled end (overruns happen).
  const closesAt = start + duration * 60 * 1000 + 30 * 60 * 1000
  const joinable = a.status === 'scheduled' && now >= opensAt && now <= closesAt

  return {
    status: a.status || 'scheduled',
    patientName: a.patientName || '',
    date: start ? new Date(start).toISOString() : null,
    duration,
    locale: a.locale === 'de' ? 'de' : 'en',
    opensAt: start ? new Date(opensAt).toISOString() : null,
    joinable,
    // Only reveal the Zoom link inside the join window.
    joinUrl: joinable ? (a.zoomJoinUrl || '') : '',
  }
})
