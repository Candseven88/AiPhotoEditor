import { NextRequest, NextResponse } from 'next/server';
import { EmailVerificationService } from '@/src/services/email-verification';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // 验证令牌
    const result = await EmailVerificationService.verifyToken(token);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Verification failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Email verified successfully! You can now sign in to your account.',
      userUuid: result.userUuid,
    });

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // 验证令牌
    const result = await EmailVerificationService.verifyToken(token);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Verification failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Email verified successfully! You can now sign in to your account.',
      userUuid: result.userUuid,
    });

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 