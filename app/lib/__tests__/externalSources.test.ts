import { describe, it, expect, vi } from 'vitest'

/**
 * Tests for External Sources Integration
 */

// Mock fetch for external API calls
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({}),
  text: async () => '',
})

describe('External Sources', () => {
  it('should be importable', async () => {
    const sources = await import('../externalSources')
    expect(sources).toBeDefined()
  })

  it('should export check functions', async () => {
    const sources = await import('../externalSources')
    const exports = Object.keys(sources)
    expect(exports.length).toBeGreaterThan(0)
  })
})
