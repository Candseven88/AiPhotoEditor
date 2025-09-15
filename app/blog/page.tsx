'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react'
import Navigation from '../components/Navigation'
import Card from '../components/ui/Card'
import GradientButton from '../components/ui/GradientButton'
import Link from 'next/link'

const blogPosts = [
  {
    id: 'edit-pro-tips-ai',
    title: 'Edit Pro Tips AI: Master Professional AI Image Editing Techniques',
    excerpt: 'Discover the latest AI editing trends and learn how AI Photo Editor revolutionizes content creation for Instagram, CapCut, and social media platforms.',
    date: '2025-01-20',
    author: 'AI Creative Team',
    readTime: '8 min read',
    tags: ['Edit Pro Tips', 'AI Editing', 'Social Media', 'Instagram', 'CapCut'],
    gradient: 'from-purple-500 to-pink-500',
    featured: true
  },
  {
          id: 'aiphotoeditor-revolution',
      title: 'AI Photo Editor: Revolutionizing Creative Workflows for Everyone',
      excerpt: 'Discover how AI Photo Editor is democratizing artificial intelligence for creators, making professional-grade image generation accessible to all.',
    date: '2025-01-18',
    author: 'AI Photo Editor Team',
    readTime: '6 min read',
    tags: ['AI Photo Editor', 'AI Revolution', 'Creative Workflows'],
    gradient: 'from-orange-500 to-yellow-500',
    featured: false
  },
  {
    id: 'aiphotoeditor-vs-seedream',
    title: 'AI Photo Editor vs Seedream: Performance Comparison & Which Should You Choose?',
    excerpt: 'A comprehensive comparison between AI Photo Editor and Seedream models, analyzing speed, quality, features, and value for different use cases.',
    date: '2025-01-16',
    author: 'AI Comparison Team',
    readTime: '8 min read',
    tags: ['AI Photo Editor', 'Seedream', 'Performance', 'Comparison'],
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    id: 'aiphotoeditor-features-guide',
    title: 'Complete Guide to AI Photo Editor Features: From UserName to Photo Magic',
    excerpt: 'Master all three core features of AI Photo Editor: AI UserName to Photo Editor, AI Text to Photo Editor, and advanced AI Photo to Photo Editor.',
    date: '2025-01-14',
    author: 'Product Team',
    readTime: '10 min read',
    tags: ['AI Photo Editor', 'Features', 'Tutorial', 'User Guide'],
    gradient: 'from-green-500 to-teal-500'
  },
  {
    id: 'aiphotoeditor-success-stories',
    title: 'AI Photo Editor Success Stories: How 10M+ Users Are Creating Amazing Content',
    excerpt: 'Real stories from AI Photo Editor users: social media managers, indie developers, content creators, and businesses transforming their visual content.',
    date: '2025-01-12',
    author: 'Community Team',
    readTime: '7 min read',
    tags: ['AI Photo Editor', 'Success Stories', 'Case Studies', 'Community'],
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'aiphotoeditor-future-roadmap',
    title: 'The Future of AI Photo Editor: 2025 Roadmap and Upcoming Features',
    excerpt: 'Get an exclusive look at what\'s coming to AI Photo Editor: new models, enhanced features, and revolutionary capabilities planned for 2025.',
    date: '2025-01-10',
    author: 'Research & Development',
    readTime: '5 min read',
    tags: ['AI Photo Editor', 'Roadmap', 'Future Features', 'Innovation'],
    gradient: 'from-red-500 to-orange-500'
  }
]

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState('All')
  
  const allTags = ['All', ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))]
  
  const filteredPosts = selectedTag === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.tags.includes(selectedTag))

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 relative overflow-hidden">
      <Navigation />
      
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full"
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl blur-lg opacity-30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative bg-white rounded-2xl p-3 shadow-xl">
                  <Sparkles className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <h1 className="ml-4 text-5xl md:text-6xl font-bold">
                <span className="gradient-text">Seedream</span>
                <span className="text-gray-800"> Blog</span>
              </h1>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Latest News & Insights on
              <span className="gradient-text"> AI Image Generation</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Stay updated with the latest developments in Seedream AI technology, 
              tutorials, comparisons, and industry insights from our expert team.
            </p>
            
            {/* Blog Logo展示区域 - 位于描述下方 */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="relative inline-block">
                <motion.div
                  className="relative z-10"
                  animate={{ 
                    rotate: [0, 3, -3, 0],
                    y: [0, -6, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <img 
                    src="/Logo.png" 
                    alt="AI Photo Editor Blog - Learning Hub" 
                    className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-lg cursor-pointer"
                  />
                </motion.div>
                
                {/* 知识光环效果 */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-400/15 via-purple-400/15 to-indigo-400/15 rounded-full blur-lg"
                  animate={{ 
                    scale: [1, 1.15, 1],
                    opacity: [0.15, 0.3, 0.15]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                
                {/* 简化的学习图标 */}
                {['📚', '✍️'].map((emoji, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-sm opacity-25"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: '0 0',
                    }}
                    animate={{
                      rotate: [i * 180, (i * 180) + 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 1
                    }}
                  >
                    <div 
                      style={{
                        transform: `translate(-50%, -50%) translateY(-40px)`
                      }}
                    >
                      {emoji}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                className="mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="text-xs font-medium text-gray-500">
                  📚 Learn with your banana buddy
                </p>
              </motion.div>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
              <Link href="/">
                <GradientButton
                  size="sm"
                  variant="secondary"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Try AI Tools Now
                </GradientButton>
              </Link>
              <Link href="/seedream">
                <GradientButton
                  size="sm"
                  variant="outline"
                  leftIcon={<Zap className="w-4 h-4" />}
                >
                  Explore Seedream 4.0
                </GradientButton>
              </Link>
            </div>

            {/* Tag filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {allTags.map((tag) => (
                <motion.button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedTag === tag
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="container mx-auto px-4 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Featured Article</h3>
              <Card variant="glass" size="lg" hover={true} className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-orange-600">FEATURED</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link href={`/blog/${featuredPost.id}`}>
                      <GradientButton
                        variant="primary"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        Read Full Article
                      </GradientButton>
                    </Link>
                  </div>
                  
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${featuredPost.gradient} opacity-20 rounded-lg`} />
                    <div className="relative h-full min-h-[300px] flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-32 h-32 opacity-30"
                      >
                        <img src="/Logo.png" alt="Featured" className="w-full h-full object-contain" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Latest Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card variant="glass" hover={true} className="h-full">
                    <div className="p-6">
                      <div className={`w-full h-32 bg-gradient-to-br ${post.gradient} rounded-lg mb-4 relative overflow-hidden`}>
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Zap className="w-12 h-12 text-white/80" />
                        </motion.div>
                      </div>
                      
                      <h4 className="font-bold text-gray-800 mb-3 leading-tight">
                        {post.title}
                      </h4>
                      
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link href={`/blog/${post.id}`}>
                        <GradientButton
                          size="sm"
                          variant="secondary"
                          rightIcon={<ArrowRight className="w-3 h-3" />}
                          className="w-full"
                        >
                          Read More
                        </GradientButton>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
} 