'use client'

import { useState } from 'react'
import { Sparkles, Wand2, User } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import ImageGenerator from '../components/ImageGenerator'
import UsernameToImageGenerator from '../components/UsernameToImageGenerator'
import ImageToImageGeneratorV2 from '../components/ImageToImageGeneratorV2'

export default function AIPhotoEditorPage() {
  const [activeTab, setActiveTab] = useState('text-to-image')

  const tabs = [
    {
      id: 'text-to-image',
      label: 'Text to Image',
      icon: Sparkles,
      description: 'Generate images from text descriptions'
    },
    {
      id: 'username-to-image',
      label: 'Username to Avatar',
      icon: User,
      description: 'Create personalized avatars from usernames'
    },
    {
      id: 'image-to-image',
      label: 'Image to Image',
      icon: Wand2,
      description: 'Transform existing images with AI'
    }
  ]

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'text-to-image':
        return <ImageGenerator />
      case 'username-to-image':
        return <UsernameToImageGenerator />
      case 'image-to-image':
        return <ImageToImageGeneratorV2 />
      default:
        return <ImageGenerator />
    }
  }

  return (
    <PageLayout
      title="AI Photo Editor"
      subtitle="Professional AI Image Editor - 3-in-1 Tools"
      description="Generate images from text, create personalized avatars, and transform photos with advanced AI technology. All your image editing needs in one powerful tool."
      icon={<Sparkles className="w-8 h-8 text-orange-600" />}
      backgroundVariant="default"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg transform scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md hover:scale-102'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold">{tab.label}</div>
                <div className="text-xs opacity-80">{tab.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Active Component */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          {renderActiveComponent()}
        </div>
      </div>
    </PageLayout>
  )
}