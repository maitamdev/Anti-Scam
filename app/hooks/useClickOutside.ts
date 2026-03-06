'use client'
import { useEffect, useRef } from 'react'

/**
 * useClickOutside - Detect clicks outside a referenced element
 */
export function useClickOutside<T extends HTMLElement>(
  handler: () => void
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler()
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [handler])

  return ref
}
