'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Wand2, Loader2, Download, ImageIcon, Zap, Star, Clock, Users } from 'lucide-react'
import Navigation from '../components/Navigation'
import Card from '../components/ui/Card'
import GradientButton from '../components/ui/GradientButton'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../components/ui/Toast'

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
  { label: '1024x1024 (Square)', value: '1024x1024', description: 'Perfect for social media' },
  { label: '768x1344 (Portrait)', value: '768x1344', description: 'Great for phone wallpapers' },
  { label: '864x1152 (Tall)', value: '864x1152', description: 'Ideal for posters' },
  { label: '1344x768 (Landscape)', value: '1344x768', description: 'Perfect for headers' },
  { label: '1152x864 (Wide)', value: '1152x864', description: 'Great for banners' },
  { label: '1440x720 (Ultrawide)', value: '1440x720', description: 'Cinema format' },
  { label: '720x1440 (Tall)', value: '720x1440', description: 'Story format' }
]

const examplePrompts = [
  "A majestic dragon soaring through nebula clouds, digital art style",
  "Cyberpunk city at sunset with neon lights reflecting on wet streets",
  "Enchanted forest with glowing mushrooms and fairy lights",
  "Futuristic space station orbiting a colorful planet",
  "Ancient temple ruins covered in mystical glowing vines",
  "Steampunk airship flying above Victorian London",
  "Abstract geometric patterns in vibrant rainbow colors",
  "Peaceful zen garden with cherry blossoms and koi pond"
]

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate stunning images in seconds with Seedream 4.0',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Star,
    title: 'Premium Quality',
    description: 'Professional-grade 4K resolution output',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    icon: Clock,
    title: 'Always Available',
    description: '24/7 service with no waiting queues',
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    icon: Users,
    title: 'Trusted by Millions',
    description: 'Join over 10M+ creators worldwide',
    gradient: 'from-blue-400 to-indigo-500'
  }
]

