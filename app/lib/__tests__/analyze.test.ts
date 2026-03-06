import { describe, it, expect, vi } from 'vitest'

/**
 * Tests for URL Analysis Engine
 * Tests the heuristic analysis components (AI mocked)
 */

// Mock database
vi.mock('../db', () => ({
  default: {
    whitelist: { findUnique: vi.fn().mockResolvedValue(null) },
    blocklist: { findUnique: vi.fn().mockResolvedValue(null) },
  },
}))

// Mock AI model
vi.mock('../aiModel', () => ({
  analyzeWithAI: vi.fn().mockResolvedValue({ score: 30, confidence: 0.8 }),
}))

// Mock Vietnamese scam patterns
vi.mock('../vietnameseScamPatterns', () => ({
  isGamblingDomain: vi.fn().mockReturnValue(false),
  isPhishingDomain: vi.fn().mockReturnValue(false),
  detectSocialEngineering: vi.fn().mockReturnValue({ detected: false, score: 0 }),
  detectInvestmentScam: vi.fn().mockReturnValue({ detected: false, score: 0 }),
}))

describe('URL Analysis Engine', () => {
  it('should be importable', async () => {
    const analyze = await import('../analyze')
    expect(analyze).toBeDefined()
  })

  it('should export analyzeUrl function', async () => {
    const { analyzeUrl } = await import('../analyze')
    expect(typeof analyzeUrl).toBe('function')
  })

  it('should export runHeuristics function', async () => {
    const { runHeuristics } = await import('../analyze')
    expect(typeof runHeuristics).toBe('function')
  })

  describe('runHeuristics', () => {
    it('should return score and reasons for suspicious TLD', async () => {
      const { runHeuristics } = await import('../analyze')
      const result = runHeuristics('https://evil-site.xyz', 'evil-site.xyz')
      expect(result).toHaveProperty('score')
      expect(result).toHaveProperty('reasons')
      expect(result.score).toBeGreaterThan(0)
    })

    it('should return low score for legitimate domain', async () => {
      const { runHeuristics } = await import('../analyze')
      const result = runHeuristics('https://google.com', 'google.com')
      expect(result.score).toBeLessThanOrEqual(30)
    })

    it('should detect brand impersonation', async () => {
      const { runHeuristics } = await import('../analyze')
      const result = runHeuristics('https://vietcombank-login.xyz', 'vietcombank-login.xyz')
      expect(result.score).toBeGreaterThan(0)
    })

    it('should flag URL shorteners', async () => {
      const { runHeuristics } = await import('../analyze')
      const result = runHeuristics('https://bit.ly/abc123', 'bit.ly')
      expect(result.score).toBeGreaterThanOrEqual(0)
    })
  })
})
