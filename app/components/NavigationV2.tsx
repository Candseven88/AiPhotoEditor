'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Sparkles,
  Wand2,
  Palette,
  Menu,
  X,
  Home,
  BookOpen,
  Zap,
  MessageCircle,
  ChevronDown,
  Info,
  Shield,
  FileText,
  MoreHorizontal
} from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '../../lib/texts'
import Image from 'next/image'

export default function NavigationV2() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isAiToolsMenuOpen, setIsAiToolsMenuOpen] = useState(false)
  const { t } = useTranslation()
  const moreMenuRef = useRef<HTMLDivElement>(null)
  const aiToolsMenuRef = useRef<HTMLDivElement>(null)

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false)
      }
      if (aiToolsMenuRef.current && !aiToolsMenuRef.current.contains(event.target as Node)) {
        setIsAiToolsMenuOpen(false)
      }
    }

    if (isMoreMenuOpen || isAiToolsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMoreMenuOpen, isAiToolsMenuOpen])

  // 简化链接生成（不再需要多语言前缀）
  const getLocalizedHref = (href: string) => {
    return href
  }

  // AI功能页面 - 归类到AI Tools下拉菜单
  const aiToolsItems = [
    {
      id: 'aiphotoeditor',
      label: t('navigation.aiPhotoEditor'),
      icon: Sparkles,
      description: 'Professional AI image editor with 3-in-1 tools',
      href: getLocalizedHref('/aiphotoeditor'),
    },
    {
      id: 'seedream',
      label: t('navigation.seedream'),
      icon: Zap,
      description: 'Advanced 4K AI image generator',
      href: getLocalizedHref('/seedream'),
    },
    {
      id: 'vheer',
      label: 'Vheer AI',
      icon: Wand2,
      description: t('navigation.vheerDesc'),
      href: getLocalizedHref('/vheer'),
    }
  ]

  // 其他页面 - 收拢到"更多"菜单
  const secondaryPageItems = [
    {
      id: 'blog',
      label: t('navigation.blog'),
      icon: BookOpen,
      description: t('navigation.blogDesc'),
      href: getLocalizedHref('/blog'),
    },
    {
      id: 'about',
      label: t('navigation.about'),
      icon: Info,
      description: t('navigation.aboutDesc'),
      href: getLocalizedHref('/about'),
    },
    {
      id: 'privacy',
      label: t('navigation.privacy'),
      icon: Shield,
      description: t('navigation.privacyDesc'),
      href: getLocalizedHref('/privacy'),
    },
    {
      id: 'terms',
      label: t('navigation.terms'),
      icon: FileText,
      description: t('navigation.termsDesc'),
      href: getLocalizedHref('/terms'),
    }
  ]

  const feedbackItem = {
    id: 'feedback',
    label: t('navigation.feedback'),
    icon: MessageCircle,
    description: t('navigation.feedbackDesc'),
    href: 'mailto:candseven2015@gmail.com?subject=Feedback for AI Photo Editor'
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - 简化 */}
          <Link href={getLocalizedHref('/')} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg flex items-center justify-center shadow-md">
              <Image src="/Logo.png" alt="AI Photo Editor" width={24} height={24} className="object-contain" />
            </div>
            <div className="text-xl font-bold">
              <span className="gradient-text">{t('hero.title').split(' ')[0]} {t('hero.title').split(' ')[1]}</span>
              <span className="text-gray-800"> {t('hero.title').split(' ')[2]}</span>
            </div>
          </Link>

          {/* Desktop Navigation - 简化动画 */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href={getLocalizedHref('/')}>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200">
                <Home className="w-4 h-4" />
                <span className="font-medium">{t('navigation.home')}</span>
              </button>
            </Link>
            
            {/* AI Tools dropdown menu */}
            <div className="relative" ref={aiToolsMenuRef}>
              <button
                onClick={() => setIsAiToolsMenuOpen(!isAiToolsMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
              >
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">AI Tools</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isAiToolsMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* AI Tools dropdown content */}
              {isAiToolsMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-md border border-orange-100 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {aiToolsItems.map((item) => (
                    <Link key={item.id} href={item.href}>
                      <button
                        onClick={() => setIsAiToolsMenuOpen(false)}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
                      >
                        <item.icon className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500">
                            {item.description}
                          </div>
                        </div>
                      </button>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* More dropdown menu - 简化 */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
              >
                <MoreHorizontal className="w-4 h-4" />
                <span className="font-medium">{t('navigation.more')}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown menu - 简化动画 */}
              {isMoreMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-md border border-orange-100 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {secondaryPageItems.map((item) => (
                    <Link key={item.id} href={item.href}>
                      <button
                        onClick={() => setIsMoreMenuOpen(false)}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
                      >
                        <item.icon className="w-4 h-4" />
                        <div className="text-left">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500">
                            {item.description}
                          </div>
                        </div>
                      </button>
                    </Link>
                  ))}
                  
                  <div className="border-t border-orange-100 my-2"></div>
                  
                  {/* Feedback in dropdown */}
                  <a
                    href={feedbackItem.href}
                    onClick={() => setIsMoreMenuOpen(false)}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
                  >
                    <feedbackItem.icon className="w-4 h-4" />
                    <div className="text-left">
                      <div className="font-medium">{feedbackItem.label}</div>
                      <div className="text-xs text-gray-500">
                        {feedbackItem.description}
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            {/* 语言切换器已移除 */}
          </div>

          {/* Mobile Menu Button - 简化 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - 简化动画 */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-100 animate-in slide-in-from-top duration-200">
            <div className="space-y-2">
              <Link href={getLocalizedHref('/')}>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">{t('navigation.home')}</span>
                </button>
              </Link>

              {/* AI Tools Section in Mobile */}
              <div className="px-4 py-2">
                <div className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Tools
                </div>
                {aiToolsItems.map((item) => (
                  <Link key={item.id} href={item.href}>
                    <button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200 ml-2"
                    >
                      <item.icon className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </button>
                  </Link>
                ))}
              </div>

              <div className="border-t border-orange-100 my-2"></div>

              {/* Other Pages */}
              {secondaryPageItems.map((item) => (
                <Link key={item.id} href={item.href}>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </Link>
              ))}

              <div className="border-t border-orange-100 my-2"></div>

              <a
                href={feedbackItem.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
              >
                <feedbackItem.icon className="w-5 h-5" />
                <span className="font-medium">{feedbackItem.label}</span>
              </a>

              <div className="pt-4">
                {/* 语言切换器已移除 */}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 