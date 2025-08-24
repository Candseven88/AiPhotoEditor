'use client'

import { motion } from 'framer-motion'
import { Star, Quote, Users, Award, CheckCircle, ThumbsUp, Heart, Zap } from 'lucide-react'
import Link from 'next/link'

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Digital Artist & Illustrator",
      company: "Creative Studio Pro",
      rating: 5,
      content: "Nano Banana AI has completely transformed my creative workflow. The lightweight AI image generator produces stunning results in seconds, and the quality is absolutely incredible. I've been using it for concept art and client projects, and the feedback has been amazing. It's definitely the best alternative to Flux Kontext I've found!",
      image: "/testimonials/sarah-chen.jpg",
      tags: ["nano banana ai", "ai image generation", "digital art", "concept art"]
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      role: "Marketing Director",
      company: "TechStart Inc.",
      rating: 5,
      content: "As a marketing professional, I need to create visuals quickly and efficiently. Nano Banana AI's text-to-image feature has been a game-changer for our campaigns. The natural language editing is so intuitive - I can describe exactly what I want and get professional-quality images in minutes. Our social media engagement has increased significantly since we started using this platform.",
      image: "/testimonials/mike-rodriguez.jpg",
      tags: ["text-to-image", "marketing", "social media", "nano banana ai"]
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Content Creator & Influencer",
      company: "Digital Lifestyle",
      rating: 5,
      content: "I was skeptical about AI image generation until I tried Nano Banana AI. The image-to-image transformation capabilities are mind-blowing! I can take my photos and transform them into different artistic styles, remove unwanted elements, and create variations that perfectly match my brand aesthetic. It's like having a professional designer on demand.",
      image: "/testimonials/emma-thompson.jpg",
      tags: ["image to image", "content creation", "photo editing ai", "brand aesthetic"]
    },
    {
      id: 4,
      name: "David Kim",
      role: "UX/UI Designer",
      company: "DesignLab Solutions",
      rating: 5,
      content: "The Google nano-banana model behind this platform is truly impressive. As a designer, I appreciate the attention to detail and the quality of the generated images. The lightweight architecture means I can use it on any device, and the results are consistently professional. It's become an essential tool in my design toolkit.",
      image: "/testimonials/david-kim.jpg",
      tags: ["google nano-banana model", "ux/ui design", "design tools", "professional quality"]
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "E-commerce Entrepreneur",
      company: "StyleHub Boutique",
      rating: 5,
      content: "Running an online boutique means constantly needing new product visuals. Nano Banana AI has saved me countless hours and thousands of dollars on photography and design. I can generate product mockups, lifestyle shots, and marketing materials that look completely professional. The platform is incredibly user-friendly, even for someone with no design experience.",
      image: "/testimonials/lisa-wang.jpg",
      tags: ["e-commerce", "product visuals", "marketing materials", "user-friendly"]
    },
    {
      id: 6,
      name: "Alex Johnson",
      role: "Game Developer",
      company: "PixelForge Games",
      rating: 5,
      content: "For game development, we need concept art and visual assets constantly. Nano Banana AI's ability to generate images from text descriptions has accelerated our prototyping phase significantly. The AI understands gaming aesthetics perfectly, and we can iterate on ideas much faster than with traditional methods. It's like having an entire art team at your fingertips.",
      image: "/testimonials/alex-johnson.jpg",
      tags: ["game development", "concept art", "prototyping", "ai art creation"]
    },
    {
      id: 7,
      name: "Maria Garcia",
      role: "Educational Content Creator",
      company: "LearnTech Academy",
      rating: 5,
      content: "Creating educational content requires a lot of visual materials. Nano Banana AI has made it possible for me to generate custom illustrations, diagrams, and visual aids that perfectly match my lesson plans. The natural language editing is so intuitive that I can create exactly what I need without any design skills. My students love the engaging visuals!",
      image: "/testimonials/maria-garcia.jpg",
      tags: ["educational content", "visual materials", "natural language editing", "custom illustrations"]
    },
    {
      id: 8,
      name: "James Wilson",
      role: "Real Estate Agent",
      company: "Prime Properties",
      rating: 5,
      content: "In real estate, presentation is everything. Nano Banana AI helps me create stunning property visualizations, virtual staging, and marketing materials that help properties sell faster. The image-to-image transformation is particularly useful for showing potential buyers how a space could look with different styles or renovations. It's been a game-changer for my business.",
      image: "/testimonials/james-wilson.jpg",
      tags: ["real estate", "property visualization", "virtual staging", "marketing materials"]
    }
  ]

  const stats = [
    {
      number: "10,000+",
      label: "Happy Users",
      icon: Users
    },
    {
      number: "500,000+",
      label: "Images Generated",
      icon: Zap
    },
    {
      number: "99.2%",
      label: "Satisfaction Rate",
      icon: Heart
    },
    {
      number: "4.9/5",
      label: "Average Rating",
      icon: Star
    }
  ]

  const categories = [
    "All",
    "Digital Artists",
    "Marketing Professionals",
    "Content Creators",
    "Designers",
    "Entrepreneurs",
    "Educators",
    "Real Estate"
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
            What Users Say About Nano Banana AI
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            Discover why thousands of creators, professionals, and enthusiasts choose our lightweight AI image generator. 
            Read real testimonials from users who have experienced the power of nano banana ai technology.
          </p>
        </motion.div>

        {/* 统计数据 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
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
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* 分类过滤 */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-orange-100 hover:shadow-lg transition-all duration-300 font-medium text-gray-700"
                whileHover={{ y: -2, scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 用户评价网格 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-orange-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
            >
              {/* 评价头部 */}
              <div className="p-6 border-b border-orange-100">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-8 h-8 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-orange-600 font-medium text-sm mb-1">
                      {testimonial.role}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                
                {/* 评分 */}
                <div className="flex items-center mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {testimonial.rating}/5
                  </span>
                </div>
              </div>
              
              {/* 评价内容 */}
              <div className="p-6">
                <div className="mb-4">
                  <Quote className="w-6 h-6 text-orange-400 mb-2" />
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </div>
                
                {/* 标签 */}
                <div className="flex flex-wrap gap-2">
                  {testimonial.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* 特色评价 */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how professionals across different industries are leveraging our nano banana ai platform 
              to transform their creative workflows and achieve remarkable results.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  "Nano Banana AI Revolutionized My Creative Process"
                </h3>
                <p className="text-gray-600 mb-6">
                  Sarah Chen, a professional digital artist, shares how our lightweight AI image generator 
                  has transformed her workflow, allowing her to create stunning concept art in minutes instead of hours.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                  <span className="font-semibold text-gray-900">Sarah Chen</span>
                  <span>•</span>
                  <span>Digital Artist</span>
                  <span>•</span>
                  <span>Creative Studio Pro</span>
                </div>
                <Link 
                  href="#testimonial-1"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  <span>Read Full Story</span>
                  <Quote className="w-5 h-5" />
                </Link>
              </div>
              
              <div className="h-64 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <Award className="w-20 h-20 mx-auto mb-2 text-orange-400" />
                  <p className="text-sm">Featured Testimonial</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 为什么选择我们 */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Users Choose Nano Banana AI
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Based on thousands of user testimonials, here are the key reasons why creators choose 
              our nano banana ai platform over other AI image generators.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Lightning Fast Generation",
                description: "Our lightweight AI image generator produces results in seconds, not minutes",
                percentage: "95%"
              },
              {
                icon: Award,
                title: "Professional Quality",
                description: "Enterprise-grade results that rival traditional design methods",
                percentage: "98%"
              },
              {
                icon: Users,
                title: "User-Friendly Interface",
                description: "Intuitive design that makes AI image generation accessible to everyone",
                percentage: "97%"
              },
              {
                icon: Shield,
                title: "Reliable & Secure",
                description: "Consistent performance with enterprise-grade security and privacy",
                percentage: "99%"
              },
              {
                icon: Heart,
                title: "Excellent Support",
                description: "Dedicated support team ready to help you succeed",
                percentage: "96%"
              },
              {
                icon: Globe,
                title: "Cross-Platform Access",
                description: "Use our nano banana ai platform on any device, anywhere",
                percentage: "100%"
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100 text-center hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="text-2xl font-bold text-orange-600">{feature.percentage}</div>
                  <p className="text-sm text-gray-500">User Satisfaction</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* 开始使用 */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Join Our Happy Users?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Experience the power of nano banana ai technology and see why thousands of creators 
              choose our lightweight AI image generator for their creative projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/home"
                className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Try Nano Banana AI Free
              </Link>
              <Link 
                href="/about"
                className="px-8 py-3 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 