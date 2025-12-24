import { NextResponse } from 'next/server'
import { syncAllThreatFeeds } from '@/app/lib/threatFeeds'

export const dynamic = 'force-dynamic'
export const maxDuration = 300 // 5 minutes for Vercel Pro

/**
 * Vercel Cron Job - Automated Threat Feed Sync
 * Schedule: Every 6 hours
 * Runs: 00:00, 06:00, 12:00, 18:00 UTC daily
 */
export async function GET(request: Request) {
  try {
    // Verify this is a Vercel Cron request
    const authHeader = request.headers.get('authorization')
    
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    console.log('[CRON] Starting scheduled threat feed sync...')
    
    const result = await syncAllThreatFeeds()
    
    console.log('[CRON] Sync completed:', result)
    
    return NextResponse.json({
      success: true,
      message: 'Threat feeds synchronized successfully',
      result
    })
  } catch (error: any) {
    console.error('[CRON] Sync failed:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
