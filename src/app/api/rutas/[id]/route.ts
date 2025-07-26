import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const linea = await prisma.linea.update({
      where: { id: params.id },
      data: {
        nombre: body.nombre,
        longitud: parseFloat(body.distancia),
        estado: body.estado === 'Activa' ? 'Operativa' : 'Mantenimiento'
      },
      include: {
        estaciones: {
          orderBy: { orden: 'asc' }
        },
      },
    })

    // Transform back to ruta format
    const ruta = {
      id: linea.id,
      nombre: linea.nombre,
      origen: body.origen,
      destino: body.destino,
      distancia: linea.longitud,
      duracion: parseInt(body.duracion),
      frecuencia: parseInt(body.frecuencia),
      estado: body.estado,
      linea: { nombre: linea.nombre }
    }

    return NextResponse.json(ruta)
  } catch (error) {
    console.error('Error updating ruta:', error)
    return NextResponse.json({ error: 'Error al actualizar la ruta' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.linea.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Ruta eliminada correctamente' })
  } catch (error) {
    console.error('Error deleting ruta:', error)
    return NextResponse.json({ error: 'Error al eliminar la ruta' }, { status: 500 })
  }
}