'use client'

import { motion } from 'framer-motion'
import { Shield, AlertTriangle, XCircle } from 'lucide-react'

interface RiskBadgeProps {
  label: 'SAFE' | 'CAUTION' | 'DANGEROUS'
  size?: 'sm' | 'md' | 'lg'
}

const config = {
  SAFE: {
    icon: Shield,
    text: 'An toàn',
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-400',
    borderColor: 'border-green-500/50',
  },
  CAUTION: {
    icon: AlertTriangle,
    text: 'Cảnh báo',
    bgColor: 'bg-yellow-500/20',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/50',
  },
  DANGEROUS: {
    icon: XCircle,
    text: 'Nguy hiểm',
    bgColor: 'bg-red-500/20',
    textColor: 'text-red-400',
    borderColor: 'border-red-500/50',
  },
}

const sizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
}

const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}

export default function RiskBadge({ label, size = 'md' }: RiskBadgeProps) {
  const { icon: Icon, text, bgColor, textColor, borderColor } = config[label]

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1.5 rounded-full border ${bgColor} ${textColor} ${borderColor} ${sizes[size]} font-medium`}
    >
      <Icon className={iconSizes[size]} />
      {text}
    </motion.span>
  )
}
