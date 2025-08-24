# SDXL 1.0 模型接入样例代码

本文档提供了完整的 SDXL 1.0 模型接入示例，包括 Text-to-Image 和 Image-to-Image 两种模式的实现。

## 📋 目录

- [环境准备](#环境准备)
- [Text-to-Image 接入示例](#text-to-image-接入示例)
- [Image-to-Image 接入示例](#image-to-image-接入示例)
- [完整项目结构](#完整项目结构)
- [部署配置](#部署配置)
- [故障排除](#故障排除)

## 🚀 环境准备

### 1. 安装依赖

```bash
npm install next@15.0.0 react react-dom typescript
npm install framer-motion lucide-react
npm install tailwindcss postcss autoprefixer
npm install @types/node @types/react @types/react-dom
```

### 2. 环境变量配置

创建 `.env.local` 文件：

```env
STABILITY_API_KEY=your_stability_ai_api_key_here
```

### 3. 获取 API Key

1. 访问 [Stability AI](https://platform.stability.ai/)
2. 注册账户并登录
3. 在 API Keys 页面生成新的 API Key
4. 复制 API Key 到 `.env.local` 文件

## 🎨 Text-to-Image 接入示例

### 1. API 路由实现

```typescript
// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server'

interface GenerationRequest {
  text_prompts: Array<{
    text: string
    weight: number
  }>
  height: number
  width: number
  cfg_scale: number
  steps: number
  samples: number
  style_preset?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerationRequest = await request.json()
    
    // 验证必需参数
    if (!body.text_prompts || body.text_prompts.length === 0) {
      return NextResponse.json(
        { error: 'text_prompts is required' },
        { status: 400 }
      )
    }

    // 获取 API Key
    const apiKey = process.env.STABILITY_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'STABILITY_API_KEY is not configured' },
        { status: 500 }
      )
    }

    // 构建 Stability AI 请求
    const stabilityRequest = {
      text_prompts: body.text_prompts,
      height: body.height,
      width: body.width,
      cfg_scale: body.cfg_scale || 7,
      steps: body.steps || 30,
      samples: body.samples || 1,
      ...(body.style_preset && { style_preset: body.style_preset })
    }

    console.log('Sending request to Stability AI...')

    // 调用 Stability AI API
    const response = await fetch(
      `https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'Stability-Client-ID': 'your-app-name',
          'Stability-Client-Version': '1.0.0'
        },
        body: JSON.stringify(stabilityRequest)
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Stability AI API error:', errorData)
      
      // 处理特定错误
      if (errorData.name === 'content_moderation') {
        return NextResponse.json(
          { 
            error: 'Content flagged by moderation',
            details: errorData.message,
            type: 'content_moderation'
          },
          { status: 403 }
        )
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to generate image',
          details: errorData.message || 'Unknown error'
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('Generation successful')
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
```

### 2. 前端组件实现

```typescript
// app/page.tsx (Text-to-Image 部分)
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wand2, Download, Loader2 } from 'lucide-react'

interface GenerationRequest {
  text_prompts: Array<{
    text: string
    weight: number
  }>
  height: number
  width: number
  cfg_scale: number
  steps: number
  samples: number
  style_preset?: string
}

export default function TextToImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [height, setHeight] = useState(1024)
  const [width, setWidth] = useState(1024)
  const [cfgScale, setCfgScale] = useState(7)
  const [steps, setSteps] = useState(30)
  const [stylePreset, setStylePreset] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [error, setError] = useState('')

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      const request: GenerationRequest = {
        text_prompts: [
          { text: prompt, weight: 1.0 },
          ...(negativePrompt.trim() ? [{ text: negativePrompt, weight: -1.0 }] : [])
        ],
        height,
        width,
        cfg_scale: cfgScale,
        steps,
        samples: 1,
        ...(stylePreset && { style_preset: stylePreset })
      }

      // 创建超时控制器
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 120000) // 2分钟超时

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate image')
      }

      const data = await response.json()

      if (data.artifacts && data.artifacts.length > 0) {
        const newImages = data.artifacts.map(artifact => 
          `data:image/png;base64,${artifact.base64}`
        )
        setGeneratedImages(prev => [...newImages, ...prev])
        setError('')
      } else {
        throw new Error('No images generated')
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setError('Request timed out. Please try again.')
      } else {
        setError(error.message || 'Failed to generate image')
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadImage = (imageData: string, index: number) => {
    const link = document.createElement('a')
    link.href = imageData
    link.download = `sdxl-generated-${Date.now()}-${index}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        SDXL 1.0 Text-to-Image Generator
      </h1>

      {/* 输入表单 */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左侧：提示词输入 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="w-full h-24 px-3 py-2 border rounded-lg resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Negative Prompt (Optional)
              </label>
              <textarea
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="What you don't want in the image..."
                className="w-full h-20 px-3 py-2 border rounded-lg resize-none"
              />
            </div>
          </div>

          {/* 右侧：参数控制 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Image Size: {width}x{height}
              </label>
              <select
                value={`${width}x${height}`}
                onChange={(e) => {
                  const [w, h] = e.target.value.split('x').map(Number)
                  setWidth(w)
                  setHeight(h)
                }}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="1024x1024">1024x1024</option>
                <option value="1152x896">1152x896</option>
                <option value="896x1152">896x1152</option>
                <option value="1216x832">1216x832</option>
                <option value="1344x768">1344x768</option>
                <option value="768x1344">768x1344</option>
                <option value="1536x640">1536x640</option>
                <option value="640x1536">640x1536</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                CFG Scale: {cfgScale}
              </label>
              <input
                type="range"
                min="1"
                max="35"
                value={cfgScale}
                onChange={(e) => setCfgScale(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Steps: {steps}
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={steps}
                onChange={(e) => setSteps(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Cost: {steps <= 30 ? 0.9 : (0.9 * (steps / 30)).toFixed(2)} credits
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Style Preset (Optional)
              </label>
              <select
                value={stylePreset}
                onChange={(e) => setStylePreset(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">No preset</option>
                <option value="3d-model">3D Model</option>
                <option value="anime">Anime</option>
                <option value="cinematic">Cinematic</option>
                <option value="digital-art">Digital Art</option>
                <option value="fantasy-art">Fantasy Art</option>
                <option value="photographic">Photographic</option>
              </select>
            </div>
          </div>
        </div>

        {/* 生成按钮 */}
        <div className="mt-6">
          <button
            onClick={generateImage}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                Generate Image
              </>
            )}
          </button>
        </div>
      </div>

      {/* 错误显示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* 生成的图像 */}
      {generatedImages.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Generated Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedImages.map((image, index) => (
              <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Generated image ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <button
                    onClick={() => downloadImage(image, index)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

## 🖼️ Image-to-Image 接入示例

### 1. API 路由实现

```typescript
// app/api/generate-image-to-image/route.ts
import { NextRequest, NextResponse } from 'next/server'

interface ImageToImageRequest {
  text_prompts: Array<{
    text: string
    weight: number
  }>
  init_image: string // base64 encoded image
  init_image_mode?: 'IMAGE_STRENGTH' | 'STEP_SCHEDULE'
  image_strength?: number
  step_schedule_start?: number
  step_schedule_end?: number
  cfg_scale: number
  steps: number
  samples: number
  style_preset?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ImageToImageRequest = await request.json()
    
    // 验证必需参数
    if (!body.text_prompts || body.text_prompts.length === 0) {
      return NextResponse.json(
        { error: 'text_prompts is required' },
        { status: 400 }
      )
    }

    if (!body.init_image) {
      return NextResponse.json(
        { error: 'init_image is required' },
        { status: 400 }
      )
    }

    // 获取 API Key
    const apiKey = process.env.STABILITY_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'STABILITY_API_KEY is not configured' },
        { status: 500 }
      )
    }

    // 创建 FormData 用于 multipart/form-data 请求
    const formData = new FormData()
    
    // 添加文本提示词
    body.text_prompts.forEach((prompt, index) => {
      formData.append(`text_prompts[${index}][text]`, prompt.text)
      formData.append(`text_prompts[${index}][weight]`, prompt.weight.toString())
    })
    
    // 添加初始图像（转换 base64 为 blob）
    const imageBlob = new Blob([Buffer.from(body.init_image, 'base64')], { type: 'image/png' })
    formData.append('init_image', imageBlob, 'init_image.png')
    
    // 添加其他参数
    formData.append('init_image_mode', body.init_image_mode || 'IMAGE_STRENGTH')
    formData.append('image_strength', (body.image_strength || 0.35).toString())
    formData.append('cfg_scale', (body.cfg_scale || 7).toString())
    formData.append('steps', (body.steps || 30).toString())
    formData.append('samples', (body.samples || 1).toString())
    
    if (body.step_schedule_start) {
      formData.append('step_schedule_start', body.step_schedule_start.toString())
    }
    
    if (body.step_schedule_end) {
      formData.append('step_schedule_end', body.step_schedule_end.toString())
    }
    
    if (body.style_preset) {
      formData.append('style_preset', body.style_preset)
    }

    console.log('Sending image-to-image request to Stability AI...')

    // 调用 Stability AI API
    const response = await fetch(
      `https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'Stability-Client-ID': 'your-app-name',
          'Stability-Client-Version': '1.0.0'
        },
        body: formData
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Stability AI API error:', errorData)
      
      // 处理特定错误
      if (errorData.name === 'content_moderation') {
        return NextResponse.json(
          { 
            error: 'Content flagged by moderation',
            details: errorData.message,
            type: 'content_moderation'
          },
          { status: 403 }
        )
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to generate image',
          details: errorData.message || 'Unknown error'
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('Image-to-image generation successful')
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Image-to-image generation error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
```

### 2. 前端组件实现

```typescript
// app/image-to-image/page.tsx
'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Palette, Loader2, Download } from 'lucide-react'

interface ImageToImageRequest {
  text_prompts: Array<{
    text: string
    weight: number
  }>
  init_image: string
  init_image_mode?: 'IMAGE_STRENGTH' | 'STEP_SCHEDULE'
  image_strength?: number
  step_schedule_start?: number
  step_schedule_end?: number
  cfg_scale: number
  steps: number
  samples: number
  style_preset?: string
}

export default function ImageToImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [imageStrength, setImageStrength] = useState(0.35)
  const [cfgScale, setCfgScale] = useState(7)
  const [steps, setSteps] = useState(30)
  const [stylePreset, setStylePreset] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [error, setError] = useState('')
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理图像上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUploadedImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  // 移除上传的图像
  const removeUploadedImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // 生成图像
  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    if (!uploadedImage) {
      setError('Please upload an image')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      // 转换 data URL 为 base64
      const base64Image = uploadedImage.split(',')[1]

      const request: ImageToImageRequest = {
        text_prompts: [
          { text: prompt, weight: 1.0 },
          ...(negativePrompt.trim() ? [{ text: negativePrompt, weight: -1.0 }] : [])
        ],
        init_image: base64Image,
        init_image_mode: 'IMAGE_STRENGTH',
        image_strength: imageStrength,
        cfg_scale: cfgScale,
        steps,
        samples: 1,
        ...(stylePreset && { style_preset: stylePreset })
      }

      // 创建超时控制器
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 120000) // 2分钟超时

      const response = await fetch('/api/generate-image-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate image')
      }

      const data = await response.json()

      if (data.artifacts && data.artifacts.length > 0) {
        const newImages = data.artifacts.map(artifact => 
          `data:image/png;base64,${artifact.base64}`
        )
        setGeneratedImages(prev => [...newImages, ...prev])
        setError('')
      } else {
        throw new Error('No images generated')
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setError('Request timed out. Please try again.')
      } else {
        setError(error.message || 'Failed to generate image')
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadImage = (imageData: string, index: number) => {
    const link = document.createElement('a')
    link.href = imageData
    link.download = `sdxl-transformed-${Date.now()}-${index}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        SDXL 1.0 Image-to-Image Generator
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左侧：图像上传和提示词 */}
          <div className="space-y-4">
            {/* 图像上传 */}
            <div>
              <label className="block text-sm font-medium mb-2">Upload Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {uploadedImage ? (
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="max-w-full h-auto max-h-64 mx-auto rounded-lg"
                    />
                    <button
                      onClick={removeUploadedImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      PNG, JPG up to 10MB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Choose File
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 提示词输入 */}
            <div>
              <label className="block text-sm font-medium mb-2">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe how you want to transform the image..."
                className="w-full h-24 px-3 py-2 border rounded-lg resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Negative Prompt (Optional)
              </label>
              <textarea
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="What you don't want in the transformed image..."
                className="w-full h-20 px-3 py-2 border rounded-lg resize-none"
              />
            </div>
          </div>

          {/* 右侧：参数控制 */}
          <div className="space-y-4">
            {/* Image Strength */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Image Strength: {(imageStrength * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={imageStrength}
                onChange={(e) => setImageStrength(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Preserve Original</span>
                <span>Transform Completely</span>
              </div>
            </div>

            {/* CFG Scale */}
            <div>
              <label className="block text-sm font-medium mb-2">
                CFG Scale: {cfgScale}
              </label>
              <input
                type="range"
                min="1"
                max="35"
                value={cfgScale}
                onChange={(e) => setCfgScale(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Steps */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Steps: {steps}
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={steps}
                onChange={(e) => setSteps(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Cost: {steps <= 30 ? 0.9 : (0.9 * (steps / 30)).toFixed(2)} credits
              </p>
            </div>

            {/* Style Preset */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Style Preset (Optional)
              </label>
              <select
                value={stylePreset}
                onChange={(e) => setStylePreset(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">No preset</option>
                <option value="3d-model">3D Model</option>
                <option value="anime">Anime</option>
                <option value="cinematic">Cinematic</option>
                <option value="digital-art">Digital Art</option>
                <option value="fantasy-art">Fantasy Art</option>
                <option value="photographic">Photographic</option>
              </select>
            </div>
          </div>
        </div>

        {/* 生成按钮 */}
        <div className="mt-6">
          <button
            onClick={generateImage}
            disabled={isGenerating || !prompt.trim() || !uploadedImage}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Transforming Image...
              </>
            ) : (
              <>
                <Palette className="w-5 h-5 mr-2" />
                Transform Image
              </>
            )}
          </button>
        </div>
      </div>

      {/* 错误显示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* 生成的图像 */}
      {generatedImages.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Transformed Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedImages.map((image, index) => (
              <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Transformed image ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <button
                    onClick={() => downloadImage(image, index)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

## 📁 完整项目结构

```
sdxl-image-generator/
├── app/
│   ├── api/
│   │   ├── generate/
│   │   │   └── route.ts          # Text-to-Image API
│   │   └── generate-image-to-image/
│   │       └── route.ts          # Image-to-Image API
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 主页面 (Text-to-Image)
│   └── image-to-image/
│       └── page.tsx              # Image-to-Image 页面
├── lib/
│   └── utils.ts                  # 工具函数
├── public/                       # 静态资源
├── .env.local                    # 环境变量
├── .env.example                  # 环境变量示例
├── next.config.js                # Next.js 配置
├── tailwind.config.js            # Tailwind CSS 配置
├── postcss.config.js             # PostCSS 配置
├── tsconfig.json                 # TypeScript 配置
├── package.json                  # 项目依赖
└── README.md                     # 项目文档
```

## ⚙️ 配置文件

### 1. Next.js 配置

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
```

### 2. Tailwind CSS 配置

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
}
```

### 3. TypeScript 配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 🚀 部署配置

### 1. Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 设置环境变量
vercel env add STABILITY_API_KEY
```

### 2. 环境变量配置

在 Vercel 项目设置中添加：

```env
STABILITY_API_KEY=your_stability_ai_api_key_here
```

## 🔧 故障排除

### 1. 常见错误

#### API Key 错误
```bash
Error: STABILITY_API_KEY is not configured
```
**解决方案**: 检查 `.env.local` 文件中的 API Key 是否正确设置

#### 内容审核错误
```bash
Error: Content flagged by moderation
```
**解决方案**: 尝试使用更安全的提示词，避免敏感内容

#### 超时错误
```bash
Error: Request timed out
```
**解决方案**: 减少 Steps 数量，使用更简单的提示词

### 2. 调试技巧

#### 启用详细日志
```typescript
// 在 API 路由中添加
console.log('Request body:', body)
console.log('API response:', data)
```

#### 测试 API 端点
```bash
# 测试 Text-to-Image
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"text_prompts":[{"text":"A beautiful sunset","weight":1.0}],"height":1024,"width":1024,"cfg_scale":7,"steps":30,"samples":1}'

# 测试 Image-to-Image
curl -X POST http://localhost:3000/api/generate-image-to-image \
  -H "Content-Type: application/json" \
  -d '{"text_prompts":[{"text":"Transform this","weight":1.0}],"init_image":"base64_image_data","image_strength":0.35,"cfg_scale":7,"steps":30,"samples":1}'
```

## 📚 最佳实践

### 1. 提示词优化

#### 有效的提示词
- "A beautiful sunset over mountains with golden light"
- "A cute cat sitting in a peaceful garden with flowers"
- "A modern city skyline at night with neon lights"

#### 避免的提示词
- 过于复杂的描述
- 可能触发内容审核的内容
- 模糊或不明确的描述

### 2. 参数调优

#### 图像质量 vs 速度
- **快速生成**: Steps 20-30, CFG Scale 7-10
- **高质量**: Steps 40-50, CFG Scale 10-15
- **平衡模式**: Steps 30-35, CFG Scale 7-10

#### Image Strength 选择
- **保持原图**: 0.2-0.4
- **平衡转换**: 0.4-0.6
- **创意转换**: 0.6-0.8

### 3. 错误处理

#### 用户友好的错误信息
```typescript
const errorMessages = {
  'content_moderation': '内容被审核系统标记，请尝试其他提示词',
  'invalid_sdxl_v1_dimensions': '图像尺寸不支持，请使用支持的尺寸',
  'unauthorized': 'API 密钥无效，请检查配置',
  'rate_limit': '请求过于频繁，请稍后再试'
}
```

## 🎯 总结

这个完整的 SDXL 1.0 接入示例提供了：

1. **完整的 API 实现**: Text-to-Image 和 Image-to-Image 两种模式
2. **用户友好的界面**: 响应式设计，支持移动端
3. **健壮的错误处理**: 超时控制、内容审核、参数验证
4. **生产就绪的配置**: 环境变量、部署配置、性能优化
5. **详细的文档**: 使用说明、故障排除、最佳实践

通过这些代码示例，你可以快速构建一个功能完整的 AI 图像生成应用，并可以根据具体需求进行定制和扩展。 