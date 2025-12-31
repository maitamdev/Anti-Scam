'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Phone, CreditCard, Briefcase, Gift, Heart, Bitcoin } from 'lucide-react'
import Link from 'next/link'

interface TrendItem {
  category: string
  labelVi: string
  labelEn: string
  icon: React.ElementType
  count: number
  trend: 'up' | 'down' | 'stable'
  change: number
  color: string
}

const trendData: TrendItem[] = [
  { category: 'banking', labelVi: 'Giả mạo ngân hàng', labelEn: 'Bank Phishing', icon: CreditCard, count: 1247, trend: 'up', change: 23, color: 'text-red-400' },
  { category: 'job', labelVi: 'Việc làm giả', labelEn: 'Fake Jobs', icon: Briefcase, count: 892, trend: 'up', change: 15, color: 'text-orange-400' },
  { category: 'investment', labelVi: 'Đầu tư lừa đảo', labelEn: 'Investment Scam', icon: Bitcoin, count: 756, trend: 'down', change: 8, color: 'text-yellow-400' },
  { category: 'prize', labelVi: 'Trúng thưởng giả', labelEn: 'Fake Prize', icon: Gift, count: 534, trend: 'stable', change: 2, color: 'text-purple-400' },
  { category: 'romance', labelVi: 'Lừa tình cảm', labelEn: 'Romance Scam', icon: Heart, count: 423, trend: 'up', change: 12, color: 'text-pink-400' },
  { category: 'impersonation', labelVi: 'Mạo danh công an', labelEn: 'Police Impersonation', icon: Shield, count: 312, trend: 'up', change: 31, color: 'text-blue-400' },
]

interface Props {
  language: string
}

export default function ScamTrendWidget({ language }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <TrendingUp className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">
              {language === 'vi' ? 'Xu hướng Lừa đảo' : 'Scam Trends'}
            </h3>
            <p className="text-xs text-gray-500">
              {language === 'vi' ? 'Cập nhật 7 ngày qua' : 'Last 7 days'}
            </p>
          </div>
        </div>
        <Link 
          href="/alerts" 
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          {language === 'vi' ? 'Xem tất cả →' : 'View all →'}
        </Link>
      </div>

      <div className="space-y-3">
        {trendData.slice(0, 5).map((item, index) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}>
              <item.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {language === 'vi' ? item.labelVi : item.labelEn}
              </p>
              <p className="text-xs text-gray-500">
                {item.count.toLocaleString()} {language === 'vi' ? 'vụ' : 'cases'}
              </p>
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${
              item.trend === 'up' ? 'text-red-400' : 
              item.trend === 'down' ? 'text-green-400' : 'text-gray-400'
            }`}>
              {item.trend === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : item.trend === 'down' ? (
                <TrendingDown className="w-3 h-3" />
              ) : null}
              {item.trend !== 'stable' && `${item.change}%`}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Warning Banner */}
      <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-300">
            {language === 'vi' 
              ? 'Cảnh báo: Lừa đảo mạo danh công an đang tăng mạnh 31% trong tuần qua!'
              : 'Warning: Police impersonation scams increased 31% this week!'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
