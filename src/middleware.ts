import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('metro-session')
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ['/login']
  
  // Handle root route
  if (pathname === '/') {
    if (sessionCookie) {
      try {
        JSON.parse(sessionCookie.value)
        // Valid session, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url))
      } catch (error) {
        console.error('Invalid session:', error)
        // Invalid session, clear cookie and redirect to login
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('metro-session')
        return response
      }
    } else {
      // No session, redirect to login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  // Handle public routes
  if (publicRoutes.includes(pathname)) {
    // If already authenticated and trying to go to login, redirect to dashboard
    if (sessionCookie) {
      try {
        JSON.parse(sessionCookie.value)
        return NextResponse.redirect(new URL('/dashboard', request.url))
      } catch (error) {
        console.error('Invalid session on login:', error)
        // Invalid session, clear cookie and allow access to login
        const response = NextResponse.next()
        response.cookies.delete('metro-session')
        return response
      }
    }
    return NextResponse.next()
  }

  // For all other routes, verify authentication
  if (!sessionCookie) {
    // No session, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Verify that the session is valid
  try {
    const sessionData = JSON.parse(sessionCookie.value)
    
    // Additional validation - check if session has required fields
    if (!sessionData.user || !sessionData.user.id || !sessionData.user.username) {
      throw new Error('Invalid session structure')
    }
    
    // Valid session, continue
    return NextResponse.next()
  } catch (error) {
    console.error('Invalid session on protected route:', error);
    // Invalid session, redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('metro-session')
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}