'use client'
import { useRef, useCallback } from 'react'

/**
 * useThrottle - Throttle a callback function
 */
export function useThrottle<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number = 300
): T {
  const lastRan = useRef(Date.now())
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return useCallback(
    ((...args: unknown[]) => {
      const now = Date.now()
      if (now - lastRan.current >= delay) {
        callback(...args)
        lastRan.current = now
      } else {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          callback(...args)
          lastRan.current = Date.now()
        }, delay - (now - lastRan.current))
      }
    }) as T,
    [callback, delay]
  )
}
