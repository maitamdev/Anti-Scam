/**
 * Image Analysis for Scam Detection
 * Uses HuggingFace Qwen2.5-VL + Database patterns
 */

import { prisma } from './db'

export interface ImageAnalysisResult {
  score: number
  confidence: number
  reasons: string[]
  extractedText: string
  category: 'safe' | 'phishing' | 'scam' | 'gambling' | 'suspicious' | 'unknown'
}

// Cache for scam patterns from database
let cachedPatterns: Array<{
  pattern: RegExp
  description: string
  severity: number
  category: string
}> | null = null
let cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// Load scam patterns from database
async function loadScamPatterns() {
  const now = Date.now()
  if (cachedPatterns && now - cacheTime < CACHE_TTL) {
    return cachedPatterns
  }

  try {
    const dbPatterns = await prisma.scamPattern.findMany({
      where: { isActive: true },
      orderBy: { severity: 'desc' },
    })

    cachedPatterns = dbPatterns.map((p: { pattern: string; description: string; severity: number; category: string }) => ({
      pattern: new RegExp(p.pattern, 'i'),
      description: p.description,
      severity: p.severity,
      category: p.category,
    }))
    cacheTime = now
    console.log(`[DB] Loaded ${cachedPatterns?.length || 0} scam patterns`)
    return cachedPatterns ?? []
  } catch (error) {
    console.error('[DB] Failed to load patterns:', error)
    return []
  }
}

// Fallback patterns if database is unavailable
const FALLBACK_PATTERNS: Array<{
  pattern: RegExp
  description: string
  severity: number
  category: string
}> = [
  { pattern: /nhờ chuyển|chuyển giúp|chuyển hộ/i, description: 'Nhờ chuyển tiền hộ', severity: 90, category: 'MONEY_TRANSFER' },
  { pattern: /bank.*lỗi|ngân hàng.*lỗi/i, description: 'Lý do bank lỗi', severity: 95, category: 'MONEY_TRANSFER' },
  { pattern: /có banking không|dùng banking/i, description: 'Hỏi có banking không', severity: 85, category: 'MONEY_TRANSFER' },
  { pattern: /cần gấp|gấp lắm|khẩn cấp/i, description: 'Tạo áp lực gấp gáp', severity: 70, category: 'MONEY_TRANSFER' },
  { pattern: /tài khoản.*khóa|tk.*bị khóa/i, description: 'Thông báo TK bị khóa', severity: 95, category: 'FAKE_BANK' },
  { pattern: /xác minh.*tài khoản|verify.*account/i, description: 'Yêu cầu xác minh TK', severity: 90, category: 'FAKE_BANK' },
  { pattern: /trúng thưởng|chúc mừng.*trúng/i, description: 'Thông báo trúng thưởng', severity: 85, category: 'PRIZE' },
  { pattern: /nộp phí.*nhận|đóng phí.*nhận/i, description: 'Yêu cầu nộp phí nhận quà', severity: 95, category: 'PRIZE' },
  { pattern: /việc nhẹ.*lương cao|lương cao.*việc nhẹ/i, description: 'Việc nhẹ lương cao', severity: 85, category: 'JOB' },
  { pattern: /tuyển ctv|tuyển cộng tác viên/i, description: 'Tuyển CTV online', severity: 80, category: 'JOB' },
  { pattern: /đặt cọc|nạp tiền.*trước/i, description: 'Yêu cầu đặt cọc', severity: 95, category: 'JOB' },
  { pattern: /lãi suất.*cao|lợi nhuận.*cao/i, description: 'Hứa lãi suất cao', severity: 90, category: 'INVESTMENT' },
  { pattern: /cam kết.*lãi|đảm bảo.*lợi nhuận/i, description: 'Cam kết lãi cố định', severity: 95, category: 'INVESTMENT' },
  { pattern: /casino|slot|poker|baccarat/i, description: 'Casino online', severity: 90, category: 'GAMBLING' },
  { pattern: /lô đề|xổ số|soi cầu/i, description: 'Lô đề online', severity: 90, category: 'GAMBLING' },
  { pattern: /mã otp|mã xác nhận/i, description: 'Yêu cầu mã OTP', severity: 100, category: 'PHISHING' },
  { pattern: /mật khẩu|password/i, description: 'Yêu cầu mật khẩu', severity: 100, category: 'PHISHING' },
  { pattern: /cmnd|cccd|căn cước/i, description: 'Yêu cầu CMND/CCCD', severity: 80, category: 'PHISHING' },
  { pattern: /vay.*nhanh|vay.*online/i, description: 'Vay tiền nhanh', severity: 75, category: 'LOAN' },
  { pattern: /phí.*giải ngân|phí.*duyệt/i, description: 'Phí giải ngân', severity: 95, category: 'LOAN' },
]


