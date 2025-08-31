import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db/connection';
import { users } from '@/src/db/schema';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...');
    
    // 测试基本连接
    const result = await db.execute('SELECT 1 as test');
    console.log('Basic connection test result:', result);
    
    // 测试 schema 查询
    const userCount = await db.select().from(users).limit(1);
    console.log('Schema test result:', userCount);
    
    // 检查环境变量
    const dbUrl = process.env.DATABASE_URL;
    console.log('DATABASE_URL exists:', !!dbUrl);
    console.log('DATABASE_URL length:', dbUrl ? dbUrl.length : 0);
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      basicTest: result,
      schemaTest: userCount,
      hasDbUrl: !!dbUrl
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    }, { status: 500 });
  }
} 