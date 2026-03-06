import { describe, it, expect, vi, beforeEach } from 'vitest'
import { validateUrl, sanitizeText, verifyAdminSecret, getSecurityHeaders } from '../security'

describe('validateUrl', () => {
  it('should validate a correct URL', () => {
    const result = validateUrl('https://example.com')
    expect(result.valid).toBe(true)
    expect(result.url).toBe('https://example.com/')
  })

  it('should add https:// if missing protocol', () => {
    const result = validateUrl('example.com')
    expect(result.valid).toBe(true)
    expect(result.url).toContain('https://')
  })

  it('should reject empty input', () => {
    const result = validateUrl('')
    expect(result.valid).toBe(false)
    expect(result.error).toBeTruthy()
  })

  it('should reject localhost', () => {
    const result = validateUrl('http://localhost')
    expect(result.valid).toBe(false)
  })

  it('should reject 127.0.0.1', () => {
    const result = validateUrl('http://127.0.0.1')
    expect(result.valid).toBe(false)
  })

  it('should reject private IP 192.168.x.x', () => {
    const result = validateUrl('http://192.168.1.1')
    expect(result.valid).toBe(false)
  })

  it('should reject private IP 10.x.x.x', () => {
    const result = validateUrl('http://10.0.0.1')
    expect(result.valid).toBe(false)
  })

  it('should reject .local domains', () => {
    const result = validateUrl('http://myhost.local')
    expect(result.valid).toBe(false)
  })

  it('should reject URLs longer than 2048 chars', () => {
    const longUrl = 'https://example.com/' + 'a'.repeat(2100)
    const result = validateUrl(longUrl)
    expect(result.valid).toBe(false)
  })

  it('should handle URL with path and query', () => {
    const result = validateUrl('https://example.com/path?q=test')
    expect(result.valid).toBe(true)
  })
})

describe('sanitizeText', () => {
  it('should remove HTML tags', () => {
    expect(sanitizeText('<script>alert("xss")</script>')).toBe('scriptalert(xss)/script')
  })

  it('should trim whitespace', () => {
    expect(sanitizeText('  hello  ')).toBe('hello')
  })

  it('should truncate to max length', () => {
    const longText = 'a'.repeat(2000)
    const result = sanitizeText(longText, 100)
    expect(result.length).toBeLessThanOrEqual(100)
  })

  it('should handle empty input', () => {
    expect(sanitizeText('')).toBe('')
  })

  it('should handle null-like input', () => {
    expect(sanitizeText(null as unknown as string)).toBe('')
  })

  it('should remove angle brackets', () => {
    const result = sanitizeText('hello <world>')
    expect(result).not.toContain('<')
    expect(result).not.toContain('>')
  })
})

describe('verifyAdminSecret', () => {
  beforeEach(() => {
    process.env.ADMIN_SECRET = 'test-admin-secret'
  })

  it('should return true for correct secret', () => {
    expect(verifyAdminSecret('test-admin-secret')).toBe(true)
  })

  it('should return false for incorrect secret', () => {
    expect(verifyAdminSecret('wrong-secret')).toBe(false)
  })

  it('should return false for null secret', () => {
    expect(verifyAdminSecret(null)).toBe(false)
  })

  it('should return false when ADMIN_SECRET is default value', () => {
    process.env.ADMIN_SECRET = 'your-admin-secret-key'
    expect(verifyAdminSecret('your-admin-secret-key')).toBe(false)
  })
})

describe('getSecurityHeaders', () => {
  it('should return security headers object', () => {
    const headers = getSecurityHeaders()
    expect(headers['X-Content-Type-Options']).toBe('nosniff')
    expect(headers['X-Frame-Options']).toBe('DENY')
    expect(headers['X-XSS-Protection']).toBe('1; mode=block')
  })

  it('should include referrer policy', () => {
    const headers = getSecurityHeaders()
    expect(headers['Referrer-Policy']).toBe('strict-origin-when-cross-origin')
  })

  it('should include CSP header', () => {
    const headers = getSecurityHeaders()
    expect(headers['Content-Security-Policy']).toBeTruthy()
  })
})
