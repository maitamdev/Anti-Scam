import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
    return urlObj.hostname.toLowerCase()
  } catch {
    return url.toLowerCase()
  }
}

export function extractRootDomain(domain: string): string {
  // Extract root domain (e.g., chat.zalo.me -> zalo.me)
  const parts = domain.split('.')
  if (parts.length >= 2) {
    // Handle .com.vn, .co.uk etc
    if (parts.length >= 3 && parts[parts.length - 2].length <= 3) {
      return parts.slice(-3).join('.')
    }
    return parts.slice(-2).join('.')
  }
  return domain
}

export function normalizeUrl(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num)
}

export function getScoreColor(score: number): string {
  if (score <= 30) return 'text-safe'
  if (score <= 60) return 'text-caution'
  return 'text-dangerous'
}

export function getLabelColor(label: string): string {
  switch (label) {
    case 'SAFE':
      return 'bg-safe'
    case 'CAUTION':
      return 'bg-caution'
    case 'DANGEROUS':
      return 'bg-dangerous'
    default:
      return 'bg-gray-500'
  }
}

export function getLabelEmoji(label: string): string {
  switch (label) {
    case 'SAFE':
      return '🟢'
    case 'CAUTION':
      return '🟡'
    case 'DANGEROUS':
      return '🔴'
    default:
      return '⚪'
  }
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getToday(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}
