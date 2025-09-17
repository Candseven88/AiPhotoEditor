'use client'

import { useState } from 'react'
import GradientButton from './ui/GradientButton'
import Card from './ui/Card'

interface SEOPanelProps {
  isAdmin?: boolean
}

export default function SEOPanel({ isAdmin = false }: SEOPanelProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [indexNowResults, setIndexNowResults] = useState<any>(null)

  if (!isAdmin) {
    return null
  }

  const handleSubmitSitemap = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/submit-sitemap', { method: 'POST' })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Failed to submit sitemap:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleIndexNowSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/indexnow', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          urls: [
            'https://www.aiphotoeditor.space/',
            'https://www.aiphotoeditor.space/aiphotoeditor',
            'https://www.aiphotoeditor.space/seedream',
            'https://www.aiphotoeditor.space/blog',
          ]
        })
      })
      const data = await response.json()
      setIndexNowResults(data)
    } catch (error) {
      console.error('Failed to submit to IndexNow:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 p-4 bg-white/95 backdrop-blur-sm border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">SEO管理面板</h3>
        
        <div className="space-y-3">
          <GradientButton 
            onClick={handleSubmitSitemap}
            disabled={isSubmitting}
            className="w-full text-sm"
          >
            {isSubmitting ? '提交中...' : '提交Sitemap到搜索引擎'}
          </GradientButton>
          
          <GradientButton 
            onClick={handleIndexNowSubmit}
            disabled={isSubmitting}
            className="w-full text-sm"
          >
            {isSubmitting ? '提交中...' : '快速索引 (IndexNow)'}
          </GradientButton>
        </div>

        {results && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Sitemap提交结果:</h4>
            <div className="space-y-1 text-xs">
              {results.results?.map((result: any, index: number) => (
                <div key={index} className={`p-2 rounded ${result.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  <strong>{result.engine}:</strong> {result.success ? '成功' : '失败'}
                  {result.error && ` - ${result.error}`}
                </div>
              ))}
            </div>
          </div>
        )}

        {indexNowResults && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm text-gray-700 mb-2">IndexNow结果:</h4>
            <div className="space-y-1 text-xs">
              {indexNowResults.results?.map((result: any, index: number) => (
                <div key={index} className={`p-2 rounded ${result.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  <strong>{result.engine}:</strong> {result.success ? '成功' : '失败'}
                  {result.error && ` - ${result.error}`}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500 space-y-1">
            <div>🔍 <strong>当前SEO状态:</strong></div>
            <div>✅ Sitemap: 已配置</div>
            <div>✅ Robots.txt: 已优化</div>
            <div>✅ Meta标签: 多语言支持</div>
            <div>✅ 结构化数据: JSON-LD</div>
            <div>✅ IndexNow: 已集成</div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <strong>手动提交链接:</strong>
            <div className="space-y-1 mt-1">
              <a href="https://search.google.com/search-console" target="_blank" rel="noopener" className="block text-blue-600 hover:underline">
                Google Search Console
              </a>
              <a href="https://www.bing.com/webmasters" target="_blank" rel="noopener" className="block text-blue-600 hover:underline">
                Bing Webmaster Tools
              </a>
              <a href="https://ziyuan.baidu.com/" target="_blank" rel="noopener" className="block text-blue-600 hover:underline">
                百度站长工具
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 