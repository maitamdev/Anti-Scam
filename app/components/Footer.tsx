import Image from 'next/image'
import Link from 'next/link'
import { Github, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-[#0a0f1a] border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="ANTI-SCAM" width={32} height={32} className="rounded-lg" />
              <span className="text-lg font-bold text-white">ANTI-SCAM</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              Công cụ miễn phí giúp kiểm tra website và tin nhắn đáng ngờ. 
              Bảo vệ bạn và người thân khỏi các chiêu trò lừa đảo online.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:contact@anti-scam.vn" 
                className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Tính năng</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/scan" className="text-gray-400 hover:text-white transition-colors">Kiểm tra URL</Link></li>
              <li><Link href="/scan" className="text-gray-400 hover:text-white transition-colors">Phân tích hình ảnh</Link></li>
              <li><Link href="/quiz" className="text-gray-400 hover:text-white transition-colors">Quiz trắc nghiệm</Link></li>
              <li><Link href="/guide" className="text-gray-400 hover:text-white transition-colors">Cẩm nang</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/report" className="text-gray-400 hover:text-white transition-colors">Báo cáo lừa đảo</Link></li>
              <li><Link href="/result" className="text-gray-400 hover:text-white transition-colors">Lịch sử kiểm tra</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Giới thiệu</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} ANTI-SCAM. Được phát triển với <Heart className="w-4 h-4 inline text-red-500" /> tại Việt Nam.
          </p>
          <p className="text-gray-500 text-sm">
            Công cụ mang tính chất tham khảo, không thay thế cho việc cảnh giác cá nhân.
          </p>
        </div>
      </div>
    </footer>
  )
}
