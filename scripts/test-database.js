// Script para probar la conectividad de la base de datos
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testDatabase() {
  console.log('🔍 Probando conexión a la base de datos...')
  
  try {
    // Probar conexión básica
    await prisma.$connect()
    console.log('✅ Conexión a MySQL exitosa')
    
    // Probar que las tablas existen
    const lineasCount = await prisma.linea.count()
    const trenesCount = await prisma.tren.count()
    const estacionesCount = await prisma.estacion.count()
    
    console.log(`📊 Datos encontrados:`)
    console.log(`   • ${lineasCount} líneas de metro`)
    console.log(`   • ${trenesCount} trenes`)
    console.log(`   • ${estacionesCount} estaciones`)
    
    if (lineasCount === 0) {
      console.log('⚠️  La base de datos está vacía. Ejecuta: npm run db:seed')
    } else {
      console.log('✅ Base de datos poblada correctamente')
    }
    
    // Probar una consulta más compleja
    const lineasConDetalles = await prisma.linea.findMany({
      include: {
        _count: {
          select: {
            trenes: true,
            estaciones: true,
          }
        }
      }
    })
    
    console.log('\n📋 Líneas configuradas:')
    lineasConDetalles.forEach(linea => {
      console.log(`   • ${linea.nombre} - ${linea.estado} (${linea._count.trenes} trenes, ${linea._count.estaciones} estaciones)`)
    })
    
    console.log('\n🎉 ¡Todos los tests pasaron! La base de datos está funcionando correctamente.')
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message)
    
    if (error.code === 'P1001') {
      console.log('\n💡 Soluciones posibles:')
      console.log('   1. Asegúrate de que XAMPP esté ejecutándose')
      console.log('   2. Verifica que MySQL esté activo en el panel de XAMPP')
      console.log('   3. Confirma que el puerto 3306 esté disponible')
      console.log('   4. Revisa la configuración en el archivo .env')
    } else if (error.code === 'P1003') {
      console.log('\n💡 La base de datos "metro_sistema" no existe.')
      console.log('   Créala en phpMyAdmin o ejecuta: npx prisma db push')
    }
    
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()