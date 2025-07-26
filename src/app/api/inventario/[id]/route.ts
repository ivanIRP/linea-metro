import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const equipo = await prisma.equipoElectrico.update({
      where: { id: params.id },
      data: {
        nombre: body.nombre,
        tipo: body.tipo,
        activo: body.activo,
      },
      include: {
        subestacion: {
          select: {
            nombre: true,
          },
        },
      },
    })

    return NextResponse.json(equipo)
  } catch (error) {
    console.error('Error updating equipo:', error)
    return NextResponse.json({ error: 'Error al actualizar el equipo' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.equipoElectrico.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Equipo eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting equipo:', error)
    return NextResponse.json({ error: 'Error al eliminar el equipo' }, { status: 500 })
  }
}