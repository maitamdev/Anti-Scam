'use client'

import { motion } from 'framer-motion'
import { Flag, Shield, AlertTriangle, ArrowLeft, Users, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ReportForm from '../components/ReportForm'
import GlowingCard from '../components/GlowingCard'
import { useTranslation } from '../lib/i18n/LanguageContext'

export default function ReportPage() {
  const { t, language } = useTranslation()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>{t.reportPage.backToHome}</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl mb-4 shadow-lg shadow-red-500/25"
              >
                <Flag className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                {t.reportPage.title}
              </h1>
              <p className="text-gray-400 max-w-xl mx-auto">
                {t.reportPage.subtitle}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center gap-8 mb-8"
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-white">1,234+</p>
                <p className="text-xs text-gray-500">{language === 'vi' ? 'Báo cáo' : 'Reports'}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">89%</p>
                <p className="text-xs text-gray-500">{language === 'vi' ? 'Đã xử lý' : 'Processed'}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">24h</p>
                <p className="text-xs text-gray-500">{language === 'vi' ? 'Phản hồi' : 'Response'}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <GlowingCard glowColor="rgba(239, 68, 68, 0.3)">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <ReportForm />
                </div>
              </GlowingCard>
            </motion.div>

            {/* Info boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-5"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2 text-white">{t.reportPage.protectCommunity.title}</h3>
                <p className="text-sm text-gray-400">
                  {t.reportPage.protectCommunity.desc}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-5"
              >
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="font-semibold mb-2 text-white">{t.reportPage.quickVerify.title}</h3>
                <p className="text-sm text-gray-400">
                  {t.reportPage.quickVerify.desc}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-5"
              >
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-semibold mb-2 text-white">
                  {language === 'vi' ? 'Cộng đồng mạnh mẽ' : 'Strong Community'}
                </h3>
                <p className="text-sm text-gray-400">
                  {language === 'vi' 
                    ? 'Cùng nhau xây dựng cộng đồng an toàn hơn'
                    : 'Together we build a safer community'}
                </p>
              </motion.div>
            </div>

            {/* Process steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-8 bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50"
            >
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                {language === 'vi' ? 'Quy trình xử lý báo cáo' : 'Report Processing'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { step: 1, title: language === 'vi' ? 'Gửi báo cáo' : 'Submit', desc: language === 'vi' ? 'Điền thông tin chi tiết' : 'Fill in details' },
                  { step: 2, title: language === 'vi' ? 'Xác minh' : 'Verify', desc: language === 'vi' ? 'Đội ngũ kiểm tra' : 'Team reviews' },
                  { step: 3, title: language === 'vi' ? 'Phân tích' : 'Analyze', desc: language === 'vi' ? 'AI phân tích dữ liệu' : 'AI analyzes data' },
                  { step: 4, title: language === 'vi' ? 'Cập nhật' : 'Update', desc: language === 'vi' ? 'Thêm vào database' : 'Add to database' },
                ].map((item, index) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
