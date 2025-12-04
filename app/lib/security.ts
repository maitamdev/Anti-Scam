/**
 * Security utilities for production
 * Rate limiting, input validation, sanitization
 */

import { NextRequest } from 'next/server'

// In-memory rate limiter (use Redis in production for multi-instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

interface RateLimitConfig {
  windowMs: number  // Time window in ms
  maxRequests: number  // Max requests per window
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  scan: { windowMs: 60000, maxRequests: 10 },      // 10 scans/minute (stricter for demo)
  scanImage: { windowMs: 60000, maxRequests: 5 },  // 5 image scans/minute (API intensive)
  report: { windowMs: 60000, maxRequests: 3 },     // 3 reports/minute
  admin: { windowMs: 60000, maxRequests: 50 },     // 50 admin requests/minute
  default: { windowMs: 60000, maxRequests: 30 },   // 30 requests/minute
}

export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfIP = request.headers.get('cf-connecting-ip')
  
  if (cfIP) return cfIP
  if (forwarded) return forwarded.split(',')[0].trim()
  if (realIP) return realIP
  return 'unknown'
}

export function checkRateLimit(
  identifier: string,
  type: keyof typeof RATE_LIMITS = 'default'
): { allowed: boolean; remaining: number; resetIn: number } {
  const config = RATE_LIMITS[type] || RATE_LIMITS.default
  const now = Date.now()
  const key = `${type}:${identifier}`
  
  const record = rateLimitMap.get(key)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + config.windowMs })
    return { allowed: true, remaining: config.maxRequests - 1, resetIn: config.windowMs }
  }
  
  if (record.count >= config.maxRequests) {
    return { 
      allowed: false, 
      remaining: 0, 
      resetIn: record.resetTime - now 
    }
  }
  
  record.count++
  return { 
    allowed: true, 
    remaining: config.maxRequests - record.count, 
    resetIn: record.resetTime - now 
  }
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now()
  const keys = Array.from(rateLimitMap.keys())
  for (const key of keys) {
    const value = rateLimitMap.get(key)
    if (value && now > value.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}, 60000)

// URL validation and sanitization
export function validateUrl(input: string): { valid: boolean; url: string; error?: string } {
  if (!input || typeof input !== 'string') {
    return { valid: false, url: '', error: 'URL không được để trống' }
  }

  // Trim and basic cleanup
  let url = input.trim()
  
  // Length check
  if (url.length > 2048) {
    return { valid: false, url: '', error: 'URL quá dài (tối đa 2048 ký tự)' }
  }

  // Add protocol if missing
  if (!url.match(/^https?:\/\//i)) {
    url = 'https://' + url
  }

  // Validate URL format
  try {
    const parsed = new URL(url)
    
    // Only allow http/https
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { valid: false, url: '', error: 'Chỉ hỗ trợ HTTP/HTTPS' }
    }

    // Block localhost and private IPs
    const hostname = parsed.hostname.toLowerCase()
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.16.') ||
      hostname.endsWith('.local')
    ) {
      return { valid: false, url: '', error: 'Không hỗ trợ địa chỉ nội bộ' }
    }

    return { valid: true, url: parsed.href }
  } catch {
    return { valid: false, url: '', error: 'URL không hợp lệ' }
  }
}

// Sanitize text input
export function sanitizeText(input: string, maxLength: number = 1000): string {
  if (!input || typeof input !== 'string') return ''
  
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"]/g, '')  // Remove potential XSS chars
}

// Verify admin secret
export function verifyAdminSecret(secret: string | null): boolean {
  const adminSecret = process.env.ADMIN_SECRET
  if (!adminSecret || adminSecret === 'your-admin-secret-key') {
    console.warn('ADMIN_SECRET not configured!')
    return false
  }
  return secret === adminSecret
}

// Generate secure response headers
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
  }
}
