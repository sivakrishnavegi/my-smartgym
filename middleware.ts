import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY!)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  const token = request?.cookies?.get('token')?.value
  console.log( 'User token:', request)

  if (!token) {
    console.warn('No token found. Redirecting to /login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)

    const userRole = payload.role as string
console.log( 'User role:', userRole)
    const rolePermissions: Record<string, string[]> = {
      admin: ['/admin', '/dashboard'],
      user: ['/dashboard', '/profile'],
    }

    const allowedPaths = rolePermissions[userRole] || []

    const isAllowed = allowedPaths.some(path => pathname.startsWith(path))

    if (!isAllowed) {
      console.warn(`Access denied for role: ${userRole} to path: ${pathname}`)
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    return NextResponse.next()
  } catch (err) {
    console.error('JWT verification failed:', err)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/profile/:path*'],
}
