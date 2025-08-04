'use client'

import { useState, useEffect } from 'react'

export interface User {
  id: string
  username: string
  nombre: string
  rol: string
  email?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/auth/me', {
        credentials: 'include' // Ensure cookies are included
      })
      if (response.ok) {
        const data = await response.json()
        console.log('Auth check successful:', data.user?.nombre)
        setUser(data.user)
      } else {
        console.log('Auth check failed:', response.status)
        setUser(null)
      }
    } catch (error) {
      console.error('Error checking auth:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      window.location.href = '/login'
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return {
    user,
    loading,
    logout,
    checkAuth,
  }
}