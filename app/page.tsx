'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Shield, 
  Search, 
  Brain,
  Eye,
  Lock,
  Fingerprint,
  ChevronRight,
  Play,
  CheckCircle,
  Zap,
  Users,
  Award,
  ArrowRight
} from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import { useRouter } from 'next/navigation'

const features = [
  {
    icon: Eye,
    title: 'Phát hiện Mối đe dọa',
    description: 'Phân tích URL và hình ảnh theo thời gian thực với công nghệ AI tiên tiến, phát hiện lừa đảo ngay lập tức.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Lock,
    title: 'Bảo vệ Danh tính',
    description: 'Nhận diện các chiêu trò đánh cắp thông tin cá nhân, OTP, mật khẩu và tài khoản ngân hàng.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Fingerprint,
    title: 'Duyệt web An toàn',
    description: 'Kiểm tra website trước khi truy cập, bảo vệ bạn khỏi phishing và malware.',
    color: 'from-green-500 to-emerald-500'
  }
]

const stats = [
  { value: '10K+', label: 'Lượt kiểm tra' },
  { value: '5000+', label: 'Câu hỏi Quiz' },
  { value: '99%', label: 'Độ chính xác' },
  { value: '24/7', label: 'Hoạt động' },
]

const howItWorks = [
  {
    step: '01',
    title: 'Nhập URL hoặc Upload ảnh',
    description: 'Dán link website đáng ngờ hoặc tải lên ảnh chụp tin nhắn lừa đảo'
  },
  {
    step: '02',
    title: 'AI Phân tích',
    description: 'Hệ thống AI phân tích đa lớp: URL patterns, nội dung, database lừa đảo'
  },
  {
    step: '03',
    title: 'Nhận kết quả',
    description: 'Xem điểm rủi ro, dấu hiệu lừa đảo và khuyến nghị hành động cụ thể'
  }
]

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-28 pb-20 px-4 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-400">Nền tảng AI chống lừa đảo #1 Việt Nam</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Bảo vệ Thế giới Số của bạn với{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    AI Bảo mật Tiên tiến
                  </span>
                </h1>
                
                <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
                  Trang bị cho bạn khả năng phát hiện mối đe dọa theo thời gian thực 
                  và công nghệ chống lừa đảo chủ động. Bảo vệ mạng lưới, bảo vệ danh tính của bạn.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    onClick={() => router.push('/scan')}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold text-white flex items-center gap-2 shadow-lg shadow-blue-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Bắt đầu Phân tích
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => router.push('/quiz')}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold text-white flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-5 h-5" />
                    Chơi Quiz
                  </motion.button>
                </div>
              </motion.div>

              {/* Right - 3D Shield illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative w-80 h-80 md:w-[420px] md:h-[420px]">
                  {/* Outer glow rings */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-2xl animate-pulse" />
                  
                  {/* Main circle */}
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#0d1a2d] to-[#1a2d4a] border border-blue-500/30 shadow-2xl shadow-blue-500/20">
                    {/* Inner content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Shield icon */}
                        <Shield className="w-24 h-24 md:w-32 md:h-32 text-blue-400" strokeWidth={1} />
                        {/* Lock overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-10 h-10 md:w-12 md:h-12 text-cyan-400" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Orbiting elements */}
                    <div className="absolute inset-0 animate-spin-slow">
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full" />
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full" />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                  </div>
                  
                  {/* Decorative rings */}
                  <div className="absolute inset-4 rounded-full border border-blue-500/20" />
                  <div className="absolute inset-0 rounded-full border border-cyan-500/10" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 border-y border-gray-800/50 bg-[#0d1320]/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-gray-400 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tính năng & Khả năng
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Bảo vệ toàn diện với công nghệ AI tiên tiến nhất
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-[#111827] to-[#0d1320] rounded-2xl p-8 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} p-0.5 mb-6`}>
                    <div className="w-full h-full bg-[#111827] rounded-xl flex items-center justify-center">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-20 px-4 bg-[#0d1320]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Cách hoạt động
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Chỉ 3 bước đơn giản để bảo vệ bạn khỏi lừa đảo
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {howItWorks.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Connector line */}
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent -translate-x-1/2" />
                  )}
                  
                  <div className="bg-[#111827] rounded-2xl p-8 border border-gray-800 h-full">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mb-6">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Feature list */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Trao quyền cho Cá nhân & Tổ chức
                </h2>
                <p className="text-gray-400 mb-8">
                  Bảo vệ cuộc sống số của bạn với công nghệ phát hiện mối đe dọa theo thời gian thực 
                  và công nghệ chống lừa đảo chủ động.
                </p>
                
                <div className="space-y-4">
                  {[
                    'Phân tích URL & website trong vài giây',
                    'Nhận diện tin nhắn lừa đảo bằng AI Vision',
                    'Quiz 5000+ câu hỏi nâng cao nhận thức',
                    'Cẩm nang hướng dẫn chi tiết',
                    'Báo cáo & cảnh báo cộng đồng',
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button
                  onClick={() => router.push('/scan')}
                  className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold text-white flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Bắt đầu ngay
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Right - Feature cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { icon: Eye, title: 'Phát hiện Mối đe dọa', desc: 'Phân tích theo thời gian thực' },
                  { icon: Lock, title: 'Bảo vệ Danh tính', desc: 'Chống đánh cắp thông tin' },
                  { icon: Fingerprint, title: 'Duyệt web An toàn', desc: 'Kiểm tra trước khi truy cập' },
                  { icon: Brain, title: 'AI Thông minh', desc: 'Học máy tiên tiến' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#111827] rounded-xl p-6 border border-gray-800 hover:border-blue-500/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-[#0d1320] to-[#0a0f1a]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl p-12 border border-blue-500/20 text-center overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Sẵn sàng bảo vệ bản thân?
                </h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  Bắt đầu kiểm tra miễn phí ngay hôm nay. Bảo vệ bạn và người thân 
                  khỏi các chiêu trò lừa đảo trực tuyến.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.button
                    onClick={() => router.push('/scan')}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold text-white flex items-center gap-2 shadow-lg shadow-blue-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Phân tích URL/Ảnh
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => router.push('/quiz')}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-semibold text-white flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Làm Quiz Trắc nghiệm
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
