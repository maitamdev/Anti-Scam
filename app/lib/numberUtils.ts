/**
 * Number Helpers
 * Percentage, rounding, clamping, and math utilities
 */

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Calculate percentage
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0
  return (value / total) * 100
}

/**
 * Round to a specified number of decimal places
 */
export function roundTo(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * clamp(t, 0, 1)
}

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * Check if a number is within a range (inclusive)
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Convert a score (0-100) to a risk level
 */
export function scoreToRiskLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
  if (score <= 25) return 'low'
  if (score <= 50) return 'medium'
  if (score <= 75) return 'high'
  return 'critical'
}

/**
 * Calculate the ordinal suffix for a number (English)
 */
export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}
