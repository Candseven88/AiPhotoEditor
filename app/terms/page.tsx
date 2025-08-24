'use client'

import { motion } from 'framer-motion'
import { FileText, CheckCircle, AlertTriangle, Shield, Users, Globe, Zap, Palette } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
  const serviceFeatures = [
    {
      icon: Zap,
      title: "AI Image Generation",
      description: "Access to our lightweight AI image generator powered by nano banana ai technology"
    },
    {
      icon: Palette,
      title: "Creative Tools",
      description: "Text-to-image and image-to-image transformation capabilities"
    },
    {
      icon: Users,
      title: "User Accounts",
      description: "Personalized experience with saved preferences and generation history"
    },
    {
      icon: Globe,
      title: "Cross-Platform Access",
      description: "Use our services on any device or platform"
    }
  ]

  const prohibitedUses = [
    "Creating harmful, offensive, or inappropriate content",
    "Generating images that infringe on intellectual property rights",
    "Using our nano banana ai platform for illegal activities",
    "Attempting to reverse engineer our technology",
    "Sharing generated content without proper attribution",
    "Using the service for commercial purposes without permission"
  ]

  const userObligations = [
    "Provide accurate account information",
    "Use the service responsibly and ethically",
    "Respect intellectual property rights",
    "Report any security concerns immediately",
    "Comply with all applicable laws and regulations",
    "Maintain the confidentiality of your account"
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
            Terms of Service
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            These terms govern your use of Nano Banana AI's lightweight AI image generator platform. 
            By using our services, you agree to these terms and our commitment to providing exceptional AI image generation tools.
          </p>
        </motion.div>

        {/* 服务概述 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nano Banana AI provides cutting-edge AI image generation technology through our nano banana ai platform, 
              offering both text-to-image and image-to-image capabilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceFeatures.map((feature, index) => {
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

        {/* 接受条款 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Acceptance of Terms
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                By accessing or using our nano banana ai platform, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">What This Means:</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>You accept our service terms and conditions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>You agree to use our AI image generator responsibly</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>You understand your rights and obligations</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Updates to Terms:</h3>
                <p className="text-gray-600 mb-4">
                  We may update these terms periodically to reflect changes in our services or legal requirements. 
                  Continued use of our nano banana ai platform after changes constitutes acceptance of the new terms.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>Note:</strong> We'll notify users of significant changes via email or platform notifications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 用户权利和义务 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Rights</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Access to Services</h4>
                    <p className="text-gray-600">Use our lightweight AI image generator as intended</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Data Control</h4>
                    <p className="text-gray-600">Manage your account and personal information</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Support</h4>
                    <p className="text-gray-600">Receive technical assistance when needed</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Privacy Protection</h4>
                    <p className="text-gray-600">Your data is protected according to our privacy policy</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Obligations</h3>
              <div className="space-y-4">
                {userObligations.map((obligation, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{obligation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 禁止使用 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Prohibited Uses
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To maintain a safe and ethical environment for all users of our nano banana ai platform, 
              certain activities are strictly prohibited.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Not Allowed</h3>
                <div className="space-y-3">
                  {prohibitedUses.slice(0, 3).map((use, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{use}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Restrictions</h3>
                <div className="space-y-3">
                  {prohibitedUses.slice(3).map((use, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{use}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Consequences of Violation</h4>
                  <p className="text-red-700">
                    Violation of these terms may result in account suspension, termination, or legal action. 
                    We reserve the right to take appropriate measures to protect our nano banana ai platform and its users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 知识产权 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Intellectual Property Rights
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding the ownership and usage rights for content generated through our nano banana ai platform
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Technology</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Platform Ownership</h4>
                      <p className="text-gray-600">Nano Banana AI retains rights to our nano banana ai technology and platform</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">AI Models</h4>
                      <p className="text-gray-600">Our Google nano-banana model and algorithms are proprietary</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">User Interface</h4>
                      <p className="text-gray-600">Design, layout, and functionality are our intellectual property</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Content</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Generated Images</h4>
                      <p className="text-gray-600">You own the rights to images created using our AI image generator</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Usage Rights</h4>
                      <p className="text-gray-600">Use generated content for personal or commercial purposes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Attribution</h4>
                      <p className="text-gray-600">Credit Nano Banana AI when sharing or publishing content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 免责声明 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Disclaimers & Limitations
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Important information about the limitations of our nano banana ai services and your use of our platform
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-800 mb-3">Service Availability</h3>
                <p className="text-yellow-700">
                  While we strive for 99.9% uptime, our lightweight AI image generator may experience occasional 
                  downtime for maintenance or technical issues. We're not liable for any losses due to service interruptions.
                </p>
              </div>
              
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-3">AI Generation Quality</h3>
                <p className="text-blue-700">
                  Our nano banana ai technology produces high-quality results, but AI-generated content may not always 
                  meet specific expectations. Users are responsible for reviewing and approving generated content.
                </p>
              </div>
              
              <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-3">Legal Compliance</h3>
                <p className="text-green-700">
                  Users are responsible for ensuring that their use of our AI image generator complies with all 
                  applicable laws, including copyright, trademark, and content regulations.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 联系和支持 */}
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We're here to help clarify any aspects of our Terms of Service or how they apply to your use of 
              our nano banana ai platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/about"
                className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Contact Us
              </Link>
              <Link 
                href="/privacy"
                className="px-8 py-3 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 