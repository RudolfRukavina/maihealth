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
