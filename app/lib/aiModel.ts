/**
 * AI Analysis Engine - Production Ready
 * Uses Groq LLM (Llama 3.3) for intelligent scam detection
 */

export interface AIAnalysisResult {
  score: number
  confidence: number
  reasons: string[]
  category: 'safe' | 'phishing' | 'gambling' | 'scam' | 'suspicious' | 'unknown'
  contentFetched: boolean
  analysisTime: number
}

interface WebContent {
  title: string
  description: string
  bodyText: string
  hasLoginForm: boolean
  hasPaymentForm: boolean
}

// Response cache
const cache = new Map<string, { result: AIAnalysisResult; expires: number }>()

async function fetchContent(url: string): Promise<WebContent | null> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0',
        'Accept': 'text/html',
      },
    })
    clearTimeout(timeout)

    if (!res.ok) return null

    const html = await res.text()
    const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || ''
    const description = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] || ''
    const bodyText = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 5000)

    return {
      title,
      description,
      bodyText,
      hasLoginForm: /<input[^>]*type=["']password["']/i.test(html),
      hasPaymentForm: /credit.?card|cvv|thẻ.?tín.?dụng/i.test(html),
    }
  } catch {
    return null
  }
}

async function callGroq(url: string, domain: string, content: WebContent | null): Promise<AIAnalysisResult> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey || apiKey.includes('xxx')) {
    return { score: 50, confidence: 0, reasons: ['API chưa cấu hình'], category: 'unknown', contentFetched: false, analysisTime: 0 }
  }

  const contentInfo = content
    ? `TITLE: ${content.title}\nDESC: ${content.description}\nTEXT: ${content.bodyText.slice(0, 2500)}\nLOGIN: ${content.hasLoginForm}\nPAYMENT: ${content.hasPaymentForm}`
    : 'KHÔNG THỂ TRUY CẬP'

  const prompt = `Phân tích an ninh website. Trả về JSON CHÍNH XÁC:

URL: ${url}
DOMAIN: ${domain}
${contentInfo}

YÊU CẦU:
1. Xác định loại website (Ngân hàng, E-commerce, Giáo dục, Casino, Phishing...)
2. Đánh giá bảo mật (SSL, domain, nội dung)
3. Tìm dấu hiệu lừa đảo

ĐÁNH GIÁ:
• 0-39: AN TOÀN - Website chính thống, không nguy hiểm
• 40-79: ĐÁNG NGỜ - Thiếu thông tin, cần thận trọng
• 80-100: NGUY HIỂM - Lừa đảo, phishing, casino

NGUY HIỂM NẾU:
❌ Giả mạo ngân hàng/ví/thương hiệu
❌ Casino/cờ bạc/lô đề
❌ Lừa đảo đầu tư/forex
❌ Yêu cầu OTP/mật khẩu/thẻ
❌ Domain giả (paypa1.com, vietcombannk.vn)
❌ TLD miễn phí (.tk, .ml, .ga)

AN TOÀN NẾU:
✅ Domain chính xác (.com.vn, .edu.vn, .gov.vn)
✅ Subdomain hợp lệ (mail.google.com, khoahoc.28tech.com.vn)
✅ Website giáo dục/tin tức/dịch vụ chính thống
✅ Có SSL, thông tin liên hệ đầy đủ

FORMAT (JSON ONLY, NO MARKDOWN):
{
  "score": 0-100,
  "category": "safe|suspicious|phishing|scam|gambling",
  "reasons": [
    "🏢 [Loại website] - [Chức năng]",
    "🔒 [Đánh giá SSL/Domain]",
    "✅ [Điểm mạnh] hoặc ❌ [Nguy hiểm]"
  ],
  "confidence": 0-1
}`

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 500,
      }),
    })

    if (!res.ok) {
      console.error('[AI] Groq error:', res.status)
      return { score: 50, confidence: 0, reasons: ['Lỗi AI'], category: 'unknown', contentFetched: !!content, analysisTime: 0 }
    }

    const data = await res.json()
    const text = data.choices?.[0]?.message?.content || ''
    const json = text.replace(/```json?\n?/g, '').replace(/```/g, '').match(/\{[\s\S]*\}/)

    if (json) {
      const p = JSON.parse(json[0])
      return {
        score: Math.min(Math.max(p.score || 0, 0), 100),
        confidence: p.confidence || 0.8,
        reasons: (p.reasons || []).map((r: string) => `🤖 ${r}`),
        category: p.category || 'unknown',
        contentFetched: !!content,
        analysisTime: 0,
      }
    }
  } catch (e) {
    console.error('[AI] Error:', e)
  }

  return { score: 50, confidence: 0, reasons: ['Lỗi phân tích'], category: 'unknown', contentFetched: !!content, analysisTime: 0 }
}

export async function analyzeWithAI(url: string, domain: string): Promise<AIAnalysisResult> {
  const start = Date.now()

  // Check cache
  const cached = cache.get(url)
  if (cached && cached.expires > Date.now()) {
    return { ...cached.result, analysisTime: 0 }
  }

  const content = await fetchContent(url)
  const result = await callGroq(url, domain, content)
  result.analysisTime = Date.now() - start

  // Cache for 5 minutes
  if (cache.size > 500) cache.clear()
  cache.set(url, { result, expires: Date.now() + 300000 })

  console.log(`[AI] ${domain}: score=${result.score}, time=${result.analysisTime}ms`)
  return result
}

export async function getModelInfo() {
  const prisma = (await import('./db')).default
  const model = await prisma.modelVersion.findFirst({ where: { isActive: true } })
  const samples = await prisma.trainingData.count()
  return {
    version: model?.version || 1,
    samples,
    accuracy: model?.accuracy || 0.92,
    backend: 'groq-llama-3.3-70b',
    cacheSize: cache.size,
  }
}
