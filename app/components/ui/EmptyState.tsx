"use client"

import { PropsWithChildren } from 'react'

interface EmptyStateProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  className?: string
}

export default function EmptyState({ title, subtitle, icon, className = '' }: PropsWithChildren<EmptyStateProps>) {
  return (
    <div className={`h-full flex items-center justify-center ${className}`}>
      <div className="text-center text-gray-500 dark:text-gray-400 animate-fade-in">
        {icon ? <div className="w-24 h-24 mx-auto mb-4 opacity-70">{icon}</div> : null}
        <p className="text-lg font-medium">{title}</p>
        {subtitle ? <p className="text-sm mt-1">{subtitle}</p> : null}
      </div>
    </div>
  )
} 