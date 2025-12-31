'use client'

import { motion } from 'framer-motion'
import { Calendar, ArrowRight, AlertTriangle, Shield, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface Props {
  title: string
  excerpt: string
  date: string
  category: 'alert' | 'news' | 'tip'
  href: string
  image?: string
}

export default function NewsCard({ title, excerpt, date, category, href, image }: Props) {
  const categoryConfig = {
    alert: {
      icon: AlertTriangle,
      color: 'text-red-400',
      bg: 'bg-red-500/20',
      label: 'Cảnh báo'
    },
    news: {
      icon: TrendingUp,
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
      label: 'Tin tức'
    },
    tip: {
      icon: Shield,
      color: 'text-green-400',
      bg: 'bg-green-500/20',
      label: 'Mẹo hay'
    }
  }

  const config = categoryConfig[category]
  const Icon = config.icon

  return (
    <Link href={href}>
      <motion.article
        whileHover={{ y: -4 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-gray-600 transition-all group"
      >
        {image && (
          <div className="relative h-40 overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          </div>
        )}
        
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${config.bg} rounded-full text-xs font-medium ${config.color}`}>
              <Icon className="w-3 h-3" />
              {config.label}
            </span>
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">
            {excerpt}
          </p>
          
          <span className="inline-flex items-center gap-1 text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
            Đọc thêm
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </motion.article>
    </Link>
  )
}
