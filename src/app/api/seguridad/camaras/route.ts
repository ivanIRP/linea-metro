import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const camaras = await prisma.camaraSeguridadNew.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(camaras)
  } catch (error) {
    console.error('Error fetching cameras:', error)
    return NextResponse.json({ error: 'Error al obtener las cámaras' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ubicacion, estado, resolucion, estacionId } = body

    if (!ubicacion) {
      return NextResponse.json({ error: 'La ubicación es requerida' }, { status: 400 })
    }

    const camara = await prisma.camaraSeguridadNew.create({
      data: {
        ubicacion,
        estado: estado || 'Activa',
        resolucion: resolucion || 'HD',
        estacionId: estacionId || null,
      },
    })

    return NextResponse.json(camara, { status: 201 })
  } catch (error) {
    console.error('Error creating camera:', error)
    return NextResponse.json({ error: 'Error al crear la cámara' }, { status: 500 })
  }
}
