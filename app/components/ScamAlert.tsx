'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Shield, Clock, ExternalLink, X } from 'lucide-react'
import { useState } from 'react'

interface Props {
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  date?: string
  source?: string
  sourceUrl?: string
  dismissible?: boolean
  onDismiss?: () => void
}

export default function ScamAlert({
  title,
  description,
  severity,
  date,
  source,
  sourceUrl,
  dismissible = true,
  onDismiss
}: Props) {
  const [isVisible, setIsVisible] = useState(true)

  const severityConfig = {
    low: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: Shield,
      iconColor: 'text-blue-400',
      label: 'Thấp',
      labelBg: 'bg-blue-500/20'
    },
    medium: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      icon: AlertTriangle,
      iconColor: 'text-yellow-400',
      label: 'Trung bình',
      labelBg: 'bg-yellow-500/20'
    },
    high: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      icon: AlertTriangle,
      iconColor: 'text-orange-400',
      label: 'Cao',
      labelBg: 'bg-orange-500/20'
    },
    critical: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: AlertTriangle,
      iconColor: 'text-red-400',
      label: 'Nghiêm trọng',
      labelBg: 'bg-red-500/20'
    }
  }

  const config = severityConfig[severity]
  const Icon = config.icon

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${config.bg} ${config.border} border rounded-2xl p-5`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 ${config.labelBg} rounded-xl`}>
          <Icon className={`w-6 h-6 ${config.iconColor}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-white">{title}</h3>
            <span className={`px-2 py-0.5 ${config.labelBg} ${config.iconColor} rounded-full text-xs font-medium`}>
              {config.label}
            </span>
          </div>
          
          <p className="text-gray-400 text-sm mb-3">{description}</p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {date && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {date}
              </span>
            )}
            {source && (
              <span className="flex items-center gap-1">
                {sourceUrl ? (
                  <a 
                    href={sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                  >
                    {source}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  source
                )}
              </span>
            )}
          </div>
        </div>
        
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="p-1 text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  )
}
