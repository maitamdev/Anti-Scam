import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const redirectChain: string[] = [url]
    let currentUrl = url
    let finalUrl = url
    const maxRedirects = 10
    let redirectCount = 0

    // Follow redirects manually
    while (redirectCount < maxRedirects) {
      try {
        const response = await fetch(currentUrl, {
          method: 'HEAD',
          redirect: 'manual',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        })

        const location = response.headers.get('location')
        
        if (location && (response.status >= 300 && response.status < 400)) {
          // Handle relative URLs
          const nextUrl = location.startsWith('http') 
            ? location 
            : new URL(location, currentUrl).href
          
          redirectChain.push(nextUrl)
          currentUrl = nextUrl
          finalUrl = nextUrl
          redirectCount++
        } else {
          // No more redirects
          break
        }
      } catch {
        // If fetch fails, stop following
        break
      }
    }

    const finalUrlObj = new URL(finalUrl)
    const originalUrlObj = new URL(url)

    // Check for suspicious patterns
    const warnings: string[] = []
    const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.work', '.click']
    const suspiciousKeywords = ['login', 'verify', 'secure', 'account', 'update', 'confirm', 'banking']

    if (suspiciousTLDs.some(tld => finalUrlObj.hostname.endsWith(tld))) {
      warnings.push('Domain uses suspicious TLD')
    }

    if (suspiciousKeywords.some(kw => finalUrl.toLowerCase().includes(kw))) {
      warnings.push('URL contains suspicious keywords')
    }

    if (finalUrlObj.hostname !== originalUrlObj.hostname && redirectChain.length > 1) {
      warnings.push('Link redirects to a different domain')
    }

    return NextResponse.json({
      originalUrl: url,
      expandedUrl: finalUrl,
      redirectChain,
      finalDomain: finalUrlObj.hostname,
      isSuspicious: warnings.length > 0,
      warnings
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to expand URL' }, { status: 500 })
  }
}
