import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/db'

// GET - Lấy danh sách guides với filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '6')

    const where: any = { isPublished: true }

    if (category && category !== 'all') {
      where.category = { slug: category }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [guides, total, categories] = await Promise.all([
      prisma.guide.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.guide.count({ where }),
      prisma.guideCategory.findMany({
        orderBy: { order: 'asc' },
        include: {
          _count: { select: { guides: { where: { isPublished: true } } } },
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        guides,
        categories: categories.map((c) => ({
          ...c,
          count: c._count.guides,
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Get guides error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
