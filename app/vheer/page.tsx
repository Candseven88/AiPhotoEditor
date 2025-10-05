'use client'

import { useState } from 'react'
import { Wand2, Palette, Image as ImageIcon, Sparkles, Camera, Brush } from 'lucide-react'
import Image from 'next/image'
import PageLayout from '../components/PageLayout'
import ImageGenerator from '../components/ImageGenerator'
import BeforeAfterSlider from '../components/BeforeAfterSlider'

export default function VheerPage() {
  const [activeFeature, setActiveFeature] = useState('text-to-image')

  const features = [
    {
      id: 'text-to-image',
      label: 'Text to Art Magic ✨',
      icon: Sparkles,
      description: 'Type it, see it come alive instantly'
    },
    {
      id: 'style-transfer',
      label: 'Photo Glow-Up 🌟',
      icon: Palette,
      description: 'Give your pics that artistic vibe'
    },
    {
      id: 'creative-editing',
      label: 'Creative Beast Mode 🔥',
      icon: Brush,
      description: 'Next-level photo transformations'
    }
  ]

  const showcaseImages = [
    {
      original: '/vheer/image-original.jpg',
      transformed: '/vheer/image-transformed.png',
      title: 'Portrait Glow-Up Challenge',
      description: 'Watch ordinary photos become absolute fire 🔥'
    }
  ]

  const capabilities = [
    {
      icon: Wand2,
      title: 'AI That Actually Gets You',
      description: 'Smart algorithms that understand your creative vision and make it happen'
    },
    {
      icon: Camera,
      title: 'Instant Photo Upgrades',
      description: 'Turn basic photos into main character energy with pro-level AI magic'
    },
    {
      icon: Palette,
      title: 'Aesthetic Overload',
      description: 'From vintage vibes to futuristic feels - we got all the styles that slap'
    },
    {
      icon: ImageIcon,
      title: 'Quality That Hits Different',
      description: 'Crystal clear, high-res results that look professional AF'
    }
  ]

  return (
    <PageLayout
      title="Vheer AI - Your Creative Sidekick 🎨"
      subtitle="Turn Your Wild Ideas Into Epic Visuals - No Skills Required!"
      description="Ready to blow minds with AI-generated art? Vheer is your free creative playground where text becomes stunning visuals, photos get magical makeovers, and your imagination runs wild. Zero signup, zero cost, infinite possibilities!"
      icon={<Wand2 className="w-8 h-8 text-blue-600" />}
      backgroundVariant="blue"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Feature Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                activeFeature === feature.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md hover:scale-102'
              }`}
            >
              <feature.icon className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold">{feature.label}</div>
                <div className="text-xs opacity-80">{feature.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Main Generator */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {activeFeature === 'text-to-image' && 'Turn Words Into Art Magic ✨'}
                  {activeFeature === 'style-transfer' && 'Give Your Photos That Glow-Up 🌟'}
                  {activeFeature === 'creative-editing' && 'Unleash Your Creative Beast 🔥'}
            </h3>
            <p className="text-gray-600">
                  {activeFeature === 'text-to-image' && 'Type anything and watch it become stunning visual art instantly'}
                  {activeFeature === 'style-transfer' && 'Transform your basic photos into aesthetic masterpieces'}
                  {activeFeature === 'creative-editing' && 'Next-level AI magic that makes your images absolutely pop'}
            </p>
          </div>
          
          {activeFeature === 'text-to-image' && <ImageGenerator />}
          
          {activeFeature === 'style-transfer' && (
            <div className="text-center py-12">
              <Palette className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Photo Glow-Up Studio</h4>
                  <p className="text-gray-600 mb-4">Upload your pic and choose your vibe - we'll handle the magic</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700">🚧 Coming super soon! Get ready for the ultimate photo transformation experience</p>
                  </div>
            </div>
          )}
          
          {activeFeature === 'creative-editing' && (
            <div className="text-center py-12">
              <Brush className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Creative Beast Mode</h4>
                  <p className="text-gray-600 mb-4">Unleash next-level transformations and mind-blowing effects</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700">🔥 Beast mode loading... Prepare for creative tools that absolutely slap!</p>
                  </div>
            </div>
          )}
        </div>

        {/* Showcase Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Watch the Magic Happen ✨
          </h3>
          
          {/* Main Interactive Demo */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">Slide to See the Glow-Up! 👀</h4>
            <div className="max-w-4xl mx-auto">
              {showcaseImages.map((image, index) => (
                <div key={index} className="mb-6">
                  <BeforeAfterSlider
                    beforeImage={image.original}
                    afterImage={image.transformed}
                    height="h-80"
                  />
                  <div className="mt-4 text-center">
                    <h5 className="text-lg font-medium text-gray-800 mb-2">{image.title}</h5>
                    <p className="text-gray-600">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Before/After Examples Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-6 text-center">Real Transformations That Go Hard 💯</h4>
              <div className="space-y-4">
                {/* Skiing Example */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-2">
                        <Image
                          src="/cases/冬季男子雪地上滑雪.jpg"
                          alt="Skiing Before"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">Original</span>
                    </div>
                    <div className="text-center">
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-2">
                        <Image
                          src="/cases/冬季男子雪地上滑雪-红色.png"
                          alt="Skiing After"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      <span className="text-xs font-medium text-orange-600">Enhanced</span>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">Winter Sports → Fire Edition 🏂</p>
                </div>
                
                {/* Swimming Example */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-2">
                        <Image
                          src="/cases/在水中游泳的白色monokini的女人.jpg"
                          alt="Swimming Before"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">Original</span>
                    </div>
                    <div className="text-center">
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-2">
                        <Image
                          src="/cases/在水中游泳的白色monokini的女人-火山.png"
                          alt="Swimming After"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      <span className="text-xs font-medium text-orange-600">Enhanced</span>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">Beach Vibes → Volcano Drama 🌋</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                  <Wand2 className="w-4 h-4" />
                  <span>AI Style Magic</span>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-6 text-center">AI Art That Absolutely Slaps 🎨</h4>
              <div className="space-y-4">
                {/* Top row - two square images */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2">
                      <Image
                        src="/vheer/tattoo-generator-1.png"
                        alt="Intricate Tattoo Design"
                        fill
                        className="object-contain bg-gray-100"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">Ink Vibes ✨</span>
                  </div>
                  <div className="text-center">
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2">
                      <Image
                        src="/vheer/tattoo-generator-4.jpg"
                        alt="Portrait Art"
                        fill
                        className="object-contain bg-gray-100"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">Portrait Goals 📸</span>
                  </div>
                </div>
                
                {/* Bottom - wide image */}
                <div className="text-center">
                  <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden mb-2">
                    <Image
                      src="/vheer/text-to-image.png"
                      alt="Text to Image Generation"
                      fill
                      className="object-contain bg-gray-100"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-600">Words → Visual Magic 🪄</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">AI Generated 🤖</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Premium Quality 💎</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">Creative AF 🎨</span>
                </div>
                <div className="inline-flex items-center space-x-2 text-sm text-purple-600 bg-purple-50 px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4" />
                  <span>Endless Art Styles</span>
                </div>
              </div>
            </div>
          </div>

          {/* Creative Process Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h4 className="text-xl font-semibold text-gray-800 mb-8 text-center">How We Make Magic Happen ⚡</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Art Styles */}
              <div>
                <h5 className="text-lg font-medium text-gray-700 mb-6 text-center">Pick Your Aesthetic ✨</h5>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 shadow-md">
                      <Image
                        src="/vheer/tattoo-generator-2.png"
                        alt="Mandala Art Style"
                        fill
                        className="object-contain bg-gray-100"
                        sizes="(max-width: 768px) 33vw, 16vw"
                      />
                    </div>
                    <h6 className="font-medium text-gray-800 mb-1">Mandala Vibes</h6>
                    <p className="text-xs text-gray-600">Sacred geometry hits ✨</p>
                  </div>
                  <div className="text-center">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 shadow-md">
                      <Image
                        src="/vheer/tattoo-generator-3.png"
                        alt="Gothic Art Style"
                        fill
                        className="object-contain bg-gray-100"
                        sizes="(max-width: 768px) 33vw, 16vw"
                      />
                    </div>
                    <h6 className="font-medium text-gray-800 mb-1">Dark Academia</h6>
                    <p className="text-xs text-gray-600">Mysterious & moody 🖤</p>
                  </div>
                  <div className="text-center">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 shadow-md">
                      <Image
                        src="/cases/Baby_Saja-Ciga.png"
                        alt="Portrait Style"
                        fill
                        className="object-contain bg-gray-100"
                        sizes="(max-width: 768px) 33vw, 16vw"
                      />
                    </div>
                    <h6 className="font-medium text-gray-800 mb-1">Portrait Pro</h6>
                    <p className="text-xs text-gray-600">Main character energy 📸</p>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div>
                <h5 className="text-lg font-medium text-gray-700 mb-6 text-center">Super Easy Process 🚀</h5>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">1</div>
                    <div>
                      <h6 className="font-semibold text-gray-800 mb-1">Drop Your Pic 📱</h6>
                      <p className="text-sm text-gray-600">Upload any photo - we'll work with whatever you got!</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">2</div>
                    <div>
                      <h6 className="font-semibold text-gray-800 mb-1">AI Does Its Thing 🤖</h6>
                      <p className="text-sm text-gray-600">Our smart AI analyzes and transforms your image like magic</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">3</div>
                    <div>
                      <h6 className="font-semibold text-gray-800 mb-1">Get Your Masterpiece 🎨</h6>
                      <p className="text-sm text-gray-600">Download your fire transformation in crisp HD quality</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center space-x-3 text-sm text-blue-600 bg-blue-50 px-6 py-3 rounded-full">
                    <Palette className="w-4 h-4" />
                    <span>Lightning Fast & Easy</span>
                    <Wand2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <capability.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{capability.title}</h3>
              <p className="text-sm text-gray-600">{capability.description}</p>
            </div>
          ))}
        </div>

        {/* Core Features Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            All the Tools You Need (And They're All Free!) 💎
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Content Generation */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">AI Content Magic 🧠</h4>
              </div>
              <div className="space-y-3 pl-11">
                <div>
                  <h5 className="font-medium text-gray-800">Text to Image Generator</h5>
                  <p className="text-sm text-gray-600">Type anything and watch it become stunning art instantly ✨</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800">Image to Image Generator</h5>
                  <p className="text-sm text-gray-600">Give your existing pics a complete AI makeover 🎨</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800">Image to Prompt Generator</h5>
                  <p className="text-sm text-gray-600">Turn any image into creative prompts for endless inspiration 💡</p>
                </div>
              </div>
            </div>

            {/* Image Tools */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">Photo Edit Tools 🖼️</h4>
              </div>
              <div className="space-y-3 pl-11">
                <div>
                  <h5 className="font-medium text-gray-800">Background Remover</h5>
                  <p className="text-sm text-gray-600">Clean backgrounds in seconds - no green screen needed! 🎭</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800">Background Changer</h5>
                  <p className="text-sm text-gray-600">Transport yourself anywhere with custom backgrounds 🌍</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800">Professional Blur Effects</h5>
                  <p className="text-sm text-gray-600">Add that pro photographer depth-of-field vibe 📸</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800">Text Behind Image</h5>
                  <p className="text-sm text-gray-600">Create mind-bending layered visuals that pop 🤯</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800">Image to Text Converter</h5>
                  <p className="text-sm text-gray-600">Extract text from any image like magic ✨</p>
                </div>
              </div>
            </div>

            {/* Style & Portrait Tools */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">Style & Portrait Magic 🎨</h4>
              </div>
              <div className="space-y-3 pl-11">
                <div>
                  <h5 className="font-medium text-gray-800">Fancy Fonts Generator</h5>
                  <p className="text-sm text-gray-600">Make your text aesthetic AF for social media 💫</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800">Anime Portrait Generator</h5>
                  <p className="text-sm text-gray-600">Turn yourself into your anime main character 🌸</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800">Realistic Headshot Generator</h5>
                  <p className="text-sm text-gray-600">Professional portraits that look expensive but cost nothing 💎</p>
                </div>
              </div>
            </div>

            {/* New Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">Next-Level Features 🔥</h4>
              </div>
              <div className="space-y-3 pl-11">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded-lg border border-orange-200">
                  <h5 className="font-medium text-gray-800 flex items-center">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2">NEW!</span>
                    Image to Video Tool
                  </h5>
                  <p className="text-sm text-gray-600">Turn static images into engaging videos in just a few clicks 🎬</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800">File Compression Suite</h5>
                  <p className="text-sm text-gray-600">Compress PDFs, videos, docs without losing quality - perfect for sharing! 📁</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Your All-in-One Creative Playground 🎮
          </h3>
          <div className="max-w-4xl mx-auto text-center mb-8">
            <p className="text-lg text-gray-700 mb-4">
              Vheer is your <span className="font-semibold text-blue-600">free, no-signup-required</span> AI toolbox that makes creative magic happen! 
              Whether you're a content creator, artist, student, or just someone who loves making cool stuff, we've got you covered with tools that are 
              <span className="font-semibold text-purple-600"> intuitive, lightning-fast, and 100% accessible</span> to everyone.
            </p>
            <p className="text-gray-600">
              From turning your wildest ideas into stunning visuals to editing photos like a pro - Vheer brings together multiple AI utilities 
              in one seamless experience. Built for efficiency and creativity, we help you <span className="font-semibold">get more done with fewer steps</span> and zero learning curve! 🚀
            </p>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Who's This Perfect For? (Spoiler: Everyone!) 🌟
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">🎥</span>
                Content Creators
              </h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Generate fire thumbnails and blog visuals</li>
                <li>• Create headshots that actually look professional</li>
                <li>• Use image-to-prompt for endless creative ideas</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">📱</span>
                Social Media & Marketing
              </h4>
              <ul className="text-sm text-purple-700 space-y-2">
                <li>• Style your text with fonts that hit different</li>
                <li>• Create videos from images to boost engagement</li>
                <li>• Clean product photos with background removal</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">🎨</span>
                Designers & Artists
              </h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• Brainstorm and iterate design concepts</li>
                <li>• Transform sketches into new variations</li>
                <li>• Generate reference images instantly</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">📚</span>
                Students & Professionals
              </h4>
              <ul className="text-sm text-orange-700 space-y-2">
                <li>• Compress large documents for easy sharing</li>
                <li>• Extract text from lecture slides or notes</li>
                <li>• Create presentations that actually look good</li>
              </ul>
            </div>

            <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
              <h4 className="font-semibold text-pink-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">✨</span>
                Everyday Users
              </h4>
              <ul className="text-sm text-pink-700 space-y-2">
                <li>• Turn photos into anime or realistic portraits</li>
                <li>• Edit images without expensive software</li>
                <li>• Create content for social sharing</li>
              </ul>
            </div>

            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">🚀</span>
                Why Vheer Hits Different
              </h4>
              <ul className="text-sm text-indigo-700 space-y-2">
                <li>• Completely free - no hidden costs ever</li>
                <li>• No signup required - jump right in</li>
                <li>• Lightning-fast processing times</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pros & Cons Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            The Real Talk - Pros & Cons 💯
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pros */}
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h4 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">✅</span>
                What's Fire About Vheer
              </h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 text-sm">Completely free to use (seriously, no catch!)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 text-sm">No signup required - start creating instantly</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 text-sm">High-quality image generation that rivals paid tools</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 text-sm">Wide variety of styles - from anime to photorealistic</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 text-sm">Super user-friendly interface (your grandma could use it)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 text-sm">Lightning-fast processing times</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 text-sm">Supports all major image formats</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 text-sm">Perfect for both personal fun and professional work</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 text-sm">Regular updates with fresh features</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 text-sm">Amazing community support and resources</span>
                </div>
              </div>
            </div>

            {/* Cons */}
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
              <h4 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">⚠️</span>
                Things to Keep in Mind
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <span className="text-orange-700 text-sm font-medium">Limited advanced editing features</span>
                    <p className="text-orange-600 text-xs">We focus on simplicity - for complex edits, you might need pro software</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <span className="text-orange-700 text-sm font-medium">Needs internet connection</span>
                    <p className="text-orange-600 text-xs">All the magic happens in the cloud, so you'll need to be online</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <span className="text-orange-700 text-sm font-medium">Works best with quality input images</span>
                    <p className="text-orange-600 text-xs">Garbage in, garbage out - better source images = better results</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <span className="text-orange-700 text-sm font-medium">Occasional generation quirks</span>
                    <p className="text-orange-600 text-xs">AI isn't perfect - sometimes results might be unexpected (but often hilariously good!)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <span className="text-orange-700 text-sm font-medium">Limited customization on some tools</span>
                    <p className="text-orange-600 text-xs">We prioritize ease of use over endless options</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Questions Everyone's Asking 🤔
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">How does the AI image generator work?</h4>
                <p className="text-blue-700 text-sm">Our AI uses advanced machine learning models trained on millions of images to understand your prompts and create stunning visuals from scratch. Just type what you want, and watch the magic happen! ✨</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Is Vheer actually free to use?</h4>
                <p className="text-green-700 text-sm">Yes! 100% free, no hidden costs, no premium tiers, no "pay to unlock" nonsense. We believe creativity shouldn't have a price tag! 💎</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">What types of images can I create?</h4>
                <p className="text-purple-700 text-sm">Pretty much anything! Portraits, landscapes, abstract art, anime characters, logos, social media graphics - if you can imagine it, our AI can probably create it. The only limit is your creativity! 🎨</p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Do I need design skills to use Vheer?</h4>
                <p className="text-orange-700 text-sm">Absolutely not! That's the whole point - we made it so easy that anyone can create professional-looking content. No design degree required! 🚀</p>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h4 className="font-semibold text-pink-800 mb-2">Can I upload my own images?</h4>
                <p className="text-pink-700 text-sm">Yes! Upload your photos to transform them, remove backgrounds, change styles, or use them as inspiration for new creations. Your pics, our AI magic! 📸</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-800 mb-2">What formats does Vheer support?</h4>
                <p className="text-indigo-700 text-sm">We support all the popular formats - JPG, PNG, GIF, WebP for images, plus PDF, DOC, PPT for compression tools. Basically, if it's a common format, we've got you covered! 📁</p>
              </div>
              
              <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <h4 className="font-semibold text-teal-800 mb-2">How quickly can I generate images?</h4>
                <p className="text-teal-700 text-sm">Most images are ready in under 30 seconds! Our servers are optimized for speed, so you won't be waiting around forever. Time to create, not to wait! ⚡</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">Is my data safe with Vheer?</h4>
                <p className="text-red-700 text-sm">Your privacy matters to us! We don't store your images longer than necessary for processing, and we never use them to train our models without permission. Your creations stay yours! 🔒</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">Can I use Vheer for commercial purposes?</h4>
                <p className="text-yellow-700 text-sm">Yes! Create content for your business, social media, marketing campaigns - go wild! Just make sure to follow our terms of service for commercial use. 💼</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">What if I encounter issues while using Vheer?</h4>
                <p className="text-gray-700 text-sm">Hit us up! Our support team is super responsive and actually helpful (no boring chatbots here). We're always working to make your experience smoother! 🛠️</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}