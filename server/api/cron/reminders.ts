import { getAdminDb } from '../../utils/firebase-admin'
import { sendAppointmentReminder } from '../../utils/email'
import { makeJoinToken, buildJoinPageUrl } from '../../utils/appointments'
import { Timestamp } from 'firebase-admin/firestore'

// Reminder job: sends each patient a "your call is in ~1 hour" email. Designed
// to be hit by an external scheduler every ~15 min. Idempotent — each
// appointment is reminded at most once (guarded by the `reminderSent` flag).
//
// Auth: shared secret via "Authorization: Bearer <secret>" or "?secret=<secret>".
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  if (!config.cronSecret) {
    throw createError({ statusCode: 503, statusMessage: 'Cron is not configured' })
  }

  const bearer = getHeader(event, 'authorization')?.replace(/^Bearer\s+/i, '')
  const provided = bearer || (getQuery(event).secret as string | undefined)
  if (provided !== config.cronSecret) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const db = getAdminDb()
  const now = new Date()
  const inOneHour = new Date(now.getTime() + 60 * 60 * 1000)

  // Appointments starting within the next hour (uses the existing
  // status+date composite index).
  const snap = await db.collection('appointments')
    .where('status', '==', 'scheduled')
    .where('date', '>', Timestamp.fromDate(now))
    .where('date', '<=', Timestamp.fromDate(inOneHour))
    .get()

  let sent = 0
  let skipped = 0
  let failed = 0

  for (const doc of snap.docs) {
    const a = doc.data()
    if (a.reminderSent) { skipped++; continue }

    // No email to reach them on — flag it so we don't reprocess every run.
    if (!a.patientEmail) {
      await doc.ref.update({ reminderSent: true })
      skipped++
      continue
    }

    try {
      let joinToken = a.joinToken
      if (!joinToken) {
        joinToken = makeJoinToken()
        await doc.ref.update({ joinToken })
      }

      const ok = await sendAppointmentReminder({
        to: a.patientEmail,
        name: a.patientName || 'there',
        date: a.date.toDate(),
        duration: a.duration || 60,
        joinPageUrl: buildJoinPageUrl(doc.id, joinToken),
        locale: a.locale === 'de' ? 'de' : 'en',
      })

      if (ok) {
        await doc.ref.update({ reminderSent: true, reminderSentAt: Timestamp.now() })
        sent++
      } else {
        skipped++
      }
    } catch (err) {
      // Leave reminderSent unset so the next run retries this one.
      console.error(`Reminder failed for appointment ${doc.id}:`, err)
      failed++
    }
  }

  return { ok: true, checked: snap.size, sent, skipped, failed }
})
