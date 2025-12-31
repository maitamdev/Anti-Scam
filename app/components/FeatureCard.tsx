'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface Props {
  icon: LucideIcon
  title: string
  description: string
  href: string
  gradient: string
  delay?: number
}

export default function FeatureCard({ icon: Icon, title, description, href, gradient, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <Link href={href} className="block group">
        <div className="relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 transition-all duration-300 hover:border-gray-600 hover:bg-gray-800/70">
          {/* Hover glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
          
          {/* Icon */}
          <div className={`relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* Arrow indicator */}
          <motion.div
            className="absolute bottom-4 right-4 text-gray-600 group-hover:text-blue-400 transition-colors"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
          >
            →
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}
