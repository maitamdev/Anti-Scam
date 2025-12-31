'use client'

import { motion } from 'framer-motion'
import { FileText, ArrowLeft, CheckCircle, XCircle, AlertTriangle, Scale, Mail } from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useTranslation } from '../lib/i18n/LanguageContext'

export default function TermsPage() {
  const { language } = useTranslation()

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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-6">
              <FileText className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'vi' ? 'Điều khoản Sử dụng' : 'Terms of Service'}
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {language === 'vi' 
                ? 'Vui lòng đọc kỹ các điều khoản này trước khi sử dụng dịch vụ ANTI-SCAM.'
                : 'Please read these terms carefully before using the ANTI-SCAM service.'}
            </p>
            <p className="text-sm text-gray-500 mt-4">
              {language === 'vi' ? 'Cập nhật lần cuối: 01/01/2026' : 'Last updated: January 1, 2026'}
            </p>
          </motion.div>

          {/* Acceptance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-900/10 border border-gray-800 rounded-xl p-6 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-400" />
              {language === 'vi' ? '1. Chấp nhận Điều khoản' : '1. Acceptance of Terms'}
            </h2>
            <p className="text-gray-300">
              {language === 'vi' 
                ? 'Bằng việc truy cập và sử dụng website ANTI-SCAM (maitamsite.site), bạn đồng ý tuân thủ các điều khoản này. Nếu bạn không đồng ý với bất kỳ phần nào, vui lòng không sử dụng dịch vụ.'
                : 'By accessing and using the ANTI-SCAM website (maitamsite.site), you agree to comply with these terms. If you do not agree with any part, please do not use the service.'}
            </p>
          </motion.div>

          {/* Service Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-blue-900/10 border border-gray-800 rounded-xl p-6 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">
              {language === 'vi' ? '2. Mô tả Dịch vụ' : '2. Service Description'}
            </h2>
            <p className="text-gray-300 mb-4">
              {language === 'vi' 
                ? 'ANTI-SCAM cung cấp các công cụ hỗ trợ phát hiện website và tin nhắn lừa đảo, bao gồm:'
                : 'ANTI-SCAM provides tools to help detect scam websites and messages, including:'}
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                {language === 'vi' ? 'Kiểm tra URL website' : 'Website URL checking'}
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                {language === 'vi' ? 'Phân tích hình ảnh tin nhắn' : 'Message image analysis'}
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                {language === 'vi' ? 'Tra cứu số tài khoản/email/SĐT đáng ngờ' : 'Lookup suspicious accounts/emails/phones'}
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                {language === 'vi' ? 'Quiz kiến thức chống lừa đảo' : 'Anti-scam knowledge quiz'}
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                {language === 'vi' ? 'Cảnh báo lừa đảo mới nhất' : 'Latest scam alerts'}
              </li>
            </ul>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              {language === 'vi' ? '3. Giới hạn Trách nhiệm' : '3. Disclaimer'}
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                {language === 'vi' 
                  ? '⚠️ Kết quả kiểm tra của ANTI-SCAM chỉ mang tính chất THAM KHẢO, không đảm bảo 100% chính xác.'
                  : '⚠️ ANTI-SCAM check results are for REFERENCE only, not guaranteed to be 100% accurate.'}
              </p>
              <p>
                {language === 'vi' 
                  ? '⚠️ Chúng tôi KHÔNG chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không sử dụng thông tin từ dịch vụ.'
                  : '⚠️ We are NOT responsible for any damages arising from using or not using information from the service.'}
              </p>
              <p>
                {language === 'vi' 
                  ? '⚠️ Công cụ này KHÔNG thay thế cho sự cảnh giác cá nhân và xác minh trực tiếp với các tổ chức chính thức.'
                  : '⚠️ This tool does NOT replace personal vigilance and direct verification with official organizations.'}
              </p>
            </div>
          </motion.div>

          {/* Prohibited Uses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              {language === 'vi' ? '4. Hành vi Bị Cấm' : '4. Prohibited Uses'}
            </h2>
            <p className="text-gray-300 mb-4">
              {language === 'vi' ? 'Bạn KHÔNG được:' : 'You must NOT:'}
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                {language === 'vi' ? 'Sử dụng dịch vụ để thực hiện hoặc hỗ trợ hành vi lừa đảo' : 'Use the service to commit or assist in fraud'}
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                {language === 'vi' ? 'Gửi báo cáo sai sự thật để hãm hại người khác' : 'Submit false reports to harm others'}
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                {language === 'vi' ? 'Tấn công, spam, hoặc làm quá tải hệ thống' : 'Attack, spam, or overload the system'}
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                {language === 'vi' ? 'Sao chép, phân phối lại dịch vụ mà không có sự cho phép' : 'Copy or redistribute the service without permission'}
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                {language === 'vi' ? 'Sử dụng API mà không có sự đồng ý' : 'Use the API without consent'}
              </li>
            </ul>
          </motion.div>

          {/* User Responsibilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-900/10 border border-gray-800 rounded-xl p-6 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">
              {language === 'vi' ? '5. Trách nhiệm của Người dùng' : '5. User Responsibilities'}
            </h2>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                {language === 'vi' ? 'Cung cấp thông tin chính xác khi báo cáo lừa đảo' : 'Provide accurate information when reporting scams'}
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                {language === 'vi' ? 'Tự xác minh thông tin trước khi đưa ra quyết định quan trọng' : 'Verify information yourself before making important decisions'}
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                {language === 'vi' ? 'Liên hệ cơ quan chức năng nếu bị lừa đảo' : 'Contact authorities if you are scammed'}
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                {language === 'vi' ? 'Không chia sẻ OTP, mật khẩu cho bất kỳ ai' : 'Never share OTP or passwords with anyone'}
              </li>
            </ul>
          </motion.div>

          {/* Free Service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">
              {language === 'vi' ? '6. Dịch vụ Miễn phí' : '6. Free Service'}
            </h2>
            <p className="text-gray-300">
              {language === 'vi' 
                ? 'ANTI-SCAM là dịch vụ miễn phí, không giới hạn sử dụng, không quảng cáo. Chúng tôi có quyền thay đổi, tạm ngưng hoặc ngừng cung cấp dịch vụ bất cứ lúc nào mà không cần thông báo trước.'
                : 'ANTI-SCAM is a free service with unlimited use and no ads. We reserve the right to modify, suspend, or discontinue the service at any time without prior notice.'}
            </p>
          </motion.div>

          {/* Changes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-900/10 border border-gray-800 rounded-xl p-6 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">
              {language === 'vi' ? '7. Thay đổi Điều khoản' : '7. Changes to Terms'}
            </h2>
            <p className="text-gray-300">
              {language === 'vi' 
                ? 'Chúng tôi có thể cập nhật điều khoản này bất cứ lúc nào. Việc tiếp tục sử dụng dịch vụ sau khi thay đổi đồng nghĩa với việc bạn chấp nhận điều khoản mới.'
                : 'We may update these terms at any time. Continued use of the service after changes means you accept the new terms.'}
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-center"
          >
            <p className="text-gray-400 mb-4">
              {language === 'vi' 
                ? 'Có câu hỏi về điều khoản sử dụng? Liên hệ với chúng tôi:'
                : 'Questions about terms of service? Contact us:'}
            </p>
            <a 
              href="mailto:support@maitamsite.site"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-medium transition-colors"
            >
              <Mail className="w-5 h-5" />
              support@maitamsite.site
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
