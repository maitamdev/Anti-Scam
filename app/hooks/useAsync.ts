'use client'
import { useState, useCallback } from 'react'

/**
 * useAsync - Execute async functions with state tracking
 */
export function useAsync<T, A extends unknown[] = unknown[]>(
  asyncFunction: (...args: A) => Promise<T>
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  const execute = useCallback(
    async (...args: A) => {
      setLoading(true)
      setError(null)
      try {
        const result = await asyncFunction(...args)
        setData(result)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Async operation failed')
        setError(error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [asyncFunction]
  )

  return { execute, loading, error, data }
}
