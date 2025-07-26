'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import { Form, FormField, FormActions } from '@/components/ui/Form'
import { MdAdd, MdEdit, MdSearch, MdPerson } from 'react-icons/md'

interface Usuario {
  id: string
  username: string
  nombre: string
  email?: string
  rol: string
  activo: boolean
  createdAt?: string
}

export default function PersonalPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null)
  const [filter, setFilter] = useState('')
  
  const [usuarioForm, setUsuarioForm] = useState({
    username: '',
    nombre: '',
    email: '',
    rol: 'Operador',
    activo: true,
    password: ''
  })

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('/api/personal')
      if (response.ok) {
        const data = await response.json()
        setUsuarios(data)
      }
    } catch (error) {
      console.error('Error fetching usuarios:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingUsuario ? `/api/personal/${editingUsuario.id}` : '/api/personal'
      const method = editingUsuario ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioForm)
      })

      if (response.ok) {
        fetchUsuarios()
        setShowModal(false)
        resetForm()
      }
    } catch (error) {
      console.error('Error saving usuario:', error)
    }
  }

  const handleEdit = (usuario: Usuario) => {
    setEditingUsuario(usuario)
    setUsuarioForm({
      username: usuario.username,
      nombre: usuario.nombre,
      email: usuario.email || '',
      rol: usuario.rol,
      activo: usuario.activo,
      password: ''
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setUsuarioForm({
      username: '',
      nombre: '',
      email: '',
      rol: 'Operador',
      activo: true,
      password: ''
    })
    setEditingUsuario(null)
  }

  const filteredUsuarios = usuarios.filter(usuario => 
    !filter || 
    usuario.nombre.toLowerCase().includes(filter.toLowerCase()) ||
    usuario.username.toLowerCase().includes(filter.toLowerCase()) ||
    usuario.rol.toLowerCase().includes(filter.toLowerCase())
  )

  const roleStats = [
    { name: 'Administrador', count: usuarios.filter(u => u.rol === 'Administrador').length, color: 'bg-red-500' },
    { name: 'Operador', count: usuarios.filter(u => u.rol === 'Operador').length, color: 'bg-blue-500' },
    { name: 'Seguridad', count: usuarios.filter(u => u.rol === 'Seguridad').length, color: 'bg-yellow-500' },
    { name: 'Mantenimiento', count: usuarios.filter(u => u.rol === 'Mantenimiento').length, color: 'bg-green-500' },
    { name: 'Supervisor', count: usuarios.filter(u => u.rol === 'Supervisor').length, color: 'bg-purple-500' }
  ]

  const getStatusColor = (activo: boolean) => {
    return activo ? 'success' : 'error'
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{usuarios.length}</p>
              <p className="text-sm text-gray-600">Total Usuarios</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{usuarios.filter(u => u.activo).length}</p>
              <p className="text-sm text-gray-600">Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{usuarios.filter(u => !u.activo).length}</p>
              <p className="text-sm text-gray-600">Inactivos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{usuarios.filter(u => u.rol === 'Administrador').length}</p>
              <p className="text-sm text-gray-600">Administradores</p>
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
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="Buscar usuarios..." 
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
                    <span>Agregar Usuario</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Usuario</TableHeaderCell>
                    <TableHeaderCell>Nombre</TableHeaderCell>
                    <TableHeaderCell>Email</TableHeaderCell>
                    <TableHeaderCell>Rol</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Acciones</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
                      </TableCell>
                    </TableRow>
                  ) : filteredUsuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">{usuario.username}</TableCell>
                      <TableCell>{usuario.nombre}</TableCell>
                      <TableCell>{usuario.email || 'N/A'}</TableCell>
                      <TableCell>{usuario.rol}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(usuario.activo) as any} size="sm">
                          {usuario.activo ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-orange-600 flex items-center space-x-1"
                            onClick={() => handleEdit(usuario)}
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
              <h3 className="text-lg font-semibold">Usuarios por Rol</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roleStats.map((role, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${role.color}`}></div>
                      <span className="text-sm font-medium">{role.name}</span>
                    </div>
                    <span className="text-sm font-bold">{role.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal for CRUD operations */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false)
            resetForm()
          }}
          title={editingUsuario ? 'Editar Usuario' : 'Agregar Usuario'}
        >
          <Form onSubmit={handleSave} className="space-y-4">
            <FormField label="Nombre de Usuario">
              <Input
                value={usuarioForm.username}
                onChange={(e) => setUsuarioForm({...usuarioForm, username: e.target.value})}
                placeholder="Ingrese el nombre de usuario"
                required
                disabled={!!editingUsuario}
              />
            </FormField>

            <FormField label="Nombre Completo">
              <Input
                value={usuarioForm.nombre}
                onChange={(e) => setUsuarioForm({...usuarioForm, nombre: e.target.value})}
                placeholder="Ingrese el nombre completo"
                required
              />
            </FormField>

            <FormField label="Email">
              <Input
                type="email"
                value={usuarioForm.email}
                onChange={(e) => setUsuarioForm({...usuarioForm, email: e.target.value})}
                placeholder="Ingrese el email"
              />
            </FormField>

            {!editingUsuario && (
              <FormField label="Contraseña">
                <Input
                  type="password"
                  value={usuarioForm.password}
                  onChange={(e) => setUsuarioForm({...usuarioForm, password: e.target.value})}
                  placeholder="Ingrese la contraseña"
                  required={!editingUsuario}
                />
              </FormField>
            )}

            <FormField label="Rol">
              <select
                value={usuarioForm.rol}
                onChange={(e) => setUsuarioForm({...usuarioForm, rol: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="Administrador">Administrador</option>
                <option value="Operador">Operador</option>
                <option value="Seguridad">Seguridad</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Supervisor">Supervisor</option>
              </select>
            </FormField>

            <FormField label="Estado">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="activo"
                  checked={usuarioForm.activo}
                  onChange={(e) => setUsuarioForm({...usuarioForm, activo: e.target.checked})}
                  className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="activo" className="text-sm font-medium text-gray-700">
                  Usuario activo
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
                {editingUsuario ? 'Actualizar' : 'Crear'} Usuario
              </Button>
            </FormActions>
          </Form>
        </Modal>
      )}
    </div>
  )
}