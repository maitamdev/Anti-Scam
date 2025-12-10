'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

export default function AnimatedEye() {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const eyeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mouse tracking for eye movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return
      
      const eyeRect = eyeRef.current.getBoundingClientRect()
      const eyeCenterX = eyeRect.left + eyeRect.width / 2
      const eyeCenterY = eyeRect.top + eyeRect.height / 2
      
      // Calculate angle and distance from eye center to mouse
      const deltaX = e.clientX - eyeCenterX
      const deltaY = e.clientY - eyeCenterY
      const angle = Math.atan2(deltaY, deltaX)
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 20, 12)
      
      // Set eye position based on mouse
      setEyePosition({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Random blinking
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 3000 + Math.random() * 2000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(blinkInterval)
    }
  }, [])

  return (
    <div ref={eyeRef} className="relative w-20 h-20 flex items-center justify-center cursor-pointer">
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5] 
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Eye frame - blue metallic */}
      <motion.div
        className="relative w-full h-full"
        animate={{ scale: isBlinking ? [1, 0.9, 1] : 1 }}
        transition={{ duration: 0.15 }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 shadow-2xl">
          {/* Inner frame details */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-inner">
            {/* Eye white background */}
            <div className="absolute inset-2 bg-white rounded-full shadow-lg overflow-hidden">
              {/* Iris container */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ x: eyePosition.x, y: eyePosition.y }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
              >
                {/* Iris - blue with rings */}
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 shadow-xl">
                  {/* Inner iris ring */}
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600">
                    {/* Pupil */}
                    <motion.div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full shadow-lg"
                      animate={{ scale: [1, 0.95, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {/* Light reflection */}
                      <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-white rounded-full opacity-80" />
                      <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/40 rounded-full" />
                    </motion.div>
                    
                    {/* Iris pattern lines */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-[1px] h-3 bg-blue-700/50 top-1/2 left-1/2 origin-bottom"
                          style={{
                            transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Outer glow */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-400/50 to-transparent blur-sm" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Tech details on frame */}
        <div className="absolute inset-0 rounded-full">
          {[0, 90, 180, 270].map((angle, i) => (
            <div
              key={i}
              className="absolute w-1 h-2 bg-gray-600 rounded-sm"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-40px)`,
              }}
            />
          ))}
        </div>

        {/* Eyelids for blinking */}
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-gray-800 to-gray-700 rounded-t-full origin-bottom border-2 border-blue-600"
          animate={{ 
            scaleY: isBlinking ? 1 : 0,
            opacity: isBlinking ? 1 : 0 
          }}
          transition={{ duration: 0.1 }}
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-800 to-gray-700 rounded-b-full origin-top border-2 border-blue-600"
          animate={{ 
            scaleY: isBlinking ? 1 : 0,
            opacity: isBlinking ? 1 : 0 
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Pulsing glow effect */}
      <motion.div
        className="absolute inset-0 bg-blue-400/20 rounded-full blur-2xl -z-10"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  )
}
