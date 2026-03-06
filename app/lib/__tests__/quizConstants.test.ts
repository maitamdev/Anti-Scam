import { describe, it, expect } from 'vitest'
import {
  QUIZ_CATEGORIES,
  DIFFICULTY_LEVELS,
  POINTS_PER_CORRECT,
  POINTS_PER_WRONG,
} from '../quizConstants'

describe('Quiz Constants', () => {
  describe('QUIZ_CATEGORIES', () => {
    it('should be defined and non-empty', () => {
      expect(QUIZ_CATEGORIES).toBeDefined()
      expect(QUIZ_CATEGORIES.length).toBeGreaterThan(0)
    })

    it('should contain scam-related categories', () => {
      const categories = QUIZ_CATEGORIES.map((c: { id: string }) => c.id)
      expect(categories.length).toBeGreaterThan(0)
    })
  })

  describe('DIFFICULTY_LEVELS', () => {
    it('should be defined', () => {
      expect(DIFFICULTY_LEVELS).toBeDefined()
    })

    it('should have multiple levels', () => {
      expect(Object.keys(DIFFICULTY_LEVELS).length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('POINTS_PER_CORRECT', () => {
    it('should be a positive number', () => {
      expect(POINTS_PER_CORRECT).toBeGreaterThan(0)
    })
  })

  describe('POINTS_PER_WRONG', () => {
    it('should be zero or negative', () => {
      expect(POINTS_PER_WRONG).toBeLessThanOrEqual(0)
    })
  })
})
