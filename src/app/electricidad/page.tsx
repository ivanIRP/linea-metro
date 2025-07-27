import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export default function ElectricidadPage() {
  const subestaciones = [
    { 
      id: 'SUB-001', 
      nombre: 'Subestación Central', 
      ubicacion: 'Km 0.0', 
      voltaje: '25 kV', 
      potencia: '5 MW',
      estado: 'Operativa',
      carga: '78%',
      temperatura: '45°C'
    },
    { 
      id: 'SUB-002', 
      nombre: 'Subestación Norte', 
      ubicacion: 'Km 12.5', 
      voltaje: '25 kV', 
      potencia: '3.5 MW',
      estado: 'Operativa',
      carga: '65%',
      temperatura: '42°C'
    },
    { 
      id: 'SUB-003', 
      nombre: 'Subestación Sur', 
      ubicacion: 'Km 24.5', 
      voltaje: '25 kV', 
      potencia: '4 MW',
      estado: 'Mantenimiento',
      carga: '0%',
      temperatura: '25°C'
    },
    { 
      id: 'SUB-004', 
      nombre: 'Subestación Este', 
      ubicacion: 'Km 18.2', 
      voltaje: '25 kV', 
      potencia: '3 MW',
      estado: 'Operativa',
      carga: '89%',
      temperatura: '48°C'
    }
  ]

  const consumo = [
    { linea: 'Línea 1', potencia: '2.5 MW', voltaje: '25 kV', corriente: '100 A', factor: '0.95' },
    { linea: 'Línea 2', potencia: '1.8 MW', voltaje: '25 kV', corriente: '72 A', factor: '0.93' },
    { linea: 'Línea 3', potencia: '2.1 MW', voltaje: '25 kV', corriente: '84 A', factor: '0.94' },
    { linea: 'Servicios', potencia: '0.6 MW', voltaje: '25 kV', corriente: '24 A', factor: '0.91' }
  ]

  const alertas = [
    { id: 'ELE-001', tipo: 'Sobrecarga', ubicacion: 'SUB-004', nivel: 'Alto', valor: '89%' },
    { id: 'ELE-002', tipo: 'Temperatura Alta', ubicacion: 'SUB-004', nivel: 'Medio', valor: '48°C' },
    { id: 'ELE-003', tipo: 'Mantenimiento', ubicacion: 'SUB-003', nivel: 'Info', valor: 'Programado' }
  ]

  const equipos = [
    { equipo: 'Transformador T1', ubicacion: 'SUB-001', estado: 'Operativo', temperatura: '65°C' },
    { equipo: 'Rectificador R1', ubicacion: 'SUB-001', estado: 'Operativo', temperatura: '58°C' },
    { equipo: 'Interruptor I1', ubicacion: 'SUB-002', estado: 'Operativo', temperatura: '35°C' },
    { equipo: 'Transformador T2', ubicacion: 'SUB-003', estado: 'Mantenimiento', temperatura: '25°C' }
  ]

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Operativa': case 'Operativo': return 'success'
      case 'Mantenimiento': return 'warning'
      case 'Falla': return 'error'
      default: return 'default'
    }
  }

  const getCargaColor = (carga: string) => {
    const valor = parseInt(carga)
    if (valor <= 60) return 'bg-green-500'
    if (valor <= 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Alto': return 'error'
      case 'Medio': return 'warning'
      case 'Info': return 'info'
      default: return 'default'
    }
  }

  const getTemperaturaColor = (temp: string) => {
    const valor = parseInt(temp)
    if (valor <= 40) return 'text-blue-600'
    if (valor <= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sistema Eléctrico</h1>
          <p className="text-gray-600 mt-2">
            Control y monitoreo del sistema de alimentación eléctrica
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">15.5</p>
              <p className="text-sm text-gray-600">MW Instalados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">7.0</p>
              <p className="text-sm text-gray-600">MW en Uso</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">4</p>
              <p className="text-sm text-gray-600">Subestaciones</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">98.5%</p>
              <p className="text-sm text-gray-600">Disponibilidad</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Estado de Subestaciones</h3>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Nombre</TableHeaderCell>
                    <TableHeaderCell>Ubicación</TableHeaderCell>
                    <TableHeaderCell>Potencia</TableHeaderCell>
                    <TableHeaderCell>Carga</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Temp</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subestaciones.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.id}</TableCell>
                      <TableCell>{sub.nombre}</TableCell>
                      <TableCell>{sub.ubicacion}</TableCell>
                      <TableCell>{sub.potencia}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getCargaColor(sub.carga)}`}
                              style={{ width: sub.carga }}
                            ></div>
                          </div>
                          <span className="text-sm">{sub.carga}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getEstadoColor(sub.estado) as unknown } size="sm">
                          {sub.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className={getTemperaturaColor(sub.temperatura)}>
                        {sub.temperatura}
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
              <h3 className="text-lg font-semibold">Alertas Eléctricas</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alertas.map((alerta) => (
                  <div key={alerta.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{alerta.tipo}</p>
                        <p className="text-sm text-gray-600">{alerta.ubicacion}</p>
                      </div>
                      <Badge variant={getNivelColor(alerta.nivel) as unknown } size="sm">
                        {alerta.nivel}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-orange-600 mt-2">{alerta.valor}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Control Eléctrico</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="secondary" className="w-full justify-start">
                  ⚡ Diagnóstico General
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  🔌 Control de Carga
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  🌡️ Monitoreo Temperatura
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  🚨 Emergencia Eléctrica
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Consumo por Línea</h3>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Línea</TableHeaderCell>
                  <TableHeaderCell>Potencia</TableHeaderCell>
                  <TableHeaderCell>Voltaje</TableHeaderCell>
                  <TableHeaderCell>Corriente</TableHeaderCell>
                  <TableHeaderCell>Factor P</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consumo.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.linea}</TableCell>
                    <TableCell>{item.potencia}</TableCell>
                    <TableCell>{item.voltaje}</TableCell>
                    <TableCell>{item.corriente}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={parseFloat(item.factor) >= 0.95 ? 'success' : 'warning'} 
                        size="sm"
                      >
                        {item.factor}
                      </Badge>
                    </TableCell>
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
                  <TableHeaderCell>Temperatura</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipos.map((equipo, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{equipo.equipo}</TableCell>
                    <TableCell>{equipo.ubicacion}</TableCell>
                    <TableCell>
                      <Badge variant={getEstadoColor(equipo.estado) as unknown } size="sm">
                        {equipo.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className={getTemperaturaColor(equipo.temperatura)}>
                      {equipo.temperatura}
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
          <h3 className="text-lg font-semibold">Panel de Control Eléctrico</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Control de Subestaciones</h4>
              <div className="space-y-2">
                <Button variant="secondary" className="w-full justify-start text-sm">
                  🔌 SUB-001: Activa
                </Button>
                <Button variant="secondary" className="w-full justify-start text-sm">
                  🔌 SUB-002: Activa
                </Button>
                <Button variant="secondary" className="w-full justify-start text-sm text-yellow-600">
                  🔧 SUB-003: Mantenimiento
                </Button>
                <Button variant="secondary" className="w-full justify-start text-sm text-red-600">
                  ⚠️ SUB-004: Sobrecarga
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Mediciones en Tiempo Real</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Consumo Total</p>
                  <p className="text-xl font-bold text-green-600">7.0 MW</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Voltaje Promedio</p>
                  <p className="text-xl font-bold text-blue-600">25.2 kV</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">Corriente Total</p>
                  <p className="text-xl font-bold text-orange-600">280 A</p>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}