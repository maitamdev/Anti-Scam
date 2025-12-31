'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check } from 'lucide-react'

interface Props {
  text: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'icon' | 'button'
  label?: string
}

export default function CopyButton({ 
  text, 
  className = '', 
  size = 'md',
  variant = 'icon',
  label = 'Sao chép'
}: Props) {
  const [copied, setCopied] = useState(false)

  const sizes = {
    sm: { icon: 'w-4 h-4', button: 'px-2 py-1 text-xs' },
    md: { icon: 'w-5 h-5', button: 'px-3 py-1.5 text-sm' },
    lg: { icon: 'w-6 h-6', button: 'px-4 py-2 text-base' }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (variant === 'button') {
    return (
      <motion.button
        onClick={handleCopy}
        className={`inline-flex items-center gap-2 ${sizes[size].button} rounded-lg transition-colors ${
          copied 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
        } ${className}`}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <Check className={sizes[size].icon} />
              Đã sao chép
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <Copy className={sizes[size].icon} />
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    )
  }

  return (
    <motion.button
      onClick={handleCopy}
      className={`p-2 rounded-lg transition-colors ${
        copied 
          ? 'bg-green-500/20 text-green-400' 
          : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white'
      } ${className}`}
      whileTap={{ scale: 0.9 }}
      title={copied ? 'Đã sao chép!' : label}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
          >
            <Check className={sizes[size].icon} />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Copy className={sizes[size].icon} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
