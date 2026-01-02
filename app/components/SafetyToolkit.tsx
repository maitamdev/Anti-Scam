'use client'

import { motion } from 'framer-motion'
import { Bell, Download, Users, ScanSearch } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslation } from '../lib/i18n/LanguageContext'

const cards = [
  {
    icon: ScanSearch,
    action: '/scan',
    color: 'from-blue-500/20 via-cyan-500/10 to-blue-600/20',
    title: {
      vi: 'Kiểm tra tức thì',
      en: 'Instant check'
    },
    description: {
      vi: 'Quét URL, hình ảnh hoặc tin nhắn đáng ngờ chỉ với một cú nhấp.',
      en: 'Scan suspicious links, images, or messages in one tap.'
    }
  },
  {
    icon: Bell,
    action: '/alerts',
    color: 'from-amber-500/15 via-orange-500/10 to-amber-600/15',
    title: {
      vi: 'Cảnh báo nóng',
      en: 'Live alerts'
    },
    description: {
      vi: 'Cập nhật xu hướng lừa đảo mới nhất để tránh các chiêu trò mới.',
      en: 'Stay ahead of emerging scam trends with fresh alerts.'
    }
  },
  {
    icon: Download,
    action: '/extension',
    color: 'from-emerald-500/15 via-green-500/10 to-emerald-600/15',
    title: {
      vi: 'Cài extension',
      en: 'Install extension'
    },
    description: {
      vi: 'Bảo vệ trình duyệt 24/7 với cảnh báo và kiểm tra tự động.',
      en: 'Get always-on browser protection with automatic checks.'
    }
  },
  {
    icon: Users,
    action: '/community',
    color: 'from-indigo-500/15 via-purple-500/10 to-indigo-600/15',
    title: {
      vi: 'Cộng đồng hỗ trợ',
      en: 'Community support'
    },
    description: {
      vi: 'Học kinh nghiệm thực chiến từ cộng đồng và chuyên gia.',
      en: 'Learn real-world tips from peers and experts.'
    }
  }
]

export default function SafetyToolkit() {
  const router = useRouter()
  const { language } = useTranslation()

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
      {cards.map((card, index) => {
        const Icon = card.icon

        return (
          <motion.button
            key={card.action}
            onClick={() => router.push(card.action)}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            aria-label={language === 'vi' ? card.title.vi : card.title.en}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-40`} />
            <div className="relative flex items-start gap-4">
              <div className="rounded-xl bg-white/10 p-3 text-white shadow-inner">
                <Icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-cyan-200">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <p className="text-sm font-semibold text-cyan-100">
                    {language === 'vi' ? 'Bước tiếp theo' : 'Next step'}
                  </p>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {language === 'vi' ? card.title.vi : card.title.en}
                </h3>
                <p className="text-sm text-gray-200">
                  {language === 'vi' ? card.description.vi : card.description.en}
                </p>
              </div>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
