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
    factors.push('Khong co SSL/HTTPS - Ket noi khong duoc ma hoa')
    riskScore += 15
  }
  
  // Suspicious TLDs
  const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.club', '.work', '.click', '.link', '.info', '.online', '.site', '.website', '.space', '.fun', '.icu', '.buzz']
  if (suspiciousTLDs.some(tld => domain.endsWith(tld))) {
    factors.push(`TLD dang ngo: ${domain.split('.').pop()} - Thuong bi lam dung cho lua dao`)
    riskScore += 25
  }
  
  // Domain analysis
  if (domain.length > 30) {
    factors.push('Domain qua dai - Co the la domain gia mao')
    riskScore += 10
  }
  
  const hyphens = (domain.match(/-/g) || []).length
  if (hyphens > 2) {
    factors.push(`Domain co ${hyphens} dau gach ngang - Dau hieu gia mao`)
    riskScore += 15
  }
  
  if (/\d{4,}/.test(domain)) {
    factors.push('Domain chua nhieu so - Thuong la domain spam')
    riskScore += 10
  }
  
  // IP as domain
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(domain)) {
    factors.push('Su dung IP thay vi domain - Rat dang ngo')
    riskScore += 30
  }
  
  // Punycode (IDN homograph)
  if (domain.startsWith('xn--')) {
    factors.push('Domain Punycode - Co the la tan cong homograph')
    riskScore += 25
  }
  
  // Content analysis
  if (content) {
    if (content.hasLoginForm && !url.startsWith('https://')) {
      factors.push('Form dang nhap khong bao mat - Nguy hiem')
      riskScore += 30
    }
    
    if (content.hasPaymentForm) {
      factors.push('Co form thanh toan - Can xac minh ky')
      riskScore += 10
    }
    
    // Check for suspicious keywords
    const bodyLower = content.bodyText.toLowerCase()
    const gamblingKeywords = ['casino', 'slot', 'poker', 'baccarat', 'xo so', 'lo de', 'ca cuoc', 'nha cai', 'no hu', 'tai xiu']
    const gamblingHits = gamblingKeywords.filter(k => bodyLower.includes(k))
    if (gamblingHits.length >= 2) {
      factors.push(`Noi dung co bac: ${gamblingHits.join(', ')}`)
      riskScore += 50
    }
    
    const scamKeywords = ['trung thuong', 'nhan qua', 'mien phi', 'kiem tien', 'lam giau', 'dau tu', 'loi nhuan', 'x100', 'airdrop']
    const scamHits = scamKeywords.filter(k => bodyLower.includes(k))
    if (scamHits.length >= 2) {
      factors.push(`Noi dung dang ngo: ${scamHits.join(', ')}`)
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

QUY TẮC CHẤM ĐIỂM:
- 0-30: AN TOÀN - Website hợp pháp, đáng tin cậy
- 31-60: CẨN THẬN - Có một số dấu hiệu đáng ngờ
- 61-80: NGUY HIỂM - Nhiều dấu hiệu lừa đảo
- 81-100: RẤT NGUY HIỂM - Chắc chắn là lừa đảo/cờ bạc

TRƯỜNG HỢP ĐẶC BIỆT:
- Website cờ bạc: score >= 90
- Giả mạo ngân hàng: score >= 95
- Giả mạo thương hiệu lớn: score >= 85
- Website không truy cập được + domain đáng ngờ: score >= 70`

  const userPrompt = `PHÂN TÍCH WEBSITE:

URL: ${url}
DOMAIN: ${domain}

${securityInfo}

NỘI DUNG WEBSITE:
${contentInfo}

YÊU CẦU OUTPUT (JSON) - PHẢI VIẾT TIẾNG VIỆT CÓ DẤU:
{
  "score": <số từ 0-100>,
  "category": "<safe|suspicious|phishing|scam|gambling>",
  "reasons": [
    "Loại website: [Tên/Loại website cụ thể] - [Lĩnh vực hoạt động]",
    "Chức năng: [Mô tả CHI TIẾT website làm gì, cung cấp dịch vụ gì, cho ai]",
    "Phân tích domain: [Đánh giá tên miền ${domain}] - [TLD có hợp lệ không, có giả mạo không, lý do]",
    "Bảo mật: [Đánh giá SSL, form, rủi ro bảo mật cụ thể]",
    "Kết luận: [Tổng kết và khuyến nghị cho người dùng Việt Nam]"
  ],
  "confidence": <số từ 0.0-1.0>
}

LƯU Ý QUAN TRỌNG:
1. KHÔNG dùng emoji trong response
2. Mỗi reason phải CỤ THỂ, CHI TIẾT, không chung chung
3. PHẢI viết TIẾNG VIỆT CÓ DẤU đầy đủ (ví dụ: "Trang web", không phải "Trang web")
3. Neu la co bac/casino: score >= 90, category = "gambling"
4. Neu gia mao ngan hang/thuong hieu: score >= 85, category = "phishing"
5. Neu website khong truy cap duoc + domain dang ngo: score >= 70`

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
