# Metro Líneas - Setup Instructions

## Prerequisites

- **Node.js** (v18 or higher)
- **XAMPP** with MySQL enabled
- **Git**

## Project Setup

### 1. Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
```

### 2. Create Next.js Project

```bash
bunx create-next-app@latest linea-metro --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd linea-metro
```

### 3. Install Dependencies

```bash
bun add @prisma/client prisma
bun add -d ts-node @types/node
```

### 4. Initialize Prisma

```bash
bunx prisma init
```

### 5. Configure Database

**Update `.env`:**
```env
DATABASE_URL="mysql://root:@localhost:3306/metro_sistema"
NEXTAUTH_SECRET="tu-clave-secreta-super-segura-para-nextauth"
NEXTAUTH_URL="http://localhost:3000"
```

**Create database in XAMPP:**
- Start XAMPP MySQL service
- Open phpMyAdmin
- Create database: `metro_sistema`

### 6. Setup Prisma Schema

**Update `prisma/schema.prisma`:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// Add your models here
```

### 7. Database Commands

```bash
# Push schema to database
bunx prisma db push

# Generate Prisma client
bunx prisma generate

# Open Prisma Studio
bunx prisma studio

# Reset database
bunx prisma migrate reset
```

### 8. Update Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio",
    "db:reset": "prisma migrate reset"
  }
}
```

### 9. Create Prisma Client

**Create `src/lib/prisma.ts`:**
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 10. Development

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

## Database Migration Workflow

1. **Modify schema** in `prisma/schema.prisma`
2. **Push changes**: `bun run db:push`
3. **Generate client**: `bunx prisma generate`
4. **Test changes**: `bun run dev`

## Troubleshooting

**Database connection issues:**
- Ensure XAMPP MySQL is running
- Check database name and credentials in `.env`
- Verify port 3306 is available

**Prisma client issues:**
- Run `bunx prisma generate` after schema changes
- Clear node_modules and run `bun install` if needed

**Build errors:**
- Check TypeScript types with `bun run lint`
- Ensure all imports are correct