import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function InventarioPage() {
  const inventoryItems = [
    { id: 'INV-001', nombre: 'Rieles de Acero', categoria: 'Infraestructura', cantidad: 120, ubicacion: 'Almacén A', estado: 'Disponible' },
    { id: 'INV-002', nombre: 'Vagones Modelo X200', categoria: 'Vehículos', cantidad: 8, ubicacion: 'Taller Central', estado: 'Mantenimiento' },
    { id: 'INV-003', nombre: 'Sistemas de Señalización', categoria: 'Tecnología', cantidad: 45, ubicacion: 'Almacén B', estado: 'Disponible' },
    { id: 'INV-004', nombre: 'Motores Eléctricos', categoria: 'Componentes', cantidad: 32, ubicacion: 'Almacén C', estado: 'Disponible' },
    { id: 'INV-005', nombre: 'Tornillos de Sujeción', categoria: 'Accesorios', cantidad: 5000, ubicacion: 'Almacén A', estado: 'Disponible' },
    { id: 'INV-006', nombre: 'Cables de Alimentación', categoria: 'Infraestructura', cantidad: 850, ubicacion: 'Almacén B', estado: 'Bajo Stock' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible': return 'success'
      case 'Mantenimiento': return 'warning'
      case 'Bajo Stock': return 'danger'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventario</h1>
          <p className="text-gray-600 mt-2">
            Gestión de materiales y equipos para líneas de metro
          </p>
        </div>
        <Button variant="primary">
          + Agregar Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">324</p>
              <p className="text-sm text-gray-600">Items Totales</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">289</p>
              <p className="text-sm text-gray-600">Disponibles</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">12</p>
              <p className="text-sm text-gray-600">En Mantenimiento</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">23</p>
              <p className="text-sm text-gray-600">Bajo Stock</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Lista de Inventario</h3>
            <div className="flex space-x-2">
              <Input placeholder="Buscar items..." className="w-64" />
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
                <TableHeaderCell>Categoría</TableHeaderCell>
                <TableHeaderCell>Cantidad</TableHeaderCell>
                <TableHeaderCell>Ubicación</TableHeaderCell>
                <TableHeaderCell>Estado</TableHeaderCell>
                <TableHeaderCell>Acciones</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell>{item.categoria}</TableCell>
                  <TableCell>{item.cantidad.toLocaleString()}</TableCell>
                  <TableCell>{item.ubicacion}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(item.estado) as any} size="sm">
                      {item.estado}
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
  )
}