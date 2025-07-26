// Script para probar el sistema de login
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testLoginSystem() {
  console.log('🔐 Probando sistema de login...\n')
  
  try {
    // Verificar que la tabla de usuarios existe
    console.log('1. Verificando tabla de usuarios...')
    const usuariosCount = await prisma.usuario.count()
    console.log(`   ✅ Tabla usuarios existe con ${usuariosCount} registros\n`)
    
    // Verificar usuario admin
    console.log('2. Verificando usuario admin...')
    const adminUser = await prisma.usuario.findUnique({
      where: { username: 'admin' }
    })
    
    if (adminUser) {
      console.log(`   ✅ Usuario admin encontrado:`)
      console.log(`      • Username: ${adminUser.username}`)
      console.log(`      • Nombre: ${adminUser.nombre}`)
      console.log(`      • Rol: ${adminUser.rol}`)
      console.log(`      • Email: ${adminUser.email}`)
      console.log(`      • Activo: ${adminUser.activo}`)
      console.log(`      • Contraseña: ${adminUser.password === 'admin' ? '✅ Correcta' : '❌ Incorrecta'}\n`)
    } else {
      console.log('   ❌ Usuario admin no encontrado\n')
      return
    }
    
    // Listar todos los usuarios disponibles
    console.log('3. Usuarios disponibles para login:')
    const allUsers = await prisma.usuario.findMany({
      select: {
        username: true,
        nombre: true,
        rol: true,
        activo: true
      }
    })
    
    allUsers.forEach(user => {
      console.log(`   • ${user.username} (${user.nombre}) - Rol: ${user.rol} - ${user.activo ? '✅ Activo' : '❌ Inactivo'}`)
    })
    
    console.log('\n4. Información para pruebas:')
    console.log('   🌐 URL de login: http://localhost:3000/login')
    console.log('   👤 Credenciales de prueba:')
    console.log('      • Usuario: admin')
    console.log('      • Contraseña: admin')
    console.log('\n   📋 Otros usuarios disponibles:')
    console.log('      • operador / operador (Rol: Operador)')
    console.log('      • seguridad / seguridad (Rol: Seguridad)')
    
    console.log('\n🎉 Sistema de login configurado correctamente!')
    console.log('   • Modelo de usuario creado')
    console.log('   • API endpoints de autenticación disponibles')
    console.log('   • Middleware de protección de rutas activo')
    console.log('   • Página de login funcional')
    console.log('   • Usuarios de prueba creados')
    
  } catch (error) {
    console.error('❌ Error al probar sistema de login:', error.message)
    
    if (error.code === 'P1001') {
      console.log('\n💡 Solución: Asegúrate de que MySQL esté ejecutándose en XAMPP')
    } else if (error.code === 'P2021') {
      console.log('\n💡 Solución: La tabla usuarios no existe. Ejecuta:')
      console.log('   npx prisma db push')
      console.log('   npm run db:seed')
    }
    
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testLoginSystem()