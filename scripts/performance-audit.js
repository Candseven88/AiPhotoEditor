#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const stat = promisify(fs.stat)
const readFile = promisify(fs.readFile)
const readdir = promisify(fs.readdir)

// 性能审核脚本
class PerformanceAuditor {
  constructor() {
    this.issues = []
    this.suggestions = []
    this.projectRoot = path.resolve(__dirname, '..')
  }

  // 添加问题
  addIssue(category, severity, message, file = null) {
    this.issues.push({
      category,
      severity, // 'high', 'medium', 'low'
      message,
      file
    })
  }

  // 添加建议
  addSuggestion(message) {
    this.suggestions.push(message)
  }

  // 检查图片大小
  async checkImageSizes() {
    console.log('🖼️  检查图片优化...')
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']
    const publicDir = path.join(this.projectRoot, 'public')
    
    try {
      const checkDirectory = async (dir) => {
        const items = await readdir(dir)
        
        for (const item of items) {
          const fullPath = path.join(dir, item)
          const stats = await stat(fullPath)
          
          if (stats.isDirectory()) {
            await checkDirectory(fullPath)
          } else if (stats.isFile()) {
            const ext = path.extname(item).toLowerCase()
            if (imageExtensions.includes(ext)) {
              const sizeInMB = stats.size / (1024 * 1024)
              
              if (sizeInMB > 1) {
                this.addIssue(
                  'Images',
                  'high',
                  `大图片文件: ${item} (${sizeInMB.toFixed(2)}MB)`,
                  fullPath
                )
              } else if (sizeInMB > 0.5) {
                this.addIssue(
                  'Images',
                  'medium',
                  `中等大小图片: ${item} (${sizeInMB.toFixed(2)}MB)`,
                  fullPath
                )
              }
              
              // 检查是否缺少WebP版本
              if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
                const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp')
                if (!fs.existsSync(webpPath)) {
                  this.addSuggestion(`为 ${item} 生成WebP版本以提升性能`)
                }
              }
            }
          }
        }
      }
      
      if (fs.existsSync(publicDir)) {
        await checkDirectory(publicDir)
      }
    } catch (error) {
      console.error('检查图片时出错:', error)
    }
  }

  // 检查组件复杂度
  async checkComponentComplexity() {
    console.log('⚛️  检查组件复杂度...')
    
    const componentsDir = path.join(this.projectRoot, 'app', 'components')
    const pagesDir = path.join(this.projectRoot, 'app')
    
    const checkFile = async (filePath) => {
      try {
        const content = await readFile(filePath, 'utf-8')
        const lines = content.split('\n').length
        const fileName = path.basename(filePath)
        
        if (lines > 500) {
          this.addIssue(
            'Component',
            'high',
            `组件过于复杂: ${fileName} (${lines} 行)`,
            filePath
          )
          this.addSuggestion(`考虑拆分 ${fileName} 为更小的组件`)
        } else if (lines > 300) {
          this.addIssue(
            'Component',
            'medium',
            `组件较为复杂: ${fileName} (${lines} 行)`,
            filePath
          )
        }
        
        // 检查是否有过多的useEffect
        const useEffectCount = (content.match(/useEffect/g) || []).length
        if (useEffectCount > 5) {
          this.addIssue(
            'Component',
            'medium',
            `${fileName} 包含过多useEffect (${useEffectCount}个)`,
            filePath
          )
        }
        
        // 检查是否有复杂的动画
        const motionDivCount = (content.match(/motion\./g) || []).length
        if (motionDivCount > 10) {
          this.addIssue(
            'Performance',
            'high',
            `${fileName} 包含过多动画元素 (${motionDivCount}个)`,
            filePath
          )
          this.addSuggestion(`考虑简化 ${fileName} 中的动画效果`)
        }
      } catch (error) {
        console.error(`读取文件 ${filePath} 时出错:`, error)
      }
    }
    
    // 检查组件目录
    const checkDirectory = async (dir) => {
      try {
        const items = await readdir(dir)
        
        for (const item of items) {
          const fullPath = path.join(dir, item)
          const stats = await stat(fullPath)
          
          if (stats.isDirectory()) {
            await checkDirectory(fullPath)
          } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
            await checkFile(fullPath)
          }
        }
      } catch (error) {
        // 目录不存在时忽略
      }
    }
    
    await checkDirectory(componentsDir)
    await checkDirectory(pagesDir)
  }

  // 检查依赖项
  async checkDependencies() {
    console.log('📦 检查依赖项...')
    
    try {
      const packageJsonPath = path.join(this.projectRoot, 'package.json')
      const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'))
      
      const dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      }
      
      // 检查大型依赖
      const largeDependencies = [
        'lodash', 'moment', 'rxjs', '@material-ui/core'
      ]
      
      largeDependencies.forEach(dep => {
        if (dependencies[dep]) {
          this.addSuggestion(`考虑使用更轻量的替代方案替换 ${dep}`)
        }
      })
      
      // 检查是否使用了Tree Shaking友好的导入
      const componentsDir = path.join(this.projectRoot, 'app')
      const checkImports = async (dir) => {
        try {
          const items = await readdir(dir)
          
          for (const item of items) {
            const fullPath = path.join(dir, item)
            const stats = await stat(fullPath)
            
            if (stats.isDirectory()) {
              await checkImports(fullPath)
            } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
              const content = await readFile(fullPath, 'utf-8')
              
              // 检查lucide-react的导入方式
              if (content.includes("from 'lucide-react'") && 
                  !content.includes("import {")) {
                this.addSuggestion(`在 ${item} 中使用具名导入替代默认导入`)
              }
            }
          }
        } catch (error) {
          // 忽略错误
        }
      }
      
      await checkImports(componentsDir)
    } catch (error) {
      console.error('检查依赖项时出错:', error)
    }
  }

  // 检查Bundle大小
  async checkBundleSize() {
    console.log('📊 检查Bundle配置...')
    
    try {
      const nextConfigPath = path.join(this.projectRoot, 'next.config.js')
      if (fs.existsSync(nextConfigPath)) {
        const content = await readFile(nextConfigPath, 'utf-8')
        
        // 检查是否启用了压缩
        if (!content.includes('swcMinify') && !content.includes('minify')) {
          this.addSuggestion('在next.config.js中启用SWC压缩')
        }
        
        // 检查是否配置了代码分割
        if (!content.includes('splitChunks')) {
          this.addSuggestion('配置webpack代码分割以优化Bundle大小')
        }
      } else {
        this.addSuggestion('创建next.config.js以优化构建配置')
      }
    } catch (error) {
      console.error('检查Bundle配置时出错:', error)
    }
  }

  // 生成报告
  generateReport() {
    console.log('\n📋 性能审核报告\n')
    console.log('=' * 50)
    
    // 按严重程度分组问题
    const groupedIssues = {
      high: this.issues.filter(i => i.severity === 'high'),
      medium: this.issues.filter(i => i.severity === 'medium'),
      low: this.issues.filter(i => i.severity === 'low')
    }
    
    // 显示高优先级问题
    if (groupedIssues.high.length > 0) {
      console.log('\n🔴 高优先级问题:')
      groupedIssues.high.forEach(issue => {
        console.log(`  • ${issue.message}`)
        if (issue.file) {
          console.log(`    文件: ${path.relative(this.projectRoot, issue.file)}`)
        }
      })
    }
    
    // 显示中优先级问题
    if (groupedIssues.medium.length > 0) {
      console.log('\n🟡 中优先级问题:')
      groupedIssues.medium.forEach(issue => {
        console.log(`  • ${issue.message}`)
      })
    }
    
    // 显示低优先级问题
    if (groupedIssues.low.length > 0) {
      console.log('\n🟢 低优先级问题:')
      groupedIssues.low.forEach(issue => {
        console.log(`  • ${issue.message}`)
      })
    }
    
    // 显示优化建议
    if (this.suggestions.length > 0) {
      console.log('\n💡 优化建议:')
      this.suggestions.forEach(suggestion => {
        console.log(`  • ${suggestion}`)
      })
    }
    
    // 总结
    const totalIssues = this.issues.length
    console.log('\n📊 总结:')
    console.log(`  发现 ${totalIssues} 个性能问题`)
    console.log(`  提供 ${this.suggestions.length} 条优化建议`)
    
    if (groupedIssues.high.length > 0) {
      console.log('\n⚠️  建议优先处理高优先级问题以获得最大性能提升')
    } else if (totalIssues === 0) {
      console.log('\n✅ 未发现严重的性能问题，项目优化良好！')
    }
  }

  // 运行所有检查
  async runAudit() {
    console.log('🚀 开始性能审核...\n')
    
    await this.checkImageSizes()
    await this.checkComponentComplexity()
    await this.checkDependencies()
    await this.checkBundleSize()
    
    this.generateReport()
  }
}

// 运行审核
if (require.main === module) {
  const auditor = new PerformanceAuditor()
  auditor.runAudit().catch(console.error)
}

module.exports = PerformanceAuditor 