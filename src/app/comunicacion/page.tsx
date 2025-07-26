import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function ComunicacionPage() {
  const canales = [
    { id: 'CH-001', nombre: 'Control Central', tipo: 'Radio', frecuencia: '450.125 MHz', estado: 'Activo', usuarios: 12 },
    { id: 'CH-002', nombre: 'Mantenimiento', tipo: 'Radio', frecuencia: '450.250 MHz', estado: 'Activo', usuarios: 8 },
    { id: 'CH-003', nombre: 'Seguridad', tipo: 'Radio', frecuencia: '450.375 MHz', estado: 'Activo', usuarios: 15 },
    { id: 'CH-004', nombre: 'Emergencias', tipo: 'Radio', frecuencia: '450.500 MHz', estado: 'Inactivo', usuarios: 0 }
  ]

  const comunicaciones = [
    { 
      id: 'COM-001', 
      origen: 'Control Central', 
      destino: 'Tren TR-001', 
      tipo: 'Voz', 
      estado: 'Activa',
      duracion: '2:35',
      prioridad: 'Normal'
    },
    { 
      id: 'COM-002', 
      origen: 'Estación Norte', 
      destino: 'Control Central', 
      tipo: 'Datos', 
      estado: 'Completada',
      duracion: '0:45',
      prioridad: 'Alta'
    },
    { 
      id: 'COM-003', 
      origen: 'Seguridad', 
      destino: 'Todas las Estaciones', 
      tipo: 'Difusión', 
      estado: 'Activa',
      duracion: '1:20',
      prioridad: 'Crítica'
    }
  ]

  const mensajes = [
    { id: 'MSG-001', destinatario: 'Todos los Conductores', asunto: 'Cambio de horarios', estado: 'Enviado', fecha: '25/03/2024 14:30' },
    { id: 'MSG-002', destinatario: 'Personal Mantenimiento', asunto: 'Inspección vías L3', estado: 'Leído', fecha: '25/03/2024 13:15' },
    { id: 'MSG-003', destinatario: 'Estaciones Centro', asunto: 'Protocolo evacuación', estado: 'Pendiente', fecha: '25/03/2024 12:45' }
  ]

  const equipos = [
    { equipo: 'Radio Base RB-001', ubicacion: 'Torre Central', estado: 'Operativo', señal: '95%' },
    { equipo: 'Repetidor RP-002', ubicacion: 'Cerro Norte', estado: 'Operativo', señal: '88%' },
    { equipo: 'Antena ANT-003', ubicacion: 'Estación Sur', estado: 'Mantenimiento', señal: '0%' },
    { equipo: 'Radio Móvil RM-004', ubicacion: 'Tren TR-001', estado: 'Operativo', señal: '92%' }
  ]

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Activo': case 'Activa': case 'Operativo': return 'success'
      case 'Inactivo': case 'Mantenimiento': return 'warning'
      case 'Completada': case 'Enviado': case 'Leído': return 'info'
      case 'Pendiente': return 'warning'
      case 'Error': return 'error'
      default: return 'default'
    }
  }

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'Crítica': return 'error'
      case 'Alta': return 'warning'
      case 'Normal': return 'success'
      case 'Baja': return 'info'
      default: return 'default'
    }
  }

  const getSeñalColor = (señal: string) => {
    const valor = parseInt(señal)
    if (valor >= 80) return 'text-green-600'
    if (valor >= 60) return 'text-yellow-600'
    if (valor > 0) return 'text-red-600'
    return 'text-gray-400'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Comunicación</h1>
          <p className="text-gray-600 mt-2">
            Control de comunicaciones y difusión del sistema de metro
          </p>
        </div>
        <Button variant="primary" className="bg-orange-500 hover:bg-orange-600">
          📢 Mensaje Urgente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">4</p>
              <p className="text-sm text-gray-600">Canales Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">35</p>
              <p className="text-sm text-gray-600">Usuarios Conectados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">127</p>
              <p className="text-sm text-gray-600">Mensajes Hoy</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">98%</p>
              <p className="text-sm text-gray-600">Cobertura Red</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Comunicaciones Activas</h3>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Origen</TableHeaderCell>
                    <TableHeaderCell>Destino</TableHeaderCell>
                    <TableHeaderCell>Tipo</TableHeaderCell>
                    <TableHeaderCell>Duración</TableHeaderCell>
                    <TableHeaderCell>Prioridad</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comunicaciones.map((com) => (
                    <TableRow key={com.id}>
                      <TableCell className="font-medium">{com.id}</TableCell>
                      <TableCell>{com.origen}</TableCell>
                      <TableCell>{com.destino}</TableCell>
                      <TableCell>{com.tipo}</TableCell>
                      <TableCell>{com.duracion}</TableCell>
                      <TableCell>
                        <Badge variant={getPrioridadColor(com.prioridad) as any} size="sm">
                          {com.prioridad}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getEstadoColor(com.estado) as any} size="sm">
                          {com.estado}
                        </Badge>
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
              <h3 className="text-lg font-semibold">Canales de Radio</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {canales.map((canal) => (
                  <div key={canal.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{canal.nombre}</p>
                        <p className="text-sm text-gray-600">{canal.frecuencia}</p>
                        <p className="text-xs text-gray-500">{canal.usuarios} usuarios</p>
                      </div>
                      <Badge variant={getEstadoColor(canal.estado) as any} size="sm">
                        {canal.estado}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Acciones Rápidas</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="secondary" className="w-full justify-start">
                  📢 Anuncio General
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  🚨 Alerta de Emergencia
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  📱 Mensaje a Conductores
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  📺 Actualizar Pantallas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Mensajes Recientes</h3>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>ID</TableHeaderCell>
                  <TableHeaderCell>Destinatario</TableHeaderCell>
                  <TableHeaderCell>Asunto</TableHeaderCell>
                  <TableHeaderCell>Estado</TableHeaderCell>
                  <TableHeaderCell>Fecha</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mensajes.map((mensaje) => (
                  <TableRow key={mensaje.id}>
                    <TableCell className="font-medium">{mensaje.id}</TableCell>
                    <TableCell>{mensaje.destinatario}</TableCell>
                    <TableCell>{mensaje.asunto}</TableCell>
                    <TableCell>
                      <Badge variant={getEstadoColor(mensaje.estado) as any} size="sm">
                        {mensaje.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{mensaje.fecha}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Estado de Equipos</h3>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Equipo</TableHeaderCell>
                  <TableHeaderCell>Ubicación</TableHeaderCell>
                  <TableHeaderCell>Estado</TableHeaderCell>
                  <TableHeaderCell>Señal</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipos.map((equipo, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{equipo.equipo}</TableCell>
                    <TableCell>{equipo.ubicacion}</TableCell>
                    <TableCell>
                      <Badge variant={getEstadoColor(equipo.estado) as any} size="sm">
                        {equipo.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className={getSeñalColor(equipo.señal)}>
                      {equipo.señal}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Centro de Mensajería</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Enviar Nuevo Mensaje</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destinatario
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Todos los Usuarios</option>
                  <option>Conductores</option>
                  <option>Personal de Estaciones</option>
                  <option>Mantenimiento</option>
                  <option>Seguridad</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prioridad
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Normal</option>
                  <option>Alta</option>
                  <option>Crítica</option>
                  <option>Baja</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto
                </label>
                <Input placeholder="Escriba el asunto del mensaje..." />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-lg h-24 resize-none"
                  placeholder="Escriba su mensaje aquí..."
                ></textarea>
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                  📤 Enviar Mensaje
                </Button>
                <Button variant="secondary">
                  💾 Guardar Borrador
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Panel de Control</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <p className="text-lg font-bold text-green-600">98%</p>
                  <p className="text-xs text-gray-600">Cobertura Red</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <p className="text-lg font-bold text-blue-600">35</p>
                  <p className="text-xs text-gray-600">Usuarios Online</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg text-center">
                  <p className="text-lg font-bold text-orange-600">4</p>
                  <p className="text-xs text-gray-600">Canales Activos</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg text-center">
                  <p className="text-lg font-bold text-yellow-600">127</p>
                  <p className="text-xs text-gray-600">Mensajes Hoy</p>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-gray-700">Acciones de Emergencia</h5>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  🚨 Alerta General
                </Button>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                  📢 Evacuación
                </Button>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  🔊 Anuncio Urgente
                </Button>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-700 mb-2">Últimas Actividades</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Mensaje enviado a conductores - 14:30</li>
                  <li>• Canal mantenimiento activado - 14:15</li>
                  <li>• Alerta de seguridad difundida - 13:45</li>
                  <li>• Sistema backup activado - 13:20</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}