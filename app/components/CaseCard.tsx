'use client'

import { motion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'
import Image from 'next/image'

interface CaseImage {
  id: string
  original: string
  processed?: string
  title: string
  description: string
  category: 'skiing' | 'vehicle' | 'portrait' | 'swimming' | 'other'
  keywords: string[]
}

interface CaseCardProps {
  caseItem: CaseImage
  onClick?: (caseItem: CaseImage) => void
  showKeywords?: boolean
  variant?: 'grid' | 'hero' | 'comparison'
}

export default function CaseCard({ 
  caseItem, 
  onClick, 
  showKeywords = false,
  variant = 'grid' 
}: CaseCardProps) {
  const handleClick = () => {
    if (onClick) onClick(caseItem)
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
      whileHover={{ y: -2 }}
      onClick={handleClick}
      layout
    >
      <div className="relative">
        {caseItem.processed ? (
          <div className="relative h-48 overflow-hidden">
            {/* 原图 */}
            <Image
              src={caseItem.original}
              alt={`${caseItem.title} - Original`}
              width={400}
              height={192}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* 处理后图片覆盖层 - 悬停时显示 */}
            <div className="absolute inset-0">
              <Image
                src={caseItem.processed}
                alt={`${caseItem.title} - Enhanced`}
                width={400}
                height={192}
                className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                loading="lazy"
              />
              
              {/* 简化的分割线指示器 */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-orange-500 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
              
              {/* 标签指示器 */}
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Before
              </div>
              <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                After
              </div>
            </div>
          </div>
        ) : (
          <Image
            src={caseItem.original}
            alt={caseItem.title}
            width={400}
            height={192}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        )}
        
        {/* 放大图标 */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
            <Maximize2 className="w-4 h-4 text-gray-700" />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{caseItem.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{caseItem.description}</p>
        
        {caseItem.processed && (
          <div className="mt-3 text-xs text-orange-600 font-medium">
            ✨ Hover to see AI enhancement
          </div>
        )}
        
        {showKeywords && caseItem.keywords.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {caseItem.keywords.slice(0, 3).map((keyword, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
} 