'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  icon?: LucideIcon
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
  disabled?: boolean
  className?: string
}

export default function PulseButton({
  children,
  href,
  onClick,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  pulse = true,
  disabled = false,
  className = ''
}: Props) {
  const variants = {
    primary: {
      bg: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
      shadow: 'shadow-blue-500/25',
      pulse: 'bg-blue-500'
    },
    secondary: {
      bg: 'bg-gray-700 hover:bg-gray-600',
      shadow: 'shadow-gray-500/25',
      pulse: 'bg-gray-500'
    },
    danger: {
      bg: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700',
      shadow: 'shadow-red-500/25',
      pulse: 'bg-red-500'
    },
    success: {
      bg: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
      shadow: 'shadow-green-500/25',
      pulse: 'bg-green-500'
    }
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const v = variants[variant]
  const s = sizes[size]

  const buttonContent = (
    <motion.span
      className={`relative inline-flex items-center justify-center ${s} ${v.bg} rounded-xl font-semibold text-white shadow-lg ${v.shadow} transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {/* Pulse effect */}
      {pulse && !disabled && (
        <motion.span
          className={`absolute inset-0 rounded-xl ${v.pulse}`}
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon className={iconSizes[size]} />}
        {children}
      </span>
    </motion.span>
  )

  if (href && !disabled) {
    return <Link href={href}>{buttonContent}</Link>
  }

  return (
    <button onClick={onClick} disabled={disabled} className="focus:outline-none">
      {buttonContent}
    </button>
  )
}
