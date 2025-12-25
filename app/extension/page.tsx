'use client'

import { motion } from 'framer-motion'
import { Download, Chrome, CheckCircle, AlertCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function ExtensionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <Chrome className="w-20 h-20 text-blue-400 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                ANTISCAM Browser Extension
              </h1>
              <p className="text-xl text-gray-400">
                Bảo vệ bạn khỏi lừa đảo khi lướt web
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#111827] rounded-2xl p-8 border border-gray-800 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">Tính năng</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Quét URL tự động khi truy cập trang mới',
                  'Kiểm tra hình ảnh trên website',
                  'Cảnh báo real-time với notifications',
                  'Báo cáo website lừa đảo',
                  'Kiểm tra form không an toàn',
                  'Context menu - click phải để quét nhanh',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Download Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 border border-blue-500/30 mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">Cài đặt Extension</h2>
              
              <div className="space-y-4">
                <div className="bg-[#111827] rounded-xl p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Chrome className="w-5 h-5" />
                    Chrome / Edge / Brave
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-400 mb-4">
                    <li>Download file extension bên dưới</li>
                    <li>Giải nén file ZIP</li>
                    <li>Mở <code className="bg-gray-800 px-2 py-1 rounded">chrome://extensions/</code></li>
                    <li>Bật "Developer mode" (góc trên bên phải)</li>
                    <li>Click "Load unpacked" và chọn folder đã giải nén</li>
                  </ol>
                  
                  <a
                    href="https://github.com/maitamdev/Anti-Scam/raw/main/antiscam-extension.zip"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download Extension
                  </a>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <strong className="text-yellow-400">Lưu ý:</strong> Extension đang trong quá trình review để xuất bản lên Chrome Web Store. 
                    Hiện tại bạn cần cài đặt thủ công ở chế độ Developer.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Installation Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#111827] rounded-2xl p-8 border border-gray-800"
            >
              <h2 className="text-2xl font-bold mb-4">Video hướng dẫn</h2>
              <p className="text-gray-400 mb-4">
                Xem video chi tiết cách cài đặt và sử dụng extension:
              </p>
              <div className="aspect-video bg-gray-800 rounded-xl flex items-center justify-center">
                <p className="text-gray-500">Video sẽ được cập nhật sớm</p>
              </div>
            </motion.div>

            {/* Source Code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8"
            >
              <p className="text-gray-400 mb-4">
                Extension là mã nguồn mở, bạn có thể xem code tại:
              </p>
              <a
                href="https://github.com/maitamdev/Anti-Scam/tree/main/extension"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                GitHub Repository →
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
