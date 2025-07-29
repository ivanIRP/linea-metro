import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json(usuarios)
  } catch (error) {
    console.error('Error fetching personal:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const usuario = await prisma.usuario.create({
      data: {
        username: body.username,
        password: body.password || 'default123',
        nombre: body.nombre,
        email: body.email,
        rol: body.rol || 'Operador',
        activo: body.activo !== undefined ? body.activo : true,
      },
    })
    
    return NextResponse.json(usuario, { status: 201 })
  } catch (error) {
    console.error('Error creating usuario:', error)
    return NextResponse.json(
      { error: 'Error al crear el usuario' },
      { status: 500 }
    )
  }
}