import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('metro-session')

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'No hay sesión activa' },
        { status: 401 }
      )
    }

    try {
      const sessionData = JSON.parse(sessionCookie.value)
      
      return NextResponse.json({
        user: sessionData,
      })
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Sesión inválida' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Error al obtener sesión:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}