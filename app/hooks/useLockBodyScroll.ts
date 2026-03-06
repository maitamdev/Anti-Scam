'use client'
import { useEffect } from 'react'

/**
 * useLockBodyScroll - Lock body scroll (useful for modals)
 */
export function useLockBodyScroll(locked: boolean = true) {
  useEffect(() => {
    if (!locked) return
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [locked])
}
