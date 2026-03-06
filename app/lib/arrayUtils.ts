/**
 * Array Manipulation Helpers
 * Utility functions for working with arrays
 */

/**
 * Remove duplicate items from an array
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

/**
 * Remove duplicate items based on a key function
 */
export function uniqueBy<T>(arr: T[], keyFn: (item: T) => unknown): T[] {
  const seen = new Set()
  return arr.filter(item => {
    const key = keyFn(item)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/**
 * Group array items by a key function
 */
export function groupBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return arr.reduce((groups, item) => {
    const key = keyFn(item)
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

/**
 * Chunk an array into smaller arrays of a specified size
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

/**
 * Shuffle an array (Fisher-Yates algorithm)
 */
export function shuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Sort an array by a key function
 */
export function sortBy<T>(arr: T[], keyFn: (item: T) => number | string, desc: boolean = false): T[] {
  return [...arr].sort((a, b) => {
    const aVal = keyFn(a)
    const bVal = keyFn(b)
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    return desc ? -cmp : cmp
  })
}

/**
 * Find the sum of numeric values in an array
 */
export function sum(arr: number[]): number {
  return arr.reduce((total, n) => total + n, 0)
}

/**
 * Find the average of numeric values
 */
export function average(arr: number[]): number {
  if (arr.length === 0) return 0
  return sum(arr) / arr.length
}

/**
 * Take the first N items from an array
 */
export function take<T>(arr: T[], n: number): T[] {
  return arr.slice(0, n)
}

/**
 * Flatten a nested array to a specified depth
 */
export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.flat() as T[]
}
