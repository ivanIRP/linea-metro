'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { MdSettings, MdAnnouncement, MdNotifications, MdAnalytics, MdRoute } from 'react-icons/md'

interface Tren {
  id: string
  modelo: string
  estado: string
  ubicacion: string
  capacidad: number
  velocidadMaxima: number
  linea: { nombre: string }
  metricas: Array<{ 
    distancia: number
    horas: number
    eficiencia: number
  }>
}

interface AlertaControl {
  id: string
  tipo: string
  mensaje: string
  nivel: string
  timestamp: string
  estado: string
  origen: string
}

interface ControlData {
  trenes: Tren[]
  alertas: AlertaControl[]
  monitoreo: any[]
}

export default function ControlPage() {
  const [controlData, setControlData] = useState<ControlData>({ trenes: [], alertas: [], monitoreo: [] })
  const [loading, setLoading] = useState(true)
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    fetchControlData()
  }, [])

  const fetchControlData = async () => {
    try {
      const response = await fetch('/api/control')
      if (response.ok) {
        const data = await response.json()
        setControlData(data)
      }
    } catch (error) {
      console.error('Error fetching control data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleControlAction = async (action: string, trenId?: string) => {
    try {
      const response = await fetch('/api/control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action,
          trenId,
          mensaje: alertMessage
        })
      })

      if (response.ok) {
        const result = await response.json()
        setAlertMessage('')
        alert(result.message)
        // Refresh data
        fetchControlData()
      }
    } catch (error) {
      console.error('Error executing control action:', error)
      alert('Error al ejecutar la acción')
    }
  }

  const resolverIncidente = async (alertaId: string) => {
    try {
      const response = await fetch(`/api/control/alertas/${alertaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          estado: 'Resuelta'
        })
      })

      if (response.ok) {
        alert('Incidente resuelto exitosamente')
        // Refresh data
        fetchControlData()
      }
    } catch (error) {
      console.error('Error resolving incident:', error)
      alert('Error al resolver incidente')
    }
  }

  // Calculate real-time metrics from actual data
  const { trenes, alertas } = controlData
  const trenesActivos = trenes.filter(t => t.estado === 'EnServicio')
  const velocidadPromedio = trenes.length > 0 ? 
    Math.round(trenes.reduce((acc, tren) => {
      const metrica = tren.metricas?.[0]
      if (metrica && metrica.horas > 0) {
        return acc + (metrica.distancia / metrica.horas)
      }
      return acc + 50 // Default speed if no data
    }, 0) / trenes.length) : 0
    
  const eficienciaPromedio = trenes.length > 0 ? 
    Math.round(trenes.reduce((acc, tren) => {
      const metrica = tren.metricas?.[0]
      return acc + (metrica?.eficiencia || 85)
    }, 0) / trenes.length) : 85

  const incidentesActivos = alertas.filter(a => a.estado === 'Activa')

  const metricas = [
    { nombre: 'Trenes Activos', valor: `${trenesActivos.length}/${trenes.length}`, estado: 'Bueno' },
    { nombre: 'Eficiencia Promedio', valor: `${eficienciaPromedio}%`, estado: eficienciaPromedio > 80 ? 'Óptimo' : 'Normal' },
    { nombre: 'Velocidad Promedio', valor: `${velocidadPromedio} km/h`, estado: 'Óptimo' },
    { nombre: 'Incidentes Activos', valor: `${incidentesActivos.length}`, estado: incidentesActivos.length > 5 ? 'Crítico' : 'Bueno' }
  ]

  const getEstadoTrenColor = (estado: string) => {
    switch (estado) {
      case 'EnServicio': return 'success'
      case 'Estacionado': return 'info'
      case 'Mantenimiento': return 'warning'
      default: return 'default'
    }
  }

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Error': return 'error'
      case 'Warning': return 'warning'
      case 'Info': return 'info'
      default: return 'default'
    }
  }

  const getMetricaColor = (estado: string) => {
    switch (estado) {
      case 'Óptimo': return 'text-green-600'
      case 'Bueno': return 'text-blue-600'
      case 'Normal': return 'text-yellow-600'
      case 'Crítico': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getEficienciaColor = (eficiencia: number) => {
    if (eficiencia >= 85) return 'bg-green-500'
    if (eficiencia >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Centro de Control Operacional</h1>
          <p className="text-gray-600 mt-2">
            Sistema de Transporte Colectivo Metro - CDMX
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{trenesActivos.length}</p>
              <p className="text-sm text-gray-600">Trenes Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{trenes.length}</p>
              <p className="text-sm text-gray-600">Total Trenes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{eficienciaPromedio}%</p>
              <p className="text-sm text-gray-600">Eficiencia</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{incidentesActivos.length}</p>
              <p className="text-sm text-gray-600">Incidentes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Estado de Trenes en Tiempo Real</h3>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Tren</TableHeaderCell>
                    <TableHeaderCell>Línea</TableHeaderCell>
                    <TableHeaderCell>Ubicación</TableHeaderCell>
                    <TableHeaderCell>Velocidad</TableHeaderCell>
                    <TableHeaderCell>Eficiencia</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
                      </TableCell>
                    </TableRow>
                  ) : trenes.map((tren) => {
                    const metrica = tren.metricas?.[0]
                    const eficiencia = metrica?.eficiencia || 85
                    const velocidad = metrica && metrica.horas > 0 ? 
                      `${Math.round(metrica.distancia / metrica.horas)} km/h` : '50 km/h'
                    
                    return (
                      <TableRow key={tren.id}>
                        <TableCell className="font-medium">{tren.modelo}</TableCell>
                        <TableCell>{tren.linea?.nombre || 'N/A'}</TableCell>
                        <TableCell>{tren.ubicacion}</TableCell>
                        <TableCell>{velocidad}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-12 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getEficienciaColor(eficiencia)}`}
                                style={{ width: `${eficiencia}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{eficiencia}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getEstadoTrenColor(tren.estado)} size="sm">
                            {tren.estado}
                          </Badge>
                        </TableCell>

                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Métricas Operacionales</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metricas.map((metrica, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-700">{metrica.nombre}</p>
                      <Badge variant="success" size="sm">{metrica.estado}</Badge>
                    </div>
                    <p className={`text-xl font-bold ${getMetricaColor(metrica.estado)}`}>
                      {metrica.valor}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Panel de Anuncios</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje de Anuncio General
                </label>
                <textarea
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  placeholder="Escriba el mensaje para anuncio general..."
                />
              </div>
              <Button 
                onClick={() => handleControlAction('anuncio')}
                disabled={!alertMessage.trim()}
                className="w-full flex items-center justify-center space-x-2"
                variant="primary"
              >
                <MdAnnouncement className="w-4 h-4" />
                <span>Enviar Anuncio General</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Alertas del Sistema</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {incidentesActivos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No hay alertas activas</p>
                </div>
              ) : incidentesActivos.map((alerta) => (
                <div key={alerta.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{alerta.tipo}</p>
                      <p className="text-sm text-gray-500 mt-1">{alerta.mensaje}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(alerta.timestamp).toLocaleDateString()} - {alerta.origen}
                      </p>
                    </div>
                    <Badge variant={getNivelColor(alerta.nivel)} size="sm">
                      {alerta.nivel}
                    </Badge>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-orange-600"
                      onClick={() => resolverIncidente(alerta.id)}
                    >
                      Resolver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>26
    </div>
  )
}