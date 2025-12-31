'use client'

import { motion } from 'framer-motion'
import { LucideIcon, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Props {
  icon: LucideIcon
  title: string
  description: string
  href: string
  gradient: string
  badge?: string
  delay?: number
}

export default function ToolCard({ 
  icon: Icon, 
  title, 
  description, 
  href, 
  gradient,
  badge,
  delay = 0 
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <Link href={href} className="block group">
        <div className="relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 transition-all duration-300 hover:border-gray-600 hover:bg-gray-800/70 hover:shadow-xl hover:shadow-blue-500/5">
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
          
          {/* Badge */}
          {badge && (
            <div className="absolute top-4 right-4">
              <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
                {badge}
              </span>
            </div>
          )}
          
          {/* Icon */}
          <div className={`relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors flex items-center gap-2">
              {title}
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* Bottom gradient line */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        </div>
      </Link>
    </motion.div>
  )
}
