import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get last 7 days for trend data
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date
    }).reverse()

    // Parallel queries for chart data
    const [
      dailyTransactions,
      monthlyRevenue,
      incidentsByType,
      trainsByStatus,
      passengersByLine
    ] = await Promise.all([
      // Daily transactions for the last 7 days
      Promise.all(days.map(async (day) => {
        const startOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate())
        const endOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
        
        const count = await prisma.transaccion.count({
          where: {
            fechaTransaccion: {
              gte: startOfDay,
              lt: endOfDay
            }
          }
        })
        
        return {
          date: day.toISOString().split('T')[0],
          transactions: count
        }
      })),

      // Monthly revenue for the last 6 months
      Promise.all(Array.from({ length: 6 }, (_, i) => {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        return date
      }).reverse().map(async (month) => {
        const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1)
        const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1)
        
        const revenue = await prisma.transaccion.aggregate({
          where: {
            fechaTransaccion: {
              gte: startOfMonth,
              lt: endOfMonth
            }
          },
          _sum: {
            monto: true
          }
        })
        
        return {
          month: month.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' }),
          revenue: Number(revenue._sum.monto || 0)
        }
      })),

      // Incidents by type
      prisma.incidenteSeguridad.groupBy({
        by: ['tipo'],
        _count: {
          tipo: true
        },
        orderBy: {
          _count: {
            tipo: 'desc'
          }
        }
      }),

      // Trains by status
      prisma.tren.groupBy({
        by: ['estado'],
        _count: {
          estado: true
        }
      }),

      // Passengers by line (using pasajerosPorDia from linea table)
      prisma.linea.findMany({
        select: {
          nombre: true,
          pasajerosPorDia: true
        },
        where: {
          pasajerosPorDia: {
            gt: 0
          }
        },
        orderBy: {
          pasajerosPorDia: 'desc'
        }
      })
    ])

    // Process incidents by type data
    const incidentsProcessed = incidentsByType.map(item => ({
      type: item.tipo,
      count: item._count.tipo
    }))

    // Process trains by status data
    const trainsProcessed = trainsByStatus.map(item => ({
      status: item.estado,
      count: item._count.estado
    }))

    // Process passengers by line data
    const passengersProcessed = passengersByLine.map(line => ({
      line: line.nombre,
      passengers: line.pasajerosPorDia || 0
    }))

    const chartData = {
      dailyTransactions,
      monthlyRevenue,
      incidentsByType: incidentsProcessed,
      trainsByStatus: trainsProcessed,
      passengersByLine: passengersProcessed
    }

    return NextResponse.json(chartData)
  } catch (error) {
    console.error('Error fetching chart data:', error)
    return NextResponse.json(
      { error: 'Error al obtener datos de gráficos' }, 
      { status: 500 }
    )
  }
}