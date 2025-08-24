import { NextRequest, NextResponse } from 'next/server'

interface GenerationRequest {
  prompt: string
  size: string
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerationRequest = await request.json()
    
    // 验证必需参数
    if (!body.prompt || !body.prompt.trim()) {
      return NextResponse.json(
        { error: 'prompt is required' },
        { status: 400 }
      )
    }

    if (!body.size) {
      return NextResponse.json(
        { error: 'size is required' },
        { status: 400 }
      )
    }

    // 获取 BigModel API Key
    const apiKey = process.env.BIGMODEL_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'BIGMODEL_API_KEY is not configured' },
        { status: 500 }
      )
    }

    // 构建 BigModel API 请求
    const bigModelRequest = {
      model: "cogview-3-flash",
      prompt: body.prompt,
      size: body.size
    }

    console.log('Sending request to Nano Banana AI model...')

    // 调用 BigModel API
    const response = await fetch(
      'https://open.bigmodel.cn/api/paas/v4/images/generations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(bigModelRequest)
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Nano Banana AI model error:', errorData)
      
      return NextResponse.json(
        { 
          error: errorData.error?.message || 'Failed to generate image',
          details: errorData
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('Nano Banana AI generation successful')
    
    // 转换 BigModel 响应格式
    if (data.data && data.data.length > 0) {
      return NextResponse.json({
        artifacts: data.data.map((item: any) => ({
          url: item.url,
          base64: null // BigModel 返回的是 URL，不是 base64
        }))
      })
    } else {
      throw new Error('No images generated')
    }

  } catch (error) {
    console.error('Nano Banana AI model error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
} 