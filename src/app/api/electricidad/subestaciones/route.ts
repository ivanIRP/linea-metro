import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const subestaciones = await prisma.subestacion.findMany({
      include: {
        equipos: true,
        alertas: {
          where: {
            resuelto: false,
          },
        },
        consumos: {
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
    
    return NextResponse.json(subestaciones)
  } catch (error) {
    console.error('Error fetching subestaciones:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const subestacion = await prisma.subestacion.create({
      data: {
        nombre: body.nombre,
        ubicacion: body.ubicacion,
        voltaje: body.voltaje,
        potencia: body.potencia,
        estado: body.estado || 'Operativa',
        carga: parseFloat(body.carga) || 0,
        temperatura: parseFloat(body.temperatura) || 25,
      },
    })
    
    return NextResponse.json(subestacion, { status: 201 })
  } catch (error) {
    console.error('Error creating subestacion:', error)
    return NextResponse.json(
      { error: 'Error al crear la subestación' },
      { status: 500 }
    )
  }
}