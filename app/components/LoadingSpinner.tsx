'use client'

import { motion } from 'framer-motion'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'shield' | 'scan' | 'dots'
  text?: string
}

export default function LoadingSpinner({ size = 'md', variant = 'default', text }: Props) {
  const sizes = {
    sm: { container: 'w-8 h-8', ring: 'w-6 h-6', dot: 'w-1.5 h-1.5' },
    md: { container: 'w-16 h-16', ring: 'w-12 h-12', dot: 'w-2 h-2' },
    lg: { container: 'w-24 h-24', ring: 'w-20 h-20', dot: 'w-3 h-3' }
  }

  const s = sizes[size]

  if (variant === 'shield') {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className={`relative ${s.container}`}>
          {/* Outer ring */}
          <motion.div
            className={`absolute inset-0 border-4 border-blue-500/30 rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          {/* Inner ring */}
          <motion.div
            className={`absolute inset-2 border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full`}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          {/* Shield icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg
              className="w-1/2 h-1/2 text-blue-400"
              viewBox="0 0 24 24"
              fill="currentColor"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </motion.svg>
          </div>
        </div>
        {text && <p className="text-gray-400 text-sm animate-pulse">{text}</p>}
      </div>
    )
  }

  if (variant === 'scan') {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className={`relative ${s.container}`}>
          {/* Radar effect */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(59, 130, 246, 0.4) 60deg, transparent 120deg)'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          {/* Pulse rings */}
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-blue-500/30"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
            />
          ))}
        </div>
        {text && <p className="text-gray-400 text-sm">{text}</p>}
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className={`${s.dot} bg-blue-400 rounded-full`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
        {text && <p className="text-gray-400 text-sm">{text}</p>}
      </div>
    )
  }

  // Default spinner
  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`relative ${s.container}`}>
        <motion.div
          className={`${s.ring} border-4 border-blue-500/30 border-t-blue-500 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      {text && <p className="text-gray-400 text-sm">{text}</p>}
    </div>
  )
}