export default function SeedreamPage() {
  const [prompt, setPrompt] = useState('')
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState('')
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [originalImageUrls, setOriginalImageUrls] = useState<string[]>([])
  const [error, setError] = useState('')
  const { showError, showWarning, showSuccess, ToastManager } = useToast()

  const generateImage = async () => {
    if (!prompt.trim()) {
      showError('Please enter a prompt to generate an image', 'Missing Prompt')
      return
    }

    setIsGenerating(true)
    setError('')
    setGenerationProgress('Initializing Seedream 4.0...')

    try {
      const progressMessages = [
        'Initializing Seedream 4.0...',
        'Processing your creative prompt...',
        'Applying advanced AI algorithms...',
        'Generating high-quality visuals...',
        'Applying final enhancements...',
        'Almost ready...'
      ]

      // Simulate progress updates
      let currentStep = 0
      const progressInterval = setInterval(() => {
        if (currentStep < progressMessages.length - 1) {
          currentStep++
          setGenerationProgress(progressMessages[currentStep])
        }
      }, 800)

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          size: selectedSize.value
        } as GenerationRequest)
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data: GenerationResponse = await response.json()

      if (!data.artifacts || data.artifacts.length === 0) {
        throw new Error('No images were generated. Please try again.')
      }

      const newImages: string[] = []
      const newOriginalUrls: string[] = []

      for (const artifact of data.artifacts) {
        if (artifact.url) {
          // Use proxy for external URLs
          const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(artifact.url)}`
          newImages.push(proxyUrl)
          newOriginalUrls.push(artifact.url)
        } else if (artifact.base64) {
          const dataUrl = `data:image/png;base64,${artifact.base64}`
          newImages.push(dataUrl)
          newOriginalUrls.push(dataUrl)
        }
      }

      if (newImages.length === 0) {
        throw new Error('Generated images could not be processed. Please try again.')
      }

      setGeneratedImages(newImages)
      setOriginalImageUrls(newOriginalUrls)
      showSuccess('Image generated successfully!', 'Generation Complete')

    } catch (error) {
      console.error('Generation error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setError(errorMessage)
      showError(errorMessage, 'Generation Failed')
    } finally {
      setIsGenerating(false)
      setGenerationProgress('')
    }
  }

  const downloadImage = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `seedream-generated-${Date.now()}-${index + 1}.png`
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
      showSuccess('Image downloaded successfully!', 'Download Complete')
    } catch (error) {
      console.error('Download error:', error)
      showError('Failed to download image', 'Download Error')
    }
  }

  const useExamplePrompt = (examplePrompt: string) => {
    setPrompt(examplePrompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isGenerating) {
      e.preventDefault()
      generateImage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 relative overflow-hidden">
      <Navigation />
      <ToastManager />
      
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full"
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl blur-lg opacity-30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative bg-white rounded-2xl p-4 shadow-xl">
                  <Sparkles className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <h1 className="ml-6 text-6xl md:text-7xl font-bold">
                <span className="gradient-text">Seedream</span>
                <span className="text-gray-800"> 4.0</span>
              </h1>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Next-Generation
              <span className="gradient-text"> AI Image Generator</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Experience the power of Seedream 4.0 - the most advanced AI model for creating 
              stunning visuals from your imagination. Generate, edit, and perfect your ideas with 
              cutting-edge artificial intelligence.
            </p>

            {/* Features Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="text-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-4 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Main Generator Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card variant="glass" size="lg" className="max-w-6xl mx-auto">
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Create with <span className="gradient-text">Seedream 4.0</span>
                  </h3>
                  <p className="text-lg text-gray-600">
                    Describe your vision and watch Seedream 4.0 bring it to life in seconds
                  </p>
                </div>

                {/* Input Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  {/* Prompt Input */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Describe Your Image
                    </label>
                    <div className="relative">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="A magical forest with glowing mushrooms and fireflies, digital art style..."
                        className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none bg-white/80 backdrop-blur-sm"
                        disabled={isGenerating}
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                        {prompt.length}/500
                      </div>
                    </div>

                    {/* Example Prompts */}
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Try these examples:</p>
                      <div className="flex flex-wrap gap-2">
                        {examplePrompts.slice(0, 4).map((example, index) => (
                          <button
                            key={index}
                            onClick={() => useExamplePrompt(example)}
                            className="px-3 py-1 text-xs bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-full transition-colors"
                            disabled={isGenerating}
                          >
                            {example.slice(0, 30)}...
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Image Size
                    </label>
                    <div className="space-y-2">
                      {sizeOptions.slice(0, 4).map((size) => (
                        <label
                          key={size.value}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                            selectedSize.value === size.value
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="size"
                            value={size.value}
                            checked={selectedSize.value === size.value}
                            onChange={() => setSelectedSize(size)}
                            className="hidden"
                            disabled={isGenerating}
                          />
                          <div className="flex-1">
                            <div className="font-medium text-sm text-gray-800">{size.label}</div>
                            <div className="text-xs text-gray-500">{size.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="text-center mb-8">
                  <GradientButton
                    size="lg"
                    variant="primary"
                    onClick={generateImage}
                    disabled={isGenerating || !prompt.trim()}
                    leftIcon={isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                    shine={!isGenerating}
                    glow={!isGenerating}
                    className="min-w-[200px]"
                  >
                    {isGenerating ? 'Generating...' : 'Generate with Seedream 4.0'}
                  </GradientButton>
                  
                  {isGenerating && generationProgress && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 text-sm text-gray-600"
                    >
                      {generationProgress}
                    </motion.p>
                  )}
                </div>

                {/* Results Section */}
                <AnimatePresence mode="wait">
                  {generatedImages.length > 0 && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">
                        Generated with Seedream 4.0
                      </h4>
                                             <div className="flex flex-col items-center space-y-6">
                         {generatedImages.map((imageUrl, index) => (
                           <motion.div
                             key={index}
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             transition={{ duration: 0.3, delay: index * 0.1 }}
                             className="relative group max-w-2xl w-full"
                           >
                             <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-lg mx-auto">
                               <img
                                 src={imageUrl}
                                 alt={`Generated by Seedream 4.0 - ${index + 1}`}
                                 className="w-full h-auto mx-auto block"
                                 loading="lazy"
                               />
                               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                 <GradientButton
                                   size="sm"
                                   variant="primary"
                                   onClick={() => downloadImage(imageUrl, index)}
                                   leftIcon={<Download className="w-4 h-4" />}
                                 >
                                   Download
                                 </GradientButton>
                               </div>
                             </div>
                             <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
                               Seedream 4.0
                             </div>
                           </motion.div>
                         ))}
                       </div>
                    </motion.div>
                  )}

                  {!isGenerating && generatedImages.length === 0 && (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <EmptyState
                        icon="image"
                        title="Ready to Create"
                        description="Enter a prompt above and click 'Generate' to see Seedream 4.0 in action"
                      />
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center"
                    >
                      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-red-800 mb-2">Generation Failed</h4>
                        <p className="text-red-600">{error}</p>
                        <GradientButton
                          size="sm"
                          variant="secondary"
                          onClick={() => setError('')}
                          className="mt-4"
                        >
                          Try Again
                        </GradientButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Additional Example Prompts */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8">
              Discover More <span className="gradient-text">Creative Possibilities</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {examplePrompts.map((example, index) => (
                <motion.button
                  key={index}
                  onClick={() => useExamplePrompt(example)}
                  className="p-4 bg-white/80 hover:bg-white border border-gray-200 hover:border-orange-300 rounded-xl text-left transition-all duration-300 hover:shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isGenerating}
                >
                  <div className="text-sm font-medium text-gray-800 mb-2">
                    Prompt {index + 1}
                  </div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    {example}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
} 