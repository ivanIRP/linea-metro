'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Chart from '@/components/ui/Chart'
import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface DashboardStats {
  general: {
    totalLineas: number
    totalTrenes: number
    totalEstaciones: number
    totalIncidentes: number
    lineasOperativas: number
    trenesEnServicio: number
    transaccionesHoy: number
    alertasActivas: number
    ingresosHoy: number
  }
  lineas: Array<{
    id: string
    nombre: string
    estado: string
    trenes: number
    estaciones: number
    pasajerosPorDia: number
  }>
  actividadReciente: Array<{
    id: string
    tipo: string
    ubicacion: string
    descripcion: string
    prioridad: string
    createdAt: string
  }>
}

interface ChartData {
  dailyTransactions: Array<{
    date: string
    transactions: number
  }>
  monthlyRevenue: Array<{
    month: string
    revenue: number
  }>
  incidentsByType: Array<{
    type: string
    count: number
  }>
  trainsByStatus: Array<{
    status: string
    count: number
  }>
  passengersByLine: Array<{
    line: string
    passengers: number
  }>
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState('')
  const [lastUpdate, setLastUpdate] = useState('')

  // Additional authentication check at component level
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString('es-ES'))
    }
    
    updateTime()
    const timeInterval = setInterval(updateTime, 1000)
    
    return () => clearInterval(timeInterval)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [statsResponse, chartsResponse] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/dashboard/charts')
        ])

        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats(statsData)
        }

        if (chartsResponse.ok) {
          const chartsData = await chartsResponse.json()
          setChartData(chartsData)
        }

        setLastUpdate(new Date().toLocaleTimeString('es-ES'))
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Update every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Show loading for authentication or data loading
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">
            {authLoading ? 'Verifying access...' : 'Loading dashboard...'}
          </p>
        </div>
      </div>
    )
  }

  // If no authenticated user, don't show content
  if (!user) {
    return null
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error al cargar los datos del dashboard</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Reintentar
        </button>
      </div>
    )
  }

  const dashboardStats = [
    { 
      title: 'Líneas Totales', 
      value: stats.general.totalLineas.toString(), 
      change: `${stats.general.lineasOperativas} operativas`, 
      trend: 'up',
      icon: '🚇'
    },
    { 
      title: 'Trenes en Servicio', 
      value: stats.general.trenesEnServicio.toString(), 
      change: `de ${stats.general.totalTrenes} total`, 
      trend: 'up',
      icon: '🚊'
    },
    { 
      title: 'Transacciones Hoy', 
      value: stats.general.transaccionesHoy.toLocaleString(), 
      change: `$${stats.general.ingresosHoy.toLocaleString()}`, 
      trend: 'up',
      icon: '💳'
    },
    { 
      title: 'Incidentes Activos', 
      value: stats.general.totalIncidentes.toString(), 
      change: `${stats.general.alertasActivas} alertas`, 
      trend: stats.general.totalIncidentes > 0 ? 'down' : 'stable',
      icon: '⚠️'
    }
  ]

  // Calculate system health percentage
  const systemHealth = Math.round(
    ((stats.general.lineasOperativas / Math.max(stats.general.totalLineas, 1)) * 0.4 +
     (stats.general.trenesEnServicio / Math.max(stats.general.totalTrenes, 1)) * 0.4 +
     (1 - Math.min(stats.general.totalIncidentes / 10, 1)) * 0.2) * 100
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard del Sistema</h1>
          <p className="text-gray-600 mt-2">
            Monitoreo en tiempo real - {currentTime}
          </p>
          {lastUpdate && (
            <p className="text-sm text-gray-500">
              Última actualización: {lastUpdate}
            </p>
          )}
        </div>
        
        {/* System Health Indicator */}
        <div className="text-center">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#e5e7eb"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke={systemHealth >= 80 ? '#10b981' : systemHealth >= 60 ? '#f59e0b' : '#ef4444'}
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${(systemHealth / 100) * 176} 176`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-700">{systemHealth}%</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Salud del Sistema</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{stat.icon}</span>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm font-medium mt-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 
                    'text-gray-500'
                  }`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      {chartData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Daily Transactions Chart */}
          <Card>
            <CardContent className="p-6">
              <Chart
                data={chartData.dailyTransactions.map(item => ({ x: item.date, y: item.transactions }))}
                type="area"
                title="Transacciones Diarias (Últimos 7 días)"
                xKey="x"
                yKey="y"
                height={250}
                color="#f97316"
              />
            </CardContent>
          </Card>

          {/* Monthly Revenue Chart */}
          <Card>
            <CardContent className="p-6">
              <Chart
                data={chartData.monthlyRevenue.map(item => ({ x: item.month, y: item.revenue }))}
                type="bar"
                title="Ingresos Mensuales"
                xKey="x"
                yKey="y"
                height={250}
                color="#10b981"
              />
            </CardContent>
          </Card>

          {/* Incidents by Type */}
          <Card>
            <CardContent className="p-6">
              <Chart
                data={chartData.incidentsByType.map(item => ({ x: item.type, y: item.count }))}
                type="pie"
                title="Incidentes por Tipo"
                xKey="x"
                yKey="y"
                height={250}
              />
            </CardContent>
          </Card>

          {/* Trains by Status */}
          <Card>
            <CardContent className="p-6">
              <Chart
                data={chartData.trainsByStatus.map(item => ({ x: item.status, y: item.count }))}
                type="bar"
                title="Trenes por Estado"
                xKey="x"
                yKey="y"
                height={250}
                color="#6366f1"
              />
            </CardContent>
          </Card>

          {/* Passengers by Line */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <Chart
                data={chartData.passengersByLine.map(item => ({ x: item.line, y: item.passengers }))}
                type="bar"
                title="Pasajeros por Línea (Diario)"
                xKey="x"
                yKey="y"
                height={250}
                color="#ec4899"
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Activity and Status Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Actividad Reciente</h3>
              <Badge variant="info" size="sm">
                {stats.actividadReciente.length} eventos
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {stats.actividadReciente.length > 0 ? (
                stats.actividadReciente.map((activity, index) => (
                  <div key={index} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-start space-x-3 flex-1">
                      <Badge variant={
                        activity.prioridad === 'Alta' || activity.prioridad === 'Critica' ? 'error' : 
                        activity.prioridad === 'Media' ? 'warning' : 'info'
                      } size="sm">
                        {activity.prioridad === 'Alta' || activity.prioridad === 'Critica' ? '🚨' : 
                         activity.prioridad === 'Media' ? '⚠️' : 'ℹ️'}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{activity.tipo}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.descripcion}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.ubicacion}</p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xs text-gray-400">
                        {typeof window !== 'undefined' ? 
                          new Date(activity.createdAt).toLocaleString('es-ES', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'Cargando...'
                        }
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No hay actividad reciente</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Lines Status */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Estado de Líneas</h3>
              <Badge variant="success" size="sm">
                {stats.general.lineasOperativas}/{stats.general.totalLineas} operativas
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {stats.lineas.length > 0 ? (
                stats.lineas.map((line, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🚇</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{line.nombre}</p>
                          <p className="text-xs text-gray-500">
                            {line.trenes} trenes • {line.estaciones} estaciones
                          </p>
                          {line.pasajerosPorDia > 0 && (
                            <p className="text-xs text-gray-400">
                              {line.pasajerosPorDia.toLocaleString()} pasajeros/día
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge variant={
                      line.estado === 'Operativa' ? 'success' :
                      line.estado === 'Mantenimiento' ? 'warning' :
                      line.estado === 'EnConstruccion' ? 'info' : 'default'
                    } size="sm">
                      {line.estado}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No hay líneas configuradas</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}