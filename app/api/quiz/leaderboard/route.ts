import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/db'

export const dynamic = 'force-dynamic'

interface LeaderboardEntry {
  userId: string
  userName: string
  userAvatar: string | null
  totalScore: number
  totalQuizzes: number
  averageScore: number
  rank: number
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const period = searchParams.get('period') || 'all' // all, week, month
    const limit = parseInt(searchParams.get('limit') || '50')

    // Calculate date filter
    let dateFilter: Date | undefined
    if (period === 'week') {
      dateFilter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    } else if (period === 'month') {
      dateFilter = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    }

    // Get quiz results from database
    // For now, we'll use a simple aggregation
    // In production, you might want a dedicated QuizResult table
    const results = await prisma.$queryRaw<Array<{
      userId: string
      userName: string
      userAvatar: string | null
      totalScore: bigint
      totalQuizzes: bigint
    }>>`
      SELECT 
        u.id as "userId",
        u.name as "userName",
        u.avatar as "userAvatar",
        COALESCE(SUM(sh.score), 0) as "totalScore",
        COUNT(sh.id) as "totalQuizzes"
      FROM "User" u
      LEFT JOIN "ScanHistory" sh ON u.id = sh."userId"
      ${dateFilter ? prisma.$queryRaw`WHERE sh."createdAt" >= ${dateFilter}` : prisma.$queryRaw``}
      GROUP BY u.id, u.name, u.avatar
      HAVING COUNT(sh.id) > 0
      ORDER BY "totalScore" DESC
      LIMIT ${limit}
    `

    // Calculate rankings and average scores
    const leaderboard: LeaderboardEntry[] = results.map((entry, index) => ({
      userId: entry.userId,
      userName: entry.userName || 'Anonymous',
      userAvatar: entry.userAvatar,
      totalScore: Number(entry.totalScore),
      totalQuizzes: Number(entry.totalQuizzes),
      averageScore: Math.round(Number(entry.totalScore) / Number(entry.totalQuizzes)),
      rank: index + 1,
    }))

    return NextResponse.json({
      success: true,
      data: {
        period,
        leaderboard,
        total: leaderboard.length,
      },
    })
  } catch (error) {
    console.error('Leaderboard error:', error)
    return NextResponse.json(
      { success: false, error: 'Lỗi hệ thống' },
      { status: 500 }
    )
  }
}

// Submit quiz result
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, score, totalQuestions, correctAnswers, category } = body

    if (!userId || score === undefined) {
      return NextResponse.json(
        { success: false, error: 'Thiếu thông tin' },
        { status: 400 }
      )
    }

    // Save quiz result (using ScanHistory temporarily)
    // In production, create a dedicated QuizResult table
    await prisma.scanHistory.create({
      data: {
        userId,
        url: `quiz://${category || 'general'}`,
        domain: 'quiz.internal',
        score,
        label: score >= 80 ? 'SAFE' : score >= 60 ? 'CAUTION' : 'DANGEROUS',
        reasons: [`Trả lời đúng ${correctAnswers}/${totalQuestions} câu`],
        aiConfidence: score / 100,
      },
    })

    return NextResponse.json({
      success: true,
      data: { message: 'Đã lưu kết quả' },
    })
  } catch (error) {
    console.error('Submit quiz error:', error)
    return NextResponse.json(
      { success: false, error: 'Lỗi hệ thống' },
      { status: 500 }
    )
  }
}
