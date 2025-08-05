// /lib/auth.ts
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

export interface DecodedUser {
  id: string
  email: string
  role: 'admin' | 'user' | 'trainer'
  exp: number
  iat: number
}

export async function getUserFromToken(): Promise<DecodedUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const { id, email, role, exp, iat } = payload as Record<string, unknown>
    if (
      typeof id === 'string' &&
      typeof email === 'string' &&
      (role === 'admin' || role === 'user' || role === 'trainer') &&
      typeof exp === 'number' &&
      typeof iat === 'number'
    ) {
      return { id, email, role, exp, iat } as DecodedUser
    }
    return null
  } catch (error) {
    console.error('[JWT ERROR]', error)
    return null
  }
}
