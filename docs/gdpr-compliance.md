# GDPR / DSGVO Compliance — MaiHealth

This is a German physician's website that processes **health data (special-category
data, Art. 9 GDPR)**. This document is the internal compliance record. It is not
legal advice — have it reviewed by a data-protection lawyer before launch.

Last updated: 2026-06-19

---

## 1. What has been implemented in code

| Area | What was done | Where |
|------|---------------|-------|
| Google Fonts | Self-hosted at build time (`download: true`) — no visitor IP sent to Google | `nuxt.config.ts` |
| Consent on forms | Required consent checkbox + privacy link on contact, newsletter, booking | `components/ContactForm.vue`, `components/NewsletterCTA.vue`, `pages/book.vue` |
| Health-data consent | Explicit Art. 9(2)(a) consent wording on the booking form | `pages/book.vue`, locales `consent.booking` |
| Consent proof | Server stores consent record (timestamp, policy version, IP, user agent) | `server/utils/consent.ts` + contact/booking handlers |
| Newsletter | Double opt-in (confirm + unsubscribe links), no advertising in confirm mail | `server/api/newsletter.post.ts`, `server/api/newsletter/confirm.get.ts`, `server/api/newsletter/unsubscribe.get.ts` |
| Erasure | Admin can delete contact submissions & newsletter subscribers | `firestore.rules` |
| Privacy policy | Full Art. 13 policy (DE + EN) | `pages/privacy.vue`, locales `privacy.*` |
| Legal notice | Impressum structure with placeholders (DE + EN) | `pages/impressum.vue`, locales `impressum.*` |

> Site languages: **German and English only** (Croatian/Italian removed).

**Policy version:** when the privacy wording changes materially, bump
`PRIVACY_POLICY_VERSION` in `server/utils/consent.ts` **and** `privacy.meta.version`
in the locale files so consent records stay attributable.

---

## 2. Record of processing activities (Art. 30) — summary

| Processing | Data | Legal basis | Retention |
|-----------|------|-------------|-----------|
| Contact form | Name, email, phone, message (may contain health data) | Art. 6(1)(a); Art. 9(2)(a) if health data | ≤ 6 months after handling |
| Appointment booking | Name, email, phone, reason, appointment details | Art. 6(1)(b); Art. 9(2)(a)/(h) | Up to 10 yrs (§ 630f BGB) for treatment records |
| Patient account | Name, email (Google sign-in) | Art. 6(1)(b) | Duration of relationship |
| Newsletter | Email, consent metadata | Art. 6(1)(a) | Until unsubscribe + proof retention |
| Server logs | IP, user agent, timestamps | Art. 6(1)(f) | Short, then deleted/anonymised |

### Processors (Auftragsverarbeiter)
- **Google (Firebase Auth, Cloud Firestore, hosting infra)** — Google Ireland/LLC
- **Resend** (email delivery) — Plusten, Inc., USA
- **Zoom** (video consultations) — Zoom Video Communications, Inc., USA
- **Hosting** — likely Vercel (`.vercel` present); confirm.

---

## 3. OPEN ITEMS — must be resolved before launch ⚠️

These need real-world information or account configuration and **cannot be done in code**:

1. **Confirm professional status.** The About page describes "dr. med. Mai Jimenez"
   with a Croatian medical degree. Determine the legally correct title and whether a
   German **Approbation** exists. This drives:
   - the Impressum professional-law fields (chamber, Approbation state, Berufsordnung), and
   - whether Art. 9(2)(h) (provision of healthcare) is available in addition to consent.
   Do **not** claim Approbation/chamber membership unless it is real.

2. **Complete the Impressum placeholders** (`[...]` fields, shown highlighted on the
   page): postal address, phone, professional title, chamber, VAT/tax status.

3. **Complete the privacy-policy placeholders:** postal address, the competent
   **supervisory authority** (depends on the Bundesland), Firestore region, hosting provider.

4. **Set the Firestore region to the EU** (`eur3` / `europe-west`, e.g. Frankfurt).
   Check in the Firebase console. If the project was created with a US default, the
   data location cannot be changed later — a new project/migration may be required.
   Then update the region named in the privacy policy.

5. **Sign Data Processing Agreements (AVV, Art. 28)** with:
   - Google Cloud / Firebase (Cloud Data Processing Addendum)
   - Resend
   - Zoom
   - the hosting provider
   Store copies. Verify each provider's EU-US Data Privacy Framework certification
   and/or Standard Contractual Clauses.

6. **Zoom configuration:** enable EU data residency where available; consider whether
   video consultations need an additional patient consent/notice.

7. **Data minimisation in admin emails:** contact messages and booking reasons (which
   may contain health data) are currently emailed in plaintext via Resend (US). Consider
   sending only a notification + portal link instead of the full content, once the
   admin portal is the system of record.

8. **Erasure / access process:** define how you handle a data-subject request end to
   end (appointments, requests, contact submissions, newsletter, Firebase Auth user).
   Admin delete is enabled in the rules; document the operational steps.

9. **Backups / TOM:** document technical & organisational measures (access control,
   encryption at rest via Firebase, backup retention) for the Art. 30 record.
