"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'

type Theme = 'light' | 'dark' | 'system'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.remove('light', 'dark')
      root.classList.add(systemTheme)
    } else {
      root.classList.remove('light', 'dark')
      root.classList.add(theme)
    }
    
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-gray-100 animate-pulse" />
    )
  }

  const themes: { value: Theme; icon: typeof Sun; label: string; gradient: string }[] = [
    {
      value: 'light',
      icon: Sun,
      label: 'Light',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      value: 'dark',
      icon: Moon,
      label: 'Dark',
      gradient: 'from-blue-600 to-purple-700'
    },
    {
      value: 'system',
      icon: Monitor,
      label: 'System',
      gradient: 'from-gray-400 to-gray-600'
    }
  ]

  const currentTheme = themes.find(t => t.value === theme) || themes[2]

  return (
    <div className="relative">
      <motion.button
        onClick={() => {
          const currentIndex = themes.findIndex(t => t.value === theme)
          const nextIndex = (currentIndex + 1) % themes.length
          setTheme(themes[nextIndex].value)
        }}
        className="relative w-10 h-10 rounded-xl glass-effect border border-white/30 flex items-center justify-center transition-all duration-300 hover:shadow-lg group overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Current theme: ${currentTheme.label}. Click to cycle themes.`}
      >
        {/* 背景渐变动画 */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
          layoutId="theme-bg"
        />

        {/* 图标动画 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeInOut",
              type: "spring",
              stiffness: 200
            }}
            className="relative z-10"
          >
            <currentTheme.icon className="w-5 h-5 text-gray-600 group-hover:text-gray-700 transition-colors" />
          </motion.div>
        </AnimatePresence>

        {/* 闪光效果 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* 工具提示 */}
      <motion.div
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full"
        initial={{ opacity: 0, y: -10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="glass-effect-strong px-3 py-2 rounded-lg text-xs font-medium text-gray-700 whitespace-nowrap shadow-lg border border-white/30">
          {currentTheme.label} Theme
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border border-white/30 rotate-45" />
        </div>
      </motion.div>
    </div>
  )
} 