import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/db'

// Get blocklist
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const severity = searchParams.get('severity')

    const blocklist = await prisma.blocklist.findMany({
      where: severity ? { severity } : undefined,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: blocklist,
    })
  } catch (error) {
    console.error('Get blocklist error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Add to blocklist (admin only)
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
    const { domain, reason, severity = 'MEDIUM', source = 'manual' } = body

    if (!domain || !reason) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const entry = await prisma.blocklist.upsert({
      where: { domain },
      create: { domain, reason, severity, source },
      update: { reason, severity, source },
    })

    return NextResponse.json({
      success: true,
      data: entry,
    })
  } catch (error) {
    console.error('Add blocklist error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Delete from blocklist (admin only)
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
  const domain = searchParams.get('domain')    if (!domain) {
      return NextResponse.json(
        { success: false, error: 'Missing domain' },
        { status: 400 }
      )
    }

    await prisma.blocklist.delete({
      where: { domain },
    })

    return NextResponse.json({
      success: true,
      message: 'Deleted successfully',
    })
  } catch (error) {
    console.error('Delete blocklist error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
