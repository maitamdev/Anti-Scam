'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Props {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
}

export default function TypewriterText({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = ''
}: Props) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDuration)
      return () => clearTimeout(pauseTimer)
    }

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false)
        setTextIndex((prev) => (prev + 1) % texts.length)
        return
      }

      const deleteTimer = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1))
      }, deletingSpeed)
      return () => clearTimeout(deleteTimer)
    }

    if (displayText === currentText) {
      setIsPaused(true)
      return
    }

    const typeTimer = setTimeout(() => {
      setDisplayText(currentText.slice(0, displayText.length + 1))
    }, typingSpeed)
    return () => clearTimeout(typeTimer)
  }, [displayText, textIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[3px] h-[1em] bg-current ml-1 align-middle"
      />
    </span>
  )
}
