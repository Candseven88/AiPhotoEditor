"use client"

import { motion } from 'framer-motion'
import { ImageIcon, Upload, AlertCircle, CheckCircle } from 'lucide-react'

type IconType = 'image' | 'upload' | 'error' | 'success' | 'custom'

interface EmptyStateProps {
  icon?: IconType
  customIcon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

const iconColors = {
  image: 'text-gray-400',
  upload: 'text-orange-400',
  error: 'text-red-400',
  success: 'text-green-400',
  custom: 'text-gray-400'
}

const backgroundColors = {
  image: 'bg-gray-100',
  upload: 'bg-orange-100',
  error: 'bg-red-100',
  success: 'bg-green-100',
  custom: 'bg-gray-100'
}

export default function EmptyState({
  icon = 'image',
  customIcon,
  title,
  description,
  action,
  className = ''
}: EmptyStateProps) {
  // 简化的图标渲染逻辑
  const renderIcon = () => {
    if (icon === 'custom' && customIcon) {
      return customIcon
    }
    
    // 直接使用图标组件，避免动态引用
    let IconComponent = ImageIcon // 默认图标
    
    switch (icon) {
      case 'upload':
        IconComponent = Upload
        break
      case 'error':
        IconComponent = AlertCircle
        break
      case 'success':
        IconComponent = CheckCircle
        break
      case 'image':
      default:
        IconComponent = ImageIcon
        break
    }
    
    return <IconComponent className={`w-10 h-10 ${iconColors[icon]}`} />
  }

  return (
    <motion.div
      className={`flex flex-col items-center justify-center text-center py-16 px-8 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* 图标区域 */}
      <motion.div
        className={`
          relative w-24 h-24 ${backgroundColors[icon]} rounded-full 
          flex items-center justify-center mb-6 overflow-hidden
        `}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: 'spring', bounce: 0.4 }}
      >
        {/* 背景动画 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* 图标 */}
        <div className="relative z-10">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {renderIcon()}
          </motion.div>
        </div>

        {/* 装饰性圆圈 */}
        <motion.div
          className="absolute inset-0 border-2 border-current opacity-20 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </motion.div>

      {/* 标题 */}
      <motion.h3
        className="text-xl font-semibold text-gray-800 mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {title}
      </motion.h3>

      {/* 描述 */}
      {description && (
        <motion.p
          className="text-gray-600 max-w-md mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {description}
        </motion.p>
      )}

      {/* 操作按钮 */}
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  )
} 