const SCAM_DETECTION_PROMPT = `Phân tích ảnh này để phát hiện lừa đảo.

QUAN TRỌNG:
- CHỈ mô tả nội dung THỰC SỰ có trong ảnh
- KHÔNG bịa đặt thông tin không tồn tại
- Đọc kỹ văn bản trước khi kết luận

DẤU HIỆU LỪA ĐẢO:
1. Giả CSKH game/ngân hàng, yêu cầu liên hệ Zalo/Telegram → 70-85 điểm
2. Nhờ chuyển tiền, lý do "bank lỗi" → 85-95 điểm  
3. Trúng thưởng, nộp phí nhận quà → 80-90 điểm
4. Việc nhẹ lương cao, đặt cọc → 80-90 điểm
5. Hỏi OTP, mật khẩu → 95-100 điểm
6. Đầu tư lãi cao, cờ bạc → 85-95 điểm

CHẤM ĐIỂM: 0-30 an toàn, 31-60 đáng ngờ, 61-100 lừa đảo

TRẢ LỜI ĐÚNG FORMAT JSON (không có markdown):
{"label":"SCAM","score":75,"reason":"Mô tả ngắn gọn nội dung ảnh và dấu hiệu phát hiện"}

Chỉ trả về 1 object JSON duy nhất, score phải là số nguyên.`

// Category icons
const CATEGORY_ICONS: Record<string, string> = {
  MONEY_TRANSFER: '💸',
  FAKE_BANK: '🏦',
  PRIZE: '🎁',
  JOB: '💼',
  INVESTMENT: '📈',
  GAMBLING: '🎰',
  PHISHING: '🔐',
  ROMANCE: '💔',
  IMPERSONATION: '👤',
  LOAN: '💳',
}

