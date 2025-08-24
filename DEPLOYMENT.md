# 🚀 NanoBanana AI 图像生成器部署指南

## 📋 部署前准备

### 1. 获取 BigModel API Key

1. 访问 [BigModel 开放平台](https://open.bigmodel.cn/)
2. 注册账户并完成认证
3. 在控制台获取 API Key

### 2. 准备代码仓库

确保你的代码已经推送到 GitHub 仓库。

## 🌐 Vercel 部署

### 方法一：通过 Vercel Dashboard

1. **导入项目**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 选择 "Import Git Repository"
   - 选择你的 GitHub 仓库

2. **配置项目**
   - Framework Preset: `Next.js`
   - Root Directory: `./` (默认)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **环境变量配置**
   - 在项目设置中找到 "Environment Variables"
   - 添加以下环境变量：
     ```
     BIGMODEL_API_KEY=your_actual_api_key_here
     ```

4. **部署**
   - 点击 "Deploy" 按钮
   - 等待部署完成

### 方法二：通过 Vercel CLI

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```

4. **配置环境变量**
   ```bash
   vercel env add BIGMODEL_API_KEY
   ```

## 🔧 环境变量配置

### 必需的环境变量

```env
# BigModel API Key
BIGMODEL_API_KEY=your_bigmodel_api_key_here
```

### 可选的环境变量

```env
# 自定义域名 (如果需要)
NEXT_PUBLIC_CUSTOM_DOMAIN=your-domain.com

# 环境标识
NODE_ENV=production
```

## 📱 自定义域名配置

1. 在 Vercel Dashboard 中进入项目设置
2. 找到 "Domains" 选项
3. 添加你的自定义域名
4. 按照提示配置 DNS 记录

## 🔍 部署后检查

### 1. 功能测试

- ✅ 页面正常加载
- ✅ 提示词输入正常
- ✅ 图像生成功能正常
- ✅ 下载功能正常
- ✅ 响应式设计正常

### 2. 性能检查

- ✅ 首屏加载时间 < 3秒
- ✅ 图像生成响应时间正常
- ✅ 移动端体验良好

### 3. 错误监控

- ✅ 检查 Vercel 日志
- ✅ 监控 API 调用状态
- ✅ 用户反馈收集

## 🚨 常见问题解决

### 1. 构建失败

**问题**: `npm run build` 失败
**解决**: 
- 检查 Node.js 版本 (推荐 18.x 或更高)
- 清理缓存: `rm -rf .next node_modules && npm install`
- 检查 TypeScript 错误

### 2. API 调用失败

**问题**: 图像生成失败
**解决**:
- 检查 `BIGMODEL_API_KEY` 是否正确设置
- 确认 API Key 有足够的配额
- 检查网络连接

### 3. 样式问题

**问题**: CSS 样式不正确
**解决**:
- 确认 Tailwind CSS 正确配置
- 检查 `globals.css` 文件
- 清理浏览器缓存

## 📊 性能优化建议

### 1. 图片优化

- 使用 Next.js Image 组件
- 配置适当的图片尺寸
- 启用图片压缩

### 2. 代码分割

- 使用动态导入
- 配置适当的 chunk 大小
- 启用 Tree Shaking

### 3. 缓存策略

- 配置适当的缓存头
- 使用 CDN 加速
- 启用静态生成

## 🔐 安全考虑

### 1. API Key 保护

- 永远不要在前端代码中暴露 API Key
- 使用环境变量存储敏感信息
- 定期轮换 API Key

### 2. 输入验证

- 验证用户输入
- 防止 XSS 攻击
- 限制 API 调用频率

### 3. HTTPS 强制

- 确保所有请求使用 HTTPS
- 配置安全头
- 启用 HSTS

## 📈 监控和维护

### 1. 性能监控

- 使用 Vercel Analytics
- 监控 Core Web Vitals
- 跟踪用户行为

### 2. 错误监控

- 配置错误日志
- 设置告警通知
- 定期检查系统状态

### 3. 更新维护

- 定期更新依赖
- 监控安全漏洞
- 备份重要数据

## 🎯 下一步计划

### 1. 功能扩展

- [ ] 添加更多 AI 模型支持
- [ ] 实现图像编辑功能
- [ ] 添加批量生成功能

### 2. 性能优化

- [ ] 实现图像缓存
- [ ] 优化加载性能
- [ ] 添加离线支持

### 3. 用户体验

- [ ] 添加用户反馈系统
- [ ] 实现 A/B 测试
- [ ] 优化移动端体验

---

## 📞 技术支持

如果在部署过程中遇到问题，请：

1. 检查 [Vercel 文档](https://vercel.com/docs)
2. 查看 [Next.js 文档](https://nextjs.org/docs)
3. 提交 GitHub Issue
4. 联系开发团队

**祝部署顺利！** 🎉 