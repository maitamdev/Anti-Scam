'use client'

import { motion } from 'framer-motion'
import { LucideIcon, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Props {
  icon?: LucideIcon
  title: string
  description?: string
  backHref?: string
  backLabel?: string
  gradient?: string
  badge?: string
}

export default function PageHeader({ 
  icon: Icon, 
  title, 
  description, 
  backHref,
  backLabel = 'Quay lại',
  gradient = 'from-blue-400 to-cyan-400',
  badge
}: Props) {
  return (
    <div className="mb-8">
      {backHref && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            href={backHref}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{backLabel}</span>
          </Link>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {Icon && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} mb-4 shadow-lg`}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
        )}
        
        <div className="flex items-center justify-center gap-3 mb-3">
          <h1 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {title}
          </h1>
          {badge && (
            <span className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
              {badge}
            </span>
          )}
        </div>
        
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
