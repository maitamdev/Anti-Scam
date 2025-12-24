import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import {
  syncOpenPhish,
  syncPhishTank,
  syncPhishStats,
  syncURLhaus,
  syncSpamhausDROP,
  syncAllThreatFeeds
} from '@/app/lib/threatFeeds'

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Vercel Pro: 60s timeout

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    // Admin only
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }
    
    const { source } = await request.json()
    
    let result
    
    switch (source) {
      case 'openphish':
        result = await syncOpenPhish()
        break
      case 'phishtank':
        result = await syncPhishTank()
        break
      case 'phishstats':
        result = await syncPhishStats(100)
        break
      case 'urlhaus':
        result = await syncURLhaus()
        break
      case 'spamhaus':
        result = await syncSpamhausDROP()
        break
      case 'all':
        result = await syncAllThreatFeeds()
        break
      default:
        return NextResponse.json({ error: 'Invalid source' }, { status: 400 })
    }
    
    return NextResponse.json({
      success: true,
      source,
      result
    })
  } catch (error: any) {
    console.error('Threat feed sync error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }
    
    // Return status of all feeds
    return NextResponse.json({
      feeds: [
        {
          id: 'openphish',
          name: 'OpenPhish',
          description: 'Public phishing feed from GitHub',
          url: 'https://raw.githubusercontent.com/openphish/public_feed/refs/heads/main/feed.txt',
          free: true,
          requiresApiKey: false
        },
        {
          id: 'phishtank',
          name: 'PhishTank',
          description: 'Community verified phishing database',
          url: 'https://www.phishtank.com',
          free: true,
          requiresApiKey: true,
          configured: !!process.env.PHISHTANK_API_KEY
        },
        {
          id: 'phishstats',
          name: 'PhishStats',
          description: 'REST API for phishing URLs',
          url: 'https://phishstats.info',
          free: true,
          requiresApiKey: false,
          rateLimit: '20 requests/minute'
        },
        {
          id: 'urlhaus',
          name: 'URLhaus',
          description: 'Malware distribution URLs',
          url: 'https://urlhaus.abuse.ch',
          free: true,
          requiresApiKey: false
        },
        {
          id: 'spamhaus',
          name: 'Spamhaus DROP',
          description: 'Malicious netblock list',
          url: 'https://www.spamhaus.org/drop/',
          free: true,
          requiresApiKey: false
        }
      ],
      enrichment: [
        {
          id: 'google-safe-browsing',
          name: 'Google Safe Browsing',
          description: 'URL threat lookup',
          free: true,
          requiresApiKey: true,
          configured: !!process.env.GOOGLE_SAFE_BROWSING_API_KEY
        },
        {
          id: 'abuseipdb',
          name: 'AbuseIPDB',
          description: 'IP reputation (1000 checks/day)',
          free: true,
          requiresApiKey: true,
          configured: !!process.env.ABUSEIPDB_API_KEY
        }
      ]
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
