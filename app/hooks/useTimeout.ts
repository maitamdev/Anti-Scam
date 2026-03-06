'use client'
import { useEffect, useRef } from 'react'

/**
 * useTimeout - setTimeout as a hook with proper cleanup
 */
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return
    const id = setTimeout(() => savedCallback.current(), delay)
    return () => clearTimeout(id)
  }, [delay])
}
