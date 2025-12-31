'use client'

import { motion } from 'framer-motion'
import { LucideIcon, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Props {
  icon: LucideIcon
  title: string
  description: string
  value?: string | number
  href?: string
  gradient?: string
  delay?: number
}

export default function InfoCard({ 
  icon: Icon, 
  title, 
  description, 
  value,
  href,
  gradient = 'from-blue-500/20 to-cyan-500/20',
  delay = 0
}: Props) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`relative overflow-hidden bg-gradient-to-br ${gradient} rounded-2xl border border-white/10 p-6 ${href ? 'cursor-pointer hover:border-white/20 transition-colors group' : ''}`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <Icon className="w-6 h-6 text-white" />
          </div>
          {value && (
            <span className="text-2xl font-bold text-white">{value}</span>
          )}
          {href && (
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
