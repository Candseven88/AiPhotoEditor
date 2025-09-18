'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Download, Lock, Eye } from 'lucide-react'
import GradientButton from './ui/GradientButton'
import Image from 'next/image'

interface ImageResultsProps {
  generatedImages: string[]
  originalImageUrls: string[]
  unlockedImages: Set<number>
  onUnlockClick: (index: number) => void
  onDownload: (imageUrl: string, index: number) => void
}

export default function ImageResults({
  generatedImages,
  originalImageUrls,
  unlockedImages,
  onUnlockClick,
  onDownload
}: ImageResultsProps) {
  if (generatedImages.length === 0) return null

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {generatedImages.map((imageUrl, index) => {
            const isUnlocked = unlockedImages.has(index)
            const originalUrl = originalImageUrls[index]
            
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="relative rounded-lg overflow-hidden bg-white shadow-lg">
                  {/* 图片预览 */}
                  <div className="relative">
                    <Image
                      src={imageUrl}
                      alt={`Generated image ${index + 1}`}
                      width={400}
                      height={300}
                      className={`w-full h-64 object-cover transition-all duration-300 ${
                        !isUnlocked ? 'blur-sm' : ''
                      }`}
                    />
                    
                    {/* 未解锁遮罩 */}
                    {!isUnlocked && (
                      <motion.div
                        className="absolute inset-0 bg-gray-900/50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-center text-white">
                          <Lock className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm font-medium">High Quality Result</p>
                          <p className="text-xs opacity-80">Unlock for $0.80</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* 操作按钮 */}
                  <div className="p-4">
                    <div className="flex gap-2">
                      {!isUnlocked ? (
                        <GradientButton
                          size="sm"
                          variant="primary"
                          onClick={() => onUnlockClick(index)}
                          leftIcon={<Lock className="w-4 h-4" />}
                          className="flex-1"
                        >
                          Unlock HD ($0.80)
                        </GradientButton>
                      ) : (
                        <>
                          <GradientButton
                            size="sm"
                            variant="secondary"
                            onClick={() => window.open(originalUrl, '_blank')}
                            leftIcon={<Eye className="w-4 h-4" />}
                            className="flex-1"
                          >
                            View Full
                          </GradientButton>
                          <GradientButton
                            size="sm"
                            variant="primary"
                            onClick={() => onDownload(originalUrl, index)}
                            leftIcon={<Download className="w-4 h-4" />}
                            className="flex-1"
                          >
                            Download
                          </GradientButton>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* 悬停效果 */}
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-orange-300 transition-colors duration-300 pointer-events-none"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      
      {/* 使用提示 */}
      <motion.div
        className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">💡</span>
          </div>
          <div>
            <h4 className="font-medium text-orange-800 mb-1">Pro Tips</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Try different prompts to get varied results</li>
              <li>• Use negative prompts to avoid unwanted elements</li>
              <li>• Higher quality images provide better transformation results</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 