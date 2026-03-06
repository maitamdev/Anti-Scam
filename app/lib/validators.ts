/**
 * Input Validators
 * Email, URL, phone, and other validation utilities
 */

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

/**
 * Validate Vietnamese phone number
 */
export function isValidPhoneVN(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  // Vietnamese phone: 10 digits starting with 0, or 11 digits starting with 84
  if (cleaned.length === 10 && cleaned.startsWith('0')) return true
  if (cleaned.length === 11 && cleaned.startsWith('84')) return true
  if (cleaned.length === 12 && cleaned.startsWith('+84')) return true
  return false
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  valid: boolean
  score: number
  errors: string[]
} {
  const errors: string[] = []
  let score = 0

  if (password.length < 8) errors.push('Tối thiểu 8 ký tự')
  else score += 1

  if (password.length >= 12) score += 1

  if (/[a-z]/.test(password)) score += 1
  else errors.push('Cần có chữ thường')

  if (/[A-Z]/.test(password)) score += 1
  else errors.push('Cần có chữ hoa')

  if (/\d/.test(password)) score += 1
  else errors.push('Cần có số')

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1
  else errors.push('Cần có ký tự đặc biệt')

  return {
    valid: errors.length === 0,
    score: Math.min(score, 5),
    errors,
  }
}

/**
 * Validate Vietnamese bank account number
 */
export function isValidBankAccount(accountNumber: string): boolean {
  const cleaned = accountNumber.replace(/\D/g, '')
  return cleaned.length >= 8 && cleaned.length <= 19
}

/**
 * Validate domain name format
 */
export function isValidDomain(domain: string): boolean {
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
  return domainRegex.test(domain)
}

/**
 * Check if string contains only alphanumeric characters
 */
export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str)
}

/**
 * Validate IP address (IPv4)
 */
export function isValidIPv4(ip: string): boolean {
  const parts = ip.split('.')
  if (parts.length !== 4) return false
  return parts.every(part => {
    const num = parseInt(part, 10)
    return num >= 0 && num <= 255 && part === num.toString()
  })
}

/**
 * Check if a string is a valid hex color
 */
export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(color)
}

/**
 * Validate slug format
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}
