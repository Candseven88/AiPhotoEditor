"use client"

import { PropsWithChildren } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline'

interface GradientButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  size?: Size
  variant?: Variant
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  shine?: boolean
  glow?: boolean
}

const sizeClasses: Record<Size, string> = {
  xs: 'px-3 py-2 text-xs font-medium',
  sm: 'px-4 py-2.5 text-sm font-medium',
  md: 'px-6 py-3 text-base font-semibold',
  lg: 'px-8 py-4 text-lg font-semibold',
  xl: 'px-10 py-5 text-xl font-bold'
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white shadow-lg hover:shadow-xl border-0',
  secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300 border border-gray-300 shadow-md',
  success: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl border-0',
  warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-xl border-0',
  danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl border-0',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 border-0 shadow-none',
  outline: 'bg-transparent text-orange-600 border-2 border-orange-300 hover:bg-orange-50 hover:border-orange-400 shadow-sm'
}

const glowClasses: Record<Variant, string> = {
  primary: 'hover:shadow-glow',
  secondary: 'hover:shadow-soft',
  success: 'hover:shadow-green-lg',
  warning: 'hover:shadow-yellow-lg',
  danger: 'hover:shadow-red-lg',
  ghost: '',
  outline: 'hover:shadow-orange-lg'
}

export default function GradientButton({
  size = 'md',
  variant = 'primary',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  shine = false,
  glow = false,
  className = '',
  children,
  disabled,
  ...rest
}: PropsWithChildren<GradientButtonProps>) {
  const isDisabled = disabled || loading

  const baseClasses = [
    'relative overflow-hidden rounded-xl font-medium transition-all duration-300 ease-out',
    'transform-gpu focus:outline-none focus:ring-4 focus:ring-orange-100 focus:ring-offset-2',
    'active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    'flex items-center justify-center gap-2',
    fullWidth ? 'w-full' : 'inline-flex',
    sizeClasses[size],
    variantClasses[variant],
    glow && !isDisabled ? glowClasses[variant] : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <motion.button
      className={baseClasses}
      whileHover={isDisabled ? {} : { 
        scale: 1.02,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      whileTap={isDisabled ? {} : { 
        scale: 0.98,
        transition: { duration: 0.1, ease: 'easeOut' }
      }}
      disabled={isDisabled}
      {...rest}
    >
      {/* 闪光效果 */}
      {shine && !isDisabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut'
          }}
        />
      )}

      {/* 内容区域 */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        
        <span className={loading ? 'opacity-70' : ''}>
          {loading ? 'Loading...' : children}
        </span>
        
        {!loading && rightIcon ? (
          <span className="shrink-0">{rightIcon}</span>
        ) : null}
      </div>

      {/* 渐变动画覆盖层 */}
      {variant === 'primary' && !isDisabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 opacity-0 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        />
      )}
    </motion.button>
  )
} 