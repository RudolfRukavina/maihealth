import { getAdminDb } from '../../utils/firebase-admin'
import { verifyAuth } from '../../utils/verify-auth'

export default defineEventHandler(async (event) => {
  const decoded = await verifyAuth(event)
  const db = getAdminDb()

  const userDoc = await db.collection('users').doc(decoded.uid).get()
  if (!userDoc.exists || userDoc.data()?.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Admin access required' })
  }

  const body = await readBody(event)
  const { weeklySchedule, blockedDates, slotDuration } = body

  if (!Array.isArray(weeklySchedule)) {
    throw createError({ statusCode: 400, statusMessage: 'weeklySchedule must be an array' })
  }

  // Validate each schedule entry
  for (const entry of weeklySchedule) {
    if (
      typeof entry.day !== 'number' || entry.day < 0 || entry.day > 6 ||
      typeof entry.startHour !== 'number' || entry.startHour < 0 || entry.startHour > 23 ||
      typeof entry.endHour !== 'number' || entry.endHour < 1 || entry.endHour > 24 ||
      entry.startHour >= entry.endHour
    ) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid schedule entry' })
    }
  }

  await db.collection('availability').doc('config').set({
    weeklySchedule,
    blockedDates: Array.isArray(blockedDates) ? blockedDates : [],
    slotDuration: Number(slotDuration) || 60,
    updatedAt: new Date(),
  }, { merge: true })

  return { success: true }
})
