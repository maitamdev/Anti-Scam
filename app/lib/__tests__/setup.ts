/**
 * Test Setup File
 * Global test configuration and mocks for Vitest
 */

// Mock environment variables for testing
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'
process.env.NEXTAUTH_SECRET = 'test-secret-key-for-testing'
process.env.NEXTAUTH_URL = 'http://localhost:3000'
process.env.ADMIN_SECRET = 'test-admin-secret'

// Mock console.error to reduce noise in test output
const originalConsoleError = console.error
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const message = typeof args[0] === 'string' ? args[0] : ''
    if (
      message.includes('Warning:') ||
      message.includes('act()')
    ) {
      return
    }
    originalConsoleError(...args)
  }
})

afterAll(() => {
  console.error = originalConsoleError
})

// Global test utilities
export function createMockRequest(body?: unknown, headers?: Record<string, string>) {
  return {
    json: async () => body,
    headers: new Headers(headers),
    url: 'http://localhost:3000/api/test',
    method: 'POST',
  }
}

export function createMockResponse() {
  const res = {
    status: 200,
    body: null as unknown,
    headers: new Headers(),
    json(data: unknown) {
      res.body = data
      return res
    },
    setStatus(code: number) {
      res.status = code
      return res
    },
  }
  return res
}
