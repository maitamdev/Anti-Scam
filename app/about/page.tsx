'use client'

import { motion } from 'framer-motion'
import { Shield, Target, Users, Heart, Github, Mail, Zap, Brain, Eye, Lock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

const features = [
  {
    icon: Eye,
    title: 'Kiểm tra URL',
    description: 'Phân tích website để phát hiện dấu hiệu phishing, giả mạo ngân hàng, TMĐT.'
  },
  {
    icon: Brain,
    title: 'AI Phân tích Hình ảnh',
    description: 'Upload ảnh tin nhắn Zalo, SMS, email để AI nhận diện chiêu trò lừa đảo.'
  },
  {
    icon: Zap,
    title: 'Quiz Trắc nghiệm',
    description: '5000+ câu hỏi giúp nâng cao nhận thức về các hình thức lừa đảo.'
  },
  {
    icon: Lock,
    title: 'Miễn phí 100%',
    description: 'Không giới hạn sử dụng, không cần đăng ký, không quảng cáo.'
  },
]

const stats = [
  { value: '15+', label: 'Loại lừa đảo được nhận diện' },
  { value: '5000+', label: 'Câu hỏi quiz' },
  { value: '100%', label: 'Miễn phí' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        {/* Hero */}
        <section className="px-4 mb-16">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-center mb-6">
                <Image src="/logo.png" alt="ANTI-SCAM" width={80} height={80} className="rounded-2xl" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Về <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">ANTI-SCAM</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Công cụ miễn phí giúp người dùng Việt Nam kiểm tra và nhận biết 
                các website, tin nhắn lừa đảo trước khi trở thành nạn nhân.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-400">Sứ mệnh</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Giảm thiểu thiệt hại do lừa đảo online
                </h2>
                <p className="text-gray-400 mb-4">
                  Mỗi năm, hàng nghìn người Việt Nam mất tiền vì các chiêu trò lừa đảo online: 
                  giả mạo ngân hàng, nhờ chuyển tiền, trúng thưởng giả, tuyển dụng lừa đảo...
                </p>
                <p className="text-gray-400">
                  ANTI-SCAM ra đời với mục tiêu cung cấp công cụ đơn giản, miễn phí để mọi người 
                  có thể kiểm tra nhanh các link và tin nhắn đáng ngờ trước khi click.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-4"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="bg-[#111827] rounded-xl p-6 text-center border border-gray-800">
                    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 mb-16 bg-[#0d1320] py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Tính năng chính</h2>
              <p className="text-gray-400">Những công cụ giúp bạn an toàn hơn trên mạng</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#111827] rounded-xl p-6 border border-gray-800"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="px-4 mb-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚠️ Lưu ý quan trọng</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Kết quả kiểm tra chỉ mang tính chất <strong>tham khảo</strong>, không đảm bảo 100% chính xác.</li>
                <li>• Công cụ không thay thế cho việc <strong>cảnh giác cá nhân</strong> khi sử dụng internet.</li>
                <li>• Luôn <strong>xác minh trực tiếp</strong> với ngân hàng/tổ chức qua hotline chính thức nếu nghi ngờ.</li>
                <li>• <strong>Không bao giờ</strong> cung cấp OTP, mật khẩu cho bất kỳ ai qua điện thoại/tin nhắn.</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Bắt đầu kiểm tra ngay</h2>
              <p className="text-gray-400 mb-8">
                Dán link hoặc upload ảnh tin nhắn đáng ngờ để kiểm tra miễn phí.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/scan"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold text-white"
                >
                  Kiểm tra URL/Ảnh
                </Link>
                <Link
                  href="/quiz"
                  className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-white border border-gray-700"
                >
                  Làm Quiz
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
