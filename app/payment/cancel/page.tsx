'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'

export default function PaymentCancelPage() {
  const router = useRouter()

  const handleReturnToApp = () => {
    router.push('/image-to-image')
  }

  const handleTryAgain = () => {
    router.push('/image-to-image')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <motion.div 
        className="text-center max-w-md mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 取消图标 */}
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-orange-600" />
        </div>

        {/* 取消标题 */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>

        {/* 取消消息 */}
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges were made to your account.
        </p>

        {/* 操作按钮 */}
        <div className="space-y-3">
          <button
            onClick={handleTryAgain}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          
          <button
            onClick={handleReturnToApp}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to App</span>
          </button>
        </div>

        {/* 提示信息 */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Need help?</strong> Your image is still available for payment. 
            You can try the payment process again anytime.
          </p>
        </div>
      </motion.div>
    </div>
  )
} 