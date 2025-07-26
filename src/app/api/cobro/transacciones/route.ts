import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const transacciones = await prisma.transaccionCobro.findMany({
      include: {
        tarifa: {
          select: {
            tipo: true,
          },
        },
        estacion: {
          select: {
            nombre: true,
          },
        },
      },
      orderBy: {
        fecha: 'desc',
      },
      take: 50, // Limitar a las últimas 50 transacciones
    })
    
    return NextResponse.json(transacciones)
  } catch (error) {
    console.error('Error fetching transacciones:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const transaccion = await prisma.transaccionCobro.create({
      data: {
        tarifaId: body.tarifaId,
        estacionId: body.estacionId || null,
        tarjeta: body.tarjeta,
        monto: parseFloat(body.monto),
        metodoPago: body.metodoPago,
        estado: body.estado || 'Exitosa',
        fecha: body.fecha ? new Date(body.fecha) : new Date(),
      },
      include: {
        tarifa: {
          select: {
            tipo: true,
          },
        },
        estacion: {
          select: {
            nombre: true,
          },
        },
      },
    })
    
    return NextResponse.json(transaccion, { status: 201 })
  } catch (error) {
    console.error('Error creating transaccion:', error)
    return NextResponse.json(
      { error: 'Error al crear la transacción' },
      { status: 500 }
    )
  }
}