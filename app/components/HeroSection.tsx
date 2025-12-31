'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface Props {
  title: string
  highlightedText?: string
  description: string
  primaryAction?: {
    label: string
    href: string
    icon?: LucideIcon
  }
  secondaryAction?: {
    label: string
    href: string
    icon?: LucideIcon
  }
  badge?: string
  children?: React.ReactNode
}

export default function HeroSection({
  title,
  highlightedText,
  description,
  primaryAction,
  secondaryAction,
  badge,
  children
}: Props) {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm text-blue-400 font-medium">{badge}</span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          {title}{' '}
          {highlightedText && (
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {highlightedText}
            </span>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>

        {(primaryAction || secondaryAction) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
              >
                {primaryAction.icon && <primaryAction.icon className="w-5 h-5" />}
                {primaryAction.label}
              </Link>
            )}
            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-white border border-gray-700 transition-all hover:scale-105"
              >
                {secondaryAction.icon && <secondaryAction.icon className="w-5 h-5" />}
                {secondaryAction.label}
              </Link>
            )}
          </motion.div>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
