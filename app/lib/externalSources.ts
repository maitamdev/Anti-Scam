/**
 * External Data Sources for Scam Detection
 * Integrates with VirusTotal, PhishTank, and Vietnamese sources
 */

import { prisma } from './db'

// Vietnamese scam domains from community reports
const VN_SCAM_DOMAINS = [
  // Gambling/Casino
  'bumvip68.club',
  'go88.vin',
  'sunwin.club',
  'iwin68.club',
  'b52.club',
  'rik.vip',
  'yo88.club',
  'hit.club',
  'twin68.club',
  '789club.wine',
  '8xbet.com',
  'sv388.com',
  'kubet.com',
  'jun88.com',
  'f8bet.com',
  'new88.com',
  'shbet.com',
  'hi88.com',
  'mb66.com',
  '789bet.com',

  // Fake banks
  'vietcombank-login.xyz',
  'techcombank-verify.com',
  'mbbank-online.net',
  'tpbank-secure.com',
  'bidv-ebanking.xyz',
  'agribank-online.net',
  'vpbank-verify.com',
  'acb-secure.net',

  // Fake e-commerce
  'shopee-freeship.com',
  'lazada-sale.net',
  'tiki-deal.com',
  'sendo-promo.net',

  // Investment scams
  'binance-vn.com',
  'forex-vip.net',
  'crypto-invest.xyz',
  'bitcoin-profit.net',

  // Job scams
  'viec-online.com',
  'tuyen-ctv.net',
  'lam-tai-nha.com',
]

