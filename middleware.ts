import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

const protectedRoutes = ['/admin', '/dashboard', '/profile']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect certain routes
  if (!protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)

    const userRole = payload.role as string

    const rolePermissions: Record<string, string[]> = {
      admin: ['/admin', '/dashboard'],
      user: ['/dashboard', '/profile'],
    }

    const allowedPaths = rolePermissions[userRole] || []

    if (!allowedPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    return NextResponse.next()
  } catch (err) {
    console.error('JWT Error:', err)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/profile/:path*'],
}
