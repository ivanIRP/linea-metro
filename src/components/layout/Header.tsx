'use client'

import Button from '../ui/Button'
import { useAuth } from '@/lib/auth'
import { useState, useEffect } from 'react'

export default function Header() {
  const { user, logout } = useAuth()
  const [currentDate, setCurrentDate] = useState('')
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentDate(now.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }))
      setCurrentTime(now.toLocaleTimeString('es-ES'))
    }
    
    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="bg-white border-b border-orange-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Metro CDMX - Sistema de Gestión
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Sistema de Transporte Colectivo Ciudad de México
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {currentDate || 'Cargando fecha...'}
            </p>
            <p className="text-xs text-gray-500">
              {currentTime || 'Cargando hora...'}
            </p>
          </div>
          
          {user && (
            <div className="flex items-center space-x-3 px-3 py-2 bg-orange-50 rounded-lg">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.nombre}</p>
                <p className="text-xs text-orange-600">{user.rol}</p>
              </div>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user.nombre.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}
          
          <Button variant="ghost" size="sm">
            🔔
          </Button>
          
          <Button variant="ghost" size="sm" onClick={logout} title="Cerrar Sesión">
            🚪
          </Button>
        </div>
      </div>
    </header>
  )
}