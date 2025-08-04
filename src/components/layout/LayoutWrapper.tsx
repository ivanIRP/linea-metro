'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import Sidebar from './Sidebar'
import Header from './Header'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  // All hooks must be called in the same order every time
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading } = useAuth()
  
  const isLoginPage = pathname === '/login'
  const isHomePage = pathname === '/'
  const isPublicPage = isLoginPage || isHomePage
  
  // This useEffect always runs, but only acts on protected pages
  useEffect(() => {
    if (!isPublicPage && !loading && !user) {
      // Unauthenticated user on protected page, redirect to login
      router.replace('/login')
    }
  }, [isPublicPage, user, loading, router])

  // For public pages (login and home), render without layout
  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        {children}
      </div>
    )
  }

  // For protected pages - show loading screen while verifying authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    )
  }

  // If no authenticated user on protected page, show loading (will redirect)
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  // Authenticated user on protected page, show full layout
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}