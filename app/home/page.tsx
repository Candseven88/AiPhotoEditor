'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, ImageIcon, Sparkles, Palette, Home, Zap, ArrowRight, Star, Users, Clock } from 'lucide-react'
import ImageGenerator from '../components/ImageGenerator'
import ImageToImageGenerator from '../components/ImageToImageGenerator'
import CaseShowcase from '../components/CaseShowcase'
import UsernameToImageGenerator from '../components/UsernameToImageGenerator'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import Navigation from '../components/Navigation'

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

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate high-quality images in 5-10 seconds'
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Powered by advanced AI models for stunning results'
    },
    {
      icon: Users,
      title: 'User Friendly',
      description: 'Simple interface designed for everyone'
    },
    {
      icon: Clock,
      title: 'Always Available',
      description: '24/7 service with no waiting queues'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      {/* 导航栏 */}
      <Navigation />

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

      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center justify-center space-x-3 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Home className="w-10 h-10 text-orange-500" />
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                NanoBanana AI
              </h1>
            </motion.div>
            <motion.p 
              className="text-2xl md:text-3xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform your ideas into stunning visuals with our advanced AI image generation platform
            </motion.p>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Create personalized avatars, generate images from text, and transform photos with cutting-edge AI technology
            </motion.p>
          </motion.div>
        </section>

        {/* AI Generator Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Start Creating <span className="text-orange-600">Now</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your preferred AI generation method and bring your ideas to life
            </p>
          </motion.div>

          {/* 功能标签页 */}
          <motion.div 
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-1 md:p-2 border border-orange-100">
              <div className="flex space-x-1 md:space-x-2 relative">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as 'username-to-image' | 'text-to-image' | 'image-to-image')}
                      className={`relative flex-1 flex items-center justify-center space-x-1 md:space-x-3 p-2 md:p-4 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50/50'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Icon className={`w-4 h-4 md:w-6 md:h-6 transition-colors duration-200 ${isActive ? 'text-white' : 'text-orange-500'}`} />
                      <span className="font-semibold text-xs md:text-base transition-colors duration-200 hidden sm:inline">{tab.label}</span>
                      <span className="font-semibold text-xs transition-colors duration-200 sm:hidden">
                        {tab.id === 'username-to-image' ? 'Avatar' : 
                         tab.id === 'text-to-image' ? 'Text' : 'Image'}
                      </span>
                      {isActive && (
                        <motion.span 
                          layoutId="tab-indicator" 
                          className="absolute inset-0 rounded-xl -z-10 bg-gradient-to-r from-orange-500 to-yellow-500 shadow-md"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* 功能内容区域 */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="max-w-7xl mx-auto"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'username-to-image' ? (
                <motion.div
                  key="username-to-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <UsernameToImageGenerator />
                </motion.div>
              ) : activeTab === 'text-to-image' ? (
                <motion.div
                  key="text-to-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ImageGenerator />
                </motion.div>
              ) : (
                <motion.div
                  key="image-to-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ImageToImageGenerator />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-8 md:py-16">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  className="text-center p-4 md:p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* Showcase Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See <span className="text-orange-600">NanoBanana AI</span> in Action
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl text-gray-600">
                Discover how our AI transforms ordinary photos into extraordinary works of art
              </p>
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-8 border border-orange-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Powered by NanoBanana AI
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Experience the power of lightweight AI image generation and enhancement. 
                  Our advanced model delivers stunning results with incredible speed and quality.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Hero Showcase */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <CaseShowcase variant="hero" maxItems={3} />
          </motion.div>

          {/* Comparison Showcase */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Before & After Transformations
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Drag the handle to compare original images with AI-enhanced results
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <BeforeAfterSlider
                beforeImage="/cases/两名女子滑雪的照片.jpg"
                afterImage="/cases/两名女子滑雪的照片-红色.png"
                height="h-64 md:h-80"
                beforeLabel="Original"
                afterLabel="Enhanced"
              />
              <BeforeAfterSlider
                beforeImage="/cases/冬季男子雪地上滑雪.jpg"
                afterImage="/cases/冬季男子雪地上滑雪-红色.png"
                height="h-64 md:h-80"
                beforeLabel="Original"
                afterLabel="Enhanced"
              />
              <BeforeAfterSlider
                beforeImage="/cases/红色福特重点车辆在白天的蓝色天空下的沙子上驾驶.jpg"
                afterImage="/cases/红色福特重点车辆在白天的蓝色天空下的沙子上驾驶-海边.png"
                height="h-64 md:h-80"
                beforeLabel="Original"
                afterLabel="Enhanced"
              />
              <BeforeAfterSlider
                beforeImage="/cases/three girls laughing.jpg"
                afterImage="/cases/three girls laughing-in front of Mount Fuji.png"
                height="h-64 md:h-80"
                beforeLabel="Original"
                afterLabel="Enhanced"
              />
            </div>
          </motion.div>

          {/* Gallery Showcase */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Interactive Gallery
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our collection of AI-enhanced images with interactive navigation
              </p>
            </div>
            <CaseShowcase variant="carousel" maxItems={6} />
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl p-12 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of creators who are already using NanoBanana AI to bring their ideas to life
            </p>
            <motion.button
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 mx-auto hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Creating Now</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </section>
      </div>
    </div>
  )
} 