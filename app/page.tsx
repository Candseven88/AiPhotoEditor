// 这个文件现在不再需要，因为中间件会直接处理重定向
// 如果用户直接访问根路径，中间件会重定向到合适的语言版本
export default function RootPage() {
  // 这个页面不应该被渲染，因为中间件会重定向
  return null
} 