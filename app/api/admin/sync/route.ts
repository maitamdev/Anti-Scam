import { NextRequest, NextResponse } from 'next/server'
import { syncExternalData, getDataStats } from '@/app/lib/externalSources'

// Sync external data (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check admin secret
    const authHeader = request.headers.get('authorization')
    const adminSecret = process.env.ADMIN_SECRET

    if (adminSecret && authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const result = await syncExternalData()

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('[Sync] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Sync failed' },
      { status: 500 }
    )
  }
}

// Get data statistics
export async function GET() {
  try {
    const stats = await getDataStats()
    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('[Stats] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get stats' },
      { status: 500 }
    )
  }
}
