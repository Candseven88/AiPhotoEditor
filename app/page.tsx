'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, ImageIcon, Sparkles, Palette, Home, Zap, ArrowRight, Star, Users, Clock, User, LogIn } from 'lucide-react'
import ImageGenerator from './components/ImageGenerator'
import ImageToImageGenerator from './components/ImageToImageGenerator'
import CaseShowcase from './components/CaseShowcase'
import UsernameToImageGenerator from './components/UsernameToImageGenerator'
import BeforeAfterSlider from './components/BeforeAfterSlider'
import Navigation from './components/Navigation'
import LoginForm from '../src/components/auth/LoginForm'
import SignupForm from '../src/components/auth/SignupForm'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'username-to-image' | 'text-to-image' | 'image-to-image'>('username-to-image')
  const [showAuth, setShowAuth] = useState<'login' | 'signup' | null>(null)

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
            <div className="flex items-center justify-center mb-4">
              <Home className="w-8 h-8 text-orange-500 mr-3" />
              <h1 className="text-6xl md:text-7xl font-bold">
                <span className="text-orange-500">NanoBanana</span>
                <span className="text-gray-800"> AI</span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Transform your ideas into stunning visuals with our advanced AI image generation platform.
            </p>
            
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Create personalized avatars, generate images from text, and transform photos with cutting-edge AI technology.
            </p>

            {/* 认证按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <motion.button
                onClick={() => setShowAuth('login')}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </motion.button>
              
              <motion.button
                onClick={() => setShowAuth('signup')}
                className="flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl border-2 border-orange-500 hover:bg-orange-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-5 h-5 mr-2" />
                Create Account
              </motion.button>
            </div>

            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                <span className="text-gray-800">Start Creating</span>
                <span className="text-orange-500"> Now</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Choose your preferred AI generation method and bring your ideas to life.
              </p>
            </div>
          </motion.div>
        </section>

        {/* 功能特性 */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
              Why Choose NanoBanana AI?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 主要功能区域 */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
              AI Generation Tools
            </h2>

            {/* 标签页导航 */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'username-to-image' | 'text-to-image' | 'image-to-image')}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* 标签页内容 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-orange-100">
              <AnimatePresence mode="wait">
                {activeTab === 'username-to-image' && (
                  <motion.div
                    key="username-to-image"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <UsernameToImageGenerator />
                  </motion.div>
                )}
                
                {activeTab === 'text-to-image' && (
                  <motion.div
                    key="text-to-image"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageGenerator />
                  </motion.div>
                )}
                
                {activeTab === 'image-to-image' && (
                  <motion.div
                    key="image-to-image"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageToImageGenerator />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        {/* 案例展示 */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CaseShowcase />
          </motion.div>
        </section>

        {/* 前后对比滑块 */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <BeforeAfterSlider 
              beforeImage="/cases/Baby Saja.jpg"
              afterImage="/cases/Baby Saja-Ciga.png"
              beforeLabel="Original"
              afterLabel="AI Enhanced"
            />
          </motion.div>
        </section>
      </div>

      {/* 认证模态框 */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <button
                onClick={() => setShowAuth(null)}
                className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                ×
              </button>
              
              {showAuth === 'login' && <LoginForm />}
              {showAuth === 'signup' && <SignupForm />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 