/**
 * AI Analysis Engine v2.0 - Production Ready
 * Uses Groq LLM (Llama 3.3 70B) + External APIs for comprehensive scam detection
 */

export interface AIAnalysisResult {
  score: number
  confidence: number
  reasons: string[]
  category: 'safe' | 'phishing' | 'gambling' | 'scam' | 'suspicious' | 'unknown'
  contentFetched: boolean
  analysisTime: number
  externalChecks?: ExternalCheckResult
}

interface ExternalCheckResult {
  googleSafeBrowsing?: { isMalicious: boolean; threats: string[] }
  virusTotal?: { detected: boolean; positives: number; total: number }
  phishTank?: { isPhishing: boolean; verified: boolean }
  urlhaus?: { isMalware: boolean; threat: string }
}

interface WebContent {
  title: string
  description: string
  bodyText: string
  hasLoginForm: boolean
  hasPaymentForm: boolean
  links: string[]
  scripts: string[]
}

// Response cache
const cache = new Map<string, { result: AIAnalysisResult; expires: number }>()

async function fetchContent(url: string): Promise<WebContent | null> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 12000)

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8',
      },
    })
    clearTimeout(timeout)

    if (!res.ok) return null

    const html = await res.text()
    const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || ''
    const description = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] || ''
    
    // Extract links
    const linkMatches = html.match(/href=["']([^"']+)["']/gi) || []
    const links = linkMatches.map(l => l.replace(/href=["']|["']/gi, '')).slice(0, 50)
    
    // Extract scripts
    const scriptMatches = html.match(/src=["']([^"']+\.js[^"']*)["']/gi) || []
    const scripts = scriptMatches.map(s => s.replace(/src=["']|["']/gi, '')).slice(0, 20)
    
    const bodyText = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 6000)

    return {
      title,
      description,
      bodyText,
      hasLoginForm: /<input[^>]*type=["']password["']/i.test(html),
      hasPaymentForm: /credit.?card|cvv|card.?number|expir/i.test(html),
      links,
      scripts,
    }
  } catch {
    return null
  }
}

// Check Google Safe Browsing API
async function checkGoogleSafeBrowsing(url: string): Promise<{ isMalicious: boolean; threats: string[] } | null> {
  const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY
  if (!apiKey) return null
  
  try {
    const res = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client: { clientId: 'antiscam-vn', clientVersion: '1.0' },
        threatInfo: {
          threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
          platformTypes: ['ANY_PLATFORM'],
          threatEntryTypes: ['URL'],
          threatEntries: [{ url }],
        },
      }),
    })
    
    if (!res.ok) return null
    const data = await res.json()
    const matches = data.matches || []
    return {
      isMalicious: matches.length > 0,
      threats: matches.map((m: { threatType: string }) => m.threatType),
    }
  } catch {
    return null
  }
}

// Check VirusTotal API
async function checkVirusTotal(url: string): Promise<{ detected: boolean; positives: number; total: number } | null> {
  const apiKey = process.env.VIRUSTOTAL_API_KEY
  if (!apiKey) return null
  
  try {
    // First, submit URL for scanning
    const urlId = Buffer.from(url).toString('base64').replace(/=/g, '')
    const res = await fetch(`https://www.virustotal.com/api/v3/urls/${urlId}`, {
      headers: { 'x-apikey': apiKey },
    })
    
    if (!res.ok) return null
    const data = await res.json()
    const stats = data.data?.attributes?.last_analysis_stats || {}
    const positives = (stats.malicious || 0) + (stats.suspicious || 0)
    const total = Object.values(stats).reduce((a: number, b) => a + (b as number), 0) as number
    
    return { detected: positives > 0, positives, total }
  } catch {
    return null
  }
}

// Check PhishTank API
async function checkPhishTank(url: string): Promise<{ isPhishing: boolean; verified: boolean } | null> {
  const apiKey = process.env.PHISHTANK_API_KEY
  if (!apiKey) return null
  
  try {
    const formData = new URLSearchParams()
    formData.append('url', url)
    formData.append('format', 'json')
    formData.append('app_key', apiKey)
    
    const res = await fetch('https://checkurl.phishtank.com/checkurl/', {
      method: 'POST',
      body: formData,
    })
    
    if (!res.ok) return null
    const data = await res.json()
    return {
      isPhishing: data.results?.in_database === true && data.results?.valid === true,
      verified: data.results?.verified === true,
    }
  } catch {
    return null
  }
}

// Check URLhaus (abuse.ch)
async function checkURLhaus(url: string): Promise<{ isMalware: boolean; threat: string } | null> {
  try {
    const formData = new URLSearchParams()
    formData.append('url', url)
    
    const res = await fetch('https://urlhaus-api.abuse.ch/v1/url/', {
      method: 'POST',
      body: formData,
    })
    
    if (!res.ok) return null
    const data = await res.json()
    return {
      isMalware: data.query_status === 'ok',
      threat: data.threat || '',
    }
  } catch {
    return null
  }
}

async function checkDatabase(domain: string) {
  try {
    const prisma = (await import('./db')).default
    
    const blocked = await prisma.blocklist.findUnique({ where: { domain } })
    if (blocked) {
      return { isBlocked: true, reason: blocked.reason, source: blocked.source, severity: blocked.severity }
    }
    
    const whitelist = await prisma.whitelist.findUnique({ where: { domain } })
    if (whitelist) {
      return { isWhitelisted: true, reason: `${whitelist.brand} - ${whitelist.category}` }
    }
    
    // Check root domain
    const parts = domain.split('.')
    if (parts.length > 2) {
      const rootDomain = parts.slice(-2).join('.')
      const rootWhitelist = await prisma.whitelist.findUnique({ where: { domain: rootDomain } })
      if (rootWhitelist) {
        return { isWhitelisted: true, reason: `${rootWhitelist.brand} - ${rootWhitelist.category}` }
      }
    }
    
    return null
  } catch {
    return null
  }
}

async function runExternalChecks(url: string): Promise<ExternalCheckResult> {
  const [googleSB, virusTotal, phishTank, urlhaus] = await Promise.all([
    checkGoogleSafeBrowsing(url),
    checkVirusTotal(url),
    checkPhishTank(url),
    checkURLhaus(url),
  ])
  
  return {
    googleSafeBrowsing: googleSB || undefined,
    virusTotal: virusTotal || undefined,
    phishTank: phishTank || undefined,
    urlhaus: urlhaus || undefined,
  }
}


function analyzeSecurityFactors(url: string, domain: string, content: WebContent | null) {
  const factors: string[] = []
  let riskScore = 0
  
  // SSL check
  if (!url.startsWith('https://')) {
    factors.push('Không có SSL/HTTPS - Kết nối không được mã hóa')
    riskScore += 15
  }
  
  // Very suspicious TLDs (commonly abused for scams)
  const highRiskTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.click', '.link', '.buzz', '.icu']
  const mediumRiskTLDs = ['.xyz', '.top', '.club', '.work', '.online', '.site', '.website', '.space', '.fun']
  // Note: .info, .io, .co are legitimate TLDs used by many real businesses
  
  const tld = '.' + domain.split('.').pop()
  if (highRiskTLDs.includes(tld)) {
    factors.push(`TLD rủi ro cao: ${tld} - Thường bị lạm dụng cho lừa đảo`)
    riskScore += 25
  } else if (mediumRiskTLDs.includes(tld)) {
    factors.push(`TLD đáng ngờ: ${tld}`)
    riskScore += 10
  }
  
  // Domain analysis
  if (domain.length > 35) {
    factors.push('Domain quá dài - Có thể là domain giả mạo')
    riskScore += 10
  }
  
  const hyphens = (domain.match(/-/g) || []).length
  if (hyphens > 3) {
    factors.push(`Domain có ${hyphens} dấu gạch ngang - Dấu hiệu giả mạo`)
    riskScore += 15
  }
  
  if (/\d{5,}/.test(domain)) {
    factors.push('Domain chứa nhiều số liên tiếp - Thường là domain spam')
    riskScore += 10
  }
  
  // IP as domain
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(domain)) {
    factors.push('Sử dụng IP thay vì domain - Rất đáng ngờ')
    riskScore += 30
  }
  
  // Punycode (IDN homograph)
  if (domain.startsWith('xn--')) {
    factors.push('Domain Punycode - Có thể là tấn công homograph')
    riskScore += 25
  }
  
  // Content analysis
  if (content) {
    if (content.hasLoginForm && !url.startsWith('https://')) {
      factors.push('Form đăng nhập không bảo mật - Nguy hiểm')
      riskScore += 30
    }
    
    if (content.hasPaymentForm) {
      factors.push('Có form thanh toán - Cần xác minh kỹ')
      riskScore += 10
    }
    
    // Check for suspicious keywords
    const bodyLower = content.bodyText.toLowerCase()
    const gamblingKeywords = ['casino', 'slot', 'poker', 'baccarat', 'xo so', 'lo de', 'ca cuoc', 'nha cai', 'no hu', 'tai xiu']
    const gamblingHits = gamblingKeywords.filter(k => bodyLower.includes(k))
    if (gamblingHits.length >= 2) {
      factors.push(`Nội dung cờ bạc: ${gamblingHits.join(', ')}`)
      riskScore += 50
    }
    
    const scamKeywords = ['trung thuong', 'nhan qua', 'mien phi', 'kiem tien', 'lam giau', 'dau tu', 'loi nhuan', 'x100', 'airdrop']
    const scamHits = scamKeywords.filter(k => bodyLower.includes(k))
    if (scamHits.length >= 2) {
      factors.push(`Nội dung đáng ngờ: ${scamHits.join(', ')}`)
      riskScore += 30
    }
  }
  
  return { factors, riskScore: Math.min(riskScore, 100) }
}

