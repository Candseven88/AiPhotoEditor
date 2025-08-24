#!/bin/bash

echo "🚀 启动 NanoBanana AI 图像生成器..."

# 检查 Node.js 版本
echo "📋 检查 Node.js 版本..."
node --version

# 安装依赖
echo "📦 安装依赖..."
npm install

# 创建环境变量文件
if [ ! -f .env.local ]; then
    echo "🔑 创建环境变量文件..."
    echo "# BigModel API Key" > .env.local
    echo "# Get your API key from: https://open.bigmodel.cn/" >> .env.local
    echo "BIGMODEL_API_KEY=your_bigmodel_api_key_here" >> .env.local
    echo "⚠️  请编辑 .env.local 文件，添加你的 BigModel API Key"
fi

# 启动开发服务器
echo "🌐 启动开发服务器..."
echo "📍 访问地址: http://localhost:3000"
echo "🛑 按 Ctrl+C 停止服务器"
npm run dev 