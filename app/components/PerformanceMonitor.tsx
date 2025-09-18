'use client'

import { useEffect } from 'react'

// 扩展全局类型
declare global {
  function gtag(...args: any[]): void
}

// 性能条目类型
interface FirstInputEntry extends PerformanceEntry {
  processingStart: number
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number
  hadRecentInput: boolean
}

// 性能监控组件
export default function PerformanceMonitor() {
  useEffect(() => {
    // 只在生产环境启用性能监控
    if (process.env.NODE_ENV !== 'production') return

    // 监控 Core Web Vitals
    const observePerformance = () => {
      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            console.log('FCP:', entry.startTime)
            // 发送到分析服务
            if (typeof gtag !== 'undefined') {
              gtag('event', 'timing_complete', {
                name: 'FCP',
                value: Math.round(entry.startTime)
              })
            }
          }
        }
      })

      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log('LCP:', lastEntry.startTime)
        if (typeof gtag !== 'undefined') {
          gtag('event', 'timing_complete', {
            name: 'LCP',
            value: Math.round(lastEntry.startTime)
          })
        }
      })

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as FirstInputEntry
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime)
          if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
              name: 'FID',
              value: Math.round(fidEntry.processingStart - fidEntry.startTime)
            })
          }
        }
      })

      // Cumulative Layout Shift (CLS)
      let cumulativeLayoutShift = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const clsEntry = entry as LayoutShiftEntry
          if (!clsEntry.hadRecentInput) {
            cumulativeLayoutShift += clsEntry.value
          }
        }
        console.log('CLS:', cumulativeLayoutShift)
        if (typeof gtag !== 'undefined') {
          gtag('event', 'timing_complete', {
            name: 'CLS',
            value: Math.round(cumulativeLayoutShift * 1000) / 1000
          })
        }
      })

      // 注册观察器
      try {
        fcpObserver.observe({ entryTypes: ['paint'] })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        fidObserver.observe({ entryTypes: ['first-input'] })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (e) {
        console.warn('Performance observers not supported:', e)
      }

      // 清理函数
      return () => {
        fcpObserver.disconnect()
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
      }
    }

    // 页面加载完成后启动监控
    if (document.readyState === 'complete') {
      observePerformance()
    } else {
      window.addEventListener('load', observePerformance)
    }

    // 监控资源加载时间
    const monitorResourceTiming = () => {
      const resources = performance.getEntriesByType('resource')
      const slowResources = resources.filter(resource => resource.duration > 1000)
      
      if (slowResources.length > 0) {
        console.warn('Slow loading resources:', slowResources)
        if (typeof gtag !== 'undefined') {
          gtag('event', 'performance_issue', {
            event_category: 'Performance',
            event_label: 'Slow Resources',
            value: slowResources.length
          })
        }
      }
    }

    // 延迟执行资源监控，避免影响初始加载
    setTimeout(monitorResourceTiming, 3000)

    // 内存使用监控（仅支持的浏览器）
    const monitorMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        const memoryUsage = {
          used: Math.round(memory.usedJSHeapSize / 1048576), // MB
          total: Math.round(memory.totalJSHeapSize / 1048576), // MB
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
        }
        
        console.log('Memory usage:', memoryUsage)
        
        // 内存使用率超过80%时警告
        if (memoryUsage.used / memoryUsage.limit > 0.8) {
          console.warn('High memory usage detected')
          if (typeof gtag !== 'undefined') {
            gtag('event', 'performance_issue', {
              event_category: 'Performance',
              event_label: 'High Memory Usage',
              value: Math.round((memoryUsage.used / memoryUsage.limit) * 100)
            })
          }
        }
      }
    }

    // 每30秒检查一次内存使用
    const memoryInterval = setInterval(monitorMemoryUsage, 30000)

    return () => {
      clearInterval(memoryInterval)
    }
  }, [])

  // 这个组件不渲染任何UI
  return null
}

// 性能相关的工具函数
export const markPerformance = (name: string) => {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(name)
  }
}

export const measurePerformance = (name: string, startMark: string, endMark?: string) => {
  if (typeof performance !== 'undefined' && performance.measure) {
    try {
      performance.measure(name, startMark, endMark)
      const measures = performance.getEntriesByName(name, 'measure')
      if (measures.length > 0) {
        const measure = measures[measures.length - 1]
        console.log(`${name}: ${measure.duration}ms`)
        return measure.duration
      }
    } catch (e) {
      console.warn('Performance measurement failed:', e)
    }
  }
  return null
} 