import { getAdminDb } from '../../utils/firebase-admin'
import { Timestamp } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { from, to } = query

  if (!from || !to) {
    throw createError({ statusCode: 400, statusMessage: 'from and to query params are required' })
  }

  const fromDate = new Date(from as string)
  const toDate = new Date(to as string)
  toDate.setHours(23, 59, 59, 999)

  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid date format' })
  }

  const db = getAdminDb()

  // Default availability: Mon–Fri 08:00–17:00. Admin can override in /portal/admin/availability.
  const DEFAULT_SCHEDULE = [1, 2, 3, 4, 5].map(day => ({ day, startHour: 8, endHour: 17 }))

  const availDoc = await db.collection('availability').doc('config').get()
  const config = availDoc.exists ? availDoc.data()! : {}

  const blockedDates: string[] = Array.isArray(config.blockedDates) ? config.blockedDates : []
  const slotDuration: number = config.slotDuration || 60
  const weeklySchedule = Array.isArray(config.weeklySchedule) && config.weeklySchedule.length
    ? config.weeklySchedule
    : DEFAULT_SCHEDULE

  // Collect all booked/held slot timestamps
  const bookedSlots = new Set<string>()

  // Query by date range only and filter status in memory. This keeps the
  // endpoint working without requiring a composite (status + date) index.
  const apptSnapshot = await db.collection('appointments')
    .where('date', '>=', Timestamp.fromDate(fromDate))
    .where('date', '<=', Timestamp.fromDate(toDate))
    .get()

  for (const doc of apptSnapshot.docs) {
    const d = doc.data()
    if (d.status === 'scheduled' && d.date) {
      bookedSlots.add(d.date.toDate().toISOString())
    }
  }

  // Also block pending requests that have a specific slotDate
  const reqSnapshot = await db.collection('appointmentRequests')
    .where('slotDate', '>=', Timestamp.fromDate(fromDate))
    .where('slotDate', '<=', Timestamp.fromDate(toDate))
    .get()

  for (const doc of reqSnapshot.docs) {
    const d = doc.data()
    if (d.status === 'pending' && d.slotDate) {
      bookedSlots.add(d.slotDate.toDate().toISOString())
    }
  }

  // Generate slots from the weekly schedule
  const slots: string[] = []
  const cursor = new Date(fromDate)
  cursor.setHours(0, 0, 0, 0)
  // Minimum booking window: 2 hours from now
  const minBookable = new Date(Date.now() + 2 * 60 * 60 * 1000)

  while (cursor <= toDate) {
    const dayOfWeek = cursor.getDay()
    // Local YYYY-MM-DD so it matches blockedDates picked via <input type="date">
    const dateStr = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`

    if (!blockedDates.includes(dateStr)) {
      const daySchedule = (weeklySchedule as any[]).filter(s => s.day === dayOfWeek)

      for (const schedule of daySchedule) {
        const slotTime = new Date(cursor)
        slotTime.setHours(schedule.startHour, 0, 0, 0)
        const endTime = new Date(cursor)
        endTime.setHours(schedule.endHour, 0, 0, 0)

        while (slotTime < endTime) {
          if (slotTime > minBookable && !bookedSlots.has(slotTime.toISOString())) {
            slots.push(slotTime.toISOString())
          }
          slotTime.setMinutes(slotTime.getMinutes() + slotDuration)
        }
      }
    }

    cursor.setDate(cursor.getDate() + 1)
  }

  return { slots, slotDuration }
})
