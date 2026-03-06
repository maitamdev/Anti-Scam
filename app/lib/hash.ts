/**
 * Hashing Utilities
 * Client and server-side hashing functions
 */

/**
 * Generate a simple hash from a string (for client-side use, NOT cryptographic)
 */
export function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36)
}

/**
 * Generate SHA-256 hash using Web Crypto API
 */
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Generate a random ID (non-cryptographic)
 */
export function generateId(length: number = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Generate a fingerprint from user agent and other browser properties
 */
export function generateBrowserFingerprint(): string {
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth.toString(),
    `${screen.width}x${screen.height}`,
    new Date().getTimezoneOffset().toString(),
  ]
  return simpleHash(components.join('|'))
}
