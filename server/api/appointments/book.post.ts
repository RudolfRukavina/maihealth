import { Resend } from 'resend'
import { getAdminDb, getAdminAuth } from '../../utils/firebase-admin'
import { createZoomMeeting } from '../../utils/zoom'
import { Timestamp } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { slotDateTime, type, reason, guestName, guestEmail, guestPhone } = body

  if (!slotDateTime) {
    throw createError({ statusCode: 400, statusMessage: 'slotDateTime is required' })
  }

  const slotDate = new Date(slotDateTime)
  if (isNaN(slotDate.getTime())) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid slotDateTime' })
  }

  if (slotDate <= new Date()) {
    throw createError({ statusCode: 400, statusMessage: 'Cannot book a slot in the past' })
  }

  // Auth is optional: a signed-in Google user OR an anonymous guest may book.
  let decoded: { uid: string; name?: string; email?: string } | null = null
  const authHeader = getHeader(event, 'authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7)
    try {
      decoded = await getAdminAuth().verifyIdToken(token)
    } catch {
      throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
    }
  }

  // Resolve the patient identity from the account or the guest details.
  let patientId = ''
  let patientName = ''
  let patientEmail = ''
  let patientPhone = ''

  if (decoded) {
    patientId = decoded.uid
    patientName = decoded.name || decoded.email || 'Patient'
    patientEmail = decoded.email || ''
  } else {
    if (!guestName || !guestEmail || !guestPhone) {
      throw createError({ statusCode: 400, statusMessage: 'Name, email and phone number are required' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(guestEmail))) {
      throw createError({ statusCode: 400, statusMessage: 'Please enter a valid email address' })
    }
    patientName = String(guestName).trim()
    patientEmail = String(guestEmail).trim()
    patientPhone = String(guestPhone).trim()
  }

  const config = useRuntimeConfig()
  const db = getAdminDb()
  const slotTimestamp = Timestamp.fromDate(slotDate)

  // Check that the slot is still free
  const existingAppt = await db.collection('appointments')
    .where('date', '==', slotTimestamp)
    .where('status', '==', 'scheduled')
    .limit(1)
    .get()

  if (!existingAppt.empty) {
    throw createError({ statusCode: 409, statusMessage: 'This slot is no longer available' })
  }

  const existingReq = await db.collection('appointmentRequests')
    .where('slotDate', '==', slotTimestamp)
    .where('status', '==', 'pending')
    .limit(1)
    .get()

  if (!existingReq.empty) {
    throw createError({ statusCode: 409, statusMessage: 'This slot is no longer available' })
  }

  // Get slot duration from availability config
  const availDoc = await db.collection('availability').doc('config').get()
  const slotDuration = availDoc.exists ? (availDoc.data()!.slotDuration || 60) : 60

  // Only signed-in patients can qualify for instant (no-approval) booking.
  let isReturning = false
  if (decoded) {
    const completedSnapshot = await db.collection('appointments')
      .where('patientId', '==', decoded.uid)
      .where('status', '==', 'completed')
      .limit(1)
      .get()
    isReturning = !completedSnapshot.empty
  }

  if (isReturning) {
    // Direct booking: create appointment immediately
    let zoomMeetingId = ''
    let zoomJoinUrl = ''

    if (config.zoomClientId && config.zoomClientSecret) {
      const meeting = await createZoomMeeting(
        `MaiHealth — ${patientName}`,
        slotDate.toISOString(),
        slotDuration
      )
      zoomMeetingId = meeting.meetingId
      zoomJoinUrl = meeting.joinUrl
    }

    const apptRef = await db.collection('appointments').add({
      patientId: decoded!.uid,
      patientName,
      patientEmail,
      patientPhone,
      date: slotTimestamp,
      duration: slotDuration,
      type: type || 'followup',
      status: 'scheduled',
      zoomMeetingId,
      zoomJoinUrl,
      notes: reason || '',
      createdAt: Timestamp.now(),
    })

    if (config.resendApiKey && patientEmail) {
      const resend = new Resend(config.resendApiKey)
      const dateStr = slotDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      const timeStr = slotDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      await resend.emails.send({
        from: 'MaiHealth <noreply@maihealth.com>',
        to: patientEmail,
        subject: 'Your MaiHealth appointment is confirmed',
        html: `
          <h2>Appointment Confirmed</h2>
          <p>Dear ${patientName},</p>
          <p>Your appointment has been booked:</p>
          <p><strong>Date:</strong> ${dateStr}</p>
          <p><strong>Time:</strong> ${timeStr}</p>
          <p><strong>Duration:</strong> ${slotDuration} minutes</p>
          ${zoomJoinUrl ? `<p><strong>Video Call:</strong> <a href="${zoomJoinUrl}">Join Zoom Meeting</a></p>` : ''}
          <p>View your appointments in your <a href="https://maihealth.com/portal">patient portal</a>.</p>
        `,
      })
    }

    return {
      type: 'booked',
      appointmentId: apptRef.id,
      zoomJoinUrl,
      date: slotDate.toISOString(),
      duration: slotDuration,
    }
  } else {
    // First-time / guest patient: hold the slot as a pending request
    await db.collection('appointmentRequests').add({
      patientId: decoded?.uid || null,
      patientName,
      patientEmail,
      patientPhone,
      slotDate: slotTimestamp,
      preferredDateRange: {
        start: slotTimestamp,
        end: slotTimestamp,
      },
      preferredTimeOfDay: 'morning',
      type: type || 'initial',
      reason: reason || '',
      status: 'pending',
      createdAt: Timestamp.now(),
    })

    if (config.resendApiKey) {
      const resend = new Resend(config.resendApiKey)
      const dateStr = slotDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      const timeStr = slotDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      await resend.emails.send({
        from: 'MaiHealth <noreply@maihealth.com>',
        to: config.contactEmail,
        subject: `New appointment request from ${patientName}`,
        html: `
          <h2>New Appointment Request</h2>
          <p><strong>Patient:</strong> ${patientName} (${patientEmail})</p>
          ${patientPhone ? `<p><strong>Phone:</strong> ${patientPhone}</p>` : ''}
          <p><strong>Requested slot:</strong> ${dateStr} at ${timeStr}</p>
          <p><strong>Type:</strong> ${type || 'initial'}</p>
          <p><strong>Reason:</strong> ${reason || 'Not provided'}</p>
        `,
      })
    }

    return {
      type: 'requested',
      date: slotDate.toISOString(),
      duration: slotDuration,
    }
  }
})
