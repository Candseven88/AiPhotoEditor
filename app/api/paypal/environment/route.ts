import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const environment = process.env.PAYPAL_ENVIRONMENT || 'sandbox'
    
    return NextResponse.json({
      environment,
      status: 'configured',
      message: environment === 'live' 
        ? 'Production environment - Real payments enabled'
        : 'Sandbox environment - Test mode only'
    })
  } catch (error) {
    console.error('Environment check error:', error)
    return NextResponse.json(
      { 
        environment: 'unknown',
        status: 'error',
        message: 'Failed to check environment configuration'
      },
      { status: 500 }
    )
  }
} 