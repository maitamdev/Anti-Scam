/**
 * Rate Limiting based on User Tier
 */

import { Tier } from '@prisma/client'
import prisma from './db'

export interface RateLimitConfig {
  scansPerDay: number
  scansPerHour: number
  imageScansPerDay: number
  apiCallsPerMinute: number
}

export const RATE_LIMITS: Record<Tier, RateLimitConfig> = {
  FREE: {
    scansPerDay: 10,
    scansPerHour: 5,
    imageScansPerDay: 3,
    apiCallsPerMinute: 10,
  },
  PRO: {
    scansPerDay: 100,
    scansPerHour: 50,
    imageScansPerDay: 30,
    apiCallsPerMinute: 100,
  },
  BUSINESS: {
    scansPerDay: 1000,
    scansPerHour: 500,
    imageScansPerDay: 200,
    apiCallsPerMinute: 500,
  },
  ENTERPRISE: {
    scansPerDay: -1, // unlimited
    scansPerHour: -1,
    imageScansPerDay: -1,
    apiCallsPerMinute: -1,
  }
}

export async function checkRateLimit(
  userId: string,
  type: 'scan' | 'imageScan'
): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      tier: true,
      dailyScans: true,
      dailyImageScans: true,
      lastResetAt: true
    }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const limits = RATE_LIMITS[user.tier]
  const now = new Date()
  const lastReset = new Date(user.lastResetAt)
  
  // Reset daily counters if needed
  const shouldReset = now.getDate() !== lastReset.getDate() || 
                      now.getMonth() !== lastReset.getMonth() ||
                      now.getFullYear() !== lastReset.getFullYear()

  if (shouldReset) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        dailyScans: 0,
        dailyImageScans: 0,
        lastResetAt: now
      }
    })
    user.dailyScans = 0
    user.dailyImageScans = 0
  }

  // Check limits
  const currentUsage = type === 'scan' ? user.dailyScans : user.dailyImageScans
  const limit = type === 'scan' ? limits.scansPerDay : limits.imageScansPerDay
  
  // Unlimited tier
  if (limit === -1) {
    return {
      allowed: true,
      remaining: -1,
      resetAt: getNextResetDate()
    }
  }

  const allowed = currentUsage < limit
  const remaining = Math.max(0, limit - currentUsage)

  return {
    allowed,
    remaining,
    resetAt: getNextResetDate()
  }
}

export async function incrementUsage(userId: string, type: 'scan' | 'imageScan') {
  const field = type === 'scan' ? 'dailyScans' : 'dailyImageScans'
  
  await prisma.user.update({
    where: { id: userId },
    data: {
      [field]: { increment: 1 },
      totalScans: { increment: 1 }
    }
  })
}

function getNextResetDate(): Date {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  return tomorrow
}

// IP-based rate limiting for anonymous users
const ipLimitStore = new Map<string, { count: number; resetAt: number }>()

export function checkIPRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const limit = 20 // 20 requests per hour for anonymous users
  const windowMs = 60 * 60 * 1000 // 1 hour

  const record = ipLimitStore.get(ip)

  if (!record || now > record.resetAt) {
    ipLimitStore.set(ip, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1 }
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: limit - record.count }
}

// Clean up old IP records periodically
setInterval(() => {
  const now = Date.now()
  const entries = Array.from(ipLimitStore.entries())
  for (const [ip, record] of entries) {
    if (now > record.resetAt) {
      ipLimitStore.delete(ip)
    }
  }
}, 15 * 60 * 1000) // Every 15 minutes
