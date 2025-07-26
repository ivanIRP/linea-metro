'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { MdTrain, MdSettings, MdAnnouncement, MdNotifications, MdAnalytics, MdRoute } from 'react-icons/md'

interface Tren {
  id: string
  modelo: string
  estado: string
  ubicacion: string
  capacidad: number
  velocidadMaxima: number
  linea: { nombre: string }
  metricas: Array<{ velocidadPromedio: number; pasajerosTransportados: number }>
}

interface AlertaControl {
  id: string
  tipo: string
  mensaje: string
  prioridad: string
  fechaCreacion: string
  resuelta: boolean
}

export default function ControlPage() {
  const [trenes, setTrenes] = useState<Tren[]>([])
  const [alertas, setAlertas] = useState<AlertaControl[]>([])
  const [loading, setLoading] = useState(true)
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    fetchTrenes()
    fetchAlertas()
  }, [])

  const fetchTrenes = async () => {
    try {
      const response = await fetch('/api/trenes')
      if (response.ok) {
        const data = await response.json()
        setTrenes(data)
      }
    } catch (error) {
      console.error('Error fetching trenes:', error)
    }
  }

  const fetchAlertas = async () => {
    try {
      const response = await fetch('/api/control/alertas')
      if (response.ok) {
        const data = await response.json()
        setAlertas(data)
      }
    } catch (error) {
      console.error('Error fetching alertas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleControlAction = async (action: string, trenId?: string) => {
    try {
      let endpoint = '/api/control/'
      let body: any = { action }
      
      if (trenId) {
        body.trenId = trenId
      }
      
      if (action === 'anuncio' && alertMessage) {
        body.mensaje = alertMessage
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        setAlertMessage('')
        fetchAlertas() // Refresh alerts
        alert(`Acción "${action}" ejecutada exitosamente`)
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resuelta: true })
      })

      if (response.ok) {
        fetchAlertas()
        alert('Incidente resuelto exitosamente')
      }
    } catch (error) {
      console.error('Error resolving incident:', error)
      alert('Error al resolver el incidente')
    }
  }

  const estaciones = [
    { nombre: 'Terminal Norte', linea: 'L1', pasajeros: '145', estado: 'Normal', proximoTren: '2 min' },
    { nombre: 'Centro Comercial', linea: 'L2', pasajeros: '89', estado: 'Normal', proximoTren: '4 min' },
    { nombre: 'Universidad', linea: 'L1', pasajeros: '201', estado: 'Saturada', proximoTren: '1 min' },
    { nombre: 'Plaza Mayor', linea: 'L3', pasajeros: '67', estado: 'Normal', proximoTren: '6 min' }
  ]

  const incidentes = [
    { id: 'INC-001', tipo: 'Retraso', ubicacion: 'L1 - Km 15', descripcion: 'Tren TR-001 con retraso de 3 min', prioridad: 'Media' },
    { id: 'INC-002', tipo: 'Saturación', ubicacion: 'Universidad', descripcion: 'Estación con alta concentración', prioridad: 'Alta' },
    { id: 'INC-003', tipo: 'Mantenimiento', ubicacion: 'L3 - Vía Sur', descripcion: 'Trabajo programado en vías', prioridad: 'Baja' }
  ]

  const metricas = [
    { nombre: 'Puntualidad', valor: '94.2%', estado: 'Bueno' },
    { nombre: 'Ocupación Promedio', valor: '68%', estado: 'Normal' },
    { nombre: 'Velocidad Promedio', valor: '52 km/h', estado: 'Óptimo' },
    { nombre: 'Tiempo Entre Trenes', valor: '3.2 min', estado: 'Bueno' }
  ]

  const getEstadoTrenColor = (estado: string) => {
    switch (estado) {
      case 'En Ruta': return 'success'
      case 'Estacionado': return 'info'
      case 'Mantenimiento': return 'warning'
      default: return 'default'
    }
  }

  const getEstadoEstacionColor = (estado: string) => {
    switch (estado) {
      case 'Normal': return 'success'
      case 'Saturada': return 'warning'
      case 'Cerrada': return 'error'
      default: return 'default'
    }
  }

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'Alta': return 'error'
      case 'Media': return 'warning'
      case 'Baja': return 'info'
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

  const getOcupacionColor = (ocupacion: string) => {
    const [actual, total] = ocupacion.split('/').map(n => parseInt(n))
    const porcentaje = (actual / total) * 100
    if (porcentaje <= 60) return 'bg-green-500'
    if (porcentaje <= 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Control y Monitoreo</h1>
          <p className="text-gray-600 mt-2">
            Centro de control operacional del sistema de metro
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">12</p>
              <p className="text-sm text-gray-600">Trenes Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">24</p>
              <p className="text-sm text-gray-600">Estaciones</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">2,450</p>
              <p className="text-sm text-gray-600">Pasajeros/hora</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">3</p>
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
                    <TableHeaderCell>Ocupación</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Control</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trenesTodas.map((tren) => (
                    <TableRow key={tren.id}>
                      <TableCell className="font-medium">{tren.id}</TableCell>
                      <TableCell>{tren.linea}</TableCell>
                      <TableCell>{tren.ubicacion}</TableCell>
                      <TableCell>{tren.velocidad}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getOcupacionColor(tren.pasajeros)}`}
                              style={{ width: `${(parseInt(tren.pasajeros.split('/')[0]) / parseInt(tren.pasajeros.split('/')[1])) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{tren.pasajeros}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getEstadoTrenColor(tren.estado) as any} size="sm">
                          {tren.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-orange-600">
                          Control
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
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
            <h3 className="text-lg font-semibold">Estado de Estaciones</h3>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Estación</TableHeaderCell>
                  <TableHeaderCell>Línea</TableHeaderCell>
                  <TableHeaderCell>Pasajeros</TableHeaderCell>
                  <TableHeaderCell>Estado</TableHeaderCell>
                  <TableHeaderCell>Próximo Tren</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {estaciones.map((estacion, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{estacion.nombre}</TableCell>
                    <TableCell>{estacion.linea}</TableCell>
                    <TableCell>{estacion.pasajeros}</TableCell>
                    <TableCell>
                      <Badge variant={getEstadoEstacionColor(estacion.estado) as any} size="sm">
                        {estacion.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>{estacion.proximoTren}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Incidentes Activos</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {incidentes.map((incidente) => (
                <div key={incidente.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{incidente.tipo}</p>
                      <p className="text-sm text-gray-600">{incidente.ubicacion}</p>
                      <p className="text-sm text-gray-500 mt-1">{incidente.descripcion}</p>
                    </div>
                    <Badge variant={getPrioridadColor(incidente.prioridad) as any} size="sm">
                      {incidente.prioridad}
                    </Badge>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-orange-600">Ver</Button>
                    <Button variant="ghost" size="sm" className="text-orange-600">Resolver</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Panel de Control Central</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Control de Tráfico</h4>
              <div className="space-y-2">
                <Button variant="secondary" className="w-full justify-start">
                  🚦 Regulación Automática
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  ⏱️ Ajustar Frecuencias
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  🔄 Optimizar Rutas
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  📊 Análisis de Flujo
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Comunicaciones</h4>
              <div className="space-y-2">
                <Button variant="secondary" className="w-full justify-start">
                  📢 Anuncio General
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  📱 Notificar Conductores
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  🔊 Mensaje Estaciones
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  📺 Actualizar Pantallas
                </Button>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}