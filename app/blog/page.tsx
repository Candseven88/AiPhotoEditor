'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ArrowRight, Search, Filter, BookOpen, Lightbulb, Palette, Zap } from 'lucide-react'
import Navigation from '../components/Navigation'
import Link from 'next/link'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "How Does Nano Banana AI Work? A Complete Guide",
      excerpt: "Discover the inner workings of our lightweight AI image generator and learn how to create stunning visuals with natural language editing.",
      category: "AI Technology",
      author: "NanoBanana Team",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "/cases/Baby Saja.jpg",
      tags: ["nano banana ai", "ai image generation", "how does nano banana ai work"]
    },
    {
      id: 2,
      title: "Nano Banana vs Stable Diffusion: Which AI Image Generator is Right for You?",
      excerpt: "Compare the performance, speed, and quality of our nano banana image generator against popular alternatives like Stable Diffusion.",
      category: "Comparison",
      author: "AI Expert",
      date: "2024-01-12",
      readTime: "12 min read",
      image: "/cases/冬季男子雪地上滑雪.jpg",
      tags: ["nano banana vs stable diffusion", "ai image generator comparison", "stable diffusion alternative"]
    },
    {
      id: 3,
      title: "Google Secret Image Model: Unveiling the Technology Behind Nano Banana AI",
      excerpt: "Explore the cutting-edge Google nano-banana model that powers our lightweight image AI platform and delivers exceptional results.",
      category: "Technology",
      author: "Tech Researcher",
      date: "2024-01-10",
      readTime: "10 min read",
      image: "/cases/红色福特重点车辆在白天的蓝色天空下的沙子上驾驶.jpg",
      tags: ["google nano-banana model", "google secret image model", "nano banana ai technology"]
    },
    {
      id: 4,
      title: "Lightweight AI Image Generator: Why Size Matters in AI",
      excerpt: "Learn why our lightweight approach to AI image generation provides faster results and better user experience without compromising quality.",
      category: "Performance",
      author: "Performance Engineer",
      date: "2024-01-08",
      readTime: "6 min read",
      image: "/cases/黑色道奇challenger Coupe.jpg",
      tags: ["lightweight image ai", "lightweight ai image generator", "ai performance optimization"]
    },
    {
      id: 5,
      title: "Text-to-Image Revolution: Creating Art with Natural Language",
      excerpt: "Explore the power of text-to-image generation and how natural language editing is changing the creative landscape.",
      category: "Creative Tools",
      author: "Creative Director",
      date: "2024-01-05",
      readTime: "9 min read",
      image: "/cases/两名女子滑雪的照片.jpg",
      tags: ["text-to-image", "natural language editing", "ai art creation"]
    },
    {
      id: 6,
      title: "Image-to-Image Transformation: Beyond Simple Filters",
      excerpt: "Discover advanced image-to-image capabilities that go beyond traditional photo editing and create truly transformative results.",
      category: "Image Editing",
      author: "Photo Editor",
      date: "2024-01-03",
      readTime: "7 min read",
      image: "/cases/在水中游泳的白色monokini的女人.jpg",
      tags: ["image to image", "ai photo editing", "photo editing ai"]
    }
  ]

  const categories = [
    { name: "All", count: blogPosts.length, icon: BookOpen },
    { name: "AI Technology", count: 1, icon: Zap },
    { name: "Comparison", count: 1, icon: Filter },
    { name: "Technology", count: 1, icon: Lightbulb },
    { name: "Performance", count: 1, icon: Zap },
    { name: "Creative Tools", count: 1, icon: Palette },
    { name: "Image Editing", count: 1, icon: Palette }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8 pt-20">
        {/* 页面标题 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6">
            Nano Banana AI Blog
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover insights, tutorials, and the latest developments in AI image generation technology. 
            Learn how our nano banana ai platform is revolutionizing creative workflows.
          </p>
        </motion.div>

        {/* 搜索和过滤 */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-orange-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles about nano banana ai, AI image generation..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
                Search
              </button>
            </div>
          </div>
        </motion.div>

        {/* 分类过滤 */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.button
                  key={category.name}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-orange-100 hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <Icon className="w-4 h-4 text-orange-500" />
                  <span className="font-medium text-gray-700">{category.name}</span>
                  <span className="text-sm text-gray-500 bg-orange-100 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* 博客文章网格 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-orange-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <div className="h-48 bg-gradient-to-br from-orange-200 to-yellow-200 flex items-center justify-center">
                <img
                  src={post.image || "/cases/three girls laughing.jpg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 font-medium transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* 特色文章 */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h2>
            <p className="text-lg text-gray-600">
              Deep dive into the most important topics about nano banana ai and AI image generation
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  How Does Nano Banana AI Work? A Complete Guide
                </h3>
                <p className="text-gray-600 mb-6">
                  Get a comprehensive understanding of our lightweight AI image generator technology. 
                  Learn how the Google nano-banana model processes your requests and delivers stunning results.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    January 15, 2024
                  </span>
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    NanoBanana Team
                  </span>
                </div>
                <Link 
                  href="/blog/1"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
              <div className="h-64 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-lg flex items-center justify-center">
                <img
                  src="/cases/three girls laughing.jpg"
                  alt="How Does Nano Banana AI Work?"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 订阅区域 */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated with Nano Banana AI
            </h3>
            <p className="text-gray-600 mb-6">
              Get the latest insights about AI image generation, nano banana ai updates, and creative tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 