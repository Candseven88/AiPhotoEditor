"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Wand2, Loader2, Image as ImageIcon, Type } from 'lucide-react'

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

export default function UsernameToImageGenerator() {
  const [username, setUsername] = useState('')
  const [includeText, setIncludeText] = useState(false)
  const [styleHint, setStyleHint] = useState('')
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState('')
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [error, setError] = useState('')

  const buildPromptFromUsername = (name: string, withText: boolean, style: string) => {
    const safeName = name.trim()
    let base = `Create a stylish profile avatar that reflects the meaning and vibe of the username: "${safeName}".`
    if (style && style.trim().length > 0) {
      base += ` ${style.trim()}.`
    }
    const textPart = withText
      ? ` The image should artistically incorporate the text "${safeName}" as part of the composition.`
      : ` The image should not include any visible text, only a symbolic avatar matching the username's theme.`
    return `${base}${textPart} Clean composition, centered subject, aesthetically pleasing, professional, 8k details.`
  }

  const generateImage = async () => {
    if (!username.trim()) {
      setError('Please enter your UserName/NickName')
      return
    }

    setIsGenerating(true)
    setError('')
    setGenerationProgress('Initializing generation...')
    // 清空之前生成的图片，只展示本次最新结果
    setGeneratedImages([])

    try {
      const prompt = buildPromptFromUsername(username, includeText, styleHint)
      const request: GenerationRequest = {
        prompt,
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

      if (data.artifacts && data.artifacts.length > 0) {
        const newImages = data.artifacts.map(artifact => {
          if (artifact.url) return artifact.url
          if (artifact.base64) return `data:image/png;base64,${artifact.base64}`
          return null
        }).filter(Boolean) as string[]

        // 仅显示本次生成的最新图片
        setGeneratedImages(newImages)
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

  const quickNames = [
    'Nova',
    'ShadowFox',
    'PixelMage',
    'SunnyDay',
    'LunaSky',
    'ByteKnight'
  ]

  const downloadImage = (imageData: string, index: number) => {
    try {
      const link = document.createElement('a')
      link.download = `nanobanana-username-avatar-${Date.now()}-${index}.png`

      if (imageData.startsWith('data:image/')) {
        link.href = imageData
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(imageData)}`
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-orange-100"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="space-y-6">
            <div>
              <motion.label 
                className="block text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2"
                whileHover={{ x: 5 }}
              >
                <User className="w-5 h-5 text-orange-500" />
                <span>UserName / NickName</span>
              </motion.label>
              <motion.input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username or nickname..."
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200/30 focus:border-orange-400 transition-all duration-200 text-lg"
                whileFocus={{ scale: 1.02 }}
              />

              <div className="mt-3 flex items-center gap-3">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={includeText}
                    onChange={(e) => setIncludeText(e.target.checked)}
                    className="h-4 w-4 text-orange-600 border-orange-300 rounded"
                  />
                  <span>Include username text in the image</span>
                </label>
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Type className="w-4 h-4 text-orange-500" />
                  Optional style hint
                </label>
                <input
                  type="text"
                  value={styleHint}
                  onChange={(e) => setStyleHint(e.target.value)}
                  placeholder="e.g., modern minimal avatar, neon, cyberpunk, watercolor"
                  className="w-full px-4 py-2 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200/30 focus:border-orange-400 transition-all duration-200 text-sm placeholder:text-gray-400"
                />
              </div>

              <div className="mt-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>💡</span>
                  <span className="font-medium">Quick:</span>
                  {quickNames.map((name, index) => (
                    <motion.button
                      key={name}
                      onClick={() => setUsername(name)}
                      className="px-2 py-1 bg-gradient-to-r from-orange-100 to-yellow-100 hover:from-orange-200 hover:to-yellow-200 rounded-md text-xs font-medium text-orange-700 border border-orange-200 transition-all duration-200"
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

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

            <div className="pt-2">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                <span className="font-medium text-orange-600">Nano Banana AI Model</span>
                <br />
                Generates a personalized avatar in 5-10 seconds using your username meaning or text
              </p>
            </div>

            <div className="pt-4">
              <motion.button
                onClick={generateImage}
                disabled={isGenerating || !username.trim()}
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
                    <span>Generate Avatar</span>
                  </>
                )}
              </motion.button>

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
              Generated Avatars
            </motion.h2>

            <div className="flex-1">
              {generatedImages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <ImageIcon className="w-24 h-24 mx-auto mb-4 text-orange-200" />
                    <p className="text-lg">No avatars generated yet</p>
                    <p className="text-sm">Enter a username and click generate to create your avatar</p>
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
                      <div className="relative group bg-gray-50">
                        <motion.img
                          src={image}
                          alt={`Generated avatar ${index + 1}`}
                          className="w-full h-auto max-h-96 object-contain rounded-t-xl"
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div 
                          className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <button
                            onClick={() => downloadImage(image, index)}
                            className="bg-white text-orange-700 px-4 py-2 rounded-lg shadow-xl hover:bg-orange-50 transition-colors font-semibold"
                          >
                            Download
                          </button>
                        </motion.div>
                      </div>

                      <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-600 font-medium">
                            Avatar #{index + 1}
                          </span>
                          <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                            {selectedSize.label}
                          </span>
                        </div>
                        <button
                          onClick={() => downloadImage(image, index)}
                          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-2 px-4 rounded-lg transition-all duration-200 font-semibold text-sm"
                        >
                          Download Avatar
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
  )
} 