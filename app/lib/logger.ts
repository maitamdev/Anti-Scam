/**
 * Structured Logger
 * Configurable logging with levels, timestamps, and context
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: string
  data?: unknown
}

const LOG_COLORS: Record<LogLevel, string> = {
  debug: '\x1b[36m', // Cyan
  info: '\x1b[32m',  // Green
  warn: '\x1b[33m',  // Yellow
  error: '\x1b[31m', // Red
}

const RESET = '\x1b[0m'

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

const currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info'

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel]
}

function formatEntry(entry: LogEntry): string {
  const color = LOG_COLORS[entry.level]
  const prefix = entry.context ? `[${entry.context}]` : ''
  return `${color}[${entry.level.toUpperCase()}]${RESET} ${entry.timestamp} ${prefix} ${entry.message}`
}

function createEntry(level: LogLevel, message: string, context?: string, data?: unknown): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
    data,
  }
}

/**
 * Create a logger instance with optional context
 */
export function createLogger(context?: string) {
  return {
    debug(message: string, data?: unknown) {
      if (!shouldLog('debug')) return
      const entry = createEntry('debug', message, context, data)
      console.debug(formatEntry(entry), data || '')
    },

    info(message: string, data?: unknown) {
      if (!shouldLog('info')) return
      const entry = createEntry('info', message, context, data)
      console.info(formatEntry(entry), data || '')
    },

    warn(message: string, data?: unknown) {
      if (!shouldLog('warn')) return
      const entry = createEntry('warn', message, context, data)
      console.warn(formatEntry(entry), data || '')
    },

    error(message: string, error?: unknown) {
      if (!shouldLog('error')) return
      const entry = createEntry('error', message, context, error)
      console.error(formatEntry(entry), error || '')
    },
  }
}

/**
 * Default logger instance
 */
export const logger = createLogger('AntiScam')
