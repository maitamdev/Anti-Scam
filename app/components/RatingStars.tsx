'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface Props {
  rating?: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (rating: number) => void
}

export default function RatingStars({ 
  rating = 0, 
  maxRating = 5, 
  size = 'md',
  interactive = false,
  onChange 
}: Props) {
  const [hoverRating, setHoverRating] = useState(0)
  const [currentRating, setCurrentRating] = useState(rating)

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const handleClick = (index: number) => {
    if (!interactive) return
    setCurrentRating(index)
    onChange?.(index)
  }

  const displayRating = hoverRating || currentRating

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxRating }).map((_, index) => {
        const starIndex = index + 1
        const isFilled = starIndex <= displayRating
        const isHalf = !isFilled && starIndex - 0.5 <= displayRating

        return (
          <motion.button
            key={index}
            type="button"
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'} focus:outline-none`}
            onMouseEnter={() => interactive && setHoverRating(starIndex)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => handleClick(starIndex)}
            whileHover={interactive ? { scale: 1.2 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
          >
            <Star
              className={`${sizes[size]} transition-colors ${
                isFilled 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : isHalf 
                  ? 'text-yellow-400 fill-yellow-400/50'
                  : 'text-gray-600'
              }`}
            />
          </motion.button>
        )
      })}
    </div>
  )
}
