import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const via = await prisma.via.update({
      where: { id: params.id },
      data: {
        nombre: body.nombre,
        tipo: body.tipo,
        longitud: parseFloat(body.longitud),
        activa: body.activa,
        material: body.material,
        ultimaInspeccion: body.ultimaInspeccion ? new Date(body.ultimaInspeccion) : null,
        proximaInspeccion: body.proximaInspeccion ? new Date(body.proximaInspeccion) : null,
        velocidadMaxima: parseInt(body.velocidadMaxima),
      },
    })

    return NextResponse.json(via)
  } catch (error) {
    console.error('Error updating via:', error)
    return NextResponse.json({ error: 'Error al actualizar la vía' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.via.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Vía eliminada correctamente' })
  } catch (error) {
    console.error('Error deleting via:', error)
    return NextResponse.json({ error: 'Error al eliminar la vía' }, { status: 500 })
  }
}