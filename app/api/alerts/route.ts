import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

// GET - Lấy danh sách cảnh báo lừa đảo
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const severity = searchParams.get('severity')
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')

    const where: any = {
      isActive: true,
    }

    if (category) where.category = category
    if (severity) where.severity = severity

    const [alerts, total] = await Promise.all([
      prisma.scamAlert.findMany({
        where,
        orderBy: [
          { isPinned: 'desc' },
          { createdAt: 'desc' },
        ],
        take: limit,
        skip: (page - 1) * limit,
      }),
      prisma.scamAlert.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: alerts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching alerts:', error)
    return NextResponse.json(
      { success: false, error: 'Không thể tải cảnh báo' },
      { status: 500 }
    )
  }
}

// POST - Tạo cảnh báo mới (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, summary, content, category, severity, targetGroup, platform, source } = body

    if (!title || !summary || !content || !category || !severity) {
      return NextResponse.json(
        { success: false, error: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      )
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Date.now()

    const alert = await prisma.scamAlert.create({
      data: {
        title,
        slug,
        summary,
        content,
        category,
        severity,
        targetGroup: targetGroup || ['all'],
        platform: platform || [],
        source: source || 'community',
      },
    })

    return NextResponse.json({ success: true, data: alert })
  } catch (error) {
    console.error('Error creating alert:', error)
    return NextResponse.json(
      { success: false, error: 'Không thể tạo cảnh báo' },
      { status: 500 }
    )
  }
}