// Trusted Vietnamese domains
const VN_TRUSTED_DOMAINS = [
  // Banks
  { domain: 'vietcombank.com.vn', brand: 'Vietcombank', category: 'bank' },
  { domain: 'techcombank.com.vn', brand: 'Techcombank', category: 'bank' },
  { domain: 'mbbank.com.vn', brand: 'MB Bank', category: 'bank' },
  { domain: 'tpbank.vn', brand: 'TPBank', category: 'bank' },
  { domain: 'acb.com.vn', brand: 'ACB', category: 'bank' },
  { domain: 'bidv.com.vn', brand: 'BIDV', category: 'bank' },
  { domain: 'agribank.com.vn', brand: 'Agribank', category: 'bank' },
  { domain: 'vpbank.com.vn', brand: 'VPBank', category: 'bank' },
  { domain: 'sacombank.com.vn', brand: 'Sacombank', category: 'bank' },
  { domain: 'hdbank.com.vn', brand: 'HDBank', category: 'bank' },
  { domain: 'vib.com.vn', brand: 'VIB', category: 'bank' },
  { domain: 'msb.com.vn', brand: 'MSB', category: 'bank' },
  { domain: 'ocb.com.vn', brand: 'OCB', category: 'bank' },
  { domain: 'seabank.com.vn', brand: 'SeABank', category: 'bank' },
  { domain: 'lpbank.com.vn', brand: 'LPBank', category: 'bank' },
  { domain: 'vietinbank.vn', brand: 'VietinBank', category: 'bank' },

  // E-wallets
  { domain: 'momo.vn', brand: 'MoMo', category: 'ewallet' },
  { domain: 'zalopay.vn', brand: 'ZaloPay', category: 'ewallet' },
  { domain: 'vnpay.vn', brand: 'VNPay', category: 'ewallet' },
  { domain: 'shopeepay.vn', brand: 'ShopeePay', category: 'ewallet' },

  // E-commerce
  { domain: 'shopee.vn', brand: 'Shopee', category: 'ecommerce' },
  { domain: 'lazada.vn', brand: 'Lazada', category: 'ecommerce' },
  { domain: 'tiki.vn', brand: 'Tiki', category: 'ecommerce' },
  { domain: 'sendo.vn', brand: 'Sendo', category: 'ecommerce' },
  { domain: 'thegioididong.com', brand: 'TGDĐ', category: 'ecommerce' },
  { domain: 'dienmayxanh.com', brand: 'Điện Máy Xanh', category: 'ecommerce' },
  { domain: 'bachhoaxanh.com', brand: 'Bách Hóa Xanh', category: 'ecommerce' },
  { domain: 'cellphones.com.vn', brand: 'CellphoneS', category: 'ecommerce' },
  { domain: 'fptshop.com.vn', brand: 'FPT Shop', category: 'ecommerce' },

  // Government
  { domain: 'gov.vn', brand: 'Chính phủ', category: 'government' },
  { domain: 'chinhphu.vn', brand: 'Chính phủ', category: 'government' },
  { domain: 'dangcongsan.vn', brand: 'Đảng CSVN', category: 'government' },
  { domain: 'quochoi.vn', brand: 'Quốc hội', category: 'government' },
  { domain: 'mof.gov.vn', brand: 'Bộ Tài chính', category: 'government' },
  { domain: 'sbv.gov.vn', brand: 'Ngân hàng NN', category: 'government' },

  // News
  { domain: 'vnexpress.net', brand: 'VnExpress', category: 'news' },
  { domain: 'tuoitre.vn', brand: 'Tuổi Trẻ', category: 'news' },
  { domain: 'thanhnien.vn', brand: 'Thanh Niên', category: 'news' },
  { domain: 'dantri.com.vn', brand: 'Dân Trí', category: 'news' },
  { domain: 'vietnamnet.vn', brand: 'VietnamNet', category: 'news' },
  { domain: 'vtv.vn', brand: 'VTV', category: 'news' },
  { domain: 'vov.vn', brand: 'VOV', category: 'news' },
  { domain: 'nhandan.vn', brand: 'Nhân Dân', category: 'news' },

  // Tech
  { domain: 'fpt.com.vn', brand: 'FPT', category: 'tech' },
  { domain: 'vng.com.vn', brand: 'VNG', category: 'tech' },
  { domain: 'vingroup.net', brand: 'Vingroup', category: 'tech' },
  { domain: 'viettel.com.vn', brand: 'Viettel', category: 'telecom' },
  { domain: 'vnpt.com.vn', brand: 'VNPT', category: 'telecom' },
  { domain: 'mobifone.vn', brand: 'MobiFone', category: 'telecom' },

  // Education
  { domain: 'edu.vn', brand: 'Giáo dục', category: 'education' },
  { domain: 'vnu.edu.vn', brand: 'ĐHQG HN', category: 'education' },
  { domain: 'hust.edu.vn', brand: 'BKHN', category: 'education' },
  { domain: 'ueh.edu.vn', brand: 'UEH', category: 'education' },

  // Social
  { domain: 'facebook.com', brand: 'Facebook', category: 'social' },
  { domain: 'zalo.me', brand: 'Zalo', category: 'social' },
  { domain: 'tiktok.com', brand: 'TikTok', category: 'social' },
  { domain: 'youtube.com', brand: 'YouTube', category: 'social' },
  { domain: 'google.com', brand: 'Google', category: 'tech' },
  { domain: 'google.com.vn', brand: 'Google VN', category: 'tech' },
]

// Sync data to database
export async function syncExternalData() {
  console.log('[Sync] Starting external data sync...')

  // Add scam domains to blocklist
  let addedScam = 0
  for (const domain of VN_SCAM_DOMAINS) {
    try {
      await prisma.blocklist.upsert({
        where: { domain },
        update: {},
        create: {
          domain,
          reason: 'Nguồn cộng đồng VN',
          severity: domain.includes('bank') || domain.includes('login') ? 'HIGH' : 'MEDIUM',
          source: 'community',
        },
      })
      addedScam++
    } catch {
      // Skip duplicates
    }
  }

  // Add trusted domains to whitelist
  let addedTrusted = 0
  for (const item of VN_TRUSTED_DOMAINS) {
    try {
      await prisma.whitelist.upsert({
        where: { domain: item.domain },
        update: {},
        create: item,
      })
      addedTrusted++
    } catch {
      // Skip duplicates
    }
  }

  console.log(`[Sync] Added ${addedScam} scam domains, ${addedTrusted} trusted domains`)
  return { addedScam, addedTrusted }
}

