/**
 * Standardized API Response Helper
 * Consistent JSON response format across all API routes
 */

import { NextResponse } from 'next/server'

interface ApiSuccessResponse<T> {
  success: true
  data: T
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}

interface ApiErrorResponse {
  success: false
  error: {
    message: string
    code: string
    details?: unknown
  }
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse

/**
 * Create a success response
 */
export function apiSuccess<T>(data: T, status: number = 200, meta?: ApiSuccessResponse<T>['meta']) {
  const body: ApiSuccessResponse<T> = { success: true, data }
  if (meta) body.meta = meta
  return NextResponse.json(body, { status })
}

/**
 * Create an error response
 */
export function apiError(
  message: string,
  code: string = 'INTERNAL_ERROR',
  status: number = 500,
  details?: unknown
) {
  const body: ApiErrorResponse = {
    success: false,
    error: { message, code, details },
  }
  return NextResponse.json(body, { status })
}

/**
 * Create a paginated success response
 */
export function apiPaginated<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
) {
  return apiSuccess(data, 200, {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  })
}

/**
 * Create a 400 Bad Request response
 */
export function apiBadRequest(message: string = 'Yêu cầu không hợp lệ', details?: unknown) {
  return apiError(message, 'BAD_REQUEST', 400, details)
}

/**
 * Create a 401 Unauthorized response
 */
export function apiUnauthorized(message: string = 'Yêu cầu đăng nhập') {
  return apiError(message, 'UNAUTHORIZED', 401)
}

/**
 * Create a 403 Forbidden response
 */
export function apiForbidden(message: string = 'Không có quyền truy cập') {
  return apiError(message, 'FORBIDDEN', 403)
}

/**
 * Create a 404 Not Found response
 */
export function apiNotFound(message: string = 'Không tìm thấy') {
  return apiError(message, 'NOT_FOUND', 404)
}

/**
 * Create a 429 Rate Limited response
 */
export function apiRateLimited(retryAfter?: number) {
  return apiError(
    'Quá nhiều yêu cầu, vui lòng thử lại sau',
    'RATE_LIMITED',
    429,
    { retryAfter }
  )
}
