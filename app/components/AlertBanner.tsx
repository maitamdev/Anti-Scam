'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Info, CheckCircle, XCircle, X } from 'lucide-react'
import { useState } from 'react'

interface Props {
  type?: 'info' | 'success' | 'warning' | 'error'
  title: string
  message?: string
  dismissible?: boolean
  onDismiss?: () => void
  action?: {
    label: string
    onClick: () => void
  }
}

export default function AlertBanner({ 
  type = 'info', 
  title, 
  message, 
  dismissible = true,
  onDismiss,
  action 
}: Props) {
  const [isVisible, setIsVisible] = useState(true)

  const config = {
    info: {
      icon: Info,
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      iconColor: 'text-blue-400',
      titleColor: 'text-blue-300'
    },
    success: {
      icon: CheckCircle,
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      iconColor: 'text-green-400',
      titleColor: 'text-green-300'
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      iconColor: 'text-yellow-400',
      titleColor: 'text-yellow-300'
    },
    error: {
      icon: XCircle,
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      iconColor: 'text-red-400',
      titleColor: 'text-red-300'
    }
  }[type]

  const Icon = config.icon

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`${config.bg} ${config.border} border rounded-xl p-4`}
        >
          <div className="flex items-start gap-3">
            <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              <p className={`font-semibold ${config.titleColor}`}>{title}</p>
              {message && (
                <p className="text-gray-400 text-sm mt-1">{message}</p>
              )}
              {action && (
                <button
                  onClick={action.onClick}
                  className={`mt-2 text-sm font-medium ${config.iconColor} hover:underline`}
                >
                  {action.label} →
                </button>
              )}
            </div>
            {dismissible && (
              <button
                onClick={handleDismiss}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
