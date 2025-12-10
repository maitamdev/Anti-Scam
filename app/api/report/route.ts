import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/app/lib/db'
import { extractDomain, getToday } from '@/app/lib/utils'

export const dynamic = 'force-dynamic'

const reportSchema = z.object({
  url: z.string().min(1, 'URL is required'),
  reason: z.string().min(1, 'Reason is required'),
  description: z.string().optional(),
  screenshot: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, reason, description, screenshot } = reportSchema.parse(body)

    // Normalize URL
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`
    const domain = extractDomain(normalizedUrl)

    // Get client info
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown'

    // Save report to database
    const report = await prisma.report.create({
      data: {
        url: normalizedUrl,
        domain,
        reason,
        description,
        screenshot,
        ipAddress,
      },
    })

    // Submit to URLScan.io API (Public submission - no API key needed!)
    let publicSubmitted = false
    let scanUrl = ''
    try {
      // URLScan.io - Free public submission
      const urlscanRes = await fetch('https://urlscan.io/api/v1/scan/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: normalizedUrl,
          visibility: 'public',
          tags: ['phishing', 'scam', 'anti-scam-vn'],
        }),
      })
      
      if (urlscanRes.ok) {
        const data = await urlscanRes.json()
        publicSubmitted = true
        scanUrl = data.result || ''
        console.log('✅ URLScan.io submission successful:', normalizedUrl)
        console.log('📊 Scan result:', data.result)
      } else {
        console.warn('⚠️ URLScan.io submission failed:', await urlscanRes.text())
      }
    } catch (submitError) {
      console.error('URLScan.io API error:', submitError)
      // Continue even if submission fails
    }

    // Update daily stats
    const today = getToday()
    await prisma.dailyStats.upsert({
      where: { date: today },
      create: {
        date: today,
        reportsCount: 1,
      },
      update: {
        reportsCount: { increment: 1 },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        id: report.id,
        message: publicSubmitted 
          ? `Báo cáo đã được gửi thành công và đã công khai trên URLScan.io! 🌍` 
          : 'Báo cáo đã được gửi thành công',
        publicSubmitted,
        scanUrl,
      },
    })
  } catch (error) {
    console.error('Report error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid data' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get reports (admin)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const verified = searchParams.get('verified')
    const limit = parseInt(searchParams.get('limit') || '50')

    const reports = await prisma.report.findMany({
      where: verified !== null ? { verified: verified === 'true' } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return NextResponse.json({
      success: true,
      data: reports,
    })
  } catch (error) {
    console.error('Get reports error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
