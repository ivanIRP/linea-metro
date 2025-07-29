'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import { Form, FormField, FormActions } from '@/components/ui/Form'

interface Via {
  id: string
  nombre: string
  tipo: string
  longitud: number
  activa: boolean
  material: string
  ultimaInspeccion?: string
  proximaInspeccion?: string
  velocidadMaxima: number
  linea?: { nombre: string }
}

export default function ViasPage() {
  const [vias, setVias] = useState<Via[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingVia, setEditingVia] = useState<Via | null>(null)
  
  const [viaForm, setViaForm] = useState({
    nombre: '',
    tipo: 'Principal',
    longitud: '',
    activa: true,
    material: '',
    ultimaInspeccion: '',
    proximaInspeccion: '',
    velocidadMaxima: ''
  })

  useEffect(() => {
    fetchVias()
  }, [])

  const fetchVias = async () => {
    try {
      const response = await fetch('/api/vias')
      if (response.ok) {
        const data = await response.json()
        setVias(data)
      }
    } catch (error) {
      console.error('Error fetching vias:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingVia ? `/api/vias/${editingVia.id}` : '/api/vias'
      const method = editingVia ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...viaForm,
          longitud: parseFloat(viaForm.longitud),
          velocidadMaxima: parseInt(viaForm.velocidadMaxima)
        })
      })

      if (response.ok) {
        fetchVias()
        setShowModal(false)
        resetForm()
      }
    } catch (error) {
      console.error('Error saving via:', error)
    }
  }

  const handleEdit = (via: Via) => {
    setEditingVia(via)
    setViaForm({
      nombre: via.nombre,
      tipo: via.tipo,
      longitud: via.longitud.toString(),
      activa: via.activa,
      material: via.material,
      ultimaInspeccion: via.ultimaInspeccion || '',
      proximaInspeccion: via.proximaInspeccion || '',
      velocidadMaxima: via.velocidadMaxima.toString()
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setViaForm({
      nombre: '',
      tipo: 'Principal',
      longitud: '',
      activa: true,
      material: '',
      ultimaInspeccion: '',
      proximaInspeccion: '',
      velocidadMaxima: ''
    })
    setEditingVia(null)
  }

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

  const getEstadoColor = (activa: boolean) => {
    return activa ? 'success' : 'error'
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
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Estado de Vías</h3>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => {
                    resetForm()
                    setShowModal(true)
                  }}
                >
                  ➕ Agregar Vía
                </Button>
              </div>
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
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
                      </TableCell>
                    </TableRow>
                  ) : vias.map((via) => (
                    <TableRow key={via.id}>
                      <TableCell className="font-medium">{via.id}</TableCell>
                      <TableCell>{via.nombre}</TableCell>
                      <TableCell>{via.linea?.nombre || 'Sin asignar'}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={via.tipo === 'Principal' ? 'info' : 'default'} 
                          size="sm"
                        >
                          {via.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>{via.longitud} km</TableCell>
                      <TableCell>
                        <Badge variant={getEstadoColor(via.activa) as any} size="sm">
                          {via.activa ? 'Operativa' : 'Fuera de Servicio'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-orange-600"
                            onClick={() => handleEdit(via)}
                          >
                            ✏️ Editar
                          </Button>
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
                      <Badge variant={getEstadoSeccionColor(seccion.estado) as unknown } size="sm">
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
                      <Badge variant={getSensorColor(sensor.estado) as unknown } size="sm">
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

      {/* Modal para Crear/Editar Vía */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          resetForm()
        }}
        title={editingVia ? 'Editar Vía' : 'Agregar Nueva Vía'}
      >
        <Form onSubmit={handleSave}>
          <FormField label="Nombre de la Vía" required>
            <Input
              value={viaForm.nombre}
              onChange={(e) => setViaForm({...viaForm, nombre: e.target.value})}
              placeholder="Vía Principal Norte"
              required
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tipo de Vía" required>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={viaForm.tipo}
                onChange={(e) => setViaForm({...viaForm, tipo: e.target.value})}
              >
                <option value="Principal">Principal</option>
                <option value="Secundaria">Secundaria</option>
                <option value="Servicio">Servicio</option>
                <option value="Mantenimiento">Mantenimiento</option>
              </select>
            </FormField>

            <FormField label="Material" required>
              <Input
                value={viaForm.material}
                onChange={(e) => setViaForm({...viaForm, material: e.target.value})}
                placeholder="Acero Inoxidable"
                required
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Longitud (km)" required>
              <Input
                type="number"
                step="0.1"
                value={viaForm.longitud}
                onChange={(e) => setViaForm({...viaForm, longitud: e.target.value})}
                placeholder="12.5"
                required
              />
            </FormField>

            <FormField label="Velocidad Máxima (km/h)" required>
              <Input
                type="number"
                value={viaForm.velocidadMaxima}
                onChange={(e) => setViaForm({...viaForm, velocidadMaxima: e.target.value})}
                placeholder="80"
                required
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Última Inspección">
              <Input
                type="date"
                value={viaForm.ultimaInspeccion}
                onChange={(e) => setViaForm({...viaForm, ultimaInspeccion: e.target.value})}
              />
            </FormField>

            <FormField label="Próxima Inspección">
              <Input
                type="date"
                value={viaForm.proximaInspeccion}
                onChange={(e) => setViaForm({...viaForm, proximaInspeccion: e.target.value})}
              />
            </FormField>
          </div>

          <FormField label="Estado">
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="activa"
                  checked={viaForm.activa === true}
                  onChange={() => setViaForm({...viaForm, activa: true})}
                  className="mr-2"
                />
                Operativa
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="activa"
                  checked={viaForm.activa === false}
                  onChange={() => setViaForm({...viaForm, activa: false})}
                  className="mr-2"
                />
                Fuera de Servicio
              </label>
            </div>
          </FormField>

          <FormActions>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => {
                setShowModal(false)
                resetForm()
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {editingVia ? '💾 Actualizar' : '🛤️ Agregar Vía'}
            </Button>
          </FormActions>
        </Form>
      </Modal>
    </div>
  )
}