'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // 自动重定向到 /home 页面
    router.push('/home')
  }, [router])

  // 显示加载状态
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Redirecting to NanoBanana Home...</p>
      </div>
    </div>
  )
} 