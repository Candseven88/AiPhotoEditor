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
  Globe
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

  const featuresMenuItems = [
    {
      title: 'Username to Image',
      description: 'Generate avatars from usernames',
      icon: Sparkles,
      href: '/',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      title: 'Text to Image',
      description: 'Create images from text descriptions',
      icon: Wand2,
      href: '/',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Image to Image',
      description: 'Transform existing images',
      icon: Palette,
      href: '/',
      color: 'from-green-500 to-teal-500'
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
      icon: Users,
      href: '/testimonials'
    }
  ]

  if (status === 'loading') {
    return (
      <nav className="bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <img 
              src="/Logo.png" 
              alt="NanoBanana Logo" 
              className="w-8 h-8 rounded-lg group-hover:scale-105 transition-transform duration-200"
            />
            <span className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
              NanoBanana
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Features Dropdown */}
            <div className="relative" ref={featuresMenuRef}>
              <button
                onClick={() => setShowFeaturesMenu(!showFeaturesMenu)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <span>Features</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFeaturesMenu ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showFeaturesMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-orange-100 overflow-hidden"
                  >
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        AI Image Generation
                      </h3>
                      <div className="space-y-2">
                        {featuresMenuItems.map((item, index) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors group"
                            onClick={() => setShowFeaturesMenu(false)}
                          >
                            <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 group-hover:text-orange-600">
                                {item.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* More Dropdown */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <span>More</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showMoreMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-orange-100 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="space-y-1">
                        {moreMenuItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors group"
                            onClick={() => setShowMoreMenu(false)}
                          >
                            <item.icon className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                            <span className="text-sm text-gray-700 group-hover:text-orange-600">
                              {item.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            {session ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">{session.user?.name || session.user?.email}</span>
                  {session.user && (session.user as any).subscription_plan && (session.user as any).subscription_plan !== 'free' && (
                    <Crown className="w-4 h-4 text-yellow-300" />
                  )}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-orange-100 overflow-hidden"
                    >
                      <div className="p-4">
                        {/* User Info */}
                        <div className="border-b border-gray-100 pb-3 mb-3">
                          <p className="text-sm font-medium text-gray-900">
                            {session.user?.name || session.user?.email}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Credits: {(session.user as any).credits_balance || 0}
                          </p>
                          <p className="text-xs text-gray-500">
                            Plan: {(session.user as any).subscription_plan || 'Free'}
                          </p>
                        </div>

                        {/* Menu Items */}
                        <div className="space-y-1">
                          <Link
                            href="/dashboard"
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors group"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Home className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                            <span className="text-sm text-gray-700 group-hover:text-orange-600">
                              Dashboard
                            </span>
                          </Link>
                          
                          <button
                            onClick={() => {
                              setShowUserMenu(false)
                              handleSignOut()
                            }}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors group w-full text-left"
                          >
                            <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-500" />
                            <span className="text-sm text-gray-700 group-hover:text-red-600">
                              Sign Out
                            </span>
                          </button>
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
                  className="px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 border-t border-orange-100 pt-4"
            >
              <div className="space-y-4">
                {/* Features Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Features
                  </h3>
                  <div className="space-y-2">
                    {featuresMenuItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center`}>
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* More Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    More
                  </h3>
                  <div className="space-y-2">
                    {moreMenuItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* User Section */}
                {session ? (
                  <div className="border-t border-orange-100 pt-4">
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                      <User className="w-5 h-5 text-orange-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {session.user?.name || session.user?.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          Credits: {(session.user as any).credits_balance || 0}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Home className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          handleSignOut()
                        }}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-gray-700">Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-orange-100 pt-4 space-y-3">
                    <Link
                      href="/auth/signin"
                      className="block w-full px-4 py-2 text-center text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block w-full px-4 py-2 text-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
} 