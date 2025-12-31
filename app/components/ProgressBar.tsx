'use client'

import { motion } from 'framer-motion'

interface Props {
  progress: number
  variant?: 'default' | 'gradient' | 'striped' | 'glow'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  label?: string
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
}

export default function ProgressBar({
  progress,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  color = 'blue'
}: Props) {
  const clampedProgress = Math.min(100, Math.max(0, progress))

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  }

  const colors = {
    blue: { bg: 'bg-blue-500', glow: 'shadow-blue-500/50' },
    green: { bg: 'bg-green-500', glow: 'shadow-green-500/50' },
    yellow: { bg: 'bg-yellow-500', glow: 'shadow-yellow-500/50' },
    red: { bg: 'bg-red-500', glow: 'shadow-red-500/50' },
    purple: { bg: 'bg-purple-500', glow: 'shadow-purple-500/50' }
  }

  const gradients = {
    blue: 'from-blue-600 to-cyan-400',
    green: 'from-green-600 to-emerald-400',
    yellow: 'from-yellow-600 to-orange-400',
    red: 'from-red-600 to-rose-400',
    purple: 'from-purple-600 to-pink-400'
  }

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">{label || 'Progress'}</span>
          <span className="text-sm font-medium text-white">{Math.round(clampedProgress)}%</span>
        </div>
      )}
      
      <div className={`w-full ${sizes[size]} bg-gray-700/50 rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full rounded-full ${
            variant === 'gradient' 
              ? `bg-gradient-to-r ${gradients[color]}` 
              : colors[color].bg
          } ${variant === 'glow' ? `shadow-lg ${colors[color].glow}` : ''}`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            backgroundSize: variant === 'striped' ? '1rem 1rem' : undefined,
            backgroundImage: variant === 'striped' 
              ? 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)'
              : undefined,
            animation: variant === 'striped' ? 'progress-stripes 1s linear infinite' : undefined
          }}
        />
      </div>

      <style jsx>{`
        @keyframes progress-stripes {
          from { background-position: 1rem 0; }
          to { background-position: 0 0; }
        }
      `}</style>
    </div>
  )
}
