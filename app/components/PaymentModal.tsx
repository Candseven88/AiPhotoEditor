'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, CreditCard, CheckCircle } from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onPaymentSuccess: () => void
  imageIndex: number
  price: number
}

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  onPaymentSuccess, 
  imageIndex, 
  price 
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handlePayPalPayment = async () => {
    setIsProcessing(true)
    
    try {
      // 保存图像索引到 localStorage，供支付成功页面使用
      localStorage.setItem('pendingPaymentImageIndex', imageIndex.toString())
      
      // 创建 PayPal 订单
      const orderResponse = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageIndex })
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order')
      }

      const orderData = await orderResponse.json()
      
      // 重定向到 PayPal 支付页面
      if (orderData.approvalURL) {
        window.location.href = orderData.approvalURL
      } else {
        throw new Error('No approval URL received')
      }
      
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* 背景遮罩 */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        {/* 支付模态框 */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {!paymentSuccess ? (
            <>
              {/* 支付标题 */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Unlock Your Image
                </h3>
                <p className="text-gray-600">
                  Pay once to unlock and download this AI-generated image
                </p>
              </div>

              {/* 价格信息 */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Image #{imageIndex + 1}</span>
                  <span className="text-2xl font-bold text-orange-600">${price}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  One-time payment • No subscription
                </p>
              </div>

              {/* PayPal 支付按钮 */}
              <button
                onClick={handlePayPalPayment}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Pay with PayPal</span>
                  </>
                )}
              </button>

              {/* 支付说明 */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Secure payment powered by PayPal
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  You'll be redirected to PayPal to complete your purchase
                </p>
              </div>
            </>
          ) : (
            /* 支付成功状态 */
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-600">
                Your image is now unlocked and ready to download
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 