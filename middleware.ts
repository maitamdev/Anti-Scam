import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Security middleware for all routes
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Protected routes requiring authentication
  const protectedRoutes = [
    '/dashboard',
    '/org',
    '/api/history',
    '/api/watchlist',
    '/api/api-keys',
    '/api/export',
    '/api/organizations',
  ]

  // Admin routes
  const adminRoutes = ['/admin', '/api/admin']

  // Business+ routes (require BUSINESS or ENTERPRISE tier)
  const businessRoutes = ['/dashboard/api-keys', '/api/api-keys', '/org', '/api/organizations']

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  const isBusinessRoute = businessRoutes.some(route => pathname.startsWith(route))

  // Auth check for protected routes
  if (isProtectedRoute || isAdminRoute || isBusinessRoute) {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    })

    // Not authenticated
    if (!token) {
      if (pathname.startsWith('/api/')) {
        return new NextResponse(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        )
      }
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }

    // Admin check
    if (isAdminRoute && token.role !== 'ADMIN') {
      return new NextResponse(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Business tier check
    if (isBusinessRoute && (token.tier === 'FREE' || token.tier === 'PRO')) {
      if (pathname.startsWith('/api/')) {
        return new NextResponse(
          JSON.stringify({ error: 'Business tier required' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        )
      }
      return NextResponse.redirect(new URL('/pricing?feature=api', request.url))
    }
  }

  // Security headers
  const response = NextResponse.next()
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )

  // Block access to sensitive paths
  if (pathname.includes('/_next/') && pathname.includes('.env')) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  return response
}

export const config = {
  matcher: [
    // Match all paths except static files and auth routes
    '/((?!_next/static|_next/image|favicon.ico|icon-.*\\.png|manifest.json|api/auth).*)',
  ],
}
