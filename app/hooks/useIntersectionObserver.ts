'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * useIntersectionObserver - Observe element visibility in viewport
 */
export function useIntersectionObserver(
  options?: IntersectionObserverInit
): [React.RefObject<HTMLElement | null>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, ...options }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [options])

  return [ref, isIntersecting]
}
