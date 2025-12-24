/**
 * External Threat Intelligence Feeds Integration
 * Free sources for phishing/malware URL detection
 */

import prisma from './db'

// ============================================
// 1. OpenPhish - Public Feed (GitHub)
// ============================================
export async function syncOpenPhish() {
  const url = 'https://raw.githubusercontent.com/openphish/public_feed/refs/heads/main/feed.txt'
  
  try {
    const response = await fetch(url)
    const text = await response.text()
    const urls = text.split('\n').filter(u => u.trim())
    
    console.log(`[OpenPhish] Fetched ${urls.length} URLs`)
    
    let imported = 0
    for (const phishUrl of urls) {
      try {
        const domain = new URL(phishUrl).hostname
        
        // Check if already exists
        const exists = await prisma.blocklist.findFirst({
          where: { domain, source: 'openphish' }
        })
        
        if (!exists) {
          await prisma.blocklist.create({
            data: {
              domain,
              reason: 'Phishing URL detected by OpenPhish',
              severity: 'HIGH',
              source: 'openphish',
              metadata: { url: phishUrl }
            }
          })
          imported++
        }
      } catch (e) {
        // Skip invalid URLs
        continue
      }
    }
    
    console.log(`[OpenPhish] Imported ${imported} new domains`)
    return { success: true, total: urls.length, imported }
  } catch (error: any) {
    console.error('[OpenPhish] Sync failed:', error.message)
    return { success: false, error: error.message }
  }
}

// ============================================
// 2. PhishTank - Community Verified Phishing
// ============================================
export async function syncPhishTank() {
  // PhishTank requires registration for API key
  const apiKey = process.env.PHISHTANK_API_KEY
  
  if (!apiKey) {
    console.warn('[PhishTank] No API key configured')
    return { success: false, error: 'API key required' }
  }
  
  try {
    // Download verified phishing database (JSON format)
    const url = `http://data.phishtank.com/data/${apiKey}/online-valid.json`
    const response = await fetch(url)
    const data = await response.json()
    
    console.log(`[PhishTank] Fetched ${data.length} verified phishing URLs`)
    
    let imported = 0
    for (const entry of data) {
      try {
        const domain = new URL(entry.url).hostname
        
        const exists = await prisma.blocklist.findFirst({
          where: { domain, source: 'phishtank' }
        })
        
        if (!exists) {
          await prisma.blocklist.create({
            data: {
              domain,
              reason: `PhishTank verified phishing (ID: ${entry.phish_id})`,
              severity: 'HIGH',
              source: 'phishtank',
              metadata: {
                phish_id: entry.phish_id,
                url: entry.url,
                verified: entry.verified,
                submission_time: entry.submission_time
              }
            }
          })
          imported++
        }
      } catch (e) {
        continue
      }
    }
    
    console.log(`[PhishTank] Imported ${imported} new domains`)
    return { success: true, total: data.length, imported }
  } catch (error: any) {
    console.error('[PhishTank] Sync failed:', error.message)
    return { success: false, error: error.message }
  }
}

// ============================================
// 3. PhishStats - REST API with Pagination
// ============================================
export async function syncPhishStats(limit = 100) {
  const baseUrl = 'https://phishstats.info/api/phishing'
  
  try {
    // Get recent phishing URLs (max 20 requests/minute rate limit)
    const response = await fetch(`${baseUrl}?_sort=-date&_limit=${limit}`)
    const data = await response.json()
    
    console.log(`[PhishStats] Fetched ${data.length} URLs`)
    
    let imported = 0
    for (const entry of data) {
      try {
        const domain = new URL(entry.url).hostname
        
        const exists = await prisma.blocklist.findFirst({
          where: { domain, source: 'phishstats' }
        })
        
        if (!exists) {
          await prisma.blocklist.create({
            data: {
              domain,
              reason: `PhishStats reported phishing (${entry.title || 'Phishing'})`,
              severity: 'HIGH',
              source: 'phishstats',
              metadata: {
                url: entry.url,
                title: entry.title,
                date: entry.date,
                ip: entry.ip,
                asn: entry.asn
              }
            }
          })
          imported++
        }
      } catch (e) {
        continue
      }
    }
    
    console.log(`[PhishStats] Imported ${imported} new domains`)
    return { success: true, total: data.length, imported }
  } catch (error: any) {
    console.error('[PhishStats] Sync failed:', error.message)
    return { success: false, error: error.message }
  }
}

