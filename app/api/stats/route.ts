import { NextResponse } from 'next/server'
import prisma from '@/app/lib/db'

export async function GET() {
  try {
    // Get total counts
    const [totalScans, safeCount, cautionCount, dangerousCount, reportsCount] = await Promise.all([
      prisma.scan.count(),
      prisma.scan.count({ where: { label: 'SAFE' } }),
      prisma.scan.count({ where: { label: 'CAUTION' } }),
      prisma.scan.count({ where: { label: 'DANGEROUS' } }),
      prisma.report.count(),
    ])

    // Get daily stats for last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const dailyStats = await prisma.dailyStats.findMany({
      where: {
        date: { gte: thirtyDaysAgo },
      },
      orderBy: { date: 'asc' },
    })

    // Format daily stats
    const formattedDailyStats = dailyStats.map(stat => ({
      date: stat.date.toISOString().split('T')[0],
      scans: stat.totalScans,
      safe: stat.safeCount,
      caution: stat.cautionCount,
      dangerous: stat.dangerousCount,
    }))

    // Get top dangerous domains
    const topDomains = await prisma.scan.groupBy({
      by: ['domain'],
      where: {
        label: { in: ['DANGEROUS', 'CAUTION'] },
      },
      _count: { domain: true },
      orderBy: { _count: { domain: 'desc' } },
      take: 10,
    })

    const formattedTopDomains = topDomains.map(d => ({
      domain: d.domain,
      count: d._count.domain,
    }))

    // Get recent scans
    const recentScans = await prisma.scan.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        url: true,
        domain: true,
        score: true,
        label: true,
        createdAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        totalScans,
        safeCount,
        cautionCount,
        dangerousCount,
        reportsCount,
        dailyStats: formattedDailyStats,
        topDomains: formattedTopDomains,
        recentScans,
      },
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
