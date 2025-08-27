"use client"

import { PropsWithChildren } from 'react'

interface CardProps {
  className?: string
}

export default function Card({ className = '', children }: PropsWithChildren<CardProps>) {
  return (
    <div className={`bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm border border-orange-100 dark:border-gray-800 rounded-2xl shadow-2xl ${className}`}>
      {children}
    </div>
  )
} 