'use client'

import { motion } from 'framer-motion'
import { Shield, ArrowLeft, Lock, Eye, Database, Trash2, Mail, Clock } from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useTranslation } from '../lib/i18n/LanguageContext'

export default function PrivacyPage() {
  const { language } = useTranslation()

  const sections = language === 'vi' ? [
    {
      icon: Database,
      title: 'Dữ liệu chúng tôi thu thập',
      content: [
        'URL website bạn gửi để kiểm tra (chỉ lưu tạm thời trong quá trình phân tích)',
        'Hình ảnh bạn upload để phân tích (xóa ngay sau khi xử lý xong)',
        'Thông tin báo cáo lừa đảo bạn gửi (số tài khoản, email, SĐT đáng ngờ)',
        'Dữ liệu quiz và điểm số (nếu bạn đăng nhập)',
      ]
    },
    {
      icon: Eye,
      title: 'Chúng tôi KHÔNG thu thập',
      content: [
        'Thông tin cá nhân của bạn (tên, địa chỉ, CMND/CCCD)',
        'Thông tin tài khoản ngân hàng của bạn',
        'Mật khẩu hoặc thông tin đăng nhập của bạn',
        'Lịch sử duyệt web ngoài URL bạn chủ động gửi kiểm tra',
        'Cookies theo dõi quảng cáo',
      ]
    },
    {
      icon: Lock,
      title: 'Cách chúng tôi bảo vệ dữ liệu',
      content: [
        'Mã hóa SSL/TLS cho mọi kết nối',
        'Không lưu trữ URL đã kiểm tra quá 24 giờ',
        'Hình ảnh upload được xóa ngay sau khi phân tích',
        'Dữ liệu báo cáo được ẩn danh hóa trước khi lưu',
        'Server đặt tại Việt Nam, tuân thủ luật ATTT',
      ]
    },
    {
      icon: Trash2,
      title: 'Quyền của bạn',
      content: [
        'Yêu cầu xóa dữ liệu liên quan đến bạn bất cứ lúc nào',
        'Truy cập và tải về dữ liệu của bạn',
        'Từ chối thu thập dữ liệu (không sử dụng dịch vụ)',
        'Khiếu nại về cách xử lý dữ liệu',
      ]
    },
    {
      icon: Clock,
      title: 'Thời gian lưu trữ',
      content: [
        'URL kiểm tra: Xóa sau 24 giờ',
        'Hình ảnh upload: Xóa ngay sau khi phân tích (< 5 phút)',
        'Báo cáo lừa đảo: Lưu vĩnh viễn (đã ẩn danh) để bảo vệ cộng đồng',
        'Tài khoản người dùng: Xóa sau 12 tháng không hoạt động',
      ]
    },
  ] : [
    {
      icon: Database,
      title: 'Data We Collect',
      content: [
        'Website URLs you submit for checking (temporarily stored during analysis)',
        'Images you upload for analysis (deleted immediately after processing)',
        'Scam reports you submit (suspicious accounts, emails, phone numbers)',
        'Quiz data and scores (if you are logged in)',
      ]
    },
    {
      icon: Eye,
      title: 'We DO NOT Collect',
      content: [
        'Your personal information (name, address, ID)',
        'Your bank account information',
        'Your passwords or login credentials',
        'Browsing history beyond URLs you actively submit',
        'Advertising tracking cookies',
      ]
    },
    {
      icon: Lock,
      title: 'How We Protect Your Data',
      content: [
        'SSL/TLS encryption for all connections',
        'Checked URLs not stored beyond 24 hours',
        'Uploaded images deleted immediately after analysis',
        'Report data anonymized before storage',
        'Servers located in Vietnam, compliant with local laws',
      ]
    },
    {
      icon: Trash2,
      title: 'Your Rights',
      content: [
        'Request deletion of your data at any time',
        'Access and download your data',
        'Opt out of data collection (by not using the service)',
        'File complaints about data handling',
      ]
    },
    {
      icon: Clock,
      title: 'Data Retention',
      content: [
        'Checked URLs: Deleted after 24 hours',
        'Uploaded images: Deleted immediately after analysis (< 5 minutes)',
        'Scam reports: Stored permanently (anonymized) to protect community',
        'User accounts: Deleted after 12 months of inactivity',
      ]
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'vi' ? 'Quay lại trang chủ' : 'Back to Home'}
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'vi' ? 'Chính sách Bảo mật' : 'Privacy Policy'}
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {language === 'vi' 
                ? 'Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Tài liệu này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.'
                : 'We are committed to protecting your privacy. This document explains how we collect, use, and protect your data.'}
            </p>
            <p className="text-sm text-gray-500 mt-4">
              {language === 'vi' ? 'Cập nhật lần cuối: 01/01/2026' : 'Last updated: January 1, 2026'}
            </p>
          </motion.div>

          {/* Key Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  {language === 'vi' ? 'Cam kết của chúng tôi' : 'Our Commitment'}
                </h3>
                <p className="text-gray-300">
                  {language === 'vi' 
                    ? 'ANTI-SCAM được thiết kế với nguyên tắc "Privacy by Design". Chúng tôi chỉ thu thập dữ liệu tối thiểu cần thiết để cung cấp dịch vụ, và KHÔNG BAO GIỜ bán hoặc chia sẻ dữ liệu của bạn cho bên thứ ba vì mục đích thương mại.'
                    : 'ANTI-SCAM is designed with "Privacy by Design" principles. We only collect minimal data necessary to provide the service, and NEVER sell or share your data with third parties for commercial purposes.'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-blue-900/10 border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <ul className="space-y-2">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Extension Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">
              {language === 'vi' ? '⚠️ Về Browser Extension' : '⚠️ About Browser Extension'}
            </h3>
            <p className="text-gray-300 mb-3">
              {language === 'vi' 
                ? 'Khi sử dụng extension, chúng tôi chỉ gửi URL của trang bạn đang truy cập đến server để phân tích. Chúng tôi KHÔNG:'
                : 'When using the extension, we only send the URL of the page you are visiting to our server for analysis. We DO NOT:'}
            </p>
            <ul className="space-y-1 text-gray-300">
              <li>• {language === 'vi' ? 'Thu thập nội dung trang web' : 'Collect page content'}</li>
              <li>• {language === 'vi' ? 'Theo dõi lịch sử duyệt web của bạn' : 'Track your browsing history'}</li>
              <li>• {language === 'vi' ? 'Đọc cookies hoặc dữ liệu form' : 'Read cookies or form data'}</li>
              <li>• {language === 'vi' ? 'Chạy script trên trang của bạn' : 'Run scripts on your pages'}</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400 mb-4">
              {language === 'vi' 
                ? 'Có câu hỏi về chính sách bảo mật? Liên hệ với chúng tôi:'
                : 'Questions about our privacy policy? Contact us:'}
            </p>
            <a 
              href="mailto:privacy@maitamsite.site"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium transition-colors"
            >
              <Mail className="w-5 h-5" />
              privacy@maitamsite.site
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
