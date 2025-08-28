"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Wand2, Loader2, Image as ImageIcon } from 'lucide-react'
import GradientButton from './ui/GradientButton'
import EmptyState from './ui/EmptyState'

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
  const [originalImageUrls, setOriginalImageUrls] = useState<string[]>([])
  const [error, setError] = useState('')

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setIsGenerating(true)
    setError('')
    setGenerationProgress('Initializing generation...')
    // 清空之前生成的图片，只展示本次最新结果
    setGeneratedImages([])
    setOriginalImageUrls([])

    try {
      const request: GenerationRequest = {
        prompt: prompt.trim(),
        size: selectedSize.value
      }

      setGenerationProgress('Sending request to Nano Banana AI model...')

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate image')
      }

      setGenerationProgress('Processing response...')
      const data: GenerationResponse = await response.json()
      
      console.log('API Response:', data)

      if (data.artifacts && data.artifacts.length > 0) {
        const originalUrls: string[] = []
        const displayUrls: string[] = []
        
        data.artifacts.forEach(artifact => {
          if (artifact.url) {
            console.log('Generated image URL:', artifact.url)
            originalUrls.push(artifact.url)
            // 使用代理来显示图片，避免CORS问题
            displayUrls.push(`/api/proxy-image-display?url=${encodeURIComponent(artifact.url)}`)
          } else if (artifact.base64) {
            console.log('Generated base64 image')
            const base64Url = `data:image/png;base64,${artifact.base64}`
            originalUrls.push(base64Url)
            displayUrls.push(base64Url)
          }
        })

        console.log('Setting generated images:', displayUrls)
        console.log('Original URLs for download:', originalUrls)
        
        // 测试图片URL是否可访问
        if (displayUrls.length > 0) {
          try {
            const testResponse = await fetch(displayUrls[0], { method: 'HEAD' })
            console.log('Image URL accessibility test:', testResponse.status, testResponse.statusText)
          } catch (error) {
            console.error('Image URL test failed:', error)
          }
        }
        
        // 仅显示本次生成的最新图片
        setGeneratedImages(displayUrls)
        setOriginalImageUrls(originalUrls)
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

  const quickPrompts = [
    'A cute little cat',
    'Beautiful sunset landscape',
    'Peaceful lake reflection'
  ]

  const downloadImage = (index: number) => {
    try {
      const originalUrl = originalImageUrls[index]
      if (!originalUrl) {
        console.error('No original URL found for index:', index)
        setError('Download failed. No image URL found.')
        return
      }

      const link = document.createElement('a')
      link.download = `nanobanana-generated-${Date.now()}-${index}.png`

      if (originalUrl.startsWith('data:image/')) {
        link.href = originalUrl
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
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
    } catch (e) {
      console.error('Download error:', e)
      setError('Download failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8 mb-8">
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-8 border border-orange-100"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="space-y-4 md:space-y-6">
            <div>
              <motion.label 
                className="block text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-3 flex items-center space-x-2"
                whileHover={{ x: 5 }}
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                <span>Prompt</span>
              </motion.label>
              <motion.textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="w-full h-40 px-3 md:px-4 py-2 md:py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200/30 focus:border-orange-400 resize-none transition-all duration-200 text-base md:text-lg"
                whileFocus={{ scale: 1.02 }}
              />
              
              {/* 快速提示词建议 */}
              <div className="mt-2">
                <div className="flex items-center gap-1 md:gap-2 text-xs text-gray-600">
                  <span>💡</span>
                  <span className="font-medium">Quick:</span>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {quickPrompts.map((suggestion, index) => (
                      <motion.button
                        key={suggestion}
                        onClick={() => setPrompt(suggestion)}
                        className="px-1 md:px-2 py-1 bg-gradient-to-r from-orange-100 to-yellow-100 hover:from-orange-200 hover:to-yellow-200 rounded-md text-xs font-medium text-orange-700 border border-orange-200 transition-all duration-200"
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
            </div>

            <div>
              <motion.label 
                className="block text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-3 flex items-center space-x-2"
                whileHover={{ x: 5 }}
              >
                <ImageIcon className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                <span>Image Size</span>
              </motion.label>
              <select
                value={selectedSize.value}
                onChange={(e) => {
                  const option = sizeOptions.find(opt => opt.value === e.target.value)
                  if (option) setSelectedSize(option)
                }}
                className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200/30 focus:border-orange-400 transition-all duration-200 text-base md:text-lg"
              >
                {sizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-xs md:text-sm text-gray-600 mt-2 md:mt-3">
                Recommended sizes for best results
              </p>
            </div>

            <div className="pt-2">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                <span className="font-medium text-orange-600">Nano Banana AI Model</span>
                <br />
                Fast high-quality image generation, supports English and Chinese prompts, generates in 5-10 seconds
              </p>
            </div>

            <div className="pt-4">
              <div className="flex justify-center">
                <motion.button
                  onClick={generateImage}
                  disabled={isGenerating || !prompt.trim()}
                  className=""
                >
                  <GradientButton size="lg" loading={isGenerating} leftIcon={!isGenerating ? <Wand2 className="w-6 h-6" /> : undefined}>
                    {isGenerating ? 'Generating…' : 'Generate Image'}
                  </GradientButton>
                </motion.button>
              </div>

              <AnimatePresence>
                {isGenerating && generationProgress && (
                  <motion.div 
                    className="mt-4 p-3 bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-xl"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-orange-700 font-medium text-center text-sm">{generationProgress}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-8 border border-orange-100 min-h-[500px] md:min-h-[700px]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="h-full flex flex-col">
            <motion.h2 
              className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              Generated Images
            </motion.h2>

            <div className="flex-1">
              {generatedImages.length === 0 ? (
                <EmptyState
                  title="No images generated yet"
                  subtitle="Enter a prompt and click generate to create your first image"
                  icon={<ImageIcon className="w-full h-full text-orange-200" />}
                />
              ) : (
                <div className="space-y-3 md:space-y-4">
                  {generatedImages.map((image, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-xl overflow-hidden shadow-lg border border-orange-100"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="relative group bg-gray-50 min-h-[200px] md:min-h-[300px] flex items-center justify-center">
                        <motion.img
                          src={image}
                          alt={`Generated image ${index + 1}`}
                          className="w-full h-auto max-h-64 md:max-h-96 object-contain rounded-t-xl"
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                          onError={(e) => {
                            console.error('Image failed to load:', image)
                            console.error('Error details:', e)
                            e.currentTarget.style.display = 'none'
                            // 显示错误信息
                            const errorDiv = document.createElement('div')
                            errorDiv.className = 'text-red-500 text-sm text-center p-4'
                            errorDiv.textContent = 'Image failed to load'
                            e.currentTarget.parentElement?.appendChild(errorDiv)
                          }}
                          onLoad={() => {
                            console.log('Image loaded successfully:', image)
                          }}
                          crossOrigin="anonymous"
                        />
                        <motion.div 
                          className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <button
                            onClick={() => downloadImage(index)}
                            className="bg-white text-orange-700 px-3 md:px-4 py-2 rounded-lg shadow-xl hover:bg-orange-50 transition-colors font-semibold text-sm"
                          >
                            Download
                          </button>
                        </motion.div>
                      </div>

                      <div className="p-3 md:p-4">
                        <div className="flex justify-between items-center mb-2 md:mb-3">
                          <span className="text-xs md:text-sm text-gray-600 font-medium">
                            Image #{index + 1}
                          </span>
                          <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                            {selectedSize.label}
                          </span>
                        </div>
                        <button
                          onClick={() => downloadImage(index)}
                          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-2 px-3 md:px-4 rounded-lg transition-all duration-200 font-semibold text-xs md:text-sm"
                        >
                          Download Image
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            className="bg-red-50 border-2 border-red-200 rounded-xl p-4 md:p-6 mb-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-red-700 text-center font-medium text-sm md:text-base">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 