// 根页面 - 显示简单的重定向页面
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  
  // 确保只在客户端运行
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    if (!mounted) return
    
    // 检测浏览器语言
    const acceptLanguage = navigator.language || 'en'
    const isJapanese = acceptLanguage.startsWith('ja')
    
    // 重定向到相应的语言版本
    if (isJapanese) {
      router.replace('/ja')
    } else {
      router.replace('/en')
    }
  }, [router, mounted])

  // 显示加载页面，避免白屏
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading AI Photo Editor...</p>
      </div>
    </div>
  )
} 