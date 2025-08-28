'use client'

import { motion } from 'framer-motion'
import { Users, Zap, Star, Shield, Heart, Award, ArrowRight } from 'lucide-react'
import Navigation from '../components/Navigation'

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief AI Officer",
      bio: "Leading our nano banana ai research and development with 15+ years in machine learning",
      image: "/team/sarah-chen.jpg"
    },
    {
      name: "Mike Rodriguez",
      role: "Head of Product",
      bio: "Ensuring our lightweight AI image generator delivers exceptional user experience",
      image: "/team/mike-rodriguez.jpg"
    },
    {
      name: "Emma Thompson",
      role: "Creative Director",
      bio: "Shaping the future of AI-powered creative tools and natural language editing",
      image: "/team/emma-thompson.jpg"
    }
  ]

  const milestones = [
    {
      year: "2024",
      title: "Nano Banana AI Launch",
      description: "Released our revolutionary lightweight AI image generator powered by Google nano-banana model"
    },
    {
      year: "2023",
      title: "Technology Breakthrough",
      description: "Developed the core nano banana ai technology for efficient image generation"
    },
    {
      year: "2022",
      title: "Research Foundation",
      description: "Established research partnerships for AI image generation innovation"
    }
  ]

  const values = [
    {
      icon: Zap,
      title: "Innovation",
      description: "Pushing the boundaries of what's possible with AI image generation"
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Designing tools that empower creators of all skill levels"
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Ensuring your creative work and data remain protected"
    },
    {
      icon: ArrowRight,
      title: "Accessibility",
      description: "Making AI image generation available to everyone, everywhere"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      {/* 导航栏 */}
      <Navigation />

      <div className="container mx-auto px-4 py-8 pt-20">
        {/* 页面标题 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6">
            About Nano Banana AI
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            We're revolutionizing the world of AI image generation with our lightweight, powerful nano banana ai technology. 
            Learn about our mission to democratize creative tools and make AI image generation accessible to everyone.
          </p>
        </motion.div>

        {/* 我们的故事 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story: Pioneering Lightweight AI Image Generation
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Nano Banana AI was born from a simple yet powerful vision: to make AI image generation accessible, 
                fast, and efficient for creators worldwide. We recognized that existing solutions were either too 
                resource-intensive or too complex for everyday users.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our breakthrough came with the development of the Google nano-banana model, a revolutionary 
                lightweight AI architecture that delivers exceptional image quality while maintaining blazing-fast 
                processing speeds. This technology enables our nano banana image generator to work seamlessly 
                across all devices and platforms.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to serve thousands of creators, from professional artists to hobbyists, 
                helping them bring their visions to life through our innovative text-to-image and image-to-image 
                capabilities.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-200 to-yellow-200 rounded-2xl p-8 h-80 flex items-center justify-center overflow-hidden">
                <img
                  src="/cases/Baby Saja.jpg"
                  alt="Our Mission"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Award className="w-24 h-24 mx-auto mb-4 text-orange-300" />
                  <p className="text-lg font-medium">Our Mission</p>
                  <p className="text-sm mt-2">Democratizing AI Image Generation</p>
                  </div>
                </div>
              </div>
              
              {/* 装饰元素 */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-orange-300 to-yellow-300 rounded-full opacity-80"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full opacity-60"
                animate={{ 
                  scale: [1.1, 1, 1.1],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>

        {/* 我们的使命和愿景 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To democratize AI image generation by providing a lightweight, accessible, and powerful platform 
                that empowers creators of all skill levels to bring their ideas to life through natural language editing 
                and advanced image transformation.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mb-6">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                A world where anyone can create stunning visuals instantly, where the barrier between imagination 
                and creation is eliminated, and where AI image generation becomes as natural as typing or drawing.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 核心价值 */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide our development of nano banana ai technology and shape our company culture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100 text-center hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* 技术优势 */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Nano Banana AI Technology?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover what makes our lightweight AI image generator stand out from the competition
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  The Google Nano-Banana Model Advantage
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Lightweight Architecture</h4>
                      <p className="text-gray-600">Our nano banana ai model is optimized for speed and efficiency</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Superior Quality</h4>
                      <p className="text-gray-600">Professional-grade results that rival traditional methods</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Natural Language Processing</h4>
                      <p className="text-gray-600">Advanced understanding of creative descriptions and context</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Comparing Nano Banana vs Stable Diffusion
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Faster Processing</h4>
                      <p className="text-gray-600">Generate images in seconds, not minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Lower Resource Usage</h4>
                      <p className="text-gray-600">Works smoothly on any device or platform</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Better User Experience</h4>
                      <p className="text-gray-600">Intuitive interface designed for creators</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 发展历程 */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key milestones in our mission to revolutionize AI image generation
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* 时间线连接线 */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-orange-200"></div>
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="relative flex items-start space-x-6 mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                    {milestone.year}
                  </div>
                  <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 团队介绍 */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind our nano banana ai technology and platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100 text-center hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 联系我们 */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Experience Nano Banana AI?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of creators who are already using our lightweight AI image generator 
              to bring their ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/home"
                className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Try Nano Banana AI
              </a>
              <a 
                href="/blog"
                className="px-8 py-3 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium"
              >
                Learn More
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 