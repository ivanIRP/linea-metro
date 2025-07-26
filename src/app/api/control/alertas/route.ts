import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const alertas = await prisma.alerta.findMany({
      orderBy: {
        fechaCreacion: 'desc'
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