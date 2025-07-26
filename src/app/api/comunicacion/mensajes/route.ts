import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const mensajes = await prisma.mensajeSistema.findMany({
      orderBy: {
        fechaEnvio: 'desc',
      },
      take: 50,
    })
    
    return NextResponse.json(mensajes)
  } catch (error) {
    console.error('Error fetching mensajes:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const mensaje = await prisma.mensajeSistema.create({
      data: {
        destinatario: body.destinatario,
        asunto: body.asunto,
        mensaje: body.mensaje,
        prioridad: body.prioridad || 'Normal',
        estado: body.estado || 'Enviado',
        fechaEnvio: new Date(),
      },
    })
    
    return NextResponse.json(mensaje, { status: 201 })
  } catch (error) {
    console.error('Error creating mensaje:', error)
    return NextResponse.json(
      { error: 'Error al crear el mensaje' },
      { status: 500 }
    )
  }
}