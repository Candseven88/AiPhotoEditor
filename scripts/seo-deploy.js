#!/usr/bin/env node

/**
 * SEO部署脚本 - 自动提交网站到搜索引擎和目录
 * 运行: node scripts/seo-deploy.js
 */

const https = require('https')
const fs = require('fs')

const BASE_URL = 'https://www.aiphotoeditor.space'
const INDEXNOW_KEY = 'f47ac10b58cc4372a5670e02b2c3d479'

// 主要页面URL
const MAIN_URLS = [
  `${BASE_URL}`,
  `${BASE_URL}/aiphotoeditor`,
  `${BASE_URL}/vheer`,
  `${BASE_URL}/seedream`,
]

// 搜索引擎提交端点
const SEARCH_ENGINES = {
  google: {
    name: 'Google',
    ping_url: `https://www.google.com/ping?sitemap=${BASE_URL}/sitemap.xml`,
    method: 'GET'
  },
  bing: {
    name: 'Bing',
    ping_url: `https://www.bing.com/ping?sitemap=${BASE_URL}/sitemap.xml`,
    method: 'GET'
  },
  yandex: {
    name: 'Yandex',
    ping_url: `https://webmaster.yandex.com/ping?sitemap=${BASE_URL}/sitemap.xml`,
    method: 'GET'
  }
}

// IndexNow端点
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow'
]

function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'User-Agent': 'AI Photo Editor SEO Bot/1.0',
        'Content-Type': 'application/json'
      }
    }

    if (data && method === 'POST') {
      const postData = JSON.stringify(data)
      options.headers['Content-Length'] = Buffer.byteLength(postData)
    }

    const req = https.request(options, (res) => {
      let responseData = ''
      res.on('data', (chunk) => {
        responseData += chunk
      })
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: responseData,
          success: res.statusCode >= 200 && res.statusCode < 300
        })
      })
    })

    req.on('error', (err) => {
      reject(err)
    })

    if (data && method === 'POST') {
      req.write(JSON.stringify(data))
    }

    req.end()
  })
}

async function submitSitemap() {
  console.log('🚀 开始提交站点地图到搜索引擎...\n')
  
  for (const [key, engine] of Object.entries(SEARCH_ENGINES)) {
    try {
      console.log(`📤 提交到 ${engine.name}...`)
      const result = await makeRequest(engine.ping_url, engine.method)
      
      if (result.success) {
        console.log(`✅ ${engine.name}: 提交成功 (${result.status})`)
      } else {
        console.log(`⚠️  ${engine.name}: 提交失败 (${result.status})`)
      }
    } catch (error) {
      console.log(`❌ ${engine.name}: 提交出错 - ${error.message}`)
    }
  }
}

async function submitIndexNow() {
  console.log('\n🔄 开始IndexNow即时索引提交...\n')
  
  const indexNowData = {
    host: 'www.aiphotoeditor.space',
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/indexnow-key.txt`,
    urlList: MAIN_URLS
  }

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      console.log(`📤 提交到 ${endpoint}...`)
      const result = await makeRequest(endpoint, 'POST', indexNowData)
      
      if (result.success) {
        console.log(`✅ IndexNow (${endpoint}): 提交成功 (${result.status})`)
      } else {
        console.log(`⚠️  IndexNow (${endpoint}): 提交失败 (${result.status})`)
      }
    } catch (error) {
      console.log(`❌ IndexNow (${endpoint}): 提交出错 - ${error.message}`)
    }
  }
}

async function submitToDirectories() {
  console.log('\n📋 网站目录提交信息...\n')
  
  const directories = [
    {
      name: 'BroUseAI',
      url: 'https://www.brouseai.com/submit',
      description: 'AI工具目录，需要手动提交'
    },
    {
      name: 'AI Tools Directory',
      url: 'https://aitoolsdirectory.com/submit',
      description: 'AI工具目录，需要手动提交'
    },
    {
      name: 'Future Tools',
      url: 'https://www.futuretools.io/submit-a-tool',
      description: 'AI工具目录，需要手动提交'
    },
    {
      name: 'There\'s An AI For That',
      url: 'https://theresanaiforthat.com/submit/',
      description: 'AI工具目录，需要手动提交'
    }
  ]

  directories.forEach(dir => {
    console.log(`📝 ${dir.name}: ${dir.url}`)
    console.log(`   ${dir.description}\n`)
  })
}

async function generateSEOReport() {
  console.log('\n📊 生成SEO报告...\n')
  
  const report = {
    timestamp: new Date().toISOString(),
    website: BASE_URL,
    pages_submitted: MAIN_URLS,
    files_created: [
      'sitemap.xml',
      'robots.txt',
      'llms.txt',
      'manifest.json',
      'indexnow-key.txt',
      'ads.txt',
      'security.txt'
    ],
    search_engines: Object.keys(SEARCH_ENGINES),
    indexnow_endpoints: INDEXNOW_ENDPOINTS.length,
    next_steps: [
      '手动提交到Google Search Console',
      '手动提交到Bing Webmaster Tools',
      '提交到AI工具目录网站',
      '设置定期IndexNow提交',
      '监控搜索引擎收录情况'
    ]
  }

  // 保存报告
  fs.writeFileSync('./seo-report.json', JSON.stringify(report, null, 2))
  
  console.log('✅ SEO报告已生成: ./seo-report.json')
  console.log('\n📈 SEO优化总结:')
  console.log(`   • 网站: ${report.website}`)
  console.log(`   • 页面数: ${report.pages_submitted.length}`)
  console.log(`   • SEO文件: ${report.files_created.length}`)
  console.log(`   • 搜索引擎: ${report.search_engines.length}`)
  console.log(`   • IndexNow端点: ${report.indexnow_endpoints}`)
}

async function main() {
  console.log('🎯 AI Photo Editor SEO部署脚本')
  console.log('=====================================\n')
  
  try {
    // 1. 提交站点地图
    await submitSitemap()
    
    // 2. IndexNow即时索引
    await submitIndexNow()
    
    // 3. 显示目录提交信息
    await submitToDirectories()
    
    // 4. 生成SEO报告
    await generateSEOReport()
    
    console.log('\n🎉 SEO部署完成!')
    console.log('\n💡 下一步建议:')
    console.log('   1. 访问 Google Search Console 验证网站所有权')
    console.log('   2. 访问 Bing Webmaster Tools 验证网站所有权')
    console.log('   3. 手动提交到AI工具目录网站')
    console.log('   4. 设置定期运行此脚本 (建议每周一次)')
    console.log(`   5. 监控 ${BASE_URL}/api/indexnow 的运行状态`)
    
  } catch (error) {
    console.error('❌ SEO部署过程中出现错误:', error.message)
    process.exit(1)
  }
}

// 运行脚本
if (require.main === module) {
  main()
}

module.exports = {
  submitSitemap,
  submitIndexNow,
  generateSEOReport
}