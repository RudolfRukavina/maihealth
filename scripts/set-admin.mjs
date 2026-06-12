import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { config } from 'dotenv'

config()

const privateKey = process.env.NUXT_FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NUXT_FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.NUXT_FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey,
    }),
  })
}

const db = admin.firestore()
const email = process.argv[2]

if (!email) {
  console.log('Usage: node scripts/set-admin.mjs <email>')
  process.exit(1)
}

const snap = await db.collection('users').where('email', '==', email).limit(1).get()

if (snap.empty) {
  console.log(`User "${email}" not found — they need to sign in with Google first.`)
  process.exit(1)
}

const doc = snap.docs[0]
console.log(`Found user: ${doc.id} (${doc.data().displayName || email}), current role: ${doc.data().role}`)

await db.collection('users').doc(doc.id).update({ role: 'admin' })
console.log(`✓ Role set to "admin" for ${email}`)

process.exit(0)
