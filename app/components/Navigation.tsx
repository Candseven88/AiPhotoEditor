'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Sparkles,
  Wand2,
  Palette,
  Menu,
  X,
  Home,
  BookOpen,
  Zap,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '../../lib/use-translation'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t, locale } = useTranslation()

  // 生成带语言前缀的链接
  const getLocalizedHref = (href: string) => {
    return `/${locale}${href}`
  }

  const navigationItems = [
    {
      id: 'username-to-image',
      label: t('tabs.usernameToImage'),
      icon: Sparkles,
      description: t('tabs.usernameToImageDesc'),
      type: 'tab'
    },
    {
      id: 'text-to-image',
      label: t('tabs.textToImage'),
      icon: Wand2,
      description: t('tabs.textToImageDesc'),
      type: 'tab'
    },
    {
      id: 'image-to-image',
      label: t('tabs.imageToImage'),
      icon: Palette,
      description: t('tabs.imageToImageDesc'),
      type: 'tab'
    }
  ]

  const pageItems = [
    {
      id: 'aiphotoeditor',
      label: t('navigation.aiPhotoEditor'),
      icon: Sparkles,
      description: t('navigation.aiImageGenerationTools'),
      href: getLocalizedHref('/aiphotoeditor'),
      type: 'page'
    },
    {
      id: 'seedream',
      label: t('navigation.seedream'),
      icon: Zap,
      description: t('navigation.advancedAIImageGenerator'),
      href: getLocalizedHref('/seedream'),
      type: 'page'
    },
    {
      id: 'blog',
      label: t('navigation.blog'),
      icon: BookOpen,
      description: t('navigation.latestAIInsights'),
      href: getLocalizedHref('/blog'),
      type: 'page'
    },
    {
      id: 'about',
      label: t('navigation.about'),
      icon: Users,
      description: t('navigation.learnAboutUs'),
      href: getLocalizedHref('/about'),
      type: 'page'
    }
  ]

  // 切换功能标签
  const switchTab = (tabId: string) => {
    window.dispatchEvent(new CustomEvent('switchTab', { detail: { tabId } }))
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg flex items-center justify-center shadow-md">
                <img src="/Logo.png" alt="AI Photo Editor" className="w-6 h-6 object-contain" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold">
                <span className="gradient-text">{t('hero.title').split(' ')[0]} {t('hero.title').split(' ')[1]}</span>
                <span className="text-gray-800"> {t('hero.title').split(' ')[2]}</span>
              </h1>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href={`/${locale}`}>
              <motion.button
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-4 h-4" />
                <span className="font-medium">{t('navigation.home')}</span>
              </motion.button>
            </Link>
            
            {pageItems.map((item) => (
              <Link key={item.id} href={item.href}>
                <motion.button
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              </Link>
            ))}
            
            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-orange-100 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2">
              <Link href={`/${locale}`}>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Home className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">{t('navigation.home')}</div>
                    <div className="text-sm text-gray-500 group-hover:text-orange-500">
                      {t('navigation.backToMainPage')}
                    </div>
                  </div>
                </motion.button>
              </Link>
              
              {pageItems.map((item) => (
                <Link key={item.id} href={item.href}>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-gray-500 group-hover:text-orange-500">
                        {item.description}
                      </div>
                    </div>
                  </motion.button>
                </Link>
              ))}
              
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => switchTab(item.id)}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-gray-500 group-hover:text-orange-500">
                      {item.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
} 