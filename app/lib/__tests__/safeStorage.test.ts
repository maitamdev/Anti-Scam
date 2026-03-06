import { describe, it, expect, vi, beforeEach } from 'vitest'
import { safeGetItem, safeSetItem, safeRemoveItem } from '../safeStorage'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
}

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

describe('safeStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('safeGetItem', () => {
    it('should return stored value', () => {
      localStorageMock.getItem.mockReturnValue('test-value')
      expect(safeGetItem('test-key')).toBe('test-value')
    })

    it('should return null for non-existent key', () => {
      localStorageMock.getItem.mockReturnValue(null)
      expect(safeGetItem('non-existent')).toBeNull()
    })

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('Storage error')
      })
      expect(safeGetItem('test-key')).toBeNull()
    })
  })

  describe('safeSetItem', () => {
    it('should set value in localStorage', () => {
      safeSetItem('key', 'value')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('key', 'value')
    })

    it('should handle storage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('QuotaExceeded')
      })
      expect(() => safeSetItem('key', 'value')).not.toThrow()
    })
  })

  describe('safeRemoveItem', () => {
    it('should remove item from localStorage', () => {
      safeRemoveItem('key')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('key')
    })

    it('should handle removal errors gracefully', () => {
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('Error')
      })
      expect(() => safeRemoveItem('key')).not.toThrow()
    })
  })
})
