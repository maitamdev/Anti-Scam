import { NextRequest, NextResponse } from 'next/server'

// Verify admin secret for login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret } = body

    const adminSecret = process.env.ADMIN_SECRET

    // Debug: log để kiểm tra
    console.log('[Admin Login] Received secret length:', secret?.length)
    console.log('[Admin Login] Expected secret length:', adminSecret?.length)
    console.log('[Admin Login] Match:', secret === adminSecret)

    if (!adminSecret) {
      return NextResponse.json(
        { success: false, error: 'Admin not configured', debug: 'ADMIN_SECRET not set' },
        { status: 500 }
      )
    }

    if (secret === adminSecret) {
      return NextResponse.json({
        success: true,
        message: 'Authenticated',
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid secret', debug: `Expected ${adminSecret.length} chars` },
      { status: 401 }
    )
  } catch (e) {
    return NextResponse.json(
      { success: false, error: 'Invalid request', debug: String(e) },
      { status: 400 }
    )
  }
}
