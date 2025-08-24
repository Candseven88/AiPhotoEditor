import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderID } = body

    if (!orderID) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // 获取 PayPal 环境变量
    const clientId = process.env.PAYPAL_CLIENT_ID
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET
    const environment = process.env.PAYPAL_ENVIRONMENT || 'sandbox'

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'PayPal credentials not configured' },
        { status: 500 }
      )
    }

    // 根据环境选择 PayPal API 端点
    const baseUrl = environment === 'live' 
      ? 'https://api-m.paypal.com' 
      : 'https://api-m.sandbox.paypal.com'

    // 获取 PayPal 访问令牌
    const tokenResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
      },
      body: 'grant_type=client_credentials'
    })

    if (!tokenResponse.ok) {
      console.error('Failed to get PayPal access token')
      return NextResponse.json(
        { error: 'Failed to authenticate with PayPal' },
        { status: 500 }
      )
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // 检查订单状态
    const orderResponse = await fetch(`${baseUrl}/v2/checkout/orders/${orderID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json()
      console.error('PayPal order status check failed:', errorData)
      return NextResponse.json(
        { error: 'Failed to check order status' },
        { status: 500 }
      )
    }

    const orderData = await orderResponse.json()
    
    return NextResponse.json({
      orderID: orderData.id,
      status: orderData.status,
      intent: orderData.intent,
      paymentSource: orderData.payment_source,
      createTime: orderData.create_time,
      updateTime: orderData.update_time
    })

  } catch (error) {
    console.error('PayPal status check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 