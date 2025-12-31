'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Lock } from 'lucide-react'
import { useTranslation } from '../lib/i18n/LanguageContext'

export default function TrustBadges() {
  const { language } = useTranslation()
  
  const trustBadges = [
    {
      icon: Shield,
      title: language === 'vi' ? 'Miễn phí 100%' : '100% Free',
      description: language === 'vi' ? 'Không quảng cáo, không thu phí' : 'No ads, no fees'
    },
    {
      icon: Zap,
      title: language === 'vi' ? 'Kết quả tức thì' : 'Instant Results',
      description: language === 'vi' ? 'Phân tích < 3 giây' : 'Analysis < 3 seconds'
    },
    {
      icon: Lock,
      title: language === 'vi' ? 'Bảo mật tuyệt đối' : 'Absolute Security',
      description: language === 'vi' ? 'Không lưu trữ dữ liệu cá nhân' : 'No personal data stored'
    }
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {trustBadges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-4 text-center group cursor-pointer"
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <badge.icon className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="font-semibold text-white text-sm mb-1">{badge.title}</h3>
          <p className="text-gray-400 text-xs">{badge.description}</p>
        </motion.div>
      ))}
    </div>
  )
}
