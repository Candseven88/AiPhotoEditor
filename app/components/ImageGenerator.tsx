'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, Download, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react'

interface GenerationRequest {
  prompt: string
  size: string
}

interface GenerationResponse {
  artifacts: Array<{
    url?: string
    base64?: string
  }>
}

const sizeOptions = [
  { label: '1024x1024', value: '1024x1024' },
  { label: '768x1344', value: '768x1344' },
  { label: '864x1152', value: '864x1152' },
  { label: '1344x768', value: '1344x768' },
  { label: '1152x864', value: '1152x864' },
  { label: '1440x720', value: '1440x720' },
  { label: '720x1440', value: '720x1440' }
]

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState('')
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [error, setError] = useState('')

  // 生成图像的核心函数
  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setIsGenerating(true)
    setError('')
    setGenerationProgress('Initializing generation...')

    try {
      const request: GenerationRequest = {
        prompt: prompt.trim(),
        size: selectedSize.value
      }

      setGenerationProgress('Sending request to BigModel API...')

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate image')
      }

      setGenerationProgress('Processing response...')
      const data: GenerationResponse = await response.json()

      if (data.artifacts && data.artifacts.length > 0) {
        // 处理 BigModel 响应 - 图像以 URL 形式返回
        const newImages = data.artifacts.map(artifact => {
          if (artifact.url) {
            return artifact.url // 直接使用 URL
          } else if (artifact.base64) {
            return `data:image/png;base64,${artifact.base64}` // 兼容 base64 格式
          }
          return null
        }).filter(Boolean) as string[]
        
        setGeneratedImages(prev => [...newImages, ...prev])
        setError('')
      } else {
        throw new Error('No images generated')
      }
    } catch (error: any) {
      setError(error.message || 'Failed to generate image')
    } finally {
      setIsGenerating(false)
      setGenerationProgress('')
    }
  }

  // 下载图像
  const downloadImage = (imageData: string, index: number) => {
    const link = document.createElement('a')
    link.href = imageData
    link.download = `nanobanana-generated-${Date.now()}-${index}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 快速提示词建议
  const quickPrompts = [
    'A cute little cat',
    'Beautiful sunset landscape',
    'Peaceful lake reflection'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* 标题区域 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            NanoBanana AI Image Generator
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform your ideas into stunning images with BigModel Cogview-3
          </motion.p>
        </motion.div>

        {/* 主要内容区域 - 左右布局 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* 左侧：提示词输入和生成控制 */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-orange-100"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="space-y-6">
              {/* 提示词输入 */}
              <div>
                <motion.label 
                  className="block text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2"
                  whileHover={{ x: 5 }}
                >
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  <span>Prompt</span>
                </motion.label>
                <motion.textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="w-full h-40 px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200/30 focus:border-orange-400 resize-none transition-all duration-200 text-lg"
                  whileFocus={{ scale: 1.02 }}
                />
                
                {/* 快速提示词建议 */}
                <div className="mt-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>💡</span>
                    <span className="font-medium">Quick:</span>
                    {quickPrompts.map((suggestion, index) => (
                      <motion.button
                        key={suggestion}
                        onClick={() => setPrompt(suggestion)}
                        className="px-2 py-1 bg-gradient-to-r from-orange-100 to-yellow-100 hover:from-orange-200 hover:to-yellow-200 rounded-md text-xs font-medium text-orange-700 border border-orange-200 transition-all duration-200"
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 尺寸选择 */}
              <div>
                <motion.label 
                  className="block text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2"
                  whileHover={{ x: 5 }}
                >
                  <ImageIcon className="w-5 h-5 text-orange-500" />
                  <span>Image Size</span>
                </motion.label>
                <select
                  value={selectedSize.value}
                  onChange={(e) => {
                    const option = sizeOptions.find(opt => opt.value === e.target.value)
                    if (option) setSelectedSize(option)
                  }}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200/30 focus:border-orange-400 transition-all duration-200 text-lg"
                >
                  {sizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-600 mt-3">
                  Recommended sizes for best results
                </p>
              </div>

              {/* 模型信息提示 */}
              <div className="pt-2">
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  <span className="font-medium text-orange-600">Nano Banana Model</span>
                  <br />
                  Fast high-quality image generation, supports English and Chinese prompts, generates in 5-10 seconds
                </p>
              </div>



              {/* 生成按钮 */}
              <div className="pt-4">
                <motion.button
                  onClick={generateImage}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  whileHover={{ scale: isGenerating ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="w-6 h-6" />
                      </motion.div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-6 h-6" />
                      <span>Generate Image</span>
                    </>
                  )}
                </motion.button>
                
                {/* 进度指示器 */}
                <AnimatePresence>
                  {isGenerating && generationProgress && (
                    <motion.div 
                      className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-xl"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-orange-700 font-medium text-center">{generationProgress}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* 右侧：生成的图像展示区域 */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-orange-100 min-h-[700px]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="h-full flex flex-col">
              <motion.h2 
                className="text-2xl font-bold text-gray-900 mb-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                Generated Images
              </motion.h2>
              
              {/* 图像展示区域 */}
              <div className="flex-1">
                {generatedImages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <ImageIcon className="w-24 h-24 mx-auto mb-4 text-orange-200" />
                      <p className="text-lg">No images generated yet</p>
                      <p className="text-sm">Enter a prompt and click generate to create your first image</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {generatedImages.map((image, index) => (
                      <motion.div
                        key={index}
                        className="bg-white rounded-xl overflow-hidden shadow-lg border border-orange-100"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        {/* 图像预览 */}
                        <div className="relative group bg-gray-50">
                          <motion.img
                            src={image}
                            alt={`Generated image ${index + 1}`}
                            className="w-full h-auto max-h-96 object-contain rounded-t-xl"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            onLoad={(e) => {
                              // 图片加载成功后的处理
                              const target = e.target as HTMLImageElement
                              target.style.opacity = '1'
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmN2VkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2Y5NzMxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIExvYWQgRXJyb3I8L3RleHQ+PC9zdmc+'
                            }}
                            style={{ 
                              minHeight: '200px',
                              opacity: 0,
                              transition: 'opacity 0.3s ease-in-out'
                            }}
                          />
                          
                          {/* 悬停时的下载按钮 */}
                          <motion.div 
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          >
                            <motion.button
                              onClick={() => downloadImage(image, index)}
                              className="bg-white text-orange-700 px-4 py-2 rounded-lg shadow-xl hover:bg-orange-50 transition-colors font-semibold flex items-center space-x-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Download className="w-4 h-4" />
                              <span>Download</span>
                            </motion.button>
                          </motion.div>
                        </div>
                        
                        {/* 图像信息 */}
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-600 font-medium">
                              Image #{index + 1}
                            </span>
                            <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                              {selectedSize.label}
                            </span>
                          </div>
                          
                          {/* 下载按钮 */}
                          <motion.button
                            onClick={() => downloadImage(image, index)}
                            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center font-semibold text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Image
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 错误显示 */}
        <AnimatePresence>
          {error && (
            <motion.div 
              className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-red-700 text-center font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </div>
  )
} 