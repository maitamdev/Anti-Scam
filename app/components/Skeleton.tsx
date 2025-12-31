'use client'

import { motion } from 'framer-motion'

interface Props {
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: string | number
  height?: string | number
  className?: string
  lines?: number
}

export default function Skeleton({ 
  variant = 'text', 
  width, 
  height,
  className = '',
  lines = 1
}: Props) {
  const baseClass = 'bg-gray-700/50 animate-pulse rounded'

  if (variant === 'circular') {
    return (
      <div 
        className={`${baseClass} rounded-full ${className}`}
        style={{ 
          width: width || 40, 
          height: height || width || 40 
        }}
      />
    )
  }

  if (variant === 'rectangular') {
    return (
      <div 
        className={`${baseClass} rounded-lg ${className}`}
        style={{ 
          width: width || '100%', 
          height: height || 100 
        }}
      />
    )
  }

  if (variant === 'card') {
    return (
      <div className={`bg-gray-800/50 rounded-2xl border border-gray-700/50 p-6 ${className}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`${baseClass} rounded-xl w-12 h-12`} />
          <div className="flex-1">
            <div className={`${baseClass} h-4 w-1/3 mb-2`} />
            <div className={`${baseClass} h-3 w-1/2`} />
          </div>
        </div>
        <div className="space-y-2">
          <div className={`${baseClass} h-3 w-full`} />
          <div className={`${baseClass} h-3 w-4/5`} />
          <div className={`${baseClass} h-3 w-3/5`} />
        </div>
      </div>
    )
  }

  // Text variant
  return (
    <div className={`space-y-2 ${className}`} style={{ width: width || '100%' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i}
          className={`${baseClass} h-4`}
          style={{ 
            width: i === lines - 1 && lines > 1 ? '60%' : '100%',
            height: height || 16
          }}
        />
      ))}
    </div>
  )
}

// Preset skeleton components
export function SkeletonCard() {
  return <Skeleton variant="card" />
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl">
          <Skeleton variant="circular" width={48} />
          <div className="flex-1">
            <Skeleton width="40%" height={16} className="mb-2" />
            <Skeleton width="60%" height={12} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-hidden">
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex gap-4">
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} width={`${100 / cols}%`} height={16} />
          ))}
        </div>
      </div>
      <div className="divide-y divide-gray-700/30">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4 flex gap-4">
            {Array.from({ length: cols }).map((_, colIndex) => (
              <Skeleton key={colIndex} width={`${100 / cols}%`} height={14} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
