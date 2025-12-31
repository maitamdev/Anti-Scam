'use client'

import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Briefcase, 
  Heart, 
  Gift, 
  Phone, 
  Mail, 
  Bitcoin, 
  ShoppingBag,
  Building2,
  Smartphone
} from 'lucide-react'
import Link from 'next/link'

interface ScamType {
  id: string
  icon: React.ElementType
  titleVi: string
  titleEn: string
  descVi: string
  descEn: string
  color: string
  bgColor: string
  examples: string[]
}

const scamTypes: ScamType[] = [
  {
    id: 'banking',
    icon: CreditCard,
    titleVi: 'Giả mạo Ngân hàng',
    titleEn: 'Bank Phishing',
    descVi: 'Tin nhắn, email giả mạo ngân hàng yêu cầu xác minh tài khoản',
    descEn: 'Fake bank messages requesting account verification',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    examples: ['SMS giả VCB', 'Email giả BIDV', 'Link giả Techcombank']
  },
  {
    id: 'job',
    icon: Briefcase,
    titleVi: 'Việc làm Giả',
    titleEn: 'Fake Jobs',
    descVi: 'Tuyển dụng việc nhẹ lương cao, yêu cầu nạp tiền',
    descEn: 'Easy job high pay scams requiring deposits',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    examples: ['Like video kiếm tiền', 'Đánh giá app', 'Nhập liệu online']
  },
  {
    id: 'romance',
    icon: Heart,
    titleVi: 'Lừa Tình cảm',
    titleEn: 'Romance Scam',
    descVi: 'Giả làm người yêu, bạn bè để lừa tiền',
    descEn: 'Pretending to be lovers or friends to scam money',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    examples: ['Người nước ngoài', 'Quân nhân giả', 'Doanh nhân giả']
  },
  {
    id: 'prize',
    icon: Gift,
    titleVi: 'Trúng thưởng Giả',
    titleEn: 'Fake Prize',
    descVi: 'Thông báo trúng thưởng, yêu cầu nộp phí nhận quà',
    descEn: 'Fake winning notifications requiring fees',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    examples: ['Trúng iPhone', 'Trúng xe máy', 'Trúng tiền mặt']
  },
  {
    id: 'impersonation',
    icon: Phone,
    titleVi: 'Mạo danh Công an',
    titleEn: 'Police Impersonation',
    descVi: 'Giả công an, viện kiểm sát gọi điện đe dọa',
    descEn: 'Fake police calls threatening arrest',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    examples: ['Liên quan ma túy', 'Rửa tiền', 'Trốn thuế']
  },
  {
    id: 'investment',
    icon: Bitcoin,
    titleVi: 'Đầu tư Lừa đảo',
    titleEn: 'Investment Scam',
    descVi: 'Sàn giao dịch giả, hứa lợi nhuận cao',
    descEn: 'Fake trading platforms promising high returns',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    examples: ['Forex giả', 'Crypto scam', 'Chứng khoán giả']
  },
  {
    id: 'shopping',
    icon: ShoppingBag,
    titleVi: 'Mua hàng Online',
    titleEn: 'Online Shopping',
    descVi: 'Shop giả, hàng giả, không giao hàng',
    descEn: 'Fake shops, fake products, no delivery',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    examples: ['Hàng giá rẻ', 'Shop ảo', 'Hàng nhái']
  },
  {
    id: 'tech-support',
    icon: Smartphone,
    titleVi: 'Hỗ trợ Kỹ thuật',
    titleEn: 'Tech Support',
    descVi: 'Giả nhân viên hỗ trợ để chiếm quyền điều khiển',
    descEn: 'Fake tech support to gain remote access',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    examples: ['Microsoft giả', 'Apple giả', 'Ngân hàng giả']
  }
]

interface Props {
  language: string
}

export default function ScamTypeCards({ language }: Props) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {scamTypes.map((scam, index) => (
        <motion.div
          key={scam.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className={`${scam.bgColor} border border-white/10 rounded-xl p-5 cursor-pointer group`}
        >
          <div className={`w-12 h-12 rounded-xl ${scam.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <scam.icon className={`w-6 h-6 ${scam.color}`} />
          </div>
          
          <h3 className={`font-semibold ${scam.color} mb-2`}>
            {language === 'vi' ? scam.titleVi : scam.titleEn}
          </h3>
          
          <p className="text-sm text-gray-400 mb-3">
            {language === 'vi' ? scam.descVi : scam.descEn}
          </p>

          <div className="flex flex-wrap gap-1">
            {scam.examples.slice(0, 2).map((ex, i) => (
              <span key={i} className="text-xs px-2 py-0.5 bg-white/5 rounded text-gray-500">
                {ex}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
