'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface AnimatedEyeProps {
  size?: 'sm' | 'md' | 'lg'
}

export default function AnimatedEye({ size = 'md' }: AnimatedEyeProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const eyeRef = useRef<HTMLDivElement>(null)

  // Size configurations
  const sizeConfig = {
    sm: { container: 40, iris: 16, pupil: 8, maxMove: 6 },
    md: { container: 56, iris: 22, pupil: 10, maxMove: 8 },
    lg: { container: 80, iris: 32, pupil: 14, maxMove: 12 },
  }

  const config = sizeConfig[size]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return
      
      const eyeRect = eyeRef.current.getBoundingClientRect()
      const eyeCenterX = eyeRect.left + eyeRect.width / 2
      const eyeCenterY = eyeRect.top + eyeRect.height / 2
      
      const deltaX = e.clientX - eyeCenterX
      const deltaY = e.clientY - eyeCenterY
      const angle = Math.atan2(deltaY, deltaX)
      const rawDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const distance = Math.min(rawDistance / 15, config.maxMove)
      
      setEyePosition({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 100)
    }, 2000 + Math.random() * 3000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(blinkInterval)
    }
  }, [config.maxMove])

  return (
    <div 
      ref={eyeRef} 
      className="relative flex items-center justify-center"
      style={{ width: config.container, height: config.container }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-blue-500/30 blur-lg"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Eye container with blink */}
      <motion.div
        className="relative w-full h-full"
        animate={{ scaleY: isBlinking ? 0.05 : 1 }}
        transition={{ duration: 0.06 }}
      >
        {/* Outer blue ring */}
        <div 
          className="absolute inset-0 rounded-full shadow-lg shadow-blue-500/40"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
            padding: 3,
          }}
        >
          {/* Dark inner ring */}
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
              padding: 3,
            }}
          >
            {/* Eye white (sclera) */}
            <div 
              className="w-full h-full rounded-full overflow-hidden relative"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #f3f4f6 50%, #e5e7eb 100%)',
              }}
            >
              {/* Iris + Pupil - THIS MOVES */}
              <motion.div
                className="absolute"
                style={{
                  width: config.iris,
                  height: config.iris,
                  top: '50%',
                  left: '50%',
                  marginTop: -config.iris / 2,
                  marginLeft: -config.iris / 2,
                }}
                animate={{ 
                  x: eyePosition.x, 
                  y: eyePosition.y 
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  mass: 0.5
                }}
              >
                {/* Iris */}
                <div 
                  className="w-full h-full rounded-full relative"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #60a5fa 0%, #3b82f6 40%, #1d4ed8 70%, #1e3a8a 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(59,130,246,0.5)',
                  }}
                >
                  {/* Iris texture lines */}
                  <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-blue-900"
                        style={{
                          width: 1,
                          height: '40%',
                          top: '50%',
                          left: '50%',
                          transformOrigin: 'center bottom',
                          transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Pupil */}
                  <motion.div 
                    className="absolute rounded-full bg-gray-950"
                    style={{
                      width: config.pupil,
                      height: config.pupil,
                      top: '50%',
                      left: '50%',
                      marginTop: -config.pupil / 2,
                      marginLeft: -config.pupil / 2,
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8)',
                    }}
                    animate={{ scale: [1, 0.85, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {/* Light reflection on pupil */}
                    <div 
                      className="absolute bg-white rounded-full"
                      style={{
                        width: '40%',
                        height: '40%',
                        top: '15%',
                        left: '20%',
                        opacity: 0.9,
                      }}
                    />
                    <div 
                      className="absolute bg-white/50 rounded-full"
                      style={{
                        width: '20%',
                        height: '20%',
                        bottom: '20%',
                        right: '20%',
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Eye shine/reflection on sclera */}
              <div 
                className="absolute bg-white/60 rounded-full blur-[1px]"
                style={{
                  width: '20%',
                  height: '15%',
                  top: '10%',
                  left: '15%',
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
