"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { Form, FormField, FormActions } from "@/components/ui/Form";

interface Tren {
  id: string;
  modelo: string;
  estado: string;
  ubicacion: string;
  capacidad: number;
  velocidadMaxima: number;
  ultimoMantenimiento?: string;
  proximoMantenimiento?: string;
  linea?: { nombre: string };
}

export default function TrenesPage() {
  const [trenes, setTrenes] = useState<Tren[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTren, setEditingTren] = useState<Tren | null>(null);

  const [trenForm, setTrenForm] = useState({
    modelo: "",
    estado: "EnServicio",
    ubicacion: "",
    capacidad: "",
    velocidadMaxima: "",
    ultimoMantenimiento: "",
    proximoMantenimiento: "",
  });

  useEffect(() => {
    fetchTrenes();
  }, []);

  const fetchTrenes = async () => {
    try {
      const response = await fetch("/api/trenes");
      if (response.ok) {
        const data = await response.json();
        setTrenes(data);
      }
    } catch (error) {
      console.error("Error fetching trenes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingTren ? `/api/trenes/${editingTren.id}` : "/api/trenes";
      const method = editingTren ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...trenForm,
          capacidad: parseInt(trenForm.capacidad),
          velocidadMaxima: parseInt(trenForm.velocidadMaxima),
        }),
      });

      if (response.ok) {
        fetchTrenes();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error saving tren:", error);
    }
  };

  const handleEdit = (tren: Tren) => {
    setEditingTren(tren);
    setTrenForm({
      modelo: tren.modelo,
      estado: tren.estado,
      ubicacion: tren.ubicacion,
      capacidad: tren.capacidad.toString(),
      velocidadMaxima: tren.velocidadMaxima.toString(),
      ultimoMantenimiento: tren.ultimoMantenimiento || "",
      proximoMantenimiento: tren.proximoMantenimiento || "",
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setTrenForm({
      modelo: "",
      estado: "EnServicio",
      ubicacion: "",
      capacidad: "",
      velocidadMaxima: "",
      ultimoMantenimiento: "",
      proximoMantenimiento: "",
    });
    setEditingTren(null);
  };

  const mantenimientos = [
    {
      tren: "TR-001",
      tipo: "Preventivo",
      fecha: "15/04/2024",
      descripcion: "Revisión general sistemas",
    },
    {
      tren: "TR-002",
      tipo: "Correctivo",
      fecha: "25/03/2024",
      descripcion: "Reparación frenos",
    },
    {
      tren: "TR-003",
      tipo: "Preventivo",
      fecha: "En proceso",
      descripcion: "Mantenimiento motor",
    },
    {
      tren: "TR-005",
      tipo: "Inspección",
      fecha: "30/03/2024",
      descripcion: "Revisión seguridad",
    },
  ];

  const rendimiento = [
    {
      tren: "TR-001",
      distancia: "2,450 km",
      horas: "180h",
      eficiencia: "98%",
      combustible: "N/A",
    },
    {
      tren: "TR-002",
      distancia: "2,200 km",
      horas: "165h",
      eficiencia: "96%",
      combustible: "N/A",
    },
    {
      tren: "TR-003",
      distancia: "1,800 km",
      horas: "140h",
      eficiencia: "92%",
      combustible: "N/A",
    },
    {
      tren: "TR-004",
      distancia: "0 km",
      horas: "0h",
      eficiencia: "0%",
      combustible: "N/A",
    },
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "En Servicio":
        return "success";
      case "Mantenimiento":
        return "warning";
      case "Fuera de Servicio":
        return "error";
      default:
        return "default";
    }
  };

  const getTipoMantenimientoColor = (tipo: string) => {
    switch (tipo) {
      case "Preventivo":
        return "info";
      case "Correctivo":
        return "warning";
      case "Inspección":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Trenes
          </h1>
          <p className="text-gray-600 mt-2">
            Control y administración de la flota de trenes del sistema
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">12</p>
              <p className="text-sm text-gray-600">Trenes Totales</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">8</p>
              <p className="text-sm text-gray-600">En Servicio</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">3</p>
              <p className="text-sm text-gray-600">En Mantenimiento</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">96%</p>
              <p className="text-sm text-gray-600">Disponibilidad</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Estado de Trenes</h3>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                >
                  ➕ Agregar Tren
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Modelo</TableHeaderCell>
                    <TableHeaderCell>Línea</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Ubicación</TableHeaderCell>
                    <TableHeaderCell>Capacidad</TableHeaderCell>
                    <TableHeaderCell>Acciones</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-8">
                        <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    trenes.map((tren) => (
                      <TableRow key={tren.id}>
                        <TableCell className="font-medium">{tren.id}</TableCell>
                        <TableCell>{tren.modelo}</TableCell>
                        <TableCell>
                          {tren.linea?.nombre || "Sin asignar"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getEstadoColor(tren.estado) as any}
                            size="sm"
                          >
                            {tren.estado}
                          </Badge>
                        </TableCell>
                        <TableCell>{tren.ubicacion}</TableCell>
                        <TableCell>{tren.capacidad} pax</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-orange-600"
                              onClick={() => handleEdit(tren)}
                            >
                              ✏️ Editar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Control de Tren</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Tren
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>TR-001 - Metro 2024 Plus</option>
                    <option>TR-002 - Metro Express 2023</option>
                    <option>TR-003 - Metro Classic</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Button variant="secondary" className="w-full justify-start">
                    🚦 Iniciar Servicio
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    ⏸️ Pausar Servicio
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    🔧 Enviar a Mantenimiento
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    📍 Localizar Tren
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Próximos Mantenimientos</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mantenimientos.slice(0, 3).map((mant, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{mant.tren}</p>
                        <p className="text-sm text-gray-600">
                          {mant.descripcion}
                        </p>
                      </div>
                      <Badge
                        variant={getTipoMantenimientoColor(mant.tipo) as any}
                        size="sm"
                      >
                        {mant.tipo}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{mant.fecha}</p>
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
            <h3 className="text-lg font-semibold">Rendimiento de Trenes</h3>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Tren</TableHeaderCell>
                  <TableHeaderCell>Distancia</TableHeaderCell>
                  <TableHeaderCell>Horas</TableHeaderCell>
                  <TableHeaderCell>Eficiencia</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rendimiento.map((perf) => (
                  <TableRow key={perf.tren}>
                    <TableCell className="font-medium">{perf.tren}</TableCell>
                    <TableCell>{perf.distancia}</TableCell>
                    <TableCell>{perf.horas}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: perf.eficiencia }}
                          ></div>
                        </div>
                        <span className="text-sm">{perf.eficiencia}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">
              Programación de Mantenimientos
            </h3>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Tren</TableHeaderCell>
                  <TableHeaderCell>Tipo</TableHeaderCell>
                  <TableHeaderCell>Fecha</TableHeaderCell>
                  <TableHeaderCell>Estado</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mantenimientos.map((mant, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{mant.tren}</TableCell>
                    <TableCell>
                      <Badge
                        variant={getTipoMantenimientoColor(mant.tipo) as any}
                        size="sm"
                      >
                        {mant.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>{mant.fecha}</TableCell>
                    <TableCell>
                      {mant.fecha === "En proceso" ? (
                        <Badge variant="warning" size="sm">
                          En Proceso
                        </Badge>
                      ) : (
                        <Badge variant="success" size="sm">
                          Programado
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Modal para Crear/Editar Tren */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingTren ? "Editar Tren" : "Agregar Nuevo Tren"}
      >
        <Form onSubmit={handleSave}>
          <FormField label="Modelo" required>
            <Input
              value={trenForm.modelo}
              onChange={(e) =>
                setTrenForm({ ...trenForm, modelo: e.target.value })
              }
              placeholder="Metro 2024 Plus"
              required
            />
          </FormField>

          <FormField label="Ubicación Actual" required>
            <Input
              value={trenForm.ubicacion}
              onChange={(e) =>
                setTrenForm({ ...trenForm, ubicacion: e.target.value })
              }
              placeholder="Estación Central"
              required
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Capacidad (pasajeros)" required>
              <Input
                type="number"
                value={trenForm.capacidad}
                onChange={(e) =>
                  setTrenForm({ ...trenForm, capacidad: e.target.value })
                }
                placeholder="300"
                required
              />
            </FormField>

            <FormField label="Velocidad Máxima (km/h)" required>
              <Input
                type="number"
                value={trenForm.velocidadMaxima}
                onChange={(e) =>
                  setTrenForm({ ...trenForm, velocidadMaxima: e.target.value })
                }
                placeholder="80"
                required
              />
            </FormField>
          </div>

          <FormField label="Estado" required>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={trenForm.estado}
              onChange={(e) =>
                setTrenForm({ ...trenForm, estado: e.target.value })
              }
            >
              <option value="EnServicio">En Servicio</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="FueraDeServicio">Fuera de Servicio</option>
              <option value="Disponible">Disponible</option>
            </select>
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Último Mantenimiento">
              <Input
                type="date"
                value={trenForm.ultimoMantenimiento}
                onChange={(e) =>
                  setTrenForm({
                    ...trenForm,
                    ultimoMantenimiento: e.target.value,
                  })
                }
              />
            </FormField>

            <FormField label="Próximo Mantenimiento">
              <Input
                type="date"
                value={trenForm.proximoMantenimiento}
                onChange={(e) =>
                  setTrenForm({
                    ...trenForm,
                    proximoMantenimiento: e.target.value,
                  })
                }
              />
            </FormField>
          </div>

          <FormActions>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {editingTren ? "💾 Actualizar" : "🚄 Agregar Tren"}
            </Button>
          </FormActions>
        </Form>
      </Modal>
    </div>
  );
}
