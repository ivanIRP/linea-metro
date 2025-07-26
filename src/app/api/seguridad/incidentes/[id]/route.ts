import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { tipo, descripcion, ubicacion, prioridad, estado } = body

    if (!tipo || !descripcion || !ubicacion) {
      return NextResponse.json({ error: 'Tipo, descripción y ubicación son requeridos' }, { status: 400 })
    }

    const incidente = await prisma.incidenteSeguridad.update({
      where: { id: params.id },
      data: {
        tipo,
        descripcion,
        ubicacion,
        prioridad,
        estado
      }
    })

    return NextResponse.json(incidente)
  } catch (error) {
    console.error('Error updating incident:', error)
    return NextResponse.json({ error: 'Error al actualizar el incidente' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.incidenteSeguridad.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Incidente eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting incident:', error)
    return NextResponse.json({ error: 'Error al eliminar el incidente' }, { status: 500 })
  }
}