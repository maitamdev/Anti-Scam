'use client'

import { motion } from 'framer-motion'
import { Download, Chrome, CheckCircle, AlertCircle, Shield, Zap, Eye, Bell, MousePointerClick, Lock } from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ExtensionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">100% Miễn phí • Mã nguồn mở</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                ANTISCAM Extension
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                Bảo vệ bạn khỏi lừa đảo <span className="text-blue-400 font-semibold">real-time</span> khi lướt web
              </p>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Tích hợp AI phân tích website ngay khi bạn truy cập. Nhận cảnh báo tức thì nếu phát hiện nguy hiểm.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              {[
                {
                  icon: Zap,
                  title: 'Quét tự động',
                  description: 'Phân tích URL ngay khi bạn truy cập trang web',
                  color: 'text-yellow-400',
                  bg: 'bg-yellow-500/10'
                },
                {
                  icon: Eye,
                  title: 'Phân tích hình ảnh',
                  description: 'Kiểm tra ảnh chụp màn hình lừa đảo trên trang',
                  color: 'text-purple-400',
                  bg: 'bg-purple-500/10'
                },
                {
                  icon: Bell,
                  title: 'Cảnh báo real-time',
                  description: 'Notification ngay lập tức khi phát hiện nguy hiểm',
                  color: 'text-red-400',
                  bg: 'bg-red-500/10'
                },
                {
                  icon: MousePointerClick,
                  title: 'Context Menu',
                  description: 'Click phải → Quét link/ảnh không cần mở tab mới',
                  color: 'text-blue-400',
                  bg: 'bg-blue-500/10'
                },
                {
                  icon: Lock,
                  title: 'Kiểm tra Form',
                  description: 'Phát hiện form đăng nhập/thanh toán không an toàn',
                  color: 'text-green-400',
                  bg: 'bg-green-500/10'
                },
                {
                  icon: Shield,
                  title: 'Báo cáo cộng đồng',
                  description: 'Báo cáo website lừa đảo giúp bảo vệ người khác',
                  color: 'text-cyan-400',
                  bg: 'bg-cyan-500/10'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-[#111827] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all group"
                >
                  <div className={`w-12 h-12 ${feature.bg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Download Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Cài đặt Extension</h2>
              
              <div className="bg-gradient-to-br from-blue-600/20 via-cyan-600/20 to-blue-600/20 rounded-2xl p-8 border border-blue-500/30">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left: Instructions */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Chrome className="w-6 h-6 text-blue-400" />
                      Hướng dẫn cài đặt
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm">
                      Tương thích: Chrome, Edge, Brave, Opera
                    </p>
                    
                    <ol className="space-y-4">
                      {[
                        { step: '1', text: 'Tải file extension.zip bên phải' },
                        { step: '2', text: 'Giải nén file ZIP ra folder' },
                        { step: '3', text: 'Mở chrome://extensions/ (hoặc edge://extensions/)' },
                        { step: '4', text: 'Bật "Developer mode" ở góc trên bên phải' },
                        { step: '5', text: 'Click "Load unpacked" và chọn folder vừa giải nén' },
                      ].map((item) => (
                        <li key={item.step} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                            {item.step}
                          </div>
                          <p className="text-gray-300 pt-1">{item.text}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  {/* Right: Download */}
                  <div className="flex flex-col justify-center items-center bg-[#111827] rounded-xl p-8">
                    <Shield className="w-16 h-16 text-blue-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">ANTISCAM Extension</h3>
                    <p className="text-gray-400 text-center mb-6">
                      Version 1.0.0 • Miễn phí 100%
                    </p>
                    
                    <a
                      href="/antiscam-extension.zip"
                      download="antiscam-extension.zip"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
                    >
                      <Download className="w-5 h-5" />
                      Tải Extension (ZIP)
                    </a>
                    
                    <p className="text-xs text-gray-500 mt-4">
                      504 KB • Cập nhật: 27/12/2025
                    </p>
                    
                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-sm text-blue-300 font-medium mb-2">📦 Sau khi tải về:</p>
                      <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
                        <li>Giải nén file <code className="bg-gray-800 px-1 py-0.5 rounded">antiscam-extension.zip</code></li>
                        <li>Mở <code className="bg-gray-800 px-1 py-0.5 rounded">chrome://extensions/</code></li>
                        <li>Bật Developer mode → Load unpacked → Chọn folder vừa giải nén</li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                {/* Warning */}
                <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <strong className="text-yellow-400">Lưu ý:</strong> Extension đang trong quá trình review để xuất bản lên Chrome Web Store. 
                    Hiện tại bạn cần cài đặt thủ công ở chế độ Developer mode. Hoàn toàn an toàn và mã nguồn mở.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Screenshots / Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#111827] rounded-2xl p-8 border border-gray-800 mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Giao diện Extension</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">✅ Trang an toàn</h3>
                  <div className="aspect-[4/3] bg-gradient-to-br from-green-600/10 to-green-600/20 rounded-xl border border-green-500/30 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-green-400 font-semibold text-lg">An toàn (15/100)</p>
                      <p className="text-sm text-gray-400 mt-2">vietcombank.com.vn</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">⚠️ Trang nguy hiểm</h3>
                  <div className="aspect-[4/3] bg-gradient-to-br from-red-600/10 to-red-600/20 rounded-xl border border-red-500/30 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-red-400 font-semibold text-lg">Nguy hiểm (95/100)</p>
                      <p className="text-sm text-gray-400 mt-2">vietcombannk-vn.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#111827] rounded-2xl p-8 border border-gray-800 mb-12"
            >
              <h2 className="text-2xl font-bold mb-6">Câu hỏi thường gặp</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'Extension có miễn phí không?',
                    a: 'Hoàn toàn miễn phí 100%. Không có phí ẩn, không yêu cầu đăng ký tài khoản.'
                  },
                  {
                    q: 'Extension có thu thập dữ liệu cá nhân không?',
                    a: 'Không. Extension chỉ gửi URL bạn đang truy cập đến server để phân tích. Không thu thập mật khẩu, cookie hay thông tin cá nhân.'
                  },
                  {
                    q: 'Tại sao phải cài Developer mode?',
                    a: 'Extension đang chờ review từ Chrome Web Store (thường mất 2-4 tuần). Developer mode là cách cài đặt tạm thời, hoàn toàn an toàn.'
                  },
                  {
                    q: 'Extension có làm chậm trình duyệt không?',
                    a: 'Không. Extension chỉ hoạt động khi bạn click vào popup hoặc context menu. Không ảnh hưởng tốc độ duyệt web.'
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-gray-400 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Source Code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <div className="inline-block bg-[#111827] rounded-xl p-6 border border-gray-800">
                <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Mã nguồn mở</h3>
                <p className="text-gray-400 mb-4 max-w-md">
                  Extension hoàn toàn mã nguồn mở. Bạn có thể xem và kiểm tra code để đảm bảo an toàn.
                </p>
                <a
                  href="https://github.com/maitamdev/Anti-Scam/tree/main/extension"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Xem trên GitHub
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
