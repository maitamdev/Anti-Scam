'use client'
import { useState, useCallback } from 'react'

/**
 * useToggle - Boolean state toggle
 */
export function useToggle(initialValue: boolean = false): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue(v => !v), [])
  const set = useCallback((v: boolean) => setValue(v), [])
  return [value, toggle, set]
}
