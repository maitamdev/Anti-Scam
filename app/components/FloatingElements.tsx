'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, AlertTriangle, CheckCircle } from 'lucide-react'

const icons = [
  { Icon: Shield, color: 'text-blue-400', delay: 0 },
  { Icon: Lock, color: 'text-green-400', delay: 1 },
  { Icon: Eye, color: 'text-cyan-400', delay: 2 },
  { Icon: AlertTriangle, color: 'text-yellow-400', delay: 3 },
  { Icon: CheckCircle, color: 'text-emerald-400', delay: 4 },
]

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map(({ Icon, color, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color} opacity-10`}
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
          }}
          animate={{
            y: -100,
            x: [null, Math.random() * 100 - 50],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            delay: delay * 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
      ))}

      {/* Floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-32 h-32 rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              ['rgba(59,130,246,0.1)', 'rgba(6,182,212,0.1)', 'rgba(139,92,246,0.1)'][i % 3]
            } 0%, transparent 70%)`,
            left: `${20 + i * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  )
}
