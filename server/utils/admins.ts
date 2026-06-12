import { getAdminDb } from './firebase-admin'

// Accounts that are granted the admin role on sign-in (lowercase).
export const ADMIN_EMAILS = ['noamaijimenez@gmail.com']

// Every address that should receive admin notifications: the configured
// contact inbox, the hardcoded admin accounts, and any Firestore user with
// the admin role. Deduped and lowercased.
export async function getAdminRecipients(): Promise<string[]> {
  const config = useRuntimeConfig()
  const recipients = new Set<string>(ADMIN_EMAILS)
  if (config.contactEmail) recipients.add(String(config.contactEmail).toLowerCase())

  try {
    const snap = await getAdminDb().collection('users').where('role', '==', 'admin').get()
    snap.forEach((doc) => {
      const email = doc.data().email
      if (typeof email === 'string' && email) recipients.add(email.toLowerCase())
    })
  } catch (err) {
    // Still notify the static recipients if the lookup fails.
    console.error('Failed to load admin users for notifications:', err)
  }

  return [...recipients]
}
