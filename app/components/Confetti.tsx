'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ConfettiPiece {
  id: number
  x: number
  color: string
  delay: number
  rotation: number
  size: number
}

interface Props {
  active: boolean
  duration?: number
  pieces?: number
}

export default function Confetti({ active, duration = 3000, pieces = 50 }: Props) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  const colors = [
    '#3b82f6', // blue
    '#22c55e', // green
    '#f59e0b', // yellow
    '#ef4444', // red
    '#8b5cf6', // purple
    '#06b6d4', // cyan
    '#ec4899', // pink
  ]

  useEffect(() => {
    if (active) {
      const newConfetti: ConfettiPiece[] = Array.from({ length: pieces }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
        size: Math.random() * 8 + 4
      }))
      setConfetti(newConfetti)

      const timer = setTimeout(() => {
        setConfetti([])
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [active, duration, pieces])

  return (
    <AnimatePresence>
      {confetti.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confetti.map(piece => (
            <motion.div
              key={piece.id}
              className="absolute"
              style={{
                left: `${piece.x}%`,
                top: -20,
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              }}
              initial={{ 
                y: -20, 
                rotate: 0,
                opacity: 1 
              }}
              animate={{ 
                y: window.innerHeight + 100,
                rotate: piece.rotation + 720,
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: piece.delay,
                ease: 'easeOut'
              }}
              exit={{ opacity: 0 }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
