import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const alertas = await prisma.alertaSistema.findMany({
      orderBy: {
        timestamp: 'desc'
      },
      take: 50
    })

    return NextResponse.json(alertas)
  } catch (error) {
    console.error('Error fetching alertas:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const alerta = await prisma.alertaSistema.create({
      data: {
        tipo: body.tipo || 'Sistema',
        mensaje: body.mensaje,
        nivel: body.nivel || 'Info',
        estado: 'Activa',
        origen: body.origen || 'Sistema'
      }
    })
    
    return NextResponse.json(alerta, { status: 201 })
  } catch (error) {
    console.error('Error creating alerta:', error)
    return NextResponse.json(
      { error: 'Error al crear la alerta' },
      { status: 500 }
    )
  }
}