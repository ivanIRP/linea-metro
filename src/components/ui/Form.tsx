'use client'

import { ReactNode } from 'react'

interface FormProps {
  onSubmit: (e: React.FormEvent) => void
  children: ReactNode
  className?: string
}

interface FormFieldProps {
  label: string
  error?: string
  children: ReactNode
  required?: boolean
}

interface FormActionsProps {
  children: ReactNode
}

export function Form({ onSubmit, children, className = '' }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`}>
      {children}
    </form>
  )
}

export function FormField({ label, error, children, required = false }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export function FormActions({ children }: FormActionsProps) {
  return (
    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
      {children}
    </div>
  )
}