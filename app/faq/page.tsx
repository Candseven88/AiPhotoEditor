'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, HelpCircle, Zap, Palette, Shield, Users, Globe } from 'lucide-react'
import Link from 'next/link'

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    )
  }

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle, count: 24 },
    { id: 'general', name: 'General', icon: HelpCircle, count: 6 },
    { id: 'technical', name: 'Technical', icon: Zap, count: 8 },
    { id: 'features', name: 'Features', icon: Palette, count: 6 },
    { id: 'account', name: 'Account & Billing', icon: Users, count: 4 }
  ]

  const faqs = [
    // General Questions
    {
      id: 1,
      category: 'general',
      question: "What is Nano Banana AI and how does it work?",
      answer: "Nano Banana AI is a lightweight AI image generator powered by the revolutionary Google nano-banana model. Our platform uses advanced artificial intelligence to create stunning images from text descriptions (text-to-image) or transform existing images (image-to-image). The nano banana ai technology processes your requests through our optimized AI architecture, delivering high-quality results in seconds.",
      tags: ["nano banana ai", "how does nano banana ai work", "ai image generation"]
    },
    {
      id: 2,
      category: 'general',
      question: "How is Nano Banana AI different from other AI image generators?",
      answer: "Nano Banana AI stands out through several key advantages: our lightweight architecture ensures faster processing times, the Google nano-banana model delivers exceptional quality, and our user-friendly interface makes AI image generation accessible to everyone. When comparing nano banana vs stable diffusion, you'll notice our platform is more efficient and easier to use while maintaining professional-grade output quality.",
      tags: ["nano banana vs stable diffusion", "lightweight ai image generator", "ai image generator comparison"]
    },
    {
      id: 3,
      category: 'general',
      question: "Is Nano Banana AI free to use?",
      answer: "We offer both free and premium tiers. Our free tier allows you to experience the power of our nano banana ai technology with limited generations per month. Premium users get unlimited access to our lightweight AI image generator, priority processing, and advanced features. This helps us maintain the quality of our Google nano-banana model while keeping our services accessible.",
      tags: ["nano banana ai", "free ai image generator", "premium features"]
    },
    {
      id: 4,
      category: 'general',
      question: "What types of images can I create with Nano Banana AI?",
      answer: "Our nano banana image generator can create virtually any type of image you can describe. From realistic photographs to artistic illustrations, landscapes to portraits, and abstract concepts to detailed scenes. The text-to-image feature interprets natural language descriptions, while image-to-image transformation allows you to modify existing photos with AI-powered editing capabilities.",
      tags: ["nano banana image generator", "text-to-image", "image to image", "ai art creation"]
    },
    {
      id: 5,
      category: 'general',
      question: "Can I use the generated images commercially?",
      answer: "Yes! Images generated through our nano banana ai platform are yours to use for both personal and commercial purposes. You retain full rights to your creations, whether you're using them for business projects, social media content, or personal artwork. We only ask that you credit Nano Banana AI when sharing your work publicly.",
      tags: ["commercial use", "image rights", "nano banana ai platform"]
    },
    {
      id: 6,
      category: 'general',
      question: "What makes Nano Banana AI a 'lightweight' solution?",
      answer: "Our lightweight image ai approach means we've optimized our Google nano-banana model to process requests faster while using fewer computational resources. This makes our nano banana ai image generator accessible on any device, from smartphones to desktop computers, without requiring powerful hardware. You get professional-quality results without the heavy system requirements of traditional AI models.",
      tags: ["lightweight image ai", "lightweight ai image generator", "google nano-banana model"]
    },

    // Technical Questions
    {
      id: 7,
      category: 'technical',
      question: "What is the Google nano-banana model?",
      answer: "The Google nano-banana model is our proprietary AI architecture that powers the Nano Banana AI platform. This revolutionary technology represents a breakthrough in efficient AI processing, combining the quality of large language models with the speed and efficiency needed for real-time image generation. It's what makes our nano banana ai platform so fast and accessible.",
      tags: ["google nano-banana model", "google secret image model", "nano banana ai technology"]
    },
    {
      id: 8,
      category: 'technical',
      question: "How fast is the image generation process?",
      answer: "Our nano banana ai technology typically generates images in 5-15 seconds, depending on complexity and server load. This is significantly faster than traditional AI image generators thanks to our lightweight architecture. The Google nano-banana model is optimized for speed without compromising quality, making it ideal for creators who need quick results.",
      tags: ["generation speed", "nano banana ai", "fast ai image generation"]
    },
    {
      id: 9,
      category: 'technical',
      question: "What image formats and resolutions are supported?",
      answer: "Our nano banana image generator supports multiple output formats including PNG, JPEG, and WebP. We offer various resolution options from 512x512 up to 2048x2048 pixels, allowing you to choose the right size for your needs. Higher resolutions are available for premium users, ensuring you get the quality you need for professional projects.",
      tags: ["image formats", "resolution options", "nano banana image generator"]
    },
    {
      id: 10,
      category: 'technical',
      question: "How does the AI understand my text descriptions?",
      answer: "Our platform uses advanced natural language processing to interpret your creative descriptions. The nano banana ai technology analyzes your text input, identifies key visual elements, style preferences, and context, then translates these into visual representations. This natural language editing capability makes it easy to create exactly what you envision without needing technical expertise.",
      tags: ["natural language editing", "text-to-image", "ai understanding", "nano banana ai"]
    },
    {
      id: 11,
      category: 'technical',
      question: "Can I upload and edit my own images?",
      answer: "Absolutely! Our image-to-image feature allows you to upload existing photos and transform them using AI. You can apply artistic styles, remove unwanted elements, enhance quality, or create variations with different color schemes. This makes our nano banana ai platform perfect for both creating new images and enhancing existing ones.",
      tags: ["image to image", "upload images", "ai photo editing", "photo editing ai"]
    },
    {
      id: 12,
      category: 'technical',
      question: "What are the system requirements?",
      answer: "One of the biggest advantages of our lightweight AI image generator is its minimal system requirements. You can use Nano Banana AI on any device with a modern web browser - no powerful GPU or specialized hardware needed. Our nano banana ai technology is designed to work seamlessly across all platforms, from mobile devices to desktop computers.",
      tags: ["system requirements", "lightweight image ai", "cross-platform", "nano banana ai"]
    },
    {
      id: 13,
      category: 'technical',
      question: "How accurate are the AI-generated images?",
      answer: "Our Google nano-banana model delivers exceptional accuracy in interpreting your descriptions. The AI understands context, style preferences, and visual relationships, producing images that closely match your creative vision. While results may vary based on prompt complexity, our nano banana ai technology consistently delivers professional-quality output that rivals traditional design methods.",
      tags: ["ai accuracy", "google nano-banana model", "image quality", "nano banana ai"]
    },
    {
      id: 14,
      category: 'technical',
      question: "Is my data secure when using Nano Banana AI?",
      answer: "Security is a top priority for our nano banana ai platform. We implement enterprise-grade encryption, secure data centers, and strict privacy controls. Your creative work and personal information are protected with the same security standards used by major tech companies. We never share your data with third parties and provide full control over your information.",
      tags: ["data security", "privacy protection", "nano banana ai platform", "secure ai"]
    },

    // Feature Questions
    {
      id: 15,
      category: 'features',
      question: "What is the difference between text-to-image and image-to-image?",
      answer: "Text-to-image generates completely new images from your text descriptions, while image-to-image transforms existing photos using AI. Our nano banana ai platform excels at both: text-to-image creates original artwork from scratch, and image-to-image applies artistic styles, removes objects, or enhances existing photos. Both features use our lightweight AI image generator technology for optimal results.",
      tags: ["text-to-image", "image to image", "nano banana ai", "ai features"]
    },
    {
      id: 16,
      category: 'features',
      question: "Can I save and organize my generated images?",
      answer: "Yes! Our nano banana ai platform includes a comprehensive gallery system where you can save, organize, and manage all your AI-generated images. You can create collections, add tags, and easily find your previous creations. This feature helps you build a portfolio of your AI-generated artwork and track your creative progress over time.",
      tags: ["image gallery", "save images", "nano banana ai platform", "organization"]
    },
    {
      id: 17,
      category: 'features',
      question: "Are there any style presets or templates available?",
      answer: "Our nano banana image generator includes various style presets and artistic templates to help you get started. From realistic photography to abstract art, watercolor to digital painting, you can choose from multiple artistic styles. These presets work with our natural language editing system, allowing you to combine styles with your own creative descriptions.",
      tags: ["style presets", "artistic templates", "nano banana image generator", "creative tools"]
    },
    {
      id: 18,
      category: 'features',
      question: "Can I collaborate with others on image generation?",
      answer: "Currently, our nano banana ai platform is designed for individual use, but we're working on collaborative features for future releases. You can share your generated images with others, and they can use similar prompts to create their own variations. This allows for creative collaboration while maintaining individual control over your AI image generation process.",
      tags: ["collaboration", "sharing", "nano banana ai", "creative workflow"]
    },
    {
      id: 19,
      category: 'features',
      question: "Do you offer batch processing for multiple images?",
      answer: "Premium users of our nano banana ai platform can access batch processing capabilities. This allows you to generate multiple images simultaneously using variations of your prompts, significantly speeding up your creative workflow. Our lightweight AI image generator handles batch requests efficiently, making it perfect for projects requiring multiple variations or iterations.",
      tags: ["batch processing", "multiple images", "nano banana ai", "premium features"]
    },
    {
      id: 20,
      category: 'features',
      question: "Can I integrate Nano Banana AI with other tools?",
      answer: "We're developing API access and integration capabilities for our nano banana ai platform. This will allow developers and power users to integrate our lightweight AI image generator with other creative tools, design software, and workflows. Our goal is to make AI image generation seamlessly integrate with your existing creative process.",
      tags: ["api integration", "creative tools", "nano banana ai", "workflow integration"]
    },

    // Account & Billing Questions
    {
      id: 21,
      category: 'account',
      question: "How do I create an account?",
      answer: "Creating an account on our nano banana ai platform is simple and free. Just visit our website, click the 'Sign Up' button, and provide your email address and a password. You'll receive a verification email to confirm your account. Once verified, you can immediately start using our lightweight AI image generator and explore all the features of our nano banana ai technology.",
      tags: ["account creation", "sign up", "nano banana ai platform", "user registration"]
    },
    {
      id: 22,
      category: 'account',
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and various digital payment methods for premium subscriptions. Our billing system is secure and handles payments automatically. Premium users get unlimited access to our nano banana ai platform, priority processing, and advanced features. We also offer flexible billing cycles to suit different needs and budgets.",
      tags: ["payment methods", "premium subscription", "billing", "nano banana ai"]
    },
    {
      id: 23,
      category: 'account',
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you have full control over your subscription. You can cancel your premium plan at any time through your account settings, and you'll continue to have access to premium features until the end of your current billing period. We believe in transparent pricing and no hidden fees, so you're never locked into long-term commitments.",
      tags: ["subscription cancellation", "account control", "premium features", "nano banana ai"]
    },
    {
      id: 24,
      category: 'account',
      question: "How do I get support if I have issues?",
      answer: "Our support team is here to help you get the most out of our nano banana ai platform. You can reach us through our contact form, email support, or help center. We also provide comprehensive documentation and tutorials to help you master our lightweight AI image generator. For technical issues, our team of AI experts is ready to assist you.",
      tags: ["customer support", "help center", "nano banana ai", "technical assistance"]
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

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
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            Find answers to common questions about our nano banana ai platform, lightweight AI image generator, 
            and how to get the most out of our AI image generation services.
          </p>
        </motion.div>

        {/* 搜索和分类 */}
        <motion.div 
          className="max-w-6xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* 搜索框 */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for questions about nano banana ai, AI image generation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              />
            </div>
          </div>

          {/* 分类过滤 */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = activeCategory === category.id
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-md border transition-all duration-300 ${
                    isActive 
                      ? 'bg-orange-500 text-white border-orange-500 shadow-lg' 
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 border-orange-100 hover:shadow-lg'
                  }`}
                  whileHover={{ y: -2, scale: 1.05 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* FAQ列表 */}
        <motion.div 
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-orange-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-orange-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-orange-500 transition-transform ${
                      openItems.includes(faq.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {faq.answer}
                        </p>
                        
                        {/* 标签 */}
                        <div className="flex flex-wrap gap-2">
                          {faq.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 没有找到结果 */}
        {filteredFAQs.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search terms or browse all categories
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              View All Questions
            </button>
          </motion.div>
        )}

        {/* 联系支持 */}
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-orange-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Can't find the answer you're looking for? Our support team is here to help you 
              get the most out of our nano banana ai platform and lightweight AI image generator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/about"
                className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Contact Support
              </Link>
              <Link 
                href="/blog"
                className="px-8 py-3 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 