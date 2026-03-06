'use client'
import { useState, useCallback } from 'react'

/**
 * useCounter - Numeric counter with increment/decrement/reset
 */
export function useCounter(initialValue: number = 0, options?: { min?: number; max?: number }) {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => {
    setCount(c => {
      const next = c + 1
      return options?.max !== undefined ? Math.min(next, options.max) : next
    })
  }, [options?.max])

  const decrement = useCallback(() => {
    setCount(c => {
      const next = c - 1
      return options?.min !== undefined ? Math.max(next, options.min) : next
    })
  }, [options?.min])

  const reset = useCallback(() => setCount(initialValue), [initialValue])
  const set = useCallback((value: number) => setCount(value), [])

  return { count, increment, decrement, reset, set }
}
