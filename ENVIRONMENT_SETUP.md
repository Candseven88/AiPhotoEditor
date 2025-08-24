# 🌍 环境变量配置指南

本文档详细说明如何配置 NanoBanana AI 图像生成器的环境变量。

## 📋 环境变量概览

| 变量名 | 描述 | 必需 | 示例值 |
|--------|------|------|--------|
| `BIGMODEL_API_KEY` | BigModel API 密钥（文生图） | ✅ | `sk-xxxxxxxxxxxxxxxxxxxxxxxx` |
| `STABILITY_API_KEY` | Stability AI API 密钥（图生图） | ✅ | `sk-xxxxxxxxxxxxxxxxxxxxxxxx` |

## 🔑 API 密钥配置

### BigModel API 密钥（文生图功能）

### 1. 获取 API 密钥

1. 访问 [BigModel 开放平台](https://open.bigmodel.cn/)
2. 注册账户并登录
3. 进入 "API 管理" 页面
4. 创建新的 API 密钥
5. 复制生成的密钥

### 2. 本地开发环境

#### 创建 `.env.local` 文件

在项目根目录创建 `.env.local` 文件：

```bash
# 在项目根目录执行
touch .env.local
```

#### 添加环境变量

在 `.env.local` 文件中添加：

```env
# BigModel API 配置
BIGMODEL_API_KEY=your_actual_api_key_here
```

**⚠️ 重要提醒：**
- 不要将真实的 API 密钥提交到 Git 仓库
- `.env.local` 文件已被 `.gitignore` 排除
- 使用占位符 `your_actual_api_key_here` 替换为真实的 API 密钥

### 3. 生产环境配置

#### Vercel 部署

1. 在 Vercel 项目设置中添加环境变量：
   - 变量名：`BIGMODEL_API_KEY`
   - 变量值：你的真实 BigModel API 密钥

2. 或者使用 Vercel CLI：
   ```bash
   vercel env add BIGMODEL_API_KEY
   ```

### Stability AI API 密钥（图生图功能）

#### 1. 获取 API 密钥

1. 访问 [Stability AI 平台](https://platform.stability.ai/)
2. 注册账户并登录
3. 在 API Keys 页面生成新的 API Key
4. 复制生成的密钥

#### 2. 本地开发环境

在 `.env.local` 文件中添加：

```env
# Stability AI API 配置
STABILITY_API_KEY=your_actual_stability_api_key_here
```

#### 3. 生产环境配置

在 Vercel 项目设置中添加环境变量：
- 变量名：`STABILITY_API_KEY`
- 变量值：你的真实 Stability AI API 密钥

或使用 Vercel CLI：
```bash
vercel env add STABILITY_API_KEY
```

#### 其他平台

根据部署平台的不同，在相应的环境变量配置页面中添加：
- **Netlify**: 在 "Site settings" → "Environment variables" 中添加
- **Railway**: 在项目设置页面的 "Variables" 标签中添加
- **Docker**: 在 `docker-compose.yml` 或 `Dockerfile` 中配置

## 🔧 环境变量验证

### 1. 本地验证

启动开发服务器后，检查控制台输出：

```bash
npm run dev
```

如果看到以下输出，说明环境变量配置正确：
```
✓ Starting...
✓ Ready in XXXXms
- Environments: .env.local
```

### 2. 功能测试

#### 文生图功能测试
- 访问首页，输入提示词生成图像
- 如果成功生成，说明 `BIGMODEL_API_KEY` 配置正确

#### 图生图功能测试
- 访问 `/image-to-image` 页面
- 上传图像并输入转换提示词
- 如果成功生成，说明 `STABILITY_API_KEY` 配置正确

### 3. API 测试

访问图生图页面，上传图像并输入提示词，如果 API 调用成功，说明配置正确。

## 🚨 常见问题

### 1. API 密钥未配置

**错误信息：**
```
Error: BIGMODEL_API_KEY is not configured
Error: STABILITY_API_KEY is not configured
```

**解决方案：**
- 检查 `.env.local` 文件是否存在
- 确认环境变量名称拼写正确
- 重启开发服务器

### 2. API 密钥无效

**错误信息：**
```
Error: Failed to generate image
Details: Unauthorized
```

**解决方案：**
- 检查 API 密钥是否正确复制
- 确认 API 密钥是否已激活
- 检查账户余额和权限

### 3. 内容审核错误

**错误信息：**
```
Error: Content flagged by moderation
```

**解决方案：**
- 尝试使用更安全的提示词
- 避免可能触发内容审核的内容
- 检查图像内容是否合规

### 4. 环境变量不生效

**问题：** 修改 `.env.local` 后，环境变量没有更新

**解决方案：**
- 重启开发服务器
- 检查文件编码（确保是 UTF-8）
- 确认文件没有隐藏字符

## 📁 文件结构

```
55-NanoBanana/
├── .env.local              # 本地环境变量（不提交到 Git）
├── .env.example            # 环境变量示例文件
├── .gitignore              # Git 忽略文件
└── ENVIRONMENT_SETUP.md    # 本文档
```

## 🔄 双平台架构

- **文生图功能**: 使用 BigModel 平台
- **图生图功能**: 使用 Stability AI 平台
- **统一界面**: 两个功能在同一个应用中无缝集成

## 🔒 安全最佳实践

### 1. 密钥管理
- 定期轮换 API 密钥
- 使用最小权限原则
- 监控 API 使用情况

### 2. 环境隔离
- 开发、测试、生产环境使用不同的 API 密钥
- 避免在代码中硬编码密钥
- 使用环境变量管理敏感信息

### 3. 访问控制
- 限制 API 密钥的使用范围
- 设置合理的速率限制
- 监控异常访问模式

## 📞 技术支持

如果在配置过程中遇到问题：

1. 检查本文档的常见问题部分
2. 查看 BigModel 官方文档
3. 联系项目维护者

## 🎯 下一步

环境变量配置完成后，你可以：

1. 启动开发服务器：`npm run dev`
2. 测试文生图功能：访问首页
3. 测试图生图功能：访问 `/image-to-image` 页面
4. 部署到生产环境

---

**注意：** 请妥善保管你的 API 密钥，不要分享给他人或在公开场合展示。 