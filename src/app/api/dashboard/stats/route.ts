import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get current date for today's calculations
    const today = new Date()
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

    // Parallel database queries for better performance
    const [
      totalLineas,
      totalTrenes,
      totalEstaciones,
      totalIncidentes,
      lineasOperativas,
      trenesEnServicio,
      transaccionesHoy,
      alertasActivas,
      ingresosHoy,
      lineasData,
      actividadReciente
    ] = await Promise.all([
      // Basic counts
      prisma.linea.count(),
      prisma.tren.count(),
      prisma.estacion.count(),
      prisma.incidenteSeguridad.count({
        where: { estado: { in: ['Pendiente', 'EnProceso'] } }
      }),
      
      // Active counts
      prisma.linea.count({
        where: { estado: 'Operativa' }
      }),
      prisma.tren.count({
        where: { estado: 'EnServicio' }
      }),
      
      // Today's transactions
      prisma.transaccion.count({
        where: {
          fechaTransaccion: {
            gte: startOfDay,
            lt: endOfDay
          }
        }
      }),
      
      // Active alerts
      prisma.alertaSistema.count({
        where: { estado: 'Activa' }
      }),
      
      // Today's revenue
      prisma.transaccion.aggregate({
        where: {
          fechaTransaccion: {
            gte: startOfDay,
            lt: endOfDay
          }
        },
        _sum: {
          monto: true
        }
      }),
      
      // Lines with details
      prisma.linea.findMany({
        include: {
          _count: {
            select: {
              estaciones: true,
              trenes: true
            }
          }
        },
        orderBy: { nombre: 'asc' }
      }),
      
      // Recent activity from various sources
      prisma.incidenteSeguridad.findMany({
        take: 10,
        orderBy: { fechaIncidente: 'desc' },
        select: {
          id: true,
          tipo: true,
          descripcion: true,
          ubicacion: true,
          prioridad: true,
          fechaIncidente: true
        }
      })
    ])

    // Process lines data
    const lineasProcessed = lineasData.map(linea => ({
      id: linea.id,
      nombre: linea.nombre,
      estado: linea.estado,
      trenes: linea._count.trenes,
      estaciones: linea._count.estaciones,
      pasajerosPorDia: linea.pasajerosPorDia || 0
    }))

    // Process recent activity
    const actividadProcesada = actividadReciente.map(incidente => ({
      id: incidente.id,
      tipo: incidente.tipo,
      ubicacion: incidente.ubicacion,
      descripcion: incidente.descripcion.length > 50 
        ? incidente.descripcion.substring(0, 50) + '...' 
        : incidente.descripcion,
      prioridad: incidente.prioridad,
      createdAt: incidente.fechaIncidente.toISOString()
    }))

    // Calculate total revenue
    const totalIngresos = ingresosHoy._sum.monto || 0

    const dashboardStats = {
      general: {
        totalLineas,
        totalTrenes,
        totalEstaciones,
        totalIncidentes,
        lineasOperativas,
        trenesEnServicio,
        transaccionesHoy,
        alertasActivas,
        ingresosHoy: Number(totalIngresos)
      },
      lineas: lineasProcessed,
      actividadReciente: actividadProcesada
    }

    return NextResponse.json(dashboardStats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Error al obtener estadísticas del dashboard' }, 
      { status: 500 }
    )
  }
}