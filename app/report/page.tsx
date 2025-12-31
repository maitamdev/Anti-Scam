'use client'

import { motion } from 'framer-motion'
import { Flag, Shield, AlertTriangle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ReportForm from '../components/ReportForm'
import { useTranslation } from '../lib/i18n/LanguageContext'

export default function ReportPage() {
  const { t } = useTranslation()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
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
              <Flag className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">{t.reportPage.title}</h1>
              <p className="text-gray-400">
                {t.reportPage.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30"
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
                <h3 className="font-semibold mb-1">{t.reportPage.protectCommunity.title}</h3>
                <p className="text-sm text-gray-400">
                  {t.reportPage.protectCommunity.desc}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4"
              >
                <AlertTriangle className="w-8 h-8 text-yellow-400 mb-2" />
                <h3 className="font-semibold mb-1">{t.reportPage.quickVerify.title}</h3>
                <p className="text-sm text-gray-400">
                  {t.reportPage.quickVerify.desc}
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
