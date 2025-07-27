import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const usuario = await prisma.usuario.update({
      where: { id: params.id },
      data: {
        username: body.username,
        nombre: body.nombre,
        email: body.email,
        rol: body.rol,
        activo: body.activo,
        // Don't update password unless explicitly provided
        ...(body.password && { password: body.password }),
      },
    })

    return NextResponse.json(usuario)
  } catch (error) {
    console.error('Error updating usuario:', error)
    return NextResponse.json({ error: 'Error al actualizar el usuario' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.usuario.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Usuario eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting usuario:', error)
    return NextResponse.json({ error: 'Error al eliminar el usuario' }, { status: 500 })
  }
}