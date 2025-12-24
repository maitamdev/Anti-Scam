import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { analyzeUrl } from '@/app/lib/analyze'
import prisma from '@/app/lib/db'
import { getToday } from '@/app/lib/utils'
import {
  getClientIP,
  checkRateLimit as checkIPRateLimit,
  validateUrl,
  getSecurityHeaders,
} from '@/app/lib/security'
import {
  analyzeWebsite,
  detectCategoryFromDomain,
} from '@/app/lib/websiteAnalyzer'
import { checkExternalSources } from '@/app/lib/externalSources'
import { checkRateLimit, incrementUsage, checkIPRateLimit as checkAnonLimit } from '@/app/lib/rate-limit'
import { nanoid } from 'nanoid'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const headers = getSecurityHeaders()
  
  try {
    const session = await getServerSession(authOptions)
    const clientIP = getClientIP(request)

    // Rate limiting - different for authenticated vs anonymous users
    if (session?.user) {
      // Authenticated user - check tier-based limits
      const rateLimit = await checkRateLimit(session.user.id, 'scan')
      
      if (!rateLimit.allowed) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Bạn đã hết lượt quét hôm nay (${rateLimit.remaining} còn lại). Nâng cấp lên Pro để được nhiều hơn.`,
            remaining: rateLimit.remaining,
            resetAt: rateLimit.resetAt,
          },
          { status: 429, headers }
        )
      }
    } else {
      // Anonymous user - IP-based rate limiting (loose limit)
      const ipLimit = checkAnonLimit(clientIP)
      
      if (!ipLimit.allowed) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Quá nhiều yêu cầu. Vui lòng đăng ký tài khoản miễn phí để quét nhiều hơn.',
            remaining: ipLimit.remaining,
            note: 'Đăng nhập để lưu lịch sử và nhận thêm tính năng!',
          },
          { status: 429, headers }
        )
      }
    }

    // Parse and validate input
    const body = await request.json().catch(() => ({}))
    const urlInput = body.url

    const validation = validateUrl(urlInput)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400, headers }
      )
    }

    const url = validation.url

    // Analyze URL
    const result = await analyzeUrl(url)

    // Get detailed website info
    const [websiteInfo, externalCheck, categoryGuess] = await Promise.all([
      analyzeWebsite(url).catch(() => null),
      checkExternalSources(result.domain).catch(() => null),
      detectCategoryFromDomain(result.domain),
    ])

    // Save to database (legacy Scan table for global stats - ALWAYS save)
    const today = getToday()
    await Promise.all([
      prisma.scan.create({
        data: {
          url,
          domain: result.domain,
          score: result.score,
          label: result.label,
          reasons: result.reasons,
          aiConfidence: result.aiConfidence,
          ipAddress: clientIP,
          userAgent: request.headers.get('user-agent') || undefined,
        },
      }),
      prisma.dailyStats.upsert({
        where: { date: today },
        create: {
          date: today,
          totalScans: 1,
          safeCount: result.label === 'SAFE' ? 1 : 0,
          cautionCount: result.label === 'CAUTION' ? 1 : 0,
          dangerousCount: result.label === 'DANGEROUS' ? 1 : 0,
        },
        update: {
          totalScans: { increment: 1 },
          safeCount: result.label === 'SAFE' ? { increment: 1 } : undefined,
          cautionCount: result.label === 'CAUTION' ? { increment: 1 } : undefined,
          dangerousCount: result.label === 'DANGEROUS' ? { increment: 1 } : undefined,
        },
      }),
    ])

    // Save to ScanHistory ONLY if user is authenticated (for personal history)
    let shareToken: string | undefined
    if (session?.user) {
      shareToken = nanoid(16)
      
      await Promise.all([
        prisma.scanHistory.create({
          data: {
            userId: session.user.id,
            url,
            domain: result.domain,
            score: result.score,
            label: result.label,
            reasons: result.reasons,
            aiConfidence: result.aiConfidence,
            heuristicScore: result.heuristicScore,
            aiScore: result.aiScore,
            shareToken,
            ipAddress: clientIP,
            userAgent: request.headers.get('user-agent') || undefined,
          },
        }),
        // Increment usage counter
        incrementUsage(session.user.id, 'scan'),
      ])

      // Check against user's watchlist
      const watchlistMatches = await prisma.watchlist.findMany({
        where: {
          userId: session.user.id,
          OR: [
            { type: 'DOMAIN', value: result.domain },
            { type: 'DOMAIN', value: { contains: result.domain } },
          ],
        },
      })

      // Create alerts for matches
      if (watchlistMatches.length > 0) {
        await Promise.all(
          watchlistMatches.map((watchlist) =>
            prisma.watchlistAlert.create({
              data: {
                watchlistId: watchlist.id,
                matchType: 'exact',
                matchedValue: url,
                context: `Phát hiện domain trong watchlist. Risk: ${result.label}`,
              },
            })
          )
        )
      }
    }

    // Build response
    const response = {
      success: true,
      data: {
        ...result,
        websiteInfo,
        externalCheck,
        category: categoryGuess,
        shareToken: session?.user ? shareToken : undefined,
        shareUrl: session?.user && shareToken 
          ? `${process.env.NEXT_PUBLIC_APP_URL}/share/${shareToken}` 
          : undefined,
      },
    }

    return NextResponse.json(response, { headers })

  } catch (error: any) {
    console.error('Scan error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Đã xảy ra lỗi khi phân tích. Vui lòng thử lại.',
      },
      { status: 500, headers }
    )
  }
}
