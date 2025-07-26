import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const puntosAcceso = await prisma.puntoAcceso.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(puntosAcceso)
  } catch (error) {
    console.error('Error fetching access points:', error)
    return NextResponse.json({ error: 'Error al obtener los puntos de acceso' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, ubicacion, estado, tipoAcceso, estacionId } = body

    if (!nombre || !ubicacion) {
      return NextResponse.json({ error: 'El nombre y ubicación son requeridos' }, { status: 400 })
    }

    const puntoAcceso = await prisma.puntoAcceso.create({
      data: {
        nombre,
        ubicacion,
        estado: estado || 'Cerrado',
        tipoAcceso: tipoAcceso || 'Tarjeta',
        estacionId: estacionId || null
      }
    })

    return NextResponse.json(puntoAcceso, { status: 201 })
  } catch (error) {
    console.error('Error creating access point:', error)
    return NextResponse.json({ error: 'Error al crear el punto de acceso' }, { status: 500 })
  }
}