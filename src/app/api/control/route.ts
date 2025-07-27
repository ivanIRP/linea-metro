import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, trenId, mensaje } = body

    // Create an alert for the control action
    const alerta = await prisma.alertaSistema.create({
      data: {
        tipo: 'Sistema',
        mensaje: mensaje || `Acción de control: ${action}`,
        nivel: 'Info',
        estado: 'Activa',
        origen: trenId ? `Tren ${trenId}` : 'Centro de Control'
      }
    })

    // Log the control action
    console.log(`Control action executed: ${action}`, { trenId, mensaje })

    return NextResponse.json({ 
      success: true, 
      action, 
      alertaId: alerta.id,
      message: `Acción "${action}" ejecutada exitosamente` 
    })
  } catch (error) {
    console.error('Error executing control action:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Get trains with their data
    const trenes = await prisma.tren.findMany({
      include: {
        linea: {
          select: {
            nombre: true
          }
        },
        metricas: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Get active alerts
    const alertas = await prisma.alertaSistema.findMany({
      where: {
        estado: 'Activa'
      },
      orderBy: {
        timestamp: 'desc'
      },
      take: 20
    })

    // Get monitoring data
    const monitoreo = await prisma.monitoreoTiempoReal.findMany({
      orderBy: {
        timestamp: 'desc'
      },
      take: 50
    })

    return NextResponse.json({
      trenes,
      alertas,
      monitoreo
    })
  } catch (error) {
    console.error('Error fetching control data:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}