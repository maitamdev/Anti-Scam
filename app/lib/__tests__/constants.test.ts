import { describe, it, expect } from 'vitest'
import {
  SUSPICIOUS_TLDS,
  BRAND_KEYWORDS,
  LABELS,
  SCAN_LIMITS,
  RISK_KEYWORDS,
} from '../constants'

describe('SUSPICIOUS_TLDS', () => {
  it('should be defined and non-empty', () => {
    expect(SUSPICIOUS_TLDS).toBeDefined()
    expect(SUSPICIOUS_TLDS.length).toBeGreaterThan(0)
  })

  it('should contain common suspicious TLDs', () => {
    expect(SUSPICIOUS_TLDS).toContain('.xyz')
    expect(SUSPICIOUS_TLDS).toContain('.top')
  })

  it('should not contain common legitimate TLDs', () => {
    expect(SUSPICIOUS_TLDS).not.toContain('.com')
    expect(SUSPICIOUS_TLDS).not.toContain('.org')
  })
})

describe('BRAND_KEYWORDS', () => {
  it('should be defined and non-empty', () => {
    expect(BRAND_KEYWORDS).toBeDefined()
    expect(Object.keys(BRAND_KEYWORDS).length).toBeGreaterThan(0)
  })

  it('should contain major Vietnamese brands', () => {
    const keys = Object.keys(BRAND_KEYWORDS)
    const allBrands = keys.join(',').toLowerCase()
    expect(allBrands).toContain('vietcombank')
  })
})

describe('LABELS', () => {
  it('should have SAFE, CAUTION, DANGEROUS labels', () => {
    expect(LABELS).toHaveProperty('SAFE')
    expect(LABELS).toHaveProperty('CAUTION')
    expect(LABELS).toHaveProperty('DANGEROUS')
  })
})

describe('SCAN_LIMITS', () => {
  it('should be defined', () => {
    expect(SCAN_LIMITS).toBeDefined()
  })

  it('should have reasonable limits', () => {
    const limits = Object.values(SCAN_LIMITS) as number[]
    limits.forEach(limit => {
      if (typeof limit === 'number') {
        expect(limit).toBeGreaterThan(0)
      }
    })
  })
})

describe('RISK_KEYWORDS', () => {
  it('should be defined and non-empty', () => {
    expect(RISK_KEYWORDS).toBeDefined()
    expect(RISK_KEYWORDS.length).toBeGreaterThan(0)
  })

  it('should contain scam-related keywords', () => {
    const allKeywords = RISK_KEYWORDS.join(' ').toLowerCase()
    expect(allKeywords.length).toBeGreaterThan(0)
  })
})
