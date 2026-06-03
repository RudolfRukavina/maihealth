import { getAdminDb } from '../../../utils/firebase-admin'
import { verifyAuth } from '../../../utils/verify-auth'
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

  const body = await readBody(event)
  const updates: Record<string, any> = {}

  if (body.date) updates.date = Timestamp.fromDate(new Date(body.date))
  if (body.duration) updates.duration = body.duration
  if (body.status) updates.status = body.status
  if (body.notes !== undefined) updates.notes = body.notes

  await db.collection('appointments').doc(id).update(updates)

  return { success: true }
})
