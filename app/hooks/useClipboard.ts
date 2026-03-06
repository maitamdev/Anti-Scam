'use client'
import { useState, useCallback } from 'react'

/**
 * useClipboard - Copy to clipboard with feedback state
 */
export function useClipboard(timeout: number = 2000): {
  copied: boolean
  copy: (text: string) => Promise<void>
  error: Error | null
} {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setError(null)
        setTimeout(() => setCopied(false), timeout)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Copy failed'))
        setCopied(false)
      }
    },
    [timeout]
  )

  return { copied, copy, error }
}
