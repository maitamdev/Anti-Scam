/**
 * URL Analysis Engine - Production Ready
 * Combines AI (Groq) + Heuristic for accurate scam detection
 */

import {
  SUSPICIOUS_TLDS,
  BRAND_KEYWORDS,
  LABELS,
  LINK_SHORTENERS,
  BIO_LINK_SERVICES,
  GAMBLING_KEYWORDS,
  type Label,
} from './constants'
import { extractDomain, extractRootDomain } from './utils'
import prisma from './db'
import { analyzeWithAI } from './aiModel'

export interface AnalysisResult {
  url: string
  domain: string
  score: number
  label: Label
  reasons: string[]
  aiConfidence: number
  heuristicScore: number
  aiScore: number
}

// Cache for DB lookups (5 min TTL)
const dbCache = new Map<string, { data: unknown; expires: number }>()

async function checkWhitelist(domain: string): Promise<boolean> {
  const key = `wl:${domain}`
  const cached = dbCache.get(key)
  if (cached && cached.expires > Date.now()) return cached.data as boolean

  // Check both full domain and root domain (e.g., chat.zalo.me and zalo.me)
  const rootDomain = extractRootDomain(domain)
  const [fullMatch, rootMatch] = await Promise.all([
    prisma.whitelist.findUnique({ where: { domain } }),
    domain !== rootDomain ? prisma.whitelist.findUnique({ where: { domain: rootDomain } }) : null
  ])
  
  const isWhitelisted = !!(fullMatch || rootMatch)
  dbCache.set(key, { data: isWhitelisted, expires: Date.now() + 300000 })
  return isWhitelisted
}

async function checkBlocklist(domain: string): Promise<{ blocked: boolean; reason?: string }> {
  const key = `bl:${domain}`
  const cached = dbCache.get(key)
  if (cached && cached.expires > Date.now()) return cached.data as { blocked: boolean; reason?: string }

  const result = await prisma.blocklist.findUnique({ where: { domain } })
  const data = result ? { blocked: true, reason: result.reason } : { blocked: false }
  dbCache.set(key, { data, expires: Date.now() + 300000 })
  return data
}

// Fast heuristic analysis
function runHeuristics(url: string, domain: string): { score: number; reasons: string[] } {
  let score = 0
  const reasons: string[] = []
  const urlLower = url.toLowerCase()
  const domainLower = domain.toLowerCase()

  // HTTPS
  if (!url.startsWith('https://')) {
    score += 15
    reasons.push('Không có HTTPS')
  }

  // Link shortener / Bio link
  if (LINK_SHORTENERS.some(s => domainLower.includes(s))) {
    score += 25
    reasons.push('⚠️ Link rút gọn')
  }
  if (BIO_LINK_SERVICES.some(s => domainLower.includes(s))) {
    score += 30
    reasons.push('⚠️ Bio Link - hay bị lạm dụng')
  }

  // Suspicious TLD
  const badTld = SUSPICIOUS_TLDS.find(t => domainLower.endsWith(t))
  if (badTld) {
    score += 20
    reasons.push(`TLD đáng ngờ: ${badTld}`)
  }

  // Brand impersonation
  for (const brand of BRAND_KEYWORDS) {
    if (domainLower.includes(brand)) {
      // Check if it's a legitimate domain or subdomain
      const rootDomain = extractRootDomain(domainLower)
      const realPatterns = [`${brand}.com`, `${brand}.vn`, `${brand}.com.vn`, `${brand}.me`]
      const isLegit = realPatterns.some(p => rootDomain === p || domainLower === p || domainLower.endsWith(`.${p}`))
      
      if (!isLegit) {
        score += 35
        reasons.push(`🚨 Giả mạo "${brand}"`)
        break
      }
    }
  }

  // Gambling detection - stricter
  const gamblingHits = GAMBLING_KEYWORDS.filter(k => domainLower.includes(k) || urlLower.includes(k))
  if (gamblingHits.length >= 3) {
    score += 70
    reasons.push('🎰 Website cờ bạc rõ ràng!')
  } else if (gamblingHits.length === 2) {
    score += 60
    reasons.push('🎰 Website cờ bạc!')
  } else if (gamblingHits.length === 1) {
    // Single gambling keyword but check context
    const keyword = gamblingHits[0]
    if (['casino', 'bet', 'slot', 'poker', 'inn', 'palace', 'crown'].includes(keyword)) {
      score += 50
      reasons.push(`🎰 Tên miền có dấu hiệu casino: ${keyword}`)
    } else {
      score += 30
      reasons.push(`⚠️ Dấu hiệu cờ bạc: ${keyword}`)
    }
  }

  // Casino/Inn specific patterns (oaxacainn, etc)
  if (/(casino|inn|club|palace|royal|crown|diamond|gold)(vip|win|bet|88|game)/i.test(domainLower) ||
      /(vip|win|bet|88|game)(casino|inn|club|palace|royal)/i.test(domainLower)) {
    score += 60
    reasons.push('🎰 Pattern tên casino điển hình')
  }

  // Gambling domain pattern
  if (/\d{2,3}(vip|club|win|bet|game|slot)/i.test(domainLower) ||
      /(vip|club|win|bet|game|slot)\d{2,3}/i.test(domainLower)) {
    score += 45
    reasons.push('🎰 Pattern cờ bạc')
  }

  // Lucky numbers
  if (/68|88|99|789|888|666|777/.test(domainLower)) {
    score += 15
    reasons.push('Số may mắn trong domain')
  }

  // IP as domain
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(domain)) {
    score += 30
    reasons.push('Dùng IP thay domain')
  }

  // Cyrillic (homograph)
  if (/[а-яА-Я]/.test(url)) {
    score += 40
    reasons.push('🚨 Ký tự Cyrillic giả mạo!')
  }

  // Long domain
  if (domain.length > 40) {
    score += 10
    reasons.push('Domain quá dài')
  }

  return { score: Math.min(score, 100), reasons }
}

