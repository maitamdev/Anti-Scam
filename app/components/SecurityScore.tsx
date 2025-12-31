'use client'

import { motion } from 'framer-motion'
import { Shield, ShieldAlert, ShieldX, ShieldCheck } from 'lucide-react'

interface Props {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  animated?: boolean
  language?: string
}

export default function SecurityScore({ 
  score, 
  size = 'md', 
  showLabel = true,
  animated = true,
  language = 'vi'
}: Props) {
  const getConfig = () => {
    if (score <= 30) {
      return {
        color: 'text-green-400',
        bgColor: 'bg-green-500/20',
        borderColor: 'border-green-500/30',
        glowColor: 'shadow-green-500/20',
        Icon: ShieldCheck,
        label: language === 'vi' ? 'An toàn' : 'Safe',
        gradient: 'from-green-500 to-emerald-500'
      }
    } else if (score <= 60) {
      return {
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20',
        borderColor: 'border-yellow-500/30',
        glowColor: 'shadow-yellow-500/20',
        Icon: ShieldAlert,
        label: language === 'vi' ? 'Cảnh báo' : 'Warning',
        gradient: 'from-yellow-500 to-orange-500'
      }
    } else {
      return {
        color: 'text-red-400',
        bgColor: 'bg-red-500/20',
        borderColor: 'border-red-500/30',
        glowColor: 'shadow-red-500/20',
        Icon: ShieldX,
        label: language === 'vi' ? 'Nguy hiểm' : 'Dangerous',
        gradient: 'from-red-500 to-rose-500'
      }
    }
  }

  const config = getConfig()
  const { Icon } = config

  const sizes = {
    sm: { container: 'w-20 h-20', icon: 'w-6 h-6', text: 'text-lg', label: 'text-xs' },
    md: { container: 'w-32 h-32', icon: 'w-10 h-10', text: 'text-3xl', label: 'text-sm' },
    lg: { container: 'w-44 h-44', icon: 'w-14 h-14', text: 'text-5xl', label: 'text-base' }
  }

  const s = sizes[size]
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${s.container}`}>
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-700/50"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: animated ? strokeDashoffset : circumference }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={`${config.gradient.split(' ')[0].replace('from-', 'text-')}`} stopColor="currentColor" />
              <stop offset="100%" className={`${config.gradient.split(' ')[1].replace('to-', 'text-')}`} stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          >
            <Icon className={`${s.icon} ${config.color} mb-1`} />
          </motion.div>
          <motion.span
            className={`${s.text} font-bold ${config.color}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {score}
          </motion.span>
        </div>

        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full ${config.bgColor} blur-xl opacity-50`} />
      </div>

      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className={`mt-3 px-4 py-1.5 rounded-full ${config.bgColor} border ${config.borderColor}`}
        >
          <span className={`${s.label} font-semibold ${config.color}`}>
            {config.label}
          </span>
        </motion.div>
      )}
    </div>
  )
}
