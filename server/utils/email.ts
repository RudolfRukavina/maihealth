import { Resend } from 'resend'
import { getAdminRecipients } from './admins'

let resendInstance: Resend | null = null

function getResend(): Resend | null {
  const config = useRuntimeConfig()
  if (!config.resendApiKey) return null
  if (!resendInstance) resendInstance = new Resend(config.resendApiKey)
  return resendInstance
}

const FROM = 'MaiHealth <noreply@mai-health.de>'
const SITE_URL = 'https://mai-health.de'

export type Locale = 'de' | 'en'

// Normalise any incoming value to a supported locale (defaults to English).
export function normLocale(value?: string | null): Locale {
  return value === 'de' ? 'de' : 'en'
}

function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

function formatTime(date: Date, locale: Locale): string {
  return date.toLocaleTimeString(locale === 'de' ? 'de-DE' : 'en-US', {
    hour: '2-digit', minute: '2-digit',
  })
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Turns the admin's plain-text message into safe HTML paragraphs: blank lines
// become new paragraphs, single newlines become <br>.
function textToHtml(text: string): string {
  return text
    .trim()
    .split(/\n{2,}/)
    .map((para) => `<p style="margin: 0 0 16px; line-height: 1.7;">${escapeHtml(para).replace(/\n/g, '<br>')}</p>`)
    .join('')
}

function layout(body: string, locale: Locale): string {
  const tagline = locale === 'de'
    ? 'Ärztin für Darmgesundheit & Reizdarm'
    : 'Physician for Gut Health & IBS'
  return `
    <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 520px; margin: 0 auto; color: #2D3A24;">
      <div style="padding: 32px 0 16px; border-bottom: 1px solid #E8E4DF; margin-bottom: 24px;">
        <img src="${SITE_URL}/email-logo.png" alt="MaiHealth" width="180" style="display: block; width: 180px; height: auto; border: 0;" />
      </div>
      ${body}
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E8E4DF; font-size: 12px; color: #999;">
        Mai Jimenez · ${tagline}<br>
        <a href="${SITE_URL}" style="color: #8B9A6B;">mai-health.de</a>
      </div>
    </div>
  `
}

// --- Newsletter (double opt-in) ---

// Note: under German law (UWG §7) the confirmation email must not contain any
// advertising — only the request to confirm the subscription.
export async function sendNewsletterConfirm(opts: {
  to: string
  confirmUrl: string
  locale?: string
}) {
  const resend = getResend()
  if (!resend) return
  const { to, confirmUrl } = opts
  const L = normLocale(opts.locale)

  const t = {
    de: {
      subject: 'Bitte bestätigen Sie Ihr Newsletter-Abonnement',
      heading: 'Abonnement bestätigen',
      p1: 'Sie (oder jemand mit dieser E-Mail-Adresse) möchten den MaiHealth-Newsletter erhalten.',
      p2: 'Bitte bestätigen Sie über die Schaltfläche unten. Falls Sie das nicht angefordert haben, ignorieren Sie diese E-Mail einfach — es wird kein Abonnement angelegt.',
      button: 'Abonnement bestätigen',
      fallback: 'Oder kopieren Sie diesen Link in Ihren Browser:',
    },
    en: {
      subject: 'Please confirm your newsletter subscription',
      heading: 'Confirm your subscription',
      p1: 'You (or someone using this email address) asked to receive the MaiHealth newsletter.',
      p2: 'Please confirm by clicking the button below. If you did not request this, simply ignore this email — no subscription will be created.',
      button: 'Confirm subscription',
      fallback: 'Or paste this link into your browser:',
    },
  }[L]

  await resend.emails.send({
    from: FROM,
    to,
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <p>${t.p1}</p>
      <p>${t.p2}</p>
      <p style="margin: 24px 0;">
        <a href="${confirmUrl}" style="background: #8B9A6B; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 999px; font-weight: 600; display: inline-block;">${t.button}</a>
      </p>
      <p style="font-size: 12px; color: #999;">${t.fallback}<br>${confirmUrl}</p>
    `, L),
  })
}

// --- Client-facing emails (localised to the patient's site language) ---

export async function sendBookingConfirmation(opts: {
  to: string
  name: string
  date: Date
  duration: number
  zoomJoinUrl?: string
  locale?: string
}) {
  const resend = getResend()
  if (!resend) return
  const { to, name, date, duration, zoomJoinUrl } = opts
  const L = normLocale(opts.locale)

  const t = {
    de: {
      subject: 'Ihr MaiHealth-Termin ist bestätigt',
      heading: 'Termin bestätigt',
      greeting: `Hallo ${name},`,
      intro: 'Ihr Termin wurde gebucht:',
      lDate: 'Datum', lTime: 'Uhrzeit', lDuration: 'Dauer', minutes: 'Minuten',
      video: 'Videogespräch', join: 'Zoom-Meeting beitreten',
      outro: 'Sie erhalten vor Ihrem Termin eine Erinnerung. Wenn Sie den Termin verschieben möchten, melden Sie sich gerne bei uns.',
    },
    en: {
      subject: 'Your MaiHealth appointment is confirmed',
      heading: 'Appointment Confirmed',
      greeting: `Dear ${name},`,
      intro: 'Your appointment has been booked:',
      lDate: 'Date', lTime: 'Time', lDuration: 'Duration', minutes: 'minutes',
      video: 'Video Call', join: 'Join Zoom Meeting',
      outro: "You'll receive a reminder before your appointment. If you need to reschedule, please get in touch.",
    },
  }[L]

  await resend.emails.send({
    from: FROM,
    to,
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <p>${t.greeting}</p>
      <p>${t.intro}</p>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>${t.lDate}:</strong> ${formatDate(date, L)}</p>
        <p style="margin: 0 0 4px;"><strong>${t.lTime}:</strong> ${formatTime(date, L)}</p>
        <p style="margin: 0;"><strong>${t.lDuration}:</strong> ${duration} ${t.minutes}</p>
      </div>
      ${zoomJoinUrl ? `<p><strong>${t.video}:</strong> <a href="${zoomJoinUrl}" style="color: #8B9A6B;">${t.join}</a></p>` : ''}
      <p>${t.outro}</p>
    `, L),
  })
}

