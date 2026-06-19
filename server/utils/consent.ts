import { Timestamp } from 'firebase-admin/firestore'

/**
 * Version of the privacy policy / consent wording in force when consent was
 * collected. Bump this whenever the consent text or privacy policy changes
 * materially, so old records remain attributable to the wording the user saw.
 * Must match the version shown on /privacy (privacy.meta.version in the locales).
 */
export const PRIVACY_POLICY_VERSION = '2026-06-19'

/**
 * Builds the consent record stored alongside personal data so we can later
 * demonstrate that consent was given (GDPR Art. 7(1) — accountability).
 * Captures the consenting user's IP and user agent as evidence.
 */
export function consentRecord(event: import('h3').H3Event) {
  return {
    given: true,
    policyVersion: PRIVACY_POLICY_VERSION,
    at: Timestamp.now(),
    ip: getRequestIP(event, { xForwardedFor: true }) || null,
    userAgent: getHeader(event, 'user-agent') || null,
  }
}
