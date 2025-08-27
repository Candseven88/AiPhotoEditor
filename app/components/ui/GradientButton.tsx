"use client"

import { PropsWithChildren } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

type Size = 'sm' | 'md' | 'lg'

interface GradientButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  size?: Size
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const sizeClass: Record<Size, string> = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-base',
  lg: 'py-4 px-8 text-lg'
}

export default function GradientButton({
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  disabled,
  ...rest
}: PropsWithChildren<GradientButtonProps>) {
  const isDisabled = disabled || loading
  return (
    <motion.button
      className={`w-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl ${sizeClass[size]} ${className}`}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isDisabled}
      {...rest}
    >
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      <span>{loading ? 'Loading…' : children}</span>
      {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
    </motion.button>
  )
} 