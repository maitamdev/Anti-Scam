'use client'

import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <div className="text-center">
        {/* Premium Shield Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-blue-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Middle ring with gradient */}
          <motion.div
            className="absolute inset-2 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(59, 130, 246, 0.5) 90deg, transparent 180deg)'
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner ring */}
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-cyan-400/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Center shield icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Shield className="w-8 h-8 text-blue-400" />
            </motion.div>
          </div>

          {/* Pulse rings */}
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-blue-500/20"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: 'easeOut'
              }}
            />
          ))}

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl" />
        </div>

        {/* Loading text with animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.p
            className="text-gray-300 font-medium text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Đang tải...
          </motion.p>
          <p className="text-gray-500 text-sm mt-2">ANTI-SCAM đang tải...</p>
        </motion.div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
