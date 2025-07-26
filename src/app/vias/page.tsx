import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export default function ViasPage() {
  const vias = [
    { 
      id: 'V-001', 
      nombre: 'Vía Principal Norte', 
      linea: 'Línea 1', 
      tipo: 'Principal',
      longitud: '12.5 km', 
      estado: 'Operativa', 
      material: 'Acero Inoxidable',
      ultimaInspeccion: '10/02/2024',
      proximaInspeccion: '10/05/2024',
      velocidadMaxima: '80 km/h'
    },
    { 
      id: 'V-002', 
      nombre: 'Vía Secundaria Norte', 
      linea: 'Línea 1', 
      tipo: 'Secundaria',
      longitud: '12.5 km', 
      estado: 'Operativa', 
      material: 'Acero Inoxidable',
      ultimaInspeccion: '08/02/2024',
      proximaInspeccion: '08/05/2024',
      velocidadMaxima: '80 km/h'
    },
    { 
      id: 'V-003', 
      nombre: 'Vía Principal Sur', 
      linea: 'Línea 2', 
      tipo: 'Principal',
      longitud: '9.2 km', 
      estado: 'Mantenimiento', 
      material: 'Acero Carbono',
      ultimaInspeccion: '15/01/2024',
      proximaInspeccion: '15/04/2024',
      velocidadMaxima: '75 km/h'
    },
    { 
      id: 'V-004', 
      nombre: 'Vía de Depósito', 
      linea: 'Servicios', 
      tipo: 'Servicio',
      longitud: '2.8 km', 
      estado: 'Operativa', 
      material: 'Acero Estándar',
      ultimaInspeccion: '20/02/2024',
      proximaInspeccion: '20/08/2024',
      velocidadMaxima: '25 km/h'
    }
  ]

  const secciones = [
    { seccion: 'S1-Norte', km: '0.0 - 2.5', estado: 'Bueno', desgaste: '15%' },
    { seccion: 'S2-Centro', km: '2.5 - 5.0', estado: 'Excelente', desgaste: '8%' },
    { seccion: 'S3-Sur', km: '5.0 - 7.5', estado: 'Regular', desgaste: '35%' },
    { seccion: 'S4-Terminal', km: '7.5 - 10.0', estado: 'Bueno', desgaste: '20%' }
  ]

  const mantenimientos = [
    { via: 'V-001', tipo: 'Inspección Rutinaria', fecha: '15/03/2024', tecnico: 'Juan Pérez' },
    { via: 'V-003', tipo: 'Reparación Mayor', fecha: 'En proceso', tecnico: 'Carlos López' },
    { via: 'V-002', tipo: 'Soldadura', fecha: '20/03/2024', tecnico: 'Ana García' },
    { via: 'V-004', tipo: 'Limpieza', fecha: '25/03/2024', tecnico: 'Miguel Torres' }
  ]

  const sensores = [
    { id: 'SENS-001', ubicacion: 'Km 2.5 - Vía V-001', tipo: 'Temperatura', valor: '23°C', estado: 'Normal' },
    { id: 'SENS-002', ubicacion: 'Km 5.0 - Vía V-001', tipo: 'Vibración', valor: '0.8 mm/s', estado: 'Normal' },
    { id: 'SENS-003', ubicacion: 'Km 7.5 - Vía V-001', tipo: 'Desgaste', valor: '15%', estado: 'Atención' },
    { id: 'SENS-004', ubicacion: 'Km 3.2 - Vía V-003', tipo: 'Temperatura', valor: '45°C', estado: 'Alerta' }
  ]

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Operativa': return 'success'
      case 'Mantenimiento': return 'warning'
      case 'Fuera de Servicio': return 'error'
      default: return 'default'
    }
  }

  const getEstadoSeccionColor = (estado: string) => {
    switch (estado) {
      case 'Excelente': return 'success'
      case 'Bueno': return 'info'
      case 'Regular': return 'warning'
      case 'Malo': return 'error'
      default: return 'default'
    }
  }

  const getSensorColor = (estado: string) => {
    switch (estado) {
      case 'Normal': return 'success'
      case 'Atención': return 'warning'
      case 'Alerta': return 'error'
      default: return 'default'
    }
  }

  const getDesgasteColor = (desgaste: string) => {
    const valor = parseInt(desgaste)
    if (valor <= 20) return 'bg-green-500'
    if (valor <= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Vías</h1>
          <p className="text-gray-600 mt-2">
            Control y mantenimiento de la infraestructura ferroviaria
          </p>
        </div>
        <Button variant="primary" className="bg-orange-500 hover:bg-orange-600">
          🛤️ Inspeccionar Vías
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">45.2</p>
              <p className="text-sm text-gray-600">km de Vías</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">38.4</p>
              <p className="text-sm text-gray-600">km Operativas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">6.8</p>
              <p className="text-sm text-gray-600">km en Mantenimiento</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">18</p>
              <p className="text-sm text-gray-600">Sensores Activos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Estado de Vías</h3>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Nombre</TableHeaderCell>
                    <TableHeaderCell>Línea</TableHeaderCell>
                    <TableHeaderCell>Tipo</TableHeaderCell>
                    <TableHeaderCell>Longitud</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Acciones</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vias.map((via) => (
                    <TableRow key={via.id}>
                      <TableCell className="font-medium">{via.id}</TableCell>
                      <TableCell>{via.nombre}</TableCell>
                      <TableCell>{via.linea}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={via.tipo === 'Principal' ? 'info' : 'default'} 
                          size="sm"
                        >
                          {via.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>{via.longitud}</TableCell>
                      <TableCell>
                        <Badge variant={getEstadoColor(via.estado) as any} size="sm">
                          {via.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-orange-600">Ver</Button>
                          <Button variant="ghost" size="sm" className="text-orange-600">Inspeccionar</Button>
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
              <h3 className="text-lg font-semibold">Estado por Secciones</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {secciones.map((seccion, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{seccion.seccion}</p>
                        <p className="text-sm text-gray-600">{seccion.km}</p>
                      </div>
                      <Badge variant={getEstadoSeccionColor(seccion.estado) as any} size="sm">
                        {seccion.estado}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-600">Desgaste:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getDesgasteColor(seccion.desgaste)}`}
                          style={{ width: seccion.desgaste }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{seccion.desgaste}</span>
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
                  🔍 Inspección General
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  🔧 Programar Mantenimiento
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  📊 Reporte de Desgaste
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  ⚠️ Alertas de Sensores
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Mantenimientos Programados</h3>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Vía</TableHeaderCell>
                  <TableHeaderCell>Tipo</TableHeaderCell>
                  <TableHeaderCell>Fecha</TableHeaderCell>
                  <TableHeaderCell>Técnico</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mantenimientos.map((mant, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{mant.via}</TableCell>
                    <TableCell>{mant.tipo}</TableCell>
                    <TableCell>
                      {mant.fecha === 'En proceso' ? (
                        <Badge variant="warning" size="sm">En Proceso</Badge>
                      ) : (
                        <span className="text-sm">{mant.fecha}</span>
                      )}
                    </TableCell>
                    <TableCell>{mant.tecnico}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Monitoreo de Sensores</h3>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Sensor</TableHeaderCell>
                  <TableHeaderCell>Tipo</TableHeaderCell>
                  <TableHeaderCell>Valor</TableHeaderCell>
                  <TableHeaderCell>Estado</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sensores.map((sensor) => (
                  <TableRow key={sensor.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p>{sensor.id}</p>
                        <p className="text-xs text-gray-500">{sensor.ubicacion}</p>
                      </div>
                    </TableCell>
                    <TableCell>{sensor.tipo}</TableCell>
                    <TableCell className="font-medium">{sensor.valor}</TableCell>
                    <TableCell>
                      <Badge variant={getSensorColor(sensor.estado) as any} size="sm">
                        {sensor.estado}
                      </Badge>
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