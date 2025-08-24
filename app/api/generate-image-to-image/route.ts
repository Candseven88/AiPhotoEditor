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

    // 获取 API Key
    const apiKey = process.env.BIGMODEL_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'BIGMODEL_API_KEY is not configured' },
        { status: 500 }
      )
    }

    // 使用默认参数构建 BigModel 请求
    const bigModelRequest = {
      prompt: body.text_prompts[0].text,
      negative_prompt: body.text_prompts.find(p => p.weight < 0)?.text || '',
      width: 1024, // 默认尺寸
      height: 1024,
      steps: 30, // 默认步数，平衡质量和速度
      cfg_scale: 7, // 默认 CFG 比例
      seed: -1, // 随机种子
      init_image: body.init_image,
      image_strength: 0.35 // 默认图像强度，保持原图特征的同时进行转换
    }

    console.log('Sending image-to-image request to BigModel with default parameters...')

    // 调用 BigModel API
    const response = await fetch(
      'https://open.bigmodel.cn/api/paas/v4/images/generations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(bigModelRequest)
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('BigModel API error:', errorData)
      
      return NextResponse.json(
        { 
          error: 'Failed to generate image',
          details: errorData.message || 'Unknown error'
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('Image-to-image generation successful with default parameters')
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