'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import { Form, FormField, FormActions } from '@/components/ui/Form'
import { MdAdd, MdEdit, MdSearch, MdMap } from 'react-icons/md'

interface Ruta {
  id: string
  nombre: string
  origen: string
  destino: string
  distancia: number
  duracion: number
  estado: string
  frecuencia: number
  linea?: { nombre: string }
}

export default function RutasPage() {
  const [rutas, setRutas] = useState<Ruta[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingRuta, setEditingRuta] = useState<Ruta | null>(null)
  const [filter, setFilter] = useState('')
  
  const [rutaForm, setRutaForm] = useState({
    nombre: '',
    origen: '',
    destino: '',
    distancia: '',
    duracion: '',
    frecuencia: '',
    estado: 'Activa'
  })

  useEffect(() => {
    fetchRutas()
  }, [])

  const fetchRutas = async () => {
    try {
      const response = await fetch('/api/rutas')
      if (response.ok) {
        const data = await response.json()
        setRutas(data)
      }
    } catch (error) {
      console.error('Error fetching rutas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingRuta ? `/api/rutas/${editingRuta.id}` : '/api/rutas'
      const method = editingRuta ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...rutaForm,
          distancia: parseFloat(rutaForm.distancia),
          duracion: parseInt(rutaForm.duracion),
          frecuencia: parseInt(rutaForm.frecuencia)
        })
      })

      if (response.ok) {
        fetchRutas()
        setShowModal(false)
        resetForm()
      }
    } catch (error) {
      console.error('Error saving ruta:', error)
    }
  }

  const handleEdit = (ruta: Ruta) => {
    setEditingRuta(ruta)
    setRutaForm({
      nombre: ruta.nombre,
      origen: ruta.origen,
      destino: ruta.destino,
      distancia: ruta.distancia.toString(),
      duracion: ruta.duracion.toString(),
      frecuencia: ruta.frecuencia.toString(),
      estado: ruta.estado
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setRutaForm({
      nombre: '',
      origen: '',
      destino: '',
      distancia: '',
      duracion: '',
      frecuencia: '',
      estado: 'Activa'
    })
    setEditingRuta(null)
  }

  const filteredRutas = rutas.filter(ruta => 
    !filter || 
    ruta.nombre.toLowerCase().includes(filter.toLowerCase()) ||
    ruta.origen.toLowerCase().includes(filter.toLowerCase()) ||
    ruta.destino.toLowerCase().includes(filter.toLowerCase())
  )

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
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="Buscar rutas..." 
                      className="w-64 pl-10"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    />
                  </div>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => {
                      resetForm()
                      setShowModal(true)
                    }}
                    className="flex items-center space-x-2"
                  >
                    <MdAdd className="w-4 h-4" />
                    <span>Agregar Ruta</span>
                  </Button>
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
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
                      </TableCell>
                    </TableRow>
                  ) : filteredRutas.map((ruta) => (
                    <TableRow key={ruta.id}>
                      <TableCell className="font-medium">{ruta.id}</TableCell>
                      <TableCell>{ruta.nombre}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{ruta.origen}</p>
                          <p className="text-gray-500">↓ {ruta.destino}</p>
                        </div>
                      </TableCell>
                      <TableCell>{ruta.distancia} km</TableCell>
                      <TableCell>{ruta.duracion} min</TableCell>
                      <TableCell>
                        <Badge variant={getEstadoColor(ruta.estado) as unknown } size="sm">
                          {ruta.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-orange-600 flex items-center space-x-1"
                            onClick={() => handleEdit(ruta)}
                          >
                            <MdEdit className="w-4 h-4" />
                            <span>Editar</span>
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
              <h3 className="text-lg font-semibold">Estadísticas</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{rutas.length}</p>
                  <p className="text-sm text-gray-600">Total de Rutas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {rutas.filter(r => r.estado === 'Activa').length}
                  </p>
                  <p className="text-sm text-gray-600">Rutas Activas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {rutas.reduce((sum, r) => sum + r.distancia, 0).toFixed(1)} km
                  </p>
                  <p className="text-sm text-gray-600">Distancia Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal para Crear/Editar Ruta */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          resetForm()
        }}
        title={editingRuta ? 'Editar Ruta' : 'Crear Nueva Ruta'}
      >
        <Form onSubmit={handleSave}>
          <FormField label="Nombre de la Ruta" required>
            <Input
              value={rutaForm.nombre}
              onChange={(e) => setRutaForm({...rutaForm, nombre: e.target.value})}
              placeholder="Ej: Ruta Centro-Aeropuerto"
              required
            />
          </FormField>

          <FormField label="Estación de Origen" required>
            <Input
              value={rutaForm.origen}
              onChange={(e) => setRutaForm({...rutaForm, origen: e.target.value})}
              placeholder="Terminal Norte"
              required
            />
          </FormField>

          <FormField label="Estación de Destino" required>
            <Input
              value={rutaForm.destino}
              onChange={(e) => setRutaForm({...rutaForm, destino: e.target.value})}
              placeholder="Terminal Sur"
              required
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Distancia (km)" required>
              <Input
                type="number"
                step="0.1"
                value={rutaForm.distancia}
                onChange={(e) => setRutaForm({...rutaForm, distancia: e.target.value})}
                placeholder="24.5"
                required
              />
            </FormField>

            <FormField label="Duración (min)" required>
              <Input
                type="number"
                value={rutaForm.duracion}
                onChange={(e) => setRutaForm({...rutaForm, duracion: e.target.value})}
                placeholder="32"
                required
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Frecuencia (min)" required>
              <Input
                type="number"
                value={rutaForm.frecuencia}
                onChange={(e) => setRutaForm({...rutaForm, frecuencia: e.target.value})}
                placeholder="5"
                required
              />
            </FormField>

            <FormField label="Estado" required>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={rutaForm.estado}
                onChange={(e) => setRutaForm({...rutaForm, estado: e.target.value})}
              >
                <option value="Activa">Activa</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="En Planificación">En Planificación</option>
                <option value="Suspendida">Suspendida</option>
              </select>
            </FormField>
          </div>

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
            <Button type="submit" variant="primary" className="flex items-center space-x-2">
              {editingRuta ? (
                <>
                  <MdEdit className="w-4 h-4" />
                  <span>Actualizar</span>
                </>
              ) : (
                <>
                  <MdAdd className="w-4 h-4" />
                  <span>Crear Ruta</span>
                </>
              )}
            </Button>
          </FormActions>
        </Form>
      </Modal>
    </div>
  )
}