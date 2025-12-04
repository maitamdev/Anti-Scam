import { NextRequest, NextResponse } from 'next/server'

// Verify admin secret for login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret } = body

    const adminSecret = process.env.ADMIN_SECRET

    if (!adminSecret) {
      return NextResponse.json(
        { success: false, error: 'Admin not configured' },
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
      { success: false, error: 'Invalid secret' },
      { status: 401 }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  }
}
