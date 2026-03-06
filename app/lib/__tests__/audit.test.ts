import { describe, it, expect, vi } from 'vitest'

/**
 * Tests for Audit Logger Module
 * Verifies audit trail functionality for security-sensitive operations
 */

// Mock the audit module since it may have DB dependencies
vi.mock('../db', () => ({
  default: {
    apiUsage: {
      create: vi.fn().mockResolvedValue({ id: 'test-id' }),
    },
  },
}))

describe('Audit Logger', () => {
  it('should be importable', async () => {
    const audit = await import('../audit')
    expect(audit).toBeDefined()
  })

  it('should export audit functions', async () => {
    const audit = await import('../audit')
    expect(typeof audit.logApiAccess).toBe('function')
  })

  it('should handle audit log creation', async () => {
    const audit = await import('../audit')
    // Should not throw when logging
    expect(() => {
      audit.logApiAccess({
        userId: 'test-user',
        endpoint: '/api/scan',
        method: 'POST',
        statusCode: 200,
        ipAddress: '127.0.0.1',
      })
    }).not.toThrow()
  })
})
