import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const alertas = await prisma.alertaSeguridad.findMany({
      include: {
        estacion: {
          select: {
            nombre: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json(alertas)
  } catch (error) {
    console.error('Error fetching alertas seguridad:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const alerta = await prisma.alertaSeguridad.create({
      data: {
        estacionId: body.estacionId || null,
        tipo: body.tipo,
        ubicacion: body.ubicacion,
        nivel: body.nivel,
        descripcion: body.descripcion,
        estado: body.estado || 'Activa',
      },
      include: {
        estacion: {
          select: {
            nombre: true,
          },
        },
      },
    })
    
    return NextResponse.json(alerta, { status: 201 })
  } catch (error) {
    console.error('Error creating alerta seguridad:', error)
    return NextResponse.json(
      { error: 'Error al crear la alerta' },
      { status: 500 }
    )
  }
}