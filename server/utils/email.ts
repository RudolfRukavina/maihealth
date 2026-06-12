import { Resend } from 'resend'

let resendInstance: Resend | null = null

function getResend(): Resend | null {
  const config = useRuntimeConfig()
  if (!config.resendApiKey) return null
  if (!resendInstance) resendInstance = new Resend(config.resendApiKey)
  return resendInstance
}

const FROM = 'MaiHealth <noreply@mai-health.de>'

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function layout(body: string): string {
  return `
    <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 520px; margin: 0 auto; color: #2D3A24;">
      <div style="padding: 32px 0 16px; border-bottom: 1px solid #E8E4DF; margin-bottom: 24px;">
        <strong style="font-size: 18px; color: #2D3A24;">Mai</strong><span style="font-size: 18px; color: #8B9A6B;">Health</span>
      </div>
      ${body}
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E8E4DF; font-size: 12px; color: #999;">
        Mai Jimenez · Physician for Gut Health & IBS<br>
        <a href="https://maihealth.com" style="color: #8B9A6B;">maihealth.com</a>
      </div>
    </div>
  `
}

// --- Client-facing emails ---

export async function sendBookingConfirmation(opts: {
  to: string
  name: string
  date: Date
  duration: number
  zoomJoinUrl?: string
}) {
  const resend = getResend()
  if (!resend) return
  const { to, name, date, duration, zoomJoinUrl } = opts

  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Your MaiHealth appointment is confirmed',
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">Appointment Confirmed</h2>
      <p>Dear ${name},</p>
      <p>Your appointment has been booked:</p>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>Date:</strong> ${formatDate(date)}</p>
        <p style="margin: 0 0 4px;"><strong>Time:</strong> ${formatTime(date)}</p>
        <p style="margin: 0;"><strong>Duration:</strong> ${duration} minutes</p>
      </div>
      ${zoomJoinUrl ? `<p><strong>Video Call:</strong> <a href="${zoomJoinUrl}" style="color: #8B9A6B;">Join Zoom Meeting</a></p>` : ''}
      <p>You'll receive a reminder before your appointment. If you need to reschedule, please get in touch.</p>
    `),
  })
}

export async function sendRequestReceived(opts: {
  to: string
  name: string
  date: Date
}) {
  const resend = getResend()
  if (!resend) return
  const { to, name, date } = opts

  await resend.emails.send({
    from: FROM,
    to,
    subject: 'We received your appointment request',
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">Request Received</h2>
      <p>Dear ${name},</p>
      <p>Thank you for your appointment request. We've received it and will get back to you within 24 hours.</p>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>Requested slot:</strong> ${formatDate(date)}</p>
        <p style="margin: 0;"><strong>Time:</strong> ${formatTime(date)}</p>
      </div>
      <p>If you have any questions in the meantime, feel free to reply to this email.</p>
    `),
  })
}

export async function sendRequestDeclined(opts: {
  to: string
  name: string
}) {
  const resend = getResend()
  if (!resend) return
  const { to, name } = opts

  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Update on your MaiHealth appointment request',
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">Appointment Request Update</h2>
      <p>Dear ${name},</p>
      <p>Unfortunately, we were unable to accommodate your requested time slot. This can happen when a slot is no longer available or doesn't fit the current schedule.</p>
      <p>We'd love to find a time that works for you. Please <a href="https://maihealth.com/book" style="color: #8B9A6B;">book a new slot</a> or reach out to us directly.</p>
    `),
  })
}

export async function sendAppointmentCancelled(opts: {
  to: string
  name: string
  date: Date
}) {
  const resend = getResend()
  if (!resend) return
  const { to, name, date } = opts

  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Your MaiHealth appointment has been cancelled',
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">Appointment Cancelled</h2>
      <p>Dear ${name},</p>
      <p>Your appointment on <strong>${formatDate(date)}</strong> at <strong>${formatTime(date)}</strong> has been cancelled.</p>
      <p>If you'd like to reschedule, please <a href="https://maihealth.com/book" style="color: #8B9A6B;">book a new time</a> or get in touch.</p>
    `),
  })
}

// --- Admin-facing emails ---

export async function sendAdminNewRequest(opts: {
  name: string
  email: string
  phone?: string
  date: Date
  type: string
  reason?: string
}) {
  const resend = getResend()
  if (!resend) return
  const config = useRuntimeConfig()
  const { name, email, phone, date, type, reason } = opts

  await resend.emails.send({
    from: FROM,
    to: config.contactEmail,
    subject: `New appointment request from ${name}`,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">New Appointment Request</h2>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>Patient:</strong> ${name} (${email})</p>
        ${phone ? `<p style="margin: 0 0 4px;"><strong>Phone:</strong> ${phone}</p>` : ''}
        <p style="margin: 0 0 4px;"><strong>Requested slot:</strong> ${formatDate(date)} at ${formatTime(date)}</p>
        <p style="margin: 0 0 4px;"><strong>Type:</strong> ${type}</p>
        <p style="margin: 0;"><strong>Reason:</strong> ${reason || 'Not provided'}</p>
      </div>
      <p><a href="https://maihealth.com/portal/admin/appointments" style="color: #8B9A6B;">Review in admin panel →</a></p>
    `),
  })
}

export async function sendAdminContactForm(opts: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  message: string
}) {
  const resend = getResend()
  if (!resend) return
  const config = useRuntimeConfig()
  const { firstName, lastName, email, phone, message } = opts

  await resend.emails.send({
    from: FROM,
    to: config.contactEmail,
    subject: `New contact from ${firstName} ${lastName}`,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">New Contact Form Submission</h2>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p style="margin: 0 0 4px;"><strong>Email:</strong> ${email}</p>
        ${phone ? `<p style="margin: 0 0 4px;"><strong>Phone:</strong> ${phone}</p>` : ''}
      </div>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `),
  })
}

export async function sendAdminPortalRequest(opts: {
  name: string
  email: string
  preferredDates: string
  preferredTime: string
  type: string
  reason?: string
}) {
  const resend = getResend()
  if (!resend) return
  const config = useRuntimeConfig()
  const { name, email, preferredDates, preferredTime, type, reason } = opts

  await resend.emails.send({
    from: FROM,
    to: config.contactEmail,
    subject: `New appointment request from ${name}`,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">New Appointment Request (Portal)</h2>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>Patient:</strong> ${name} (${email})</p>
        <p style="margin: 0 0 4px;"><strong>Preferred dates:</strong> ${preferredDates}</p>
        <p style="margin: 0 0 4px;"><strong>Preferred time:</strong> ${preferredTime}</p>
        <p style="margin: 0 0 4px;"><strong>Type:</strong> ${type}</p>
        <p style="margin: 0;"><strong>Reason:</strong> ${reason || 'Not provided'}</p>
      </div>
      <p><a href="https://maihealth.com/portal/admin/appointments" style="color: #8B9A6B;">Review in admin panel →</a></p>
    `),
  })
}
