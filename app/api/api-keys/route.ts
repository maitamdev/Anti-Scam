/**
 * API Keys Management API
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import prisma from '@/app/lib/db'
import { nanoid } from 'nanoid'
import { hash } from 'bcryptjs'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.tier === 'FREE' || session.user.tier === 'PRO') {
      return NextResponse.json(
        { error: 'API access chỉ dành cho gói Business trở lên' },
        { status: 403 }
      )
    }

    const apiKeys = await prisma.apiKey.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        name: true,
        prefix: true,
        lastUsedAt: true,
        createdAt: true,
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: apiKeys })

  } catch (error) {
    console.error('API keys fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch API keys' },
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
        { error: 'API access chỉ dành cho gói Business trở lên' },
        { status: 403 }
      )
    }

    // Check limit (max 10 keys)
    const count = await prisma.apiKey.count({
      where: { userId: session.user.id }
    })

    if (count >= 10) {
      return NextResponse.json(
        { error: 'Đã đạt giới hạn 10 API keys' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { name } = body

    if (!name || name.length < 3) {
      return NextResponse.json(
        { error: 'Tên phải có ít nhất 3 ký tự' },
        { status: 400 }
      )
    }

    // Generate API key: as_xxxxxxxxxxxxxxxx
    const key = `as_${nanoid(32)}`
    const prefix = key.substring(0, 8)
    const hashedKey = await hash(key, 12)

    const apiKey = await prisma.apiKey.create({
      data: {
        userId: session.user.id,
        name,
        key: hashedKey,
        prefix,
      },
    })

    return NextResponse.json({
      success: true,
      key, // Return unhashed key ONLY this one time
      data: {
        id: apiKey.id,
        name: apiKey.name,
        prefix: apiKey.prefix,
        createdAt: apiKey.createdAt,
      },
    })

  } catch (error) {
    console.error('API key create error:', error)
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    )
  }
}
