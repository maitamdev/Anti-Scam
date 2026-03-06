# Testing Guide

## Setup
npm install

## Run Tests
npm run test        # Run all tests
npm run test:watch  # Watch mode
npm run test:coverage # Coverage report

## Test Structure
app/lib/__tests__/ - Unit tests for lib modules

## Writing Tests
import { describe, it, expect, vi } from 'vitest'
import { functionName } from '../module'

describe('Module', () => {
  it('should work', () => {
    expect(functionName()).toBeDefined()
  })
})

## Mocking
vi.mock('./dependency', () => ({
  default: vi.fn()
}))docs: add testing guide with examples
