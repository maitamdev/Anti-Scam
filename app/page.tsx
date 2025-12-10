'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  Search,
  Brain,
  Eye,
  Lock,
  Play,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import Image from 'next/image'
import Header from './components/Header'
import Footer from './components/Footer'
import StatsCounter from './components/StatsCounter'
import TrustBadges from './components/TrustBadges'
import { useRouter } from 'next/navigation'

const features = [
  {
    icon: Search,
    title: 'Kiểm tra URL',
    description: 'Dán link website đáng ngờ để kiểm tra các dấu hiệu phishing, giả mạo ngân hàng, TMĐT.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Eye,
    title: 'Phân tích Hình ảnh',
    description: 'Upload ảnh chụp tin nhắn Zalo, SMS, email để AI nhận diện các chiêu trò lừa đảo.',
    color: 'from-blue-400 to-blue-500'
  },
  {
    icon: Brain,
    title: 'Quiz Trắc nghiệm',
    description: '5000+ câu hỏi giúp bạn nhận biết các hình thức lừa đảo phổ biến tại Việt Nam.',
    color: 'from-blue-500 to-blue-600'
  }
]

const stats = [
  { value: '50000', label: 'Websites đã quét', suffix: '+' },
  { value: '98', label: 'Antivirus Engines' },
  { value: '100', label: 'Miễn phí', suffix: '%' },
  { value: '24', label: 'Hoạt động', suffix: '/7' },
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
        <section className="pt-20 sm:pt-28 pb-12 sm:pb-20 px-4 relative overflow-hidden">
          {/* Static background gradient - no animations to prevent lag */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0d1320] to-[#0a0f1a] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-20"
              >
                {/* Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full mb-6"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-300 font-medium">Công cụ hỗ trợ phát hiện lừa đảo</span>
                </motion.div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] mb-4 sm:mb-6 uppercase tracking-tight italic relative z-30">
                  <span className="text-white drop-shadow-lg">Bạn có đang</span>
                  <br />
                  <span className="whitespace-nowrap">
                    <span className="text-white drop-shadow-lg">lướt mạng </span>
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent relative z-30" style={{ textShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}>
                      an toàn?
                    </span>
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
                  Kiểm tra URL và hình ảnh để <span className="text-white font-medium">phát hiện dấu hiệu lừa đảo</span>. 
                  Công cụ miễn phí giúp bạn cẩn thận hơn khi lướt web.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <motion.button
                    onClick={() => router.push('/scan')}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Kiểm tra ngay
                  </motion.button>
                  
                  <motion.button
                    onClick={() => router.push('/quiz')}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-5 h-5" />
                    Kiểm tra kiến thức
                  </motion.button>
                </div>
              </motion.div>

              {/* Right - Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center lg:justify-end order-first lg:order-last"
              >
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[480px] md:h-[400px]">
                  {/* Animated glow rings */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-3xl animate-pulse" />
                  <div className="absolute inset-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                  
                  {/* Orbiting particles */}
                  <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50" />
                  </div>
                  
                  {/* Hero Image with float animation */}
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src="/hero-shield.jpg"
                      alt="ANTI-SCAM Security Shield"
                      fill
                      className="object-contain relative z-10 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                      priority
                    />
                  </motion.div>
                  
                  {/* Scanning line effect */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-line opacity-60" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 sm:py-12 px-4 border-y border-gray-800/50 bg-[#0d1320]/50">
          <div className="max-w-7xl mx-auto">
            <StatsCounter stats={stats} />
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 px-4 bg-gradient-to-b from-[#0d1320]/50 to-transparent">
          <div className="max-w-7xl mx-auto">
            <TrustBadges />
          </div>
        </section>


        {/* Features Section */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Các tính năng chính
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Những công cụ giúp bạn cẩn thận hơn trên không gian mạng
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-[#111827] to-[#0d1320] rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-r ${feature.color} p-0.5 mb-4 sm:mb-6`}>
                    <div className="w-full h-full bg-[#111827] rounded-lg sm:rounded-xl flex items-center justify-center">
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-12 sm:py-20 px-4 bg-[#0d1320]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Cách sử dụng
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                Chỉ 3 bước đơn giản để kiểm tra
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
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
                  
                  <div className="bg-[#111827] rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-gray-800 h-full">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mb-4 sm:mb-6">
                      <span className="text-white font-bold text-sm sm:text-base">{item.step}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Left - Feature list */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                  Tại sao nên sử dụng?
                </h2>
                <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">
                  Công cụ đơn giản giúp bạn kiểm tra nhanh các link và tin nhắn đáng ngờ 
                  trước khi click hoặc cung cấp thông tin cá nhân.
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  {[
                    'Kiểm tra URL website trong vài giây',
                    'Upload ảnh tin nhắn để phân tích',
                    'Quiz 5000+ câu hỏi về lừa đảo',
                    'Cẩm nang hướng dẫn nhận biết',
                    'Hoàn toàn miễn phí',
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                      </div>
                      <span className="text-gray-300 text-sm sm:text-base">{item}</span>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button
                  onClick={() => router.push('/scan')}
                  className="mt-6 sm:mt-8 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold text-white flex items-center gap-2 text-sm sm:text-base"
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
                className="grid grid-cols-2 gap-3 sm:gap-4"
              >
                {[
                  { icon: Search, title: 'Kiểm tra URL', desc: 'Phân tích link đáng ngờ' },
                  { icon: Eye, title: 'Scan Hình ảnh', desc: 'Nhận diện tin nhắn lừa đảo' },
                  { icon: Brain, title: 'Quiz Trắc nghiệm', desc: 'Học cách nhận biết' },
                  { icon: Lock, title: 'Miễn phí', desc: 'Không giới hạn sử dụng' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#111827] rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-800 hover:border-blue-500/30 transition-colors"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3 sm:mb-4">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-[#0d1320] to-[#0a0f1a]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-blue-500/20 text-center overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                  Thử kiểm tra ngay?
                </h2>
                <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Dán link hoặc upload ảnh tin nhắn đáng ngờ để kiểm tra. 
                  Hoàn toàn miễn phí, không cần đăng ký.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <motion.button
                    onClick={() => router.push('/scan')}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Phân tích URL/Ảnh
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => router.push('/quiz')}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
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
