/**
 * Telegram Bot Webhook API
 * Handles incoming messages from Telegram
 */

import { NextRequest, NextResponse } from 'next/server'
import { analyzeUrl } from '@/app/lib/analyze'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const GROQ_API_KEY = process.env.GROQ_API_KEY

// Telegram API helper
async function sendMessage(chatId: number, text: string, parseMode = 'HTML') {
  if (!TELEGRAM_BOT_TOKEN) return
  
  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: parseMode,
      disable_web_page_preview: true,
    }),
  })
}

async function sendTyping(chatId: number) {
  if (!TELEGRAM_BOT_TOKEN) return
  
  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendChatAction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      action: 'typing',
    }),
  })
}

// Extract URLs from text
function extractUrls(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/gi
  return text.match(urlRegex) || []
}

// Chat with AI about scams
async function chatWithAI(message: string): Promise<string> {
  if (!GROQ_API_KEY) return 'Xin lỗi, AI đang bảo trì.'
  
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `Bạn là trợ lý AI chuyên về chống lừa đảo online tại Việt Nam. 
Nhiệm vụ:
- Giúp người dùng nhận biết các chiêu trò lừa đảo
- Phân tích tin nhắn, email đáng ngờ
- Tư vấn cách bảo vệ bản thân
- Trả lời ngắn gọn, dễ hiểu, bằng tiếng Việt
- Nếu phát hiện dấu hiệu lừa đảo, cảnh báo rõ ràng với emoji ⚠️🚨
- Luôn khuyên người dùng cẩn thận, không chuyển tiền cho người lạ`
          },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })
    
    const data = await response.json()
    return data.choices?.[0]?.message?.content || 'Xin lỗi, tôi không hiểu câu hỏi.'
  } catch (error) {
    console.error('AI Error:', error)
    return 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.'
  }
}

// Format scan result for Telegram
function formatScanResult(result: any): string {
  const emoji = result.label === 'SAFE' ? '✅' : result.label === 'CAUTION' ? '⚠️' : '🚨'
  const status = result.label === 'SAFE' ? 'AN TOÀN' : result.label === 'CAUTION' ? 'ĐÁNG NGỜ' : 'NGUY HIỂM'
  
  let message = `${emoji} <b>KẾT QUẢ PHÂN TÍCH</b>\n\n`
  message += `🔗 <b>Domain:</b> ${result.domain}\n`
  message += `📊 <b>Điểm rủi ro:</b> ${result.score}/100\n`
  message += `🏷️ <b>Đánh giá:</b> ${status}\n\n`
  
  if (result.reasons && result.reasons.length > 0) {
    message += `📋 <b>Chi tiết:</b>\n`
    result.reasons.slice(0, 5).forEach((reason: string) => {
      message += `• ${reason}\n`
    })
  }
  
  message += `\n🌐 Xem chi tiết: https://maitamsite.site`
  
  return message
}

// Handle /start command
function getWelcomeMessage(): string {
  return `🛡️ <b>Chào mừng đến với Anti-Scam Bot!</b>

Tôi là trợ lý AI giúp bạn phát hiện lừa đảo online.

<b>📌 Cách sử dụng:</b>
• Gửi <b>link website</b> → Tôi sẽ phân tích ngay
• Gửi <b>tin nhắn đáng ngờ</b> → Tôi sẽ kiểm tra
• Hỏi bất kỳ điều gì về lừa đảo

<b>🔧 Lệnh:</b>
/start - Bắt đầu
/help - Hướng dẫn
/check [url] - Kiểm tra link

<b>⚠️ Lưu ý:</b> Kết quả chỉ mang tính tham khảo. Luôn cẩn thận với các giao dịch online!

🌐 Website: https://maitamsite.site`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const message = body.message
    
    if (!message) {
      return NextResponse.json({ ok: true })
    }
    
    const chatId = message.chat.id
    const text = message.text || ''
    const userName = message.from?.first_name || 'bạn'
    
    console.log(`[Telegram] Message from ${userName}: ${text}`)
    
    // Show typing indicator
    await sendTyping(chatId)
    
    // Handle commands
    if (text.startsWith('/start')) {
      await sendMessage(chatId, getWelcomeMessage())
      return NextResponse.json({ ok: true })
    }
    
    if (text.startsWith('/help')) {
      await sendMessage(chatId, getWelcomeMessage())
      return NextResponse.json({ ok: true })
    }
    
    if (text.startsWith('/check ')) {
      const url = text.replace('/check ', '').trim()
      if (url) {
        try {
          const result = await analyzeUrl(url)
          await sendMessage(chatId, formatScanResult(result))
        } catch (error) {
          await sendMessage(chatId, '❌ Không thể phân tích URL này. Vui lòng kiểm tra lại.')
        }
      } else {
        await sendMessage(chatId, '❌ Vui lòng nhập URL sau lệnh /check\nVí dụ: /check https://example.com')
      }
      return NextResponse.json({ ok: true })
    }
    
    // Check if message contains URL
    const urls = extractUrls(text)
    if (urls.length > 0) {
      for (const url of urls.slice(0, 3)) { // Max 3 URLs
        try {
          const result = await analyzeUrl(url)
          await sendMessage(chatId, formatScanResult(result))
        } catch (error) {
          await sendMessage(chatId, `❌ Không thể phân tích: ${url}`)
        }
      }
      return NextResponse.json({ ok: true })
    }
    
    // Chat with AI for other messages
    const aiResponse = await chatWithAI(text)
    await sendMessage(chatId, aiResponse, 'Markdown')
    
    return NextResponse.json({ ok: true })
    
  } catch (error) {
    console.error('[Telegram] Webhook error:', error)
    return NextResponse.json({ ok: true }) // Always return 200 to Telegram
  }
}

// Verify webhook (GET request)
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    bot: 'Anti-Scam Telegram Bot',
    webhook: 'active'
  })
}
