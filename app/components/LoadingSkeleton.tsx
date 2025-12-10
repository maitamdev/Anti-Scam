'use client'

import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
  type?: 'text' | 'card' | 'circle' | 'button'
  count?: number
  className?: string
}

export default function LoadingSkeleton({ 
  type = 'text', 
  count = 1,
  className = '' 
}: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return (
          <div className={`h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded animate-pulse ${className}`} 
            style={{ backgroundSize: '200% 100%' }}
          />
        )
      case 'card':
        return (
          <div className={`bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-xl p-6 animate-pulse ${className}`}>
            <div className="h-6 bg-gray-600 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-600 rounded w-full mb-2" />
            <div className="h-4 bg-gray-600 rounded w-5/6" />
          </div>
        )
      case 'circle':
        return (
          <div className={`rounded-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse ${className}`} />
        )
      case 'button':
        return (
          <div className={`h-12 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-xl animate-pulse ${className}`} />
        )
      default:
        return null
    }
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </>
  )
}
