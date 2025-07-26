'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  MdDashboard, 
  MdSecurity, 
  MdMap, 
  MdTrain, 
  MdLinearScale, 
  MdElectricBolt, 
  MdRadar, 
  MdPayment, 
  MdPhone, 
  MdSubway, 
  MdInventory, 
  MdPeople, 
  MdSettings 
} from 'react-icons/md'

interface SidebarItem {
  label: string
  href: string
  icon: React.ComponentType
}

const menuItems: SidebarItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: MdDashboard },
  { label: 'Seguridad', href: '/seguridad', icon: MdSecurity },
  { label: 'Rutas', href: '/rutas', icon: MdMap },
  { label: 'Trenes', href: '/trenes', icon: MdTrain },
  { label: 'Vías', href: '/vias', icon: MdLinearScale },
  { label: 'Electricidad', href: '/electricidad', icon: MdElectricBolt },
  { label: 'Control y Monitoreo', href: '/control', icon: MdRadar },
  { label: 'Cobro', href: '/cobro', icon: MdPayment },
  { label: 'Comunicación', href: '/comunicacion', icon: MdPhone },
  { label: 'Líneas de Metro', href: '/lineas', icon: MdSubway },
  { label: 'Inventario', href: '/inventario', icon: MdInventory },
  { label: 'Personal', href: '/personal', icon: MdPeople },
  { label: 'Configuración', href: '/configuracion', icon: MdSettings }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-white text-gray-800 w-64 lg:w-64 md:w-16 min-h-screen p-4 border-r border-orange-200 shadow-lg">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-center md:hidden lg:block">
          Metro Líneas
        </h1>
        <p className="text-orange-600 text-sm text-center mt-1 md:hidden lg:block">
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
                flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors group
                ${isActive 
                  ? 'bg-orange-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }
              `}
              title={item.label}
            >
              <item.icon className="text-lg flex-shrink-0" />
              <span className="font-medium md:hidden lg:block">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}