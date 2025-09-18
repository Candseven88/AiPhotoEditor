'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import CaseGrid from './CaseGrid'
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
    title: 'Beach Scene Creation',
    description: 'Transform desert scenes into beautiful beach environments',
    category: 'vehicle',
    keywords: ['environment transformation', 'scene editing', 'background replacement']
  },
  {
    id: 'swimming-woman',
    original: '/cases/在水中游泳的白色monokini的女人.jpg',
    processed: '/cases/在水中游泳的白色monokini的女人-火山.png',
    title: 'Swimming Portrait Enhancement',
    description: 'Enhance swimming portraits with dramatic environment changes',
    category: 'swimming',
    keywords: ['portrait enhancement', 'environment editing', 'ai swimming photo']
  },
  {
    id: 'portrait-baby',
    original: '/cases/Baby_Saja-Ciga.png',
    title: 'Portrait Generation',
    description: 'Create beautiful portrait images with AI technology',
    category: 'portrait',
    keywords: ['portrait ai', 'baby photo generation', 'facial enhancement']
  }
]

interface CaseShowcaseV2Props {
  variant?: 'grid' | 'hero' | 'comparison'
  maxItems?: number
  showKeywords?: boolean
}

export default function CaseShowcaseV2({ 
  variant = 'grid', 
  maxItems = 6, 
  showKeywords = false 
}: CaseShowcaseV2Props) {
  const [selectedCase, setSelectedCase] = useState<CaseImage | null>(null)

  const handleCaseClick = (caseItem: CaseImage) => {
    setSelectedCase(caseItem)
  }

  const closeModal = () => {
    setSelectedCase(null)
  }

  if (variant === 'hero') {
    return (
      <>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 p-8">
          <CaseGrid
            cases={caseImages}
            onCaseClick={handleCaseClick}
            showKeywords={showKeywords}
            maxItems={3}
            title="Powered by Nano Banana AI"
            description="Experience the power of lightweight AI image generation and enhancement. Our nano banana ai model delivers stunning results with incredible speed and quality."
          />
        </div>
        {selectedCase && (
          <CaseModal 
            caseItem={selectedCase} 
            onClose={closeModal} 
          />
        )}
      </>
    )
  }

  if (variant === 'comparison') {
    const comparisonCases = caseImages.filter(c => c.processed).slice(0, maxItems)
    
    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {comparisonCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {caseItem.processed && (
                <BeforeAfterSlider
                  beforeImage={caseItem.original}
                  afterImage={caseItem.processed}
                  beforeLabel="Original"
                  afterLabel="AI Enhanced"
                  height="h-64"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{caseItem.title}</h3>
                <p className="text-sm text-gray-600">{caseItem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        {selectedCase && (
          <CaseModal 
            caseItem={selectedCase} 
            onClose={closeModal} 
          />
        )}
      </>
    )
  }

  // Default grid variant
  return (
    <>
      <CaseGrid
        cases={caseImages}
        onCaseClick={handleCaseClick}
        showKeywords={showKeywords}
        maxItems={maxItems}
      />
      {selectedCase && (
        <CaseModal 
          caseItem={selectedCase} 
          onClose={closeModal} 
        />
      )}
    </>
  )
}

// 简化的模态框组件
function CaseModal({ caseItem, onClose }: { caseItem: CaseImage; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {caseItem.processed ? (
              <BeforeAfterSlider
                beforeImage={caseItem.original}
                afterImage={caseItem.processed}
                beforeLabel="Original"
                afterLabel="AI Enhanced"
                height="h-96"
              />
            ) : (
              <div className="h-96 relative">
                <img
                  src={caseItem.original}
                  alt={caseItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{caseItem.title}</h2>
            <p className="text-gray-600 mb-4">{caseItem.description}</p>
            
            {caseItem.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {caseItem.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-block bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 