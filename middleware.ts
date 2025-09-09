import { auth } from './src/auth'

export default auth((req) => {
  // 这里可以添加额外的中间件逻辑
})

export const config = {
  matcher: ['/dashboard/:path*']
} 