import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Context = {
  params: {
    id: string
  }
}

export async function PUT(request: NextRequest, context: Context) {
  const { id } = context.params

  try {
    const body = await request.json()
    const { ubicacion, estado, resolucion, estacionId } = body

    if (!ubicacion) {
      return NextResponse.json({ error: 'La ubicación es requerida' }, { status: 400 })
    }

    const camara = await prisma.camaraSeguridadNew.update({
      where: { id },
      data: {
        ubicacion,
        estado,
        resolucion,
        estacionId: estacionId || null,
      },
    })

    return NextResponse.json(camara)
  } catch (error) {
    console.error('Error al actualizar la cámara:', error)
    return NextResponse.json({ error: 'Error al actualizar la cámara' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  const { id } = context.params

  try {
    await prisma.camaraSeguridadNew.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Cámara eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar la cámara:', error)
    return NextResponse.json({ error: 'Error al eliminar la cámara' }, { status: 500 })
  }
}
