/**
 * Audit Logging Utility
 * Logs admin and sensitive actions for security review
 */

export interface AuditLogEntry {
    adminId?: string
    action: string
    targetType: string
    targetId?: string
    details?: Record<string, unknown>
    ipAddress?: string
    userAgent?: string
}

/**
 * Log an audit event
 * Currently logs to console - can be extended to database/external service
 */
export async function logAuditEvent(entry: AuditLogEntry): Promise<void> {
    const timestamp = new Date().toISOString()

    const logEntry = {
        timestamp,
        ...entry,
    }

    // Log to console with structured format
    console.log(`[AUDIT] ${timestamp} | ${entry.action} | ${entry.targetType}${entry.targetId ? `:${entry.targetId}` : ''} | ${entry.adminId || 'anonymous'}`)

    // In production, you can extend this to:
    // 1. Write to database (AuditLog table)
    // 2. Send to external logging service (Sentry, Datadog, etc.)
    // 3. Write to file

    if (process.env.NODE_ENV === 'development') {
        console.log('[AUDIT] Details:', JSON.stringify(logEntry, null, 2))
    }
}

/**
 * Common audit action types
 */
export const AUDIT_ACTIONS = {
    // Admin actions
    REPORT_VERIFIED: 'report.verified',
    REPORT_REJECTED: 'report.rejected',
    USER_BANNED: 'user.banned',
    USER_ROLE_CHANGED: 'user.role_changed',
    BLOCKLIST_ADDED: 'blocklist.added',
    BLOCKLIST_REMOVED: 'blocklist.removed',
    WHITELIST_ADDED: 'whitelist.added',
    WHITELIST_REMOVED: 'whitelist.removed',

    // Sensitive actions
    API_KEY_CREATED: 'api_key.created',
    API_KEY_REVOKED: 'api_key.revoked',
    SETTINGS_CHANGED: 'settings.changed',

    // Security events
    RATE_LIMIT_EXCEEDED: 'security.rate_limit',
    SUSPICIOUS_ACTIVITY: 'security.suspicious',
    LOGIN_FAILED: 'auth.login_failed',
} as const

export type AuditAction = typeof AUDIT_ACTIONS[keyof typeof AUDIT_ACTIONS]
