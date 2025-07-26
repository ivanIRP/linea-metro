import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LineasPage() {
  const metroLines = [
    { 
      id: 'L001', 
      nombre: 'Línea 1 - Central', 
      longitud: '24.5 km', 
      estaciones: 18, 
      estado: 'Operativa', 
      inauguracion: '2015',
      pasajeros: '125,000/día'
    },
    { 
      id: 'L002', 
      nombre: 'Línea 2 - Norte', 
      longitud: '18.2 km', 
      estaciones: 14, 
      estado: 'Operativa', 
      inauguracion: '2018',
      pasajeros: '98,500/día'
    },
    { 
      id: 'L003', 
      nombre: 'Línea 3 - Sur', 
      longitud: '22.8 km', 
      estaciones: 16, 
      estado: 'Mantenimiento', 
      inauguracion: '2020',
      pasajeros: '110,200/día'
    },
    { 
      id: 'L004', 
      nombre: 'Línea 4 - Este', 
      longitud: '15.6 km', 
      estaciones: 12, 
      estado: 'En Construcción', 
      inauguracion: '2025 (Est.)',
      pasajeros: 'N/A'
    },
    { 
      id: 'L005', 
      nombre: 'Línea 5 - Oeste', 
      longitud: '19.3 km', 
      estaciones: 15, 
      estado: 'Planificación', 
      inauguracion: '2027 (Est.)',
      pasajeros: 'N/A'
    },
    { 
      id: 'L006', 
      nombre: 'Línea 6 - Circular', 
      longitud: '32.1 km', 
      estaciones: 24, 
      estado: 'Planificación', 
      inauguracion: '2030 (Est.)',
      pasajeros: 'N/A'
    }
  ]

  const projects = [
    { nombre: 'Extensión Línea 2', progreso: 75, presupuesto: '$450M', fechaFin: 'Dic 2024' },
    { nombre: 'Nueva Línea 4', progreso: 45, presupuesto: '$680M', fechaFin: 'Jun 2025' },
    { nombre: 'Modernización L1', progreso: 90, presupuesto: '$120M', fechaFin: 'Mar 2024' },
    { nombre: 'Estación Central L6', progreso: 15, presupuesto: '$890M', fechaFin: 'Dic 2030' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operativa': return 'success'
      case 'Mantenimiento': return 'warning'
      case 'En Construcción': return 'info'
      case 'Planificación': return 'default'
      default: return 'default'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-yellow-500'
    return 'bg-blue-500'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Líneas Metro</h1>
          <p className="text-gray-600 mt-2">
            Administración y control de líneas de metro del sistema
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">6</p>
              <p className="text-sm text-gray-600">Líneas Totales</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">2</p>
              <p className="text-sm text-gray-600">Operativas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">2</p>
              <p className="text-sm text-gray-600">En Construcción</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">99</p>
              <p className="text-sm text-gray-600">Estaciones</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Líneas de Metro</h3>
                <div className="flex space-x-2">
                  <Input placeholder="Buscar líneas..." className="w-64" />
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
                    <TableHeaderCell>Longitud</TableHeaderCell>
                    <TableHeaderCell>Estaciones</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Pasajeros/día</TableHeaderCell>
                    <TableHeaderCell>Acciones</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metroLines.map((line) => (
                    <TableRow key={line.id}>
                      <TableCell className="font-medium">{line.id}</TableCell>
                      <TableCell>{line.nombre}</TableCell>
                      <TableCell>{line.longitud}</TableCell>
                      <TableCell>{line.estaciones}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(line.estado) as any} size="sm">
                          {line.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>{line.pasajeros}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Ver</Button>
                          <Button variant="ghost" size="sm">Editar</Button>
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
              <h3 className="text-lg font-semibold">Proyectos Activos</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">{project.nombre}</h4>
                      <span className="text-xs text-gray-500">{project.progreso}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(project.progreso)}`}
                        style={{ width: `${project.progreso}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{project.presupuesto}</span>
                      <span>{project.fechaFin}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}