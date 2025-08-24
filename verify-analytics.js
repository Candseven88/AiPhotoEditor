#!/usr/bin/env node

/**
 * 检测代码验证脚本
 * 用于验证 Google Analytics、Clarity、Vercel Analytics 和站点地图是否正常工作
 */

const https = require('https');
const http = require('http');
const fs = require('fs');

const BASE_URL = process.env.BASE_URL || 'https://nanobanana.ai';
const isLocal = BASE_URL.startsWith('http://');

// 颜色输出
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = isLocal ? http : https;
    const req = client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function checkSitemap() {
  log('\n🔍 检查站点地图...', 'blue');
  try {
    const response = await makeRequest(`${BASE_URL}/sitemap.xml`);
    if (response.status === 200) {
      log('✅ 站点地图可访问', 'green');
      if (response.data.includes('<?xml')) {
        log('✅ 站点地图格式正确 (XML)', 'green');
      } else {
        log('⚠️  站点地图格式可能不正确', 'yellow');
      }
    } else {
      log(`❌ 站点地图返回状态码: ${response.status}`, 'red');
    }
  } catch (error) {
    if (isLocal) {
      log('⚠️  本地开发环境：站点地图检查跳过（需要启动开发服务器）', 'yellow');
    } else {
      log(`❌ 站点地图检查失败: ${error.message}`, 'red');
    }
  }
}

async function checkRobots() {
  log('\n🤖 检查 Robots.txt...', 'blue');
  try {
    const response = await makeRequest(`${BASE_URL}/robots.txt`);
    if (response.status === 200) {
      log('✅ Robots.txt 可访问', 'green');
      if (response.data.includes('Sitemap:')) {
        log('✅ Robots.txt 包含站点地图链接', 'green');
      } else {
        log('⚠️  Robots.txt 可能缺少站点地图链接', 'yellow');
      }
    } else {
      log(`❌ Robots.txt 返回状态码: ${response.status}`, 'red');
    }
  } catch (error) {
    if (isLocal) {
      log('⚠️  本地开发环境：Robots.txt 检查跳过（需要启动开发服务器）', 'yellow');
    } else {
      log(`❌ Robots.txt 检查失败: ${error.message}`, 'red');
    }
  }
}

async function checkPageSource() {
  log('\n📄 检查页面源代码...', 'blue');
  try {
    const response = await makeRequest(BASE_URL);
    if (response.status === 200) {
      log('✅ 主页可访问', 'green');
      
      // 检查 Google Analytics
      if (response.data.includes('G-7J29Q5J6PN')) {
        log('✅ Google Analytics 代码已添加', 'green');
      } else {
        log('❌ Google Analytics 代码未找到', 'red');
      }
      
      // 检查 Clarity
      if (response.data.includes('szvlz82tjd')) {
        log('✅ Microsoft Clarity 代码已添加', 'green');
      } else {
        log('❌ Microsoft Clarity 代码未找到', 'red');
      }
      
      // 检查 Google Search Console
      if (response.data.includes('Uh1npyWxh6BGlOKaSh88UFliniROrG0pgsD7fQHkahw')) {
        log('✅ Google Search Console 验证码已添加', 'green');
      } else {
        log('❌ Google Search Console 验证码未找到', 'red');
      }
      
      // 检查 GTM 脚本
      if (response.data.includes('googletagmanager.com/gtag/js')) {
        log('✅ Google Tag Manager 脚本已加载', 'green');
      } else {
        log('❌ Google Tag Manager 脚本未找到', 'red');
      }

      // 检查 Vercel Analytics
      if (response.data.includes('@vercel/analytics') || response.data.includes('vercel-analytics')) {
        log('✅ Vercel Analytics 代码已添加', 'green');
      } else {
        log('⚠️  Vercel Analytics 代码检查中...', 'yellow');
        // Vercel Analytics 可能被编译到 bundle 中，所以这个检查可能不准确
      }
      
    } else {
      log(`❌ 主页返回状态码: ${response.status}`, 'red');
    }
  } catch (error) {
    if (isLocal) {
      log('⚠️  本地开发环境：页面源代码检查跳过（需要启动开发服务器）', 'yellow');
    } else {
      log(`❌ 页面源代码检查失败: ${error.message}`, 'red');
    }
  }
}

async function checkPerformance() {
  log('\n⚡ 检查性能指标...', 'blue');
  try {
    const startTime = Date.now();
    const response = await makeRequest(BASE_URL);
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    if (response.status === 200) {
      log(`✅ 响应时间: ${responseTime}ms`, 'green');
      if (responseTime < 1000) {
        log('✅ 响应时间优秀 (< 1秒)', 'green');
      } else if (responseTime < 3000) {
        log('✅ 响应时间良好 (< 3秒)', 'green');
      } else {
        log('⚠️  响应时间较慢 (> 3秒)', 'yellow');
      }
    }
  } catch (error) {
    if (isLocal) {
      log('⚠️  本地开发环境：性能检查跳过（需要启动开发服务器）', 'yellow');
    } else {
      log(`❌ 性能检查失败: ${error.message}`, 'red');
    }
  }
}

async function checkVercelAnalytics() {
  log('\n📊 检查 Vercel Analytics...', 'blue');
  try {
    // 检查 package.json 中是否包含 @vercel/analytics
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageJson.dependencies && packageJson.dependencies['@vercel/analytics']) {
      log('✅ @vercel/analytics 包已安装', 'green');
      log(`   版本: ${packageJson.dependencies['@vercel/analytics']}`, 'green');
    } else {
      log('❌ @vercel/analytics 包未安装', 'red');
    }
  } catch (error) {
    log(`❌ 检查 package.json 失败: ${error.message}`, 'red');
  }
}

async function main() {
  log(`${colors.bold}🚀 NanoBanana AI 检测代码验证脚本${colors.reset}`, 'blue');
  log(`📍 目标网站: ${BASE_URL}`, 'blue');
  
  if (isLocal) {
    log('🌐 检测到本地开发环境', 'yellow');
    log('💡 提示：要完整测试检测代码，请先运行 npm run dev', 'yellow');
  }
  
  await checkSitemap();
  await checkRobots();
  await checkPageSource();
  await checkPerformance();
  await checkVercelAnalytics();
  
  log('\n📋 验证完成！', 'blue');
  log('💡 提示：', 'yellow');
  if (isLocal) {
    log('   - 本地开发环境：部分检查需要启动开发服务器');
    log('   - 运行 npm run dev 后重新运行验证脚本');
  } else {
    log('   - 如果所有检查都通过，说明检测代码配置正确');
    log('   - 如果有错误，请检查部署环境和配置');
  }
  log('   - Vercel Analytics 会在部署后自动开始收集数据');
  log('   - 建议在 Google Search Console 中提交站点地图');
  log('   - 等待 24-48 小时让 Google 索引你的网站');
}

// 运行验证
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkSitemap, checkRobots, checkPageSource, checkPerformance, checkVercelAnalytics }; 