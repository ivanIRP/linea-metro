import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const equipos = await prisma.equipoElectrico.findMany({
      include: {
        subestacion: {
          select: {
            nombre: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json(equipos)
  } catch (error) {
    console.error('Error fetching equipos:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get or create a default subestacion if none exists
    let subestacionId = body.subestacionId
    if (!subestacionId) {
      const defaultSub = await prisma.subestacionElectrica.findFirst()
      if (!defaultSub) {
        const newSub = await prisma.subestacionElectrica.create({
          data: {
            nombre: 'Subestación Principal',
            ubicacion: 'Central',
            voltaje: '220V',
            potencia: '1000kW',
            activa: true
          }
        })
        subestacionId = newSub.id
      } else {
        subestacionId = defaultSub.id
      }
    }

    const equipo = await prisma.equipoElectrico.create({
      data: {
        nombre: body.nombre,
        subestacionId: subestacionId,
        tipo: body.tipo || 'Transformador',
        activo: body.activo !== undefined ? body.activo : true,
      },
      include: {
        subestacion: {
          select: {
            nombre: true,
          },
        },
      },
    })
    
    return NextResponse.json(equipo, { status: 201 })
  } catch (error) {
    console.error('Error creating equipo:', error)
    return NextResponse.json(
      { error: 'Error al crear el equipo' },
      { status: 500 }
    )
  }
}