/**
 * Organizations API
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import prisma from '@/app/lib/db'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.tier === 'FREE' || session.user.tier === 'PRO') {
      return NextResponse.json(
        { error: 'Organization features chỉ dành cho gói Business trở lên' },
        { status: 403 }
      )
    }

    const memberships = await prisma.organizationMember.findMany({
      where: { userId: session.user.id },
      include: {
        organization: {
          include: {
            _count: {
              select: { members: true }
            }
          }
        }
      },
      orderBy: { joinedAt: 'desc' }
    })

    const orgs = memberships.map(m => ({
      id: m.organization.id,
      name: m.organization.name,
      slug: m.organization.slug,
      role: m.role,
      memberCount: m.organization._count.members,
    }))

    return NextResponse.json({ success: true, data: orgs })

  } catch (error) {
    console.error('Fetch orgs error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch organizations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.tier === 'FREE' || session.user.tier === 'PRO') {
      return NextResponse.json(
        { error: 'Organization features chỉ dành cho gói Business trở lên' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name, slug } = body

    if (!name || name.length < 3) {
      return NextResponse.json(
        { error: 'Tên tổ chức phải có ít nhất 3 ký tự' },
        { status: 400 }
      )
    }

    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: 'Slug không hợp lệ (chỉ chữ thường, số, dấu gạch ngang)' },
        { status: 400 }
      )
    }

    // Check slug uniqueness
    const existing = await prisma.organization.findUnique({
      where: { slug }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Slug đã được sử dụng' },
        { status: 400 }
      )
    }

    // Create organization
    const org = await prisma.organization.create({
      data: {
        name,
        slug,
        members: {
          create: {
            userId: session.user.id,
            role: 'OWNER',
          }
        }
      },
    })

    return NextResponse.json({ success: true, data: org })

  } catch (error) {
    console.error('Create org error:', error)
    return NextResponse.json(
      { error: 'Failed to create organization' },
      { status: 500 }
    )
  }
}
