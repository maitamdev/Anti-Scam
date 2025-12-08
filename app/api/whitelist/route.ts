import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/db'

// Get whitelist
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')

    const whitelist = await prisma.whitelist.findMany({
      where: category ? { category } : undefined,
      orderBy: { brand: 'asc' },
    })

    return NextResponse.json({
      success: true,
      data: whitelist,
    })
  } catch (error) {
    console.error('Get whitelist error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Add to whitelist (admin only)
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const adminSecret = process.env.ADMIN_SECRET

    if (adminSecret && authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { domain, brand, category } = body

    if (!domain || !brand || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const entry = await prisma.whitelist.upsert({
      where: { domain },
      create: { domain, brand, category },
      update: { brand, category },
    })

    return NextResponse.json({
      success: true,
      data: entry,
    })
  } catch (error) {
    console.error('Add whitelist error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Delete from whitelist (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const adminSecret = process.env.ADMIN_SECRET

    if (adminSecret && authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
    )
  }

  const searchParams = request.nextUrl.searchParams
  const domain = searchParams.get('domain')

  if (!domain) {
      return NextResponse.json(
        { success: false, error: 'Missing domain' },
        { status: 400 }
      )
    }

    await prisma.whitelist.delete({
      where: { domain },
    })

    return NextResponse.json({
      success: true,
      message: 'Deleted successfully',
    })
  } catch (error) {
    console.error('Delete whitelist error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
