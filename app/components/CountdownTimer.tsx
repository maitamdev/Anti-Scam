'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

interface Props {
  seconds: number
  onComplete?: () => void
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
}

export default function CountdownTimer({ seconds, onComplete, size = 'md', showIcon = true }: Props) {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (timeLeft <= 0 && onComplete) {
        onComplete()
      }
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isRunning, onComplete])

  const progress = (timeLeft / seconds) * 100
  const isLow = timeLeft <= 10
  const isCritical = timeLeft <= 5

  const sizes = {
    sm: { container: 'w-16 h-16', text: 'text-lg', icon: 'w-3 h-3' },
    md: { container: 'w-24 h-24', text: 'text-2xl', icon: 'w-4 h-4' },
    lg: { container: 'w-32 h-32', text: 'text-4xl', icon: 'w-5 h-5' }
  }

  const s = sizes[size]
  const circumference = 2 * Math.PI * 45

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
    const remainingSecs = secs % 60
    if (mins > 0) {
      return `${mins}:${remainingSecs.toString().padStart(2, '0')}`
    }
    return secs.toString()
  }

  return (
    <div className={`relative ${s.container}`}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-gray-700/50"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={isCritical ? '#ef4444' : isLow ? '#f59e0b' : '#3b82f6'}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          className="transition-all duration-1000"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showIcon && (
          <Clock className={`${s.icon} ${isCritical ? 'text-red-400' : isLow ? 'text-yellow-400' : 'text-blue-400'} mb-1`} />
        )}
        <motion.span
          className={`${s.text} font-bold ${isCritical ? 'text-red-400' : isLow ? 'text-yellow-400' : 'text-white'}`}
          animate={isCritical ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: isCritical ? Infinity : 0 }}
        >
          {formatTime(timeLeft)}
        </motion.span>
      </div>

      {/* Pulse effect when critical */}
      {isCritical && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-red-500"
          animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </div>
  )
}
