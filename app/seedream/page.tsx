'use client'

import { useState } from 'react'
import { Zap, Sparkles, Image as ImageIcon, Settings, Palette, Wand2 } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import ImageGenerator from '../components/ImageGenerator'
import GradientButton from '../components/ui/GradientButton'

export default function SeedreamPage() {
  const [activeMode, setActiveMode] = useState('standard')

  const modes = [
    {
      id: 'standard',
      label: 'Standard Generation',
      icon: Sparkles,
      description: 'High-quality image generation'
    },
    {
      id: 'professional',
      label: 'Professional 4K',
      icon: Zap,
      description: 'Ultra-high resolution images'
    },
    {
      id: 'artistic',
      label: 'Artistic Style',
      icon: Palette,
      description: 'Creative artistic transformations'
    }
  ]

  const features = [
    {
      icon: Zap,
      title: '4K Ultra Resolution',
      description: 'Generate stunning 4K quality images with unprecedented detail and clarity'
    },
    {
      icon: Wand2,
      title: 'Advanced AI Models',
      description: 'Powered by the latest Seedream 4.0 technology for superior results'
    },
    {
      icon: Settings,
      title: 'Professional Controls',
      description: 'Fine-tune every aspect of your image generation process'
    },
    {
      icon: ImageIcon,
      title: 'Multiple Formats',
      description: 'Support for various image sizes and aspect ratios'
    }
  ]

  return (
    <PageLayout
      title="Seedream 4.0"
      subtitle="Next Generation AI Image Generator"
      description="Experience the future of AI image generation with Seedream 4.0. Create stunning 4K images, professional artwork, and creative visuals with our most advanced AI technology."
      icon={<Zap className="w-8 h-8 text-purple-600" />}
      backgroundVariant="purple"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Mode Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                activeMode === mode.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md hover:scale-102'
              }`}
            >
              <mode.icon className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold">{mode.label}</div>
                <div className="text-xs opacity-80">{mode.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Image Generator */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {activeMode === 'professional' && 'Professional 4K Generation'}
              {activeMode === 'artistic' && 'Artistic Style Creation'}
              {activeMode === 'standard' && 'Standard Image Generation'}
            </h3>
            <p className="text-gray-600">
              {activeMode === 'professional' && 'Create ultra-high resolution images with professional quality'}
              {activeMode === 'artistic' && 'Transform your ideas into artistic masterpieces'}
              {activeMode === 'standard' && 'Generate high-quality images from your text descriptions'}
            </p>
          </div>
          
          <ImageGenerator />
          
          {activeMode === 'professional' && (
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-800">4K Professional Mode</span>
              </div>
              <p className="text-sm text-purple-700">
                This mode generates images at 4K resolution with enhanced detail and professional-grade quality. 
                Processing time may be longer for optimal results.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}