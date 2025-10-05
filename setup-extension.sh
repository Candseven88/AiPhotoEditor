#!/bin/bash

# Chrome扩展快速设置脚本
# 作者：AI Assistant
# 用途：快速设置Chrome扩展开发环境

echo "🚀 AI Photo Editor Chrome扩展设置脚本"
echo "========================================"

# 检查Chrome扩展目录是否存在
if [ ! -d "chrome-extension" ]; then
    echo "❌ 错误：chrome-extension 目录不存在"
    echo "   请确保你在正确的项目根目录下运行此脚本"
    exit 1
fi

echo "✅ 找到chrome-extension目录"

# 检查关键文件是否存在
required_files=(
    "chrome-extension/manifest.json"
    "chrome-extension/popup/popup.html"
    "chrome-extension/popup/popup.js"
    "chrome-extension/popup/popup.css"
    "chrome-extension/background/background.js"
    "chrome-extension/content/content.js"
    "chrome-extension/content/content.css"
    "chrome-extension/shared/api.js"
    "chrome-extension/shared/utils.js"
)

echo "🔍 检查必需文件..."
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file (缺失)"
        missing_files=true
    fi
done

if [ "$missing_files" = true ]; then
    echo "❌ 有文件缺失，请检查项目完整性"
    exit 1
fi

# 创建图标目录
echo "📁 创建图标目录..."
mkdir -p chrome-extension/assets/icons
echo "  ✅ chrome-extension/assets/icons/"

# 检查图标文件
echo "🎨 检查图标文件..."
icon_files=(
    "chrome-extension/assets/icons/icon16.png"
    "chrome-extension/assets/icons/icon48.png"
    "chrome-extension/assets/icons/icon128.png"
)

icons_missing=false
for icon in "${icon_files[@]}"; do
    if [ -f "$icon" ]; then
        echo "  ✅ $icon"
    else
        echo "  ⚠️  $icon (需要生成)"
        icons_missing=true
    fi
done

if [ "$icons_missing" = true ]; then
    echo ""
    echo "📝 图标生成说明："
    echo "   1. 用浏览器打开: chrome-extension/assets/icons/create-icons.html"
    echo "   2. 点击'下载所有图标'按钮"
    echo "   3. 将下载的文件重命名并放到 chrome-extension/assets/icons/ 目录"
    echo ""
fi

# 验证manifest.json格式
echo "🔧 验证manifest.json格式..."
if command -v python3 &> /dev/null; then
    if python3 -m json.tool chrome-extension/manifest.json > /dev/null 2>&1; then
        echo "  ✅ manifest.json格式正确"
    else
        echo "  ❌ manifest.json格式错误"
        exit 1
    fi
else
    echo "  ⚠️  无法验证JSON格式（缺少python3）"
fi

# 设置文件权限
echo "🔒 设置文件权限..."
chmod -R 644 chrome-extension/
chmod 755 chrome-extension/
chmod 755 chrome-extension/*/
echo "  ✅ 权限设置完成"

# 显示安装说明
echo ""
echo "🎉 设置完成！"
echo "================"
echo ""
echo "📋 下一步安装说明："
echo "1. 打开Chrome浏览器"
echo "2. 访问：chrome://extensions/"
echo "3. 开启右上角的'开发者模式'"
echo "4. 点击'加载已解压的扩展程序'"
echo "5. 选择 chrome-extension 文件夹"
echo "6. 扩展安装完成！"
echo ""

if [ "$icons_missing" = true ]; then
    echo "⚠️  注意：请先生成图标文件，然后再安装扩展"
    echo ""
fi

echo "📖 详细测试指南请查看：LOCAL_TESTING_GUIDE.md"
echo ""
echo "🚀 祝你测试顺利！" 