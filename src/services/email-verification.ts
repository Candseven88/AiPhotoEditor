import { db } from '../db/connection';
import { email_verifications, users } from '../db/schema';
import { eq, and, lt } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { NewEmailVerification } from '../db/schema';

export class EmailVerificationService {
  /**
   * 生成邮箱验证令牌
   */
  static async generateVerificationToken(userUuid: string): Promise<string> {
    // 删除旧的验证令牌
    await db.delete(email_verifications).where(eq(email_verifications.user_uuid, userUuid));
    
    // 生成新的验证令牌
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24小时后过期
    
    await db.insert(email_verifications).values({
      user_uuid: userUuid,
      token,
      expires_at: expiresAt,
    });
    
    return token;
  }

  /**
   * 验证邮箱验证令牌
   */
  static async verifyToken(token: string): Promise<{ success: boolean; userUuid?: string; error?: string }> {
    try {
      const verification = await db.query.email_verifications.findFirst({
        where: eq(email_verifications.token, token),
      });

      if (!verification) {
        return { success: false, error: 'Invalid verification token' };
      }

      // 检查令牌是否过期
      if (new Date() > verification.expires_at) {
        // 删除过期的令牌
        await db.delete(email_verifications).where(eq(email_verifications.token, token));
        return { success: false, error: 'Verification token has expired' };
      }

      // 更新用户邮箱验证状态
      await db.update(users)
        .set({ 
          email_verified: true, 
          email_verified_at: new Date() 
        })
        .where(eq(users.uuid, verification.user_uuid));

      // 删除已使用的验证令牌
      await db.delete(email_verifications).where(eq(email_verifications.token, token));

      return { success: true, userUuid: verification.user_uuid };
    } catch (error) {
      console.error('Error verifying token:', error);
      return { success: false, error: 'Internal server error' };
    }
  }

  /**
   * 检查用户邮箱是否已验证
   */
  static async isEmailVerified(userUuid: string): Promise<boolean> {
    const user = await db.query.users.findFirst({
      where: eq(users.uuid, userUuid),
      columns: { email_verified: true },
    });
    
    return user?.email_verified || false;
  }

  /**
   * 重新发送验证邮件
   */
  static async resendVerification(userUuid: string): Promise<string | null> {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.uuid, userUuid),
        columns: { email: true, email_verified: true },
      });

      if (!user) {
        return 'User not found';
      }

      if (user.email_verified) {
        return 'Email is already verified';
      }

      const token = await this.generateVerificationToken(userUuid);
      return null; // 成功，返回null表示没有错误
    } catch (error) {
      console.error('Error resending verification:', error);
      return 'Failed to resend verification email';
    }
  }
} 