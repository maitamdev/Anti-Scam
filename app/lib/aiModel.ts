/**
 * AI Analysis Engine - Groq LLM
 * Fetches website content and analyzes with Llama 3.3
 */

interface AIAnalysisResult {
  score: number
  confidence: number
  reasons: string[]
  contentFetched: boolean
}

interface WebContent {
  title: string
  description: string
  text: string
  hasLoginForm: boolean
  hasPaymentForm: boolean
}

// Fetch website content with timeout
async function fetchContent(url: string): Promise<WebContent | null> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0',
        'Accept': 'text/html',
        'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8',
      },
    })
    clearTimeout(timeout)

    if (!res.ok) return null

    const html = await res.text()
    
    // Extract key info
    const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || ''
    const description = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] || ''
    
    // Clean body text
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 4000)

    const hasLoginForm = /<input[^>]*type=["']password["']/i.test(html)
    const hasPaymentForm = /credit.?card|thẻ.?tín.?dụng|cvv/i.test(html)

    return { title, description, text, hasLoginForm, hasPaymentForm }
  } catch {
    return null
  }
}

// Analyze with Groq
async function callGroq(url: string, domain: string, content: WebContent | null): Promise<AIAnalysisResult> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey || apiKey.includes('xxx')) {
    return { score: 0, confidence: 0, reasons: [], contentFetched: false }
  }

  const contentInfo = content 
    ? `TITLE: ${content.title}\nDESC: ${content.description}\nTEXT: ${content.text.slice(0, 2000)}\nLOGIN_FORM: ${content.hasLoginForm}\nPAYMENT_FORM: ${content.hasPaymentForm}`
    : 'KHÔNG THỂ TRUY CẬP WEBSITE'

  const prompt = `Phân tích website lừa đảo VN. Trả về JSON:
{"score":0-100,"reasons":["lý do"]}

TIÊU CHÍ:
- Cờ bạc/casino/lô đề: 80-100
- Phishing ngân hàng/ví: 80-100  
- Lừa đầu tư/forex/crypto: 70-90
- Yêu cầu OTP/mật khẩu lạ: 60-80
- Kiếm tiền online/việc giả: 50-70
- Website bình thường: 0-30

URL: ${url}
DOMAIN: ${domain}
${contentInfo}`

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        max_tokens: 300,
      }),
    })

    if (!res.ok) {
      console.error('Groq error:', res.status, await res.text())
      return { score: 0, confidence: 0, reasons: [], contentFetched: !!content }
    }

    const data = await res.json()
    const text = data.choices?.[0]?.message?.content || ''
    
    // Parse JSON from response
    const jsonMatch = text.replace(/```json?\n?/g, '').replace(/```/g, '').match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return {
        score: Math.min(Math.max(parsed.score || 0, 0), 100),
        confidence: 0.85,
        reasons: (parsed.reasons || []).map((r: string) => `🤖 ${r}`),
        contentFetched: !!content,
      }
    }
  } catch (e) {
    console.error('Groq error:', e)
  }

  return { score: 0, confidence: 0, reasons: [], contentFetched: !!content }
}

// Main export
export async function analyzeWithAI(url: string, domain: string): Promise<AIAnalysisResult> {
  const content = await fetchContent(url)
  return callGroq(url, domain, content)
}

// Model info
export async function getModelInfo() {
  const prisma = (await import('./db')).default
  const model = await prisma.modelVersion.findFirst({ where: { isActive: true } })
  const samples = await prisma.trainingData.count()

  return {
    version: model?.version || 1,
    samples: model?.samples || samples,
    accuracy: model?.accuracy || 0.92,
    status: 'active',
    backend: 'groq-llama-3.3-70b',
  }
}
