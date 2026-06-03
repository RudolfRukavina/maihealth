# MaiHealth Client Workflow

## Vision

A new client should go from "I found this website" to "I'm in a Zoom call with Dr. Wald" with as little friction as possible. No separate sign-up forms, no email confirmations, no waiting around wondering what happens next. One Google login, pick a slot, done.

---

## Current Problems

1. **Login feels disconnected** — `/login` is a standalone page with no clear path to what happens after. A new visitor doesn't know what they're logging into or why.
2. **Appointment request is a black box** — Client submits a vague date range + time-of-day preference, then waits for Dr. Wald to manually accept and schedule. No visibility into available slots.
3. **Contact form vs. portal overlap** — `/contact` has a general form, but the portal also exists. New clients don't know which to use. Existing clients land on `/contact` and get nudged toward the portal, but it's awkward.
4. **No real-time availability** — The current flow requires admin round-trips (request → review → accept → Zoom link created → email sent). This adds days of delay.
5. **No onboarding** — A brand-new Google login user lands on an empty dashboard. No guidance on what to do next.

---

## Proposed Flow

### Phase 1: First Visit (anonymous)

```
Homepage / Service pages
        │
        ▼
   "Book a Consultation" CTA
        │
        ▼
   /book  ← NEW unified booking page
```

- The main CTA across the site becomes **"Book a Consultation"** pointing to `/book`
- `/book` is the single entry point for both new and returning clients
- `/contact` stays but becomes a general inquiries form only (not appointment-related)

### Phase 2: Seamless Login (on `/book`)

```
/book
  │
  ├─ Not logged in? → inline Google sign-in prompt
  │   (not a redirect — stays on the same page)
  │   "Sign in with Google to book your appointment"
  │
  └─ Already logged in? → skip straight to slot picker
```

- Login happens **in context**, not on a separate `/login` page
- `/login` still exists as a fallback/direct link but redirects to `/book` after auth
- Account is auto-created on first Google sign-in (already works this way)
- After sign-in, the page transitions smoothly to the booking UI — no page reload

### Phase 3: Pick a Slot

```
Slot Picker
  │
  ├─ Calendar view showing available slots
  │   (Dr. Wald sets her availability in admin)
  │
  ├─ Client picks a date + time
  │
  ├─ Brief intake form:
  │   - First consultation or follow-up?
  │   - One-line reason / main concern
  │
  └─ "Confirm Booking" button
```

- **Real availability, not a request** — Dr. Wald defines her open slots in the admin panel (e.g., "Tuesdays & Thursdays, 10:00-16:00, 60-min slots"). Clients pick from what's actually open.
- If Dr. Wald prefers to keep manual approval for first-time patients, the flow becomes: pick a slot → "Request this slot" → Dr. Wald confirms (or suggests alternative) → client gets email. But the slot is tentatively held.
- For returning patients, booking is instant — no approval needed.

### Phase 4: Confirmation

```
Booking confirmed
  │
  ├─ Confirmation screen with:
  │   - Date, time, duration
  │   - "Add to Google Calendar" button
  │   - Zoom link (generated automatically)
  │   - "What to expect" info
  │
  ├─ Confirmation email sent automatically
  │
  └─ Redirect to /portal (dashboard)
```

- Zoom meeting is auto-created on confirmation (already works)
- Email includes Zoom link + calendar invite attachment (.ics)
- Dashboard now shows the upcoming appointment immediately

### Phase 5: Before the Appointment

```
/portal (dashboard)
  │
  ├─ Upcoming appointment card:
  │   - Countdown / date
  │   - "Join Zoom" button (active 15 min before)
  │   - Option to reschedule or cancel
  │
  ├─ Optional: pre-consultation questionnaire
  │   (health history, symptoms, goals)
  │
  └─ Past appointments + notes from Dr. Wald
```

- Zoom button becomes active ~15 minutes before the appointment
- Reminder email sent 24h before + 1h before
- Client can cancel/reschedule up to 24h before

### Phase 6: The Appointment

```
Client clicks "Join Zoom"
  │
  └─ Opens Zoom in browser/app
      (standard Zoom experience)
```

- Nothing custom needed here — Zoom handles the video call
- After the call, Dr. Wald can add notes via admin panel

---

## Admin Side (Dr. Wald)

### Availability Management (NEW)

```
/portal/admin/availability
  │
  ├─ Weekly schedule builder
  │   (e.g., Tue 10-16, Thu 10-14)
  │
  ├─ Block specific dates
  │   (holidays, vacation, etc.)
  │
  └─ Set consultation duration
      (default 60 min, option for 30 min follow-ups)
```

### Appointment Management (enhanced)

```
/portal/admin/appointments
  │
  ├─ Pending requests (first-time patients)
  │   → Approve / Suggest different time / Decline
  │
  ├─ Upcoming appointments
  │   → View details, add notes, cancel
  │
  └─ Past appointments
      → Add post-consultation notes
```

---

## Page Structure (revised)

| Route | Purpose | Auth |
|---|---|---|
| `/` | Homepage | No |
| `/about` | About Dr. Wald | No |
| `/practice` | Practice info | No |
| `/book` | **NEW** — Book/request a consultation | Login required (inline) |
| `/contact` | General inquiries only | No |
| `/portal` | Patient dashboard | Yes |
| `/portal/appointments` | Full appointment history | Yes |
| `/login` | Fallback login → redirects to `/book` | No |
| `/portal/admin/*` | Admin panel | Yes + admin role |

### Pages to remove or merge
- `/portal/request-appointment` → replaced by `/book`

---

## Technical Requirements

### New: Availability System
- Firestore collection: `availability` — stores Dr. Wald's weekly schedule + blocked dates
- Server API: `GET /api/availability/slots?from=DATE&to=DATE` — returns available slots for a date range
- Admin API: `POST /api/admin/availability` — set/update weekly schedule

### New: Direct Booking (for returning patients)
- Server API: `POST /api/appointments/book` — instantly books a slot, creates Zoom meeting, sends confirmation
- Firestore: appointment created with status `scheduled` immediately

### Enhanced: Request Flow (for first-time patients)
- Same as current but with a specific slot attached (not just a vague date range)
- Admin approves → appointment created + Zoom link + email (already works)

### New: Calendar Integration
- Generate .ics file for email attachments
- "Add to Google Calendar" link on confirmation page

### New: Reminder Emails
- Cron job or Cloud Function: send reminders at 24h and 1h before appointment
- Include Zoom link in reminder

---

## Implementation Priority

### Must Have (Phase 1)
1. `/book` page with inline auth + slot picker
2. Admin availability management
3. Availability API (fetch open slots)
4. Direct booking for returning patients
5. Confirmation page with Zoom link

### Should Have (Phase 2)
6. Calendar invite (.ics) generation
7. Reminder emails (24h + 1h)
8. Reschedule/cancel from portal
9. Pre-consultation questionnaire

### Nice to Have (Phase 3)
10. SMS reminders
11. Waitlist for fully-booked slots
12. Post-consultation notes visible to patient

---

## Open Questions

1. **Manual approval for all, or just first-timers?** — If Dr. Wald wants to vet every new patient before confirming, the first booking becomes a request. Returning patients can book directly.
2. **Slot granularity** — 60-min default? Should follow-ups be 30 min?
3. **How far in advance can clients book?** — 2 weeks? 4 weeks? Rolling window?
4. **Cancellation policy** — 24h minimum? Any penalty?
5. **Payment integration needed?** — Or is billing handled separately?
