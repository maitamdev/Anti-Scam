import { NextResponse } from 'next/server'

// Tạm thời: cho pass tất cả để demo
export async function POST() {
  return NextResponse.json({
    success: true,
    message: 'Authenticated',
  })
}
