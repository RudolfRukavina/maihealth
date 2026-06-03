import type { H3Event } from 'h3'
import { getAdminAuth } from './firebase-admin'

export async function verifyAuth(event: H3Event) {
  const authorization = getHeader(event, 'authorization')
  if (!authorization?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Missing or invalid authorization header' })
  }

  const token = authorization.slice(7)
  try {
    return await getAdminAuth().verifyIdToken(token)
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
  }
}
