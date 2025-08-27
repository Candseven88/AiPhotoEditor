"use client"

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const prefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false
    const initialDark = stored ? stored === 'dark' : prefersDark
    setIsDark(initialDark)
    document.documentElement.classList.toggle('dark', initialDark)
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-orange-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 shadow-sm hover:shadow transition"
    >
      {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
    </button>
  )
} 