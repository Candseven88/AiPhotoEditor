'use client'

import { useState, useEffect } from 'react'
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

export default function ImageToImageGeneratorV2() {
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

  // 处理图像上传
  const handleImageUpload = (imageData: string) => {
    setUploadedImage(imageData)
    setError('')
  }

  // 移除上传的图像
  const removeUploadedImage = () => {
    setUploadedImage(null)
    setGeneratedImages([])
    setOriginalImageUrls([])
    setError('')
  }

  // 生成图像
  const generateImage = async () => {
    if (!uploadedImage) {
      showError('Please upload an image first', 'Image Required')
      return
    }

    if (!prompt.trim()) {
      showError('Please enter a transformation prompt', 'Prompt Required')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      const requestData: ImageToImageRequest = {
        text_prompts: [
          { text: prompt, weight: 1 },
          ...(negativePrompt ? [{ text: negativePrompt, weight: -1 }] : [])
        ],
        init_image: uploadedImage
      }

      const response = await fetch('/api/generate-image-to-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.success && data.images) {
        setGeneratedImages(data.images)
        setOriginalImageUrls(data.originalUrls || data.images)
        showSuccess('Images generated successfully!')
      } else {
        throw new Error(data.error || 'Unknown error occurred')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setError(errorMessage)
      showError(errorMessage, 'Generation Failed')
    } finally {
      setIsGenerating(false)
    }
  }

  // 解锁图像
  const handleUnlockClick = (index: number) => {
    setSelectedImageIndex(index)
    setPaymentModalOpen(true)
  }

  // 支付成功处理
  const handlePaymentSuccess = () => {
    setUnlockedImages(prev => {
      const newSet = new Set(prev)
      newSet.add(selectedImageIndex)
      return newSet
    })
    setPaymentModalOpen(false)
    showSuccess('Image unlocked successfully!', 'Payment Successful')
  }

  // 下载图像
  const downloadImage = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `generated-image-${index + 1}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      showSuccess('Image downloaded successfully!')
    } catch (error) {
      showError('Failed to download image', 'Download Error')
    }
  }

  return (
    <>
      <ToastManager />
      <div className="min-h-screen">
        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* 左侧：输入区域 */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-orange-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              {/* 图像上传组件 */}
              <ImageUploader
                uploadedImage={uploadedImage}
                onImageUpload={handleImageUpload}
                onRemoveImage={removeUploadedImage}
                disabled={isGenerating}
              />

              {/* 提示词输入 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transformation Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe how you want to transform the image..."
                  className="w-full h-24 px-4 py-3 border border-orange-200 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  disabled={isGenerating}
                />
              </div>

              {/* 负面提示词 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Negative Prompt (Optional)
                </label>
                <textarea
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="What you don't want in the image..."
                  className="w-full h-20 px-4 py-3 border border-orange-200 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  disabled={isGenerating}
                />
              </div>

              {/* 生成按钮 */}
              <GradientButton
                size="lg"
                variant="primary"
                onClick={generateImage}
                disabled={isGenerating || !uploadedImage || !prompt.trim()}
                leftIcon={isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Palette className="w-5 h-5" />}
                className="w-full"
                shine={!isGenerating}
                glow={!isGenerating}
              >
                {isGenerating ? 'Transforming...' : 'Transform Image'}
              </GradientButton>
            </div>
          </motion.div>

          {/* 右侧：结果展示 */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-orange-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {error && (
              <motion.div
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-red-600 text-sm">{error}</p>
              </motion.div>
            )}

            {generatedImages.length > 0 ? (
              <ImageResults
                generatedImages={generatedImages}
                originalImageUrls={originalImageUrls}
                unlockedImages={unlockedImages}
                onUnlockClick={handleUnlockClick}
                onDownload={downloadImage}
              />
            ) : (
              <EmptyState
                customIcon={<Palette className="w-16 h-16 text-gray-400" />}
                title="No transformations yet"
                description="Upload an image and enter a prompt to get started"
              />
            )}
          </motion.div>
        </div>

        {/* 环境指示器 */}
        <EnvironmentIndicator />

        {/* 支付模态框 */}
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