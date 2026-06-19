import { getAdminDb, getAdminAuth } from '../../utils/firebase-admin'
import { createZoomMeeting } from '../../utils/zoom'
import { sendBookingConfirmation, sendRequestReceived, sendAdminNewRequest } from '../../utils/email'
import { consentRecord } from '../../utils/consent'
import { Timestamp } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { slotDateTime, type, reason, consent, guestName, guestEmail, guestPhone } = body

  if (!slotDateTime) {
    throw createError({ statusCode: 400, statusMessage: 'slotDateTime is required' })
  }

  if (consent !== true) {
    throw createError({ statusCode: 400, statusMessage: 'Consent is required to book a consultation' })
  }

  const consent_ = consentRecord(event)

  const slotDate = new Date(slotDateTime)
  if (isNaN(slotDate.getTime())) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid slotDateTime' })
  }

  if (slotDate <= new Date()) {
    throw createError({ statusCode: 400, statusMessage: 'Cannot book a slot in the past' })
  }

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

  const availDoc = await db.collection('availability').doc('config').get()
  const slotDuration = availDoc.exists ? (availDoc.data()!.slotDuration || 60) : 60

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
      consent: consent_,
      createdAt: Timestamp.now(),
    })

    await sendBookingConfirmation({
      to: patientEmail,
      name: patientName,
      date: slotDate,
      duration: slotDuration,
      zoomJoinUrl,
    })

    return {
      type: 'booked',
      appointmentId: apptRef.id,
      zoomJoinUrl,
      date: slotDate.toISOString(),
      duration: slotDuration,
    }
  } else {
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
      consent: consent_,
      status: 'pending',
      createdAt: Timestamp.now(),
    })

    await sendAdminNewRequest({
      name: patientName,
      email: patientEmail,
      phone: patientPhone,
      date: slotDate,
      type: type || 'initial',
      reason,
    })

    if (patientEmail) {
      await sendRequestReceived({
        to: patientEmail,
        name: patientName,
        date: slotDate,
      })
    }

    return {
      type: 'requested',
      date: slotDate.toISOString(),
      duration: slotDuration,
    }
  }
})
