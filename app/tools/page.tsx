'use client'

import { motion } from 'framer-motion'
import { QrCode, Phone, Mail, FileText, ShoppingBag, ArrowLeft, Wrench, Lock, Link2, Newspaper, MessageSquare, Sparkles, Shield, Wallet } from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GlowingCard from '../components/GlowingCard'
import { useTranslation } from '../lib/i18n/LanguageContext'

const tools = [
  {
    icon: Wallet,
    href: '/tools/wallet-checker',
    titleVi: 'Kiểm tra Ví Crypto',
    titleEn: 'Wallet Checker',
    descVi: 'Kiểm tra địa chỉ ví có liên quan đến scam không',
    descEn: 'Check if wallet address is associated with scams',
    color: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    available: true,
    isNew: true
  },
  {
    icon: Shield,
    href: '/tools/blockchain-verify',
    titleVi: 'Xác minh Blockchain',
    titleEn: 'Blockchain Verify',
    descVi: 'Xác minh báo cáo lừa đảo bằng blockchain hash',
    descEn: 'Verify scam reports using blockchain hash',
    color: 'from-green-500 to-emerald-500',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    available: true,
    isNew: true
  },
  {
    icon: QrCode,
    href: '/tools/qr-scanner',
    titleVi: 'Quét mã QR',
    titleEn: 'QR Scanner',
    descVi: 'Kiểm tra URL trong mã QR trước khi quét',
    descEn: 'Check URL in QR code before scanning',
    color: 'from-purple-500 to-purple-600',
    glowColor: 'rgba(168, 85, 247, 0.4)',
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
    glowColor: 'rgba(34, 197, 94, 0.4)',
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
    glowColor: 'rgba(59, 130, 246, 0.4)',
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
    glowColor: 'rgba(139, 92, 246, 0.4)',
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
    glowColor: 'rgba(249, 115, 22, 0.4)',
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
    glowColor: 'rgba(239, 68, 68, 0.4)',
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
    glowColor: 'rgba(6, 182, 212, 0.4)',
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
    glowColor: 'rgba(245, 158, 11, 0.4)',
    available: true
  },
  {
    icon: ShoppingBag,
    href: '/tools/shop-checker',
    titleVi: 'Kiểm tra Shop Online',
    titleEn: 'Shop Checker',
    descVi: 'Xác minh độ uy tín của shop trên TMĐT',
    descEn: 'Verify shop credibility on e-commerce',
    color: 'from-pink-500 to-pink-600',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    available: false
  },
]

export default function ToolsPage() {
  const { language } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {language === 'vi' ? 'Quay lại trang chủ' : 'Back to Home'}
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-cyan-500/25"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Wrench className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {language === 'vi' ? 'Công cụ Bảo mật' : 'Security Tools'}
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              {language === 'vi' 
                ? 'Bộ công cụ miễn phí giúp bạn kiểm tra và phòng tránh lừa đảo'
                : 'Free tools to help you check and prevent scams'}
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{tools.filter(t => t.available).length}</p>
                <p className="text-xs text-gray-500">{language === 'vi' ? 'Công cụ' : 'Tools'}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">100%</p>
                <p className="text-xs text-gray-500">{language === 'vi' ? 'Miễn phí' : 'Free'}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">24/7</p>
                <p className="text-xs text-gray-500">{language === 'vi' ? 'Hoạt động' : 'Available'}</p>
              </div>
            </div>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {tool.available ? (
                  <GlowingCard glowColor={tool.glowColor} hoverScale={1.03}>
                    <Link
                      href={tool.href}
                      className="block bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 h-full transition-all group relative"
                    >
                      {tool.isNew && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-[10px] font-bold text-white uppercase">
                          NEW
                        </span>
                      )}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        <tool.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                        {language === 'vi' ? tool.titleVi : tool.titleEn}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {language === 'vi' ? tool.descVi : tool.descEn}
                      </p>
                    </Link>
                  </GlowingCard>
                ) : (
                  <div className="block bg-gray-900/30 border border-gray-800/50 rounded-2xl p-6 opacity-50 cursor-not-allowed">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 opacity-50`}>
                      <tool.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-400">
                      {language === 'vi' ? tool.titleVi : tool.titleEn}
                      <span className="text-xs px-2 py-0.5 bg-gray-700/50 rounded-full text-gray-500 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
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

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 border border-gray-700/50">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {language === 'vi' ? 'Cần kiểm tra URL đáng ngờ?' : 'Need to check a suspicious URL?'}
              </h3>
              <p className="text-gray-400 mb-4">
                {language === 'vi' 
                  ? 'Sử dụng công cụ quét URL chính của chúng tôi để phân tích chi tiết'
                  : 'Use our main URL scanner for detailed analysis'}
              </p>
              <Link
                href="/scan"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold text-white transition-all shadow-lg shadow-blue-500/25"
              >
                {language === 'vi' ? 'Quét URL ngay' : 'Scan URL Now'}
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
