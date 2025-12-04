'use client'

import { motion } from 'framer-motion'
import { BookOpen, Shield, AlertTriangle, Eye, Lock, Phone, CreditCard, Mail, Globe } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const tips = [
  {
    icon: Globe,
    title: 'Kiểm tra URL cẩn thận',
    content: 'Luôn kiểm tra địa chỉ website trước khi nhập thông tin. Kẻ lừa đảo thường dùng domain giống với website chính thức nhưng có sai khác nhỏ (vd: vietcombank.xyz thay vì vietcombank.com.vn).',
    color: 'text-blue-400',
  },
  {
    icon: Lock,
    title: 'Kiểm tra HTTPS',
    content: 'Website an toàn phải có biểu tượng khóa và bắt đầu bằng https://. Tuy nhiên, đây chỉ là điều kiện cần, không đủ để khẳng định website an toàn.',
    color: 'text-green-400',
  },
  {
    icon: AlertTriangle,
    title: 'Cảnh giác với tin nhắn khẩn cấp',
    content: 'Kẻ lừa đảo thường tạo áp lực thời gian: "Tài khoản sẽ bị khóa trong 24h", "Nhận thưởng ngay hôm nay". Hãy bình tĩnh và xác minh trước khi hành động.',
    color: 'text-yellow-400',
  },
  {
    icon: CreditCard,
    title: 'Không chia sẻ OTP',
    content: 'Ngân hàng và các tổ chức uy tín KHÔNG BAO GIỜ yêu cầu OTP qua điện thoại, tin nhắn hay email. OTP chỉ nhập trực tiếp trên app/website chính thức.',
    color: 'text-red-400',
  },
  {
    icon: Phone,
    title: 'Xác minh qua kênh chính thức',
    content: 'Nếu nhận được cuộc gọi/tin nhắn đáng ngờ từ "ngân hàng", hãy gác máy và gọi lại số hotline chính thức để xác minh.',
    color: 'text-purple-400',
  },
  {
    icon: Mail,
    title: 'Cẩn thận với email lạ',
    content: 'Không click vào link trong email không rõ nguồn gốc. Kiểm tra địa chỉ email người gửi - kẻ lừa đảo thường dùng email giống nhưng không chính xác.',
    color: 'text-orange-400',
  },
]

const scamTypes = [
  {
    title: 'Phishing (Giả mạo)',
    desc: 'Tạo website giả mạo ngân hàng, mạng xã hội để đánh cắp thông tin đăng nhập',
    examples: ['vietcombank-login.xyz', 'facebook-security.com', 'shopee-khuyenmai.vn'],
  },
  {
    title: 'Lừa đảo trúng thưởng',
    desc: 'Thông báo trúng thưởng giả, yêu cầu đóng phí để nhận giải',
    examples: ['Bạn đã trúng iPhone 15', 'Nhận 10 triệu từ Shopee', 'Quay số may mắn'],
  },
  {
    title: 'Đầu tư lừa đảo',
    desc: 'Hứa hẹn lợi nhuận cao bất thường, kêu gọi đầu tư vào các dự án ảo',
    examples: ['Lãi suất 30%/tháng', 'Đầu tư crypto x100', 'Forex siêu lợi nhuận'],
  },
  {
    title: 'Cửa hàng giả mạo',
    desc: 'Website bán hàng giả, thu tiền nhưng không giao hàng hoặc giao hàng kém chất lượng',
    examples: ['Giảm giá 90%', 'Hàng hiệu giá rẻ', 'Flash sale sốc'],
  },
]

export default function GuidePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="py-16 px-4 bg-gradient-to-b from-blue-900/20 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BookOpen className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Hướng dẫn Phòng chống Lừa đảo
              </h1>
              <p className="text-gray-400 text-lg">
                Trang bị kiến thức để bảo vệ bản thân và gia đình khỏi các chiêu trò lừa đảo trực tuyến
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">6 Nguyên tắc vàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                >
                  <tip.icon className={`w-10 h-10 ${tip.color} mb-4`} />
                  <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                  <p className="text-gray-400 text-sm">{tip.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Scam Types */}
        <section className="py-12 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Các hình thức lừa đảo phổ biến</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scamTypes.map((type, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                >
                  <h3 className="font-semibold text-lg mb-2 text-red-400">{type.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{type.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((ex, j) => (
                      <span key={j} className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                        {ex}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center"
            >
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-4">Nếu bạn đã bị lừa đảo</h2>
              <div className="text-left max-w-2xl mx-auto space-y-3 text-gray-300">
                <p>1. <strong>Liên hệ ngân hàng ngay</strong> để khóa tài khoản/thẻ nếu đã cung cấp thông tin tài chính</p>
                <p>2. <strong>Đổi mật khẩu</strong> tất cả tài khoản liên quan</p>
                <p>3. <strong>Báo cáo</strong> cho cơ quan công an địa phương</p>
                <p>4. <strong>Lưu giữ bằng chứng</strong>: screenshot, tin nhắn, email, lịch sử giao dịch</p>
              </div>
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400">Đường dây nóng Bộ Công an:</p>
                <p className="text-2xl font-bold text-yellow-400">113</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8"
            >
              <Shield className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Kiểm tra ngay website đáng ngờ</h2>
              <p className="text-blue-100 mb-6">
                Sử dụng công cụ ANTISCAM để kiểm tra độ an toàn của bất kỳ website nào
              </p>
              <a
                href="/"
                className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Kiểm tra ngay
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
