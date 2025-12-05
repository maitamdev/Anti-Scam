import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/db'

// GET - Lấy chi tiết guide theo slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const guide = await prisma.guide.findUnique({
      where: { slug: params.slug, isPublished: true },
      include: { category: true },
    })

    if (!guide) {
      return NextResponse.json(
        { success: false, error: 'Guide not found' },
        { status: 404 }
      )
    }

    // Tăng view count
    await prisma.guide.update({
      where: { id: guide.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json({
      success: true,
      data: guide,
    })
  } catch (error) {
    console.error('Get guide error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
