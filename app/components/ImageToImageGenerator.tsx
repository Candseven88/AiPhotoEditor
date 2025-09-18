'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Palette, Loader2 } from 'lucide-react'
import PaymentModal from './PaymentModal'
import EnvironmentIndicator from './EnvironmentIndicator'
import ImageUploader from './ImageUploader'
import ImageResults from './ImageResults'
import GradientButton from './ui/GradientButton'
import EmptyState from './ui/EmptyState'
import { useToast } from './ui/Toast'

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
  const [originalImageUrls, setOriginalImageUrls] = useState<string[]>([])
  const [error, setError] = useState('')
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [unlockedImages, setUnlockedImages] = useState<Set<number>>(new Set())
  const { showError, showWarning, showSuccess, ToastManager } = useToast()
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理图像上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // 验证文件大小 (10MB)
      if (file.size > 10 * 1024 * 1024) {
        showError('File size must be less than 10MB', 'File Too Large')
        return
      }

      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        showError('Please upload an image file', 'Invalid File Type')
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
      showError('Please enter a prompt', 'Missing Prompt')
      return
    }

    if (!uploadedImage) {
      showError('Please upload an image', 'Missing Image')
      return
    }

    setIsGenerating(true)
    setError('')
    
    // 清除之前的图片和支付状态，确保每次生成都是全新开始
    setGeneratedImages([])
    setOriginalImageUrls([])
    setUnlockedImages(new Set())
    setSelectedImageIndex(0) // 重置选中的图片索引
    setPaymentModalOpen(false) // 关闭任何可能打开的支付弹窗

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
        console.log('Generated new images:', newImages.length)
        setGeneratedImages(newImages) // 直接设置新图片，不使用 prev
        setOriginalImageUrls(newImages) // 对于base64，显示和下载使用相同的URL
        setError('')
        
        // 验证状态更新
        setTimeout(() => {
          console.log('State after generation - Images:', newImages.length, 'Unlocked:', unlockedImages.size)
        }, 100)
      } else {
        throw new Error('No images generated')
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        const errorMessage = 'Request timed out. Please try again.'
        setError(errorMessage)
        showError(errorMessage, 'Timeout Error', 8000)
      } else {
        const errorMessage = error.message || 'Failed to generate image'
        setError(errorMessage)
        
        // 检查是否是敏感内容警告
        if (errorMessage.includes('potentially unsafe or sensitive content') || 
            errorMessage.includes('sensitive content') ||
            errorMessage.includes('unsafe content')) {
          showWarning(
            'Your prompt or uploaded image may contain sensitive content. Please try using different content that is more appropriate.',
            'Content Warning',
            10000 // 显示10秒
          )
        } else {
          showError(errorMessage, 'Generation Failed', 8000)
        }
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadImage = (index: number) => {
    if (!unlockedImages.has(index)) {
      setSelectedImageIndex(index)
      setPaymentModalOpen(true)
      return
    }
    
    try {
      const originalUrl = originalImageUrls[index]
      if (!originalUrl) {
        console.error('No original URL found for index:', index)
        setError('Download failed. No image URL found.')
        return
      }

      // 创建下载链接
      const link = document.createElement('a')
              link.download = `aiphotoeditor-transformed-${Date.now()}-${index}.png`
      
      // 对于 base64 数据，需要特殊处理
      if (originalUrl.startsWith('data:image/')) {
        // 如果是 base64 数据，直接下载
        link.href = originalUrl
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        // 如果是 URL，使用代理下载
        const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(originalUrl)}`
        fetch(proxyUrl)
          .then(async (response) => {
            if (!response.ok) throw new Error(`Proxy failed: ${response.status}`)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            link.href = url
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
          })
          .catch(err => {
            console.error('Download failed:', err)
            setError('Download failed. Please try again.')
          })
      }
    } catch (error) {
      console.error('Download error:', error)
      setError('Download failed. Please try again.')
    }
  }

  const handlePaymentSuccess = () => {
    console.log('Payment success for image index:', selectedImageIndex)
    console.log('Current unlocked images before update:', Array.from(unlockedImages))
    
    setUnlockedImages(prev => {
      const newSet = new Set(prev)
      newSet.add(selectedImageIndex)
      console.log('Updated unlocked images:', Array.from(newSet))
      return newSet
    })
    
    // 强制重新渲染
    setTimeout(() => {
      console.log('Final unlocked images state:', Array.from(unlockedImages))
    }, 100)
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
    <>
      <ToastManager />
      <div className="min-h-screen">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 }}
              >
                <GradientButton 
                  size="lg" 
                  loading={isGenerating} 
                  leftIcon={!isGenerating ? <Palette className="w-5 h-5" /> : undefined}
                  onClick={generateImage}
                  disabled={isGenerating || !prompt.trim() || !uploadedImage}
                >
                  {isGenerating ? 'Transforming Image…' : 'Transform Image'}
                </GradientButton>
              </motion.div>
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
              {/* 调试信息 */}
              <div className="text-xs text-gray-400 mb-2 text-center">
                Debug: {generatedImages.length} images, {unlockedImages.size} unlocked, Selected: {selectedImageIndex}
              </div>
              
              {generatedImages.length === 0 ? (
                <EmptyState
                  title="No images generated yet"
                  description="Upload an image and enter a prompt to transform"
                  icon="image"
                />
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
                              onClick={() => downloadImage(index)}
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
                            onClick={() => downloadImage(index)}
                            className="w-full bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-600 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center font-semibold text-sm"
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
    </>
  )
} 