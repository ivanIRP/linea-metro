import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const tren = await prisma.tren.update({
      where: { id: params.id },
      data: {
        modelo: body.modelo,
        estado: body.estado,
        ubicacion: body.ubicacion,
        capacidad: parseInt(body.capacidad),
        velocidadMaxima: parseInt(body.velocidadMaxima),
        ultimoMantenimiento: body.ultimoMantenimiento ? new Date(body.ultimoMantenimiento) : null,
        proximoMantenimiento: body.proximoMantenimiento ? new Date(body.proximoMantenimiento) : null
      },
      include: {
        linea: true,
      },
    })

    return NextResponse.json(tren)
  } catch (error) {
    console.error('Error updating tren:', error)
    return NextResponse.json({ error: 'Error al actualizar el tren' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.tren.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Tren eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting tren:', error)
    return NextResponse.json({ error: 'Error al eliminar el tren' }, { status: 500 })
  }
}