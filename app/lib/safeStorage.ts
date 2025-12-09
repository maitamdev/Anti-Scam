/**
 * Safe localStorage wrapper that handles errors gracefully
 */

export const safeStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof window === 'undefined') return null
      return localStorage.getItem(key)
    } catch (error) {
      console.warn('[Storage] Failed to get item:', key, error)
      return null
    }
  },

  setItem(key: string, value: string): boolean {
    try {
      if (typeof window === 'undefined') return false
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.warn('[Storage] Failed to set item:', key, error)
      return false
    }
  },

  removeItem(key: string): boolean {
    try {
      if (typeof window === 'undefined') return false
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.warn('[Storage] Failed to remove item:', key, error)
      return false
    }
  },

  clear(): boolean {
    try {
      if (typeof window === 'undefined') return false
      localStorage.clear()
      return true
    } catch (error) {
      console.warn('[Storage] Failed to clear storage:', error)
      return false
    }
  }
}
