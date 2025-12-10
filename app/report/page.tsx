'use client'

import { motion } from 'framer-motion'
import { Flag, Shield, AlertTriangle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ReportForm from '../components/ReportForm'

export default function ReportPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <Flag className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Báo cáo Website Lừa đảo</h1>
              <p className="text-gray-400">
                Giúp cộng đồng bằng cách báo cáo các website đáng ngờ
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
            >
              <ReportForm />
            </motion.div>

            {/* Info boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
              >
                <Shield className="w-8 h-8 text-blue-400 mb-2" />
                <h3 className="font-semibold mb-1">Bảo vệ cộng đồng</h3>
                <p className="text-sm text-gray-400">
                  Mỗi báo cáo của bạn giúp AI học hỏi và bảo vệ hàng nghìn người khác
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4"
              >
                <AlertTriangle className="w-8 h-8 text-yellow-400 mb-2" />
                <h3 className="font-semibold mb-1">Xác minh nhanh chóng</h3>
                <p className="text-sm text-gray-400">
                  Đội ngũ admin sẽ xác minh báo cáo trong vòng 24 giờ
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