export async function sendRequestReceived(opts: {
  to: string
  name: string
  date: Date
  locale?: string
}) {
  const resend = getResend()
  if (!resend) return
  const { to, name, date } = opts
  const L = normLocale(opts.locale)

  const t = {
    de: {
      subject: 'Wir haben Ihre Terminanfrage erhalten',
      heading: 'Anfrage erhalten',
      greeting: `Hallo ${name},`,
      intro: 'Vielen Dank für Ihre Terminanfrage. Wir haben sie erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.',
      lSlot: 'Gewünschter Termin', lTime: 'Uhrzeit',
      outro: 'Bei Fragen können Sie jederzeit einfach auf diese E-Mail antworten.',
    },
    en: {
      subject: 'We received your appointment request',
      heading: 'Request Received',
      greeting: `Dear ${name},`,
      intro: "Thank you for your appointment request. We've received it and will get back to you within 24 hours.",
      lSlot: 'Requested slot', lTime: 'Time',
      outro: 'If you have any questions in the meantime, feel free to reply to this email.',
    },
  }[L]

  await resend.emails.send({
    from: FROM,
    to,
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <p>${t.greeting}</p>
      <p>${t.intro}</p>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>${t.lSlot}:</strong> ${formatDate(date, L)}</p>
        <p style="margin: 0;"><strong>${t.lTime}:</strong> ${formatTime(date, L)}</p>
      </div>
      <p>${t.outro}</p>
    `, L),
  })
}

export async function sendRequestDeclined(opts: {
  to: string
  name: string
  locale?: string
}) {
  const resend = getResend()
  if (!resend) return
  const { to, name } = opts
  const L = normLocale(opts.locale)

  const t = {
    de: {
      subject: 'Update zu Ihrer MaiHealth-Terminanfrage',
      heading: 'Update zu Ihrer Terminanfrage',
      greeting: `Hallo ${name},`,
      p1: 'Leider konnten wir Ihren Wunschtermin nicht bestätigen. Das kann vorkommen, wenn ein Termin nicht mehr verfügbar ist oder nicht in den aktuellen Kalender passt.',
      p2pre: 'Gerne finden wir einen passenden Termin für Sie. Bitte ',
      link: 'buchen Sie einen neuen Termin',
      p2post: ' oder melden Sie sich direkt bei uns.',
    },
    en: {
      subject: 'Update on your MaiHealth appointment request',
      heading: 'Appointment Request Update',
      greeting: `Dear ${name},`,
      p1: "Unfortunately, we were unable to accommodate your requested time slot. This can happen when a slot is no longer available or doesn't fit the current schedule.",
      p2pre: "We'd love to find a time that works for you. Please ",
      link: 'book a new slot',
      p2post: ' or reach out to us directly.',
    },
  }[L]

  await resend.emails.send({
    from: FROM,
    to,
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <p>${t.greeting}</p>
      <p>${t.p1}</p>
      <p>${t.p2pre}<a href="${SITE_URL}/book" style="color: #8B9A6B;">${t.link}</a>${t.p2post}</p>
    `, L),
  })
}

