import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function ConfiguracionPage() {
  const configSections = [
    {
      title: 'Configuración General',
      items: [
        { label: 'Nombre del Sistema', value: 'Metro Líneas', type: 'text' },
        { label: 'Zona Horaria', value: 'GMT-5 (América/Bogotá)', type: 'select' },
        { label: 'Idioma del Sistema', value: 'Español', type: 'select' },
        { label: 'Moneda', value: 'COP (Peso Colombiano)', type: 'select' }
      ]
    },
    {
      title: 'Configuración de Operaciones',
      items: [
        { label: 'Horario de Operación Inicio', value: '05:00', type: 'time' },
        { label: 'Horario de Operación Fin', value: '23:00', type: 'time' },
        { label: 'Intervalo entre Trenes (min)', value: '3', type: 'number' },
        { label: 'Capacidad Máxima por Vagón', value: '200', type: 'number' }
      ]
    },
    {
      title: 'Configuración de Seguridad',
      items: [
        { label: 'Tiempo de Sesión (min)', value: '120', type: 'number' },
        { label: 'Intentos de Login Máximos', value: '3', type: 'number' },
        { label: 'Autenticación de Dos Factores', value: 'Activado', type: 'toggle' },
        { label: 'Logs de Auditoría', value: 'Activado', type: 'toggle' }
      ]
    },
    {
      title: 'Notificaciones',
      items: [
        { label: 'Alertas de Mantenimiento', value: 'Activado', type: 'toggle' },
        { label: 'Notificaciones de Emergencia', value: 'Activado', type: 'toggle' },
        { label: 'Reportes Automáticos', value: 'Semanal', type: 'select' },
        { label: 'Email de Administrador', value: 'admin@metro.com', type: 'email' }
      ]
    }
  ]

  const systemInfo = [
    { label: 'Versión del Sistema', value: 'v2.4.1' },
    { label: 'Última Actualización', value: '15 Jul 2024' },
    { label: 'Base de Datos', value: 'PostgreSQL 14.2' },
    { label: 'Servidor', value: 'Ubuntu Server 22.04 LTS' },
    { label: 'Uptime', value: '47 días, 12 horas' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuración del Sistema</h1>
          <p className="text-gray-600 mt-2">
            Ajustes y parámetros generales del sistema de gestión
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary">Restaurar Configuración</Button>
          <Button variant="primary">Guardar Cambios</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {configSections.map((section, sectionIndex) => (
            <Card key={sectionIndex}>
              <CardHeader>
                <h3 className="text-lg font-semibold">{section.title}</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      {item.type === 'toggle' ? (
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">
                            {item.label}
                          </label>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600 mr-2">{item.value}</span>
                            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600 transition-colors">
                              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {item.label}
                          </label>
                          {item.type === 'select' ? (
                            <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                              <option>{item.value}</option>
                            </select>
                          ) : (
                            <Input 
                              type={item.type} 
                              defaultValue={item.value}
                              className="w-full"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Información del Sistema</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemInfo.map((info, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-600">{info.label}</span>
                    <span className="text-sm font-medium text-gray-900">{info.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>


          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Soporte</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Centro de Ayuda</p>
                  <p className="text-gray-600">help@metro.com</p>
                </div>
                <div>
                  <p className="font-medium">Soporte Técnico</p>
                  <p className="text-gray-600">+57 1 234 5678</p>
                </div>
                <div>
                  <p className="font-medium">Documentación</p>
                  <a href="#" className="text-blue-600 hover:underline">Ver Manual de Usuario</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}