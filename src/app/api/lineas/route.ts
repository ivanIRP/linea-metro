import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const lineas = await prisma.linea.findMany({
      include: {
        trenes: true,
        estacionesRel: true,
        rutas: true,
        vias: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json(lineas)
  } catch (error) {
    console.error('Error fetching lineas:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const linea = await prisma.linea.create({
      data: {
        nombre: body.nombre,
        longitud: parseFloat(body.longitud),
        estaciones: parseInt(body.estaciones),
        estado: body.estado || 'Operativa',
        inauguracion: body.inauguracion,
        pasajerosPorDia: parseInt(body.pasajerosPorDia),
      },
    })
    
    return NextResponse.json(linea, { status: 201 })
  } catch (error) {
    console.error('Error creating linea:', error)
    return NextResponse.json(
      { error: 'Error al crear la línea' },
      { status: 500 }
    )
  }
}