// ============================================
// 4. URLhaus - Malware Distribution URLs
// ============================================
export async function syncURLhaus() {
  const url = 'https://urlhaus.abuse.ch/downloads/csv_recent/'
  
  try {
    const response = await fetch(url)
    const text = await response.text()
    const lines = text.split('\n').filter(l => !l.startsWith('#') && l.trim())
    
    console.log(`[URLhaus] Fetched ${lines.length} malware URLs`)
    
    let imported = 0
    for (const line of lines) {
      try {
        const columns = line.split(',')
        if (columns.length < 3) continue
        
        const malwareUrl = columns[2].replace(/"/g, '')
        const domain = new URL(malwareUrl).hostname
        const threat = columns[4] || 'malware'
        
        const exists = await prisma.blocklist.findFirst({
          where: { domain, source: 'urlhaus' }
        })
        
        if (!exists) {
          await prisma.blocklist.create({
            data: {
              domain,
              reason: `Malware distribution detected by URLhaus (${threat})`,
              severity: 'CRITICAL',
              source: 'urlhaus',
              metadata: {
                url: malwareUrl,
                threat_type: threat,
                date_added: columns[1]
              }
            }
          })
          imported++
        }
      } catch (e) {
        continue
      }
    }
    
    console.log(`[URLhaus] Imported ${imported} new domains`)
    return { success: true, total: lines.length, imported }
  } catch (error: any) {
    console.error('[URLhaus] Sync failed:', error.message)
    return { success: false, error: error.message }
  }
}

// ============================================
// 5. Google Safe Browsing - URL Lookup
// ============================================
export async function checkGoogleSafeBrowsing(url: string) {
  const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY
  
  if (!apiKey) {
    return { safe: true, note: 'API key not configured' }
  }
  
  try {
    const endpoint = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client: {
          clientId: 'antiscam-vn',
          clientVersion: '1.0.0'
        },
        threatInfo: {
          threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
          platformTypes: ['ANY_PLATFORM'],
          threatEntryTypes: ['URL'],
          threatEntries: [{ url }]
        }
      })
    })
    
    const data = await response.json()
    
    if (data.matches && data.matches.length > 0) {
      return {
        safe: false,
        threats: data.matches.map((m: any) => m.threatType),
        details: data.matches
      }
    }
    
    return { safe: true }
  } catch (error: any) {
    console.error('[Google Safe Browsing] Check failed:', error.message)
    return { safe: true, error: error.message }
  }
}

// ============================================
// 6. AbuseIPDB - IP Reputation Check
// ============================================
export async function checkAbuseIPDB(ip: string) {
  const apiKey = process.env.ABUSEIPDB_API_KEY
  
  if (!apiKey) {
    return { isAbusive: false, note: 'API key not configured' }
  }
  
  try {
    const response = await fetch(`https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}`, {
      headers: {
        'Key': apiKey,
        'Accept': 'application/json'
      }
    })
    
    const data = await response.json()
    
    if (data.data) {
      const abuseScore = data.data.abuseConfidenceScore
      return {
        isAbusive: abuseScore > 25,
        abuseScore,
        totalReports: data.data.totalReports,
        lastReportedAt: data.data.lastReportedAt,
        usageType: data.data.usageType,
        isp: data.data.isp
      }
    }
    
    return { isAbusive: false }
  } catch (error: any) {
    console.error('[AbuseIPDB] Check failed:', error.message)
    return { isAbusive: false, error: error.message }
  }
}

// ============================================
// 7. Spamhaus DROP - Netblock Blacklist
// ============================================
export async function syncSpamhausDROP() {
  const url = 'https://www.spamhaus.org/drop/drop.txt'
  
  try {
    const response = await fetch(url)
    const text = await response.text()
    const lines = text.split('\n').filter(l => !l.startsWith(';') && l.trim())
    
    console.log(`[Spamhaus DROP] Fetched ${lines.length} netblocks`)
    
    let imported = 0
    for (const line of lines) {
      try {
        const parts = line.split(';')
        const netblock = parts[0].trim()
        const sbl = parts[1]?.trim()
        
        if (!netblock) continue
        
        const exists = await prisma.blocklist.findFirst({
          where: { domain: netblock, source: 'spamhaus' }
        })
        
        if (!exists) {
          await prisma.blocklist.create({
            data: {
              domain: netblock,
              reason: `Spamhaus DROP netblock (${sbl || 'malicious network'})`,
              severity: 'CRITICAL',
              source: 'spamhaus',
              metadata: { netblock, sbl }
            }
          })
          imported++
        }
      } catch (e) {
        continue
      }
    }
    
    console.log(`[Spamhaus DROP] Imported ${imported} new netblocks`)
    return { success: true, total: lines.length, imported }
  } catch (error: any) {
    console.error('[Spamhaus DROP] Sync failed:', error.message)
    return { success: false, error: error.message }
  }
}

// ============================================
// Sync All Sources (cron job)
// ============================================
export async function syncAllThreatFeeds() {
  console.log('🔄 Starting threat feed sync...')
  
  const results = {
    timestamp: new Date().toISOString(),
    sources: {} as Record<string, any>
  }
  
  // Run syncs in parallel (with rate limiting consideration)
  const [openphish, urlhaus, phishstats, spamhaus] = await Promise.allSettled([
    syncOpenPhish(),
    syncURLhaus(),
    syncPhishStats(100),
    syncSpamhausDROP()
  ])
  
  results.sources.openphish = openphish.status === 'fulfilled' ? openphish.value : { error: 'failed' }
  results.sources.urlhaus = urlhaus.status === 'fulfilled' ? urlhaus.value : { error: 'failed' }
  results.sources.phishstats = phishstats.status === 'fulfilled' ? phishstats.value : { error: 'failed' }
  results.sources.spamhaus = spamhaus.status === 'fulfilled' ? spamhaus.value : { error: 'failed' }
  
  // PhishTank requires API key, run separately
  if (process.env.PHISHTANK_API_KEY) {
    results.sources.phishtank = await syncPhishTank()
  }
  
  console.log('✅ Threat feed sync completed', results)
  
  return results
}
