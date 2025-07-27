# Metro Líneas - Instrucciones de Instalación

## 1. Instalación de XAMPP

### Windows
1. Descargar XAMPP desde [https://www.apachefriends.org/](https://www.apachefriends.org/)
2. Ejecutar el instalador como administrador
3. Seleccionar componentes: **Apache**, **MySQL**, **PHP**, **phpMyAdmin**
4. Instalar en la ruta por defecto: `C:\xampp\`
5. Abrir **XAMPP Control Panel**
6. Iniciar servicios **Apache** y **MySQL**
7. Verificar que MySQL esté corriendo en puerto **3306**

### Linux/WSL
```bash
sudo apt update
sudo apt install apache2 mysql-server php php-mysql phpmyadmin
sudo systemctl start apache2
sudo systemctl start mysql
```

### Configuración de Base de Datos
1. Abrir navegador en `http://localhost/phpmyadmin`
2. Crear nueva base de datos: `metro_sistema`
3. Configurar usuario: `root` sin contraseña (para desarrollo)

## 2. Instalación de Bun

```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
bun --version
```

## 3. Creación del Proyecto

### Inicializar proyecto Next.js
```bash
bunx create-next-app@latest linea-metro --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd linea-metro
```

### Instalar dependencias de Prisma
```bash
bun add @prisma/client prisma
bun add -d ts-node @types/node
```

## 4. Configuración de Prisma

### Inicializar Prisma
```bash
bunx prisma init
```

### Configurar variables de entorno
Crear/editar `.env`:
```env
DATABASE_URL="mysql://root:@localhost:3306/metro_sistema"
```

### Configurar schema básico
Editar `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  username  String   @unique
  password  String
  rol       String
  activo    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Agregar más modelos según necesidad
```

## 5. Configuración del Cliente Prisma

Crear `src/lib/prisma.ts`:
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## 6. Scripts de Package.json

Actualizar `package.json`:
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:seed": "ts-node prisma/seed.ts",
    "db:studio": "prisma studio",
    "db:reset": "prisma migrate reset --force",
    "db:generate": "prisma generate"
  },
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

## 7. Crear Archivo de Seed

Crear `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Limpiar datos existentes
  await prisma.user.deleteMany()
  
  // Crear usuarios de prueba
  const users = await prisma.user.createMany({
    data: [
      {
        username: 'admin',
        password: 'admin',
        rol: 'Administrador'
      },
      {
        username: 'operador',
        password: 'operador', 
        rol: 'Operador'
      },
      {
        username: 'seguridad',
        password: 'seguridad',
        rol: 'Seguridad'
      }
    ]
  })
  
  console.log(`✅ Creados ${users.count} usuarios`)
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

## 8. Flujo de Trabajo con Base de Datos

### Primera configuración
```bash
# 1. Generar cliente Prisma
bunx prisma generate

# 2. Sincronizar schema con BD
bun run db:push

# 3. Poblar con datos de prueba
bun run db:seed
```

### Desarrollo diario
```bash
# Verificar estado de BD
bun run db:studio

# Después de cambios en schema
bun run db:push
bunx prisma generate

# Re-poblar datos si es necesario
bun run db:seed
```

### Reset completo de base de datos
```bash
# ⚠️ CUIDADO: Elimina todos los datos
bun run db:reset

# Después del reset, volver a poblar
bun run db:seed
```

## 9. Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo
bun run dev

# Abrir Prisma Studio (GUI para BD)
bun run db:studio

# Ver logs de base de datos
bunx prisma db push --preview-feature

# Generar cliente después de cambios
bunx prisma generate
```

## 10. Verificación de Instalación

### Verificar XAMPP
- ✅ MySQL corriendo en puerto 3306
- ✅ phpMyAdmin accesible en `http://localhost/phpmyadmin`
- ✅ Base de datos `metro_sistema` creada

### Verificar Bun y Prisma
```bash
bun --version                    # Debe mostrar versión
bunx prisma --version           # Debe mostrar versión
bun run db:studio               # Debe abrir interfaz web
```

### Verificar Aplicación
```bash
bun run dev                     # Debe iniciar en http://localhost:3000
```

## Solución de Problemas

### Error de conexión MySQL
```bash
# Verificar que MySQL esté corriendo
sudo systemctl status mysql     # Linux
# O verificar en XAMPP Control Panel

# Verificar puerto
netstat -an | grep 3306
```

### Error de Prisma
```bash
# Regenerar cliente
bunx prisma generate

# Verificar schema
bunx prisma validate

# Reset completo si hay problemas
bun run db:reset
```

### Error de seed
```bash
# Verificar conexión a BD
bunx prisma db push

# Ejecutar seed manualmente
bunx ts-node prisma/seed.ts
```