import { redirect } from 'next/navigation'

// 默认重定向到英语版本
export default function RootPage() {
  redirect('/en')
} 