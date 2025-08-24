'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Grid, List, Search, Star, Download, Share2 } from 'lucide-react'
import CaseShowcase from '../components/CaseShowcase'

export default function CasesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'All Cases', count: 8 },
    { id: 'skiing', name: 'Skiing', count: 2 },
    { id: 'vehicle', name: 'Vehicle', count: 3 },
    { id: 'portrait', name: 'Portrait', count: 2 },
    { id: 'swimming', name: 'Swimming', count: 1 }
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
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
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
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Cases
            </a>
          </div>
        </div>
      </nav>

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
              Nano Banana AI
            </span>
            <br />
            <span className="text-3xl md:text-4xl text-gray-700">
              Case Studies & Examples
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
            Explore our collection of AI-enhanced images showcasing the power of our lightweight image AI technology. 
            See how nano banana ai transforms ordinary photos into extraordinary works of art.
          </p>
        </motion.div>

        {/* 搜索和筛选 */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* 搜索框 */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* 分类筛选 */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* 视图切换 */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 案例展示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <CaseShowcase variant="grid" maxItems={8} showKeywords={true} />
        </motion.div>

        {/* 技术说明 */}
        <motion.div 
          className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Does Nano Banana AI Work?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our lightweight AI image generator uses advanced machine learning algorithms to transform your images 
              with incredible speed and quality, rivaling traditional solutions like Stable Diffusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightweight & Fast</h3>
              <p className="text-gray-600">
                Experience lightning-fast image generation with our optimized nano banana ai model, 
                designed for speed without compromising quality.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced AI Technology</h3>
              <p className="text-gray-600">
                Powered by cutting-edge AI algorithms, our image generator delivers stunning results 
                that transform ordinary photos into extraordinary works of art.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Quality</h3>
              <p className="text-gray-600">
                Achieve professional-grade image enhancements with our nano banana image generator, 
                perfect for photographers, designers, and content creators.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 关键词优化区域 */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Experience the Power of Nano Banana AI
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Join thousands of users who trust our lightweight AI image generator for their creative projects. 
              Discover why nano banana ai is becoming the go-to solution for AI-powered image enhancement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Nano Banana AI</h3>
              <p className="text-sm opacity-90">Advanced AI image generation technology</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">AI Image Generation</h3>
              <p className="text-sm opacity-90">Create stunning images with AI</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Lightweight Image AI</h3>
              <p className="text-sm opacity-90">Fast and efficient processing</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Nano Banana Image Generator</h3>
              <p className="text-sm opacity-90">Professional image enhancement</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 