// Call Qwen2.5-VL via HuggingFace
async function analyzeWithQwen(imageBase64: string): Promise<{
  label: string
  score: number
  reason: string
} | null> {
  const apiKey = process.env.HUGGINGFACE_API_KEY
  if (!apiKey || apiKey.includes('xxx')) {
    console.error('[HF] API key not configured')
    return null
  }

  try {
    console.log('[HF] Calling Qwen2.5-VL...')

    const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen2.5-VL-7B-Instruct',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: SCAM_DETECTION_PROMPT },
              { type: 'image_url', image_url: { url: imageBase64 } },
            ],
          },
        ],
        max_tokens: 600,
        temperature: 0.1,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[HF] Qwen error:', response.status, errorText)
      return null
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || ''
    console.log('[HF] Qwen response:', content)

    // Parse JSON
    const jsonMatch = content.match(/\{[\s\S]*?\}/)
    if (jsonMatch) {
      try {
        // Clean up the JSON string
        let jsonStr = jsonMatch[0]
          .replace(/```json\s*/g, '')
          .replace(/```\s*/g, '')
          .trim()
        
        const parsed = JSON.parse(jsonStr)
        
        // Handle score that might be string like "85-95"
        let score = 50
        if (typeof parsed.score === 'number') {
          score = parsed.score
        } else if (typeof parsed.score === 'string') {
          // Extract first number from string like "85-95"
          const numMatch = parsed.score.match(/\d+/)
          if (numMatch) score = parseInt(numMatch[0], 10)
        }
        
        // Clean reason - remove any JSON artifacts
        let reason = parsed.reason || ''
        reason = reason.replace(/```json[\s\S]*```/g, '').trim()
        
        return {
          label: parsed.label || 'UNKNOWN',
          score: Math.min(100, Math.max(0, score)),
          reason,
        }
      } catch (e) {
        console.error('[HF] JSON parse failed:', e)
      }
    }

    // Fallback - extract meaningful text
    const isScam = /SCAM/i.test(content)
    // Clean content from JSON artifacts
    let cleanContent = content
      .replace(/```json[\s\S]*?```/g, '')
      .replace(/\{[\s\S]*?\}/g, '')
      .replace(/```/g, '')
      .trim()
    
    if (!cleanContent) {
      cleanContent = isScam 
        ? 'Phát hiện dấu hiệu đáng ngờ trong hình ảnh'
        : 'Không phát hiện dấu hiệu lừa đảo rõ ràng'
    }
    
    return {
      label: isScam ? 'SCAM' : 'SAFE',
      score: isScam ? 75 : 20,
      reason: cleanContent.slice(0, 500),
    }
  } catch (error) {
    console.error('[HF] Error:', error)
    return null
  }
}

// Analyze text with database patterns
async function analyzeTextWithPatterns(text: string): Promise<{
  score: number
  reasons: string[]
  categories: string[]
}> {
  if (!text || text.length < 3) return { score: 0, reasons: [], categories: [] }

  // Load patterns from DB or use fallback
  const dbPatterns = await loadScamPatterns()
  const patterns = dbPatterns.length > 0 ? dbPatterns : FALLBACK_PATTERNS

  let score = 0
  const reasons: string[] = []
  const categories: string[] = []
  const textLower = text.toLowerCase()
  const matched = new Set<string>()

  for (const { pattern, description, severity, category } of patterns) {
    if (pattern.test(textLower) && !matched.has(description)) {
      const icon = CATEGORY_ICONS[category] || '⚠️'
      score += severity * 0.5 // Weight by severity
      reasons.push(`${icon} ${description}`)
      categories.push(category)
      matched.add(description)
      if (reasons.length >= 6) break
    }
  }

  // Bonus for multiple matches
  if (reasons.length >= 2) score += 15
  if (reasons.length >= 4) score += 20

  return {
    score: Math.min(Math.round(score), 100),
    reasons,
    categories,
  }
}


// Get category from analysis
function getCategory(
  score: number,
  categories: string[]
): ImageAnalysisResult['category'] {
  if (categories.includes('GAMBLING')) return 'gambling'
  if (categories.includes('PHISHING')) return 'phishing'
  if (score >= 60) return 'scam'
  if (score >= 30) return 'suspicious'
  if (score <= 15) return 'safe'
  return 'unknown'
}

// Save scan to database
async function saveImageScan(
  imageHash: string,
  result: ImageAnalysisResult,
  ipAddress?: string
) {
  try {
    await prisma.imageScan.create({
      data: {
        imageHash,
        score: result.score,
        label: result.category.toUpperCase(),
        category: result.category,
        reasons: result.reasons,
        extractedText: result.extractedText,
        confidence: result.confidence,
        ipAddress,
      },
    })
  } catch (error) {
    console.error('[DB] Failed to save scan:', error)
  }
}

// Simple hash for image
function hashImage(base64: string): string {
  let hash = 0
  const str = base64.slice(0, 10000) // Use first 10k chars
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16)
}

// Main analysis function
export async function analyzeImage(
  imageBase64: string,
  manualText?: string,
  ipAddress?: string
): Promise<ImageAnalysisResult> {
  console.log('[Image] Starting analysis...')
  const startTime = Date.now()
  const imageHash = hashImage(imageBase64)

  let totalScore = 0
  const allReasons: string[] = []
  const allCategories: string[] = []
  let extractedText = manualText || ''

  // 1. Try Qwen2.5-VL first
  const qwenResult = await analyzeWithQwen(imageBase64)

  if (qwenResult) {
    console.log('[Image] Qwen result:', qwenResult)
    totalScore = qwenResult.score
    if (qwenResult.reason) {
      allReasons.push(qwenResult.reason)
    }
    extractedText = qwenResult.reason

    // Also check with patterns for additional signals
    if (qwenResult.reason) {
      const patternResult = await analyzeTextWithPatterns(qwenResult.reason)
      if (patternResult.score > totalScore) {
        totalScore = Math.max(totalScore, patternResult.score)
      }
      allCategories.push(...patternResult.categories)
    }
  }

  // 2. Analyze manual text if provided
  if (manualText) {
    const textResult = await analyzeTextWithPatterns(manualText)
    if (textResult.score > 0) {
      totalScore = Math.max(totalScore, textResult.score)
      allReasons.push(...textResult.reasons)
      allCategories.push(...textResult.categories)
    }
    extractedText = manualText
  }

  // 3. If no AI result, try pattern matching on any extracted text
  if (!qwenResult && extractedText) {
    const textResult = await analyzeTextWithPatterns(extractedText)
    totalScore = textResult.score
    allReasons.push(...textResult.reasons)
    allCategories.push(...textResult.categories)
  }

  // Final score
  const finalScore = Math.min(Math.round(totalScore), 100)
  const category = getCategory(finalScore, allCategories)

  // Default reason
  if (allReasons.length === 0) {
    allReasons.push(
      finalScore <= 20
        ? '✅ Không phát hiện dấu hiệu lừa đảo rõ ràng'
        : '⚠️ Cần kiểm tra thêm nội dung'
    )
  }

  const result: ImageAnalysisResult = {
    score: finalScore,
    confidence: qwenResult ? 0.85 : 0.6,
    reasons: Array.from(new Set(allReasons)).slice(0, 8),
    extractedText: extractedText.slice(0, 500),
    category,
  }

  // Save to database
  await saveImageScan(imageHash, result, ipAddress)

  const analysisTime = Date.now() - startTime
  console.log(`[Image] Done in ${analysisTime}ms: score=${finalScore}, category=${category}`)

  return result
}

// Validate image input
export function validateImageInput(base64: string): { valid: boolean; error?: string } {
  if (!base64) return { valid: false, error: 'Không có hình ảnh' }
  if (!/^data:image\/(png|jpeg|jpg|gif|webp);base64,/.test(base64)) {
    return { valid: false, error: 'Định dạng không hợp lệ' }
  }
  if ((base64.length * 3) / 4 > 10 * 1024 * 1024) {
    return { valid: false, error: 'Ảnh quá lớn (max 10MB)' }
  }
  return { valid: true }
}

// Check if account is in scam database
export async function checkScamAccount(
  type: string,
  value: string
): Promise<{ isScam: boolean; reportCount: number; description?: string }> {
  try {
    const account = await prisma.scamAccount.findUnique({
      where: { type_value: { type, value } },
    })
    if (account) {
      return {
        isScam: true,
        reportCount: account.reportCount,
        description: account.description || undefined,
      }
    }
  } catch (error) {
    console.error('[DB] Check scam account error:', error)
  }
  return { isScam: false, reportCount: 0 }
}

// Report a scam account
export async function reportScamAccount(data: {
  type: string
  value: string
  bankName?: string
  ownerName?: string
  description?: string
  amount?: number
}) {
  try {
    await prisma.scamAccount.upsert({
      where: { type_value: { type: data.type, value: data.value } },
      update: {
        reportCount: { increment: 1 },
        totalAmount: data.amount ? { increment: data.amount } : undefined,
      },
      create: {
        type: data.type,
        value: data.value,
        bankName: data.bankName,
        ownerName: data.ownerName,
        description: data.description,
        totalAmount: data.amount,
      },
    })
    return { success: true }
  } catch (error) {
    console.error('[DB] Report scam account error:', error)
    return { success: false }
  }
}
