'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Chrome, Shield, X, Zap, Bell, Lock, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface Props {
  language: string
}

export default function ExtensionBanner({ language }: Props) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const features = [
    { icon: Shield, textVi: 'Tự động cảnh báo website nguy hiểm', textEn: 'Auto-warn dangerous websites' },
    { icon: Zap, textVi: 'Kiểm tra link ngay khi hover', textEn: 'Check links on hover' },
    { icon: Bell, textVi: 'Thông báo lừa đảo mới nhất', textEn: 'Latest scam notifications' },
    { icon: Lock, textVi: 'Bảo vệ thông tin cá nhân', textEn: 'Protect personal info' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6 sm:p-8">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Left - Icon & Title */}
          <div className="flex-shrink-0 text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/25">
              <Chrome className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">
              {language === 'vi' ? 'Extension Trình duyệt' : 'Browser Extension'}
            </h3>
            <p className="text-sm text-gray-400">
              {language === 'vi' ? 'Bảo vệ bạn 24/7 khi lướt web' : 'Protect you 24/7 while browsing'}
            </p>
          </div>

          {/* Middle - Features */}
          <div className="flex-1 grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-sm"
              >
                <div className="p-1.5 bg-blue-500/20 rounded-lg">
                  <feature.icon className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <span className="text-gray-300 text-xs sm:text-sm">
                  {language === 'vi' ? feature.textVi : feature.textEn}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Right - CTA */}
          <div className="flex flex-col gap-2">
            <Link
              href="/extension"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold transition-all shadow-lg shadow-blue-500/25"
            >
              <Chrome className="w-5 h-5" />
              {language === 'vi' ? 'Cài đặt miễn phí' : 'Install Free'}
            </Link>
            <p className="text-xs text-gray-500 text-center">
              Chrome, Edge, Firefox
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-6 text-center">
          <div>
            <p className="text-lg font-bold text-blue-400">Beta</p>
            <p className="text-xs text-gray-500">{language === 'vi' ? 'Phiên bản' : 'Version'}</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="text-lg font-bold text-white">24/7</p>
            <p className="text-xs text-gray-500">{language === 'vi' ? 'Hoạt động' : 'Active'}</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="text-lg font-bold text-green-400">100%</p>
            <p className="text-xs text-gray-500">{language === 'vi' ? 'Miễn phí' : 'Free'}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
