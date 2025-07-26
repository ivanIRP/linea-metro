import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const rutas = await prisma.ruta.findMany({
      include: {
        linea: {
          select: {
            nombre: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json(rutas)
  } catch (error) {
    console.error('Error fetching rutas:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const ruta = await prisma.ruta.create({
      data: {
        nombre: body.nombre,
        lineaId: body.lineaId,
        origen: body.origen,
        destino: body.destino,
        distancia: parseFloat(body.distancia),
        duracion: parseInt(body.duracion),
        estado: body.estado || 'Activa',
        frecuencia: parseInt(body.frecuencia),
      },
      include: {
        linea: {
          select: {
            nombre: true,
          },
        },
      },
    })
    
    return NextResponse.json(ruta, { status: 201 })
  } catch (error) {
    console.error('Error creating ruta:', error)
    return NextResponse.json(
      { error: 'Error al crear la ruta' },
      { status: 500 }
    )
  }
}