'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import { Form, FormField, FormActions } from '@/components/ui/Form'

interface CamaraSeguridad {
  id: string
  ubicacion: string
  estado: string
  resolucion: string
  estacionId?: string
}

interface PuntoAcceso {
  id: string
  nombre: string
  ubicacion: string
  estado: string
  tipoAcceso: string
  estacionId?: string
}

interface IncidenteSeguridad {
  id: string
  tipo: string
  descripcion: string
  ubicacion: string
  prioridad: string
  estado: string
  fechaIncidente: string
}

export default function SeguridadPage() {
  const [camaras, setCamaras] = useState<CamaraSeguridad[]>([])
  const [puntosAcceso, setPuntosAcceso] = useState<PuntoAcceso[]>([])
  const [incidentes, setIncidentes] = useState<IncidenteSeguridad[]>([])
  const [loading, setLoading] = useState(true)
  
  // Modals state
  const [showCamaraModal, setShowCamaraModal] = useState(false)
  const [showPuntoModal, setShowPuntoModal] = useState(false)
  const [showIncidenteModal, setShowIncidenteModal] = useState(false)
  
  // Edit state
  const [editingCamara, setEditingCamara] = useState<CamaraSeguridad | null>(null)
  const [editingPunto, setEditingPunto] = useState<PuntoAcceso | null>(null)
  const [editingIncidente, setEditingIncidente] = useState<IncidenteSeguridad | null>(null)
  
  // Filter states
  const [filterCamara, setFilterCamara] = useState('')
  const [filterPunto, setFilterPunto] = useState('')
  const [filterIncidente, setFilterIncidente] = useState('')

  // Form data
  const [camaraForm, setCamaraForm] = useState({
    ubicacion: '',
    estado: 'Activa',
    resolucion: 'HD',
    estacionId: ''
  })

  const [puntoForm, setPuntoForm] = useState({
    nombre: '',
    ubicacion: '',
    estado: 'Cerrado',
    tipoAcceso: 'Tarjeta',
    estacionId: ''
  })

  const [incidenteForm, setIncidenteForm] = useState({
    tipo: '',
    descripcion: '',
    ubicacion: '',
    prioridad: 'Media',
    estado: 'Pendiente'
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [camarasRes, puntosRes, incidentesRes] = await Promise.all([
        fetch('/api/seguridad/camaras'),
        fetch('/api/seguridad/puntos-acceso'),
        fetch('/api/seguridad/incidentes')
      ])

      if (camarasRes.ok) setCamaras(await camarasRes.json())
      if (puntosRes.ok) setPuntosAcceso(await puntosRes.json())
      if (incidentesRes.ok) setIncidentes(await incidentesRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Cámaras CRUD
  const handleSaveCamara = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingCamara 
        ? `/api/seguridad/camaras/${editingCamara.id}`
        : '/api/seguridad/camaras'
      
      const method = editingCamara ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(camaraForm)
      })

      if (response.ok) {
        fetchData()
        setShowCamaraModal(false)
        resetCamaraForm()
      }
    } catch (error) {
      console.error('Error saving camera:', error)
    }
  }

  const handleEditCamara = (camara: CamaraSeguridad) => {
    setEditingCamara(camara)
    setCamaraForm({
      ubicacion: camara.ubicacion,
      estado: camara.estado,
      resolucion: camara.resolucion,
      estacionId: camara.estacionId || ''
    })
    setShowCamaraModal(true)
  }

  const handleDeleteCamara = async (id: string) => {
    if (confirm('¿Está seguro de eliminar esta cámara?')) {
      try {
        const response = await fetch(`/api/seguridad/camaras/${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          fetchData()
        }
      } catch (error) {
        console.error('Error deleting camera:', error)
      }
    }
  }

  // Puntos de acceso CRUD
  const handleSavePunto = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingPunto 
        ? `/api/seguridad/puntos-acceso/${editingPunto.id}`
        : '/api/seguridad/puntos-acceso'
      
      const method = editingPunto ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(puntoForm)
      })

      if (response.ok) {
        fetchData()
        setShowPuntoModal(false)
        resetPuntoForm()
      }
    } catch (error) {
      console.error('Error saving access point:', error)
    }
  }

  const handleEditPunto = (punto: PuntoAcceso) => {
    setEditingPunto(punto)
    setPuntoForm({
      nombre: punto.nombre,
      ubicacion: punto.ubicacion,
      estado: punto.estado,
      tipoAcceso: punto.tipoAcceso,
      estacionId: punto.estacionId || ''
    })
    setShowPuntoModal(true)
  }

  const handleDeletePunto = async (id: string) => {
    if (confirm('¿Está seguro de eliminar este punto de acceso?')) {
      try {
        const response = await fetch(`/api/seguridad/puntos-acceso/${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          fetchData()
        }
      } catch (error) {
        console.error('Error deleting access point:', error)
      }
    }
  }

  // Incidentes CRUD
  const handleSaveIncidente = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingIncidente 
        ? `/api/seguridad/incidentes/${editingIncidente.id}`
        : '/api/seguridad/incidentes'
      
      const method = editingIncidente ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incidenteForm)
      })

      if (response.ok) {
        fetchData()
        setShowIncidenteModal(false)
        resetIncidenteForm()
      }
    } catch (error) {
      console.error('Error saving incident:', error)
    }
  }

  const handleEditIncidente = (incidente: IncidenteSeguridad) => {
    setEditingIncidente(incidente)
    setIncidenteForm({
      tipo: incidente.tipo,
      descripcion: incidente.descripcion,
      ubicacion: incidente.ubicacion,
      prioridad: incidente.prioridad,
      estado: incidente.estado
    })
    setShowIncidenteModal(true)
  }

  const handleDeleteIncidente = async (id: string) => {
    if (confirm('¿Está seguro de eliminar este incidente?')) {
      try {
        const response = await fetch(`/api/seguridad/incidentes/${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          fetchData()
        }
      } catch (error) {
        console.error('Error deleting incident:', error)
      }
    }
  }

  // Reset forms
  const resetCamaraForm = () => {
    setCamaraForm({ ubicacion: '', estado: 'Activa', resolucion: 'HD', estacionId: '' })
    setEditingCamara(null)
  }

  const resetPuntoForm = () => {
    setPuntoForm({ nombre: '', ubicacion: '', estado: 'Cerrado', tipoAcceso: 'Tarjeta', estacionId: '' })
    setEditingPunto(null)
  }

  const resetIncidenteForm = () => {
    setIncidenteForm({ tipo: '', descripcion: '', ubicacion: '', prioridad: 'Media', estado: 'Pendiente' })
    setEditingIncidente(null)
  }

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'Alta': case 'Critica': return 'error'
      case 'Media': return 'warning'
      case 'Baja': return 'info'
      default: return 'default'
    }
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Activa': case 'Abierto': return 'success'
      case 'Pendiente': case 'EnProceso': return 'warning'
      case 'Cerrado': case 'Resuelto': return 'default'
      default: return 'default'
    }
  }

  // Filter functions
  const filteredCamaras = camaras.filter(camara => 
    !filterCamara || 
    camara.ubicacion.toLowerCase().includes(filterCamara.toLowerCase()) ||
    camara.estado.toLowerCase().includes(filterCamara.toLowerCase())
  )
  
  const filteredPuntosAcceso = puntosAcceso.filter(punto => 
    !filterPunto || 
    punto.nombre.toLowerCase().includes(filterPunto.toLowerCase()) ||
    punto.ubicacion.toLowerCase().includes(filterPunto.toLowerCase()) ||
    punto.estado.toLowerCase().includes(filterPunto.toLowerCase())
  )
  
  const filteredIncidentes = incidentes.filter(incidente => 
    !filterIncidente || 
    incidente.tipo.toLowerCase().includes(filterIncidente.toLowerCase()) ||
    incidente.descripcion.toLowerCase().includes(filterIncidente.toLowerCase()) ||
    incidente.ubicacion.toLowerCase().includes(filterIncidente.toLowerCase()) ||
    incidente.estado.toLowerCase().includes(filterIncidente.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos de seguridad...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Control de Seguridad</h1>
          <p className="text-gray-600 mt-2">
            Monitoreo de seguridad y control de accesos del sistema
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{incidentes.filter(i => i.estado === 'Pendiente').length}</p>
              <p className="text-sm text-gray-600">Incidentes Pendientes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{camaras.filter(c => c.estado === 'Activa').length}</p>
              <p className="text-sm text-gray-600">Cámaras Activas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{puntosAcceso.length}</p>
              <p className="text-sm text-gray-600">Puntos de Acceso</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {Math.round((camaras.filter(c => c.estado === 'Activa').length / Math.max(camaras.length, 1)) * 100)}%
              </p>
              <p className="text-sm text-gray-600">Sistema Operativo</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cámaras de Seguridad */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Cámaras de Seguridad</h3>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="🔍 Filtrar cámaras..."
                value={filterCamara}
                onChange={(e) => setFilterCamara(e.target.value)}
                className="w-48"
              />
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => {
                  resetCamaraForm()
                  setShowCamaraModal(true)
                }}
              >
                📹 Agregar Cámara
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Ubicación</TableHeaderCell>
                <TableHeaderCell>Estado</TableHeaderCell>
                <TableHeaderCell>Resolución</TableHeaderCell>
                <TableHeaderCell>Acciones</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCamaras.map((camara) => (
                <TableRow key={camara.id}>
                  <TableCell className="font-medium">{camara.id}</TableCell>
                  <TableCell>{camara.ubicacion}</TableCell>
                  <TableCell>
                    <Badge variant={getEstadoColor(camara.estado) as unknown } size="sm">
                      {camara.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>{camara.resolucion}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditCamara(camara)}
                        className="text-orange-600"
                      >
                        ✏️
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteCamara(camara.id)}
                        className="text-red-600"
                      >
                        🗑️
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Puntos de Acceso */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Puntos de Acceso</h3>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="🔍 Filtrar puntos de acceso..."
                value={filterPunto}
                onChange={(e) => setFilterPunto(e.target.value)}
                className="w-48"
              />
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => {
                  resetPuntoForm()
                  setShowPuntoModal(true)
                }}
              >
                🔐 Agregar Punto
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Ubicación</TableHeaderCell>
                <TableHeaderCell>Estado</TableHeaderCell>
                <TableHeaderCell>Tipo</TableHeaderCell>
                <TableHeaderCell>Acciones</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPuntosAcceso.map((punto) => (
                <TableRow key={punto.id}>
                  <TableCell className="font-medium">{punto.nombre}</TableCell>
                  <TableCell>{punto.ubicacion}</TableCell>
                  <TableCell>
                    <Badge variant={getEstadoColor(punto.estado) as unknown } size="sm">
                      {punto.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>{punto.tipoAcceso}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditPunto(punto)}
                        className="text-orange-600"
                      >
                        ✏️
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeletePunto(punto.id)}
                        className="text-red-600"
                      >
                        🗑️
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Incidentes de Seguridad */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Incidentes de Seguridad</h3>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="🔍 Filtrar incidentes..."
                value={filterIncidente}
                onChange={(e) => setFilterIncidente(e.target.value)}
                className="w-48"
              />
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => {
                  resetIncidenteForm()
                  setShowIncidenteModal(true)
                }}
              >
                🚨 Reportar Incidente
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Tipo</TableHeaderCell>
                <TableHeaderCell>Descripción</TableHeaderCell>
                <TableHeaderCell>Ubicación</TableHeaderCell>
                <TableHeaderCell>Prioridad</TableHeaderCell>
                <TableHeaderCell>Estado</TableHeaderCell>
                <TableHeaderCell>Acciones</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncidentes.map((incidente) => (
                <TableRow key={incidente.id}>
                  <TableCell className="font-medium">{incidente.tipo}</TableCell>
                  <TableCell className="max-w-xs truncate">{incidente.descripcion}</TableCell>
                  <TableCell>{incidente.ubicacion}</TableCell>
                  <TableCell>
                    <Badge variant={getPrioridadColor(incidente.prioridad) as unknown } size="sm">
                      {incidente.prioridad}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getEstadoColor(incidente.estado) as unknown } size="sm">
                      {incidente.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditIncidente(incidente)}
                        className="text-orange-600"
                      >
                        ✏️
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteIncidente(incidente.id)}
                        className="text-red-600"
                      >
                        🗑️
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal para Cámaras */}
      <Modal
        isOpen={showCamaraModal}
        onClose={() => {
          setShowCamaraModal(false)
          resetCamaraForm()
        }}
        title={editingCamara ? 'Editar Cámara' : 'Agregar Cámara'}
      >
        <Form onSubmit={handleSaveCamara}>
          <FormField label="Ubicación" required>
            <Input
              value={camaraForm.ubicacion}
              onChange={(e) => setCamaraForm({...camaraForm, ubicacion: e.target.value})}
              placeholder="Ej: Entrada Principal"
              required
            />
          </FormField>

          <FormField label="Estado">
            <Select
              value={camaraForm.estado}
              onChange={(value) => setCamaraForm({...camaraForm, estado: value})}
              options={[
                { value: 'Activa', label: 'Activa' },
                { value: 'Inactiva', label: 'Inactiva' },
                { value: 'Mantenimiento', label: 'Mantenimiento' }
              ]}
            />
          </FormField>

          <FormField label="Resolución">
            <Select
              value={camaraForm.resolucion}
              onChange={(value) => setCamaraForm({...camaraForm, resolucion: value})}
              options={[
                { value: 'HD', label: 'HD (720p)' },
                { value: 'FullHD', label: 'Full HD (1080p)' },
                { value: '4K', label: '4K (2160p)' }
              ]}
            />
          </FormField>

          <FormActions>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => {
                setShowCamaraModal(false)
                resetCamaraForm()
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {editingCamara ? 'Actualizar' : 'Crear'}
            </Button>
          </FormActions>
        </Form>
      </Modal>

      {/* Modal para Puntos de Acceso */}
      <Modal
        isOpen={showPuntoModal}
        onClose={() => {
          setShowPuntoModal(false)
          resetPuntoForm()
        }}
        title={editingPunto ? 'Editar Punto de Acceso' : 'Agregar Punto de Acceso'}
      >
        <Form onSubmit={handleSavePunto}>
          <FormField label="Nombre" required>
            <Input
              value={puntoForm.nombre}
              onChange={(e) => setPuntoForm({...puntoForm, nombre: e.target.value})}
              placeholder="Ej: Puerta Principal"
              required
            />
          </FormField>

          <FormField label="Ubicación" required>
            <Input
              value={puntoForm.ubicacion}
              onChange={(e) => setPuntoForm({...puntoForm, ubicacion: e.target.value})}
              placeholder="Ej: Entrada Sur"
              required
            />
          </FormField>

          <FormField label="Estado">
            <Select
              value={puntoForm.estado}
              onChange={(value) => setPuntoForm({...puntoForm, estado: value})}
              options={[
                { value: 'Abierto', label: 'Abierto' },
                { value: 'Cerrado', label: 'Cerrado' },
                { value: 'Bloqueado', label: 'Bloqueado' }
              ]}
            />
          </FormField>

          <FormField label="Tipo de Acceso">
            <Select
              value={puntoForm.tipoAcceso}
              onChange={(value) => setPuntoForm({...puntoForm, tipoAcceso: value})}
              options={[
                { value: 'Tarjeta', label: 'Tarjeta' },
                { value: 'Codigo', label: 'Código' },
                { value: 'Biometrico', label: 'Biométrico' },
                { value: 'Manual', label: 'Manual' }
              ]}
            />
          </FormField>

          <FormActions>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => {
                setShowPuntoModal(false)
                resetPuntoForm()
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {editingPunto ? 'Actualizar' : 'Crear'}
            </Button>
          </FormActions>
        </Form>
      </Modal>

      {/* Modal para Incidentes */}
      <Modal
        isOpen={showIncidenteModal}
        onClose={() => {
          setShowIncidenteModal(false)
          resetIncidenteForm()
        }}
        title={editingIncidente ? 'Editar Incidente' : 'Reportar Incidente'}
      >
        <Form onSubmit={handleSaveIncidente}>
          <FormField label="Tipo de Incidente" required>
            <Select
              value={incidenteForm.tipo}
              onChange={(value) => setIncidenteForm({...incidenteForm, tipo: value})}
              options={[
                { value: 'AccesoNoAutorizado', label: 'Acceso No Autorizado' },
                { value: 'CamaraDesconectada', label: 'Cámara Desconectada' },
                { value: 'SensorMovimiento', label: 'Sensor de Movimiento' },
                { value: 'AlarmaIncendio', label: 'Alarma de Incendio' },
                { value: 'FalloElectrico', label: 'Fallo Eléctrico' },
                { value: 'Otro', label: 'Otro' }
              ]}
              placeholder="Seleccionar tipo..."
            />
          </FormField>

          <FormField label="Descripción" required>
            <textarea
              value={incidenteForm.descripcion}
              onChange={(e) => setIncidenteForm({...incidenteForm, descripcion: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={3}
              placeholder="Descripción detallada del incidente..."
              required
            />
          </FormField>

          <FormField label="Ubicación" required>
            <Input
              value={incidenteForm.ubicacion}
              onChange={(e) => setIncidenteForm({...incidenteForm, ubicacion: e.target.value})}
              placeholder="Ej: Andén 3, Túnel Norte"
              required
            />
          </FormField>

          <FormField label="Prioridad">
            <Select
              value={incidenteForm.prioridad}
              onChange={(value) => setIncidenteForm({...incidenteForm, prioridad: value})}
              options={[
                { value: 'Baja', label: 'Baja' },
                { value: 'Media', label: 'Media' },
                { value: 'Alta', label: 'Alta' },
                { value: 'Critica', label: 'Crítica' }
              ]}
            />
          </FormField>

          <FormField label="Estado">
            <Select
              value={incidenteForm.estado}
              onChange={(value) => setIncidenteForm({...incidenteForm, estado: value})}
              options={[
                { value: 'Pendiente', label: 'Pendiente' },
                { value: 'EnProceso', label: 'En Proceso' },
                { value: 'Resuelto', label: 'Resuelto' }
              ]}
            />
          </FormField>

          <FormActions>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => {
                setShowIncidenteModal(false)
                resetIncidenteForm()
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {editingIncidente ? 'Actualizar' : 'Reportar'}
            </Button>
          </FormActions>
        </Form>
      </Modal>
    </div>
  )
}