// Check domain against external sources (for future API integration)
export async function checkExternalSources(domain: string): Promise<{
  isKnownScam: boolean
  sources: string[]
  details?: string
  virusTotal?: {
    detected: boolean
    stats: {
      malicious: number
      suspicious: number
      harmless: number
      undetected: number
      total: number
    } | null
    notFound?: boolean
  }
}> {
  const sources: string[] = []

  // Check local blocklist
  const blocked = await prisma.blocklist.findUnique({ where: { domain } })
  if (blocked) {
    sources.push(`Blocklist: ${blocked.reason}`)
  }

  // Check if domain mimics trusted brand
  const domainLower = domain.toLowerCase()
  for (const trusted of VN_TRUSTED_DOMAINS) {
    const brandName = trusted.brand.toLowerCase().replace(/\s/g, '')
    if (
      domainLower.includes(brandName) &&
      domainLower !== trusted.domain &&
      !domainLower.endsWith(`.${trusted.domain}`)
    ) {
      sources.push(`Giả mạo ${trusted.brand}`)
    }
  }

  // Check VirusTotal
  let virusTotalData
  try {
    console.log('[VirusTotal] Checking:', domain)
    const vtResult = await checkVirusTotal(`https://${domain}`)
    console.log('[VirusTotal] Result:', vtResult)
    if (vtResult.notFound) {
      // URL never scanned - indicate this in UI
      virusTotalData = {
        detected: false,
        stats: null,
        notFound: true,
      }
    } else if (vtResult.stats) {
      virusTotalData = {
        detected: vtResult.detected,
        stats: vtResult.stats,
        notFound: false,
      }
      if (vtResult.detected) {
        sources.push(
          `VirusTotal: ${vtResult.stats.malicious} engines phát hiện nguy hiểm`
        )
      }
    }
  } catch (error) {
    console.error('[VirusTotal] Error:', error)
  }

  return {
    isKnownScam: sources.length > 0,
    sources,
    virusTotal: virusTotalData,
  }
}

// VirusTotal API check
interface VirusTotalStats {
  malicious: number
  suspicious: number
  harmless: number
  undetected: number
  total: number
}

async function checkVirusTotal(url: string): Promise<{
  detected: boolean
  stats: VirusTotalStats | null
  notFound?: boolean
}> {
  const apiKey = process.env.VIRUSTOTAL_API_KEY
  
  console.log('[VirusTotal] API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET')
  
  if (!apiKey || apiKey.includes('xxx') || apiKey.includes('your_')) {
    console.log('[VirusTotal] API key not configured')
    return { detected: false, stats: null }
  }

  try {
    const urlId = Buffer.from(url).toString('base64').replace(/=/g, '')
    console.log('[VirusTotal] Fetching URL ID:', urlId)
    
    const res = await fetch(
      `https://www.virustotal.com/api/v3/urls/${urlId}`,
      {
        headers: { 'x-apikey': apiKey },
      }
    )

    console.log('[VirusTotal] Response status:', res.status)

    if (res.status === 404) {
      // URL never scanned before
      console.log('[VirusTotal] URL not found in database')
      return { detected: false, stats: null, notFound: true }
    }

    if (res.ok) {
      const data = await res.json()
      const stats = data.data?.attributes?.last_analysis_stats
      
      console.log('[VirusTotal] Stats:', stats)
      
      if (stats) {
        return {
          detected: stats.malicious > 0 || stats.suspicious > 2,
          stats: {
            malicious: stats.malicious || 0,
            suspicious: stats.suspicious || 0,
            harmless: stats.harmless || 0,
            undetected: stats.undetected || 0,
            total: stats.malicious + stats.suspicious + stats.harmless + stats.undetected,
          },
        }
      }
    }

    return { detected: false, stats: null }
  } catch (error) {
    return { detected: false, stats: null }
  }
}

// Get statistics
export async function getDataStats() {
  const [blocklistCount, whitelistCount, scamPatterns, scamAccounts] =
    await Promise.all([
      prisma.blocklist.count(),
      prisma.whitelist.count(),
      prisma.scamPattern.count(),
      prisma.scamAccount.count(),
    ])

  return {
    blocklist: blocklistCount,
    whitelist: whitelistCount,
    scamPatterns,
    scamAccounts,
    lastUpdated: new Date().toISOString(),
  }
}
