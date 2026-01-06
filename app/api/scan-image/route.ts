import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { analyzeImage, validateImageInput } from '@/app/lib/imageAnalysis'
import { getClientIP, checkRateLimit, getSecurityHeaders } from '@/app/lib/security'
import prisma from '@/app/lib/db'
import { createHash } from 'crypto'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  const headers = getSecurityHeaders()

  try {
    // Get session (optional - works for both logged in and anonymous users)
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

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

    // Generate image hash for deduplication
    const imageHash = createHash('sha256').update(image).digest('hex')
    const shareToken = nanoid(10)

    // Save to ImageScanHistory if user is logged in
    if (userId) {
      try {
        await prisma.imageScanHistory.create({
          data: {
            userId,
            imageHash,
            score: result.score,
            label,
            category: result.category || null,
            reasons: result.reasons,
            extractedText: result.extractedText || null,
            confidence: result.confidence,
            shareToken,
            ipAddress: clientIP,
          },
        })
        console.log('[DB] Saved image scan history for user:', userId)

        // Update user stats
        await prisma.user.update({
          where: { id: userId },
          data: {
            dailyImageScans: { increment: 1 },
            totalScans: { increment: 1 },
          },
        })
      } catch (err) {
        console.error('[DB] Save image scan history error:', err)
      }
    }

    // Save to legacy ImageScan table (for global stats)
    prisma.imageScan.create({
      data: {
        imageHash,
        score: result.score,
        label,
        category: result.category || null,
        reasons: result.reasons,
        extractedText: result.extractedText || null,
        confidence: result.confidence,
        ipAddress: clientIP,
      },
    }).catch((err: Error) => console.error('[DB] Save image scan error:', err.message))

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
