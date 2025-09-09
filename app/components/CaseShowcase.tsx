'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, RotateCcw } from 'lucide-react'
import BeforeAfterSlider from './BeforeAfterSlider'

interface CaseImage {
  id: string
  original: string
  processed?: string
  title: string
  description: string
  category: 'skiing' | 'vehicle' | 'portrait' | 'swimming' | 'other'
  keywords: string[]
}

const caseImages: CaseImage[] = [
  {
    id: 'skiing-man',
    original: '/cases/冬季男子雪地上滑雪.jpg',
    processed: '/cases/冬季男子雪地上滑雪-红色.png',
    title: 'Winter Skiing Transformation',
    description: 'Transform skiing photos with AI-powered style enhancement',
    category: 'skiing',
    keywords: ['nano banana ai', 'ai image generation', 'skiing photo enhancement']
  },
  {
    id: 'skiing-women',
    original: '/cases/两名女子滑雪的照片.jpg',
    processed: '/cases/两名女子滑雪的照片-红色.png',
    title: 'Skiing Group Enhancement',
    description: 'Enhance group skiing photos with advanced AI processing',
    category: 'skiing',
    keywords: ['nano banana image generator', 'group photo enhancement', 'ai photo editing']
  },
  {
    id: 'ford-vehicle',
    original: '/cases/红色福特重点车辆在白天的蓝色天空下的沙子上驾驶.jpg',
    processed: '/cases/红色福特重点车辆在白天的蓝色天空下的沙子上驾驶-2.png',
    title: 'Vehicle Style Transformation',
    description: 'Transform vehicle photos with AI-powered style enhancement',
    category: 'vehicle',
    keywords: ['lightweight image ai', 'vehicle photo enhancement', 'ai image generation']
  },
  {
    id: 'ford-beach',
    original: '/cases/红色福特重点车辆在白天的蓝色天空下的沙子上驾驶.jpg',
    processed: '/cases/红色福特重点车辆在白天的蓝色天空下的沙子上驾驶-海边.png',
    title: 'Beach Scene Transformation',
    description: 'Transform vehicle photos with beach background enhancement',
    category: 'vehicle',
    keywords: ['nano banana ai', 'background enhancement', 'ai photo editing']
  },
  {
    id: 'dodge-challenger',
    original: '/cases/黑色道奇challenger Coupe.jpg',
    processed: '/cases/黑色道奇challenger Coupe-在云端.png',
    title: 'Cloud Background Enhancement',
    description: 'Add dramatic cloud backgrounds to vehicle photos',
    category: 'vehicle',
    keywords: ['google nano-banana model', 'background generation', 'ai image enhancement']
  },
  {
    id: 'baby-saja',
    original: '/cases/Baby Saja.jpg',
    processed: '/cases/Baby_Saja-Ciga.png',
    title: 'Portrait Style Enhancement',
    description: 'Enhance portrait photos with AI-powered style transformation',
    category: 'portrait',
    keywords: ['nano banana ai image generation', 'portrait enhancement', 'ai photo editing']
  },
  {
    id: 'three-girls',
    original: '/cases/three girls laughing.jpg',
    processed: '/cases/three girls laughing-in front of Mount Fuji.png',
    title: 'Background Scene Addition',
    description: 'Add iconic backgrounds to group photos',
    category: 'portrait',
    keywords: ['how does nano banana ai work', 'background generation', 'ai image enhancement']
  },
  {
    id: 'swimming-woman',
    original: '/cases/在水中游泳的白色monokini的女人.jpg',
    processed: '/cases/在水中游泳的白色monokini的女人-火山.png',
    title: 'Dramatic Scene Enhancement',
    description: 'Transform swimming photos with dramatic volcanic backgrounds',
    category: 'swimming',
    keywords: ['nano banana vs stable diffusion', 'scene enhancement', 'ai image generation']
  }
]

interface CaseShowcaseProps {
  variant?: 'hero' | 'grid' | 'carousel' | 'comparison'
  maxItems?: number
  showKeywords?: boolean
}

