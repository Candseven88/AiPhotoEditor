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
    const apiKey = process.env.BIGMODEL_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'BIGMODEL_API_KEY is not configured' },
        { status: 500 }
      )
    }

    // 构建 BigModel 请求参数
    const bigModelRequest = {
      prompt: body.text_prompts[0].text,
      negative_prompt: body.text_prompts.find(p => p.weight < 0)?.text || '',
      width: 1024, // SDXL 1.0 标准尺寸
      height: 1024,
      steps: body.steps || 30,
      cfg_scale: body.cfg_scale || 7,
      seed: -1, // 随机种子
      init_image: body.init_image,
      image_strength: body.image_strength || 0.35
    }

    console.log('Sending image-to-image request to BigModel...')

    // 调用 BigModel API (这里需要根据实际的 BigModel 图生图 API 调整)
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