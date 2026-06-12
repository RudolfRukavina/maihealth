import { FieldValue } from 'firebase-admin/firestore'
import { verifyAuth } from '../../utils/verify-auth'
import { getAdminDb } from '../../utils/firebase-admin'
import { ADMIN_EMAILS } from '../../utils/admins'

// Creates the user profile on first sign-in and resolves the user's role.
// Runs with the Admin SDK because Firestore rules (correctly) forbid clients
// from creating or updating their own role.
export default defineEventHandler(async (event) => {
  const decoded = await verifyAuth(event)
  const ref = getAdminDb().collection('users').doc(decoded.uid)
  const snap = await ref.get()
  const isAdminEmail = ADMIN_EMAILS.includes(decoded.email?.toLowerCase() ?? '')

  if (!snap.exists) {
    const role = isAdminEmail ? 'admin' : 'patient'
    await ref.set({
      email: decoded.email ?? null,
      displayName: decoded.name ?? null,
      photoURL: decoded.picture ?? null,
      role,
      createdAt: FieldValue.serverTimestamp(),
    })
    return { role }
  }

  let role = snap.data()?.role || 'patient'
  // Promote accounts that signed in before being added to ADMIN_EMAILS.
  if (isAdminEmail && role !== 'admin') {
    role = 'admin'
    await ref.update({ role })
  }
  return { role }
})
