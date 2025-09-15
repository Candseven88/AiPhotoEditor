# AI Photo Editor

一个基于 BigModel Cogview-3 的简洁AI图像生成器，专注于核心功能。

## ✨ 核心功能

- 🎨 **Username to Image**: 根据用户名生成个性化头像
- 🖼️ **Text to Image**: 从文字描述生成图像  
- 🎭 **Image to Image**: 图像风格转换（付费功能）
- ⚡ **Seedream 4.0**: 专业级AI图像生成器页面
- 📝 **博客系统**: Seedream相关技术资讯和教程
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
├── seedream/                       # Seedream 4.0 专业页面
│   └── page.tsx                    # Seedream生成器
├── blog/                           # 博客系统
│   ├── page.tsx                    # 博客首页
│   └── [slug]/                     # 文章详情页
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

### Seedream 4.0 专业页面
- 专业级AI图像生成界面
- 宣传使用Seedream 4.0模型（实际使用BigModel API）
- 更丰富的功能和更专业的用户体验
- 支持4K高分辨率图像生成
- 多种尺寸和风格选项

### 博客系统
- **技术资讯**: Seedream相关的最新技术动态
- **使用教程**: 详细的功能使用指南
- **模型对比**: AI图像生成模型的对比分析
- **集成指南**: ComfyUI等第三方工具集成教程
- **多语言分析**: 中英双语AI模型技术解析

#### 博客文章列表
1. **Seedream 4.0发布**: 革命性AI图像生成模型介绍
2. **功能探索**: 深入了解Seedream的高级功能
3. **模型对比**: Seedream vs 其他主流AI模型
4. **ComfyUI集成**: Seedream在ComfyUI中的应用
5. **双语支持**: Seedream 2.0的中英双语能力

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
- **内容营销**: 丰富的博客内容提升SEO和用户参与度
- **品牌策略**: 通过Seedream品牌提升产品专业度

## 🎨 设计特色

- **橙黄色主题**: 温暖、活力的视觉体验
- **玻璃拟态效果**: 现代化的UI设计  
- **流畅动画**: 丰富的交互动效
- **Toast通知**: 友好的错误和成功提示
- **统一风格**: 所有页面保持一致的设计语言

## 🔗 页面导航

### 主要页面
- **首页** (`/`): 主要功能展示和使用入口
- **Seedream 4.0** (`/seedream`): 专业AI图像生成器
- **博客首页** (`/blog`): 技术文章和资讯列表
- **文章详情** (`/blog/[slug]`): 具体文章内容

### 功能模块
- **Username to Image**: 主页标签页功能
- **Text to Image**: 主页标签页功能  
- **Image to Image**: 主页标签页功能（付费）

## 🔗 合作伙伴与认证

### Do-follow Backlinks
- **Good AI Tools**: 已获得 [Good AI Tools](https://goodaitools.com) 平台认证，badge 已集成在网站 Footer 中

## 📝 更新日志

### v0.2.1 (最新)
- ✅ 添加 Good AI Tools 认证 badge
- ✅ 集成 do-follow backlink 提升 SEO
- ✅ 优化 Footer 显示效果

### v0.2.0
- ✅ 新增Seedream 4.0专业生成页面
- ✅ 集成完整博客系统
- ✅ 更新导航栏支持多页面
- ✅ 添加5篇专业技术博客文章
- ✅ 优化用户体验和页面设计
- ✅ 保持整体风格一致性

### v0.1.0
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

**AI Photo Editor - 让创意更简单** ✨📸

**Seedream 4.0 - 专业AI图像生成的未来** ⚡🎨 