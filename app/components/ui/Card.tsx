"use client"

import { PropsWithChildren } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

type Variant = 'default' | 'glass' | 'elevated' | 'minimal' | 'gradient'
type Size = 'sm' | 'md' | 'lg' | 'xl'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  variant?: Variant
  size?: Size
  hover?: boolean
  glow?: boolean
  className?: string
}

const sizeClasses: Record<Size, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10'
}

const variantClasses: Record<Variant, string> = {
  default: 'bg-white border border-gray-200 shadow-sm',
  glass: 'glass-effect',
  elevated: 'bg-white shadow-dramatic border border-gray-100/50',
  minimal: 'bg-gray-50/50 border border-gray-100',
  gradient: 'bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200'
}

export default function Card({
  variant = 'default',
  size = 'md',
  hover = true,
  glow = false,
  className = '',
  children,
  ...rest
}: PropsWithChildren<CardProps>) {
  const baseClasses = [
    'rounded-2xl transition-all duration-300 ease-out',
    'transform-gpu',
    sizeClasses[size],
    variantClasses[variant],
    glow ? 'hover:shadow-glow' : '',
    className
  ].filter(Boolean).join(' ')

  const hoverAnimation = hover ? {
    y: -4,
    transition: { duration: 0.3, ease: 'easeOut' }
  } : {}

  const tapAnimation = hover ? {
    scale: 0.98,
    transition: { duration: 0.1, ease: 'easeOut' }
  } : {}

  return (
    <motion.div
      className={baseClasses}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      {...rest}
    >
      {children}
    </motion.div>
  )
} 