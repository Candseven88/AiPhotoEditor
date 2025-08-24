'use client'

import { motion } from 'framer-motion'
import { Calendar, User, Clock, Share2, ArrowLeft, Tag, BookOpen, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function BlogPostPage() {
  const params = useParams()
  const postId = params.id

  // 模拟博客文章数据
  const blogPost = {
    id: 1,
    title: "How Does Nano Banana AI Work? A Complete Guide to AI Image Generation",
    excerpt: "Discover the inner workings of our lightweight AI image generator and learn how to create stunning visuals with natural language editing powered by the revolutionary Google nano-banana model.",
    content: `
      <p>Artificial Intelligence has revolutionized the way we create and manipulate images, and Nano Banana AI stands at the forefront of this transformation. Our lightweight AI image generator combines cutting-edge technology with user-friendly design to deliver exceptional results.</p>
      
      <h2>Understanding the Google Nano-Banana Model</h2>
      <p>At the heart of Nano Banana AI lies the revolutionary Google nano-banana model, a secret image model that has been optimized for speed and quality. This lightweight AI architecture enables us to process image generation requests faster than traditional models while maintaining exceptional output quality.</p>
      
      <p>The nano banana ai technology represents a breakthrough in efficient AI processing, allowing users to generate stunning visuals in seconds rather than minutes. This makes it an ideal choice for professionals who need quick results without compromising on quality.</p>
      
      <h2>Text-to-Image Generation Process</h2>
      <p>Our text-to-image feature works by analyzing your natural language descriptions and converting them into visual representations. The process involves several sophisticated steps:</p>
      
      <ul>
        <li><strong>Natural Language Processing:</strong> Your text input is analyzed and broken down into key visual elements</li>
        <li><strong>Context Understanding:</strong> The AI interprets the context and style requirements</li>
        <li><strong>Image Synthesis:</strong> Multiple image variations are generated using advanced algorithms</li>
        <li><strong>Quality Optimization:</strong> The best results are selected and refined for optimal output</li>
      </ul>
      
      <h2>Image-to-Image Transformation</h2>
      <p>Beyond simple text-to-image generation, Nano Banana AI excels at transforming existing images. Our image-to-image capabilities allow you to:</p>
      
      <ul>
        <li>Apply artistic styles and filters</li>
        <li>Remove unwanted elements from photos</li>
        <li>Enhance image quality and resolution</li>
        <li>Create variations with different color schemes</li>
        <li>Transform photos into various art styles</li>
      </ul>
      
      <h2>Why Choose Nano Banana AI Over Alternatives?</h2>
      <p>When comparing nano banana vs stable diffusion or other AI image generators, several key advantages become apparent:</p>
      
      <ul>
        <li><strong>Speed:</strong> Our lightweight approach ensures faster generation times</li>
        <li><strong>Efficiency:</strong> Lower computational requirements mean better accessibility</li>
        <li><strong>Quality:</strong> Advanced algorithms deliver professional-grade results</li>
        <li><strong>User Experience:</strong> Intuitive interface designed for creators of all skill levels</li>
      </ul>
      
      <h2>Real-World Applications</h2>
      <p>Nano Banana AI serves various creative professionals and enthusiasts:</p>
      
      <ul>
        <li><strong>Digital Artists:</strong> Create concept art and illustrations quickly</li>
        <li><strong>Marketing Teams:</strong> Generate visual content for campaigns</li>
        <li><strong>Content Creators:</strong> Produce engaging visuals for social media</li>
        <li><strong>Designers:</strong> Prototype ideas and explore creative directions</li>
      </ul>
      
      <h2>Getting Started with Nano Banana AI</h2>
      <p>To begin your journey with our AI image generator:</p>
      
      <ol>
        <li>Visit our platform and choose between text-to-image or image-to-image modes</li>
        <li>Input your description or upload an existing image</li>
        <li>Customize your preferences and style options</li>
        <li>Generate your image and download the result</li>
        <li>Iterate and refine until you achieve your desired outcome</li>
      </ol>
      
      <h2>The Future of AI Image Generation</h2>
      <p>As we continue to develop and refine our nano banana ai technology, users can expect even more advanced features and capabilities. The lightweight AI image generator market is evolving rapidly, and we're committed to staying at the forefront of innovation.</p>
      
      <p>Whether you're a professional artist, a marketing specialist, or simply someone who loves to create, Nano Banana AI provides the tools you need to bring your vision to life. Experience the power of AI-driven creativity today.</p>
    `,
    category: "AI Technology",
    author: "NanoBanana Team",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["nano banana ai", "ai image generation", "how does nano banana ai work", "google nano-banana model", "lightweight image ai"],
    relatedPosts: [
      {
        id: 2,
        title: "Nano Banana vs Stable Diffusion: Which AI Image Generator is Right for You?",
        excerpt: "Compare the performance, speed, and quality of our nano banana image generator against popular alternatives.",
        date: "2024-01-12"
      },
      {
        id: 3,
        title: "Google Secret Image Model: Unveiling the Technology Behind Nano Banana AI",
        excerpt: "Explore the cutting-edge Google nano-banana model that powers our lightweight image AI platform.",
        date: "2024-01-10"
      }
    ]
  }

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
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
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
        {/* 返回按钮 */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/blog"
            className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Blog</span>
          </Link>
        </motion.div>

        {/* 文章头部 */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <div className="mb-6">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                {blogPost.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blogPost.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {blogPost.excerpt}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 文章内容 */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
            
            {/* 标签 */}
            <div className="mt-8 pt-6 border-t border-orange-100">
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-gray-900">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 相关文章 */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Related Articles
            </h2>
            <p className="text-lg text-gray-600">
              Continue exploring the world of nano banana ai and AI image generation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPost.relatedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -3, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* 分享和订阅 */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Share This Article
            </h3>
            <p className="text-gray-600 mb-6">
              Help others discover the power of nano banana ai and AI image generation
            </p>
            
            <div className="flex justify-center space-x-4 mb-8">
              <button className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="border-t border-orange-100 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Stay Updated with Nano Banana AI
              </h4>
              <p className="text-gray-600 mb-4">
                Get the latest insights about AI image generation and creative tips
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
          </div>
        </motion.div>
      </div>
    </div>
  )
} 