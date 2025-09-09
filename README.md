# NanoBanana AI Image Generator

一个基于 BigModel Cogview-3 的简洁AI图像生成器，专注于核心功能。

## ✨ 核心功能

- 🎨 **Username to Image**: 根据用户名生成个性化头像
- 🖼️ **Text to Image**: 从文字描述生成图像  
- 🎭 **Image to Image**: 图像风格转换（付费功能）
- 🌍 **多语言支持**: 支持英文和中文界面
- 📱 **响应式设计**: 完美适配各种设备
- ⚡ **快速生成**: 5-10秒生成高质量图像

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 环境配置

创建 `.env.local` 文件并添加你的 BigModel API Key:

```env
BIGMODEL_API_KEY=your_bigmodel_api_key_here
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 🏗️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **AI模型**: BigModel Cogview-3-Flash

## 📁 项目结构

```
app/
├── components/           # React 组件
│   ├── ImageGenerator.tsx           # 文本转图像
│   ├── UsernameToImageGenerator.tsx # 用户名转头像
│   ├── ImageToImageGenerator.tsx    # 图像转图像
│   ├── Navigation.tsx               # 导航栏
│   └── ui/                         # UI组件
├── api/
│   ├── generate/                   # 图像生成API
│   ├── generate-image-to-image/    # 图像转图像API
│   └── paypal/                     # 支付API
├── globals.css                     # 全局样式
└── page.tsx                        # 主页面
```

## 🎯 功能说明

### Username to Image
- 输入用户名/昵称
- AI根据名字含义生成个性化头像
- 支持风格提示和文字包含选项

### Text to Image  
- 输入文字描述
- 生成对应的图像
- 支持多种尺寸选择

### Image to Image
- 上传原始图片
- 输入变换提示
- 通过PayPal支付$0.80解锁高清结果

## 🚀 部署

### Vercel 部署

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目  
3. 添加环境变量 `BIGMODEL_API_KEY`
4. 部署完成

### 环境变量

生产环境需要设置:
- `BIGMODEL_API_KEY`: BigModel API 密钥

## 🔧 开发

### 构建项目
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 📊 项目特点

- **简洁专注**: 移除了复杂的用户认证系统，专注于AI图像生成
- **快速启动**: 简化的依赖结构，快速安装和启动
- **现代技术**: 使用最新的Next.js 15和React 18
- **响应式**: 完美支持桌面和移动设备
- **付费功能**: 集成PayPal支付系统

## 🎨 设计特色

- **橙黄色主题**: 温暖、活力的视觉体验
- **玻璃拟态效果**: 现代化的UI设计  
- **流畅动画**: 丰富的交互动效
- **Toast通知**: 友好的错误和成功提示

## 📝 更新日志

### v0.1.0 (最新)
- ✅ 删除所有用户认证相关功能
- ✅ 简化项目结构和依赖
- ✅ 修复启动问题
- ✅ 专注于核心AI图像生成功能
- ✅ 改进错误提示系统

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**NanoBanana AI - 让创意更简单** 🍌✨ 