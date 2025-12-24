/**
 * Delete API Key
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import prisma from '@/app/lib/db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    const key = await prisma.apiKey.findUnique({
      where: { id },
    })

    if (!key || key.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Not found or unauthorized' },
        { status: 404 }
      )
    }

    await prisma.apiKey.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Delete API key error:', error)
    return NextResponse.json(
      { error: 'Failed to delete' },
      { status: 500 }
    )
  }
}
