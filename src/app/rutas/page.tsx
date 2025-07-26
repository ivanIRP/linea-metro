import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function RutasPage() {
  const rutas = [
    { 
      id: 'R001', 
      nombre: 'Ruta Norte-Sur', 
      origen: 'Terminal Norte', 
      destino: 'Terminal Sur', 
      distancia: '24.5 km', 
      duracion: '32 min', 
      estado: 'Activa',
      frecuencia: '3 min'
    },
    { 
      id: 'R002', 
      nombre: 'Ruta Este-Oeste', 
      origen: 'Plaza Central', 
      destino: 'Centro Comercial', 
      distancia: '18.2 km', 
      duracion: '25 min', 
      estado: 'Activa',
      frecuencia: '5 min'
    },
    { 
      id: 'R003', 
      nombre: 'Ruta Circular', 
      origen: 'Terminal Central', 
      destino: 'Terminal Central', 
      distancia: '32.1 km', 
      duracion: '45 min', 
      estado: 'Mantenimiento',
      frecuencia: '8 min'
    },
    { 
      id: 'R004', 
      nombre: 'Ruta Express Centro', 
      origen: 'Aeropuerto', 
      destino: 'Centro Histórico', 
      distancia: '15.8 km', 
      duracion: '18 min', 
      estado: 'En Planificación',
      frecuencia: '10 min'
    }
  ]

  const nuevaRuta = {
    estaciones: [
      { nombre: 'Terminal Norte', orden: 1, tipo: 'Terminal' },
      { nombre: 'Plaza Mayor', orden: 2, tipo: 'Intermedia' },
      { nombre: 'Centro Comercial', orden: 3, tipo: 'Intermedia' },
      { nombre: 'Universidad', orden: 4, tipo: 'Intermedia' },
      { nombre: 'Terminal Sur', orden: 5, tipo: 'Terminal' }
    ]
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Activa': return 'success'
      case 'Mantenimiento': return 'warning'
      case 'En Planificación': return 'info'
      default: return 'default'
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Terminal': return 'bg-orange-500 text-white'
      case 'Intermedia': return 'bg-gray-200 text-gray-800'
      default: return 'bg-gray-200 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Rutas</h1>
          <p className="text-gray-600 mt-2">
            Creación y administración de rutas del sistema de metro
          </p>
        </div>
        <Button variant="primary" className="bg-orange-500 hover:bg-orange-600">
          ➕ Nueva Ruta
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">4</p>
              <p className="text-sm text-gray-600">Rutas Totales</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">2</p>
              <p className="text-sm text-gray-600">Rutas Activas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">1</p>
              <p className="text-sm text-gray-600">En Mantenimiento</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">90.4</p>
              <p className="text-sm text-gray-600">km Totales</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Rutas Existentes</h3>
                <div className="flex space-x-2">
                  <Input placeholder="Buscar rutas..." className="w-64" />
                  <Button variant="secondary" size="sm">Filtrar</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Nombre</TableHeaderCell>
                    <TableHeaderCell>Origen - Destino</TableHeaderCell>
                    <TableHeaderCell>Distancia</TableHeaderCell>
                    <TableHeaderCell>Duración</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Acciones</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rutas.map((ruta) => (
                    <TableRow key={ruta.id}>
                      <TableCell className="font-medium">{ruta.id}</TableCell>
                      <TableCell>{ruta.nombre}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{ruta.origen}</p>
                          <p className="text-gray-500">↓ {ruta.destino}</p>
                        </div>
                      </TableCell>
                      <TableCell>{ruta.distancia}</TableCell>
                      <TableCell>{ruta.duracion}</TableCell>
                      <TableCell>
                        <Badge variant={getEstadoColor(ruta.estado) as any} size="sm">
                          {ruta.estado}
                        </Badge>
                      </TableCell>
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
              <h3 className="text-lg font-semibold">Crear Nueva Ruta</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la Ruta
                  </label>
                  <Input placeholder="Ej: Ruta Centro-Aeropuerto" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estación de Origen
                  </label>
                  <Input placeholder="Seleccionar estación..." />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estación de Destino
                  </label>
                  <Input placeholder="Seleccionar estación..." />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frecuencia (minutos)
                  </label>
                  <Input type="number" placeholder="5" />
                </div>
                
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  🗺️ Crear Ruta
                </Button>
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
                  🗺️ Mapa de Rutas
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  ⏱️ Optimizar Tiempos
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  📊 Análisis de Tráfico
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  🚧 Rutas Alternativas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Planificador de Ruta - Vista Previa</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Ruta en Construcción: Norte-Sur Express</h4>
              <Badge variant="info" size="sm">En Planificación</Badge>
            </div>
            
            <div className="flex items-center space-x-4 overflow-x-auto pb-4">
              {nuevaRuta.estaciones.map((estacion, index) => (
                <div key={estacion.orden} className="flex items-center space-x-2 min-w-max">
                  <div className={`px-3 py-2 rounded-lg text-sm font-medium ${getTipoColor(estacion.tipo)}`}>
                    {estacion.orden}. {estacion.nombre}
                  </div>
                  {index < nuevaRuta.estaciones.length - 1 && (
                    <div className="text-gray-400">→</div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Distancia estimada:</span> 24.5 km | 
                <span className="font-medium"> Tiempo estimado:</span> 32 min
              </div>
              <div className="space-x-2">
                <Button variant="secondary" size="sm">Editar</Button>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Guardar Ruta
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}