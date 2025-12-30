import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

// POST - Kiểm tra số điện thoại lừa đảo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone } = body

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng nhập số điện thoại' },
        { status: 400 }
      )
    }

    // Chuẩn hóa số điện thoại
    const normalizedPhone = phone.replace(/[\s\-\.()]/g, '').replace(/^84/, '0')

    // Tìm trong database ScamPhone
    const scamPhone = await prisma.scamPhone.findUnique({
      where: { phone: normalizedPhone },
    })

    if (scamPhone) {
      return NextResponse.json({
        success: true,
        found: true,
        data: {
          phone: normalizedPhone,
          carrier: scamPhone.carrier,
          category: scamPhone.category,
          reportCount: scamPhone.reportCount,
          verified: scamPhone.verified,
          description: scamPhone.description,
          firstReported: scamPhone.createdAt,
          riskLevel: scamPhone.verified ? 'DANGEROUS' : 'SUSPICIOUS',
        },
        message: scamPhone.verified
          ? '⚠️ CẢNH BÁO: Số điện thoại này đã được XÁC NHẬN là lừa đảo!'
          : '⚠️ Số điện thoại này đã bị báo cáo lừa đảo. Hãy cẩn thận!',
      })
    }

    // Kiểm tra trong ScamAccount (type = PHONE)
    const scamAccount = await prisma.scamAccount.findFirst({
      where: {
        type: 'PHONE',
        value: normalizedPhone,
      },
    })

    if (scamAccount) {
      return NextResponse.json({
        success: true,
        found: true,
        data: {
          phone: normalizedPhone,
          reportCount: scamAccount.reportCount,
          verified: scamAccount.verified,
          description: scamAccount.description,
          firstReported: scamAccount.createdAt,
          riskLevel: scamAccount.verified ? 'DANGEROUS' : 'SUSPICIOUS',
        },
        message: scamAccount.verified
          ? '⚠️ CẢNH BÁO: Số điện thoại này đã được XÁC NHẬN là lừa đảo!'
          : '⚠️ Số điện thoại này đã bị báo cáo lừa đảo. Hãy cẩn thận!',
      })
    }

    return NextResponse.json({
      success: true,
      found: false,
      data: {
        phone: normalizedPhone,
        riskLevel: 'UNKNOWN',
      },
      message: '✅ Số điện thoại này chưa có trong danh sách báo cáo lừa đảo. Tuy nhiên, hãy luôn cẩn thận với cuộc gọi từ số lạ.',
    })
  } catch (error) {
    console.error('Error checking phone:', error)
    return NextResponse.json(
      { success: false, error: 'Không thể kiểm tra số điện thoại' },
      { status: 500 }
    )
  }
}

// GET - Lấy danh sách số điện thoại lừa đảo gần đây
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    const phones = await prisma.scamPhone.findMany({
      where: { verified: true },
      orderBy: { reportCount: 'desc' },
      take: limit,
      select: {
        phone: true,
        carrier: true,
        category: true,
        reportCount: true,
        createdAt: true,
      },
    })

    // Mask số điện thoại
    const maskedPhones = phones.map((p: { phone: string; carrier: string | null; category: string; reportCount: number; createdAt: Date }) => ({
      ...p,
      phone: p.phone.slice(0, 4) + '***' + p.phone.slice(-3),
    }))

    return NextResponse.json({
      success: true,
      data: maskedPhones,
    })
  } catch (error) {
    console.error('Error fetching scam phones:', error)
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách' },
      { status: 500 }
    )
  }
}
