import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function CobroPage() {
  const tarifas = [
    { tipo: 'Tarifa Básica', precio: '$2.50', descripcion: 'Viaje sencillo adulto', estado: 'Activa' },
    { tipo: 'Tarifa Estudiante', precio: '$1.25', descripcion: 'Viaje con descuento estudiantil', estado: 'Activa' },
    { tipo: 'Tarifa Adulto Mayor', precio: '$1.00', descripcion: 'Descuento tercera edad', estado: 'Activa' },
    { tipo: 'Pase Mensual', precio: '$45.00', descripcion: 'Viajes ilimitados 30 días', estado: 'Activa' }
  ]

  const transacciones = [
    { id: 'TXN-001', fecha: '25/03/2024', hora: '14:30', tarjeta: '****4567', monto: '$2.50', estacion: 'Central', estado: 'Exitosa' },
    { id: 'TXN-002', fecha: '25/03/2024', hora: '14:28', tarjeta: '****1234', monto: '$1.25', estacion: 'Norte', estado: 'Exitosa' },
    { id: 'TXN-003', fecha: '25/03/2024', hora: '14:25', tarjeta: '****8901', monto: '$2.50', estacion: 'Sur', estado: 'Fallida' },
    { id: 'TXN-004', fecha: '25/03/2024', hora: '14:22', tarjeta: '****2345', monto: '$45.00', estacion: 'Centro', estado: 'Exitosa' }
  ]

  const ingresos = [
    { periodo: 'Hoy', monto: '$12,450.00', transacciones: '498', porcentaje: '+5.2%' },
    { periodo: 'Esta Semana', monto: '$89,250.00', transacciones: '3,571', porcentaje: '+8.1%' },
    { periodo: 'Este Mes', monto: '$356,800.00', transacciones: '14,272', porcentaje: '+12.3%' },
    { periodo: 'Este Año', monto: '$3,245,600.00', transacciones: '129,824', porcentaje: '+15.7%' }
  ]

  const metodosPago = [
    { metodo: 'Tarjeta Metro', porcentaje: '65%', monto: '$195,600', color: 'bg-orange-500' },
    { metodo: 'Contactless', porcentaje: '25%', monto: '$75,200', color: 'bg-blue-500' },
    { metodo: 'Código QR', porcentaje: '8%', monto: '$24,064', color: 'bg-green-500' },
    { metodo: 'Efectivo', porcentaje: '2%', monto: '$6,016', color: 'bg-gray-500' }
  ]

  const alertasCobro = [
    { id: 'PAY-001', tipo: 'Sistema Caído', ubicacion: 'Est. Universidad', nivel: 'Alto', tiempo: '5 min' },
    { id: 'PAY-002', tipo: 'Lector Defectuoso', ubicacion: 'Est. Centro', nivel: 'Medio', tiempo: '15 min' },
    { id: 'PAY-003', tipo: 'Recarga Pendiente', ubicacion: 'Sistema', nivel: 'Bajo', tiempo: '2 horas' }
  ]

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Exitosa': case 'Activa': return 'success'
      case 'Fallida': return 'error'
      case 'Pendiente': return 'warning'
      default: return 'default'
    }
  }

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Alto': return 'error'
      case 'Medio': return 'warning'
      case 'Bajo': return 'info'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Cobro</h1>
          <p className="text-gray-600 mt-2">
            Gestión de tarifas, pagos y recaudación del sistema
          </p>
        </div>
        <Button variant="primary" className="bg-orange-500 hover:bg-orange-600">
          💳 Nueva Tarifa
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {ingresos.map((ingreso, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-lg font-bold text-orange-600">{ingreso.monto}</p>
                <p className="text-sm text-gray-600">{ingreso.periodo}</p>
                <p className="text-xs text-green-600 mt-1">{ingreso.porcentaje}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Transacciones Recientes</h3>
                <div className="flex space-x-2">
                  <Input placeholder="Buscar transacción..." className="w-48" />
                  <Button variant="secondary" size="sm">Filtrar</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Fecha/Hora</TableHeaderCell>
                    <TableHeaderCell>Tarjeta</TableHeaderCell>
                    <TableHeaderCell>Monto</TableHeaderCell>
                    <TableHeaderCell>Estación</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Acciones</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transacciones.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="font-medium">{txn.id}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{txn.fecha}</p>
                          <p className="text-gray-500">{txn.hora}</p>
                        </div>
                      </TableCell>
                      <TableCell>{txn.tarjeta}</TableCell>
                      <TableCell className="font-medium">{txn.monto}</TableCell>
                      <TableCell>{txn.estacion}</TableCell>
                      <TableCell>
                        <Badge variant={getEstadoColor(txn.estado) as any} size="sm">
                          {txn.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-orange-600">
                          Ver
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
              <h3 className="text-lg font-semibold">Métodos de Pago</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metodosPago.map((metodo, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metodo.metodo}</span>
                      <span className="text-sm text-gray-600">{metodo.porcentaje}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${metodo.color}`}
                        style={{ width: metodo.porcentaje }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">{metodo.monto}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Alertas de Cobro</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alertasCobro.map((alerta) => (
                  <div key={alerta.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{alerta.tipo}</p>
                        <p className="text-sm text-gray-600">{alerta.ubicacion}</p>
                      </div>
                      <Badge variant={getNivelColor(alerta.nivel) as any} size="sm">
                        {alerta.nivel}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Hace {alerta.tiempo}</p>
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
            <h3 className="text-lg font-semibold">Configuración de Tarifas</h3>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Tipo</TableHeaderCell>
                  <TableHeaderCell>Precio</TableHeaderCell>
                  <TableHeaderCell>Descripción</TableHeaderCell>
                  <TableHeaderCell>Estado</TableHeaderCell>
                  <TableHeaderCell>Acciones</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tarifas.map((tarifa, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{tarifa.tipo}</TableCell>
                    <TableCell className="font-bold text-orange-600">{tarifa.precio}</TableCell>
                    <TableCell>{tarifa.descripcion}</TableCell>
                    <TableCell>
                      <Badge variant={getEstadoColor(tarifa.estado) as any} size="sm">
                        {tarifa.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-orange-600">
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Panel de Control de Pagos</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-3">Estado del Sistema</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">98.5%</p>
                    <p className="text-xs text-gray-600">Disponibilidad</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">1.2s</p>
                    <p className="text-xs text-gray-600">Tiempo Respuesta</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Acciones Rápidas</h4>
                <Button variant="secondary" className="w-full justify-start">
                  💳 Procesar Reembolso
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  📊 Reporte Diario
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  🔧 Mantenimiento Sistema
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  ⚙️ Configurar Tarifas
                </Button>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-700 mb-2">Próximas Acciones</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Actualización tarifas - 01/04/2024</li>
                  <li>• Mantenimiento lectores - 15/04/2024</li>
                  <li>• Reporte mensual - 30/03/2024</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Crear Nueva Transacción Manual</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Tarifa
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Tarifa Básica - $2.50</option>
                <option>Tarifa Estudiante - $1.25</option>
                <option>Tarifa Adulto Mayor - $1.00</option>
                <option>Pase Mensual - $45.00</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estación
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Central</option>
                <option>Norte</option>
                <option>Sur</option>
                <option>Universidad</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Método de Pago
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Tarjeta Metro</option>
                <option>Contactless</option>
                <option>Código QR</option>
                <option>Efectivo</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                💳 Procesar Pago
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}