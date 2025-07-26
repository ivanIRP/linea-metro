import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { ubicacion, estado, resolucion, estacionId } = body

    if (!ubicacion) {
      return NextResponse.json({ error: 'La ubicación es requerida' }, { status: 400 })
    }

    const camara = await prisma.camaraSeguridadNew.update({
      where: { id: params.id },
      data: {
        ubicacion,
        estado,
        resolucion,
        estacionId: estacionId || null
      }
    })

    return NextResponse.json(camara)
  } catch (error) {
    console.error('Error updating camera:', error)
    return NextResponse.json({ error: 'Error al actualizar la cámara' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.camaraSeguridadNew.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Cámara eliminada correctamente' })
  } catch (error) {
    console.error('Error deleting camera:', error)
    return NextResponse.json({ error: 'Error al eliminar la cámara' }, { status: 500 })
  }
}