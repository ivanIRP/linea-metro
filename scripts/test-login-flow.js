// Script para probar el flujo completo de login
const fetch = require('node-fetch');

async function testLoginFlow() {
  console.log('🔐 Probando flujo completo de login...\n');

  try {
    // 1. Verificar que la página de login sea accesible
    console.log('1. 📄 Probando acceso a página de login...');
    
    // 2. Intentar login con credenciales válidas
    console.log('2. 🔑 Probando login con credenciales admin/admin...');
    
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin'
      })
    });

    if (!loginResponse.ok) {
      console.log('❌ Error en login:', loginResponse.status, loginResponse.statusText);
      const errorData = await loginResponse.json();
      console.log('   Detalles:', errorData);
      return;
    }

    const loginData = await loginResponse.json();
    console.log('✅ Login exitoso:', loginData.message);
    console.log('   Usuario:', loginData.user.nombre, `(${loginData.user.rol})`);

    // Extraer cookies de la respuesta
    const cookies = loginResponse.headers.get('set-cookie');
    console.log('🍪 Cookies establecidas:', cookies ? 'Sí' : 'No');

    if (!cookies) {
      console.log('❌ No se establecieron cookies de sesión');
      return;
    }

    // 3. Verificar que la sesión funcione
    console.log('\n3. 🔍 Verificando sesión con /api/auth/me...');
    
    const meResponse = await fetch('http://localhost:3000/api/auth/me', {
      headers: {
        'Cookie': cookies
      }
    });

    if (!meResponse.ok) {
      console.log('❌ Error al verificar sesión:', meResponse.status);
      const errorData = await meResponse.json();
      console.log('   Detalles:', errorData);
      return;
    }

    const meData = await meResponse.json();
    console.log('✅ Sesión válida para:', meData.user.nombre);

    // 4. Probar logout
    console.log('\n4. 🚪 Probando logout...');
    
    const logoutResponse = await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Cookie': cookies
      }
    });

    if (logoutResponse.ok) {
      console.log('✅ Logout exitoso');
    } else {
      console.log('❌ Error en logout:', logoutResponse.status);
    }

    console.log('\n🎉 ¡Flujo de login completado exitosamente!');
    console.log('\n📋 Instrucciones para probar manualmente:');
    console.log('   1. Ejecuta: npm run dev');
    console.log('   2. Abre: http://localhost:3000');
    console.log('   3. Debería redirigir a /login');
    console.log('   4. Usa credenciales: admin / admin');
    console.log('   5. Debería redirigir al dashboard');

  } catch (error) {
    console.error('❌ Error durante prueba:', error.message);
    console.log('\n💡 Asegúrate de que el servidor esté corriendo:');
    console.log('   npm run dev');
  }
}

testLoginFlow();