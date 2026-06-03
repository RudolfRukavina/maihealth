import { getAdminDb } from '../../utils/firebase-admin'
import { verifyAuth } from '../../utils/verify-auth'

export default defineEventHandler(async (event) => {
  const decoded = await verifyAuth(event)
  const db = getAdminDb()

  const userDoc = await db.collection('users').doc(decoded.uid).get()
  if (!userDoc.exists || userDoc.data()?.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Admin access required' })
  }

  const configDoc = await db.collection('availability').doc('config').get()
  if (!configDoc.exists) {
    return { weeklySchedule: [], blockedDates: [], slotDuration: 60 }
  }

  const data = configDoc.data()!
  return {
    weeklySchedule: data.weeklySchedule ?? [],
    blockedDates: data.blockedDates ?? [],
    slotDuration: data.slotDuration ?? 60,
  }
})
