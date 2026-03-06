import { describe, it, expect } from 'vitest'

/**
 * Tests for i18n (Internationalization)
 */

describe('i18n Module', () => {
  it('should be importable', async () => {
    const i18nDir = await import('../i18n/vi')
    expect(i18nDir).toBeDefined()
  })

  it('should have Vietnamese translations', async () => {
    const vi_lang = await import('../i18n/vi')
    expect(vi_lang).toBeDefined()
    const exports = Object.keys(vi_lang)
    expect(exports.length).toBeGreaterThan(0)
  })
})
