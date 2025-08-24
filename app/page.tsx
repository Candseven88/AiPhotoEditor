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
          <div className="flex items-center space-x-4">
            <a 
              href="/" 
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Text to Image
            </a>
            <a 
              href="/image-to-image" 
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Image to Image
            </a>
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