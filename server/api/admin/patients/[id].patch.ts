import { getAdminDb } from '../../../utils/firebase-admin'
import { verifyAuth } from '../../../utils/verify-auth'

// Admin-only: set a patient's treatment-journey stage (0–4).
// Clients can't write this directly (Firestore rules forbid it), so the
// doctor advances a patient's progress through this endpoint.
export default defineEventHandler(async (event) => {
  const decoded = await verifyAuth(event)
  const db = getAdminDb()

  const adminDoc = await db.collection('users').doc(decoded.uid).get()
  if (!adminDoc.exists || adminDoc.data()?.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Admin access required' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Patient ID required' })

  const body = await readBody(event)
  const stage = Number(body.journeyStage)
  if (!Number.isInteger(stage) || stage < 0 || stage > 4) {
    throw createError({ statusCode: 400, statusMessage: 'journeyStage must be an integer between 0 and 4' })
  }

  const ref = db.collection('users').doc(id)
  const snap = await ref.get()
  if (!snap.exists) throw createError({ statusCode: 404, statusMessage: 'Patient not found' })

  await ref.update({ journeyStage: stage })
  return { success: true, journeyStage: stage }
})
