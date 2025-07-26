import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const vias = await prisma.via.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json(vias)
  } catch (error) {
    console.error('Error fetching vias:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const via = await prisma.via.create({
      data: {
        nombre: body.nombre,
        lineaId: body.lineaId,
        tipo: body.tipo,
        longitud: parseFloat(body.longitud),
        activa: body.activa !== undefined ? body.activa : true,
        material: body.material,
        ultimaInspeccion: body.ultimaInspeccion ? new Date(body.ultimaInspeccion) : null,
        proximaInspeccion: body.proximaInspeccion ? new Date(body.proximaInspeccion) : null,
        velocidadMaxima: parseInt(body.velocidadMaxima),
      },
    })
    
    return NextResponse.json(via, { status: 201 })
  } catch (error) {
    console.error('Error creating via:', error)
    return NextResponse.json(
      { error: 'Error al crear la vía' },
      { status: 500 }
    )
  }
}