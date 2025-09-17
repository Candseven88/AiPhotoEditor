'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Download, ArrowLeft, Loader2 } from 'lucide-react'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(true)
  const [paymentData, setPaymentData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const token = searchParams.get('token')
  const payerId = searchParams.get('PayerID')

  useEffect(() => {
    if (token && payerId) {
      capturePayment(token)
    } else {
      setError('Missing payment information')
      setIsProcessing(false)
    }
  }, [token, payerId])

  const capturePayment = async (orderToken: string) => {
    try {
      // 从 localStorage 获取图像索引信息
      const imageIndex = localStorage.getItem('pendingPaymentImageIndex')
      
      const response = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderID: orderToken })
      })

      if (!response.ok) {
        throw new Error('Failed to capture payment')
      }

      const data = await response.json()
      
      if (data.success) {
        setPaymentData({
          ...data,
          imageIndex: imageIndex ? parseInt(imageIndex) : 0
        })
        
        // 清除待处理的支付信息
        localStorage.removeItem('pendingPaymentImageIndex')
        
        // 通知父页面支付成功
        if (typeof window !== 'undefined') {
          window.postMessage({
            type: 'PAYMENT_SUCCESS',
            imageIndex: imageIndex ? parseInt(imageIndex) : 0
          }, '*')
        }
      } else {
        throw new Error(data.error || 'Payment capture failed')
      }
    } catch (error) {
      console.error('Payment capture error:', error)
      setError(error instanceof Error ? error.message : 'Payment failed')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReturnToApp = () => {
    router.push('/image-to-image')
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Processing Your Payment
          </h2>
          <p className="text-gray-600">
            Please wait while we confirm your payment...
          </p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <motion.div 
          className="text-center max-w-md mx-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-red-500 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Failed
          </h2>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <button
            onClick={handleReturnToApp}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to App</span>
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <motion.div 
        className="text-center max-w-md mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 成功图标 */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        {/* 成功标题 */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>

        {/* 支付详情 */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold text-green-600">$0.80</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-mono text-sm text-gray-800">
                {paymentData?.transactionID?.slice(0, 8)}...
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Image:</span>
              <span className="font-semibold text-orange-600">
                #{paymentData?.imageIndex + 1}
              </span>
            </div>
          </div>
        </div>

        {/* 成功消息 */}
        <p className="text-gray-600 mb-6">
          Your image has been unlocked and is ready to download!
        </p>

        {/* 操作按钮 */}
        <div className="space-y-3">
          <button
            onClick={handleReturnToApp}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Your Image</span>
          </button>
          
          <button
            onClick={handleReturnToApp}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-6 rounded-lg font-medium transition-colors"
          >
            Return to App
          </button>
        </div>

        {/* 提示信息 */}
        <p className="text-xs text-gray-500 mt-6">
          You can now download your unlocked image from the main application.
        </p>
      </motion.div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Loading...
          </h2>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
} 