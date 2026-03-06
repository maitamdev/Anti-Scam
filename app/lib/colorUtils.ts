/**
 * Color Utilities
 * Risk color mapping and color palette management
 */

/**
 * Risk level color configuration
 */
export const RISK_COLORS = {
  safe: {
    bg: '#10B981',
    bgLight: '#D1FAE5',
    text: '#065F46',
    border: '#6EE7B7',
  },
  caution: {
    bg: '#F59E0B',
    bgLight: '#FEF3C7',
    text: '#92400E',
    border: '#FCD34D',
  },
  dangerous: {
    bg: '#EF4444',
    bgLight: '#FEE2E2',
    text: '#991B1B',
    border: '#FCA5A5',
  },
} as const

/**
 * Get color configuration for a risk score
 */
export function getScoreColorConfig(score: number) {
  if (score <= 30) return RISK_COLORS.safe
  if (score <= 60) return RISK_COLORS.caution
  return RISK_COLORS.dangerous
}

/**
 * Get color configuration for a label
 */
export function getLabelColorConfig(label: string) {
  switch (label.toUpperCase()) {
    case 'SAFE': return RISK_COLORS.safe
    case 'CAUTION': return RISK_COLORS.caution
    case 'DANGEROUS': return RISK_COLORS.dangerous
    default: return { bg: '#6B7280', bgLight: '#F3F4F6', text: '#374151', border: '#D1D5DB' }
  }
}

/**
 * Generate a color from a string (for avatars, tags, etc.)
 */
export function stringToColor(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 65%, 55%)`
}

/**
 * Generate a gradient from a score
 */
export function scoreToGradient(score: number): string {
  if (score <= 30) return 'linear-gradient(135deg, #10B981, #34D399)'
  if (score <= 60) return 'linear-gradient(135deg, #F59E0B, #FBBF24)'
  return 'linear-gradient(135deg, #EF4444, #F87171)'
}

/**
 * Severity color mapping
 */
export const SEVERITY_COLORS: Record<string, string> = {
  CRITICAL: '#DC2626',
  HIGH: '#EA580C',
  MEDIUM: '#D97706',
  LOW: '#65A30D',
}

/**
 * Get contrast text color (black or white) for a given background
 */
export function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#ffffff'
}
