import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { analyzeUrl } from '@/app/lib/analyze'
import prisma from '@/app/lib/db'
import { getToday } from '@/app/lib/utils'
import {
  getClientIP,
  checkRateLimit,
  validateUrl,
  getSecurityHeaders,
} from '@/app/lib/security'
import {
  analyzeWebsite,
  detectCategoryFromDomain,
} from '@/app/lib/websiteAnalyzer'
import { checkExternalSources } from '@/app/lib/externalSources'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  const headers = getSecurityHeaders()
  
  try {
    // Get session (optional - works for both logged in and anonymous users)
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateLimit = checkRateLimit(clientIP, 'scan')
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.' },
        { status: 429, headers: { ...headers, 'Retry-After': String(Math.ceil(rateLimit.resetIn / 1000)) } }
      )
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
      checkExternalSources(result.domain),
      Promise.resolve(detectCategoryFromDomain(result.domain)),
    ])

    // Add external source warnings
    if (externalCheck.isKnownScam) {
      result.reasons.unshift(...externalCheck.sources.map((s) => `🚫 ${s}`))
      result.score = Math.max(result.score, 80)
    }

    // Save to database
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const shareToken = nanoid(10) // Generate share token
    
    // Save to legacy Scan table (for global stats)
    prisma.scan.create({
      data: {
        url,
        domain: result.domain,
        score: result.score,
        label: result.label,
        reasons: result.reasons,
        aiConfidence: result.aiConfidence,
        ipAddress: clientIP,
        userAgent: userAgent.slice(0, 500),
      },
    }).catch((err: Error) => console.error('[DB] Save scan error:', err.message))

    // Save to ScanHistory if user is logged in
    if (userId) {
      prisma.scanHistory.create({
        data: {
          userId,
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
          userAgent: userAgent.slice(0, 500),
        },
      }).catch((err: Error) => console.error('[DB] Save scan history error:', err.message))
      
      // Update user stats
      prisma.user.update({
        where: { id: userId },
        data: {
          dailyScans: { increment: 1 },
          totalScans: { increment: 1 },
        },
      }).catch((err: Error) => console.error('[DB] Update user stats error:', err.message))
    }

    // Update daily stats (non-blocking)
    const today = getToday()
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
        ...(result.label === 'SAFE' && { safeCount: { increment: 1 } }),
        ...(result.label === 'CAUTION' && { cautionCount: { increment: 1 } }),
        ...(result.label === 'DANGEROUS' && { dangerousCount: { increment: 1 } }),
      },
    }).catch((err: Error) => console.error('[DB] Update stats error:', err.message))

    return NextResponse.json(
      {
        success: true,
        data: {
          url: result.url,
          domain: result.domain,
          score: result.score,
          label: result.label,
          reasons: result.reasons,
          aiConfidence: result.aiConfidence,
          heuristicScore: result.heuristicScore,
          aiScore: result.aiScore,
          // Website details
          websiteInfo: websiteInfo
            ? {
                title: websiteInfo.title,
                description: websiteInfo.description,
                category: websiteInfo.category,
                industry: websiteInfo.industry,
                subCategory: websiteInfo.subCategory,
                technologies: websiteInfo.technologies,
                framework: websiteInfo.framework,
                cms: websiteInfo.cms,
                hasSSL: websiteInfo.hasSSL,
                hasLoginForm: websiteInfo.hasLoginForm,
                hasPaymentForm: websiteInfo.hasPaymentForm,
                hasContactInfo: websiteInfo.hasContactInfo,
                hasSocialLinks: websiteInfo.hasSocialLinks,
                hasPrivacyPolicy: websiteInfo.hasPrivacyPolicy,
                riskFactors: websiteInfo.riskFactors,
                trustFactors: websiteInfo.trustFactors,
                mobileOptimized: websiteInfo.mobileOptimized,
              }
            : null,
          categoryGuess: categoryGuess,
          externalSources: externalCheck.sources,
          virusTotal: externalCheck.virusTotal,
        },
      },
      { headers: { ...headers, 'X-RateLimit-Remaining': String(rateLimit.remaining) } }
    )

  } catch (error) {
    console.error('[API] Scan error:', error)
    return NextResponse.json(
      { success: false, error: 'Lỗi hệ thống. Vui lòng thử lại.' },
      { status: 500, headers }
    )
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'anti-scam-api' })
}
