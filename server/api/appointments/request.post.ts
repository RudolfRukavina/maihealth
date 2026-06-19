import { getAdminDb } from '../../utils/firebase-admin'
import { verifyAuth } from '../../utils/verify-auth'
import { sendAdminPortalRequest } from '../../utils/email'
import { PRIVACY_POLICY_VERSION } from '../../utils/consent'
import { Timestamp } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const decoded = await verifyAuth(event)
  const body = await readBody(event)
  const { preferredDateStart, preferredDateEnd, preferredTime, type, reason, locale } = body

  if (!preferredDateStart) {
    throw createError({ statusCode: 400, statusMessage: 'Preferred date is required' })
  }

  const db = getAdminDb()

  await db.collection('appointmentRequests').add({
    patientId: decoded.uid,
    patientName: decoded.name || decoded.email,
    patientEmail: decoded.email,
    preferredDateRange: {
      start: Timestamp.fromDate(new Date(preferredDateStart)),
      end: preferredDateEnd ? Timestamp.fromDate(new Date(preferredDateEnd)) : Timestamp.fromDate(new Date(preferredDateStart)),
    },
    preferredTimeOfDay: preferredTime || 'morning',
    type: type || 'initial',
    reason: reason || '',
    // Existing patient acting within the care relationship (Art. 9(2)(h));
    // record the policy version in force for accountability.
    policyVersion: PRIVACY_POLICY_VERSION,
    // Patient's site language — used to localise later confirmation/decline emails.
    locale: locale === 'de' ? 'de' : 'en',
    status: 'pending',
    createdAt: Timestamp.now(),
  })

  const preferredDates = preferredDateEnd
    ? `${preferredDateStart} – ${preferredDateEnd}`
    : preferredDateStart

  await sendAdminPortalRequest({
    name: decoded.name || decoded.email || 'Patient',
    email: decoded.email || '',
    preferredDates,
    preferredTime: preferredTime || 'morning',
    type: type || 'initial',
    reason,
    locale: locale === 'de' ? 'de' : 'en',
  })

  return { success: true }
})
