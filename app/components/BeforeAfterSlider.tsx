'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  height?: string
  className?: string
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  height = 'h-64',
  className = ''
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateSliderPosition(e)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    updateSliderPositionTouch(e)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      updateSliderPositionTouch(e)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const updateSliderPosition = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const updateSliderPositionTouch = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = (x / rect.width) * 100
    
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    const handleGlobalTouchEnd = () => setIsDragging(false)
    
    document.addEventListener('mouseup', handleGlobalMouseUp)
    document.addEventListener('touchend', handleGlobalTouchEnd)
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp)
      document.removeEventListener('touchend', handleGlobalTouchEnd)
    }
  }, [])

  return (
    <div className={`relative ${height} ${className}`}>
      {/* 容器 */}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden rounded-lg shadow-lg cursor-col-resize"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Before Image (左半部分) */}
        <div className="absolute inset-0 w-full h-full">
        <img
          src={beforeImage}
          alt="Before"
            className="w-full h-full object-cover"
        />
        </div>
        
        {/* After Image (右半部分) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={afterImage}
            alt="After"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* 滑块分割线 */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-orange-500 cursor-col-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* 滑块手柄 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-orange-500 rounded-full shadow-lg border-2 border-white flex items-center justify-center">
            <div className="flex space-x-1">
              <ChevronLeft className="w-3 h-3 text-white" />
              <ChevronRight className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
        
        {/* 标签 */}
        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
          {beforeLabel}
        </div>
        <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
          {afterLabel}
        </div>
        
        {/* 悬停提示 */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-2 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Drag to compare
        </div>
      </div>
      
      {/* 控制按钮 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button
          onClick={() => setSliderPosition(0)}
          className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setSliderPosition(50)}
          className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-colors"
        >
          <span className="text-xs font-medium">50%</span>
        </button>
        <button
          onClick={() => setSliderPosition(100)}
          className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 