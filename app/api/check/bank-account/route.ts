import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

// POST - Kiểm tra số tài khoản ngân hàng
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accountNumber, bankName } = body

    if (!accountNumber) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng nhập số tài khoản' },
        { status: 400 }
      )
    }

    // Chuẩn hóa số tài khoản (bỏ khoảng trắng, dấu gạch)
    const normalizedAccount = accountNumber.replace(/[\s\-\.]/g, '')

    // Tìm trong database ScamAccount
    const scamAccount = await prisma.scamAccount.findFirst({
      where: {
        type: 'BANK_ACCOUNT',
        value: normalizedAccount,
      },
    })

    if (scamAccount) {
      return NextResponse.json({
        success: true,
        found: true,
        data: {
          accountNumber: normalizedAccount,
          bankName: scamAccount.bankName,
          ownerName: scamAccount.ownerName,
          reportCount: scamAccount.reportCount,
          totalLoss: scamAccount.totalAmount,
          verified: scamAccount.verified,
          description: scamAccount.description,
          firstReported: scamAccount.createdAt,
          riskLevel: scamAccount.verified ? 'DANGEROUS' : 'SUSPICIOUS',
        },
        message: scamAccount.verified 
          ? '⚠️ CẢNH BÁO: Số tài khoản này đã được XÁC NHẬN là lừa đảo!'
          : '⚠️ Số tài khoản này đã bị báo cáo lừa đảo. Hãy cẩn thận!',
      })
    }

    // Không tìm thấy trong database
    return NextResponse.json({
      success: true,
      found: false,
      data: {
        accountNumber: normalizedAccount,
        riskLevel: 'UNKNOWN',
      },
      message: '✅ Số tài khoản này chưa có trong danh sách báo cáo lừa đảo. Tuy nhiên, hãy luôn cẩn thận khi chuyển tiền.',
    })
  } catch (error) {
    console.error('Error checking bank account:', error)
    return NextResponse.json(
      { success: false, error: 'Không thể kiểm tra số tài khoản' },
      { status: 500 }
    )
  }
}

// GET - Lấy danh sách tài khoản lừa đảo gần đây
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const bankName = searchParams.get('bank')

    const where: any = {
      type: 'BANK_ACCOUNT',
      verified: true,
    }

    if (bankName) where.bankName = bankName

    const accounts = await prisma.scamAccount.findMany({
      where,
      orderBy: { reportCount: 'desc' },
      take: limit,
      select: {
        value: true,
        bankName: true,
        reportCount: true,
        totalAmount: true,
        createdAt: true,
      },
    })

    // Mask số tài khoản (chỉ hiện 4 số cuối)
    const maskedAccounts = accounts.map((acc: { value: string; bankName: string | null; reportCount: number; totalAmount: number | null; createdAt: Date }) => ({
      ...acc,
      value: '*'.repeat(acc.value.length - 4) + acc.value.slice(-4),
    }))

    return NextResponse.json({
      success: true,
      data: maskedAccounts,
    })
  } catch (error) {
    console.error('Error fetching scam accounts:', error)
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách' },
      { status: 500 }
    )
  }
}
