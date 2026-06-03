import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

let _auth: ReturnType<typeof getAuth>
let _db: ReturnType<typeof getFirestore>

// Normalizes a service-account private key coming from an env var.
// Handles leading/trailing whitespace, accidental surrounding quotes, and
// escaped newlines (\n) so the PEM can be parsed regardless of .env quirks.
function normalizePrivateKey(raw: unknown): string | undefined {
  if (typeof raw !== 'string') return undefined
  let key = raw.trim()
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1)
  }
  return key.replace(/\\n/g, '\n')
}

function ensureInitialized() {
  if (getApps().length === 0) {
    const config = useRuntimeConfig()
    const projectId = config.firebaseAdminProjectId
    const clientEmail = config.firebaseAdminClientEmail
    const privateKey = normalizePrivateKey(config.firebaseAdminPrivateKey)

    if (!projectId || !clientEmail || !privateKey) {
      const missing = [
        !projectId && 'NUXT_FIREBASE_ADMIN_PROJECT_ID',
        !clientEmail && 'NUXT_FIREBASE_ADMIN_CLIENT_EMAIL',
        !privateKey && 'NUXT_FIREBASE_ADMIN_PRIVATE_KEY',
      ].filter(Boolean).join(', ')
      throw createError({
        statusCode: 500,
        statusMessage: `Firebase Admin is not configured. Missing env var(s): ${missing}. Add them to your .env file.`,
      })
    }

    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    })
  }
  _auth = getAuth()
  _db = getFirestore()
}

export function getAdminAuth() {
  ensureInitialized()
  return _auth
}

export function getAdminDb() {
  ensureInitialized()
  return _db
}
