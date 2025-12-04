import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/db'

// Verify a report and add to training data
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

    const body = await request.json()
    const { reportId, label, addToTraining = true } = body

    if (!reportId || !label) {
      return NextResponse.json(
        { success: false, error: 'Missing reportId or label' },
        { status: 400 }
      )
    }

    // Get the report
    const report = await prisma.report.findUnique({
      where: { id: reportId },
    })

    if (!report) {
      return NextResponse.json(
        { success: false, error: 'Report not found' },
        { status: 404 }
      )
    }

    // Update report as verified
    await prisma.report.update({
      where: { id: reportId },
      data: {
        verified: true,
        label,
        verifiedAt: new Date(),
      },
    })

    // Add to training data if requested
    if (addToTraining) {
      await prisma.trainingData.create({
        data: {
          url: report.url,
          text: `${report.url} ${report.reason} ${report.description || ''}`,
          label,
          source: 'report',
        },
      })
    }

    // If dangerous, add to blocklist
    if (['PHISHING', 'SCAM', 'MALWARE'].includes(label)) {
      await prisma.blocklist.upsert({
        where: { domain: report.domain },
        create: {
          domain: report.domain,
          reason: `Verified report: ${report.reason}`,
          severity: label === 'MALWARE' ? 'HIGH' : 'MEDIUM',
          source: 'community',
        },
        update: {
          reason: `Verified report: ${report.reason}`,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        message: 'Report verified successfully',
        reportId,
        label,
      },
    })
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get pending reports for verification
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const adminSecret = process.env.ADMIN_SECRET

    if (adminSecret && authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const pendingReports = await prisma.report.findMany({
      where: { verified: false },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    return NextResponse.json({
      success: true,
      data: pendingReports,
    })
  } catch (error) {
    console.error('Get pending reports error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
