'use client'

import { motion } from 'framer-motion'
import { LucideIcon, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Props {
  icon: LucideIcon
  title: string
  description?: string
  href: string
  gradient?: string
  compact?: boolean
}

export default function QuickAction({
  icon: Icon,
  title,
  description,
  href,
  gradient = 'from-blue-500 to-cyan-500',
  compact = false
}: Props) {
  if (compact) {
    return (
      <Link href={href}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 p-3 bg-gray-800/50 hover:bg-gray-800 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all group"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-medium group-hover:text-blue-400 transition-colors">{title}</span>
          <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 ml-auto transition-colors" />
        </motion.div>
      </Link>
    )
  }

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden bg-gray-800/50 hover:bg-gray-800 rounded-2xl border border-gray-700/50 hover:border-gray-600 p-6 transition-all group"
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
        
        <div className="relative z-10">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors flex items-center gap-2">
            {title}
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </h3>
          
          {description && (
            <p className="text-gray-400 text-sm">{description}</p>
          )}
        </div>
      </motion.div>
    </Link>
  )
}
