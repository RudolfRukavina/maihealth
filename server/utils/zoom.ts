let cachedToken: { token: string; expiresAt: number } | null = null

async function getZoomAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60000) {
    return cachedToken.token
  }

  const config = useRuntimeConfig()
  const credentials = Buffer.from(`${config.zoomClientId}:${config.zoomClientSecret}`).toString('base64')

  const response = await fetch('https://zoom.us/oauth/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'account_credentials',
      account_id: config.zoomAccountId,
    }),
  })

  if (!response.ok) {
    throw new Error(`Zoom token request failed: ${response.statusText}`)
  }

  const data = await response.json()
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  }

  return cachedToken.token
}

export async function createZoomMeeting(topic: string, startTime: string, duration: number = 60) {
  const token = await getZoomAccessToken()

  const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic,
      type: 2,
      start_time: startTime,
      duration,
      timezone: 'Europe/Berlin',
      settings: {
        join_before_host: false,
        waiting_room: true,
        meeting_authentication: false,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`Zoom meeting creation failed: ${response.statusText}`)
  }

  const meeting = await response.json()
  return {
    meetingId: String(meeting.id),
    joinUrl: meeting.join_url,
  }
}

export async function updateZoomMeeting(
  meetingId: string,
  updates: { topic?: string; startTime?: string; duration?: number }
) {
  const token = await getZoomAccessToken()

  const body: Record<string, any> = { timezone: 'Europe/Berlin' }
  if (updates.topic !== undefined) body.topic = updates.topic
  if (updates.startTime !== undefined) body.start_time = updates.startTime
  if (updates.duration !== undefined) body.duration = updates.duration

  const response = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  // 404 means the meeting no longer exists on Zoom — nothing to update.
  if (!response.ok && response.status !== 404) {
    throw new Error(`Zoom meeting update failed: ${response.statusText}`)
  }
}

export async function deleteZoomMeeting(meetingId: string) {
  const token = await getZoomAccessToken()

  const response = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  // 404 means the meeting is already gone — treat as success.
  if (!response.ok && response.status !== 404) {
    throw new Error(`Zoom meeting deletion failed: ${response.statusText}`)
  }
}
