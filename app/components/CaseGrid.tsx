'use client'

import { motion } from 'framer-motion'
import CaseCard from './CaseCard'

interface CaseImage {
  id: string
  original: string
  processed?: string
  title: string
  description: string
  category: 'skiing' | 'vehicle' | 'portrait' | 'swimming' | 'other'
  keywords: string[]
}

interface CaseGridProps {
  cases: CaseImage[]
  onCaseClick?: (caseItem: CaseImage) => void
  showKeywords?: boolean
  maxItems?: number
  title?: string
  description?: string
}

export default function CaseGrid({ 
  cases, 
  onCaseClick, 
  showKeywords = false,
  maxItems = 6,
  title,
  description
}: CaseGridProps) {
  const displayedCases = cases.slice(0, maxItems)

  return (
    <div>
      {(title || description) && (
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          )}
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
          )}
        </motion.div>
      )}
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {displayedCases.map((caseItem, index) => (
          <motion.div
            key={caseItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <CaseCard
              caseItem={caseItem}
              onClick={onCaseClick}
              showKeywords={showKeywords}
              variant="grid"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
} 