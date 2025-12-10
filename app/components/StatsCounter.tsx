'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Stat {
  value: string
  label: string
  suffix?: string
}

export default function StatsCounter({ stats }: { stats: Stat[] }) {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0))

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      const target = parseInt(stat.value.replace(/[^0-9]/g, ''))
      const duration = 2000 // 2 seconds
      const steps = 60
      const increment = target / steps
      let current = 0

      return setInterval(() => {
        current += increment
        if (current >= target) {
          setCounts(prev => {
            const newCounts = [...prev]
            newCounts[index] = target
            return newCounts
          })
          clearInterval(timers[index])
        } else {
          setCounts(prev => {
            const newCounts = [...prev]
            newCounts[index] = Math.floor(current)
            return newCounts
          })
        }
      }, duration / steps)
    })

    return () => timers.forEach(timer => clearInterval(timer))
  }, [stats])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          className="text-center group"
        >
          <motion.p 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.1 }}
          >
            {counts[index].toLocaleString()}{stat.suffix || '+'}
          </motion.p>
          <p className="text-gray-400 text-sm sm:text-base mt-2 font-medium">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}
