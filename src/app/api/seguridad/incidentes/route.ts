import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const incidentes = await prisma.incidenteSeguridad.findMany({
      orderBy: { fechaIncidente: 'desc' }
    })
    
    return NextResponse.json(incidentes)
  } catch (error) {
    console.error('Error fetching incidents:', error)
    return NextResponse.json({ error: 'Error al obtener los incidentes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tipo, descripcion, ubicacion, prioridad, estado } = body

    if (!tipo || !descripcion || !ubicacion) {
      return NextResponse.json({ error: 'Tipo, descripción y ubicación son requeridos' }, { status: 400 })
    }

    const incidente = await prisma.incidenteSeguridad.create({
      data: {
        tipo,
        descripcion,
        ubicacion,
        prioridad: prioridad || 'Media',
        estado: estado || 'Pendiente',
        fechaIncidente: new Date()
      }
    })

    return NextResponse.json(incidente, { status: 201 })
  } catch (error) {
    console.error('Error creating incident:', error)
    return NextResponse.json({ error: 'Error al crear el incidente' }, { status: 500 })
  }
}