# 🚀 部署检查清单 - 检测代码

## 部署前检查

### 1. 环境变量配置
- [ ] 创建 `.env.local` 文件
- [ ] 设置 `NEXT_PUBLIC_BASE_URL=https://nanobanana.ai`
- [ ] 确认 Google Analytics ID: `G-7J29Q5J6PN`
- [ ] 确认 Clarity ID: `szvlz82tjd`
- [ ] 确认 Google Search Console 验证码: `Uh1npyWxh6BGlOKaSh88UFliniROrG0pgsD7fQHkahw`

### 2. 代码检查
- [ ] `app/layout.tsx` 包含所有检测代码
- [ ] `app/layout.tsx` 包含 `<Analytics />` 组件
- [ ] `app/sitemap.ts` 正确配置
- [ ] `app/robots.ts` 正确配置
- [ ] 所有脚本标签使用 `dangerouslySetInnerHTML`
- [ ] `@vercel/analytics` 包已安装

### 3. 构建测试
- [ ] 运行 `npm run build` 成功
- [ ] 运行 `npm run start` 本地测试
- [ ] 检查控制台是否有错误
- [ ] 确认 TypeScript 编译无错误

## 部署后验证

### 1. 基础功能检查
- [ ] 网站正常访问
- [ ] 所有页面加载正常
- [ ] 没有 JavaScript 错误

### 2. 检测代码验证
- [ ] 运行 `npm run verify` 验证脚本
- [ ] Google Analytics 代码已加载
- [ ] Microsoft Clarity 代码已加载
- [ ] Google Search Console 验证码已添加
- [ ] Vercel Analytics 组件已正确渲染

### 3. SEO 工具检查
- [ ] 访问 `/sitemap.xml` 返回正确内容
- [ ] 访问 `/robots.txt` 返回正确内容
- [ ] 站点地图包含所有重要页面
- [ ] Robots.txt 指向正确的站点地图

## Vercel Analytics 设置

### 1. 部署到 Vercel
- [ ] 项目已连接到 Vercel 平台
- [ ] 自动部署已启用
- [ ] 环境变量在 Vercel 中正确设置

### 2. 验证 Analytics 工作
- [ ] 部署完成后等待 24-48 小时
- [ ] 访问 [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] 选择项目并查看 Analytics 标签
- [ ] 确认数据开始收集

### 3. 性能监控
- [ ] 查看页面浏览数据
- [ ] 监控性能指标
- [ ] 检查用户行为数据
- [ ] 分析页面加载速度

## Google Search Console 设置

### 1. 添加网站属性
- [ ] 访问 [Google Search Console](https://search.google.com/search-console)
- [ ] 添加新属性: `https://nanobanana.ai`
- [ ] 选择 "HTML 标签" 验证方法

### 2. 验证网站所有权
- [ ] 复制提供的 meta 标签
- [ ] 确认标签已添加到 `<head>` 部分
- [ ] 点击 "验证" 按钮
- [ ] 等待验证成功

### 3. 提交站点地图
- [ ] 在左侧菜单选择 "站点地图"
- [ ] 添加新的站点地图: `/sitemap.xml`
- [ ] 提交站点地图
- [ ] 等待 Google 处理

## 性能监控

### 1. Google Analytics
- [ ] 实时报告显示访问者
- [ ] 页面浏览数据正常收集
- [ ] 用户行为数据开始积累

### 2. Microsoft Clarity
- [ ] 登录 [Microsoft Clarity](https://clarity.microsoft.com/)
- [ ] 查看项目 `szvlz82tjd`
- [ ] 确认数据开始收集
- [ ] 检查热力图和用户会话

### 3. Vercel Analytics
- [ ] 登录 [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] 查看项目 Analytics 数据
- [ ] 确认性能指标正常记录
- [ ] 监控页面加载速度

### 4. 搜索引擎索引
- [ ] 使用 `site:nanobanana.ai` 搜索
- [ ] 检查 Google 是否已索引页面
- [ ] 监控 Search Console 的索引状态
- [ ] 等待 24-48 小时让 Google 完全索引

## 故障排除

### 常见问题
1. **检测代码不工作**
   - 检查网络请求是否被阻止
   - 确认脚本正确加载
   - 检查浏览器控制台错误

2. **Vercel Analytics 不工作**
   - 确认项目已部署到 Vercel 平台
   - 检查 `<Analytics />` 组件是否正确添加
   - 等待 24-48 小时让数据开始收集
   - 检查 Vercel Dashboard 中的项目设置

3. **站点地图无法访问**
   - 确认 Next.js 配置正确
   - 检查部署环境是否正确
   - 验证文件路径

4. **Google 不索引页面**
   - 确认 robots.txt 配置正确
   - 检查站点地图是否提交
   - 等待足够时间让 Google 处理

### 联系支持
- 如果问题持续存在，检查部署日志
- 确认所有环境变量设置正确
- 验证域名 DNS 配置
- 检查 Vercel 项目设置

## 维护建议

### 定期检查
- [ ] 每周检查 Google Analytics 数据
- [ ] 每周检查 Vercel Analytics 数据
- [ ] 每月检查 Search Console 索引状态
- [ ] 定期更新站点地图内容
- [ ] 监控网站性能指标

### 优化建议
- 根据 Analytics 数据优化用户体验
- 使用 Clarity 数据改进页面设计
- 根据 Vercel Analytics 优化性能
- 根据 Search Console 数据优化 SEO
- 定期更新和优化检测代码配置

### 多平台数据整合
- 对比 Google Analytics 和 Vercel Analytics 数据
- 使用 Clarity 深入分析用户行为
- 结合 Search Console 数据优化 SEO 策略
- 建立综合的数据分析报告 