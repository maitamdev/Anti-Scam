'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

export default function AnimatedCounter({ 
  end, 
  duration = 2, 
  prefix = '', 
  suffix = '',
  className = '',
  decimals = 0
}: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      
      // Easing function (ease-out-expo)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      setCount(eased * end)

      if (now < endTime) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals)
    }
    return Math.round(num).toLocaleString()
  }

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className={className}
    >
      {prefix}{formatNumber(count)}{suffix}
    </motion.span>
  )
}
