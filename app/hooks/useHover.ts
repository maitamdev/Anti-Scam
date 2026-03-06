'use client'
import { useState, useRef, useCallback } from 'react'

/**
 * useHover - Track hover state on an element
 */
export function useHover<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<T | null>(null)

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  const callbackRef = useCallback(
    (node: T | null) => {
      if (ref.current) {
        ref.current.removeEventListener('mouseenter', handleMouseEnter)
        ref.current.removeEventListener('mouseleave', handleMouseLeave)
      }

      ref.current = node

      if (node) {
        node.addEventListener('mouseenter', handleMouseEnter)
        node.addEventListener('mouseleave', handleMouseLeave)
      }
    },
    [handleMouseEnter, handleMouseLeave]
  )

  // Return both refs for flexibility
  return [{ current: ref.current } as React.RefObject<T | null>, isHovered]
}
