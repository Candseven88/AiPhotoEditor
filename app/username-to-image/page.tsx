'use client'

import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import UsernameToImageGenerator from '../components/UsernameToImageGenerator'

export default function UsernameToImagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8 pt-24">
        {/* 页面标题 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
              UserName to Image
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
            Generate personalized avatars from your username or nickname using our advanced AI technology
          </p>
        </motion.div>

        {/* 功能说明 */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Avatars</h3>
              <p className="text-gray-600">
                Create unique avatars that reflect the meaning and vibe of your username
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Generate high-quality avatars in seconds with our optimized AI model
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💾</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Download</h3>
              <p className="text-gray-600">
                Download your generated avatars instantly for use across all platforms
              </p>
            </div>
          </div>
        </motion.div>

        {/* 生成器组件 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <UsernameToImageGenerator />
        </motion.div>
      </div>
    </div>
  )
} 