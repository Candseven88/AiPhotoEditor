import { NextRequest, NextResponse } from 'next/server'

interface ImageToImageRequest {
  text_prompts: Array<{
    text: string
    weight: number
  }>
  init_image: string // base64 encoded image
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

    // 获取 Stability AI API Key
    const apiKey = process.env.STABILITY_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'STABILITY_API_KEY is not configured' },
        { status: 500 }
      )
    }

    // 使用默认参数构建 Stability AI 请求
    const stabilityRequest = {
      text_prompts: body.text_prompts,
      init_image: body.init_image,
      init_image_mode: 'IMAGE_STRENGTH',
      image_strength: 0.35, // 默认图像强度，保持原图特征的同时进行转换
      cfg_scale: 7, // 默认 CFG 比例
      steps: 30, // 默认步数，平衡质量和速度
      samples: 1
    }

    console.log('Sending image-to-image request to Nano Banana AI model...')

    // 调用 Stability AI API
    const response = await fetch(
      'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'Stability-Client-ID': 'nano-banana-app',
          'Stability-Client-Version': '1.0.0'
        },
        body: JSON.stringify(stabilityRequest)
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Nano Banana AI model error:', errorData)
      
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
    console.log('Nano Banana AI image-to-image generation successful')
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Nano Banana AI model error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 