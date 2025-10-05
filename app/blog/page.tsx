'use client'

import { BookOpen, Calendar, User, ArrowRight, TrendingUp, Lightbulb, Zap } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import GradientButton from '../components/ui/GradientButton'
import Link from 'next/link'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 'ai-photo-editing-guide',
      title: 'Complete Guide to AI Photo Editing in 2024',
      excerpt: 'Master the art of AI photo editing with our comprehensive guide. Learn techniques, tips, and best practices for stunning results.',
      date: '2024-01-15',
      author: 'AI Photo Editor Team',
      category: 'Tutorial',
      readTime: '8 min read',
      featured: true
    },
    {
      id: 'seedream-vs-competitors',
      title: 'Seedream 4.0 vs Other AI Image Generators',
      excerpt: 'A detailed comparison of Seedream 4.0 with leading AI image generation tools. See why professionals choose our platform.',
      date: '2024-01-10',
      author: 'Tech Review Team',
      category: 'Comparison',
      readTime: '6 min read',
      featured: true
    },
    {
      id: 'ai-avatar-creation-tips',
      title: '10 Tips for Creating Perfect AI Avatars',
      excerpt: 'Learn how to create stunning personalized avatars using our AI avatar generator. Professional tips from digital artists.',
      date: '2024-01-05',
      author: 'Creative Team',
      category: 'Tips',
      readTime: '5 min read',
      featured: false
    },
    {
      id: 'image-to-image-techniques',
      title: 'Advanced Image-to-Image AI Techniques',
      excerpt: 'Explore advanced techniques for transforming images with AI. From style transfer to complete scene reconstruction.',
      date: '2023-12-28',
      author: 'AI Research Team',
      category: 'Advanced',
      readTime: '10 min read',
      featured: false
    },
    {
      id: 'ai-art-trends-2024',
      title: 'AI Art Trends That Will Define 2024',
      excerpt: 'Discover the latest trends in AI-generated art and how they are shaping the future of digital creativity.',
      date: '2023-12-20',
      author: 'Trend Analysis Team',
      category: 'Trends',
      readTime: '7 min read',
      featured: false
    },
    {
      id: 'business-ai-photo-editing',
      title: 'AI Photo Editing for Business: ROI Guide',
      excerpt: 'How businesses are using AI photo editing to improve their marketing materials and increase conversion rates.',
      date: '2023-12-15',
      author: 'Business Team',
      category: 'Business',
      readTime: '9 min read',
      featured: false
    }
  ]

  const categories = ['All', 'Tutorial', 'Tips', 'Comparison', 'Advanced', 'Trends', 'Business']

  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <PageLayout
      title="Blog"
      subtitle="AI Photo Editing Insights & Tutorials"
      description="Stay updated with the latest AI photo editing techniques, tutorials, and industry insights. Learn from experts and improve your creative workflow."
      icon={<BookOpen className="w-8 h-8 text-blue-600" />}
      backgroundVariant="blue"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <article
                key={post.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <div className="text-6xl opacity-20">
                    {index === 0 ? <Lightbulb /> : <TrendingUp />}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                      <Calendar className="w-4 h-4 ml-2" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <GradientButton
                        size="sm"
                        variant="outline"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        Read More
                      </GradientButton>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Categories Filter */}
        <section className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                         bg-white/80 text-gray-700 hover:bg-blue-100 hover:text-blue-800
                         border border-gray-200 hover:border-blue-300"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Regular Posts Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="h-32 bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-blue-500 opacity-50" />
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-xs">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get the latest AI photo editing tips, tutorials, and industry insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <GradientButton
                variant="primary"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Subscribe
              </GradientButton>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
