'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, Globe, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  const privacyFeatures = [
    {
      icon: Shield,
      title: "Data Protection",
      description: "Your creative work and personal information are protected with enterprise-grade security"
    },
    {
      icon: Lock,
      title: "Secure Processing",
      description: "All AI image generation requests are processed through encrypted channels"
    },
    {
      icon: Eye,
      title: "Privacy Control",
      description: "Full control over your data and how it's used in our nano banana ai platform"
    },
    {
      icon: Database,
      title: "Local Processing",
      description: "Option to process images locally for enhanced privacy and security"
    }
  ]

  const dataTypes = [
    {
      category: "Account Information",
      examples: ["Email address", "Username", "Profile preferences"],
      purpose: "Account creation and management"
    },
    {
      category: "Usage Data",
      examples: ["Generated images", "Prompt history", "Feature usage"],
      purpose: "Service improvement and personalization"
    },
    {
      category: "Technical Data",
      examples: ["Device information", "IP address", "Browser type"],
      purpose: "Platform optimization and security"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/Logo.png" 
              alt="NanoBanana AI Logo" 
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-xl font-bold text-gray-800">NanoBanana AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="/home" 
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Home
            </a>
            <a 
              href="/text-to-image" 
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Text to Image
            </a>
            <a 
              href="/image-to-image" 
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Image to Image
            </a>
            <a 
              href="/cases" 
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Gallery
            </a>
            <a 
              href="/blog" 
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Blog
            </a>
            <a 
              href="/about" 
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              About
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 pt-20">
        {/* 页面标题 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            At Nano Banana AI, we're committed to protecting your privacy and ensuring the security of your data. 
            Learn how we safeguard your information while providing our lightweight AI image generator services.
          </p>
        </motion.div>

        {/* 隐私承诺 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Privacy Commitment
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe that privacy is fundamental to building trust in AI technology. Our nano banana ai platform 
              is designed with your privacy and security as top priorities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {privacyFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100 text-center hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* 信息收集 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To provide our AI image generation services, we collect certain types of information. 
              Here's what we gather and why it's necessary for our nano banana ai platform to function effectively.
            </p>
          </div>
          
          <div className="space-y-6">
            {dataTypes.map((dataType, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{dataType.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                    <ul className="space-y-1">
                      {dataType.examples.map((example, i) => (
                        <li key={i} className="flex items-center space-x-2 text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Purpose:</h4>
                    <p className="text-gray-600">{dataType.purpose}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 数据使用 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your data helps us provide and improve our lightweight AI image generator services. 
              We're transparent about how your information contributes to enhancing the nano banana ai experience.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Service Provision
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">AI Image Generation</h4>
                      <p className="text-gray-600">Process your text-to-image and image-to-image requests</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Account Management</h4>
                      <p className="text-gray-600">Maintain your user profile and preferences</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Technical Support</h4>
                      <p className="text-gray-600">Provide assistance and resolve issues</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Service Improvement
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Performance Optimization</h4>
                      <p className="text-gray-600">Enhance our nano banana ai model efficiency</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Feature Development</h4>
                      <p className="text-gray-600">Create new AI image generation capabilities</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">User Experience</h4>
                      <p className="text-gray-600">Improve platform usability and accessibility</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 数据保护 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Data Protection & Security
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We implement industry-leading security measures to protect your data and ensure 
              the privacy of your creative work on our nano banana ai platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Encryption & Security</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>End-to-end encryption for all data transmission</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Secure data centers with 24/7 monitoring</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Regular security audits and penetration testing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Compliance with international security standards</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Control</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Full control over your personal information</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Option to delete your data at any time</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Transparent data processing practices</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>No third-party data sharing without consent</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 用户权利 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Privacy Rights
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              As a user of our nano banana ai platform, you have specific rights regarding your data. 
              We're committed to honoring these rights and providing you with full control over your information.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Access",
                  description: "View all personal data we have about you",
                  icon: Eye
                },
                {
                  title: "Correction",
                  description: "Update or correct inaccurate information",
                  icon: CheckCircle
                },
                {
                  title: "Deletion",
                  description: "Request removal of your personal data",
                  icon: AlertTriangle
                },
                {
                  title: "Portability",
                  description: "Download your data in a portable format",
                  icon: Database
                },
                {
                  title: "Restriction",
                  description: "Limit how we process your information",
                  icon: Lock
                },
                {
                  title: "Objection",
                  description: "Object to certain data processing activities",
                  icon: Info
                }
              ].map((right, index) => {
                const Icon = right.icon
                return (
                  <div key={index} className="text-center p-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{right.title}</h3>
                    <p className="text-sm text-gray-600">{right.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* 联系信息 */}
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We're committed to transparency and are here to answer any questions about how we protect your data 
              on our nano banana ai platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/about"
                className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Contact Us
              </Link>
              <Link 
                href="/terms"
                className="px-8 py-3 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 