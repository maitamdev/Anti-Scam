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

  const prompt = `Bạn là chuyên gia an ninh mạng. Phân tích chuyên sâu website sau:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 1. PHÂN TÍCH KỸ THUẬT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SSL/TLS & HTTPS:
✅ HTTPS hợp lệ, SSL certificate tin cậy
❌ HTTP không mã hóa
❌ Self-signed certificate
❌ Certificate hết hạn

Domain:
✅ Domain lâu năm (>1 năm), WHOIS công khai
❌ Domain mới (<3 tháng)
❌ WHOIS ẩn danh, privacy protection
❌ Đăng ký ở nước ngoài lạ
❌ TLD miễn phí (.tk, .ml, .ga, .cf)

Hosting & Server:
✅ Server uy tín (AWS, Google Cloud, Azure)
❌ Server lạ, IP blacklist
❌ Server ở quốc gia đáng ngờ
❌ Shared hosting rẻ tiền

Hành vi nguy hiểm:
❌ Redirect liên tục
❌ Iframe ẩn
❌ Script obfuscated/minified đáng ngờ
❌ Auto-download file .exe/.apk
❌ Mining script

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 2. PHÂN TÍCH NỘI DUNG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chất lượng nội dung:
✅ Chuyên nghiệp, không lỗi chính tả
❌ Lỗi chính tả nhiều
❌ Văn phong kém, dịch máy
❌ Copy từ website khác

Dấu hiệu giả mạo:
❌ Logo mờ, kém chất lượng
❌ Màu sắc nhái thương hiệu (bank, ví điện tử)
❌ Tên giống thương hiệu lớn
❌ Claim là đại diện chính thức nhưng domain sai

Yêu cầu thông tin:
✅ Chỉ hỏi thông tin cần thiết
❌ Hỏi số CMND, thẻ tín dụng, CVV
❌ Yêu cầu mã OTP
❌ Hỏi mật khẩu ngân hàng
❌ Upload ảnh CMND/passport

Nội dung đáng ngờ:
❌ "Nhận 10 triệu miễn phí"
❌ "Đầu tư lãi 30%/tháng"
❌ "Nhấp link nhận quà"
❌ "Xác minh tài khoản ngay"
❌ "Tài khoản bị khóa, click để mở"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 3. PHÂN TÍCH GIAO DIỆN (UI/UX)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chất lượng thiết kế:
✅ Giao diện chuyên nghiệp, responsive
❌ Giao diện rẻ tiền, template free
❌ Thiếu nhất quán (font, màu, layout)
❌ Không responsive mobile

Hành vi đáng ngờ:
❌ Nút "Download" dẫn đến link lạ
❌ Nút "Login" redirect sang domain khác
❌ Popup không tắt được
❌ Popup yêu cầu nhập thông tin
❌ Auto-play video/audio
❌ Countdown giả tạo áp lực

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 4. PHÂN TÍCH MÃ NGUỒN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JavaScript nguy hiểm:
❌ Keylogger (ghi phím)
❌ Clipboard hijacking
❌ Form data stealing
❌ Cookie stealing
❌ Crypto mining script
❌ Eval() với code đáng ngờ

Link & API:
❌ Hidden iframe
❌ Link ẩn trong nút
❌ API call tới server lạ
❌ POST data tới domain khác
❌ Load script từ nguồn không rõ

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 5. DANH TIẾNG & NGUỒN NGOÀI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Kiểm tra:
✅ Có trên Google Safe Browsing (safe)
✅ Không có báo cáo trên PhishTank
✅ ScamAdviser rating cao
✅ VirusTotal clean
✅ Reviews tích cực
❌ Listed trên blacklist
❌ Phàn nàn lừa đảo
❌ VirusTotal phát hiện malware
❌ Không tìm thấy thông tin

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 DỮ LIỆU PHÂN TÍCH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

URL: ${url}
DOMAIN: ${domain}
${contentInfo}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 CÁCH ĐÁNH GIÁ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCORE 0-100:
• 0-20: Hoàn toàn an toàn, website chính thống
• 21-40: Khả năng an toàn cao
• 41-60: Đáng ngờ, cần thận trọng
• 61-80: Nguy hiểm, nhiều dấu hiệu lừa đảo
• 81-100: Cực kỳ nguy hiểm, chắc chắn lừa đảo

CATEGORY:
• "safe": Website an toàn, chính thống
• "suspicious": Đáng ngờ, thiếu thông tin
• "phishing": Giả mạo ngân hàng/tổ chức
• "scam": Lừa đảo đầu tư/kiếm tiền
• "gambling": Cờ bạc/casino trực tuyến

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 FORMAT OUTPUT (JSON ONLY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{
  "score": <0-100>,
  "category": "safe|suspicious|phishing|scam|gambling",
  "reasons": [
    "🏢 [Loại website] - [Chức năng chính]",
    "🎯 Mục đích: [Mô tả mục đích]",
    "🔒 Bảo mật: [Đánh giá SSL/HTTPS]",
    "🌐 Domain: [Tuổi domain, WHOIS, TLD]",
    "⚠️ [Dấu hiệu cảnh báo nếu có]",
    "✅ [Điểm tích cực nếu có]"
  ],
  "confidence": <0-1>
}

LƯU Ý:
- Reasons phải CỤ THỂ, RÕ RÀNG
- Bắt đầu với loại website và mục đích
- Sau đó đánh giá kỹ thuật (SSL, domain)
- Cuối cùng liệt kê rủi ro/ưu điểm
- MỖI reason độc lập, dễ hiểu
- KHÔNG chung chung, KHÔNG lặp lại`

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
