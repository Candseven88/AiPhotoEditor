'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Palette, Loader2, Download, ImageIcon, Lock } from 'lucide-react'
import PaymentModal from '../components/PaymentModal'
import EnvironmentIndicator from '../components/EnvironmentIndicator'

interface ImageToImageRequest {
  text_prompts: Array<{
    text: string
    weight: number
  }>
  init_image: string
}

export default function ImageToImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [error, setError] = useState('')
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [unlockedImages, setUnlockedImages] = useState<Set<number>>(new Set())
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理图像上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // 验证文件大小 (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB')
        return
      }

      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUploadedImage(result)
        setError('')
      }
      reader.readAsDataURL(file)
    }
  }

  // 移除上传的图像
  const removeUploadedImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // 生成图像
  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    if (!uploadedImage) {
      setError('Please upload an image')
      return
    }

    setIsGenerating(true)
    setError('')
    
    // 清除之前的图片和支付状态
    setGeneratedImages([])
    setUnlockedImages(new Set())

    try {
      // 转换 data URL 为 base64
      const base64Image = uploadedImage.split(',')[1]

      const request: ImageToImageRequest = {
        text_prompts: [
          { text: prompt, weight: 1.0 },
          ...(negativePrompt.trim() ? [{ text: negativePrompt, weight: -1.0 }] : [])
        ],
        init_image: base64Image
      }

      // 创建超时控制器
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 120000) // 2分钟超时

      const response = await fetch('/api/generate-image-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate image')
      }

      const data = await response.json()

      // 处理 Stability AI 的响应格式
      if (data.artifacts && data.artifacts.length > 0) {
        const newImages = data.artifacts.map((artifact: any) => 
          `data:image/png;base64,${artifact.base64}`
        )
        setGeneratedImages(prev => [...newImages, ...prev])
        setError('')
      } else {
        throw new Error('No images generated')
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setError('Request timed out. Please try again.')
      } else {
        setError(error.message || 'Failed to generate image')
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadImage = (imageData: string, index: number) => {
    if (!unlockedImages.has(index)) {
      setSelectedImageIndex(index)
      setPaymentModalOpen(true)
      return
    }
    
    try {
      // 创建下载链接
      const link = document.createElement('a')
      link.href = imageData
      link.download = `nano-banana-transformed-${Date.now()}-${index}.png`
      
      // 对于 base64 数据，需要特殊处理
      if (imageData.startsWith('data:image/')) {
        // 如果是 base64 数据，直接下载
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        // 如果是 URL，先获取图片再下载
        fetch(imageData)
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob)
            link.href = url
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
          })
          .catch(error => {
            console.error('Download failed:', error)
            alert('Download failed. Please try again.')
          })
      }
    } catch (error) {
      console.error('Download error:', error)
      alert('Download failed. Please try again.')
    }
  }

  const handlePaymentSuccess = () => {
    setUnlockedImages(prev => new Set(Array.from(prev).concat(selectedImageIndex)))
  }



  // 快速提示词建议
  const quickPrompts = [
    'Transform into anime style',
    'Make it more realistic',
    'Add fantasy elements',
    'Convert to oil painting',
    'Make it cyberpunk style',
    'Transform to watercolor'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="NanoBanana Logo" 
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-xl font-bold text-gray-800">NanoBanana</span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="/" 
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Text to Image
            </a>
            <a 
              href="/image-to-image" 
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Image to Image
            </a>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Image to Image
            </span>
            <br />
            <span className="text-2xl md:text-3xl text-gray-700">
              Transform Your Images with AI
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload an image and describe how you want to transform it. Our Nano Banana AI model will create amazing variations using optimized default parameters.
          </p>
          
          <p className="text-sm text-gray-500 max-w-2xl mx-auto mt-2">
            💡 Generated images show a preview - pay $0.80 to unlock and download in full quality
          </p>
          
          {/* 环境指示器 */}
          <div className="flex justify-center mt-4">
            <EnvironmentIndicator />
          </div>
        </motion.div>

        {/* 主要内容区域 - 左右布局 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* 左侧：图像上传和提示词输入 */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-orange-100"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="space-y-6">
              {/* 图像上传 */}
              <div>
                <motion.label 
                  className="block text-sm font-medium text-gray-700 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Upload Source Image
                </motion.label>
                <div className="border-2 border-dashed border-orange-300 rounded-xl p-6 text-center hover:border-orange-400 transition-colors">
                  {uploadedImage ? (
                    <div className="relative">
                      <motion.img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="max-w-full h-auto max-h-64 mx-auto rounded-lg shadow-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.button
                        onClick={removeUploadedImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>
                  ) : (
                    <div>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Upload className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2 font-medium">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          PNG, JPG up to 10MB
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <motion.button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Choose Image
                        </motion.button>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>

              {/* 提示词输入 */}
              <div>
                <motion.label 
                  className="block text-sm font-medium text-gray-700 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  Transformation Prompt
                </motion.label>
                <motion.textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe how you want to transform the image..."
                  className="w-full h-24 px-4 py-3 border border-orange-200 rounded-xl resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                />
              </div>

              {/* 负面提示词 */}
              <div>
                <motion.label 
                  className="block text-sm font-medium text-gray-700 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  Negative Prompt (Optional)
                </motion.label>
                <motion.textarea
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="What you don't want in the transformed image..."
                  className="w-full h-20 px-4 py-3 border border-orange-200 rounded-xl resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                />
              </div>

              {/* 快速提示词建议 */}
              <div className="mt-4">
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                  <span>💡</span>
                  <span className="font-medium">Quick Transformations:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      onClick={() => setPrompt(suggestion)}
                      className="px-3 py-1 bg-gradient-to-r from-orange-100 to-yellow-100 hover:from-orange-200 hover:to-yellow-200 rounded-md text-xs font-medium text-orange-700 border border-orange-200 transition-all duration-200"
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8 + index * 0.1 }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* 生成按钮 */}
              <div className="pt-4">
                <motion.button
                  onClick={generateImage}
                  disabled={isGenerating || !prompt.trim() || !uploadedImage}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center shadow-lg disabled:shadow-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0 }}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-3" />
                      Transforming Image...
                    </>
                  ) : (
                    <>
                      <Palette className="w-5 h-5 mr-3" />
                      Transform Image
                    </>
                  )}
                </motion.button>
              </div>

              {/* 模型信息提示 */}
              <div className="pt-2">
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  <span className="font-medium text-orange-600">Nano Banana AI Model</span>
                  <br />
                  Advanced image transformation with AI, optimized default parameters for best results
                </p>
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
                Transformed Images
              </motion.h2>
              
              {/* 图像展示区域 */}
              <div className="flex-1">
                {generatedImages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <ImageIcon className="w-24 h-24 mx-auto mb-4 text-orange-200" />
                      <p className="text-lg">No images transformed yet</p>
                      <p className="text-sm">Upload an image and describe the transformation to get started</p>
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
                            alt={`Transformed image ${index + 1}`}
                            className={`w-full h-auto max-h-96 object-contain rounded-t-xl transition-all duration-300 ${
                              unlockedImages.has(index) ? 'image-preview-unlocked' : 'image-preview-blur'
                            }`}
                            onLoad={(e) => {
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
                          
                          {/* 未解锁时的锁定覆盖层 */}
                          {!unlockedImages.has(index) && (
                            <motion.div 
                              className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="text-center text-white">
                                <Lock className="w-12 h-12 mx-auto mb-2" />
                                <p className="font-semibold">Image Locked</p>
                                <p className="text-sm opacity-90">Pay $0.80 to unlock</p>
                              </div>
                            </motion.div>
                          )}
                          
                          {/* 悬停时的操作按钮 - 只在未解锁时显示 */}
                          {!unlockedImages.has(index) && (
                            <motion.div 
                              className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                            >
                              <motion.button
                                onClick={() => {
                                  setSelectedImageIndex(index)
                                  setPaymentModalOpen(true)
                                }}
                                className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-xl hover:bg-orange-600 transition-colors font-semibold flex items-center justify-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Lock className="w-4 h-4" />
                                <span>Unlock Image</span>
                              </motion.button>
                            </motion.div>
                          )}
                          
                          {/* 已解锁图片的悬停下载按钮 */}
                          {unlockedImages.has(index) && (
                            <motion.div 
                              className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                            >
                              <motion.button
                                onClick={() => downloadImage(image, index)}
                                className="bg-white text-orange-700 px-4 py-2 rounded-lg shadow-xl hover:bg-orange-50 transition-colors font-semibold flex items-center justify-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Download className="w-4 h-4" />
                                <span>Download</span>
                              </motion.button>
                            </motion.div>
                          )}
                        </div>
                        
                        {/* 图像信息 */}
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-600 font-medium">
                              Image #{index + 1}
                            </span>
                            <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                              Transformed
                            </span>
                          </div>
                          
                          {/* 操作按钮 */}
                          {unlockedImages.has(index) ? (
                            <motion.button
                              onClick={() => downloadImage(image, index)}
                              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center font-semibold text-sm"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download Image
                            </motion.button>
                          ) : (
                            <motion.button
                              onClick={() => {
                                setSelectedImageIndex(index)
                                setPaymentModalOpen(true)
                              }}
                              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center font-semibold text-sm"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Lock className="w-4 h-4 mr-2" />
                              Unlock Image ($0.80)
                            </motion.button>
                          )}
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
        {error && (
          <motion.div 
            className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-red-700 text-center font-medium">{error}</p>
          </motion.div>
        )}

        {/* PayPal 支付模态框 */}
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
          imageIndex={selectedImageIndex}
          price={0.80}
        />
      </div>
    </div>
  )
} 