export default function CaseShowcase({ 
  variant = 'grid', 
  maxItems = 6, 
  showKeywords = false 
}: CaseShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [selectedCase, setSelectedCase] = useState<CaseImage | null>(null)

  const displayedCases = caseImages.slice(0, maxItems)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || variant !== 'carousel') return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayedCases.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, variant, displayedCases.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayedCases.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + displayedCases.length) % displayedCases.length)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  const renderHeroShowcase = () => (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Powered by <span className="text-orange-600">Nano Banana AI</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience the power of lightweight AI image generation and enhancement. 
          Our nano banana ai model delivers stunning results with incredible speed and quality.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCases.slice(0, 3).map((caseItem) => (
          <motion.div
            key={caseItem.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => setSelectedCase(caseItem)}
          >
            <div className="relative">
              {caseItem.processed ? (
                <div className="relative h-48 overflow-hidden">
                  {/* 原图 */}
                  <img
                    src={caseItem.original}
                    alt={`${caseItem.title} - Original`}
                    className="w-full h-full object-cover"
                  />
                  {/* 处理后图片覆盖层 - 悬停时显示 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-orange-500/20">
                    <img
                      src={caseItem.processed}
                      alt={`${caseItem.title} - Enhanced`}
                      className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    {/* 分割线指示器 */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-orange-500 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-orange-500 rounded-full"></div>
                    </div>
                    {/* 标签指示器 */}
                    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                      Before
                    </div>
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                      After
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={caseItem.original}
                  alt={caseItem.title}
                  className="w-full h-48 object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{caseItem.title}</h3>
              <p className="text-sm text-gray-600">{caseItem.description}</p>
              {caseItem.processed && (
                <div className="mt-3 text-xs text-orange-600 font-medium">
                  ✨ Hover to see AI enhancement
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderGridShowcase = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedCases.map((caseItem) => (
        <motion.div
          key={caseItem.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
          whileHover={{ y: -5, scale: 1.02 }}
          onClick={() => setSelectedCase(caseItem)}
        >
          <div className="relative">
            {caseItem.processed ? (
              <div className="relative h-48 overflow-hidden">
                {/* 原图 */}
                <img
                  src={caseItem.original}
                  alt={`${caseItem.title} - Original`}
                  className="w-full h-full object-cover"
                />
                {/* 处理后图片覆盖层 - 悬停时显示 */}
                <div className="absolute inset-0">
                  <img
                    src={caseItem.processed}
                    alt={`${caseItem.title} - Enhanced`}
                    className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  {/* 分割线指示器 */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-orange-500 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-orange-500 rounded-full"></div>
                  </div>
                  {/* 标签指示器 */}
                  <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                    Before
                  </div>
                  <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                    After
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={caseItem.original}
                alt={caseItem.title}
                className="w-full h-48 object-cover"
              />
            )}
            {caseItem.processed && (
              <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                AI Enhanced
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">{caseItem.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{caseItem.description}</p>
            {caseItem.processed && (
              <div className="text-xs text-orange-600 font-medium mb-3">
                ✨ Hover to see transformation
              </div>
            )}
            {showKeywords && (
              <div className="flex flex-wrap gap-1">
                {caseItem.keywords.slice(0, 2).map((keyword, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderCarouselShowcase = () => (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-500 ease-in-out">
          {displayedCases.map((caseItem, index) => (
            <div
              key={caseItem.id}
              className="w-full flex-shrink-0"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="relative h-96 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center max-w-2xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{caseItem.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{caseItem.description}</p>
                    <div className="flex justify-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-2">Original</p>
                        <img
                          src={caseItem.original}
                          alt="Original"
                          className="w-32 h-32 object-cover rounded-lg shadow-md"
                        />
                      </div>
                      {caseItem.processed && (
                        <>
                          <div className="flex items-center">
                            <ChevronRight className="w-8 h-8 text-orange-500" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500 mb-2">Enhanced</p>
                            <img
                              src={caseItem.processed}
                              alt="Enhanced"
                              className="w-32 h-32 object-cover rounded-lg shadow-md"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Carousel Controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button
          onClick={prevSlide}
          className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button
          onClick={nextSlide}
          className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      
      {/* Auto-play Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button
          onClick={toggleAutoPlay}
          className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm"
        >
          {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {displayedCases.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-orange-500' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  )

  const renderComparisonShowcase = () => (
    <div className="space-y-12">
      {displayedCases.slice(0, 6).map((caseItem) => (
        <motion.div
          key={caseItem.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          whileHover={{ y: -2 }}
        >
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{caseItem.title}</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">{caseItem.description}</p>
            </div>
            
            {caseItem.processed ? (
              <div className="relative">
                {/* 只保留滑动对比效果 - 这是最直观的 */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span className="text-sm font-medium text-orange-700">
                      Drag the slider to compare
                    </span>
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  </div>
                </div>
                
                <BeforeAfterSlider
                  beforeImage={caseItem.original}
                  afterImage={caseItem.processed}
                  beforeLabel="Original"
                  afterLabel="AI Enhanced"
                  height="h-96"
                  className="mx-auto max-w-5xl"
                />
                
                {/* 简化的说明 */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Enhanced with <span className="text-orange-600 font-semibold">NanoBanana AI</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-full h-96 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">✨</span>
                    </div>
                    <p className="text-orange-600 font-medium">Try NanoBanana AI</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderModal = () => (
    <AnimatePresence>
      {selectedCase && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCase(null)}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedCase.title}</h2>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Maximize2 className="w-6 h-6" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">{selectedCase.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3 font-medium">Original</p>
                  <img
                    src={selectedCase.original}
                    alt="Original"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
                
                {selectedCase.processed ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-3 font-medium">
                      Enhanced with <span className="text-orange-600 font-semibold">Nano Banana AI</span>
                    </p>
                    <img
                      src={selectedCase.processed}
                      alt="Enhanced"
                      className="w-full rounded-lg shadow-md"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-3 font-medium">AI Enhancement</p>
                    <div className="w-full h-64 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg flex items-center justify-center">
                      <p className="text-orange-600 font-medium">Enhance with AI</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <p className="text-sm text-gray-500 mb-3">Keywords:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {variant === 'hero' && renderHeroShowcase()}
      {variant === 'grid' && renderGridShowcase()}
      {variant === 'carousel' && renderCarouselShowcase()}
      {variant === 'comparison' && renderComparisonShowcase()}
      {renderModal()}
    </>
  )
} 