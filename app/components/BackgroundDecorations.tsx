'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* 主要装饰球 - 简化动画 */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/15 to-yellow-200/15 rounded-full opacity-40" />
      
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-blue-200/15 to-purple-200/15 rounded-full opacity-30" />

      {/* 减少装饰Logo，移除复杂动画 */}
      <div className="absolute top-20 right-20 w-16 h-16 opacity-5">
        <Image 
          src="/Logo.png" 
          alt="AI Photo Editor Logo" 
          width={64}
          height={64}
          className="w-full h-full object-contain" 
          loading="lazy"
          priority={false}
        />
      </div>

      {/* 极简装饰元素 - 静态 */}
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-gradient-to-r from-orange-400/30 to-yellow-400/30 rounded-full" />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full" />
    </div>
  )
} 