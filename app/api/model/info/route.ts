import { NextResponse } from 'next/server'
import { getModelInfo } from '@/app/lib/aiModel'

export async function GET() {
  try {
    const modelInfo = await getModelInfo()

    return NextResponse.json({
      success: true,
      data: modelInfo,
    })
  } catch (error) {
    console.error('Model info error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
