import { describe, it, expect, vi } from 'vitest'

/**
 * Tests for Website Analyzer Module
 */

vi.mock('../db', () => ({
  default: {
    whitelist: { findUnique: vi.fn().mockResolvedValue(null) },
    blocklist: { findUnique: vi.fn().mockResolvedValue(null) },
  },
}))

describe('Website Analyzer', () => {
  it('should be importable', async () => {
    const analyzer = await import('../websiteAnalyzer')
    expect(analyzer).toBeDefined()
  })

  it('should export analysis functions', async () => {
    const analyzer = await import('../websiteAnalyzer')
    const exports = Object.keys(analyzer)
    expect(exports.length).toBeGreaterThan(0)
  })
})
