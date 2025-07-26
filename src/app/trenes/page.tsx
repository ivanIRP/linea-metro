import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export default function TrenesPage() {
  const trenes = [
    { 
      id: 'TR-001', 
      modelo: 'Metro 2024 Plus', 
      linea: 'Línea 1', 
      estado: 'En Servicio', 
      ubicacion: 'Estación Central',
      capacidad: '300 pax',
      velocidad: '75 km/h',
      ultimoMantenimiento: '15/01/2024',
      proximoMantenimiento: '15/04/2024'
    },
    { 
      id: 'TR-002', 
      modelo: 'Metro Express 2023', 
      linea: 'Línea 2', 
      estado: 'En Servicio', 
      ubicacion: 'Terminal Norte',
      capacidad: '280 pax',
      velocidad: '80 km/h',
      ultimoMantenimiento: '20/01/2024',
      proximoMantenimiento: '20/04/2024'
    },
    { 
      id: 'TR-003', 
      modelo: 'Metro Classic', 
      linea: 'Línea 1', 
      estado: 'Mantenimiento', 
      ubicacion: 'Taller Central',
      capacidad: '250 pax',
      velocidad: '70 km/h',
      ultimoMantenimiento: '01/02/2024',
      proximoMantenimiento: '01/05/2024'
    },
    { 
      id: 'TR-004', 
      modelo: 'Metro 2024 Plus', 
      linea: 'Línea 3', 
      estado: 'Fuera de Servicio', 
      ubicacion: 'Depósito Sur',
      capacidad: '300 pax',
      velocidad: '75 km/h',
      ultimoMantenimiento: '10/12/2023',
      proximoMantenimiento: 'Pendiente'
    }
  ]

  const mantenimientos = [
    { tren: 'TR-001', tipo: 'Preventivo', fecha: '15/04/2024', descripcion: 'Revisión general sistemas' },
    { tren: 'TR-002', tipo: 'Correctivo', fecha: '25/03/2024', descripcion: 'Reparación frenos' },
    { tren: 'TR-003', tipo: 'Preventivo', fecha: 'En proceso', descripcion: 'Mantenimiento motor' },
    { tren: 'TR-005', tipo: 'Inspección', fecha: '30/03/2024', descripcion: 'Revisión seguridad' }
  ]

  const rendimiento = [
    { tren: 'TR-001', distancia: '2,450 km', horas: '180h', eficiencia: '98%', combustible: 'N/A' },
    { tren: 'TR-002', distancia: '2,200 km', horas: '165h', eficiencia: '96%', combustible: 'N/A' },
    { tren: 'TR-003', distancia: '1,800 km', horas: '140h', eficiencia: '92%', combustible: 'N/A' },
    { tren: 'TR-004', distancia: '0 km', horas: '0h', eficiencia: '0%', combustible: 'N/A' }
  ]

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'En Servicio': return 'success'
      case 'Mantenimiento': return 'warning'
      case 'Fuera de Servicio': return 'error'
      default: return 'default'
    }
  }

  const getTipoMantenimientoColor = (tipo: string) => {
    switch (tipo) {
      case 'Preventivo': return 'info'
      case 'Correctivo': return 'warning'
      case 'Inspección': return 'success'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Trenes</h1>
          <p className="text-gray-600 mt-2">
            Control y administración de la flota de trenes del sistema
          </p>
        </div>
        <Button variant="primary" className="bg-orange-500 hover:bg-orange-600">
          🚊 Agregar Tren
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">12</p>
              <p className="text-sm text-gray-600">Trenes Totales</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">8</p>
              <p className="text-sm text-gray-600">En Servicio</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">3</p>
              <p className="text-sm text-gray-600">En Mantenimiento</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">96%</p>
              <p className="text-sm text-gray-600">Disponibilidad</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Estado de Trenes</h3>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Modelo</TableHeaderCell>
                    <TableHeaderCell>Línea</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Ubicación</TableHeaderCell>
                    <TableHeaderCell>Capacidad</TableHeaderCell>
                    <TableHeaderCell>Acciones</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trenes.map((tren) => (
                    <TableRow key={tren.id}>
                      <TableCell className="font-medium">{tren.id}</TableCell>
                      <TableCell>{tren.modelo}</TableCell>
                      <TableCell>{tren.linea}</TableCell>
                      <TableCell>
                        <Badge variant={getEstadoColor(tren.estado) as any} size="sm">
                          {tren.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>{tren.ubicacion}</TableCell>
                      <TableCell>{tren.capacidad}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-orange-600">Ver</Button>
                          <Button variant="ghost" size="sm" className="text-orange-600">Editar</Button>
                        </div>
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
              <h3 className="text-lg font-semibold">Control de Tren</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Tren
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>TR-001 - Metro 2024 Plus</option>
                    <option>TR-002 - Metro Express 2023</option>
                    <option>TR-003 - Metro Classic</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Button variant="secondary" className="w-full justify-start">
                    🚦 Iniciar Servicio
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    ⏸️ Pausar Servicio
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    🔧 Enviar a Mantenimiento
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    📍 Localizar Tren
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Próximos Mantenimientos</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mantenimientos.slice(0, 3).map((mant, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{mant.tren}</p>
                        <p className="text-sm text-gray-600">{mant.descripcion}</p>
                      </div>
                      <Badge variant={getTipoMantenimientoColor(mant.tipo) as any} size="sm">
                        {mant.tipo}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{mant.fecha}</p>
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
            <h3 className="text-lg font-semibold">Rendimiento de Trenes</h3>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Tren</TableHeaderCell>
                  <TableHeaderCell>Distancia</TableHeaderCell>
                  <TableHeaderCell>Horas</TableHeaderCell>
                  <TableHeaderCell>Eficiencia</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rendimiento.map((perf) => (
                  <TableRow key={perf.tren}>
                    <TableCell className="font-medium">{perf.tren}</TableCell>
                    <TableCell>{perf.distancia}</TableCell>
                    <TableCell>{perf.horas}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: perf.eficiencia }}
                          ></div>
                        </div>
                        <span className="text-sm">{perf.eficiencia}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Programación de Mantenimientos</h3>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Tren</TableHeaderCell>
                  <TableHeaderCell>Tipo</TableHeaderCell>
                  <TableHeaderCell>Fecha</TableHeaderCell>
                  <TableHeaderCell>Estado</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mantenimientos.map((mant, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{mant.tren}</TableCell>
                    <TableCell>
                      <Badge variant={getTipoMantenimientoColor(mant.tipo) as any} size="sm">
                        {mant.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>{mant.fecha}</TableCell>
                    <TableCell>
                      {mant.fecha === 'En proceso' ? (
                        <Badge variant="warning" size="sm">En Proceso</Badge>
                      ) : (
                        <Badge variant="success" size="sm">Programado</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}