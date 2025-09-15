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
    
    console.log('Received request:', {
      hasTextPrompts: !!body.text_prompts,
      textPromptsLength: body.text_prompts?.length,
      hasInitImage: !!body.init_image,
      initImageLength: body.init_image?.length
    })
    
    // 验证必需参数
    if (!body.text_prompts || body.text_prompts.length === 0) {
      console.log('Validation failed: text_prompts missing or empty')
      return NextResponse.json(
        { error: 'text_prompts is required' },
        { status: 400 }
      )
    }

    if (!body.init_image) {
      console.log('Validation failed: init_image missing')
      return NextResponse.json(
        { error: 'init_image is required' },
        { status: 400 }
      )
    }

    // 获取 Stability AI API Key
    const apiKey = process.env.STABILITY_API_KEY
    if (!apiKey) {
      console.log('STABILITY_API_KEY not configured')
      return NextResponse.json(
        { error: 'STABILITY_API_KEY is not configured' },
        { status: 500 }
      )
    }

    console.log('API Key configured, proceeding with request...')

    // 创建 FormData 用于 multipart/form-data 请求
    const formData = new FormData()
    
    // 添加文本提示词
    body.text_prompts.forEach((prompt, index) => {
      formData.append(`text_prompts[${index}][text]`, prompt.text)
      formData.append(`text_prompts[${index}][weight]`, prompt.weight.toString())
    })
    
    // 添加初始图像（转换 base64 为 blob）
    try {
      const imageBlob = new Blob([Buffer.from(body.init_image, 'base64')], { type: 'image/png' })
      formData.append('init_image', imageBlob, 'init_image.png')
      console.log('Image blob created successfully, size:', imageBlob.size)
    } catch (blobError) {
      console.error('Failed to create image blob:', blobError)
      return NextResponse.json(
        { error: 'Failed to process uploaded image' },
        { status: 400 }
      )
    }
    
    // 添加其他参数
    formData.append('init_image_mode', 'IMAGE_STRENGTH')
    formData.append('image_strength', '0.35')
    formData.append('cfg_scale', '7')
    formData.append('steps', '30')
    formData.append('samples', '1')

    console.log('FormData created, sending request to Nano Banana AI model...')

    // 调用 Stability AI API
    const response = await fetch(
      'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'Stability-Client-ID': 'ai-photo-editor-app',
          'Stability-Client-Version': '1.0.0'
        },
        body: formData
      }
    )

    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
        console.error('Nano Banana AI model error:', errorData)
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError)
        errorData = { message: 'Unknown error occurred' }
      }
      
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
          details: errorData.message || 'Unknown error',
          status: response.status
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('Nano Banana AI image-to-image generation successful, response data:', data)
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