'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Crown, 
  Image, 
  CreditCard, 
  Settings, 
  LogOut,
  Plus,
  Sparkles,
  Wand2,
  Palette
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import Navigation from '../components/Navigation'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/')
      return
    }
    
    setIsLoading(false)
  }, [session, status, router])

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  if (isLoading || status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const user = session.user as any

  const quickActions = [
    {
      title: 'Generate Avatar',
      description: 'Create a personalized avatar from username',
      icon: Sparkles,
      href: '/',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      title: 'Text to Image',
      description: 'Generate images from text descriptions',
      icon: Wand2,
      href: '/',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Image to Image',
      description: 'Transform existing images with AI',
      icon: Palette,
      href: '/',
      color: 'from-green-500 to-teal-500'
    }
  ]

  const stats = [
    {
      label: 'Credits Remaining',
      value: user.credits_balance || 0,
      icon: CreditCard,
      color: 'text-orange-600'
    },
    {
      label: 'Subscription Plan',
      value: user.subscription_plan || 'Free',
      icon: Crown,
      color: 'text-yellow-600'
    },
    {
      label: 'Images Generated',
      value: '0', // TODO: Fetch from database
      icon: Image,
      color: 'text-blue-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      {/* Navigation */}
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome back, <span className="text-orange-500">{user.nickname || user.name || 'User'}</span>!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to create some amazing AI-generated images? You have {user.credits_balance || 0} credits remaining.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color.replace('text-', 'from-').replace('-600', '-500')} to-${stat.color.replace('text-', '').replace('-600', '-400')} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                onClick={() => router.push(action.href)}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{action.title}</h3>
                <p className="text-gray-600">{action.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
            <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              View All
            </button>
          </div>
          
          <div className="text-center py-12">
            <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No images generated yet</p>
            <p className="text-gray-400">Start creating amazing AI images to see them here!</p>
          </div>
        </motion.div>

        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <button className="flex items-center mx-auto px-6 py-3 bg-white text-orange-600 border-2 border-orange-500 rounded-lg hover:bg-orange-50 transition-colors">
            <Settings className="w-5 h-5 mr-2" />
            Account Settings
          </button>
        </motion.div>
      </div>
    </div>
  )
} 