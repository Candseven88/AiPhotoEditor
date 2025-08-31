import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/src/db/connection';
import { users } from '@/src/db/schema';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from '@/src/services/email';

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  nickname: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, nickname } = signupSchema.parse(body);

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user (email_verified defaults to false)
    const newUser = await db.insert(users).values({
      uuid: uuidv4(),
      email,
      password_hash: hashedPassword,
      nickname: nickname || email.split('@')[0],
      subscription_plan: 'free',
      credits_balance: 10,
      language: 'en',
      email_verified: false, // 新用户默认未验证
    }).returning();

    if (newUser.length === 0) {
      throw new Error('Failed to create user');
    }

    const user = newUser[0];

    // Send verification email
    const emailSent = await EmailService.sendVerificationEmail(
      user.uuid,
      user.email,
      user.nickname || user.email.split('@')[0]
    );

    if (!emailSent) {
      console.warn('Failed to send verification email for user:', user.uuid);
    }

    return NextResponse.json({
      message: 'User created successfully. Please check your email to verify your account.',
      user: {
        id: user.id,
        uuid: user.uuid,
        email: user.email,
        nickname: user.nickname,
        subscription_plan: user.subscription_plan,
        credits_balance: user.credits_balance,
        email_verified: user.email_verified,
      },
      emailSent,
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('Error name:', error instanceof Error ? error.name : 'Unknown error type');
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    // 检查是否是数据库连接错误
    if (error instanceof Error) {
      if (error.message.includes('connection') || error.message.includes('DATABASE_URL')) {
        return NextResponse.json(
          { error: 'Database connection failed. Please check your database configuration.' },
          { status: 500 }
        );
      }
      
      if (error.message.includes('relation') || error.message.includes('table')) {
        return NextResponse.json(
          { error: 'Database schema error. Please run database migrations.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 