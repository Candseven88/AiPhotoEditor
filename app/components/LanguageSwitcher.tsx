'use client'

import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Globe, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
]

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [currentLocale, setCurrentLocale] = useState('en')
  const [mounted, setMounted] = useState(false)

  // 确保只在客户端运行
  useEffect(() => {
    setMounted(true)
  }, [])

  // 检测当前语言
  useEffect(() => {
    if (!mounted) return
    
    const pathSegments = pathname.split('/')
    const localeFromPath = pathSegments[1]
    
    // 如果路径以 /ja 开头，则是日语
    if (localeFromPath === 'ja') {
      setCurrentLocale('ja')
    } else {
      // 否则默认为英语（包括根路径和其他无前缀路径）
      setCurrentLocale('en')
    }
  }, [pathname, mounted])

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]

  // 防止SSR水合不匹配
  if (!mounted) {
    return (
      <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/50 border border-gray-200/50 backdrop-blur-sm min-w-[120px]">
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">English</span>
      </div>
    )
  }

  const switchLanguage = (newLocale: string) => {
    setCurrentLocale(newLocale)
    setIsOpen(false)
    
    let newPath: string
    
    if (newLocale === 'en') {
      // 切换到英语：移除语言前缀
      if (pathname.startsWith('/ja')) {
        // 从日语切换到英语
        newPath = pathname.slice(3) || '/'
      } else {
        // 已经是英语，保持不变
        newPath = pathname
      }
    } else {
      // 切换到其他语言：添加语言前缀
      if (pathname.startsWith('/ja')) {
        // 从一种非英语语言切换到另一种
        newPath = `/${newLocale}${pathname.slice(3)}`
      } else {
        // 从英语切换到其他语言
        newPath = `/${newLocale}${pathname === '/' ? '' : pathname}`
      }
    }
    
    router.push(newPath)
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-full hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4 text-orange-600" />
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage.flag} {currentLanguage.name}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-orange-600" />
        </motion.div>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          y: isOpen ? 0 : -10, 
          scale: isOpen ? 1 : 0.95 
        }}
        transition={{ duration: 0.2 }}
        className={`absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl border border-orange-100 overflow-hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {languages.map((language) => (
          <motion.button
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors duration-150 flex items-center space-x-3 ${
              currentLocale === language.code ? 'bg-orange-50 text-orange-700' : 'text-gray-700'
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="font-medium">{language.name}</span>
            {currentLocale === language.code && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2 h-2 bg-orange-500 rounded-full ml-auto"
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
} 