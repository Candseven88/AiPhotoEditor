'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  id: string
  type: ToastType
  title?: string
  message: string
  duration?: number
  onClose?: (id: string) => void
}

interface ToastManagerProps {
  toasts: ToastProps[]
  onClose: (id: string) => void
}

const ToastItem = ({ toast, onClose }: { toast: ToastProps; onClose: (id: string) => void }) => {
  const [isVisible, setIsVisible] = useState(true)
  
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose(toast.id), 300)
      }, toast.duration)
      
      return () => clearTimeout(timer)
    }
  }, [toast.id, toast.duration, onClose])

  const getToastConfig = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-50 border-green-200',
          iconColor: 'text-green-600',
          textColor: 'text-green-800',
          titleColor: 'text-green-900'
        }
      case 'error':
        return {
          icon: AlertCircle,
          bgColor: 'bg-red-50 border-red-200',
          iconColor: 'text-red-600',
          textColor: 'text-red-800',
          titleColor: 'text-red-900'
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-50 border-yellow-200',
          iconColor: 'text-yellow-600',
          textColor: 'text-yellow-800',
          titleColor: 'text-yellow-900'
        }
      case 'info':
        return {
          icon: Info,
          bgColor: 'bg-blue-50 border-blue-200',
          iconColor: 'text-blue-600',
          textColor: 'text-blue-800',
          titleColor: 'text-blue-900'
        }
    }
  }

  const config = getToastConfig(toast.type)
  const Icon = config.icon

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          className={`
            ${config.bgColor} border-2 rounded-xl p-4 shadow-xl backdrop-blur-sm
            max-w-md w-full mx-auto mb-3 relative
          `}
        >
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 ${config.iconColor}`}>
              <Icon className="w-6 h-6" />
            </div>
            
            <div className="flex-1 min-w-0">
              {toast.title && (
                <h4 className={`font-semibold ${config.titleColor} mb-1 text-sm`}>
                  {toast.title}
                </h4>
              )}
              <p className={`${config.textColor} text-sm leading-relaxed`}>
                {toast.message}
              </p>
            </div>
            
            <button
              onClick={() => {
                setIsVisible(false)
                setTimeout(() => onClose(toast.id), 300)
              }}
              className={`flex-shrink-0 ${config.iconColor} hover:opacity-70 transition-opacity p-1 rounded-lg hover:bg-black/5`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* 进度条 */}
          {toast.duration && toast.duration > 0 && (
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-b-xl"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: toast.duration / 1000, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const ToastManager = ({ toasts, onClose }: ToastManagerProps) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Hook for managing toasts
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const showToast = (toast: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: ToastProps = {
      ...toast,
      id,
      duration: toast.duration ?? 5000 // 默认5秒
    }
    
    setToasts(prev => [...prev, newToast])
    return id
  }

  const closeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const showSuccess = (message: string, title?: string, duration?: number) => {
    return showToast({ type: 'success', message, title, duration })
  }

  const showError = (message: string, title?: string, duration?: number) => {
    return showToast({ type: 'error', message, title, duration: duration ?? 8000 }) // 错误消息显示更久
  }

  const showWarning = (message: string, title?: string, duration?: number) => {
    return showToast({ type: 'warning', message, title, duration: duration ?? 6000 })
  }

  const showInfo = (message: string, title?: string, duration?: number) => {
    return showToast({ type: 'info', message, title, duration })
  }

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    closeToast,
    ToastManager: () => <ToastManager toasts={toasts} onClose={closeToast} />
  }
} 