import { describe, it, expect } from 'vitest'
import {
  cn,
  extractDomain,
  extractRootDomain,
  normalizeUrl,
  formatNumber,
  getScoreColor,
  getLabelColor,
  getLabelEmoji,
  truncate,
  sleep,
  getToday,
} from '../utils'

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('should handle conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('should handle empty input', () => {
    expect(cn()).toBe('')
  })
})

describe('extractDomain', () => {
  it('should extract domain from full URL', () => {
    expect(extractDomain('https://example.com/path')).toBe('example.com')
  })

  it('should extract domain from URL without protocol', () => {
    expect(extractDomain('example.com/path')).toBe('example.com')
  })

  it('should handle subdomain', () => {
    expect(extractDomain('https://sub.example.com')).toBe('sub.example.com')
  })

  it('should return lowercase domain', () => {
    expect(extractDomain('https://EXAMPLE.COM')).toBe('example.com')
  })

  it('should handle invalid URL gracefully', () => {
    expect(extractDomain('')).toBe('')
  })
})

describe('extractRootDomain', () => {
  it('should extract root domain from subdomain', () => {
    expect(extractRootDomain('chat.zalo.me')).toBe('zalo.me')
  })

  it('should handle .com.vn TLD', () => {
    expect(extractRootDomain('www.vietcombank.com.vn')).toBe('vietcombank.com.vn')
  })

  it('should return domain if already root', () => {
    expect(extractRootDomain('example.com')).toBe('example.com')
  })

  it('should handle single-part domain', () => {
    expect(extractRootDomain('localhost')).toBe('localhost')
  })
})

describe('normalizeUrl', () => {
  it('should add https:// if no protocol', () => {
    expect(normalizeUrl('example.com')).toBe('https://example.com')
  })

  it('should keep existing https://', () => {
    expect(normalizeUrl('https://example.com')).toBe('https://example.com')
  })

  it('should keep existing http://', () => {
    expect(normalizeUrl('http://example.com')).toBe('http://example.com')
  })
})

describe('formatNumber', () => {
  it('should format number with Vietnamese locale', () => {
    const result = formatNumber(1000000)
    expect(result).toBeTruthy()
  })

  it('should handle zero', () => {
    const result = formatNumber(0)
    expect(result).toBe('0')
  })
})

describe('getScoreColor', () => {
  it('should return safe color for low score', () => {
    expect(getScoreColor(20)).toBe('text-safe')
  })

  it('should return caution color for medium score', () => {
    expect(getScoreColor(50)).toBe('text-caution')
  })

  it('should return dangerous color for high score', () => {
    expect(getScoreColor(80)).toBe('text-dangerous')
  })

  it('should handle boundary at 30', () => {
    expect(getScoreColor(30)).toBe('text-safe')
  })

  it('should handle boundary at 60', () => {
    expect(getScoreColor(60)).toBe('text-caution')
  })
})

describe('getLabelColor', () => {
  it('should return bg-safe for SAFE', () => {
    expect(getLabelColor('SAFE')).toBe('bg-safe')
  })

  it('should return bg-caution for CAUTION', () => {
    expect(getLabelColor('CAUTION')).toBe('bg-caution')
  })

  it('should return bg-dangerous for DANGEROUS', () => {
    expect(getLabelColor('DANGEROUS')).toBe('bg-dangerous')
  })

  it('should return bg-gray-500 for unknown label', () => {
    expect(getLabelColor('UNKNOWN')).toBe('bg-gray-500')
  })
})

describe('getLabelEmoji', () => {
  it('should return green circle for SAFE', () => {
    expect(getLabelEmoji('SAFE')).toBe('🟢')
  })

  it('should return yellow circle for CAUTION', () => {
    expect(getLabelEmoji('CAUTION')).toBe('🟡')
  })

  it('should return red circle for DANGEROUS', () => {
    expect(getLabelEmoji('DANGEROUS')).toBe('🔴')
  })

  it('should return white circle for unknown', () => {
    expect(getLabelEmoji('UNKNOWN')).toBe('⚪')
  })
})

describe('truncate', () => {
  it('should truncate long string', () => {
    expect(truncate('Hello World!', 5)).toBe('Hello...')
  })

  it('should not truncate short string', () => {
    expect(truncate('Hi', 5)).toBe('Hi')
  })

  it('should handle exact length', () => {
    expect(truncate('Hello', 5)).toBe('Hello')
  })
})

describe('sleep', () => {
  it('should resolve after delay', async () => {
    const start = Date.now()
    await sleep(50)
    const elapsed = Date.now() - start
    expect(elapsed).toBeGreaterThanOrEqual(40)
  })
})

describe('getToday', () => {
  it('should return date with time set to midnight', () => {
    const today = getToday()
    expect(today.getHours()).toBe(0)
    expect(today.getMinutes()).toBe(0)
    expect(today.getSeconds()).toBe(0)
    expect(today.getMilliseconds()).toBe(0)
  })
})
