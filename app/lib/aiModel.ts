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

  const prompt = `Bạn là chuyên gia phân tích an ninh mạng và nhận diện website. Nhiệm vụ: PHÂN TÍCH CHI TIẾT website và đưa ra đánh giá an toàn.

🔍 PHÂN TÍCH WEBSITE THEO CÁC KHÍA CẠNH:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 BƯỚC 1: XÁC ĐỊNH LOẠI WEBSITE VÀ CHỨC NĂNG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dựa vào URL, domain, title, description và nội dung, hãy xác định:

🏢 LOẠI WEBSITE:
- Ngân hàng/Tài chính
- Thương mại điện tử (E-commerce)
- Mạng xã hội/Nhắn tin
- Tin tức/Báo chí
- Chính phủ/Giáo dục
- Dịch vụ email/Cloud
- Giải trí/Streaming
- Cờ bạc/Casino (NGUY HIỂM)
- Phishing/Lừa đảo (NGUY HIỂM)
- Blog/Website cá nhân
- Dịch vụ công nghệ
- Khác

🎯 CHỨC NĂNG CHÍNH:
- Đăng nhập/Đăng ký tài khoản
- Thanh toán/Chuyển tiền
- Mua sắm online
- Đọc tin tức
- Chat/Nhắn tin
- Tải file/Ứng dụng
- Xem video/Nghe nhạc
- Đăng bài/Chia sẻ
- Tìm kiếm thông tin
- Cung cấp dịch vụ
- Đầu tư/Giao dịch
- Cá cược/Casino (NGUY HIỂM)

🔎 MỤC ĐÍCH WEBSITE:
- Cung cấp dịch vụ chính thức
- Kinh doanh hợp pháp
- Chia sẻ thông tin
- Giải trí
- NGUY HIỂM: Lừa đảo người dùng
- NGUY HIỂM: Đánh cắp thông tin
- NGUY HIỂM: Phishing tài khoản
- NGUY HIỂM: Cờ bạc trực tuyến

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 BƯỚC 2: KIỂM TRA AN TOÀN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ URL & DOMAIN:
❌ Domain lạ, dài bất thường (>30 ký tự)
❌ Dấu -, số lạ (fb-support-vn-login.com)
❌ Nhái thương hiệu (paypa1.com, vietcombannk.vn)
❌ TLD miễn phí (.tk, .ml, .ga, .cf, .gq)
❌ Subdomain giả (login.paypal.com.scam.xyz)
✅ Domain chính thống của thương hiệu

2️⃣ BẢO MẬT:
❌ Không HTTPS
❌ SSL không hợp lệ
❌ Form đăng nhập không an toàn
✅ HTTPS + SSL hợp lệ

3️⃣ NỘI DUNG:
❌ Lỗi chính tả nhiều
❌ Logo mờ, giao diện kém
❌ Popup spam
❌ "Nhận quà", "Nhập OTP", "Giàu nhanh"
❌ Yêu cầu số thẻ/CVV/mật khẩu
✅ Nội dung chuyên nghiệp

4️⃣ HÀNH VI:
❌ Yêu cầu thông tin cá nhân ngay
❌ Tải .apk/.exe đáng ngờ
❌ Form login/payment giả
❌ Redirect liên tục
✅ Hành vi bình thường

5️⃣ DANH TIẾNG:
❌ Domain mới < 6 tháng
❌ Không có thông tin công ty
❌ Email miễn phí (@gmail)
✅ Thương hiệu uy tín

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 BƯỚC 3: ĐÁNH GIÁ & KẾT LUẬN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 NGUY HIỂM (80-100 điểm):
- Giả mạo ngân hàng/ví/thương hiệu → "phishing"
- Cờ bạc/casino/lô đề → "gambling"
- Lừa đảo đầu tư/forex → "scam"
- Yêu cầu OTP/mật khẩu/thẻ → "scam"
- ≥3 dấu hiệu nguy hiểm

🟡 ĐÁNG NGỜ (40-79 điểm):
- Domain mới/TLD lạ → "suspicious"
- Thiếu HTTPS/thông tin pháp lý
- 1-2 dấu hiệu đáng ngờ
- Quảng cáo hấp dẫn bất thường

🟢 AN TOÀN (0-39 điểm):
- Website chính thống → "safe"
- Domain đúng (.gov.vn, vietcombank.com.vn)
- Subdomain hợp lệ (mail.google.com, chat.zalo.me)
- Không có dấu hiệu lừa đảo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 DỮ LIỆU PHÂN TÍCH:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

URL: ${url}
DOMAIN: ${domain}
${contentInfo}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 YÊU CẦU OUTPUT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Trả về JSON với format SAU (KHÔNG thêm markdown):

{
  "score": <0-100>,
  "category": "safe|phishing|scam|gambling|suspicious",
  "reasons": [
    "🏢 Loại website: [Tên loại] - [Chức năng chính]",
    "🎯 Mục đích: [Mô tả mục đích website]",
    "✅ Dấu hiệu tích cực 1 (nếu có)",
    "❌ Dấu hiệu nguy hiểm 1 (nếu có)",
    "... thêm 2-4 dấu hiệu quan trọng nhất"
  ],
  "confidence": <0-1>
}

VÍ DỤ OUTPUT TốT:
{
  "score": 0,
  "category": "safe",
  "reasons": [
    "🏢 Ngân hàng chính thống Vietcombank - Dịch vụ ngân hàng trực tuyến",
    "🎯 Cung cấp dịch vụ banking, chuyển tiền, tra cứu tài khoản",
    "✅ Domain chính xác vietcombank.com.vn",
    "✅ SSL hợp lệ, website bảo mật cao",
    "✅ Thương hiệu ngân hàng uy tín tại Việt Nam"
  ],
  "confidence": 0.95
}

QUAN TRỌNG:
- Reasons PHẢI bắt đầu bằng 2 dòng mô tả loại website và mục đích
- Sau đó liệt kê các dấu hiệu cụ thể (✅ tích cực, ❌ nguy hiểm)
- MỖI reason phải rõ ràng, cụ thể, dễ hiểu
- KHÔNG chung chung kiểu "website an toàn" hay "có vấn đề"`

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
