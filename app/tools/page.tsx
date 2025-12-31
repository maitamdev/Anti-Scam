'use client'

import { motion } from 'framer-motion'
import { QrCode, Phone, Mail, FileText, ShoppingBag, ArrowLeft, Wrench, Lock, Link2, Newspaper, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useTranslation } from '../lib/i18n/LanguageContext'

const tools = [
  {
    icon: QrCode,
    href: '/tools/qr-scanner',
    titleVi: 'Quét mã QR',
    titleEn: 'QR Scanner',
    descVi: 'Kiểm tra URL trong mã QR trước khi quét',
    descEn: 'Check URL in QR code before scanning',
    color: 'from-purple-500 to-purple-600',
    available: true
  },
  {
    icon: Phone,
    href: '/tools/bank-hotlines',
    titleVi: 'Hotline Ngân hàng',
    titleEn: 'Bank Hotlines',
    descVi: 'Danh sách số điện thoại chính thức các ngân hàng',
    descEn: 'Official phone numbers of banks',
    color: 'from-green-500 to-green-600',
    available: true
  },
  {
    icon: Mail,
    href: '/tools/email-analyzer',
    titleVi: 'Phân tích Email',
    titleEn: 'Email Analyzer',
    descVi: 'Kiểm tra email header để phát hiện giả mạo',
    descEn: 'Check email headers to detect spoofing',
    color: 'from-blue-500 to-blue-600',
    available: true
  },
  {
    icon: Lock,
    href: '/tools/password-checker',
    titleVi: 'Kiểm tra Mật khẩu',
    titleEn: 'Password Checker',
    descVi: 'Đánh giá độ mạnh mật khẩu của bạn',
    descEn: 'Check your password strength',
    color: 'from-violet-500 to-violet-600',
    available: true
  },
  {
    icon: Link2,
    href: '/tools/link-expander',
    titleVi: 'Mở rộng Link',
    titleEn: 'Link Expander',
    descVi: 'Xem URL thật đằng sau link rút gọn',
    descEn: 'See real URL behind shortened links',
    color: 'from-orange-500 to-orange-600',
    available: true
  },
  {
    icon: Newspaper,
    href: '/tools/fake-news',
    titleVi: 'Kiểm tra Tin giả',
    titleEn: 'Fake News Checker',
    descVi: 'Phát hiện dấu hiệu tin giả, tin sai sự thật',
    descEn: 'Detect signs of fake news and misinformation',
    color: 'from-red-500 to-red-600',
    available: true
  },
  {
    icon: MessageSquare,
    href: '/tools/sms-checker',
    titleVi: 'Kiểm tra SMS',
    titleEn: 'SMS Checker',
    descVi: 'Phát hiện tin nhắn lừa đảo, spam',
    descEn: 'Detect scam and spam messages',
    color: 'from-cyan-500 to-cyan-600',
    available: true
  },
  {
    icon: FileText,
    href: '/tools/contract-checker',
    titleVi: 'Kiểm tra Hợp đồng',
    titleEn: 'Contract Checker',
    descVi: 'Phát hiện điều khoản nguy hiểm trong hợp đồng',
    descEn: 'Detect dangerous clauses in contracts',
    color: 'from-amber-500 to-amber-600',
    available: false
  },
  {
    icon: ShoppingBag,
    href: '/tools/shop-checker',
    titleVi: 'Kiểm tra Shop Online',
    titleEn: 'Shop Checker',
    descVi: 'Xác minh độ uy tín của shop trên TMĐT',
    descEn: 'Verify shop credibility on e-commerce',
    color: 'from-pink-500 to-pink-600',
    available: false
  },
]

export default function ToolsPage() {
  const { language } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {language === 'vi' ? 'Quay lại trang chủ' : 'Back to Home'}
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-2xl mb-4">
              <Wrench className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {language === 'vi' ? 'Công cụ Bảo mật' : 'Security Tools'}
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              {language === 'vi' 
                ? 'Bộ công cụ miễn phí giúp bạn kiểm tra và phòng tránh lừa đảo'
                : 'Free tools to help you check and prevent scams'}
            </p>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {tool.available ? (
                  <Link
                    href={tool.href}
                    className="block bg-blue-900/10 border border-gray-800 rounded-xl p-6 hover:border-blue-500/30 hover:bg-blue-900/20 transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} p-0.5 mb-4`}>
                      <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {language === 'vi' ? tool.titleVi : tool.titleEn}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {language === 'vi' ? tool.descVi : tool.descEn}
                    </p>
                  </Link>
                ) : (
                  <div className="block bg-gray-900/50 border border-gray-800 rounded-xl p-6 opacity-60 cursor-not-allowed">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} p-0.5 mb-4 opacity-50`}>
                      <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      {language === 'vi' ? tool.titleVi : tool.titleEn}
                      <span className="text-xs px-2 py-0.5 bg-gray-700 rounded-full text-gray-400">
                        {language === 'vi' ? 'Sắp ra mắt' : 'Coming soon'}
                      </span>
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {language === 'vi' ? tool.descVi : tool.descEn}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
