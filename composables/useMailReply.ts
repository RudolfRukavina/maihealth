interface DraftOpts {
  email?: string
  name?: string
  /** Patient's site language. Anything other than 'en' defaults to German (the practice language). */
  locale?: string
  /** Optional subject override. */
  subject?: string
}

// Full sign-off for plain mailto: (no branded footer to lean on).
const SIG_FULL = {
  de: 'Herzliche Grüße\nMai Jimenez\nMaiHealth — Ärztin für Darmgesundheit & Reizdarm\nmai-health.de',
  en: 'Warm regards,\nMai Jimenez\nMaiHealth — Physician for Gut Health & IBS\nmai-health.de',
}

// Short sign-off for the branded composer (the email layout adds the footer).
const SIG_SHORT = {
  de: 'Herzliche Grüße\nMai Jimenez',
  en: 'Warm regards,\nMai Jimenez',
}

const DEFAULT_SUBJECT = {
  de: 'Ihre Anfrage bei MaiHealth',
  en: 'Your enquiry to MaiHealth',
}

function pick(locale?: string): 'de' | 'en' {
  return locale === 'en' ? 'en' : 'de'
}

function greetingFor(name: string | undefined, L: 'de' | 'en'): string {
  const first = (name || '').trim().split(' ')[0]
  if (L === 'de') return first ? `Hallo ${first},` : 'Hallo,'
  return first ? `Hi ${first},` : 'Hi,'
}

/**
 * Pre-filled subject + message body for the branded in-app composer. The blank
 * lines between greeting and sign-off are where the reply gets typed.
 */
export function replyDraft({ name, locale, subject }: DraftOpts): { subject: string; body: string } {
  const L = pick(locale)
  const body = `${greetingFor(name, L)}\n\n\n\n${SIG_SHORT[L]}`
  return { subject: subject || DEFAULT_SUBJECT[L], body }
}

/**
 * Fallback mailto: link (opens the admin's own mail client) — used when the
 * branded sender isn't available, or for those who prefer their own client.
 */
export function buildReplyMailto({ email, name, locale, subject }: DraftOpts): string {
  const L = pick(locale)
  const body = `${greetingFor(name, L)}\n\n\n\n${SIG_FULL[L]}`
  const subj = subject || DEFAULT_SUBJECT[L]
  return `mailto:${email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`
}
