'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarItem {
  label: string
  href: string
  icon: string
}

const menuItems: SidebarItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Seguridad', href: '/seguridad', icon: '🔒' },
  { label: 'Rutas', href: '/rutas', icon: '🗺️' },
  { label: 'Trenes', href: '/trenes', icon: '🚊' },
  { label: 'Vías', href: '/vias', icon: '🛤️' },
  { label: 'Electricidad', href: '/electricidad', icon: '⚡' },
  { label: 'Control y Monitoreo', href: '/control', icon: '📡' },
  { label: 'Cobro', href: '/cobro', icon: '💳' },
  { label: 'Comunicación', href: '/comunicacion', icon: '📞' },
  { label: 'Líneas de Metro', href: '/lineas', icon: '🚇' },
  { label: 'Inventario', href: '/inventario', icon: '📦' },
  { label: 'Personal', href: '/personal', icon: '👥' },
  { label: 'Configuración', href: '/configuracion', icon: '⚙️' }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-white text-gray-800 w-64 min-h-screen p-4 border-r border-orange-200 shadow-lg">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-center">
          Metro Líneas
        </h1>
        <p className="text-orange-600 text-sm text-center mt-1">
          Sistema de Gestión
        </p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${isActive 
                  ? 'bg-orange-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}