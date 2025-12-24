/**
 * Watchlist API
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import prisma from '@/app/lib/db'
import { z } from 'zod'

const watchlistSchema = z.object({
  type: z.enum(['DOMAIN', 'EMAIL', 'PHONE', 'BANK_ACCOUNT', 'SOCIAL_MEDIA']),
  value: z.string().min(1),
  name: z.string().optional(),
  notes: z.string().optional(),
  alertEmail: z.boolean().default(true),
  alertInApp: z.boolean().default(true),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.tier === 'FREE') {
      return NextResponse.json(
        { error: 'Watchlist chỉ dành cho gói Pro trở lên' },
        { status: 403 }
      )
    }

    const watchlist = await prisma.watchlist.findMany({
      where: { userId: session.user.id },
      include: {
        _count: {
          select: { alerts: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: watchlist })

  } catch (error) {
    console.error('Watchlist fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch watchlist' },
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

    if (session.user.tier === 'FREE') {
      return NextResponse.json(
        { error: 'Watchlist chỉ dành cho gói Pro trở lên' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const data = watchlistSchema.parse(body)

    // Check if already exists
    const existing = await prisma.watchlist.findUnique({
      where: {
        userId_type_value: {
          userId: session.user.id,
          type: data.type,
          value: data.value,
        }
      }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Item này đã có trong watchlist' },
        { status: 400 }
      )
    }

    const watchlistItem = await prisma.watchlist.create({
      data: {
        userId: session.user.id,
        ...data,
      },
    })

    return NextResponse.json({ success: true, data: watchlistItem })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Watchlist create error:', error)
    return NextResponse.json(
      { error: 'Failed to create watchlist item' },
      { status: 500 }
    )
  }
}
