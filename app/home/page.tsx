'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, ImageIcon, Sparkles, Palette, Home, Zap } from 'lucide-react'
import ImageGenerator from '../components/ImageGenerator'
import ImageToImageGenerator from '../components/ImageToImageGenerator'
import CaseShowcase from '../components/CaseShowcase'
import UsernameToImageGenerator from '../components/UsernameToImageGenerator'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'username-to-image' | 'text-to-image' | 'image-to-image'>('username-to-image')

  const tabs = [
    {
      id: 'username-to-image',
      label: 'UserName to Image',
      icon: Sparkles,
      description: 'Generate a personalized avatar from your username'
    },
    {
      id: 'text-to-image',
      label: 'Text to Image',
      icon: Wand2,
      description: 'Generate images from text descriptions'
    },
    {
      id: 'image-to-image',
      label: 'Image to Image',
      icon: Palette,
      description: 'Transform existing images with AI'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      {/* 导航栏 */}
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
          <div className="flex items-center space-x-4">
            <a 
              href="/home" 
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Home
            </a>
            <a 
              href="/text-to-image" 
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Text to Image
            </a>
            <a 
              href="/image-to-image" 
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Image to Image
            </a>
            <a 
              href="/cases" 
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Gallery
            </a>
            <a 
              href="/blog" 
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Blog
            </a>
            <a 
              href="/about" 
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              About
            </a>
          </div>
        </div>
      </nav>

      {/* 背景装饰元素 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-2xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-300/20 to-yellow-300/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 pt-20">
        {/* 主标题区域 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center justify-center space-x-3 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Home className="w-8 h-8 text-orange-500" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
              NanoBanana AI
            </h1>
          </motion.div>
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your creative AI companion for stunning image generation and transformation
          </motion.p>
          <motion.div 
            className="flex items-center justify-center space-x-2 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
          </motion.div>
        </motion.div>

        {/* 功能标签页 */}
        <motion.div 
          className="max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-1 border border-orange-100">
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'username-to-image' | 'text-to-image' | 'image-to-image')}
                    className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md' 
                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-orange-500'}`} />
                    <span className="font-medium text-sm">{tab.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* 功能内容区域 */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'username-to-image' ? (
              <motion.div
                key="username-to-image"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <UsernameToImageGenerator />
              </motion.div>
            ) : activeTab === 'text-to-image' ? (
              <motion.div
                key="text-to-image"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <ImageGenerator />
              </motion.div>
            ) : (
              <motion.div
                key="image-to-image"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <ImageToImageGenerator />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 案例展示区域 */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See <span className="text-orange-600">Nano Banana AI</span> in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our lightweight AI image generator transforms ordinary photos into extraordinary works of art. 
              Experience the power of nano banana ai technology.
            </p>
          </div>

          {/* Hero Showcase */}
          <div className="mb-16">
            <CaseShowcase variant="hero" maxItems={3} />
          </div>

          {/* Comparison Showcase */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Before & After Transformations
              </h3>
              <p className="text-lg text-gray-600">
                Compare original images with AI-enhanced versions powered by our nano banana image generator
              </p>
            </div>
            <CaseShowcase variant="comparison" maxItems={4} showKeywords={true} />
          </div>

          {/* Carousel Showcase */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Interactive Gallery
              </h3>
              <p className="text-lg text-gray-600">
                Explore our collection of AI-enhanced images with interactive carousel navigation
              </p>
            </div>
            <CaseShowcase variant="carousel" maxItems={6} />
          </div>
        </motion.div>

        {/* 底部信息 */}
        <motion.div 
          className="text-center mt-16 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-sm">
            Experience the power of AI-driven creativity with NanoBanana
          </p>
        </motion.div>
      </div>
    </div>
  )
} 