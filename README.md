# AI Photo Editor

一个基于 BigModel Cogview-3 的简洁AI图像生成器，专注于核心功能。

## ✨ 核心功能

- 🎨 **Username to Image**: 根据用户名生成个性化头像
- 🖼️ **Text to Image**: 从文字描述生成图像  
- 🎭 **Image to Image**: 图像风格转换（付费功能）
- ⚡ **Seedream 4.0**: 专业级AI图像生成器页面
- 📝 **博客系统**: Seedream相关技术资讯和教程
- 🌍 **多语言支持**: 支持英文和日文界面，自动语言检测和手动切换
- 📱 **响应式设计**: 完美适配各种设备
- ⚡ **快速生成**: 5-10秒生成高质量图像
- 📧 **站长反馈**: 用户可直接通过邮件联系站长反馈意见和建议

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
- **数据分析**: Vercel Analytics + Speed Insights

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

### 站长反馈系统
- **导航栏反馈**: 用户可在导航栏找到"反馈"按钮，点击后直接打开邮件客户端
- **页脚反馈**: 在页脚联系信息区域提供"站长反馈"邮箱链接
- **多语言支持**: 反馈功能支持英文和日文界面
- **邮件地址**: candseven2015@gmail.com
- **邮件主题**: 自动设置为"Feedback for AI Photo Editor"

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
3. 添加环境变量
4. 部署完成

### 环境变量

生产环境需要设置:
- `BIGMODEL_API_KEY`: BigModel API 密钥
- `INDEXNOW_KEY`: IndexNow API密钥 (可选，默认已配置)

## 🔍 SEO和搜索引擎优化

### IndexNow快速索引
- **自动通知**: 内容更新时自动通知Bing等支持IndexNow的搜索引擎
- **API接口**: `/api/indexnow` - 提交单个或多个URL进行快速索引
- **支持引擎**: Bing、IndexNow API等

### Sitemap自动提交
- **多引擎支持**: Google、Bing、Yahoo、百度、Yandex
- **API接口**: `/api/submit-sitemap` - 一键提交sitemap到所有搜索引擎
- **状态监控**: 实时查看提交状态和结果

### SEO优化功能
- ✅ **多语言SEO**: 完整的hreflang标签支持
- ✅ **结构化数据**: JSON-LD格式的丰富片段
- ✅ **优化的Meta标签**: 每页面独立的SEO配置
- ✅ **安全头设置**: 完整的安全策略头
- ✅ **缓存优化**: 智能缓存策略提升性能
- ✅ **图像优化**: WebP/AVIF支持和响应式尺寸

### 使用方法

#### 1. 自动IndexNow提交
```javascript
import { submitToIndexNow } from '@/lib/indexnow'

// 提交单个URL
await submitToIndexNow('https://www.aiphotoeditor.space/new-page')

// 提交多个URL
await submitMultipleToIndexNow([
  'https://www.aiphotoeditor.space/page1',
  'https://www.aiphotoeditor.space/page2'
])
```

#### 2. 手动提交到搜索引擎
访问以下管理链接手动提交:
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [百度站长工具](https://ziyuan.baidu.com/)
- [Yandex Webmaster](https://webmaster.yandex.com/)

#### 3. API调用示例
```bash
# 提交到IndexNow
curl -X POST https://www.aiphotoeditor.space/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.aiphotoeditor.space/"}'

# 提交Sitemap到搜索引擎
curl -X POST https://www.aiphotoeditor.space/api/submit-sitemap
```

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
- **数据分析**: 集成Vercel Analytics，提供详细的网站访问数据

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

### Related Articles
- **独立开发前线**: [独立开发者必备，提升内容与SEO的AI图片编辑工具——aiphotoeditor.space 实战分享](https://91wink.com/%e7%8b%ac%e7%ab%8b%e5%bc%80%e5%8f%91%e8%80%85%e5%bf%85%e5%a4%87%ef%bc%8c%e6%8f%90%e5%8d%87%e5%86%85%e5%ae%b9%e4%b8%8eseo%e7%9a%84ai%e5%9b%be%e7%89%87%e7%bc%96%e8%be%91%e5%b7%a5%e5%85%b7/) - 详细介绍了AI Photo Editor在独立开发中的应用价值

## 🌍 多语言支持

### 支持的语言
- **英语 (English)**: 默认语言，路径 `/en`
- **日语 (日本語)**: 完整日语界面，路径 `/ja`

### 语言切换
- **自动检测**: 根据浏览器语言设置自动重定向
- **手动切换**: 导航栏右上角的语言切换器
- **URL路由**: 基于 `/[locale]` 动态路由实现

### 技术实现
- **文件结构**: 采用 Next.js App Router 的 `[locale]` 动态路由
- **翻译管理**: JSON文件存储翻译内容 (`locales/en/common.json`, `locales/ja/common.json`)
- **Hook系统**: 自定义 `useTranslation` hook 管理翻译状态
- **SEO优化**: 每种语言独立URL，利于搜索引擎优化

### 添加新语言
1. 在 `locales/` 文件夹中创建新的语言文件夹
2. 复制 `en/common.json` 并翻译内容
3. 更新 `lib/use-translation.ts` 中的 `translations` 对象
4. 在 `LanguageSwitcher.tsx` 中添加新语言选项

## 📝 更新日志

### v0.4.0 (最新) - SEO优化和IndexNow集成
- 🚀 **IndexNow API集成**: 实现快速通知搜索引擎内容更新
- 🔍 **搜索引擎优化**: 全面优化robots.txt，支持多种爬虫和crawl delay
- 📊 **高级Sitemap**: 优化sitemap配置，按页面重要性设置优先级和更新频率
- 🛡️ **安全头设置**: 添加完整的安全头和缓存策略
- 📈 **SEO管理面板**: 管理员可视化SEO工具，一键提交sitemap和IndexNow
- 🌐 **多引擎支持**: 支持Google、Bing、Yahoo、百度、Yandex等搜索引擎
- ⚡ **自动提交**: 支持自动提交sitemap到各大搜索引擎
- 📋 **结构化数据**: 完善的JSON-LD结构化数据支持
- 🎯 **页面级SEO**: 每个页面独立的SEO配置和meta标签
- 🔗 **Hreflang标签**: 完整的多语言SEO支持

### v0.3.1
- ✅ 添加站长反馈邮箱功能
- ✅ 在导航栏和页脚增加反馈链接
- ✅ 支持一键发送反馈邮件至 candseven2015@gmail.com
- ✅ 优化用户体验，方便用户意见收集

### v0.3.0
- ✅ 实现完整的多语言支持系统
- ✅ 添加英语和日语界面
- ✅ 基于 Next.js App Router 的国际化路由
- ✅ 自动语言检测和手动切换功能
- ✅ SEO友好的多语言URL结构

### v0.2.3
- ✅ 集成 Vercel Speed Insights，实时监控网站性能指标
- ✅ 添加页面加载速度和Core Web Vitals追踪
- ✅ 优化性能数据收集，提升用户体验分析能力

### v0.2.2
- ✅ 集成 Vercel Analytics，提供详细的用户行为数据分析
- ✅ 添加页面访问统计和用户交互追踪
- ✅ 优化数据分析能力，为产品优化提供数据支持

### v0.2.1
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