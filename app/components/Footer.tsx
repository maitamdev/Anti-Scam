'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Github, Mail } from 'lucide-react'
import { useTranslation } from '../lib/i18n/LanguageContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { language } = useTranslation()
  
  return (
    <footer className="bg-[#0a0f1a]/80 backdrop-blur-md border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Logo & Description */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3 sm:mb-4">
              <Image src="/logo.png" alt="ANTI-SCAM" width={28} height={28} className="rounded-lg sm:w-8 sm:h-8" />
              <span className="text-base sm:text-lg font-bold text-white">ANTI-SCAM</span>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 max-w-md">
              {language === 'vi' 
                ? 'Công cụ miễn phí giúp kiểm tra website và tin nhắn đáng ngờ. Bảo vệ bạn và người thân khỏi các chiêu trò lừa đảo online.'
                : 'Free tool to check suspicious websites and messages. Protect yourself and your loved ones from online scams.'}
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
            <h4 className="font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">
              {language === 'vi' ? 'Tính năng' : 'Features'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/scan" className="text-gray-400 hover:text-white transition-colors">
                {language === 'vi' ? 'Kiểm tra URL' : 'Check URL'}
              </Link></li>
              <li><Link href="/tools" className="text-gray-400 hover:text-white transition-colors">
                {language === 'vi' ? 'Công cụ bảo mật' : 'Security Tools'}
              </Link></li>
              <li><Link href="/quiz" className="text-gray-400 hover:text-white transition-colors">
                {language === 'vi' ? 'Quiz trắc nghiệm' : 'Quiz Test'}
              </Link></li>
              <li><Link href="/guide" className="text-gray-400 hover:text-white transition-colors">
                {language === 'vi' ? 'Cẩm nang' : 'Guide'}
              </Link></li>
              <li><Link href="/extension" className="text-gray-400 hover:text-white transition-colors">
                Browser Extension
              </Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">
              {language === 'vi' ? 'Hỗ trợ' : 'Support'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/report" className="text-gray-400 hover:text-white transition-colors">
                {language === 'vi' ? 'Báo cáo lừa đảo' : 'Report Scam'}
              </Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                {language === 'vi' ? 'Giới thiệu' : 'About'}
              </Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                {language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
              </Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                {language === 'vi' ? 'Điều khoản sử dụng' : 'Terms of Service'}
              </Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
            © {currentYear} ANTI-SCAM. {language === 'vi' ? 'Được phát triển bởi' : 'Developed by'} <a href="https://github.com/maitamdev" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">MaiTamDev</a>.
          </p>
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors">
              {language === 'vi' ? 'Bảo mật' : 'Privacy'}
            </Link>
            <span className="text-gray-700">•</span>
            <Link href="/terms" className="text-gray-500 hover:text-gray-300 transition-colors">
              {language === 'vi' ? 'Điều khoản' : 'Terms'}
            </Link>
            <span className="text-gray-700">•</span>
            <span className="text-gray-500">
              {language === 'vi' ? 'Chỉ mang tính tham khảo' : 'For reference only'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