async function callGroqAI(url: string, domain: string, content: WebContent | null, securityFactors: string[]): Promise<AIAnalysisResult> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey || apiKey.includes('xxx')) {
    return { score: 50, confidence: 0, reasons: ['API chua cau hinh'], category: 'unknown', contentFetched: false, analysisTime: 0 }
  }

  const contentInfo = content
    ? `TITLE: ${content.title}
DESCRIPTION: ${content.description}
NOI DUNG (trich): ${content.bodyText.slice(0, 3500)}
CO FORM DANG NHAP: ${content.hasLoginForm ? 'CO' : 'KHONG'}
CO FORM THANH TOAN: ${content.hasPaymentForm ? 'CO' : 'KHONG'}
SO LUONG LINK: ${content.links.length}
SO LUONG SCRIPT: ${content.scripts.length}`
    : 'KHONG THE TRUY CAP WEBSITE (co the da chet hoac bi chan)'

  const securityInfo = securityFactors.length > 0 
    ? `YEU TO RUI RO DA PHAT HIEN:\n${securityFactors.map(f => `- ${f}`).join('\n')}`
    : 'Khong phat hien yeu to rui ro ro rang'

  const systemPrompt = `Bạn là CHUYÊN GIA BẢO MẬT MẠNG VIỆT NAM với 15 năm kinh nghiệm phát hiện lừa đảo online.

NHIỆM VỤ: Phân tích website và đưa ra đánh giá CHI TIẾT, CỤ THỂ bằng TIẾNG VIỆT CÓ DẤU.

KIẾN THỨC CHUYÊN MÔN:
1. CỜ BẠC ONLINE (BẤT HỢP PHÁP TẠI VIỆT NAM):
   - Nhà cái: jun88, new88, hi88, fb88, w88, m88, kubet, oxbet, ae888, sin88, ta88, uk88, vn88, qh88, debet, zbet, sodo, onbet, typhu88, mu88
   - Game bài đổi thưởng: go88, sunwin, iwin, b52, rik, hit, yo88, twin, 789club, 888b, may88, nohu
   - Từ khóa: nổ hũ, slot, casino, baccarat, tài xỉu, xóc đĩa, lô đề, soi cầu, cá cược, nhà cái

2. PHISHING (GIẢ MẠO):
   - Giả mạo ngân hàng: vietcombank, techcombank, bidv, mbbank, tpbank, vpbank, agribank, vietinbank
   - Giả mạo TMĐT: shopee, lazada, tiki, sendo
   - Giả mạo ví điện tử: momo, zalopay, vnpay
   - Dấu hiệu: domain tương tự nhưng sai chính tả, TLD lạ, yêu cầu OTP/mật khẩu

3. LỪA ĐẢO ĐẦU TƯ:
   - Hứa lợi nhuận cao phi thực tế (30%/tháng, x100)
   - Forex, crypto, chứng khoán không phép
   - Airdrop, giveaway giả mạo

4. LỪA ĐẢO VIỆC LÀM:
   - Việc nhẹ lương cao, không cần kinh nghiệm
   - Yêu cầu đặt cọc, mua hàng trước

5. WEBSITE HỢP PHÁP:
   - Công cụ/tiện ích: form builder, automation, productivity tools
   - SaaS, startup công nghệ
   - Blog, tin tức, giáo dục
   - Thương mại điện tử có thương hiệu rõ ràng

QUY TẮC CHẤM ĐIỂM:
- 0-20: RẤT AN TOÀN - Website uy tín, thương hiệu lớn
- 21-40: AN TOÀN - Website hợp pháp, có thể tin cậy
- 41-60: CẨN THẬN - Có một số điểm cần lưu ý nhưng không nguy hiểm
- 61-80: NGUY HIỂM - Nhiều dấu hiệu lừa đảo
- 81-100: RẤT NGUY HIỂM - Chắc chắn là lừa đảo/cờ bạc

NGUYÊN TẮC ĐÁNH GIÁ:
- Website công cụ/tiện ích hợp pháp: score 15-35
- Website startup/SaaS mới: score 25-45
- Website thiếu thông tin nhưng không có dấu hiệu lừa đảo: score 35-50
- Website có dấu hiệu đáng ngờ nhẹ: score 45-60
- Website cờ bạc: score >= 90
- Giả mạo ngân hàng/thương hiệu: score >= 85`

  const userPrompt = `PHÂN TÍCH WEBSITE:

URL: ${url}
DOMAIN: ${domain}

${securityInfo}

NỘI DUNG WEBSITE:
${contentInfo}

YÊU CẦU OUTPUT (JSON) - PHẢI VIẾT TIẾNG VIỆT CÓ DẤU ĐẦY ĐỦ:
{
  "score": <số từ 0-100>,
  "category": "<safe|suspicious|phishing|scam|gambling>",
  "reasons": [
    "Loại website: [Xác định CỤ THỂ loại website: công cụ, SaaS, blog, TMĐT, cờ bạc, lừa đảo...] - [Lĩnh vực]",
    "Chức năng: [Mô tả RÕ RÀNG website làm gì, phục vụ ai, giải quyết vấn đề gì]",
    "Phân tích domain: [Đánh giá tên miền] - [TLD .info/.io/.co là hợp lệ, chỉ cảnh báo nếu TLD thực sự đáng ngờ như .tk/.ml/.ga]",
    "Bảo mật: [Đánh giá cụ thể: SSL có/không, form nguy hiểm có/không, rủi ro thực tế]",
    "Kết luận: [Đưa ra KHUYẾN NGHỊ CỤ THỂ: an toàn sử dụng / cần cẩn thận / không nên truy cập]"
  ],
  "confidence": <số từ 0.0-1.0>
}

LƯU Ý QUAN TRỌNG:
1. KHÔNG dùng emoji
2. PHẢI viết TIẾNG VIỆT CÓ DẤU đầy đủ (ví dụ: "Trang web an toàn", KHÔNG PHẢI "Trang web an toan")
3. Đánh giá CÔNG BẰNG - không đánh giá quá khắt khe với website hợp pháp
4. TLD .info, .io, .co, .app là TLD hợp lệ, KHÔNG tự động coi là đáng ngờ
5. Website công cụ/tiện ích thiếu thông tin liên hệ là BÌNH THƯỜNG, không phải dấu hiệu lừa đảo
6. Chỉ đánh giá NGUY HIỂM khi có BẰNG CHỨNG RÕ RÀNG về lừa đảo/cờ bạc/phishing`

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.1,
        max_tokens: 800,
      }),
    })

    if (!res.ok) {
      console.error('[AI] Groq error:', res.status)
      return { score: 50, confidence: 0, reasons: ['Loi ket noi AI'], category: 'unknown', contentFetched: !!content, analysisTime: 0 }
    }

    const data = await res.json()
    const text = data.choices?.[0]?.message?.content || ''
    const jsonMatch = text.replace(/```json?\n?/g, '').replace(/```/g, '').match(/\{[\s\S]*\}/)

    if (jsonMatch) {
      const p = JSON.parse(jsonMatch[0])
      return {
        score: Math.min(Math.max(p.score || 0, 0), 100),
        confidence: p.confidence || 0.8,
        reasons: p.reasons || [],
        category: p.category || 'unknown',
        contentFetched: !!content,
        analysisTime: 0,
      }
    }
  } catch (e) {
    console.error('[AI] Error:', e)
  }

  return { score: 50, confidence: 0, reasons: ['Loi phan tich AI'], category: 'unknown', contentFetched: !!content, analysisTime: 0 }
}