// Main analysis
export async function analyzeUrl(url: string): Promise<AnalysisResult> {
  const domain = extractDomain(url)

  // Quick whitelist check
  if (await checkWhitelist(domain)) {
    return {
      url, domain, score: 0, label: LABELS.SAFE,
      reasons: ['✅ Domain tin cậy'],
      aiConfidence: 1, heuristicScore: 0, aiScore: 0,
    }
  }

  // Quick blocklist check
  const block = await checkBlocklist(domain)
  if (block.blocked) {
    return {
      url, domain, score: 100, label: LABELS.DANGEROUS,
      reasons: [`🚫 ${block.reason || 'Đã bị chặn'}`],
      aiConfidence: 1, heuristicScore: 100, aiScore: 100,
    }
  }

  // Run heuristic + AI in parallel
  const [heuristic, ai] = await Promise.all([
    Promise.resolve(runHeuristics(url, domain)),
    analyzeWithAI(url, domain),
  ])

  // Special case: gambling keywords + unreachable website = very dangerous
  const hasGamblingKeyword = GAMBLING_KEYWORDS.some(k => domain.toLowerCase().includes(k))
  const isUnreachable = !ai.contentFetched
  
  if (hasGamblingKeyword && isUnreachable) {
    // Dead gambling site or blocked - extremely suspicious
    return {
      url, domain, score: 95, label: LABELS.DANGEROUS,
      reasons: ['🚨 Website cờ bạc không truy cập được', '⚠️ Domain đã chết hoặc bị chặn', ...heuristic.reasons.slice(0, 3)],
      aiConfidence: 0.95,
      heuristicScore: heuristic.score,
      aiScore: 95,
    }
  }

  // Weight: AI more when content fetched
  const aiWeight = ai.contentFetched ? 0.7 : 0.4
  const score = Math.round(heuristic.score * (1 - aiWeight) + ai.score * aiWeight)

  // Merge reasons (dedupe)
  const allReasons = Array.from(new Set([...heuristic.reasons, ...ai.reasons])).slice(0, 8)

  // Label
  let label: Label
  if (score <= 30) label = LABELS.SAFE
  else if (score <= 60) label = LABELS.CAUTION
  else label = LABELS.DANGEROUS

  if (allReasons.length === 0) {
    allReasons.push(label === LABELS.SAFE ? '✅ Không phát hiện vấn đề' : '⚠️ Cần thận trọng')
  }

  return {
    url, domain, score, label, reasons: allReasons,
    aiConfidence: ai.confidence,
    heuristicScore: heuristic.score,
    aiScore: ai.score,
  }
}
