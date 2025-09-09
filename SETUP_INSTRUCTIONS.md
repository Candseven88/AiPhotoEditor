# NanoBanana AI 项目设置说明

## 🚀 快速开始

### 1. 环境变量配置

复制环境变量示例文件并配置：

```bash
cp env.example .env.local
```

编辑 `.env.local` 文件，配置以下变量：

```env
# 数据库连接
DATABASE_URL="postgresql://username:password@localhost:5432/nanobanana"

# NextAuth 配置
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# BigModel API
BIGMODEL_API_KEY="your-bigmodel-api-key-here"
```

### 2. 生成安全的 NextAuth 密钥

```bash
openssl rand -base64 32
```

将生成的密钥复制到 `NEXTAUTH_SECRET` 环境变量中。

### 3. 数据库设置

#### 选项 1: 本地 PostgreSQL

1. 安装 PostgreSQL
2. 创建数据库：
   ```sql
   CREATE DATABASE nanobanana;
   ```
3. 运行迁移脚本：
   ```bash
   psql -d nanobanana -f src/db/migrations/001_initial_schema.sql
   ```

#### 选项 2: Supabase (推荐)

1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目
3. 在 SQL Editor 中运行迁移脚本
4. 复制连接字符串到 `DATABASE_URL`

#### 选项 3: PlanetScale

1. 访问 [planetscale.com](https://planetscale.com)
2. 创建新数据库
3. 运行迁移脚本
4. 复制连接字符串到 `DATABASE_URL`

### 4. 安装依赖

```bash
npm install
```

### 5. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 🔧 数据库管理

### 生成迁移文件

```bash
npm run db:generate
```

### 运行迁移

```bash
npm run db:migrate
```

### 查看数据库

```bash
npm run db:studio
```

### 推送数据库更改

```bash
npm run db:push
```

## 🧪 测试认证系统

1. 访问首页，点击 "Create Account" 按钮
2. 填写注册表单
3. 注册成功后，使用相同凭据登录
4. 检查导航栏是否显示用户信息

## 🚨 常见问题

### 1. 数据库连接错误

- 检查 `DATABASE_URL` 格式是否正确
- 确认数据库服务是否运行
- 验证用户名和密码

### 2. NextAuth 错误

- 确保 `NEXTAUTH_SECRET` 已设置
- 检查 `NEXTAUTH_URL` 是否与开发环境匹配
- 查看浏览器控制台错误信息

### 3. 类型错误

- 运行 `npm run build` 检查类型错误
- 确保所有依赖已正确安装
- 检查 TypeScript 配置

## 📱 功能特性

### 已实现功能

- ✅ 用户注册和登录
- ✅ 会话管理
- ✅ 响应式导航栏
- ✅ 用户认证状态显示
- ✅ 模态框认证界面
- ✅ 数据库架构设计

### 下一步计划

- 🔄 用户仪表板
- 🔄 订阅计划管理
- 🔄 Creem 支付集成
- 🔄 国际化支持

## 🎯 开发指南

### 项目结构

```
src/
├── auth/           # NextAuth 配置
├── components/     # React 组件
│   ├── auth/      # 认证相关组件
│   └── providers/ # 上下文提供者
├── db/            # 数据库配置和 Schema
└── types/         # TypeScript 类型定义

app/
├── api/           # API 路由
├── auth/          # 认证页面
└── components/    # 页面组件
```

### 添加新功能

1. 在 `src/db/schema.ts` 中定义数据表
2. 创建相应的 API 路由
3. 开发前端组件
4. 更新类型定义
5. 测试功能完整性

## 📞 技术支持

如有问题，请检查：

1. 环境变量配置
2. 数据库连接状态
3. 依赖包版本
4. 浏览器控制台错误

---

*最后更新: 2024年12月* 