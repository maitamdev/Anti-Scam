/**
 * User Statistics API
 * Returns detailed stats for dashboard charts
 */

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import prisma from '@/app/lib/db'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Get all user scans
    const allScans = await prisma.scanHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        label: true,
        score: true,
        domain: true,
        createdAt: true,
      }
    })

    // Count by label
    const safeCount = allScans.filter(s => s.label === 'SAFE').length
    const cautionCount = allScans.filter(s => s.label === 'CAUTION').length
    const dangerousCount = allScans.filter(s => s.label === 'DANGEROUS').length

    // Get scans by day (last 7 days)
    const last7Days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)
      
      const dayScans = allScans.filter(s => {
        const scanDate = new Date(s.createdAt)
        return scanDate >= date && scanDate < nextDate
      })
      
      last7Days.push({
        date: date.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric' }),
        fullDate: date.toISOString().split('T')[0],
        scans: dayScans.length,
        safe: dayScans.filter(s => s.label === 'SAFE').length,
        caution: dayScans.filter(s => s.label === 'CAUTION').length,
        dangerous: dayScans.filter(s => s.label === 'DANGEROUS').length,
      })
    }

    // Get scans by month (last 6 months)
    const last6Months = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      date.setDate(1)
      date.setHours(0, 0, 0, 0)
      
      const nextMonth = new Date(date)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      
      const monthScans = allScans.filter(s => {
        const scanDate = new Date(s.createdAt)
        return scanDate >= date && scanDate < nextMonth
      })
      
      last6Months.push({
        month: date.toLocaleDateString('vi-VN', { month: 'short' }),
        scans: monthScans.length,
        safe: monthScans.filter(s => s.label === 'SAFE').length,
        caution: monthScans.filter(s => s.label === 'CAUTION').length,
        dangerous: monthScans.filter(s => s.label === 'DANGEROUS').length,
      })
    }

    // Top domains scanned
    const domainCounts: Record<string, number> = {}
    allScans.forEach(s => {
      domainCounts[s.domain] = (domainCounts[s.domain] || 0) + 1
    })
    const topDomains = Object.entries(domainCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([domain, count]) => ({ domain, count }))

    // Average score
    const avgScore = allScans.length > 0 
      ? Math.round(allScans.reduce((sum, s) => sum + s.score, 0) / allScans.length)
      : 0

    // Scans today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const scansToday = allScans.filter(s => new Date(s.createdAt) >= today).length

    // Scans this week
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    weekStart.setHours(0, 0, 0, 0)
    const scansThisWeek = allScans.filter(s => new Date(s.createdAt) >= weekStart).length

    // Scans this month
    const monthStart = new Date()
    monthStart.setDate(1)
    monthStart.setHours(0, 0, 0, 0)
    const scansThisMonth = allScans.filter(s => new Date(s.createdAt) >= monthStart).length

    return NextResponse.json({
      success: true,
      data: {
        totalScans: allScans.length,
        safeCount,
        cautionCount,
        dangerousCount,
        avgScore,
        scansToday,
        scansThisWeek,
        scansThisMonth,
        dailyStats: last7Days,
        monthlyStats: last6Months,
        topDomains,
        recentScans: allScans.slice(0, 5),
      }
    })

  } catch (error) {
    console.error('User stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
