import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const lineas = await prisma.linea.findMany({
      include: {
        estaciones: {
          select: {
            nombre: true,
            orden: true,
          },
          orderBy: {
            orden: 'asc'
          }
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    // Transform lineas to look like rutas
    const rutas = lineas.map(linea => ({
      id: linea.id,
      nombre: linea.nombre,
      origen: linea.estaciones[0]?.nombre || 'Sin definir',
      destino: linea.estaciones[linea.estaciones.length - 1]?.nombre || 'Sin definir',
      distancia: linea.longitud,
      duracion: Math.round(linea.longitud * 1.5), // Estimate: 1.5 min per km
      frecuencia: 5, // Default frequency
      estado: linea.estado,
      linea: { nombre: linea.nombre },
      createdAt: linea.createdAt,
      updatedAt: linea.updatedAt
    }))
    
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
    
    const linea = await prisma.linea.create({
      data: {
        nombre: body.nombre,
        longitud: parseFloat(body.distancia),
        estado: body.estado === 'Activa' ? 'Operativa' : 'Mantenimiento',
        inauguracion: new Date().getFullYear().toString(),
        pasajerosPorDia: 0,
      },
      include: {
        estaciones: true,
      },
    })
    
    // Transform back to ruta format
    const ruta = {
      id: linea.id,
      nombre: linea.nombre,
      origen: body.origen,
      destino: body.destino,
      distancia: linea.longitud,
      duracion: parseInt(body.duracion),
      frecuencia: parseInt(body.frecuencia),
      estado: body.estado,
      linea: { nombre: linea.nombre },
      createdAt: linea.createdAt,
      updatedAt: linea.updatedAt
    }
    
    return NextResponse.json(ruta, { status: 201 })
  } catch (error) {
    console.error('Error creating ruta:', error)
    return NextResponse.json(
      { error: 'Error al crear la ruta' },
      { status: 500 }
    )
  }
}