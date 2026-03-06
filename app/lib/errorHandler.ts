/**
 * Centralized Error Handler
 * Consistent error handling across the application
 */

/**
 * Application error types
 */
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMITED = 'RATE_LIMITED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
}

/**
 * Custom application error class
 */
export class AppError extends Error {
  public readonly code: ErrorCode
  public readonly statusCode: number
  public readonly isOperational: boolean
  public readonly details?: unknown

  constructor(
    message: string,
    code: ErrorCode,
    statusCode: number = 500,
    details?: unknown
  ) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.statusCode = statusCode
    this.isOperational = true
    this.details = details
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

/**
 * Create common errors
 */
export const Errors = {
  validation: (message: string, details?: unknown) =>
    new AppError(message, ErrorCode.VALIDATION_ERROR, 400, details),

  unauthorized: (message: string = 'Yêu cầu đăng nhập') =>
    new AppError(message, ErrorCode.AUTHENTICATION_ERROR, 401),

  forbidden: (message: string = 'Không có quyền truy cập') =>
    new AppError(message, ErrorCode.AUTHORIZATION_ERROR, 403),

  notFound: (resource: string = 'Tài nguyên') =>
    new AppError(`${resource} không tìm thấy`, ErrorCode.NOT_FOUND, 404),

  rateLimited: (retryAfter?: number) =>
    new AppError(
      'Quá nhiều yêu cầu, vui lòng thử lại sau',
      ErrorCode.RATE_LIMITED,
      429,
      { retryAfter }
    ),

  internal: (message: string = 'Lỗi hệ thống') =>
    new AppError(message, ErrorCode.INTERNAL_ERROR, 500),

  externalService: (service: string) =>
    new AppError(`Dịch vụ ${service} không khả dụng`, ErrorCode.EXTERNAL_SERVICE_ERROR, 502),

  database: (message: string = 'Lỗi cơ sở dữ liệu') =>
    new AppError(message, ErrorCode.DATABASE_ERROR, 500),
}

/**
 * Handle error and return a consistent error response
 */
export function handleError(error: unknown): {
  message: string
  code: string
  statusCode: number
} {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: ErrorCode.INTERNAL_ERROR,
      statusCode: 500,
    }
  }

  return {
    message: 'Đã xảy ra lỗi không xác định',
    code: ErrorCode.INTERNAL_ERROR,
    statusCode: 500,
  }
}

/**
 * Check if error is operational (expected) vs programming error
 */
export function isOperationalError(error: unknown): boolean {
  if (error instanceof AppError) {
    return error.isOperational
  }
  return false
}
