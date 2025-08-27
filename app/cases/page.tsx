'use client'

import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import BeforeAfterSlider from '../components/BeforeAfterSlider'

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      {/* 导航栏 */}
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
              Nano Banana AI
            </span>
            <br />
            <span className="text-3xl md:text-4xl text-gray-700">
              Before & After Gallery
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
            Drag the slider handle to compare original images with AI-enhanced results. 
            Experience the power of our lightweight image AI technology transforming ordinary photos into extraordinary works of art.
          </p>
        </motion.div>

        {/* 案例展示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Interactive Image Comparisons
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use the slider handle to compare original images with AI-enhanced results
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
              beforeImage="/cases/红色福特重点车辆在白天的蓝色天空下的沙子上驾驶.jpg"
              afterImage="/cases/红色福特重点车辆在白天的蓝色天空下的沙子上驾驶-2.png"
              height="h-64 md:h-80"
              beforeLabel="Original"
              afterLabel="Enhanced"
            />
            <BeforeAfterSlider
              beforeImage="/cases/黑色道奇challenger Coupe.jpg"
              afterImage="/cases/黑色道奇challenger Coupe-在云端.png"
              height="h-64 md:h-80"
              beforeLabel="Original"
              afterLabel="Enhanced"
            />
            <BeforeAfterSlider
              beforeImage="/cases/Baby Saja.jpg"
              afterImage="/cases/Baby_Saja-Ciga.png"
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
            <BeforeAfterSlider
              beforeImage="/cases/在水中游泳的白色monokini的女人.jpg"
              afterImage="/cases/在水中游泳的白色monokini的女人-火山.png"
              height="h-64 md:h-80"
              beforeLabel="Original"
              afterLabel="Enhanced"
            />
          </div>
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