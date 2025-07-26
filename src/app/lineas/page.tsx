'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { MdSearch, MdFilterList, MdVisibility, MdEdit } from 'react-icons/md'

interface Linea {
  id: string
  nombre: string
  longitud: number
  estado: string
  inauguracion: string
  pasajerosPorDia: number
  estaciones: Array<{ nombre: string }>
}

export default function LineasPage() {
  const [lineas, setLineas] = useState<Linea[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    fetchLineas()
  }, [])

  const fetchLineas = async () => {
    try {
      const response = await fetch('/api/lineas')
      if (response.ok) {
        const data = await response.json()
        setLineas(data)
      }
    } catch (error) {
      console.error('Error fetching lineas:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredLineas = lineas.filter(linea => 
    !filter || 
    linea.nombre.toLowerCase().includes(filter.toLowerCase()) ||
    linea.estado.toLowerCase().includes(filter.toLowerCase())
  )

  const projects = [
    { nombre: 'Extensión Línea 12', progreso: 75, presupuesto: '$8,500M MXN', fechaFin: 'Dic 2024' },
    { nombre: 'Nueva Línea Dorada', progreso: 45, presupuesto: '$12,800M MXN', fechaFin: 'Jun 2025' },
    { nombre: 'Modernización L1 Rosa', progreso: 90, presupuesto: '$2,300M MXN', fechaFin: 'Mar 2024' },
    { nombre: 'Ampliación L6 Ferrería', progreso: 15, presupuesto: '$16,700M MXN', fechaFin: 'Dic 2030' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operativa': return 'success'
      case 'Mantenimiento': return 'warning'
      case 'En Construcción':
      case 'EnConstruccion': return 'info'
      case 'Planificación':
      case 'Planificacion': return 'default'
      default: return 'default'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-yellow-500'
    return 'bg-blue-500'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Metro Ciudad de México - Líneas</h1>
          <p className="text-gray-600 mt-2">
            Sistema de Transporte Colectivo - Gestión de líneas y proyectos
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{lineas.length}</p>
              <p className="text-sm text-gray-600">Líneas Totales</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{lineas.filter(l => l.estado === 'Operativa').length}</p>
              <p className="text-sm text-gray-600">Operativas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{lineas.filter(l => l.estado === 'En Construcción' || l.estado === 'EnConstruccion').length}</p>
              <p className="text-sm text-gray-600">En Construcción</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {lineas.reduce((total, linea) => total + (linea.estaciones?.length || 0), 0)}
              </p>
              <p className="text-sm text-gray-600">Estaciones</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Líneas de Metro</h3>
                <div className="flex space-x-2">
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="Buscar líneas..." 
                      className="w-64 pl-10"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    />
                  </div>
                  <Button variant="secondary" size="sm" className="flex items-center space-x-1">
                    <MdFilterList className="w-4 h-4" />
                    <span>Filtrar</span>
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
                    <TableHeaderCell>Longitud</TableHeaderCell>
                    <TableHeaderCell>Estaciones</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Pasajeros/día</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
                      </TableCell>
                    </TableRow>
                  ) : filteredLineas.map((linea) => (
                    <TableRow key={linea.id}>
                      <TableCell className="font-medium">{linea.id}</TableCell>
                      <TableCell>{linea.nombre}</TableCell>
                      <TableCell>{linea.longitud} km</TableCell>
                      <TableCell>{linea.estaciones?.length || 0}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(linea.estado) as any} size="sm">
                          {linea.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>{linea.pasajerosPorDia.toLocaleString()}/día</TableCell>
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
              <h3 className="text-lg font-semibold">Proyectos Activos</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">{project.nombre}</h4>
                      <span className="text-xs text-gray-500">{project.progreso}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(project.progreso)}`}
                        style={{ width: `${project.progreso}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{project.presupuesto}</span>
                      <span>{project.fechaFin}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}