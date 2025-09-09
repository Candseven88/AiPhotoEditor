'use client'

import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { 
  ChevronDown, 
  User, 
  Crown, 
  Settings, 
  LogOut,
  Sparkles,
  Wand2,
  Palette,
  Menu,
  X,
  Home,
  Image as ImageIcon,
  Users,
  FileText,
  HelpCircle,
  Zap,
  Award
} from 'lucide-react'
import Link from 'next/link'

export default function Navigation() {
  const { data: session, status } = useSession()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const userMenuRef = useRef<HTMLDivElement>(null)
  const featuresMenuRef = useRef<HTMLDivElement>(null)
  const moreMenuRef = useRef<HTMLDivElement>(null)

  // 关闭菜单当点击外部
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
      if (featuresMenuRef.current && !featuresMenuRef.current.contains(event.target as Node)) {
        setShowFeaturesMenu(false)
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const scrollToSection = (sectionId: string, tabId?: string) => {
    // 关闭菜单
    setShowFeaturesMenu(false)
    setIsMobileMenuOpen(false)
    
    // 如果在首页，直接滚动到指定区域
    if (window.location.pathname === '/') {
      // 如果指定了 tabId，通过事件通知主页面切换标签
      if (tabId) {
        const event = new CustomEvent('switchTab', { detail: { tabId } })
        window.dispatchEvent(event)
      }
      
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, tabId ? 300 : 0) // 如果切换了标签，延迟一下再滚动
    } else {
      // 如果不在首页，先跳转到首页，然后滚动
      const url = tabId ? `/?tab=${tabId}#${sectionId}` : `/#${sectionId}`
      window.location.href = url
    }
  }

  const featuresMenuItems = [
    {
      title: 'Username to Image',
      description: 'Generate avatars from usernames',
      icon: Sparkles,
      onClick: () => scrollToSection('ai-generation', 'username-to-image'),
      gradient: 'from-orange-500 to-yellow-500'
    },
    {
      title: 'Text to Image',
      description: 'Create images from text descriptions',
      icon: Wand2,
      onClick: () => scrollToSection('ai-generation', 'text-to-image'),
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Image to Image',
      description: 'Transform existing images',
      icon: Palette,
      onClick: () => scrollToSection('ai-generation', 'image-to-image'),
      gradient: 'from-green-500 to-teal-500'
    }
  ]

  const moreMenuItems = [
    {
      title: 'About',
      description: 'Learn about NanoBanana',
      icon: Users,
      href: '/about'
    },
    {
      title: 'Cases',
      description: 'View our success stories',
      icon: ImageIcon,
      href: '/cases'
    },
    {
      title: 'Blog',
      description: 'Read our latest articles',
      icon: FileText,
      href: '/blog'
    },
    {
      title: 'FAQ',
      description: 'Frequently asked questions',
      icon: HelpCircle,
      href: '/faq'
    },
    {
      title: 'Testimonials',
      description: 'What our users say',
      icon: Award,
      href: '/testimonials'
    }
  ]

  if (status === 'loading') {
    return (
      <nav className="glass-effect-strong border-b border-white/20 shadow-xl fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="glass-effect-strong border-b border-white/20 shadow-xl fixed top-0 left-0 right-0 z-50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand - 改进版本 */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              />
              <div className="relative bg-white rounded-xl p-2 shadow-lg">
                <img 
                  src="/Logo.png" 
                  alt="NanoBanana Logo" 
                  className="w-8 h-8 rounded-lg"
                />
              </div>
            </motion.div>
            <motion.span 
              className="text-xl font-bold gradient-text group-hover:scale-105 transition-transform duration-200"
              whileHover={{ scale: 1.02 }}
            >
              NanoBanana
            </motion.span>
          </Link>

          {/* Desktop Navigation - 改进版本 */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Features Dropdown - 现代化设计 */}
            <div className="relative" ref={featuresMenuRef}>
              <motion.button
                onClick={() => setShowFeaturesMenu(!showFeaturesMenu)}
                className="flex items-center space-x-2 px-4 py-2.5 text-gray-700 hover:text-orange-600 hover:bg-orange-50/50 rounded-xl transition-all duration-200 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap className="w-4 h-4" />
                <span>Features</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFeaturesMenu ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {showFeaturesMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-3 w-96 glass-effect-strong rounded-2xl shadow-2xl border border-white/30 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                          AI Image Generation
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {featuresMenuItems.map((item, index) => (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <button
                              onClick={item.onClick}
                              className="flex items-start space-x-3 p-3 rounded-xl hover:bg-orange-50/50 transition-all duration-200 group w-full text-left"
                            >
                              <div className={`w-10 h-10 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                                <item.icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                                  {item.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* More Dropdown - 现代化设计 */}
            <div className="relative" ref={moreMenuRef}>
              <motion.button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="flex items-center space-x-2 px-4 py-2.5 text-gray-700 hover:text-orange-600 hover:bg-orange-50/50 rounded-xl transition-all duration-200 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>More</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMoreMenu ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {showMoreMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-3 w-72 glass-effect-strong rounded-2xl shadow-2xl border border-white/30 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="space-y-1">
                        {moreMenuItems.map((item, index) => (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={item.href}
                              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-orange-50/50 transition-all duration-200 group"
                              onClick={() => setShowMoreMenu(false)}
                            >
                              <item.icon className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                              <div className="flex-1">
                                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                                  {item.title}
                                </span>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu - 现代化设计 */}
            {session ? (
              <div className="relative" ref={userMenuRef}>
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="max-w-32 truncate">{session.user?.name || session.user?.email}</span>
                  {session.user && (session.user as any).subscription_plan && (session.user as any).subscription_plan !== 'free' && (
                    <Crown className="w-4 h-4 text-yellow-300" />
                  )}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full right-0 mt-3 w-72 glass-effect-strong rounded-2xl shadow-2xl border border-white/30 overflow-hidden"
                    >
                      <div className="p-6">
                        {/* User Info Card */}
                        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-800 truncate">
                                {session.user?.name || session.user?.email}
                              </p>
                              <div className="flex items-center gap-4 mt-1">
                                <p className="text-xs text-orange-600 font-medium">
                                  💳 {(session.user as any).credits_balance || 0} Credits
                                </p>
                                <p className="text-xs text-yellow-600 font-medium">
                                  ⭐ {(session.user as any).subscription_plan || 'Free'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="space-y-1">
                          <Link
                            href="/dashboard"
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-orange-50/50 transition-all duration-200 group"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Home className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                              Dashboard
                            </span>
                          </Link>
                          
                          <motion.button
                            onClick={() => {
                              setShowUserMenu(false)
                              handleSignOut()
                            }}
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 transition-all duration-200 group w-full text-left"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-500 transition-colors" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                              Sign Out
                            </span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2.5 text-gray-700 hover:text-orange-600 hover:bg-orange-50/50 rounded-xl transition-all duration-200 font-medium"
                >
                  Sign In
                </Link>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                  >
                    Create Account
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button - 改进版本 */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-gray-700 hover:text-orange-600 hover:bg-orange-50/50 rounded-xl transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - 完全重新设计 */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden mt-6 glass-effect rounded-2xl overflow-hidden"
            >
              <div className="p-6 space-y-6">
                {/* Features Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Features
                  </h3>
                  <div className="space-y-2">
                    {featuresMenuItems.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + index * 0.05 }}
                      >
                        <button
                          onClick={item.onClick}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-orange-50/50 transition-all duration-200 w-full text-left"
                        >
                          <div className={`w-8 h-8 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center`}>
                            <item.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* More Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    More
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {moreMenuItems.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-orange-50/50 transition-all duration-200 text-center"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon className="w-5 h-5 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">{item.title}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* User Section */}
                {session ? (
                  <motion.div
                    className="border-t border-white/20 pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">
                            {session.user?.name || session.user?.email}
                          </p>
                          <p className="text-xs text-orange-600">
                            Credits: {(session.user as any).credits_balance || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-orange-50/50 transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Home className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          handleSignOut()
                        }}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 transition-all duration-200 w-full text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-medium text-gray-700">Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    className="border-t border-white/20 pt-6 space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link
                      href="/auth/signin"
                      className="block w-full px-4 py-3 text-center text-gray-700 hover:text-orange-600 hover:bg-orange-50/50 rounded-xl transition-all duration-200 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block w-full px-4 py-3 text-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
} 