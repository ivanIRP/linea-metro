// Seed script para poblar la base de datos con datos de prueba
// Versión corregida para esquema actualizado

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seeding de la base de datos...')

  // Limpiar datos existentes
  console.log('🧹 Limpiando datos existentes...')
  await prisma.incidenteSeguridad.deleteMany()
  await prisma.puntoAcceso.deleteMany()
  await prisma.camaraSeguridadNew.deleteMany()
  await prisma.transaccion.deleteMany()
  await prisma.reporteFinanciero.deleteMany()
  await prisma.tarifa.deleteMany()
  await prisma.equipoComunicacion.deleteMany()
  await prisma.redComunicacion.deleteMany()
  await prisma.alertaSistema.deleteMany()
  await prisma.monitoreoTiempoReal.deleteMany()
  await prisma.centroCCC.deleteMany()
  await prisma.consumoEnergia.deleteMany()
  await prisma.equipoElectrico.deleteMany()
  await prisma.subestacionElectrica.deleteMany()
  await prisma.sensorVia.deleteMany()
  await prisma.via.deleteMany()
  await prisma.metricasRendimiento.deleteMany()
  await prisma.mantenimientoTren.deleteMany()
  await prisma.tren.deleteMany()
  await prisma.estacion.deleteMany()
  await prisma.linea.deleteMany()
  await prisma.usuario.deleteMany()

  // ========== USUARIOS ==========
  console.log('👤 Creando usuarios...')
  const usuarios = await prisma.usuario.createMany({
    data: [
      {
        username: 'admin',
        password: 'admin',
        nombre: 'Administrador Principal',
        email: 'admin@metro.com',
        rol: 'Administrador',
        activo: true
      },
      {
        username: 'operador',
        password: 'operador',
        nombre: 'Carlos Operador',
        email: 'operador@metro.com',
        rol: 'Operador',
        activo: true
      },
      {
        username: 'seguridad',
        password: 'seguridad',
        nombre: 'Ana Seguridad',
        email: 'seguridad@metro.com',
        rol: 'Seguridad',
        activo: true
      },
      {
        username: 'tecnico',
        password: 'tecnico',
        nombre: 'Luis Técnico',
        email: 'tecnico@metro.com',
        rol: 'Mantenimiento',
        activo: true
      },
      {
        username: 'supervisor',
        password: 'supervisor',
        nombre: 'María Supervisora',
        email: 'supervisor@metro.com',
        rol: 'Supervisor',
        activo: true
      },
      {
        username: 'analista',
        password: 'analista',
        nombre: 'Pedro Analista',
        email: 'analista@metro.com',
        rol: 'Operador',
        activo: true
      }
    ]
  })
  console.log(`✅ Creados ${usuarios.count} usuarios`)

  // ========== LÍNEAS DEL METRO CDMX ==========
  console.log('🚇 Creando líneas del Metro CDMX...')
  const lineas = await prisma.linea.createMany({
    data: [
      {
        nombre: 'Línea 1 - Rosa (Pantitlán - Observatorio)',
        longitud: 18.7,
        estado: 'Operativa',
        inauguracion: '1969',
        pasajerosPorDia: 580000
      },
      {
        nombre: 'Línea 2 - Azul (Cuatro Caminos - Tasqueña)',
        longitud: 23.4,
        estado: 'Operativa',
        inauguracion: '1970',
        pasajerosPorDia: 650000
      },
      {
        nombre: 'Línea 3 - Verde (Indios Verdes - Universidad)',
        longitud: 23.6,
        estado: 'Operativa',
        inauguracion: '1972',
        pasajerosPorDia: 720000
      },
      {
        nombre: 'Línea 4 - Cian (Martín Carrera - Santa Anita)',
        longitud: 10.7,
        estado: 'Operativa',
        inauguracion: '1982',
        pasajerosPorDia: 420000
      },
      {
        nombre: 'Línea 5 - Amarilla (Pantitlán - Politécnico)',
        longitud: 13.5,
        estado: 'Operativa',
        inauguracion: '1982',
        pasajerosPorDia: 380000
      },
      {
        nombre: 'Línea 6 - Roja (El Rosario - Martín Carrera)',
        longitud: 14.0,
        estado: 'Operativa',
        inauguracion: '1983',
        pasajerosPorDia: 450000
      },
      {
        nombre: 'Línea 7 - Naranja (El Rosario - Barranca del Muerto)',
        longitud: 18.8,
        estado: 'Operativa',
        inauguracion: '1984',
        pasajerosPorDia: 520000
      },
      {
        nombre: 'Línea 8 - Verde (Garibaldi - Constitución de 1917)',
        longitud: 20.7,
        estado: 'Operativa',
        inauguracion: '1994',
        pasajerosPorDia: 480000
      },
      {
        nombre: 'Línea 9 - Café (Tacubaya - Pantitlán)',
        longitud: 15.4,
        estado: 'Operativa',
        inauguracion: '1987',
        pasajerosPorDia: 410000
      },
      {
        nombre: 'Línea A - Morada (Pantitlán - La Paz)',
        longitud: 17.2,
        estado: 'Operativa',
        inauguracion: '1991',
        pasajerosPorDia: 350000
      },
      {
        nombre: 'Línea B - Verde/Gris (Buenavista - Ciudad Azteca)',
        longitud: 23.7,
        estado: 'Operativa',
        inauguracion: '1999',
        pasajerosPorDia: 280000
      },
      {
        nombre: 'Línea 12 - Dorada (Mixcoac - Tláhuac)',
        longitud: 24.5,
        estado: 'Mantenimiento',
        inauguracion: '2012',
        pasajerosPorDia: 200000
      }
    ]
  })
  console.log(`✅ Creadas ${lineas.count} líneas`)

  // Obtener IDs de líneas creadas
  const lineasCreadas = await prisma.linea.findMany({ select: { id: true, nombre: true } })

  // ========== ESTACIONES ==========
  console.log('🚉 Creando estaciones...')
  const estacionesData = []
  
  // Línea 1 Rosa - Estaciones principales
  const linea1 = lineasCreadas.find(l => l.nombre.includes('Línea 1'))
  estacionesData.push(
    { nombre: 'Pantitlán', ubicacion: 'Iztacalco', lineaId: linea1.id, orden: 1, tipo: 'Terminal', activa: true, pasajeros: 85000 },
    { nombre: 'Zócalo/Tenochtitlan', ubicacion: 'Centro Histórico', lineaId: linea1.id, orden: 2, tipo: 'Transferencia', activa: true, pasajeros: 125000 },
    { nombre: 'Pino Suárez', ubicacion: 'Centro', lineaId: linea1.id, orden: 3, tipo: 'Transferencia', activa: true, pasajeros: 98000 },
    { nombre: 'Insurgentes', ubicacion: 'Roma Norte', lineaId: linea1.id, orden: 4, tipo: 'Transferencia', activa: true, pasajeros: 75000 },
    { nombre: 'Chapultepec', ubicacion: 'Miguel Hidalgo', lineaId: linea1.id, orden: 5, tipo: 'Intermedia', activa: true, pasajeros: 68000 },
    { nombre: 'Observatorio', ubicacion: 'Miguel Hidalgo', lineaId: linea1.id, orden: 6, tipo: 'Terminal', activa: true, pasajeros: 72000 }
  )

  // Línea 2 Azul - Estaciones principales
  const linea2 = lineasCreadas.find(l => l.nombre.includes('Línea 2'))
  estacionesData.push(
    { nombre: 'Cuatro Caminos', ubicacion: 'Miguel Hidalgo', lineaId: linea2.id, orden: 1, tipo: 'Terminal', activa: true, pasajeros: 68000 },
    { nombre: 'Revolución', ubicacion: 'Miguel Hidalgo', lineaId: linea2.id, orden: 2, tipo: 'Intermedia', activa: true, pasajeros: 55000 },
    { nombre: 'Allende', ubicacion: 'Centro Histórico', lineaId: linea2.id, orden: 3, tipo: 'Transferencia', activa: true, pasajeros: 72000 },
    { nombre: 'Pino Suárez', ubicacion: 'Centro', lineaId: linea2.id, orden: 4, tipo: 'Transferencia', activa: true, pasajeros: 98000 },
    { nombre: 'Tasqueña', ubicacion: 'Tlalpan', lineaId: linea2.id, orden: 5, tipo: 'Terminal', activa: true, pasajeros: 59000 }
  )

  // Línea 3 Verde - Estaciones principales
  const linea3 = lineasCreadas.find(l => l.nombre.includes('Línea 3'))
  estacionesData.push(
    { nombre: 'Indios Verdes', ubicacion: 'Gustavo A. Madero', lineaId: linea3.id, orden: 1, tipo: 'Terminal', activa: true, pasajeros: 88000 },
    { nombre: 'La Raza', ubicacion: 'Gustavo A. Madero', lineaId: linea3.id, orden: 2, tipo: 'Transferencia', activa: true, pasajeros: 76000 },
    { nombre: 'Hidalgo', ubicacion: 'Cuauhtémoc', lineaId: linea3.id, orden: 3, tipo: 'Transferencia', activa: true, pasajeros: 91000 },
    { nombre: 'Balderas', ubicacion: 'Cuauhtémoc', lineaId: linea3.id, orden: 4, tipo: 'Transferencia', activa: true, pasajeros: 83000 },
    { nombre: 'Universidad', ubicacion: 'Coyoacán', lineaId: linea3.id, orden: 5, tipo: 'Terminal', activa: true, pasajeros: 67000 }
  )

  await prisma.estacion.createMany({ data: estacionesData })
  console.log(`✅ Creadas ${estacionesData.length} estaciones`)

  // Obtener estaciones creadas
  const estacionesCreadas = await prisma.estacion.findMany({ select: { id: true, nombre: true } })

  // ========== TRENES ==========
  console.log('🚊 Creando trenes...')
  const trenesData = []
  lineasCreadas.forEach((linea, index) => {
    const cantidadTrenes = index < 3 ? 4 : 2 // Más trenes para líneas operativas
    for (let i = 1; i <= cantidadTrenes; i++) {
      trenesData.push({
        modelo: `Modelo-${index + 1}${i.toString().padStart(2, '0')}`,
        lineaId: linea.id,
        estado: index === 3 ? 'Mantenimiento' : 'EnServicio',
        ubicacion: `Estación ${i}`,
        capacidad: 150 + (index * 20),
        velocidadMaxima: 80,
        ultimoMantenimiento: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        proximoMantenimiento: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000)
      })
    }
  })

  await prisma.tren.createMany({ data: trenesData })
  console.log(`✅ Creados ${trenesData.length} trenes`)

  // Obtener trenes creados
  const trenesCreados = await prisma.tren.findMany({ select: { id: true } })

  // ========== MANTENIMIENTOS DE TRENES ==========
  console.log('🔧 Creando registros de mantenimiento...')
  const mantenimientosData = []
  trenesCreados.forEach(tren => {
    const cantidad = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < cantidad; i++) {
      mantenimientosData.push({
        trenId: tren.id,
        tipo: ['Preventivo', 'Correctivo', 'Inspeccion'][Math.floor(Math.random() * 3)],
        fecha: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
        descripcion: `Mantenimiento ${i + 1} realizado`,
        tecnico: ['Luis Técnico', 'Ana Martinez', 'Carlos Herrera'][Math.floor(Math.random() * 3)],
        completado: Math.random() > 0.2
      })
    }
  })

  await prisma.mantenimientoTren.createMany({ data: mantenimientosData })
  console.log(`✅ Creados ${mantenimientosData.length} registros de mantenimiento`)

  // ========== MÉTRICAS DE RENDIMIENTO ==========
  console.log('📊 Creando métricas de rendimiento...')
  const metricasData = []
  trenesCreados.forEach(tren => {
    for (let i = 0; i < 5; i++) {
      metricasData.push({
        trenId: tren.id,
        fecha: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        distancia: 120 + Math.random() * 50,
        horas: 8 + Math.random() * 4,
        eficiencia: 85 + Math.random() * 10,
        combustible: 45 + Math.random() * 15
      })
    }
  })

  await prisma.metricasRendimiento.createMany({ data: metricasData })
  console.log(`✅ Creadas ${metricasData.length} métricas de rendimiento`)

  // ========== VÍAS ==========
  console.log('🛤️ Creando vías...')
  const viasData = []
  lineasCreadas.forEach((linea, index) => {
    viasData.push({
      nombre: `Vía Principal ${linea.nombre}`,
      lineaId: linea.id,
      tipo: 'Principal',
      longitud: 15.5 + Math.random() * 20,
      activa: index !== 3, // Línea 4 en mantenimiento
      material: 'Acero inoxidable',
      ultimaInspeccion: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      proximaInspeccion: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000),
      velocidadMaxima: 80
    })
  })

  // Vías adicionales
  viasData.push(
    {
      nombre: 'Vía de Servicio Norte',
      tipo: 'Servicio',
      longitud: 2.5,
      activa: true,
      material: 'Acero estándar',
      velocidadMaxima: 40
    },
    {
      nombre: 'Vía de Depósito Central',
      tipo: 'Deposito',
      longitud: 1.8,
      activa: true,
      material: 'Acero estándar',
      velocidadMaxima: 20
    }
  )

  await prisma.via.createMany({ data: viasData })
  console.log(`✅ Creadas ${viasData.length} vías`)

  // Obtener vías creadas
  const viasCreadas = await prisma.via.findMany({ select: { id: true } })

  // ========== SENSORES DE VÍA ==========
  console.log('📡 Creando sensores de vía...')
  const sensoresData = []
  viasCreadas.forEach(via => {
    const tiposSensor = ['Temperatura', 'Vibracion', 'Desgaste', 'Presion']
    tiposSensor.forEach((tipo, index) => {
      sensoresData.push({
        viaId: via.id,
        nombre: `Sensor ${tipo}`,
        ubicacion: `Km ${index + 1}`,
        tipo,
        valor: `${20 + Math.random() * 40}`,
        activo: Math.random() > 0.1
      })
    })
  })

  await prisma.sensorVia.createMany({ data: sensoresData })
  console.log(`✅ Creados ${sensoresData.length} sensores`)

  // ========== SUBESTACIONES ELÉCTRICAS ==========
  console.log('⚡ Creando subestaciones eléctricas...')
  const subestacionesData = [
    {
      nombre: 'Subestación Norte',
      ubicacion: 'Zona Norte',
      voltaje: '25kV',
      potencia: '10MW',
      activa: true,
      carga: 75.5,
      temperatura: 32.1
    },
    {
      nombre: 'Subestación Centro',
      ubicacion: 'Centro',
      voltaje: '25kV',
      potencia: '15MW',
      activa: true,
      carga: 82.3,
      temperatura: 28.7
    },
    {
      nombre: 'Subestación Sur',
      ubicacion: 'Zona Sur',
      voltaje: '25kV',
      potencia: '12MW',
      activa: true,
      carga: 68.9,
      temperatura: 30.2
    },
    {
      nombre: 'Subestación Este',
      ubicacion: 'Zona Este',
      voltaje: '25kV',
      potencia: '8MW',
      activa: false,
      carga: 0,
      temperatura: 25.0
    }
  ]

  await prisma.subestacionElectrica.createMany({ data: subestacionesData })
  console.log(`✅ Creadas ${subestacionesData.length} subestaciones`)

  // Obtener subestaciones creadas
  const subestacionesCreadas = await prisma.subestacionElectrica.findMany({ select: { id: true } })

  // ========== EQUIPOS ELÉCTRICOS ==========
  console.log('🔌 Creando equipos eléctricos...')
  const equiposData = []
  subestacionesCreadas.forEach(subestacion => {
    const tipos = ['Transformador', 'Rectificador', 'Interruptor', 'Relay']
    tipos.forEach(tipo => {
      equiposData.push({
        subestacionId: subestacion.id,
        nombre: `${tipo} Principal`,
        tipo,
        activo: Math.random() > 0.1,
        temperatura: 25 + Math.random() * 15
      })
    })
  })

  await prisma.equipoElectrico.createMany({ data: equiposData })
  console.log(`✅ Creados ${equiposData.length} equipos eléctricos`)

  // ========== CONSUMO DE ENERGÍA ==========
  console.log('💡 Creando registros de consumo de energía...')
  const consumosData = []
  for (let i = 0; i < 30; i++) {
    const fechaConsumo = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    lineasCreadas.forEach(linea => {
      consumosData.push({
        subestacionId: subestacionesCreadas[Math.floor(Math.random() * subestacionesCreadas.length)].id,
        linea: linea.nombre,
        potencia: `${800 + Math.random() * 400}kW`,
        voltaje: '25kV',
        corriente: `${32 + Math.random() * 16}A`,
        factorPotencia: 0.85 + Math.random() * 0.1,
        fecha: fechaConsumo
      })
    })
  }

  await prisma.consumoEnergia.createMany({ data: consumosData })
  console.log(`✅ Creados ${consumosData.length} registros de consumo`)

  // ========== CÁMARAS DE SEGURIDAD ==========
  console.log('📹 Creando cámaras de seguridad...')
  const camarasData = []
  estacionesCreadas.forEach(estacion => {
    const cantidadCamaras = Math.floor(Math.random() * 3) + 2
    for (let i = 1; i <= cantidadCamaras; i++) {
      camarasData.push({
        ubicacion: `${estacion.nombre} - Cámara ${i}`,
        estado: Math.random() > 0.1 ? 'Activa' : 'Mantenimiento',
        resolucion: ['HD', 'FullHD', '4K'][Math.floor(Math.random() * 3)],
        estacionId: estacion.id
      })
    }
  })

  await prisma.camaraSeguridadNew.createMany({ data: camarasData })
  console.log(`✅ Creadas ${camarasData.length} cámaras de seguridad`)

  // ========== PUNTOS DE ACCESO ==========
  console.log('🔐 Creando puntos de acceso...')
  const puntosData = []
  estacionesCreadas.forEach(estacion => {
    const cantidadPuntos = Math.floor(Math.random() * 2) + 1
    for (let i = 1; i <= cantidadPuntos; i++) {
      puntosData.push({
        nombre: `Acceso ${i} - ${estacion.nombre}`,
        ubicacion: `${estacion.nombre} - Entrada ${i}`,
        estado: Math.random() > 0.3 ? 'Cerrado' : 'Abierto',
        tipoAcceso: ['Tarjeta', 'Codigo', 'Biometrico', 'Manual'][Math.floor(Math.random() * 4)],
        estacionId: estacion.id
      })
    }
  })

  await prisma.puntoAcceso.createMany({ data: puntosData })
  console.log(`✅ Creados ${puntosData.length} puntos de acceso`)

  // ========== INCIDENTES DE SEGURIDAD ==========
  console.log('🚨 Creando incidentes de seguridad...')
  const incidentesData = []
  const tiposIncidente = ['AccesoNoAutorizado', 'CamaraDesconectada', 'SensorMovimiento', 'AlarmaIncendio', 'FalloElectrico']
  const prioridades = ['Baja', 'Media', 'Alta', 'Critica']
  const estados = ['Pendiente', 'EnProceso', 'Resuelto']

  for (let i = 0; i < 35; i++) {
    incidentesData.push({
      tipo: tiposIncidente[Math.floor(Math.random() * tiposIncidente.length)],
      descripcion: `Incidente de seguridad detectado en el sistema de monitoreo. Requiere atención ${prioridades[Math.floor(Math.random() * prioridades.length)].toLowerCase()}.`,
      ubicacion: `Estación ${Math.floor(Math.random() * estacionesCreadas.length) + 1}`,
      prioridad: prioridades[Math.floor(Math.random() * prioridades.length)],
      estado: estados[Math.floor(Math.random() * estados.length)],
      fechaIncidente: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    })
  }

  await prisma.incidenteSeguridad.createMany({ data: incidentesData })
  console.log(`✅ Creados ${incidentesData.length} incidentes de seguridad`)

  // ========== CENTROS DE CONTROL ==========
  console.log('🎛️ Creando centros de control CCC...')
  const centrosData = [
    { nombre: 'CCC Principal', ubicacion: 'Centro de Control', operadores: 5, activo: true },
    { nombre: 'CCC Norte', ubicacion: 'Zona Norte', operadores: 3, activo: true },
    { nombre: 'CCC Sur', ubicacion: 'Zona Sur', operadores: 3, activo: true },
    { nombre: 'CCC Emergencia', ubicacion: 'Bunker', operadores: 2, activo: false }
  ]

  await prisma.centroCCC.createMany({ data: centrosData })
  console.log(`✅ Creados ${centrosData.length} centros de control`)

  // ========== ALERTAS DEL SISTEMA ==========
  console.log('🔔 Creando alertas del sistema...')
  const alertasData = []
  const tiposAlerta = ['Temperatura', 'Presion', 'Velocidad', 'Energia', 'Comunicacion']
  const niveles = ['Info', 'Warning', 'Error', 'Critical']

  for (let i = 0; i < 25; i++) {
    alertasData.push({
      tipo: tiposAlerta[Math.floor(Math.random() * tiposAlerta.length)],
      mensaje: `Alerta del sistema detectada en monitoreo automático`,
      nivel: niveles[Math.floor(Math.random() * niveles.length)],
      estado: Math.random() > 0.3 ? 'Activa' : 'Resuelta',
      origen: `Sistema ${Math.floor(Math.random() * 10) + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
    })
  }

  await prisma.alertaSistema.createMany({ data: alertasData })
  console.log(`✅ Creadas ${alertasData.length} alertas del sistema`)

  // ========== TARIFAS METRO CDMX ==========
  console.log('💳 Creando tarifas en pesos mexicanos...')
  const tarifasData = [
    { tipo: 'Adulto', precio: 5.00, descripcion: 'Tarifa general para adultos - Metro CDMX', activa: true },
    { tipo: 'Estudiante', precio: 2.50, descripcion: 'Tarifa reducida para estudiantes con credencial', activa: true },
    { tipo: 'Tercera Edad', precio: 2.00, descripcion: 'Tarifa para personas mayores de 60 años', activa: true },
    { tipo: 'Discapacitado', precio: 2.50, descripcion: 'Tarifa para personas con discapacidad', activa: true },
    { tipo: 'Niño', precio: 0.00, descripcion: 'Tarifa gratuita para menores de 5 años', activa: true }
  ]

  await prisma.tarifa.createMany({ data: tarifasData })
  console.log(`✅ Creadas ${tarifasData.length} tarifas`)

  // Obtener tarifas creadas
  const tarifasCreadas = await prisma.tarifa.findMany({ select: { id: true, precio: true } })

  // ========== TRANSACCIONES ==========
  console.log('🏦 Creando transacciones...')
  const transaccionesData = []
  const metodosPago = ['TarjetaMetro', 'Contactless', 'CodigoQR', 'Efectivo']

  // Crear transacciones para los últimos 30 días
  for (let i = 0; i < 30; i++) {
    const fecha = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    const transaccionesPorDia = 50 + Math.floor(Math.random() * 100)
    
    for (let j = 0; j < transaccionesPorDia; j++) {
      const tarifa = tarifasCreadas[Math.floor(Math.random() * tarifasCreadas.length)]
      const estacion = estacionesCreadas[Math.floor(Math.random() * estacionesCreadas.length)]
      
      transaccionesData.push({
        tarifaId: tarifa.id,
        estacionId: estacion.id,
        monto: tarifa.precio,
        metodoPago: metodosPago[Math.floor(Math.random() * metodosPago.length)],
        exitosa: Math.random() > 0.05, // 95% de éxito
        fechaTransaccion: new Date(fecha.getTime() + Math.random() * 24 * 60 * 60 * 1000)
      })
    }
  }

  await prisma.transaccion.createMany({ data: transaccionesData })
  console.log(`✅ Creadas ${transaccionesData.length} transacciones`)

  // ========== REPORTES FINANCIEROS ==========
  console.log('📊 Creando reportes financieros...')
  const reportesData = []
  
  for (let i = 0; i < 6; i++) {
    const fecha = new Date()
    fecha.setMonth(fecha.getMonth() - i)
    
    const ingresos = 45000 + Math.random() * 25000
    const gastos = 30000 + Math.random() * 15000
    
    reportesData.push({
      periodo: fecha.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
      ingresos,
      gastos,
      beneficio: ingresos - gastos,
      fecha
    })
  }

  await prisma.reporteFinanciero.createMany({ data: reportesData })
  console.log(`✅ Creados ${reportesData.length} reportes financieros`)

  // ========== EQUIPOS DE COMUNICACIÓN ==========
  console.log('📡 Creando equipos de comunicación...')
  const equiposComunicacionData = []
  const tiposEquipoComun = ['RadioBase', 'Repetidor', 'Antena', 'RadioMovil']
  
  estacionesCreadas.forEach(estacion => {
    tiposEquipoComun.forEach(tipo => {
      equiposComunicacionData.push({
        nombre: `${tipo} - ${estacion.nombre}`,
        ubicacion: estacion.nombre,
        tipo,
        activo: Math.random() > 0.1,
        señal: 70 + Math.random() * 30
      })
    })
  })

  await prisma.equipoComunicacion.createMany({ data: equiposComunicacionData })
  console.log(`✅ Creados ${equiposComunicacionData.length} equipos de comunicación`)

  // ========== REDES DE COMUNICACIÓN ==========
  console.log('🌐 Creando redes de comunicación...')
  const redesData = [
    {
      nombre: 'Red Principal Metro',
      tipo: 'Fibra Óptica',
      cobertura: 'Todas las estaciones',
      activa: true,
      usuarios: 145
    },
    {
      nombre: 'Red Emergencia',
      tipo: 'Radio VHF',
      cobertura: 'Puntos críticos',
      activa: true,
      usuarios: 25
    },
    {
      nombre: 'Red Mantenimiento',
      tipo: 'WiFi Industrial',
      cobertura: 'Talleres y depósitos',
      activa: true,
      usuarios: 35
    },
    {
      nombre: 'Red Respaldo',
      tipo: 'Satelital',
      cobertura: 'Sistema completo',
      activa: false,
      usuarios: 0
    }
  ]

  await prisma.redComunicacion.createMany({ data: redesData })
  console.log(`✅ Creadas ${redesData.length} redes de comunicación`)

  console.log('✨ Seeding completado exitosamente!')
  console.log('📈 Resumen de datos creados:')
  console.log(`   👤 Usuarios: ${usuarios.count}`)
  console.log(`   🚇 Líneas: ${lineas.count}`)
  console.log(`   🚉 Estaciones: ${estacionesData.length}`)
  console.log(`   🚊 Trenes: ${trenesData.length}`)
  console.log(`   🔧 Mantenimientos: ${mantenimientosData.length}`)
  console.log(`   📊 Métricas: ${metricasData.length}`)
  console.log(`   🛤️ Vías: ${viasData.length}`)
  console.log(`   📡 Sensores: ${sensoresData.length}`)
  console.log(`   ⚡ Subestaciones: ${subestacionesData.length}`)
  console.log(`   🔌 Equipos eléctricos: ${equiposData.length}`)
  console.log(`   💡 Consumos: ${consumosData.length}`)
  console.log(`   📹 Cámaras: ${camarasData.length}`)
  console.log(`   🔐 Puntos acceso: ${puntosData.length}`)
  console.log(`   🚨 Incidentes: ${incidentesData.length}`)
  console.log(`   🎛️ Centros CCC: ${centrosData.length}`)
  console.log(`   🔔 Alertas: ${alertasData.length}`)
  console.log(`   💳 Tarifas: ${tarifasData.length}`)
  console.log(`   🏦 Transacciones: ${transaccionesData.length}`)
  console.log(`   📊 Reportes: ${reportesData.length}`)
  console.log(`   📡 Equipos comunicación: ${equiposComunicacionData.length}`)
  console.log(`   🌐 Redes: ${redesData.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('🔌 Desconectado de la base de datos')
  })