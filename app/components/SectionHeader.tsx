'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface Props {
  icon?: LucideIcon
  badge?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  gradient?: string
}

export default function SectionHeader({
  icon: Icon,
  badge,
  title,
  description,
  align = 'center',
  gradient = 'from-blue-400 to-cyan-400'
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}
    >
      {badge && (
        <div className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4 ${align === 'center' ? '' : ''}`}>
          {Icon && <Icon className="w-4 h-4 text-blue-400" />}
          <span className="text-sm text-blue-400 font-medium">{badge}</span>
        </div>
      )}
      
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {title}
      </h2>
      
      {description && (
        <p className={`text-gray-400 ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
