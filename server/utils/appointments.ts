import { randomBytes } from 'node:crypto'
import { SITE_URL } from './email'

// Opaque, high-entropy per-appointment token. Lets the patient (and the host)
// open the public join page without logging in. Stored on the appointment doc
// and required as the `t` query param by the /api/join endpoint.
export function makeJoinToken(): string {
  return randomBytes(24).toString('base64url')
}

// The website join page the confirmation emails point to. The actual Zoom link
// is only revealed there once the call is about to start.
export function buildJoinPageUrl(appointmentId: string, token: string): string {
  return `${SITE_URL}/join/${appointmentId}?t=${token}`
}
