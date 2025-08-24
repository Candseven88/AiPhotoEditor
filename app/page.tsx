import ImageGenerator from './components/ImageGenerator'

export default function Home() {
  return (
    <main className="relative">
      {/* 顶部导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="NanoBanana Logo" 
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-xl font-bold text-gray-800">NanoBanana</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-full">
            <span className="text-sm font-medium text-gray-700">🇺🇸 English</span>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <div className="pt-20">
        <ImageGenerator />
      </div>
    </main>
  )
} 