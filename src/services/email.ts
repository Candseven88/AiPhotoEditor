import { EmailVerificationService } from './email-verification';

export class EmailService {
  /**
   * 发送邮箱验证邮件
   */
  static async sendVerificationEmail(userUuid: string, userEmail: string, userNickname: string): Promise<boolean> {
    try {
      // 生成验证令牌
      const token = await EmailVerificationService.generateVerificationToken(userUuid);
      
      // 构建验证链接
      const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/verify-email?token=${token}`;
      
      // 邮件内容
      const emailContent = {
        to: userEmail,
        subject: 'Verify your NanoBanana account',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #f97316;">Welcome to NanoBanana!</h2>
            <p>Hi ${userNickname || userEmail.split('@')[0]},</p>
            <p>Thank you for creating your NanoBanana account. To complete your registration, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background-color: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
            
            <p>This link will expire in 24 hours.</p>
            
            <p>If you didn't create this account, you can safely ignore this email.</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              Best regards,<br>
              The NanoBanana Team
            </p>
          </div>
        `,
        text: `
          Welcome to NanoBanana!
          
          Hi ${userNickname || userEmail.split('@')[0]},
          
          Thank you for creating your NanoBanana account. To complete your registration, please verify your email address by visiting this link:
          
          ${verificationUrl}
          
          This link will expire in 24 hours.
          
          If you didn't create this account, you can safely ignore this email.
          
          Best regards,
          The NanoBanana Team
        `
      };

      // 在生产环境中，这里应该集成真实的邮件服务（如 SendGrid、AWS SES 等）
      // 为了演示，我们只打印邮件内容到控制台
      console.log('📧 Email verification email would be sent:');
      console.log('To:', emailContent.to);
      console.log('Subject:', emailContent.subject);
      console.log('Verification URL:', verificationUrl);
      
      // 在实际项目中，你需要集成邮件服务
      // 例如：await sendGrid.send(emailContent);
      
      return true;
    } catch (error) {
      console.error('Error sending verification email:', error);
      return false;
    }
  }

  /**
   * 发送密码重置邮件
   */
  static async sendPasswordResetEmail(userUuid: string, userEmail: string, userNickname: string): Promise<boolean> {
    try {
      // 这里可以实现密码重置功能
      console.log('📧 Password reset email would be sent to:', userEmail);
      return true;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return false;
    }
  }
} 