# NanoBanana AI - 环境变量配置指南

## 📋 环境变量配置

在项目根目录创建 `.env.local` 文件，并配置以下环境变量：

### 🔧 基础配置

```bash
# 应用基础URL（用于生成验证链接）
NEXT_PUBLIC_APP_URL=http://localhost:3000

# 数据库连接字符串
DATABASE_URL="postgresql://username:password@localhost:5432/nanobanana"

# NextAuth 配置
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### 📧 邮件服务配置（生产环境必需）

当前实现使用控制台输出来模拟邮件发送。在生产环境中，你需要选择以下邮件服务之一：

#### 选项 1: SendGrid（推荐）
```bash
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

#### 选项 2: AWS SES
```bash
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
```

#### 选项 3: 自定义 SMTP
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

#### 选项 4: Resend（简单易用）
```bash
RESEND_API_KEY=your_resend_api_key_here
```

### 💳 支付配置（未来使用）
```bash
# Creem 支付平台
CREEM_API_KEY=your_creem_api_key_here
CREEM_WEBHOOK_SECRET=your_webhook_secret_here
```

### 📊 分析配置（可选）
```bash
# Google Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Google Tag Manager
GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
```

### 🔒 安全配置（可选）
```bash
# 速率限制
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000
```

## 🚀 快速开始

### 1. 创建环境变量文件
```bash
# 在项目根目录执行
cp .env.example .env.local
```

### 2. 编辑 .env.local 文件
```bash
# 使用你喜欢的编辑器
nano .env.local
# 或
code .env.local
```

### 3. 配置必要的变量
至少需要配置：
- `NEXT_PUBLIC_APP_URL`
- `DATABASE_URL`
- `NEXTAUTH_SECRET`

### 4. 重启开发服务器
```bash
npm run dev
```

## 🔐 安全注意事项

1. **永远不要提交 .env.local 文件到版本控制**
2. **使用强密码和安全的密钥**
3. **定期轮换 API 密钥**
4. **在生产环境中使用环境变量管理服务**

## 🧪 测试配置

运行测试脚本验证配置是否正确：

```bash
node test-email-verification.js
```

## 📞 获取 API 密钥

### SendGrid
1. 注册 [SendGrid 账户](https://sendgrid.com/)
2. 创建 API 密钥
3. 验证发件人域名

### AWS SES
1. 登录 [AWS 控制台](https://aws.amazon.com/)
2. 进入 SES 服务
3. 创建访问密钥
4. 验证发件人邮箱

### Resend
1. 注册 [Resend 账户](https://resend.com/)
2. 创建 API 密钥
3. 验证发件人域名

## 🐛 常见问题

### 邮件发送失败
- 检查 API 密钥是否正确
- 确认发件人邮箱已验证
- 检查网络连接和防火墙设置

### 验证链接无效
- 确认 `NEXT_PUBLIC_APP_URL` 配置正确
- 检查域名和端口设置
- 验证 HTTPS 配置（生产环境）

### 数据库连接失败
- 检查数据库服务是否运行
- 验证连接字符串格式
- 确认数据库用户权限 