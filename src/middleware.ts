import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('metro-session')
  const { pathname } = request.nextUrl

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/login', '/']
  
  // Redireccionar la raíz al dashboard si está autenticado
  if (pathname === '/' && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Si es una ruta pública, permitir el acceso
  if (publicRoutes.includes(pathname)) {
    // Si ya está autenticado y trata de ir al login, redirigir al dashboard
    if (sessionCookie && pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Para todas las demás rutas, verificar autenticación
  if (!sessionCookie) {
    // No hay sesión, redirigir al login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Verificar que la sesión sea válida
  try {
    JSON.parse(sessionCookie.value)
    // Sesión válida, continuar
    return NextResponse.next()
  } catch (error) {
    console.error(error);
    // Sesión inválida, redirigir al login
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