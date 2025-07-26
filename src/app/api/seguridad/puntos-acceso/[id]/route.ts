import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { nombre, ubicacion, estado, tipoAcceso, estacionId } = body

    if (!nombre || !ubicacion) {
      return NextResponse.json({ error: 'El nombre y ubicación son requeridos' }, { status: 400 })
    }

    const puntoAcceso = await prisma.puntoAcceso.update({
      where: { id: params.id },
      data: {
        nombre,
        ubicacion,
        estado,
        tipoAcceso,
        estacionId: estacionId || null
      }
    })

    return NextResponse.json(puntoAcceso)
  } catch (error) {
    console.error('Error updating access point:', error)
    return NextResponse.json({ error: 'Error al actualizar el punto de acceso' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.puntoAcceso.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Punto de acceso eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting access point:', error)
    return NextResponse.json({ error: 'Error al eliminar el punto de acceso' }, { status: 500 })
  }
}