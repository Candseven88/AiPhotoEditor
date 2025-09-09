# NanoBanana 邮箱验证功能设置指南

## 📧 功能概述

NanoBanana 现在支持邮箱验证功能，用户在注册后需要验证邮箱地址才能登录使用系统。这提高了账户安全性，防止虚假邮箱注册。

## 🚀 功能特性

- ✅ 用户注册后自动发送验证邮件
- ✅ 24小时有效的验证链接
- ✅ 验证成功后自动激活账户
- ✅ 支持重新发送验证邮件
- ✅ 美观的验证页面界面
- ✅ 完整的错误处理

## 🛠️ 技术实现

### 数据库结构

#### 用户表 (users)
- `email_verified`: 邮箱是否已验证 (boolean)
- `email_verified_at`: 邮箱验证时间 (timestamp)
- `password_hash`: 加密后的密码 (text)

#### 邮箱验证表 (email_verifications)
- `user_uuid`: 用户UUID (varchar)
- `token`: 验证令牌 (varchar, unique)
- `expires_at`: 过期时间 (timestamp)
- `created_at`: 创建时间 (timestamp)

### API 接口

#### 1. 邮箱验证
```
POST /api/auth/verify-email
GET  /api/auth/verify-email?token=<token>
```

#### 2. 重新发送验证邮件
```
POST /api/auth/resend-verification
```

### 页面路由

- `/auth/verify-email` - 邮箱验证页面
- 支持通过 URL 参数传递验证令牌

## 📋 设置步骤

### 1. 数据库迁移

运行以下 SQL 脚本来更新数据库结构：

```sql
-- 添加新字段到用户表
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS password_hash TEXT,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMP WITH TIME ZONE;

-- 创建邮箱验证表
CREATE TABLE IF NOT EXISTS email_verifications (
  id SERIAL PRIMARY KEY,
  user_uuid VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_email_verifications_user_uuid ON email_verifications(user_uuid);
CREATE INDEX IF NOT EXISTS idx_email_verifications_token ON email_verifications(token);
CREATE INDEX IF NOT EXISTS idx_email_verifications_expires_at ON email_verifications(expires_at);
```

### 2. 环境变量配置

在 `.env.local` 文件中添加：

```bash
# 应用基础URL（用于生成验证链接）
NEXT_PUBLIC_APP_URL=http://localhost:3000

# 邮件服务配置（可选，当前使用控制台输出模拟）
# SENDGRID_API_KEY=your_sendgrid_api_key
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your_email@gmail.com
# SMTP_PASS=your_app_password
```

### 3. 启动应用

```bash
npm run dev
```

## 🔧 生产环境配置

### 集成真实邮件服务

当前实现使用控制台输出来模拟邮件发送。在生产环境中，你需要集成真实的邮件服务：

#### 选项 1: SendGrid
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const msg = {
  to: userEmail,
  from: 'noreply@nanobanana.ai',
  subject: 'Verify your NanoBanana account',
  html: emailContent.html,
  text: emailContent.text,
};

await sgMail.send(msg);
```

#### 选项 2: AWS SES
```typescript
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: 'us-east-1' });

const command = new SendEmailCommand({
  Source: 'noreply@nanobanana.ai',
  Destination: { ToAddresses: [userEmail] },
  Message: {
    Subject: { Data: 'Verify your NanoBanana account' },
    Body: {
      Html: { Data: emailContent.html },
      Text: { Data: emailContent.text },
    },
  },
});

await ses.send(command);
```

#### 选项 3: 自定义 SMTP
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

await transporter.sendMail({
  from: 'noreply@nanobanana.ai',
  to: userEmail,
  subject: 'Verify your NanoBanana account',
  html: emailContent.html,
  text: emailContent.text,
});
```

## 📱 用户流程

### 1. 用户注册
1. 用户填写注册表单
2. 系统创建账户（email_verified = false）
3. 自动发送验证邮件
4. 显示"请检查邮箱验证"提示

### 2. 邮箱验证
1. 用户点击邮件中的验证链接
2. 系统验证令牌有效性
3. 更新用户状态（email_verified = true）
4. 显示验证成功页面

### 3. 用户登录
1. 用户尝试登录
2. 系统检查邮箱是否已验证
3. 如果未验证，显示错误信息
4. 如果已验证，允许登录

## 🧪 测试

### 测试注册流程
1. 访问 `/auth/signup`
2. 填写注册信息
3. 检查控制台输出（模拟邮件发送）
4. 验证用户状态为未验证

### 测试验证流程
1. 复制控制台中的验证链接
2. 访问验证链接
3. 检查验证是否成功
4. 尝试登录验证账户

## 🔒 安全考虑

- 验证令牌使用 UUID 生成，确保唯一性
- 令牌24小时后自动过期
- 验证成功后立即删除令牌
- 支持重新发送验证邮件
- 密码使用 bcrypt 加密存储

## 🐛 故障排除

### 常见问题

1. **验证邮件未发送**
   - 检查控制台输出
   - 确认邮件服务配置
   - 检查环境变量

2. **验证链接无效**
   - 确认令牌未过期
   - 检查数据库中的令牌记录
   - 验证URL格式

3. **用户无法登录**
   - 确认邮箱已验证
   - 检查用户表中的 email_verified 字段
   - 验证密码是否正确

### 日志检查

查看控制台和服务器日志来诊断问题：

```bash
# 检查应用日志
npm run dev

# 检查数据库连接
npm run db:studio
```

## 📞 支持

如果你遇到问题或需要帮助，请：

1. 检查本文档的故障排除部分
2. 查看控制台错误信息
3. 确认数据库迁移是否成功
4. 验证环境变量配置

---

**注意**: 这是一个基础实现，在生产环境中建议：
- 集成真实的邮件服务
- 添加速率限制防止滥用
- 实现更复杂的错误处理
- 添加监控和日志记录 