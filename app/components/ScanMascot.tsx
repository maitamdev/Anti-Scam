'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

type MascotState = 'idle' | 'scanning' | 'safe' | 'caution' | 'danger'

interface ScanMascotProps {
  state: MascotState
  size?: number
}

export default function ScanMascot({ state, size = 120 }: ScanMascotProps) {
  const [blink, setBlink] = useState(false)

  // Blinking effect
  useEffect(() => {
    if (state === 'danger') return // No blinking when scared
    
    const interval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
    }, 2500 + Math.random() * 2000)
    
    return () => clearInterval(interval)
  }, [state])

  // Colors based on state
  const colors = {
    idle: { primary: '#3b82f6', secondary: '#60a5fa', glow: '#3b82f6' },
    scanning: { primary: '#3b82f6', secondary: '#60a5fa', glow: '#60a5fa' },
    safe: { primary: '#22c55e', secondary: '#4ade80', glow: '#22c55e' },
    caution: { primary: '#eab308', secondary: '#facc15', glow: '#eab308' },
    danger: { primary: '#ef4444', secondary: '#f87171', glow: '#ef4444' },
  }

  const color = colors[state]

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        style={{ backgroundColor: color.glow }}
        animate={{
          opacity: state === 'scanning' ? [0.3, 0.6, 0.3] : 0.3,
          scale: state === 'scanning' ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* Main body - Shield shape */}
      <motion.svg
        viewBox="0 0 100 100"
        className="relative z-10"
        animate={{
          rotate: state === 'danger' ? [-5, 5, -5] : 0,
          scale: state === 'safe' ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: state === 'danger' ? 0.3 : 0.5,
          repeat: state === 'danger' ? Infinity : 0,
        }}
      >
        {/* Shield body */}
        <motion.path
          d="M50 5 L90 20 L90 50 C90 75 50 95 50 95 C50 95 10 75 10 50 L10 20 Z"
          fill={color.primary}
          stroke={color.secondary}
          strokeWidth="3"
          animate={{
            fill: color.primary,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Face area (lighter) */}
        <ellipse cx="50" cy="50" rx="30" ry="25" fill="#1f2937" />

        {/* Eyes */}
        <AnimatePresence mode="wait">
          {state === 'safe' ? (
            // Happy eyes (curved lines)
            <motion.g
              key="happy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.path
                d="M32 45 Q38 38 44 45"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <motion.path
                d="M56 45 Q62 38 68 45"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </motion.g>
          ) : state === 'danger' ? (
            // Scared eyes (big circles)
            <motion.g
              key="scared"
              initial={{ scale: 0.5 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              <circle cx="35" cy="45" r="8" fill="white" />
              <circle cx="35" cy="45" r="4" fill="#1f2937" />
              <circle cx="65" cy="45" r="8" fill="white" />
              <circle cx="65" cy="45" r="4" fill="#1f2937" />
              {/* Sweat drop */}
              <motion.ellipse
                cx="78"
                cy="35"
                rx="3"
                ry="5"
                fill="#60a5fa"
                animate={{ y: [0, 5, 0], opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.g>
          ) : state === 'caution' ? (
            // Suspicious eyes (narrowed)
            <motion.g key="suspicious">
              <motion.ellipse
                cx="35"
                cy="45"
                rx="7"
                ry={blink ? 1 : 4}
                fill="white"
              />
              <motion.ellipse
                cx="65"
                cy="45"
                rx="7"
                ry={blink ? 1 : 4}
                fill="white"
              />
              {/* Eyebrows (raised skeptically) */}
              <line x1="28" y1="35" x2="42" y2="38" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="58" y1="38" x2="72" y2="35" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </motion.g>
          ) : (
            // Normal/scanning eyes
            <motion.g key="normal">
              <motion.ellipse
                cx="35"
                cy="45"
                rx="6"
                ry={blink ? 1 : 6}
                fill="white"
                transition={{ duration: 0.1 }}
              />
              <motion.ellipse
                cx="65"
                cy="45"
                rx="6"
                ry={blink ? 1 : 6}
                fill="white"
                transition={{ duration: 0.1 }}
              />
              {state === 'scanning' && (
                <motion.line
                  x1="20"
                  y1="45"
                  x2="80"
                  y2="45"
                  stroke={color.secondary}
                  strokeWidth="2"
                  animate={{ y1: [35, 55, 35], y2: [35, 55, 35] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.g>
          )}
        </AnimatePresence>

        {/* Mouth */}
        <AnimatePresence mode="wait">
          {state === 'safe' ? (
            // Big smile
            <motion.path
              key="smile"
              d="M35 60 Q50 75 65 60"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : state === 'danger' ? (
            // Scared O mouth
            <motion.ellipse
              key="scared-mouth"
              cx="50"
              cy="65"
              rx="8"
              ry="10"
              fill="#1f2937"
              stroke="white"
              strokeWidth="2"
              animate={{ ry: [8, 12, 8] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
          ) : state === 'caution' ? (
            // Worried line
            <motion.path
              key="worried"
              d="M38 62 Q50 58 62 62"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            // Neutral line
            <motion.line
              key="neutral"
              x1="40"
              y1="62"
              x2="60"
              y2="62"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </AnimatePresence>

        {/* Arms/Hands */}
        <AnimatePresence mode="wait">
          {state === 'safe' && (
            // Thumbs up
            <motion.g
              key="thumbsup"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1, rotate: [0, -10, 0] }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <circle cx="95" cy="55" r="8" fill={color.primary} />
              <rect x="93" y="45" width="4" height="12" rx="2" fill={color.secondary} />
            </motion.g>
          )}
          {state === 'danger' && (
            // Stop hand
            <motion.g
              key="stop"
              initial={{ scale: 0 }}
              animate={{ scale: 1, x: [-2, 2, -2] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            >
              <circle cx="0" cy="50" r="10" fill={color.primary} />
              <text x="0" y="54" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">✋</text>
            </motion.g>
          )}
          {state === 'caution' && (
            // Warning finger
            <motion.g
              key="warning"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{ transformOrigin: '95px 40px' }}
            >
              <circle cx="95" cy="40" r="6" fill={color.primary} />
              <rect x="93" y="28" width="4" height="14" rx="2" fill={color.secondary} />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Status icon on shield */}
        <AnimatePresence mode="wait">
          {state === 'safe' && (
            <motion.text
              key="check"
              x="50"
              y="85"
              textAnchor="middle"
              fontSize="14"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              ✓
            </motion.text>
          )}
          {state === 'danger' && (
            <motion.text
              key="x"
              x="50"
              y="85"
              textAnchor="middle"
              fontSize="14"
              fill="white"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              ✕
            </motion.text>
          )}
          {state === 'caution' && (
            <motion.text
              key="warn"
              x="50"
              y="85"
              textAnchor="middle"
              fontSize="14"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              !
            </motion.text>
          )}
        </AnimatePresence>
      </motion.svg>

      {/* Particles for safe state */}
      {state === 'safe' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: color.secondary,
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 80],
                y: [0, (Math.random() - 0.5) * 80],
                opacity: [1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}

      {/* Shake lines for danger */}
      {state === 'danger' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-4 bg-red-400 rounded"
              style={{
                left: i % 2 === 0 ? '10%' : '85%',
                top: `${30 + i * 15}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                x: i % 2 === 0 ? [-5, 0] : [5, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
