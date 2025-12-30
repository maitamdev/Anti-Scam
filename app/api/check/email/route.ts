import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

// POST - Kiểm tra email lừa đảo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng nhập email' },
        { status: 400 }
      )
    }

    // Chuẩn hóa email
    const normalizedEmail = email.toLowerCase().trim()
    const domain = normalizedEmail.split('@')[1]

    // Tìm email chính xác
    const scamEmail = await prisma.scamEmail.findUnique({
      where: { email: normalizedEmail },
    })

    if (scamEmail) {
      return NextResponse.json({
        success: true,
        found: true,
        matchType: 'exact',
        data: {
          email: normalizedEmail,
          domain: scamEmail.domain,
          senderName: scamEmail.senderName,
          subject: scamEmail.subject,
          category: scamEmail.category,
          reportCount: scamEmail.reportCount,
          verified: scamEmail.verified,
          description: scamEmail.description,
          firstReported: scamEmail.createdAt,
          riskLevel: scamEmail.verified ? 'DANGEROUS' : 'SUSPICIOUS',
        },
        message: scamEmail.verified
          ? '⚠️ CẢNH BÁO: Email này đã được XÁC NHẬN là lừa đảo!'
          : '⚠️ Email này đã bị báo cáo lừa đảo. Hãy cẩn thận!',
      })
    }

    // Kiểm tra domain có đáng ngờ không
    const suspiciousDomains = await prisma.scamEmail.findMany({
      where: { domain },
      take: 5,
    })

    if (suspiciousDomains.length > 0) {
      return NextResponse.json({
        success: true,
        found: true,
        matchType: 'domain',
        data: {
          email: normalizedEmail,
          domain,
          relatedScamEmails: suspiciousDomains.length,
          riskLevel: 'SUSPICIOUS',
        },
        message: `⚠️ Domain ${domain} có ${suspiciousDomains.length} email khác đã bị báo cáo lừa đảo. Hãy cẩn thận!`,
      })
    }

    // Kiểm tra các pattern email lừa đảo phổ biến
    const suspiciousPatterns = [
      /support.*@gmail\.com/i,
      /admin.*@gmail\.com/i,
      /security.*@gmail\.com/i,
      /.*bank.*@gmail\.com/i,
      /.*verify.*@gmail\.com/i,
      /.*confirm.*@gmail\.com/i,
    ]

    const isSuspiciousPattern = suspiciousPatterns.some(pattern => pattern.test(normalizedEmail))

    if (isSuspiciousPattern) {
      return NextResponse.json({
        success: true,
        found: false,
        data: {
          email: normalizedEmail,
          domain,
          riskLevel: 'CAUTION',
        },
        message: '⚠️ Email này có pattern đáng ngờ (tổ chức chính thức không dùng Gmail). Hãy xác minh nguồn gốc trước khi tin tưởng.',
      })
    }

    // Không tìm thấy
    return NextResponse.json({
      success: true,
      found: false,
      data: {
        email: normalizedEmail,
        domain,
        riskLevel: 'UNKNOWN',
      },
      message: '✅ Email này chưa có trong danh sách báo cáo lừa đảo. Tuy nhiên, hãy luôn cẩn thận với email từ người lạ.',
    })
  } catch (error) {
    console.error('Error checking email:', error)
    return NextResponse.json(
      { success: false, error: 'Không thể kiểm tra email' },
      { status: 500 }
    )
  }
}

// GET - Lấy danh sách email lừa đảo gần đây
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')

    const where: any = {
      verified: true,
    }

    if (category) where.category = category

    const emails = await prisma.scamEmail.findMany({
      where,
      orderBy: { reportCount: 'desc' },
      take: limit,
      select: {
        email: true,
        domain: true,
        senderName: true,
        category: true,
        reportCount: true,
        createdAt: true,
      },
    })

    // Mask email (chỉ hiện domain)
    const maskedEmails = emails.map((e: { email: string; domain: string; senderName: string | null; category: string; reportCount: number; createdAt: Date }) => ({
      ...e,
      email: '***@' + e.domain,
    }))

    return NextResponse.json({
      success: true,
      data: maskedEmails,
    })
  } catch (error) {
    console.error('Error fetching scam emails:', error)
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách' },
      { status: 500 }
    )
  }
}