export async function sendAppointmentCancelled(opts: {
  to: string
  name: string
  date: Date
  locale?: string
}) {
  const resend = getResend()
  if (!resend) return
  const { to, name, date } = opts
  const L = normLocale(opts.locale)

  const t = {
    de: {
      subject: 'Ihr MaiHealth-Termin wurde abgesagt',
      heading: 'Termin abgesagt',
      greeting: `Hallo ${name},`,
      p1: `Ihr Termin am <strong>${formatDate(date, L)}</strong> um <strong>${formatTime(date, L)}</strong> wurde abgesagt.`,
      p2pre: 'Wenn Sie einen neuen Termin vereinbaren möchten, ',
      link: 'buchen Sie einen neuen Termin',
      p2post: ' oder melden Sie sich bei uns.',
    },
    en: {
      subject: 'Your MaiHealth appointment has been cancelled',
      heading: 'Appointment Cancelled',
      greeting: `Dear ${name},`,
      p1: `Your appointment on <strong>${formatDate(date, L)}</strong> at <strong>${formatTime(date, L)}</strong> has been cancelled.`,
      p2pre: "If you'd like to reschedule, please ",
      link: 'book a new time',
      p2post: ' or get in touch.',
    },
  }[L]

  await resend.emails.send({
    from: FROM,
    to,
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <p>${t.greeting}</p>
      <p>${t.p1}</p>
      <p>${t.p2pre}<a href="${SITE_URL}/book" style="color: #8B9A6B;">${t.link}</a>${t.p2post}</p>
    `, L),
  })
}

// --- Personal reply from the admin, sent as a branded email to the patient ---

export async function sendAdminReply(opts: {
  to: string
  subject: string
  message: string
  locale?: string
}): Promise<{ ok: boolean; reason?: string }> {
  const resend = getResend()
  if (!resend) return { ok: false, reason: 'not_configured' }
  const config = useRuntimeConfig()
  const L = normLocale(opts.locale)

  await resend.emails.send({
    from: FROM,
    to: opts.to,
    // Patient replies land in the practice inbox, not the noreply address.
    replyTo: config.contactEmail || undefined,
    subject: opts.subject,
    html: layout(textToHtml(opts.message), L),
  })

  return { ok: true }
}

// --- Admin-facing emails (mirror the patient's site language) ---

export async function sendAdminNewRequest(opts: {
  name: string
  email: string
  phone?: string
  date: Date
  type: string
  reason?: string
  locale?: string
}) {
  const resend = getResend()
  if (!resend) return
  const { name, email, phone, date, type, reason } = opts
  const L = normLocale(opts.locale)

  const t = {
    de: {
      subject: `Neue Terminanfrage von ${name}`,
      heading: 'Neue Terminanfrage',
      lPatient: 'Patient:in', lPhone: 'Telefon', lSlot: 'Gewünschter Termin', at: 'um',
      lType: 'Art', lReason: 'Grund', notProvided: 'Nicht angegeben', cta: 'Im Admin-Bereich ansehen →',
    },
    en: {
      subject: `New appointment request from ${name}`,
      heading: 'New Appointment Request',
      lPatient: 'Patient', lPhone: 'Phone', lSlot: 'Requested slot', at: 'at',
      lType: 'Type', lReason: 'Reason', notProvided: 'Not provided', cta: 'Review in admin panel →',
    },
  }[L]

  await resend.emails.send({
    from: FROM,
    to: await getAdminRecipients(),
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>${t.lPatient}:</strong> ${name} (${email})</p>
        ${phone ? `<p style="margin: 0 0 4px;"><strong>${t.lPhone}:</strong> ${phone}</p>` : ''}
        <p style="margin: 0 0 4px;"><strong>${t.lSlot}:</strong> ${formatDate(date, L)} ${t.at} ${formatTime(date, L)}</p>
        <p style="margin: 0 0 4px;"><strong>${t.lType}:</strong> ${type}</p>
        <p style="margin: 0;"><strong>${t.lReason}:</strong> ${reason || t.notProvided}</p>
      </div>
      <p><a href="${SITE_URL}/portal/admin/appointments" style="color: #8B9A6B;">${t.cta}</a></p>
    `, L),
  })
}

