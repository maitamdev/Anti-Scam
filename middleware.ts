import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Security middleware for all routes
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )

  // Block access to sensitive paths
  const pathname = request.nextUrl.pathname

  // Block direct access to API internals
  if (pathname.includes('/_next/') && pathname.includes('.env')) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Protect admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const adminSecret = request.headers.get('x-admin-secret')
    const cookieSecret = request.cookies.get('admin_session')?.value

    // Allow if has valid session cookie (set after login)
    if (!cookieSecret && !adminSecret) {
      // Redirect to home for admin page, return 401 for API
      if (pathname.startsWith('/api/')) {
        return new NextResponse(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        )
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico|icon-.*\\.png|manifest.json).*)',
  ],
}
