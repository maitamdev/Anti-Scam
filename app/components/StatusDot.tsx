'use client'

import { motion } from 'framer-motion'

interface Props {
  status: 'online' | 'offline' | 'busy' | 'away' | 'success' | 'error' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
  label?: string
}

export default function StatusDot({ status, size = 'md', pulse = true, label }: Props) {
  const colors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500'
  }

  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className="inline-flex items-center gap-2">
      <span className="relative flex">
        <span className={`${sizes[size]} ${colors[status]} rounded-full`} />
        {pulse && (status === 'online' || status === 'success') && (
          <motion.span
            className={`absolute inset-0 ${colors[status]} rounded-full`}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </span>
      {label && (
        <span className={`${textSizes[size]} text-gray-400`}>{label}</span>
      )}
    </div>
  )
}
