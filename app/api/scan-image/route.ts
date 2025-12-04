import { NextRequest, NextResponse } from 'next/server'
import { analyzeImage, validateImageInput } from '@/app/lib/imageAnalysis'
import { getClientIP, checkRateLimit, getSecurityHeaders } from '@/app/lib/security'

export async function POST(request: NextRequest) {
  const headers = getSecurityHeaders()

  try {
    // Rate limiting (stricter for image scan - uses expensive API)
    const clientIP = getClientIP(request)
    const rateLimit = checkRateLimit(clientIP, 'scanImage')

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.' },
        { status: 429, headers }
      )
    }

    // Parse request
    const body = await request.json().catch(() => ({}))
    const { image, text } = body

    // Validate image
    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng tải lên hình ảnh' },
        { status: 400, headers }
      )
    }

    const validation = validateImageInput(image)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400, headers }
      )
    }

    // Analyze image with HuggingFace
    const result = await analyzeImage(image, text)

    // Determine label
    let label: 'SAFE' | 'CAUTION' | 'DANGEROUS'
    if (result.score <= 30) label = 'SAFE'
    else if (result.score <= 60) label = 'CAUTION'
    else label = 'DANGEROUS'

    return NextResponse.json({
      success: true,
      data: {
        score: result.score,
        label,
        category: result.category,
        reasons: result.reasons,
        confidence: result.confidence,
        extractedText: result.extractedText,
      },
    }, { headers })

  } catch (error) {
    console.error('[API] Image scan error:', error)
    return NextResponse.json(
      { success: false, error: 'Lỗi phân tích hình ảnh. Vui lòng thử lại.' },
      { status: 500, headers }
    )
  }
}
