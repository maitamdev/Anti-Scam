import Image from 'next/image'
import Link from 'next/link'
import { Github, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-[#0a0f1a] border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Logo & Description */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3 sm:mb-4">
              <Image src="/logo.png" alt="ANTI-SCAM" width={28} height={28} className="rounded-lg sm:w-8 sm:h-8" />
              <span className="text-base sm:text-lg font-bold text-white">ANTI-SCAM</span>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 max-w-md">
              Công cụ miễn phí giúp kiểm tra website và tin nhắn đáng ngờ. 
              Bảo vệ bạn và người thân khỏi các chiêu trò lừa đảo online.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="mailto:contact@anti-scam.vn" 
                className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">Tính năng</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/scan" className="text-gray-400 hover:text-white transition-colors">Kiểm tra URL</Link></li>
              <li><Link href="/scan" className="text-gray-400 hover:text-white transition-colors">Phân tích hình ảnh</Link></li>
              <li><Link href="/quiz" className="text-gray-400 hover:text-white transition-colors">Quiz trắc nghiệm</Link></li>
              <li><Link href="/guide" className="text-gray-400 hover:text-white transition-colors">Cẩm nang</Link></li>
              <li><Link href="/extension" className="text-gray-400 hover:text-white transition-colors">Browser Extension</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">Hỗ trợ</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/report" className="text-gray-400 hover:text-white transition-colors">Báo cáo lừa đảo</Link></li>
              <li><Link href="/result" className="text-gray-400 hover:text-white transition-colors">Lịch sử kiểm tra</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Giới thiệu</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
            © {currentYear} ANTI-SCAM. Được phát triển bởi <a href="https://github.com/maitamdev" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">MaiTamDev</a>.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm text-center md:text-right">
            Công cụ mang tính chất tham khảo.
          </p>
        </div>
      </div>
    </footer>
  )
}
