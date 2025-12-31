import { NextRequest, NextResponse } from 'next/server'
import { generateReportHash, verifyReportHash } from '@/app/lib/blockchain'

// Store verified reports (in production, use database)
const verifiedReports: Map<string, { hash: string; timestamp: number; data: object }> = new Map()

export async function POST(request: NextRequest) {
  try {
    const { action, reportData, hash } = await request.json()

    if (action === 'generate') {
      // Generate hash for new report
      if (!reportData) {
        return NextResponse.json(
          { success: false, error: 'Report data is required' },
          { status: 400 }
        )
      }

      const timestamp = Date.now()
      const dataWithTimestamp = { ...reportData, timestamp }
      const reportHash = generateReportHash(dataWithTimestamp)

      // Store the verified report
      verifiedReports.set(reportHash, {
        hash: reportHash,
        timestamp,
        data: dataWithTimestamp
      })

      return NextResponse.json({
        success: true,
        hash: reportHash,
        timestamp,
        message: 'Report hash generated and stored on-chain (simulated)'
      })
    }

    if (action === 'verify') {
      // Verify existing report hash
      if (!hash) {
        return NextResponse.json(
          { success: false, error: 'Hash is required for verification' },
          { status: 400 }
        )
      }

      const storedReport = verifiedReports.get(hash)
      
      if (storedReport) {
        return NextResponse.json({
          success: true,
          verified: true,
          timestamp: storedReport.timestamp,
          message: 'Report hash verified - data integrity confirmed'
        })
      }

      // If reportData provided, verify against hash
      if (reportData) {
        const isValid = verifyReportHash(reportData, hash)
        return NextResponse.json({
          success: true,
          verified: isValid,
          message: isValid 
            ? 'Report data matches the provided hash'
            : 'Report data does NOT match the provided hash - may be tampered'
        })
      }

      return NextResponse.json({
        success: true,
        verified: false,
        message: 'Hash not found in verified reports'
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action. Use "generate" or "verify"' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Report verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process report' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const hash = searchParams.get('hash')

  if (!hash) {
    return NextResponse.json({
      success: true,
      totalVerified: verifiedReports.size,
      message: 'Blockchain report verification system active'
    })
  }

  const storedReport = verifiedReports.get(hash)
  
  if (storedReport) {
    return NextResponse.json({
      success: true,
      verified: true,
      timestamp: storedReport.timestamp,
      hash: storedReport.hash
    })
  }

  return NextResponse.json({
    success: true,
    verified: false,
    message: 'Hash not found'
  })
}
