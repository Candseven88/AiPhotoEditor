# NanoBanana AI Image Generator

一个基于 BigModel Cogview-3 的炫酷 AI 图像生成器，具有丰富的动效、交互和多语言支持。

## ✨ 特性

- 🎨 **AI 图像生成**: 使用 BigModel Cogview-3-Flash 模型
- 🌍 **多语言支持**: 支持英文和中文界面
- 🎭 **丰富动效**: 使用 Framer Motion 实现流畅动画
- 🎨 **橙黄色主题**: 温暖的视觉设计
- 📱 **响应式设计**: 完美适配各种设备
- ⚡ **快速生成**: 5-10秒生成高质量图像
- 💾 **一键下载**: 支持图像下载和分享

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

### 3. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 🏗️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **国际化**: next-intl 4.x
- **图标**: Lucide React

## 📁 项目结构

```
app/
├── [locale]/           # 国际化路由
│   ├── layout.tsx     # 国际化布局
│   └── page.tsx       # 主页面
├── api/
│   └── generate/      # BigModel API 路由
├── components/         # React 组件
│   ├── ImageGenerator.tsx
│   └── LanguageSwitcher.tsx
├── globals.css        # 全局样式
└── layout.tsx         # 根布局
```

## 🌍 多语言支持

- **英文** (默认): `/en`
- **中文**: `/zh`

## 🎨 设计特色

- **橙黄色主题**: 温暖、活力的视觉体验
- **玻璃拟态效果**: 现代化的 UI 设计
- **流畅动画**: 丰富的交互动效
- **响应式布局**: 完美适配各种屏幕尺寸

## 🚀 部署

### Vercel 部署

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 添加环境变量 `BIGMODEL_API_KEY`
4. 部署完成

### 环境变量

确保在生产环境中设置以下环境变量:

- `BIGMODEL_API_KEY`: BigModel API 密钥

## 📝 使用说明

1. 在提示词输入框中描述你想要生成的图像
2. 选择图像尺寸
3. 点击"生成图像"按钮
4. 等待 5-10 秒生成完成
5. 下载或分享生成的图像

## 🔧 开发

### 添加新语言

1. 在 `messages/` 目录下创建新的语言文件
2. 在 `i18n.ts` 中添加语言代码
3. 更新 `LanguageSwitcher` 组件

### 自定义样式

- 主题色彩在 `tailwind.config.js` 中配置
- 全局样式在 `app/globals.css` 中定义
- 组件样式使用 Tailwind CSS 类名

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如有问题，请提交 Issue 或联系开发团队。 