import { Shield } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1a] border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-bold text-white">ANTISCAM</span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm">
            <Link href="/guide" className="text-gray-400 hover:text-white transition-colors">
              Về chúng tôi
            </Link>
            <Link href="/report" className="text-gray-400 hover:text-white transition-colors">
              Chính sách
            </Link>
            <Link href="/report" className="text-gray-400 hover:text-white transition-colors">
              Liên hệ
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © 2024 ANTISCAM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