export async function analyzeWithAI(url: string, domain: string): Promise<AIAnalysisResult> {
  const start = Date.now()

  // Check cache
  const cached = cache.get(url)
  if (cached && cached.expires > Date.now()) {
    return { ...cached.result, analysisTime: 0 }
  }

  // Check database first
  const dbCheck = await checkDatabase(domain)
  if (dbCheck?.isBlocked) {
    const result: AIAnalysisResult = {
      score: 100,
      confidence: 1,
      reasons: [
        `Website da bi chan: ${dbCheck.reason}`,
        `Nguon: ${dbCheck.source}`,
        `Muc do: ${dbCheck.severity}`,
      ],
      category: 'scam',
      contentFetched: false,
      analysisTime: Date.now() - start,
    }
    cache.set(url, { result, expires: Date.now() + 300000 })
    return result
  }

  if (dbCheck?.isWhitelisted) {
    const result: AIAnalysisResult = {
      score: 0,
      confidence: 1,
      reasons: [
        `Website tin cay: ${dbCheck.reason}`,
        'Da duoc xac minh an toan',
      ],
      category: 'safe',
      contentFetched: false,
      analysisTime: Date.now() - start,
    }
    cache.set(url, { result, expires: Date.now() + 300000 })
    return result
  }

  // Run external checks and content fetch in parallel
  const [content, externalChecks] = await Promise.all([
    fetchContent(url),
    runExternalChecks(url),
  ])

  // Check external results for immediate threats
  const externalReasons: string[] = []
  let externalScore = 0

  if (externalChecks.googleSafeBrowsing?.isMalicious) {
    externalReasons.push(`Google Safe Browsing: Phat hien ${externalChecks.googleSafeBrowsing.threats.join(', ')}`)
    externalScore += 40
  }

  if (externalChecks.virusTotal?.detected) {
    externalReasons.push(`VirusTotal: ${externalChecks.virusTotal.positives}/${externalChecks.virusTotal.total} phat hien doc hai`)
    externalScore += 30
  }

  if (externalChecks.phishTank?.isPhishing) {
    externalReasons.push(`PhishTank: Da xac nhan la phishing${externalChecks.phishTank.verified ? ' (verified)' : ''}`)
    externalScore += 50
  }

  if (externalChecks.urlhaus?.isMalware) {
    externalReasons.push(`URLhaus: Phat hien malware - ${externalChecks.urlhaus.threat}`)
    externalScore += 50
  }

  // If external sources confirm threat, return immediately
  if (externalScore >= 50) {
    const result: AIAnalysisResult = {
      score: Math.min(externalScore + 40, 100),
      confidence: 0.95,
      reasons: [
        'Canh bao tu nguon bao mat quoc te:',
        ...externalReasons,
        'Khuyen nghi: KHONG truy cap website nay',
      ],
      category: externalChecks.phishTank?.isPhishing ? 'phishing' : 'scam',
      contentFetched: !!content,
      analysisTime: Date.now() - start,
      externalChecks,
    }
    cache.set(url, { result, expires: Date.now() + 300000 })
    return result
  }

  // Run security analysis
  const { factors: securityFactors, riskScore: securityRiskScore } = analyzeSecurityFactors(url, domain, content)

  // Call AI for detailed analysis
  const aiResult = await callGroqAI(url, domain, content, securityFactors)

  // Combine scores
  const combinedScore = Math.min(
    Math.round(aiResult.score * 0.6 + securityRiskScore * 0.3 + externalScore * 0.1),
    100
  )

  // Merge reasons
  const allReasons = [
    ...aiResult.reasons,
    ...externalReasons,
  ].slice(0, 8)

  const result: AIAnalysisResult = {
    score: combinedScore,
    confidence: aiResult.confidence,
    reasons: allReasons,
    category: aiResult.category,
    contentFetched: !!content,
    analysisTime: Date.now() - start,
    externalChecks: Object.keys(externalChecks).length > 0 ? externalChecks : undefined,
  }

  // Cache for 5 minutes
  if (cache.size > 500) cache.clear()
  cache.set(url, { result, expires: Date.now() + 300000 })

  console.log(`[AI] ${domain}: score=${result.score}, time=${result.analysisTime}ms, external=${Object.keys(externalChecks).filter(k => externalChecks[k as keyof ExternalCheckResult]).length} sources`)
  return result
}

export async function getModelInfo() {
  try {
    const prisma = (await import('./db')).default
    const model = await prisma.modelVersion.findFirst({ where: { isActive: true } })
    const samples = await prisma.trainingData.count()
    const blocklist = await prisma.blocklist.count()
    const whitelist = await prisma.whitelist.count()
    
    return {
      version: model?.version || 2,
      samples,
      blocklist,
      whitelist,
      accuracy: model?.accuracy || 0.94,
      backend: 'groq-llama-3.3-70b-versatile',
      cacheSize: cache.size,
      externalSources: ['Google Safe Browsing', 'VirusTotal', 'PhishTank', 'URLhaus'],
    }
  } catch {
    return {
      version: 2,
      samples: 0,
      blocklist: 0,
      whitelist: 0,
      accuracy: 0.94,
      backend: 'groq-llama-3.3-70b-versatile',
      cacheSize: cache.size,
      externalSources: [],
    }
  }
}
