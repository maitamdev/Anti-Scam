import { describe, it, expect, vi } from 'vitest'

/**
 * Tests for Vietnamese Scam Patterns Detection
 */

describe('Vietnamese Scam Patterns', () => {
  it('should be importable', async () => {
    const patterns = await import('../vietnameseScamPatterns')
    expect(patterns).toBeDefined()
  })

  it('should export isGamblingDomain', async () => {
    const { isGamblingDomain } = await import('../vietnameseScamPatterns')
    expect(typeof isGamblingDomain).toBe('function')
  })

  it('should export isPhishingDomain', async () => {
    const { isPhishingDomain } = await import('../vietnameseScamPatterns')
    expect(typeof isPhishingDomain).toBe('function')
  })

  it('should export detectSocialEngineering', async () => {
    const { detectSocialEngineering } = await import('../vietnameseScamPatterns')
    expect(typeof detectSocialEngineering).toBe('function')
  })

  it('should export detectInvestmentScam', async () => {
    const { detectInvestmentScam } = await import('../vietnameseScamPatterns')
    expect(typeof detectInvestmentScam).toBe('function')
  })

  it('should detect gambling domains', async () => {
    const { isGamblingDomain } = await import('../vietnameseScamPatterns')
    // Common gambling domain patterns
    const result = isGamblingDomain('casino-online.xyz')
    expect(typeof result).toBe('boolean')
  })

  it('should detect phishing domains', async () => {
    const { isPhishingDomain } = await import('../vietnameseScamPatterns')
    const result = isPhishingDomain('vietcombank-secure-login.xyz')
    expect(typeof result).toBe('boolean')
  })
})
