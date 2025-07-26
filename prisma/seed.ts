import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seeding de la base de datos...')

  // ========== USUARIOS ==========
  console.log('👤 Creando usuarios...')
  
  const adminUser = await prisma.usuario.create({
    data: {
      username: 'admin',
      password: 'admin', // Sin cifrado como solicitaste
      nombre: 'Administrador del Sistema',
      email: 'admin@metro.com',
      rol: 'Administrador',
      activo: true,
    },
  })

  const operadorUser = await prisma.usuario.create({
    data: {
      username: 'operador',
      password: 'operador',
      nombre: 'Operador de Control',
      email: 'operador@metro.com',
      rol: 'Operador',
      activo: true,
    },
  })

  const seguridadUser = await prisma.usuario.create({
    data: {
      username: 'seguridad',
      password: 'seguridad',
      nombre: 'Jefe de Seguridad',
      email: 'seguridad@metro.com',
      rol: 'Seguridad',
      activo: true,
    },
  })

  // ========== LÍNEAS Y ESTACIONES ==========
  console.log('📍 Creando líneas de metro...')
  
  const linea1 = await prisma.linea.create({
    data: {
      nombre: 'Línea 1 - Central',
      longitud: 24.5,
      estaciones: 18,
      estado: 'Operativa',
      inauguracion: '2015',
      pasajerosPorDia: 125000,
    },
  })

  const linea2 = await prisma.linea.create({
    data: {
      nombre: 'Línea 2 - Norte',
      longitud: 18.2,
      estaciones: 14,
      estado: 'Operativa',
      inauguracion: '2018',
      pasajerosPorDia: 98500,
    },
  })

  const linea3 = await prisma.linea.create({
    data: {
      nombre: 'Línea 3 - Sur',
      longitud: 22.8,
      estaciones: 16,
      estado: 'Mantenimiento',
      inauguracion: '2020',
      pasajerosPorDia: 110200,
    },
  })

  console.log('🚉 Creando estaciones...')
  
  // Estaciones Línea 1
  const estacionCentral = await prisma.estacion.create({
    data: {
      nombre: 'Terminal Central',
      ubicacion: 'Centro de la ciudad',
      lineaId: linea1.id,
      orden: 1,
      tipo: 'Terminal',
      estado: 'Normal',
      pasajeros: 145,
      proximoTren: '2 min',
    },
  })

  const estacionNorte = await prisma.estacion.create({
    data: {
      nombre: 'Terminal Norte',
      ubicacion: 'Zona Norte',
      lineaId: linea2.id,
      orden: 1,
      tipo: 'Terminal',
      estado: 'Normal',
      pasajeros: 89,
      proximoTren: '4 min',
    },
  })

  const estacionUniversidad = await prisma.estacion.create({
    data: {
      nombre: 'Universidad',
      ubicacion: 'Zona Universitaria',
      lineaId: linea1.id,
      orden: 5,
      tipo: 'Intermedia',
      estado: 'Saturada',
      pasajeros: 201,
      proximoTren: '1 min',
    },
  })

  // ========== TRENES ==========
  console.log('🚊 Creando trenes...')
  
  const tren1 = await prisma.tren.create({
    data: {
      modelo: 'Metro 2024 Plus',
      lineaId: linea1.id,
      estado: 'EnServicio',
      ubicacion: 'Estación Central → Norte',
      capacidad: 300,
      velocidadMaxima: 75,
      ultimoMantenimiento: new Date('2024-01-15'),
      proximoMantenimiento: new Date('2024-04-15'),
    },
  })

  const tren2 = await prisma.tren.create({
    data: {
      modelo: 'Metro Express 2023',
      lineaId: linea2.id,
      estado: 'EnServicio',
      ubicacion: 'Terminal Norte',
      capacidad: 280,
      velocidadMaxima: 80,
      ultimoMantenimiento: new Date('2024-01-20'),
      proximoMantenimiento: new Date('2024-04-20'),
    },
  })

  const tren3 = await prisma.tren.create({
    data: {
      modelo: 'Metro Classic',
      lineaId: linea1.id,
      estado: 'Mantenimiento',
      ubicacion: 'Taller Central',
      capacidad: 250,
      velocidadMaxima: 70,
      ultimoMantenimiento: new Date('2024-02-01'),
      proximoMantenimiento: new Date('2024-05-01'),
    },
  })

  // ========== MANTENIMIENTOS DE TRENES ==========
  console.log('🔧 Creando registros de mantenimiento...')
  
  await prisma.mantenimientoTren.createMany({
    data: [
      {
        trenId: tren1.id,
        tipo: 'Preventivo',
        fecha: new Date('2024-04-15'),
        descripcion: 'Revisión general sistemas',
        tecnico: 'Juan Pérez',
        completado: false,
      },
      {
        trenId: tren2.id,
        tipo: 'Correctivo',
        fecha: new Date('2024-03-25'),
        descripcion: 'Reparación frenos',
        tecnico: 'Ana García',
        completado: false,
      },
      {
        trenId: tren3.id,
        tipo: 'Preventivo',
        fecha: new Date(),
        descripcion: 'Mantenimiento motor',
        tecnico: 'Carlos López',
        completado: false,
      },
    ],
  })

  // ========== RENDIMIENTO DE TRENES ==========
  await prisma.rendimientoTren.createMany({
    data: [
      {
        trenId: tren1.id,
        distancia: 2450,
        horas: 180,
        eficiencia: 0.98,
      },
      {
        trenId: tren2.id,
        distancia: 2200,
        horas: 165,
        eficiencia: 0.96,
      },
      {
        trenId: tren3.id,
        distancia: 1800,
        horas: 140,
        eficiencia: 0.92,
      },
    ],
  })

  // ========== RUTAS ==========
  console.log('🗺️  Creando rutas...')
  
  await prisma.ruta.createMany({
    data: [
      {
        nombre: 'Ruta Norte-Sur',
        lineaId: linea1.id,
        origen: 'Terminal Norte',
        destino: 'Terminal Sur',
        distancia: 24.5,
        duracion: 32,
        estado: 'Activa',
        frecuencia: 3,
      },
      {
        nombre: 'Ruta Este-Oeste',
        lineaId: linea2.id,
        origen: 'Plaza Central',
        destino: 'Centro Comercial',
        distancia: 18.2,
        duracion: 25,
        estado: 'Activa',
        frecuencia: 5,
      },
      {
        nombre: 'Ruta Circular',
        lineaId: linea3.id,
        origen: 'Terminal Central',
        destino: 'Terminal Central',
        distancia: 32.1,
        duracion: 45,
        estado: 'Mantenimiento',
        frecuencia: 8,
      },
    ],
  })

  // ========== VÍAS ==========
  console.log('🛤️  Creando vías...')
  
  const via1 = await prisma.via.create({
    data: {
      nombre: 'Vía Principal Norte',
      lineaId: linea1.id,
      tipo: 'Principal',
      longitud: 12.5,
      estado: 'Operativa',
      material: 'Acero Inoxidable',
      ultimaInspeccion: new Date('2024-02-10'),
      proximaInspeccion: new Date('2024-05-10'),
      velocidadMaxima: 80,
    },
  })

  const via2 = await prisma.via.create({
    data: {
      nombre: 'Vía Secundaria Norte',
      lineaId: linea1.id,
      tipo: 'Secundaria',
      longitud: 12.5,
      estado: 'Operativa',
      material: 'Acero Inoxidable',
      ultimaInspeccion: new Date('2024-02-08'),
      proximaInspeccion: new Date('2024-05-08'),
      velocidadMaxima: 80,
    },
  })

  const via3 = await prisma.via.create({
    data: {
      nombre: 'Vía Principal Sur',
      lineaId: linea2.id,
      tipo: 'Principal',
      longitud: 9.2,
      estado: 'Mantenimiento',
      material: 'Acero Carbono',
      ultimaInspeccion: new Date('2024-01-15'),
      proximaInspeccion: new Date('2024-04-15'),
      velocidadMaxima: 75,
    },
  })

  // ========== SECCIONES DE VÍAS ==========
  await prisma.seccionVia.createMany({
    data: [
      {
        viaId: via1.id,
        nombre: 'S1-Norte',
        kmInicio: 0.0,
        kmFin: 2.5,
        estado: 'Bueno',
        desgaste: 15,
      },
      {
        viaId: via1.id,
        nombre: 'S2-Centro',
        kmInicio: 2.5,
        kmFin: 5.0,
        estado: 'Excelente',
        desgaste: 8,
      },
      {
        viaId: via1.id,
        nombre: 'S3-Sur',
        kmInicio: 5.0,
        kmFin: 7.5,
        estado: 'Regular',
        desgaste: 35,
      },
    ],
  })

  // ========== SENSORES DE VÍAS ==========
  await prisma.sensorVia.createMany({
    data: [
      {
        viaId: via1.id,
        nombre: 'SENS-001',
        ubicacion: 'Km 2.5 - Vía V-001',
        tipo: 'Temperatura',
        valor: '23°C',
        estado: 'Normal',
      },
      {
        viaId: via1.id,
        nombre: 'SENS-002',
        ubicacion: 'Km 5.0 - Vía V-001',
        tipo: 'Vibracion',
        valor: '0.8 mm/s',
        estado: 'Normal',
      },
      {
        viaId: via1.id,
        nombre: 'SENS-003',
        ubicacion: 'Km 7.5 - Vía V-001',
        tipo: 'Desgaste',
        valor: '15%',
        estado: 'Atencion',
      },
    ],
  })

  // ========== SUBESTACIONES ELÉCTRICAS ==========
  console.log('⚡ Creando subestaciones eléctricas...')
  
  const sub1 = await prisma.subestacion.create({
    data: {
      nombre: 'Subestación Central',
      ubicacion: 'Km 0.0',
      voltaje: '25 kV',
      potencia: '5 MW',
      estado: 'Operativa',
      carga: 78,
      temperatura: 45,
    },
  })

  const sub2 = await prisma.subestacion.create({
    data: {
      nombre: 'Subestación Norte',
      ubicacion: 'Km 12.5',
      voltaje: '25 kV',
      potencia: '3.5 MW',
      estado: 'Operativa',
      carga: 65,
      temperatura: 42,
    },
  })

  const sub3 = await prisma.subestacion.create({
    data: {
      nombre: 'Subestación Sur',
      ubicacion: 'Km 24.5',
      voltaje: '25 kV',
      potencia: '4 MW',
      estado: 'Mantenimiento',
      carga: 0,
      temperatura: 25,
    },
  })

  // ========== EQUIPOS ELÉCTRICOS ==========
  await prisma.equipoElectrico.createMany({
    data: [
      {
        subestacionId: sub1.id,
        nombre: 'Transformador T1',
        tipo: 'Transformador',
        estado: 'Operativo',
        temperatura: 65,
      },
      {
        subestacionId: sub1.id,
        nombre: 'Rectificador R1',
        tipo: 'Rectificador',
        estado: 'Operativo',
        temperatura: 58,
      },
      {
        subestacionId: sub2.id,
        nombre: 'Interruptor I1',
        tipo: 'Interruptor',
        estado: 'Operativo',
        temperatura: 35,
      },
      {
        subestacionId: sub3.id,
        nombre: 'Transformador T2',
        tipo: 'Transformador',
        estado: 'Mantenimiento',
        temperatura: 25,
      },
    ],
  })

  // ========== CONSUMO ELÉCTRICO ==========
  await prisma.consumoElectrico.createMany({
    data: [
      {
        subestacionId: sub1.id,
        linea: 'Línea 1',
        potencia: '2.5 MW',
        voltaje: '25 kV',
        corriente: '100 A',
        factorPotencia: 0.95,
      },
      {
        subestacionId: sub2.id,
        linea: 'Línea 2',
        potencia: '1.8 MW',
        voltaje: '25 kV',
        corriente: '72 A',
        factorPotencia: 0.93,
      },
      {
        subestacionId: sub3.id,
        linea: 'Línea 3',
        potencia: '2.1 MW',
        voltaje: '25 kV',
        corriente: '84 A',
        factorPotencia: 0.94,
      },
    ],
  })

  // ========== ALERTAS ELÉCTRICAS ==========
  await prisma.alertaElectrica.createMany({
    data: [
      {
        subestacionId: sub2.id,
        tipo: 'Sobrecarga',
        nivel: 'Alto',
        valor: '89%',
        descripcion: 'Carga elevada en subestación',
        resuelto: false,
      },
      {
        subestacionId: sub2.id,
        tipo: 'Temperatura Alta',
        nivel: 'Medio',
        valor: '48°C',
        descripcion: 'Temperatura por encima del límite',
        resuelto: false,
      },
    ],
  })

  // ========== SEGURIDAD ==========
  console.log('🔒 Creando elementos de seguridad...')
  
  // Alertas de seguridad
  await prisma.alertaSeguridad.createMany({
    data: [
      {
        estacionId: estacionCentral.id,
        tipo: 'Acceso No Autorizado',
        ubicacion: 'Estación Central',
        nivel: 'Alto',
        descripcion: 'Intento de acceso sin autorización',
        estado: 'Activa',
      },
      {
        tipo: 'Cámara Desconectada',
        ubicacion: 'Túnel L2-E3',
        nivel: 'Medio',
        descripcion: 'Pérdida de conexión con cámara',
        estado: 'EnProceso',
      },
      {
        estacionId: estacionUniversidad.id,
        tipo: 'Sensor de Movimiento',
        ubicacion: 'Andén 5',
        nivel: 'Bajo',
        descripcion: 'Activación de sensor',
        estado: 'Resuelta',
      },
    ],
  })

  // Cámaras de seguridad
  await prisma.camaraSeguridad.createMany({
    data: [
      {
        estacionId: estacionCentral.id,
        nombre: 'CAM001',
        ubicacion: 'Entrada Principal',
        estado: 'Activa',
        calidad: 'HD',
      },
      {
        estacionId: estacionNorte.id,
        nombre: 'CAM002',
        ubicacion: 'Andén Norte',
        estado: 'Activa',
        calidad: '4K',
      },
      {
        nombre: 'CAM003',
        ubicacion: 'Túnel Central',
        estado: 'Mantenimiento',
        calidad: 'HD',
      },
    ],
  })

  // Accesos de seguridad
  await prisma.accesoSeguridad.createMany({
    data: [
      {
        puerta: 'P-001',
        ubicacion: 'Control Central',
        estado: 'Cerrada',
        ultimoAcceso: new Date('2024-03-25T08:30:00'),
      },
      {
        puerta: 'P-002',
        ubicacion: 'Subestación',
        estado: 'Abierta',
        ultimoAcceso: new Date('2024-03-25T09:15:00'),
      },
      {
        puerta: 'P-003',
        ubicacion: 'Taller',
        estado: 'Cerrada',
        ultimoAcceso: new Date('2024-03-25T07:45:00'),
      },
    ],
  })

  // ========== SISTEMA DE COBRO ==========
  console.log('💳 Creando sistema de cobro...')
  
  // Tarifas
  const tarifaBasica = await prisma.tarifa.create({
    data: {
      tipo: 'Tarifa Básica',
      precio: 2.50,
      descripcion: 'Viaje sencillo adulto',
      estado: 'Activa',
    },
  })

  const tarifaEstudiante = await prisma.tarifa.create({
    data: {
      tipo: 'Tarifa Estudiante',
      precio: 1.25,
      descripcion: 'Viaje con descuento estudiantil',
      estado: 'Activa',
    },
  })

  const tarifaAdultoMayor = await prisma.tarifa.create({
    data: {
      tipo: 'Tarifa Adulto Mayor',
      precio: 1.00,
      descripcion: 'Descuento tercera edad',
      estado: 'Activa',
    },
  })

  const paseMensual = await prisma.tarifa.create({
    data: {
      tipo: 'Pase Mensual',
      precio: 45.00,
      descripcion: 'Viajes ilimitados 30 días',
      estado: 'Activa',
    },
  })

  // Transacciones
  await prisma.transaccionCobro.createMany({
    data: [
      {
        tarifaId: tarifaBasica.id,
        estacionId: estacionCentral.id,
        tarjeta: '****4567',
        monto: 2.50,
        metodoPago: 'TarjetaMetro',
        estado: 'Exitosa',
        fecha: new Date('2024-03-25T14:30:00'),
      },
      {
        tarifaId: tarifaEstudiante.id,
        estacionId: estacionNorte.id,
        tarjeta: '****1234',
        monto: 1.25,
        metodoPago: 'Contactless',
        estado: 'Exitosa',
        fecha: new Date('2024-03-25T14:28:00'),
      },
      {
        tarifaId: tarifaBasica.id,
        tarjeta: '****8901',
        monto: 2.50,
        metodoPago: 'CodigoQR',
        estado: 'Fallida',
        fecha: new Date('2024-03-25T14:25:00'),
      },
      {
        tarifaId: paseMensual.id,
        estacionId: estacionCentral.id,
        tarjeta: '****2345',
        monto: 45.00,
        metodoPago: 'TarjetaMetro',
        estado: 'Exitosa',
        fecha: new Date('2024-03-25T14:22:00'),
      },
    ],
  })

  // ========== SISTEMA DE COMUNICACIÓN ==========
  console.log('📞 Creando sistema de comunicación...')
  
  // Canales de comunicación
  const canalControl = await prisma.canalComunicacion.create({
    data: {
      nombre: 'Control Central',
      tipo: 'Radio',
      frecuencia: '450.125 MHz',
      estado: 'Activo',
      usuarios: 12,
    },
  })

  const canalMantenimiento = await prisma.canalComunicacion.create({
    data: {
      nombre: 'Mantenimiento',
      tipo: 'Radio',
      frecuencia: '450.250 MHz',
      estado: 'Activo',
      usuarios: 8,
    },
  })

  const canalSeguridad = await prisma.canalComunicacion.create({
    data: {
      nombre: 'Seguridad',
      tipo: 'Radio',
      frecuencia: '450.375 MHz',
      estado: 'Activo',
      usuarios: 15,
    },
  })

  // Comunicaciones
  await prisma.comunicacion.createMany({
    data: [
      {
        canalId: canalControl.id,
        trenId: tren1.id,
        origen: 'Control Central',
        destino: 'Tren TR-001',
        tipo: 'Voz',
        estado: 'Activa',
        duracion: '2:35',
        prioridad: 'Normal',
        mensaje: 'Confirmación de ruta',
      },
      {
        canalId: canalSeguridad.id,
        origen: 'Estación Norte',
        destino: 'Control Central',
        tipo: 'Datos',
        estado: 'Completada',
        duracion: '0:45',
        prioridad: 'Alta',
        mensaje: 'Reporte de incidente',
      },
      {
        canalId: canalSeguridad.id,
        origen: 'Seguridad',
        destino: 'Todas las Estaciones',
        tipo: 'Difusion',
        estado: 'Activa',
        duracion: '1:20',
        prioridad: 'Critica',
        mensaje: 'Alerta de seguridad',
      },
    ],
  })

  // Mensajes del sistema
  await prisma.mensajeSistema.createMany({
    data: [
      {
        destinatario: 'Todos los Conductores',
        asunto: 'Cambio de horarios',
        mensaje: 'Se informa el cambio de horarios para la próxima semana',
        prioridad: 'Normal',
        estado: 'Enviado',
        fechaEnvio: new Date('2024-03-25T14:30:00'),
      },
      {
        destinatario: 'Personal Mantenimiento',
        asunto: 'Inspección vías L3',
        mensaje: 'Programar inspección de vías línea 3 para mañana',
        prioridad: 'Alta',
        estado: 'Leido',
        fechaEnvio: new Date('2024-03-25T13:15:00'),
        fechaLeido: new Date('2024-03-25T13:20:00'),
      },
      {
        destinatario: 'Estaciones Centro',
        asunto: 'Protocolo evacuación',
        mensaje: 'Revisar protocolo de evacuación actualizado',
        prioridad: 'Alta',
        estado: 'Pendiente',
        fechaEnvio: new Date('2024-03-25T12:45:00'),
      },
    ],
  })

  // Equipos de comunicación
  await prisma.equipoComunicacion.createMany({
    data: [
      {
        nombre: 'Radio Base RB-001',
        ubicacion: 'Torre Central',
        tipo: 'RadioBase',
        estado: 'Operativo',
        señal: 95,
      },
      {
        nombre: 'Repetidor RP-002',
        ubicacion: 'Cerro Norte',
        tipo: 'Repetidor',
        estado: 'Operativo',
        señal: 88,
      },
      {
        nombre: 'Antena ANT-003',
        ubicacion: 'Estación Sur',
        tipo: 'Antena',
        estado: 'Mantenimiento',
        señal: 0,
      },
      {
        nombre: 'Radio Móvil RM-004',
        ubicacion: 'Tren TR-001',
        tipo: 'RadioMovil',
        estado: 'Operativo',
        señal: 92,
      },
    ],
  })

  // ========== CONTROL Y MONITOREO ==========
  console.log('📡 Creando datos de control y monitoreo...')
  
  // Incidentes
  await prisma.incidente.createMany({
    data: [
      {
        tipo: 'Retraso',
        ubicacion: 'L1 - Km 15',
        descripcion: 'Tren TR-001 con retraso de 3 min',
        prioridad: 'Media',
        estado: 'Activo',
        resuelto: false,
      },
      {
        tipo: 'Saturación',
        ubicacion: 'Universidad',
        descripcion: 'Estación con alta concentración',
        prioridad: 'Alta',
        estado: 'EnProceso',
        resuelto: false,
      },
      {
        tipo: 'Mantenimiento',
        ubicacion: 'L3 - Vía Sur',
        descripcion: 'Trabajo programado en vías',
        prioridad: 'Baja',
        estado: 'Resuelto',
        resuelto: true,
      },
    ],
  })

  // Métricas operacionales
  await prisma.metricaOperacional.createMany({
    data: [
      {
        nombre: 'Puntualidad',
        valor: '94.2',
        unidad: '%',
        estado: 'Bueno',
      },
      {
        nombre: 'Ocupación Promedio',
        valor: '68',
        unidad: '%',
        estado: 'Normal',
      },
      {
        nombre: 'Velocidad Promedio',
        valor: '52',
        unidad: 'km/h',
        estado: 'Óptimo',
      },
      {
        nombre: 'Tiempo Entre Trenes',
        valor: '3.2',
        unidad: 'min',
        estado: 'Bueno',
      },
    ],
  })

  console.log('✅ Seeding completado exitosamente!')
  console.log(`
📊 Datos creados:
- ${await prisma.usuario.count()} usuarios
- ${await prisma.linea.count()} líneas de metro
- ${await prisma.estacion.count()} estaciones
- ${await prisma.tren.count()} trenes
- ${await prisma.ruta.count()} rutas
- ${await prisma.via.count()} vías
- ${await prisma.subestacion.count()} subestaciones
- ${await prisma.tarifa.count()} tarifas
- ${await prisma.transaccionCobro.count()} transacciones
- ${await prisma.canalComunicacion.count()} canales de comunicación
- ${await prisma.incidente.count()} incidentes
- ${await prisma.alertaSeguridad.count()} alertas de seguridad
  `)
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })