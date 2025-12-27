import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params

    // Find scan by share token
    const scan = await prisma.scanHistory.findUnique({
      where: { shareToken: token },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    })

    if (!scan || !scan.isPublic) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy kết quả hoặc đã bị ẩn' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        url: scan.url,
        domain: scan.domain,
        score: scan.score,
        label: scan.label,
        reasons: scan.reasons,
        aiConfidence: scan.aiConfidence,
        createdAt: scan.createdAt,
        sharedBy: scan.user?.name || 'Anonymous',
      },
    })
  } catch (error) {
    console.error('Share fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Lỗi hệ thống' },
      { status: 500 }
    )
  }
}
