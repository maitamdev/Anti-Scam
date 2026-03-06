import { describe, it, expect, vi } from 'vitest'

/**
 * Tests for Threat Feeds Integration
 */

global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ results: [] }),
  text: async () => '',
})

vi.mock('../db', () => ({
  default: {
    blocklist: {
      upsert: vi.fn().mockResolvedValue({ id: 'test' }),
      findMany: vi.fn().mockResolvedValue([]),
    },
    threatFeedLog: {
      create: vi.fn().mockResolvedValue({ id: 'test' }),
    },
  },
}))

describe('Threat Feeds', () => {
  it('should be importable', async () => {
    const feeds = await import('../threatFeeds')
    expect(feeds).toBeDefined()
  })

  it('should export sync functions', async () => {
    const feeds = await import('../threatFeeds')
    const exports = Object.keys(feeds)
    expect(exports.length).toBeGreaterThan(0)
  })
})
