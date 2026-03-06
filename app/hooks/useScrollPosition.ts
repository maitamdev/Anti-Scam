'use client'
import { useState, useEffect } from 'react'

/**
 * useScrollPosition - Track scroll position
 */
export function useScrollPosition(): { x: number; y: number; isScrolled: boolean } {
  const [position, setPosition] = useState({ x: 0, y: 0, isScrolled: false })

  useEffect(() => {
    const handleScroll = () => {
      setPosition({
        x: window.scrollX,
        y: window.scrollY,
        isScrolled: window.scrollY > 10,
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return position
}
