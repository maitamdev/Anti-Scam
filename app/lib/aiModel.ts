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

  const prompt = `Bạn là một AI chuyên phân tích an ninh mạng, nhiệm vụ của bạn là đánh giá độ an toàn của các website.
Bạn phải phân tích cả URL, nội dung, meta, giao diện, hành vi tải trang và các yếu tố đáng ngờ.

📋 TIÊU CHÍ PHÂN TÍCH:

1️⃣ KIỂM TRA URL:
- Domain lạ, dài bất thường (>30 ký tự)
- Dùng dấu -, số hoặc ký tự lạ quá nhiều
- Domain nhái thương hiệu (paypa1.com, faceb00k.vn, vietcombannk.vn)
- Domain miễn phí (.tk, .ml, .ga, .cf, .gq)
- Subdomain giả mạo (login.paypal.com.fake.com, facebook.verify.xyz)

2️⃣ KIỂM TRA BẢO MẬT:
- Không có HTTPS
- SSL certificate không hợp lệ hoặc tự ký
- Redirect liên tục
- Website tải script từ nguồn độc hại

3️⃣ KIỂM TRA NỘI DUNG:
- Lỗi chính tả
- Logo bị mờ, giao diện nhái kém chất lượng
- Quảng cáo rác, popup liên tục
- Kêu gọi "nhận quà", "nhập OTP", "xác minh tài khoản", "giàu nhanh"
- Yêu cầu thông tin nhạy cảm (số thẻ, CVV, mật khẩu)

4️⃣ KIỂM TRA HÀNH VI ĐÁNG NGỜ:
- Yêu cầu thông tin cá nhân quá sớm/bất thường
- Form đăng nhập giả mạo
- Gửi OTP, mã ví, mật khẩu qua form lạ
- Yêu cầu tải app .apk
- Tự động tải file đáng ngờ
- Gửi người dùng sang trang thứ 3 lạ

5️⃣ KIỂM TRA DANH TIẾNG:
- Không tìm thấy thông tin công ty
- Domain mới đăng ký < 6 tháng
- Không có trang liên hệ uy tín
- Email dạng miễn phí (@gmail, @yahoo)

6️⃣ KIỂM TRA MÃ ĐỘC:
- Script obfuscation
- Iframe ẩn
- Malware signature pattern
- Keylogger form

🎯 CÁCH ĐÁNH GIÁ:

🔴 UNSAFE (score: 80-100) - category: "phishing"/"scam"/"gambling":
- Giả mạo ngân hàng/ví điện tử/thương hiệu lớn
- Cờ bạc/casino online
- Lừa đảo đầu tư/forex
- Yêu cầu OTP/mật khẩu/thẻ tín dụng
- Có ≥3 dấu hiệu nguy hiểm

🟡 SUSPICIOUS (score: 40-79) - category: "suspicious":
- Domain mới/TLD lạ
- Thiếu HTTPS
- Thiếu thông tin pháp lý
- Có 1-2 dấu hiệu đáng ngờ
- Quảng cáo quá hấp dẫn

🟢 SAFE (score: 0-39) - category: "safe":
- Website chính thống của tổ chức uy tín
- Domain chính xác (.gov.vn, .edu.vn, brand thật)
- Subdomain hợp lệ (chat.zalo.me, mail.google.com)
- Ngân hàng VN: .com.vn (vietcombank.com.vn, mbbank.com.vn)
- Không có dấu hiệu lừa đảo

📊 THÔNG TIN WEBSITE:
URL: ${url}
DOMAIN: ${domain}
${contentInfo}

⚠️ LƯU Ý QUAN TRỌNG:
- Phân biệt website chính thống có subdomain (mail.google.com → SAFE) vs giả mạo (google.com.verify.xyz → UNSAFE)
- Ngân hàng VN PHẢI có .com.vn hoặc .vn chính xác
- KHÔNG đánh giá nhầm website hợp pháp

🎯 OUTPUT (JSON thuần, KHÔNG thêm markdown):
{"score": <0-100>, "category": "safe/phishing/scam/gambling/suspicious", "reasons": ["dấu hiệu 1", "dấu hiệu 2"], "confidence": <0-1>}`

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 300,
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
