'use client'

import { motion } from 'framer-motion'
import { Shield, Star, Zap, Lock } from 'lucide-react'

const trustBadges = [
  {
    icon: Shield,
    title: 'Miễn phí 100%',
    description: 'Không quảng cáo, không thu phí'
  },
  {
    icon: Star,
    title: 'AI Llama 3.3-70B',
    description: 'Công nghệ AI tiên tiến nhất'
  },
  {
    icon: Zap,
    title: 'Kết quả tức thì',
    description: 'Phân tích < 3 giây'
  },
  {
    icon: Lock,
    title: 'Bảo mật tuyệt đối',
    description: 'Không lưu trữ dữ liệu cá nhân'
  }
]

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
