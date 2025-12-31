'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LucideIcon } from 'lucide-react'

interface Props {
  value: number
  label: string
  icon?: LucideIcon
  prefix?: string
  suffix?: string
  duration?: number
  gradient?: string
}

export default function StatNumber({
  value,
  label,
  icon: Icon,
  prefix = '',
  suffix = '',
  duration = 2,
  gradient = 'from-blue-400 to-cyan-400'
}: Props) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(count, value, { duration })
    
    const unsubscribe = rounded.on('change', (v) => {
      setDisplayValue(v)
    })

    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [value, duration, count, rounded])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      {Icon && (
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-20 mb-3`}>
          <Icon className={`w-6 h-6 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }} />
        </div>
      )}
      <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <p className="text-gray-400 mt-2">{label}</p>
    </motion.div>
  )
}
