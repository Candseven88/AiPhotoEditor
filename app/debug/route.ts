import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const envVars = {
      DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not set',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL ? 'Set' : 'Not set',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ? 'Set' : 'Not set',
      NODE_ENV: process.env.NODE_ENV || 'Not set',
    };

    return NextResponse.json({
      status: 'success',
      environment: envVars,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Failed to check environment variables',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 