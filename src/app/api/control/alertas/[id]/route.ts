import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { resuelta } = body

    const alerta = await prisma.alerta.update({
      where: {
        id: params.id
      },
      data: {
        resuelta: resuelta
      }
    })

    return NextResponse.json(alerta)
  } catch (error) {
    console.error('Error updating alerta:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}