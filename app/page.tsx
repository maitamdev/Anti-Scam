'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Search, 
  Lightbulb, 
  BookOpen,
  ClipboardCheck,
  BarChart3,
  Zap,
  ChevronRight,
  Quote
} from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import { useRouter } from 'next/navigation'

const features = [
  {
    icon: Search,
    title: 'Hiểu rõ lỗ hổng',
    description: 'Xác định các điểm yếu tiềm ẩn trong thói quen trực tuyến của bạn thông qua một bài đánh giá toàn diện.'
  },
  {
    icon: Lightbulb,
    title: 'Nhận khuyến nghị cá nhân hóa',
    description: 'Nhận được các bước hành động cụ thể để thực hiện được thiết kế riêng cho nhu cầu của bạn.'
  },
  {
    icon: BookOpen,
    title: 'Nâng cao kiến thức bảo mật',
    description: 'Trang bị cho mình những kiến thức cần thiết để tự tin đối mặt với các mối đe dọa mạng.'
  }
]

const steps = [
  {
    number: '01',
    title: 'Trả lời khảo sát',
    description: 'Hoàn thành bài đánh giá ngắn gọn về các thói quen và kiến thức an ninh mạng của bạn.'
  },
  {
    number: '02', 
    title: 'Nhận báo cáo tức thì',
    description: 'Xem điểm số an toàn của bạn và phân tích chi tiết các lĩnh vực cần cải thiện.'
  },
  {
    number: '03',
    title: 'Hành động để cải thiện',
    description: 'Áp dụng các khuyến nghị được cá nhân hóa để tăng cường bảo mật cho bạn.'
  }
]

const testimonials = [
  {
    quote: 'Nền tảng này thực sự mở mang tầm mắt. Tôi đã nhận ra nhiều rủi ro bảo mật mà trước đây tôi không hề hay biết. Các khuyến nghị rất rõ ràng và dễ thực hiện.',
    name: 'An Nguyễn',
    role: 'Sinh viên CNTT'
  },
  {
    quote: 'Là một người không chuyên về kỹ thuật, tôi thấy CyberSecure rất thân thiện và hữu ích. Giờ đây tôi cảm thấy an tâm hơn rất nhiều khi sử dụng internet cho công việc hàng ngày.',
    name: 'Minh Trang',
    role: 'Nhân viên văn phòng'
  }
]

export default function Home() {
  const router = useRouter()

  const handleStartAssessment = () => {
    router.push('/assessment')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Đánh giá Mức độ{' '}
                  <span className="gradient-text">An toàn Mạng</span>{' '}
                  của Bạn
                </h1>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Nền tảng giúp sinh viên và cá nhân tự kiểm tra và cải thiện 
                  khả năng phòng thủ trước các mối đe dọa trực tuyến.
                </p>
                <motion.button
                  onClick={handleStartAssessment}
                  className="btn-primary px-8 py-4 rounded-lg font-semibold text-white flex items-center gap-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Bắt đầu Đánh giá Ngay
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>

              {/* Right - Shield illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/10 flex items-center justify-center shield-glow">
                    <Shield className="w-32 h-32 md:w-40 md:h-40 text-blue-500" strokeWidth={1} />
                  </div>
                  {/* Decorative rings */}
                  <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-pulse" />
                  <div className="absolute -inset-4 rounded-full border border-cyan-500/10" />
                  <div className="absolute -inset-8 rounded-full border border-blue-500/5" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tại sao bạn nên quan tâm?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Nền tảng của chúng tôi cung cấp những công cụ cần thiết để bạn hiểu rõ 
                và nâng cao mức độ an toàn của mình trên không gian mạng.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1a2332] rounded-2xl p-8 border border-gray-800 card-hover"
                >
                  <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-20 px-4 bg-[#0d1320]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Hành trình Bảo mật của Bạn
              </h2>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500 hidden md:block" />

              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative flex gap-6 mb-12 last:mb-0"
                >
                  {/* Step number */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#1a2332] border-2 border-blue-500 flex items-center justify-center z-10">
                    <span className="text-blue-400 font-bold">{step.number}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="pt-3">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Người dùng nói gì về chúng tôi?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Xem cách ANTISCAM đã giúp những người khác tăng cường an toàn trực tuyến của họ.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="testimonial-card rounded-2xl p-8"
                >
                  <Quote className="w-8 h-8 text-blue-500/50 mb-4" />
                  <p className="text-gray-300 mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-cyan-400">{testimonial.name}</p>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-[#0d1320] to-[#0a0f1a]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Sẵn sàng bảo vệ bản thân?
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Bắt đầu đánh giá miễn phí ngay hôm nay và khám phá cách bạn có thể 
                cải thiện an toàn trực tuyến của mình.
              </p>
              <motion.button
                onClick={handleStartAssessment}
                className="btn-primary px-10 py-4 rounded-lg font-semibold text-white inline-flex items-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Bắt đầu Ngay
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
