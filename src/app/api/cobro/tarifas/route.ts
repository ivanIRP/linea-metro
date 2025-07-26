import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const tarifas = await prisma.tarifa.findMany({
      include: {
        _count: {
          select: {
            transacciones: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json(tarifas)
  } catch (error) {
    console.error('Error fetching tarifas:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const tarifa = await prisma.tarifa.create({
      data: {
        tipo: body.tipo,
        precio: parseFloat(body.precio),
        descripcion: body.descripcion,
        estado: body.estado || 'Activa',
      },
    })
    
    return NextResponse.json(tarifa, { status: 201 })
  } catch (error) {
    console.error('Error creating tarifa:', error)
    return NextResponse.json(
      { error: 'Error al crear la tarifa' },
      { status: 500 }
    )
  }
}