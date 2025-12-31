'use client'

import { motion } from 'framer-motion'
import { Shield, ShieldAlert, ShieldX, ShieldCheck, AlertTriangle } from 'lucide-react'

interface Props {
  level: 'safe' | 'low' | 'medium' | 'high' | 'critical'
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  language?: string
}

export default function ThreatIndicator({ 
  level, 
  showLabel = true, 
  size = 'md',
  animated = true,
  language = 'vi'
}: Props) {
  const config = {
    safe: {
      icon: ShieldCheck,
      color: 'text-green-400',
      bg: 'bg-green-500/20',
      border: 'border-green-500/30',
      label: language === 'vi' ? 'An toàn' : 'Safe',
      bars: 1
    },
    low: {
      icon: Shield,
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/30',
      label: language === 'vi' ? 'Rủi ro thấp' : 'Low Risk',
      bars: 2
    },
    medium: {
      icon: ShieldAlert,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-500/30',
      label: language === 'vi' ? 'Rủi ro trung bình' : 'Medium Risk',
      bars: 3
    },
    high: {
      icon: AlertTriangle,
      color: 'text-orange-400',
      bg: 'bg-orange-500/20',
      border: 'border-orange-500/30',
      label: language === 'vi' ? 'Rủi ro cao' : 'High Risk',
      bars: 4
    },
    critical: {
      icon: ShieldX,
      color: 'text-red-400',
      bg: 'bg-red-500/20',
      border: 'border-red-500/30',
      label: language === 'vi' ? 'Nguy hiểm' : 'Critical',
      bars: 5
    }
  }[level]

  const sizes = {
    sm: { icon: 'w-4 h-4', text: 'text-xs', bar: 'h-3 w-1', gap: 'gap-0.5' },
    md: { icon: 'w-5 h-5', text: 'text-sm', bar: 'h-4 w-1.5', gap: 'gap-1' },
    lg: { icon: 'w-6 h-6', text: 'text-base', bar: 'h-5 w-2', gap: 'gap-1' }
  }

  const s = sizes[size]
  const Icon = config.icon

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.bg} border ${config.border}`}>
      <motion.div
        animate={animated && level === 'critical' ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <Icon className={`${s.icon} ${config.color}`} />
      </motion.div>
      
      {/* Threat level bars */}
      <div className={`flex ${s.gap}`}>
        {[1, 2, 3, 4, 5].map(bar => (
          <motion.div
            key={bar}
            className={`${s.bar} rounded-full ${bar <= config.bars ? config.color.replace('text-', 'bg-') : 'bg-gray-600'}`}
            initial={animated ? { scaleY: 0 } : { scaleY: 1 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: bar * 0.1 }}
          />
        ))}
      </div>
      
      {showLabel && (
        <span className={`${s.text} font-medium ${config.color}`}>
          {config.label}
        </span>
      )}
    </div>
  )
}
