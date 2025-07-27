'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { MdSave, MdRefresh, MdInfo, MdSupport, MdSettings } from 'react-icons/md'

export default function ConfiguracionPage() {
  const [config, setConfig] = useState({
    nombreSistema: 'Metro Líneas',
    zonaHoraria: 'GMT-5 (América/Bogotá)',
    idioma: 'Español',
    moneda: 'COP (Peso Colombiano)',
    horarioInicio: '05:00',
    horarioFin: '23:00',
    intervaloTrenes: '3',
    capacidadMaxima: '200'
  })
  
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/configuracion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      })
      
      if (response.ok) {
        setMessage('Configuración guardada exitosamente')
      } else {
        setMessage('Error al guardar la configuración')
      }
    } catch (error) {
      setMessage('Error de conexión')
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleReset = () => {
    setConfig({
      nombreSistema: 'Metro Líneas',
      zonaHoraria: 'GMT-5 (América/Bogotá)',
      idioma: 'Español',
      moneda: 'COP (Peso Colombiano)',
      horarioInicio: '05:00',
      horarioFin: '23:00',
      intervaloTrenes: '3',
      capacidadMaxima: '200'
    })
    setMessage('Configuración restablecida a valores por defecto')
    setTimeout(() => setMessage(''), 3000)
  }

  const updateConfig = (field: string, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }))
  }

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
          <Button 
            variant="ghost" 
            onClick={handleReset}
            className="flex items-center space-x-2"
          >
            <MdRefresh className="w-4 h-4" />
            <span>Restablecer</span>
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2"
          >
            <MdSave className="w-4 h-4" />
            <span>{saving ? 'Guardando...' : 'Guardar'}</span>
          </Button>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-md ${message.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MdSettings className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold">Configuración General</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Sistema
                  </label>
                  <Input 
                    type="text" 
                    value={config.nombreSistema}
                    onChange={(e) => updateConfig('nombreSistema', e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zona Horaria
                  </label>
                  <select 
                    value={config.zonaHoraria}
                    onChange={(e) => updateConfig('zonaHoraria', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="GMT-5 (América/Bogotá)">GMT-5 (América/Bogotá)</option>
                    <option value="GMT-6 (América/Mexico_City)">GMT-6 (América/Mexico City)</option>
                    <option value="GMT-3 (América/Argentina)">GMT-3 (América/Argentina)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Idioma del Sistema
                  </label>
                  <select 
                    value={config.idioma}
                    onChange={(e) => updateConfig('idioma', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="Español">Español</option>
                    <option value="English">English</option>
                    <option value="Português">Português</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Moneda
                  </label>
                  <select 
                    value={config.moneda}
                    onChange={(e) => updateConfig('moneda', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="COP (Peso Colombiano)">COP (Peso Colombiano)</option>
                    <option value="USD (Dólar)">USD (Dólar)</option>
                    <option value="EUR (Euro)">EUR (Euro)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MdSettings className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold">Configuración de Operaciones</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Horario de Operación Inicio
                  </label>
                  <Input 
                    type="time" 
                    value={config.horarioInicio}
                    onChange={(e) => updateConfig('horarioInicio', e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Horario de Operación Fin
                  </label>
                  <Input 
                    type="time" 
                    value={config.horarioFin}
                    onChange={(e) => updateConfig('horarioFin', e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Intervalo entre Trenes (min)
                  </label>
                  <Input 
                    type="number" 
                    value={config.intervaloTrenes}
                    onChange={(e) => updateConfig('intervaloTrenes', e.target.value)}
                    className="w-full"
                    min="1"
                    max="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacidad Máxima por Vagón
                  </label>
                  <Input 
                    type="number" 
                    value={config.capacidadMaxima}
                    onChange={(e) => updateConfig('capacidadMaxima', e.target.value)}
                    className="w-full"
                    min="100"
                    max="400"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MdInfo className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Información del Sistema</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Versión del Sistema</span>
                  <span className="text-sm font-medium text-gray-900">v2.4.1</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Última Actualización</span>
                  <span className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Base de Datos</span>
                  <span className="text-sm font-medium text-gray-900">SQLite</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Servidor</span>
                  <span className="text-sm font-medium text-gray-900">Next.js 15</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Estado</span>
                  <span className="text-sm font-medium text-green-600">Operativo</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MdSupport className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold">Soporte</h3>
              </div>
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
                  <button 
                    onClick={() => alert('Manual de usuario descargado')}
                    className="text-orange-600 hover:underline cursor-pointer"
                  >
                    Ver Manual de Usuario
                  </button>
                </div>
                <div className="pt-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => alert('Ticket de soporte creado')}
                    className="w-full"
                  >
                    Crear Ticket de Soporte
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}