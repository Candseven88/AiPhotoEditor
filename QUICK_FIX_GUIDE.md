# 🚨 快速修复指南 - NanoBanana 邮箱验证问题

## 🔧 已修复的问题

### 1. HTML 结构错误（嵌套 button 标签）
✅ **已修复** - 移除了所有组件中嵌套的 button 标签：
- `UsernameToImageGenerator.tsx`
- `ImageGenerator.tsx` 
- `ImageToImageGenerator.tsx`

**问题**: 这些组件中有 `motion.button` 包裹 `GradientButton`，而 `GradientButton` 本身就是一个 button 元素。

**解决方案**: 直接使用 `GradientButton`，将 `motion.button` 改为 `motion.div`。

## 🐛 当前问题：API 500 错误

### 问题描述
注册 API (`/api/auth/signup`) 返回 500 内部服务器错误。

### 🔍 调试步骤

#### 步骤 1: 检查环境变量
访问 `/debug` 端点检查环境变量配置：
```bash
curl http://localhost:3000/debug
```

确保以下环境变量已设置：
- `DATABASE_URL` - 数据库连接字符串
- `NEXTAUTH_SECRET` - NextAuth 密钥
- `NEXTAUTH_URL` - NextAuth URL

#### 步骤 2: 测试数据库连接
访问 `/api/test-db` 端点测试数据库连接：
```bash
curl http://localhost:3000/api/test-db
```

#### 步骤 3: 检查控制台日志
在浏览器开发者工具中查看控制台错误信息。

### 🛠️ 可能的解决方案

#### 方案 1: 环境变量配置
在项目根目录创建 `.env.local` 文件：
```bash
# 数据库配置
DATABASE_URL="postgresql://username:password@localhost:5432/nanobanana"

# NextAuth 配置
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 方案 2: 数据库迁移
如果数据库结构不匹配，运行迁移脚本：
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
```

#### 方案 3: 重启开发服务器
```bash
# 停止当前服务器 (Ctrl+C)
# 然后重新启动
npm run dev
```

## 📋 测试步骤

### 1. 测试 HTML 修复
- 访问任何图像生成页面
- 检查控制台是否还有嵌套 button 错误
- 确认页面正常渲染

### 2. 测试 API 修复
- 访问 `/debug` 检查环境变量
- 访问 `/api/test-db` 测试数据库连接
- 尝试注册新用户

### 3. 测试邮箱验证流程
- 注册新用户
- 检查控制台中的验证邮件信息
- 复制验证链接并测试

## 🚨 如果问题仍然存在

### 检查数据库状态
```bash
# 如果使用 Drizzle
npm run db:studio

# 或者直接连接数据库
psql your_database_url
```

### 检查网络请求
在浏览器开发者工具的 Network 标签中查看：
- 请求 URL
- 请求头
- 响应状态码
- 响应内容

### 查看服务器日志
在运行 `npm run dev` 的终端中查看错误信息。

## 📞 需要帮助？

如果按照以上步骤仍然无法解决问题，请提供：

1. **环境变量检查结果** (`/debug` 端点)
2. **数据库连接测试结果** (`/api/test-db` 端点)
3. **完整的错误日志**（控制台 + 服务器终端）
4. **数据库连接字符串格式**（隐藏敏感信息）

---

**注意**: 这是一个开发环境的快速修复指南。在生产环境中，请确保：
- 使用强密码和安全的密钥
- 配置正确的数据库连接
- 启用 HTTPS
- 设置适当的错误处理 