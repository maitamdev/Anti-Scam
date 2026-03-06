'use client'
import { useState, useEffect } from 'react'

/**
 * useDarkMode - Toggle dark mode with localStorage persistence
 */
export function useDarkMode(): [boolean, () => void] {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem('darkMode')
    if (stored !== null) return JSON.parse(stored)
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode(prev => !prev)

  return [isDarkMode, toggleDarkMode]
}
