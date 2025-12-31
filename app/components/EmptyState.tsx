'use client'

import { motion } from 'framer-motion'
import { LucideIcon, Search, FileQuestion, Inbox } from 'lucide-react'
import Link from 'next/link'

interface Props {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  variant?: 'default' | 'search' | 'inbox'
}

export default function EmptyState({ 
  icon, 
  title, 
  description, 
  action,
  variant = 'default' 
}: Props) {
  const defaultIcons = {
    default: FileQuestion,
    search: Search,
    inbox: Inbox
  }

  const Icon = icon || defaultIcons[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="w-20 h-20 rounded-full bg-gray-800/50 flex items-center justify-center mb-6"
      >
        <Icon className="w-10 h-10 text-gray-500" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-white mb-2"
      >
        {title}
      </motion.h3>
      
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 max-w-md mb-6"
        >
          {description}
        </motion.p>
      )}
      
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {action.href ? (
            <Link
              href={action.href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
            >
              {action.label}
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
            >
              {action.label}
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
