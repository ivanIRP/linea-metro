'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import { Form, FormField, FormActions } from '@/components/ui/Form'
import { MdAdd, MdEdit, MdSearch } from 'react-icons/md'

interface Equipo {
  id: string
  nombre: string
  tipo: string
  marca: string
  modelo: string
  fechaInstalacion?: string
  activo: boolean
  subestacion?: { nombre: string }
}

export default function InventarioPage() {
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingEquipo, setEditingEquipo] = useState<Equipo | null>(null)
  const [filter, setFilter] = useState('')
  
  const [equipoForm, setEquipoForm] = useState({
    nombre: '',
    tipo: 'Transformador',
    marca: '',
    modelo: '',
    fechaInstalacion: '',
    activo: true
  })

  useEffect(() => {
    fetchEquipos()
  }, [])

  const fetchEquipos = async () => {
    try {
      const response = await fetch('/api/inventario')
      if (response.ok) {
        const data = await response.json()
        setEquipos(data)
      }
    } catch (error) {
      console.error('Error fetching equipos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingEquipo ? `/api/inventario/${editingEquipo.id}` : '/api/inventario'
      const method = editingEquipo ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(equipoForm)
      })

      if (response.ok) {
        fetchEquipos()
        setShowModal(false)
        resetForm()
      }
    } catch (error) {
      console.error('Error saving equipo:', error)
    }
  }

  const handleEdit = (equipo: Equipo) => {
    setEditingEquipo(equipo)
    setEquipoForm({
      nombre: equipo.nombre,
      tipo: equipo.tipo,
      marca: equipo.marca,
      modelo: equipo.modelo,
      fechaInstalacion: equipo.fechaInstalacion || '',
      activo: equipo.activo
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setEquipoForm({
      nombre: '',
      tipo: 'Transformador',
      marca: '',
      modelo: '',
      fechaInstalacion: '',
      activo: true
    })
    setEditingEquipo(null)
  }

  const filteredEquipos = equipos.filter(equipo => 
    !filter || 
    equipo.nombre.toLowerCase().includes(filter.toLowerCase()) ||
    equipo.marca.toLowerCase().includes(filter.toLowerCase()) ||
    equipo.tipo.toLowerCase().includes(filter.toLowerCase())
  )

  const getStatusColor = (activo: boolean) => {
    return activo ? 'success' : 'error'
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
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Buscar equipos..." 
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
                <span>Agregar Equipo</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Tipo</TableHeaderCell>
                <TableHeaderCell>Marca</TableHeaderCell>
                <TableHeaderCell>Modelo</TableHeaderCell>
                <TableHeaderCell>Instalación</TableHeaderCell>
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
              ) : filteredEquipos.map((equipo) => (
                <TableRow key={equipo.id}>
                  <TableCell className="font-medium">{equipo.nombre}</TableCell>
                  <TableCell>{equipo.tipo}</TableCell>
                  <TableCell>{equipo.marca}</TableCell>
                  <TableCell>{equipo.modelo}</TableCell>
                  <TableCell>
                    {equipo.fechaInstalacion ? new Date(equipo.fechaInstalacion).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(equipo.activo) as any} size="sm">
                      {equipo.activo ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-orange-600 flex items-center space-x-1"
                        onClick={() => handleEdit(equipo)}
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

      {/* Modal for CRUD operations */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false)
            resetForm()
          }}
          title={editingEquipo ? 'Editar Equipo' : 'Agregar Equipo'}
        >
          <Form onSubmit={handleSave} className="space-y-4">
            <FormField label="Nombre del Equipo">
              <Input
                value={equipoForm.nombre}
                onChange={(e) => setEquipoForm({...equipoForm, nombre: e.target.value})}
                placeholder="Ingrese el nombre del equipo"
                required
              />
            </FormField>

            <FormField label="Tipo">
              <select
                value={equipoForm.tipo}
                onChange={(e) => setEquipoForm({...equipoForm, tipo: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="Transformador">Transformador</option>
                <option value="Conmutador">Conmutador</option>
                <option value="Rectificador">Rectificador</option>
                <option value="Interruptor">Interruptor</option>
                <option value="Seccionador">Seccionador</option>
                <option value="Relé">Relé</option>
                <option value="Medidor">Medidor</option>
              </select>
            </FormField>

            <FormField label="Marca">
              <Input
                value={equipoForm.marca}
                onChange={(e) => setEquipoForm({...equipoForm, marca: e.target.value})}
                placeholder="Ingrese la marca"
                required
              />
            </FormField>

            <FormField label="Modelo">
              <Input
                value={equipoForm.modelo}
                onChange={(e) => setEquipoForm({...equipoForm, modelo: e.target.value})}
                placeholder="Ingrese el modelo"
              />
            </FormField>

            <FormField label="Fecha de Instalación">
              <Input
                type="date"
                value={equipoForm.fechaInstalacion}
                onChange={(e) => setEquipoForm({...equipoForm, fechaInstalacion: e.target.value})}
              />
            </FormField>

            <FormField label="Estado">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="activo"
                  checked={equipoForm.activo}
                  onChange={(e) => setEquipoForm({...equipoForm, activo: e.target.checked})}
                  className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="activo" className="text-sm font-medium text-gray-700">
                  Equipo activo
                </label>
              </div>
            </FormField>

            <FormActions>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowModal(false)
                  resetForm()
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                {editingEquipo ? 'Actualizar' : 'Crear'} Equipo
              </Button>
            </FormActions>
          </Form>
        </Modal>
      )}
    </div>
  )
}