export async function sendAdminContactForm(opts: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  message: string
  locale?: string
}) {
  const resend = getResend()
  if (!resend) return
  const { firstName, lastName, email, phone, message } = opts
  const L = normLocale(opts.locale)

  const t = {
    de: {
      subject: `Neue Kontaktanfrage von ${firstName} ${lastName}`,
      heading: 'Neue Nachricht über das Kontaktformular',
      lName: 'Name', lEmail: 'E-Mail', lPhone: 'Telefon', lMessage: 'Nachricht',
    },
    en: {
      subject: `New contact from ${firstName} ${lastName}`,
      heading: 'New Contact Form Submission',
      lName: 'Name', lEmail: 'Email', lPhone: 'Phone', lMessage: 'Message',
    },
  }[L]

  await resend.emails.send({
    from: FROM,
    to: await getAdminRecipients(),
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>${t.lName}:</strong> ${firstName} ${lastName}</p>
        <p style="margin: 0 0 4px;"><strong>${t.lEmail}:</strong> ${email}</p>
        ${phone ? `<p style="margin: 0 0 4px;"><strong>${t.lPhone}:</strong> ${phone}</p>` : ''}
      </div>
      <p><strong>${t.lMessage}:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `, L),
  })
}

export async function sendAdminPortalRequest(opts: {
  name: string
  email: string
  preferredDates: string
  preferredTime: string
  type: string
  reason?: string
  locale?: string
}) {
  const resend = getResend()
  if (!resend) return
  const { name, email, preferredDates, preferredTime, type, reason } = opts
  const L = normLocale(opts.locale)

  const t = {
    de: {
      subject: `Neue Terminanfrage von ${name}`,
      heading: 'Neue Terminanfrage (Portal)',
      lPatient: 'Patient:in', lDates: 'Wunschdaten', lTime: 'Wunschzeit',
      lType: 'Art', lReason: 'Grund', notProvided: 'Nicht angegeben', cta: 'Im Admin-Bereich ansehen →',
    },
    en: {
      subject: `New appointment request from ${name}`,
      heading: 'New Appointment Request (Portal)',
      lPatient: 'Patient', lDates: 'Preferred dates', lTime: 'Preferred time',
      lType: 'Type', lReason: 'Reason', notProvided: 'Not provided', cta: 'Review in admin panel →',
    },
  }[L]

  await resend.emails.send({
    from: FROM,
    to: await getAdminRecipients(),
    subject: t.subject,
    html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 16px;">${t.heading}</h2>
      <div style="background: #F5F1EC; border-radius: 12px; padding: 16px; margin: 16px 0;">
        <p style="margin: 0 0 4px;"><strong>${t.lPatient}:</strong> ${name} (${email})</p>
        <p style="margin: 0 0 4px;"><strong>${t.lDates}:</strong> ${preferredDates}</p>
        <p style="margin: 0 0 4px;"><strong>${t.lTime}:</strong> ${preferredTime}</p>
        <p style="margin: 0 0 4px;"><strong>${t.lType}:</strong> ${type}</p>
        <p style="margin: 0;"><strong>${t.lReason}:</strong> ${reason || t.notProvided}</p>
      </div>
      <p><a href="${SITE_URL}/portal/admin/appointments" style="color: #8B9A6B;">${t.cta}</a></p>
    `, L),
  })
}
