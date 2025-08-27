'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/home' && pathname === '/') return true
    return pathname === path
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navigationItems = [
    { href: '/home', label: 'Home', mobileLabel: 'Home' },
    { href: '/username-to-image', label: 'UserName to Image', mobileLabel: 'Avatar' },
    { href: '/text-to-image', label: 'Text to Image', mobileLabel: 'Text' },
    { href: '/image-to-image', label: 'Image to Image', mobileLabel: 'Image' },
    { href: '/cases', label: 'Gallery', mobileLabel: 'Gallery' },
    { href: '/blog', label: 'Blog', mobileLabel: 'Blog' },
    { href: '/about', label: 'About', mobileLabel: 'About' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src="/Logo.png" 
            alt="NanoBanana Logo" 
            className="w-8 h-8 rounded-lg"
          />
          <span className="text-xl font-bold text-gray-800">NanoBanana</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navigationItems.map((item) => (
            <a 
              key={item.href}
              href={item.href} 
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-base ${
                isActive(item.href)
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'text-orange-600 hover:text-orange-700'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg text-orange-600 hover:bg-orange-50 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-orange-100 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors text-base ${
                    isActive(item.href)
                      ? 'bg-orange-500 text-white'
                      : 'text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  {item.mobileLabel}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
} 