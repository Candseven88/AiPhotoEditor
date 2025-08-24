'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Shield, AlertTriangle } from 'lucide-react'

export default function EnvironmentIndicator() {
  const [environment, setEnvironment] = useState<string>('unknown')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkEnvironment = async () => {
      try {
        const response = await fetch('/api/paypal/environment')
        if (response.ok) {
          const data = await response.json()
          setEnvironment(data.environment)
        }
      } catch (error) {
        console.error('Failed to check environment:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkEnvironment()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <div className="w-3 h-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        <span>Checking environment...</span>
      </div>
    )
  }

  const getEnvironmentConfig = () => {
    switch (environment) {
      case 'sandbox':
        return {
          label: 'Sandbox',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: AlertTriangle,
          description: 'Test environment - No real payments'
        }
      case 'live':
        return {
          label: 'Live',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: Shield,
          description: 'Production environment - Real payments'
        }
      default:
        return {
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Globe,
          description: 'Environment not configured'
        }
    }
  }

  const config = getEnvironmentConfig()
  const IconComponent = config.icon

  return (
    <motion.div
      className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-medium ${config.color}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      title={config.description}
    >
      <IconComponent className="w-3 h-3" />
      <span>{config.label}</span>
    </motion.div>
  )
} 