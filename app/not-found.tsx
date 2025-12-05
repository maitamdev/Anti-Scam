'use client'

import { motion } from 'framer-motion'
import { Home, Search, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4"
          >
            404
          </motion.div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Không tìm thấy trang
          </h1>
          
          <p className="text-gray-400 mb-8">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển. 
            Hãy kiểm tra lại URL hoặc quay về trang chủ.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Về trang chủ
            </Link>
            
            <Link
              href="/scan"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-white flex items-center justify-center gap-2 border border-gray-700"
            >
              <Search className="w-5 h-5" />
              Kiểm tra URL
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
