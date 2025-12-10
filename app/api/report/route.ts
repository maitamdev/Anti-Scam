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

    // Submit to PhishTank API
    let phishTankSubmitted = false
    try {
      const phishTankApiKey = process.env.PHISHTANK_API_KEY
      
      if (phishTankApiKey && reason === 'phishing') {
        const formData = new URLSearchParams()
        formData.append('url', normalizedUrl)
        formData.append('format', 'json')
        
        const phishTankRes = await fetch('https://phishtank.org/add_web_phish.php', {
          method: 'POST',
          headers: {
            'User-Agent': 'ANTI-SCAM/1.0',
          },
          body: formData,
        })
        
        if (phishTankRes.ok) {
          phishTankSubmitted = true
          console.log('✅ PhishTank submission successful for:', normalizedUrl)
        } else {
          console.warn('⚠️ PhishTank submission failed:', await phishTankRes.text())
        }
      }
    } catch (phishTankError) {
      console.error('PhishTank API error:', phishTankError)
      // Continue even if PhishTank fails
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
        message: phishTankSubmitted 
          ? 'Báo cáo đã được gửi thành công và đã báo cáo lên PhishTank!' 
          : 'Báo cáo đã được gửi thành công',
        phishTankSubmitted,
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
