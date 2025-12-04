import { Shield, Github, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800/50 border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-blue-500" />
              <span className="text-lg font-bold">ANTISCAM</span>
            </div>
            <p className="text-gray-400 text-sm">
              Nền tảng AI phân tích và cảnh báo website lừa đảo, bảo vệ người
              dùng Việt Nam khỏi các chiêu trò lừa đảo trực tuyến.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Liên kết</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Kiểm tra URL
                </Link>
              </li>
              <li>
                <Link href="/report" className="hover:text-white">
                  Báo cáo lừa đảo
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-white">
                  Hướng dẫn
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Về chúng tôi</h3>
            <p className="text-gray-400 text-sm">
              ANTISCAM được phát triển với mục tiêu bảo vệ cộng đồng người dùng
              Việt Nam khỏi các website lừa đảo và phishing.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Sử dụng công nghệ AI tiên tiến để phân tích và cảnh báo.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 ANTISCAM. Kết quả chỉ mang tính tham khảo.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/maitamdev/Anti-Scam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@antiscam.vn"
              className="text-gray-400 hover:text-white"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
