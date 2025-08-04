import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Buscar usuario en la base de datos
    const usuario = await prisma.usuario.findUnique({
      where: {
        username: username,
      },
    })

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 401 }
      )
    }

    if (!usuario.activo) {
      return NextResponse.json(
        { error: 'Usuario inactivo' },
        { status: 401 }
      )
    }

    // Verificar contraseña (sin cifrado como solicitaste)
    if (usuario.password !== password) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      )
    }

    // Actualizar último acceso
    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { 
        ultimoAcceso: new Date() 
      },
    })

    // Crear sesión simple (sin JWT complejo)
    const userData = {
      id: usuario.id,
      username: usuario.username,
      nombre: usuario.nombre,
      rol: usuario.rol,
      email: usuario.email,
    }

    // La estructura de la sesión debe tener el objeto user
    const sessionData = {
      user: userData
    }

    const response = NextResponse.json(
      {
        message: 'Login exitoso',
        user: userData,
      },
      { status: 200 }
    )

    // Establecer cookie de sesión con la estructura correcta
    response.cookies.set('metro-session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    })

    return response
  } catch (error) {
    console.error('Error en login:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}