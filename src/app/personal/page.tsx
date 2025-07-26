import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function PersonalPage() {
  const employees = [
    { id: 'EMP-001', nombre: 'Carlos Rodríguez', puesto: 'Ingeniero de Vías', departamento: 'Infraestructura', antiguedad: '5 años', estado: 'Activo' },
    { id: 'EMP-002', nombre: 'María González', puesto: 'Supervisora de Operaciones', departamento: 'Operaciones', antiguedad: '8 años', estado: 'Activo' },
    { id: 'EMP-003', nombre: 'Juan Pérez', puesto: 'Técnico de Mantenimiento', departamento: 'Mantenimiento', antiguedad: '3 años', estado: 'Vacaciones' },
    { id: 'EMP-004', nombre: 'Ana Martínez', puesto: 'Coordinadora de Seguridad', departamento: 'Seguridad', antiguedad: '6 años', estado: 'Activo' },
    { id: 'EMP-005', nombre: 'Luis Hernández', puesto: 'Operador de Control', departamento: 'Control Central', antiguedad: '2 años', estado: 'Activo' },
    { id: 'EMP-006', nombre: 'Carmen López', puesto: 'Especialista en Sistemas', departamento: 'Tecnología', antiguedad: '4 años', estado: 'Licencia' }
  ]

  const departments = [
    { name: 'Infraestructura', count: 45, color: 'bg-blue-500' },
    { name: 'Operaciones', count: 89, color: 'bg-green-500' },
    { name: 'Mantenimiento', count: 67, color: 'bg-yellow-500' },
    { name: 'Seguridad', count: 34, color: 'bg-red-500' },
    { name: 'Tecnología', count: 23, color: 'bg-purple-500' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo': return 'success'
      case 'Vacaciones': return 'warning'
      case 'Licencia': return 'info'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Personal</h1>
          <p className="text-gray-600 mt-2">
            Control y administración del personal del sistema metro
          </p>
        </div>
        <Button variant="primary">
          + Nuevo Empleado
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">1,245</p>
              <p className="text-sm text-gray-600">Total Empleados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">1,189</p>
              <p className="text-sm text-gray-600">Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">34</p>
              <p className="text-sm text-gray-600">En Vacaciones</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">22</p>
              <p className="text-sm text-gray-600">En Licencia</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Lista de Personal</h3>
                <div className="flex space-x-2">
                  <Input placeholder="Buscar empleados..." className="w-64" />
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
                    <TableHeaderCell>Puesto</TableHeaderCell>
                    <TableHeaderCell>Departamento</TableHeaderCell>
                    <TableHeaderCell>Antigüedad</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Acciones</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.id}</TableCell>
                      <TableCell>{employee.nombre}</TableCell>
                      <TableCell>{employee.puesto}</TableCell>
                      <TableCell>{employee.departamento}</TableCell>
                      <TableCell>{employee.antiguedad}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(employee.estado) as any} size="sm">
                          {employee.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Editar</Button>
                          <Button variant="ghost" size="sm">Ver</Button>
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
              <h3 className="text-lg font-semibold">Personal por Departamento</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                      <span className="text-sm font-medium">{dept.name}</span>
                    </div>
                    <span className="text-sm font-bold">{dept.count}</span>
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
                  📊 Generar Reporte
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  📅 Gestionar Horarios
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  💰 Nómina del Mes
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  🎓 Programas de Capacitación
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}