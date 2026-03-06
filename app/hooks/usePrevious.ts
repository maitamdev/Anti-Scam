'use client'
import { useRef, useEffect } from 'react'

/**
 * usePrevious - Track the previous value of a state
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
