import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const incidentes = await prisma.incidente.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json(incidentes)
  } catch (error) {
    console.error('Error fetching incidentes:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const incidente = await prisma.incidente.create({
      data: {
        tipo: body.tipo,
        ubicacion: body.ubicacion,
        descripcion: body.descripcion,
        prioridad: body.prioridad || 'Media',
        estado: body.estado || 'Activo',
        resuelto: body.resuelto || false,
      },
    })
    
    return NextResponse.json(incidente, { status: 201 })
  } catch (error) {
    console.error('Error creating incidente:', error)
    return NextResponse.json(
      { error: 'Error al crear el incidente' },
      { status: 500 }
    )
  }
}