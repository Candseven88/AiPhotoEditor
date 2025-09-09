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
      e.preventDefault()
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
      e.preventDefault()
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
    
    // 使用requestAnimationFrame来确保流畅的动画
    requestAnimationFrame(() => {
      setSliderPosition(Math.max(0, Math.min(100, percentage)))
    })
  }

  const updateSliderPositionTouch = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = (x / rect.width) * 100
    
    // 使用requestAnimationFrame来确保流畅的动画
    requestAnimationFrame(() => {
      setSliderPosition(Math.max(0, Math.min(100, percentage)))
    })
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    const handleGlobalTouchEnd = () => setIsDragging(false)
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = (x / rect.width) * 100
        
        requestAnimationFrame(() => {
          setSliderPosition(Math.max(0, Math.min(100, percentage)))
        })
      }
    }
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging && containerRef.current && e.touches[0]) {
        e.preventDefault()
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.touches[0].clientX - rect.left
        const percentage = (x / rect.width) * 100
        
        requestAnimationFrame(() => {
          setSliderPosition(Math.max(0, Math.min(100, percentage)))
        })
      }
    }
    
    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp)
      document.addEventListener('touchend', handleGlobalTouchEnd)
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false })
    }
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp)
      document.removeEventListener('touchend', handleGlobalTouchEnd)
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('touchmove', handleGlobalTouchMove)
    }
  }, [isDragging])

  return (
    <div className={`relative ${height} ${className}`}>
      {/* 容器 */}
      <div
        ref={containerRef}
        className="group relative w-full h-full overflow-hidden rounded-lg shadow-lg cursor-col-resize"
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
<<<<<<< HEAD
          className="w-full h-full object-cover object-center"
          loading="lazy"
=======
            className="w-full h-full object-cover"
>>>>>>> 42c0f9ce70d7128de9a9abfa72ff03d9ab4401a3
        />
        </div>
        
        {/* After Image (右半部分) */}
        <div
<<<<<<< HEAD
          className="absolute inset-0 w-full h-full overflow-hidden will-change-auto"
          style={{ 
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            transform: 'translateZ(0)' // 启用硬件加速
          }}
=======
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
>>>>>>> 42c0f9ce70d7128de9a9abfa72ff03d9ab4401a3
        >
          <img
            src={afterImage}
            alt="After"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
        
        {/* 滑块分割线 */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-orange-500 cursor-col-resize transition-all duration-200 group-hover:w-2 will-change-transform"
          style={{ 
            left: `${sliderPosition}%`,
            transform: 'translateZ(0)' // 启用硬件加速
          }}
        >
          {/* 滑块手柄 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-orange-500 rounded-full shadow-xl border-3 border-white flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-orange-600">
            <div className="flex space-x-0.5">
              <ChevronLeft className="w-4 h-4 text-white" />
              <ChevronRight className="w-4 h-4 text-white" />
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
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
          <span className="flex items-center gap-2">
            <ChevronLeft className="w-3 h-3" />
            Drag to compare
            <ChevronRight className="w-3 h-3" />
          </span>
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