'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface Props {
  icon: LucideIcon
  label: string
  value: string | number
  subValue?: string
  gradient: string
  delay?: number
}

export default function StatsCard({ icon: Icon, label, value, subValue, gradient, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`relative overflow-hidden bg-gradient-to-br ${gradient} p-5 rounded-xl border border-white/10`}
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
            <Icon className="w-5 h-5 text-white/90" />
          </div>
          <span className="text-sm text-white/70">{label}</span>
        </div>
        <motion.p 
          className="text-3xl font-bold text-white"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, type: 'spring' }}
        >
          {value}
        </motion.p>
        {subValue && (
          <p className="text-xs text-white/50 mt-1">{subValue}</p>
        )}
      </div>
    </motion.div>
  )
}
