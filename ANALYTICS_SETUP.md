# 检测代码配置说明

## 已添加的检测代码

### 1. Google Analytics (G-7J29Q5J6PN)
- 已添加到 `app/layout.tsx`
- 跟踪代码：G-7J29Q5J6PN
- 自动跟踪页面浏览和用户行为

### 2. Microsoft Clarity
- 已添加到 `app/layout.tsx`
- 项目 ID：szvlz82tjd
- 提供用户行为分析和热力图

### 3. Google Search Console
- 已添加到 `app/layout.tsx` 的 metadata 中
- 验证码：Uh1npyWxh6BGlOKaSh88UFliniROrG0pgsD7fQHkahw

### 4. Vercel Analytics
- 已安装 `@vercel/analytics` 包
- 已添加到 `app/layout.tsx` 的 `<Analytics />` 组件
- 自动跟踪页面浏览、性能指标和用户行为
- 与 Vercel 部署平台深度集成

## 站点地图配置

### 1. 动态站点地图
- 文件：`app/sitemap.ts`
- 自动生成 `/sitemap.xml`
- 包含所有主要页面和案例展示页面

### 2. Robots.txt
- 文件：`app/robots.ts`
- 自动生成 `/robots.txt`
- 指向站点地图并设置爬虫规则

## 环境变量配置

创建 `.env.local` 文件并添加以下配置：

```bash
# 基础 URL 配置
NEXT_PUBLIC_BASE_URL=https://nanobanana.ai

# Google Analytics
NEXT_PUBLIC_GA_ID=G-7J29Q5J6PN

# Microsoft Clarity
NEXT_PUBLIC_CLARITY_ID=szvlz82tjd

# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=Uh1npyWxh6BGlOKaSh88UFliniROrG0pgsD7fQHkahw
```

## Google Search Console 提交步骤

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加你的网站属性
3. 验证网站所有权（使用提供的 meta 标签）
4. 提交站点地图：`https://nanobanana.ai/sitemap.xml`

## Vercel Analytics 配置

### 自动配置
- Vercel Analytics 会在部署到 Vercel 平台后自动开始工作
- 无需额外配置或 API 密钥
- 数据会自动收集并显示在 Vercel 仪表板中

### 查看数据
1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 点击 "Analytics" 标签
4. 查看页面浏览、性能指标等数据

## 验证检测代码是否正常工作

### Google Analytics
1. 打开网站
2. 打开浏览器开发者工具
3. 在 Console 中输入 `gtag` 应该返回函数
4. 在 Network 标签中应该看到对 `googletagmanager.com` 的请求

### Microsoft Clarity
1. 访问 [Microsoft Clarity](https://clarity.microsoft.com/)
2. 登录并查看项目 szvlz82tjd
3. 等待数据收集（可能需要几小时）

### Vercel Analytics
1. 部署到 Vercel 平台
2. 等待 24-48 小时让数据开始收集
3. 在 Vercel Dashboard 中查看 Analytics 数据
4. 确认页面浏览和性能指标正常记录

### 站点地图
1. 访问 `https://nanobanana.ai/sitemap.xml`
2. 应该看到 XML 格式的站点地图
3. 访问 `https://nanobanana.ai/robots.txt`
4. 应该看到 robots.txt 内容

## 注意事项

1. 确保在生产环境中设置正确的 `NEXT_PUBLIC_BASE_URL`
2. 检测代码只在生产环境中生效
3. 本地开发时不会发送真实数据
4. Vercel Analytics 需要部署到 Vercel 平台才能工作
5. 定期检查 Google Search Console 的索引状态
6. 监控 Google Analytics 和 Vercel Analytics 的数据收集情况

## 故障排除

### 如果 Google Analytics 不工作：
- 检查网络请求是否被阻止
- 确认 GTM 脚本是否加载
- 检查浏览器控制台是否有错误

### 如果 Vercel Analytics 不工作：
- 确认项目已部署到 Vercel 平台
- 等待 24-48 小时让数据开始收集
- 检查 Vercel Dashboard 中的项目设置

### 如果站点地图无法访问：
- 确认 Next.js 配置正确
- 检查部署环境是否正确
- 验证文件路径和权限

### 如果 Clarity 不工作：
- 检查脚本是否正确加载
- 确认项目 ID 是否正确
- 等待数据收集时间

## 性能优化建议

### Vercel Analytics 优势
- 零配置，自动收集数据
- 与 Vercel 平台深度集成
- 提供详细的性能指标
- 支持实时数据查看

### 多平台数据对比
- 使用 Google Analytics 进行详细的用户行为分析
- 使用 Vercel Analytics 进行性能监控和部署分析
- 使用 Microsoft Clarity 进行用户会话录制和热力图分析
- 综合多平台数据优化用户体验 