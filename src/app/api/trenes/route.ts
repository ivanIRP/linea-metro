import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const trenes = await prisma.tren.findMany({
      include: {
        linea: true,
        mantenimientos: {
          orderBy: {
            fecha: 'desc',
          },
          take: 3,
        },
        metricas: {
          orderBy: {
            fecha: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json(trenes)
  } catch (error) {
    console.error('Error fetching trenes:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Get or create a default line if none exists
    let lineaId = body.lineaId
    if (!lineaId) {
      const defaultLinea = await prisma.linea.findFirst()
      if (!defaultLinea) {
        const newLinea = await prisma.linea.create({
          data: {
            nombre: 'Línea Principal',
            longitud: 10.0,
            estado: 'Operativa',
            inauguracion: '2024',
            pasajerosPorDia: 0
          }
        })
        lineaId = newLinea.id
      } else {
        lineaId = defaultLinea.id
      }
    }

    const tren = await prisma.tren.create({
      data: {
        modelo: body.modelo,
        lineaId: lineaId,
        estado: body.estado || 'EnServicio',
        ubicacion: body.ubicacion,
        capacidad: parseInt(body.capacidad),
        velocidadMaxima: parseInt(body.velocidadMaxima),
        ultimoMantenimiento: body.ultimoMantenimiento ? new Date(body.ultimoMantenimiento) : null,
        proximoMantenimiento: body.proximoMantenimiento ? new Date(body.proximoMantenimiento) : null,
      },
      include: {
        linea: true,
      },
    })
    
    return NextResponse.json(tren, { status: 201 })
  } catch (error) {
    console.error('Error creating tren:', error)
    return NextResponse.json(
      { error: 'Error al crear el tren' },
      { status: 500 }
    )
  }
}