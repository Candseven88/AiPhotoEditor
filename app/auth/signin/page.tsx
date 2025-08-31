'use client'

import { motion } from 'framer-motion'
import LoginForm from '../../../src/components/auth/LoginForm'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue creating amazing AI images</p>
          </motion.div>
        </div>
        
        <LoginForm />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/auth/signup" className="text-orange-600 hover:text-orange-700 font-medium">
              Sign up here
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
} 