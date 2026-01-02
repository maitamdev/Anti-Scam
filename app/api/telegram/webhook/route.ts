/**
 * Telegram Bot Webhook API
 * Enhanced with inline keyboards, more commands, and useful features
 */

import { NextRequest, NextResponse } from 'next/server'
import { analyzeUrl } from '@/app/lib/analyze'
import { analyzeImage, checkScamAccount } from '@/app/lib/imageAnalysis'
import prisma from '@/app/lib/db'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const GROQ_API_KEY = process.env.GROQ_API_KEY

// ============================================
// TELEGRAM API HELPERS
// ============================================

async function sendMessage(chatId: number, text: string, options: any = {}) {
  if (!TELEGRAM_BOT_TOKEN) return

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: options.parseMode || 'HTML',
      disable_web_page_preview: true,
      reply_markup: options.replyMarkup,
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

async function answerCallbackQuery(callbackQueryId: string, text?: string) {
  if (!TELEGRAM_BOT_TOKEN) return

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text,
    }),
  })
}

// ============================================
// INLINE KEYBOARDS
// ============================================

function getMainMenuKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: '🔍 Kiểm tra Link', callback_data: 'action_check_url' },
        { text: '📱 Tra STK/SĐT', callback_data: 'action_lookup' },
      ],
      [
        { text: '❓ Quiz nhanh', callback_data: 'action_quiz' },
        { text: '💡 Mẹo chống lừa đảo', callback_data: 'action_tips' },
      ],
      [
        { text: '📢 Báo cáo lừa đảo', callback_data: 'action_report' },
        { text: '📊 Thống kê', callback_data: 'action_stats' },
      ],
    ],
  }
}

function getQuizAnswerKeyboard(correctIndex: number) {
  return {
    inline_keyboard: [
      [
        { text: 'A', callback_data: `quiz_answer_0_${correctIndex}` },
        { text: 'B', callback_data: `quiz_answer_1_${correctIndex}` },
        { text: 'C', callback_data: `quiz_answer_2_${correctIndex}` },
        { text: 'D', callback_data: `quiz_answer_3_${correctIndex}` },
      ],
    ],
  }
}

// ============================================
// QUIZ DATA
// ============================================

const QUIZ_QUESTIONS = [
  {
    question: 'Bạn nhận được tin nhắn "Chúc mừng bạn trúng thưởng 100 triệu, nộp 2 triệu phí để nhận thưởng". Bạn nên làm gì?',
    options: ['Nộp phí ngay để nhận thưởng', 'Hỏi thêm thông tin', 'Bỏ qua, đây là lừa đảo', 'Chia sẻ cho bạn bè'],
    correct: 2,
    explanation: '🚨 Đây là chiêu lừa đảo cổ điển! Không bao giờ nộp phí để nhận thưởng.'
  },
  {
    question: 'Ai đó nhờ bạn chuyển tiền vì "app banking bị lỗi". Bạn nên?',
    options: ['Giúp chuyển ngay', 'Gọi điện xác nhận danh tính', 'Từ chối, có thể là lừa đảo', 'Hỏi thêm chi tiết'],
    correct: 2,
    explanation: '⚠️ Đây là chiêu lừa đảo phổ biến! Luôn xác minh qua kênh khác trước khi chuyển tiền.'
  },
  {
    question: 'Website ngân hàng yêu cầu nhập mã OTP qua link trong SMS. Bạn nên?',
    options: ['Nhập OTP ngay', 'Kiểm tra URL có đúng không', 'Không bao giờ nhập OTP qua link', 'Gọi hotline ngân hàng'],
    correct: 2,
    explanation: '🔐 Ngân hàng KHÔNG BAO GIỜ yêu cầu OTP qua link. Đây là website giả mạo!'
  },
  {
    question: 'Bạn thấy quảng cáo "Đầu tư 10 triệu, nhận lãi 50% mỗi tháng". Đây là gì?',
    options: ['Cơ hội đầu tư tốt', 'Lừa đảo đa cấp/Ponzi', 'Cần tìm hiểu thêm', 'Nên tham gia sớm'],
    correct: 1,
    explanation: '💰 Lãi suất 50%/tháng là phi thực tế! Đây là dấu hiệu lừa đảo Ponzi.'
  },
  {
    question: 'Người lạ nhắn tin làm quen, sau vài ngày nhờ "vay tiền gấp". Bạn nên?',
    options: ['Giúp đỡ người khó khăn', 'Từ chối và block ngay', 'Cho vay một ít', 'Hỏi lý do'],
    correct: 1,
    explanation: '💔 Đây là kịch bản "Romance Scam". Block và báo cáo ngay!'
  },
  {
    question: 'Email thông báo tài khoản Facebook bị khóa, cần click link để mở. Bạn nên?',
    options: ['Click link ngay', 'Kiểm tra địa chỉ email gửi', 'Vào trực tiếp Facebook.com kiểm tra', 'Trả lời email'],
    correct: 2,
    explanation: '📧 Luôn vào trực tiếp website chính thức, không click link trong email!'
  },
  {
    question: 'Công việc online "việc nhẹ lương cao", chỉ cần like video, nạp tiền để nhận nhiệm vụ. Đây là?',
    options: ['Việc làm part-time tốt', 'Lừa đảo task scam', 'Nên thử xem sao', 'Cơ hội kiếm thêm'],
    correct: 1,
    explanation: '💼 Task scam là hình thức lừa đảo phổ biến nhất 2024-2025. Không nạp tiền!'
  },
  {
    question: 'Mã QR dán đè ở quán cafe có thể dẫn đến nguy cơ gì?',
    options: ['Không có nguy cơ', 'Chuyển tiền nhầm cho kẻ lừa đảo', 'Chỉ là lỗi kỹ thuật', 'Được giảm giá'],
    correct: 1,
    explanation: '📱 QR dán đè có thể chuyển tiền đến tài khoản lừa đảo. Luôn xác nhận STK trước khi chuyển!'
  },
]

// ============================================
// ANTI-SCAM TIPS
// ============================================

const ANTI_SCAM_TIPS = [
  '💡 <b>Mẹo #1:</b> KHÔNG BAO GIỜ chia sẻ mã OTP với bất kỳ ai, kể cả "nhân viên ngân hàng".',
  '💡 <b>Mẹo #2:</b> Kiểm tra URL trước khi nhập thông tin. Website ngân hàng luôn có https:// và tên miền chính xác.',
  '💡 <b>Mẹo #3:</b> Nếu "người quen" nhắn tin mượn tiền, hãy GỌI ĐIỆN xác nhận trước khi chuyển.',
  '💡 <b>Mẹo #4:</b> Đầu tư hứa lãi >3%/tháng đều là dấu hiệu lừa đảo. Không có "free lunch"!',
  '💡 <b>Mẹo #5:</b> Việc làm yêu cầu nạp tiền/đặt cọc trước = 100% lừa đảo.',
  '💡 <b>Mẹo #6:</b> Tin nhắn từ số lạ thông báo "trúng thưởng", "có bưu kiện" → bỏ qua!',
  '💡 <b>Mẹo #7:</b> Công an, tòa án KHÔNG BAO GIỜ gọi điện yêu cầu chuyển tiền.',
  '💡 <b>Mẹo #8:</b> Quét mã QR lạ có thể bị chiếm tài khoản. Chỉ quét từ nguồn tin cậy.',
  '💡 <b>Mẹo #9:</b> Kẻ lừa đảo thường tạo áp lực thời gian ("nhanh lên", "chỉ hôm nay"). Bình tĩnh suy nghĩ!',
  '💡 <b>Mẹo #10:</b> Trước khi chuyển tiền lớn, hãy đợi 24h để suy nghĩ kỹ.',
  '💡 <b>Mẹo #11:</b> Cài đặt xác thực 2 bước cho tất cả tài khoản quan trọng.',
  '💡 <b>Mẹo #12:</b> Không click link trong SMS/Zalo từ số lạ, kể cả có logo ngân hàng.',
]

// ============================================
// PHOTO HANDLING
// ============================================

async function downloadPhoto(fileId: string): Promise<string | null> {
  if (!TELEGRAM_BOT_TOKEN) return null

  try {
    const fileResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`
    )
    const fileData = await fileResponse.json()

    if (!fileData.ok || !fileData.result?.file_path) {
      return null
    }

    const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${fileData.result.file_path}`
    const imageResponse = await fetch(fileUrl)
    const imageBuffer = await imageResponse.arrayBuffer()

    const base64 = Buffer.from(imageBuffer).toString('base64')
    const mimeType = fileData.result.file_path.endsWith('.png') ? 'image/png' : 'image/jpeg'

    return `data:${mimeType};base64,${base64}`
  } catch (error) {
    console.error('[Telegram] Download photo error:', error)
    return null
  }
}

// ============================================
// FORMAT HELPERS
// ============================================

function formatImageResult(result: any): string {
  const emoji = result.score <= 30 ? '✅' : result.score <= 60 ? '⚠️' : '🚨'
  const status = result.score <= 30 ? 'AN TOÀN' : result.score <= 60 ? 'ĐÁNG NGỜ' : 'NGUY HIỂM'

  let message = `${emoji} <b>KẾT QUẢ PHÂN TÍCH HÌNH ẢNH</b>\n\n`
  message += `📊 <b>Điểm rủi ro:</b> ${result.score}/100\n`
  message += `🏷️ <b>Đánh giá:</b> ${status}\n`
  message += `📁 <b>Phân loại:</b> ${result.category}\n\n`

  if (result.reasons && result.reasons.length > 0) {
    message += `📋 <b>Chi tiết:</b>\n`
    result.reasons.slice(0, 5).forEach((reason: string) => {
      message += `• ${reason}\n`
    })
  }

  message += `\n🌐 Website: https://maitamsite.site`

  return message
}

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

  message += `\n🌐 Website: https://maitamsite.site`

  return message
}

function extractUrls(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/gi
  return text.match(urlRegex) || []
}

function extractPhoneNumbers(text: string): string[] {
  const phoneRegex = /(?:0|\+84)[0-9]{9,10}/g
  return text.match(phoneRegex) || []
}

function extractBankAccounts(text: string): string[] {
  // Vietnamese bank accounts usually 10-14 digits
  const accountRegex = /\b[0-9]{10,14}\b/g
  return text.match(accountRegex) || []
}

// ============================================
// AI CHAT - Conversational Anti-Scam Assistant
// ============================================

async function chatWithAI(message: string, userName?: string): Promise<string> {
  if (!GROQ_API_KEY) return 'Xin lỗi, AI đang bảo trì. Vui lòng thử lại sau! 😊'

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
            content: `Bạn là "Anti-Scam AI" - trợ lý AI thân thiện chuyên giúp người Việt Nam nhận biết và phòng tránh lừa đảo online.

TÍNH CÁCH:
- Thân thiện, gần gũi như một người bạn đáng tin cậy
- Nói chuyện tự nhiên bằng tiếng Việt, dùng emoji phù hợp 😊🛡️
- Kiên nhẫn giải thích, không phán xét người dùng
- Luôn động viên và khuyến khích cẩn thận
- Xưng "mình" và gọi người dùng là "bạn"

KIẾN THỨC CHUYÊN MÔN:
- Các loại lừa đảo phổ biến: việc nhẹ lương cao (task scam), đầu tư lãi cao (Ponzi), romance scam, giả danh công an, giả CSKH ngân hàng, trúng thưởng giả, vay tiền online, QR code giả
- Dấu hiệu nhận biết: yêu cầu chuyển tiền gấp, hứa lãi cao, hỏi OTP/mật khẩu, link lạ, số điện thoại lạ, tạo áp lực thời gian
- Cách xử lý: không chuyển tiền, không click link lạ, gọi điện xác nhận, báo cáo, chặn số

CÁCH TRẢ LỜI:
- Nếu người dùng hỏi về tình huống cụ thể → phân tích và đánh giá rủi ro cụ thể
- Nếu họ lo lắng/hoang mang → trấn an và hướng dẫn bước tiếp theo rõ ràng
- Nếu nghi ngờ lừa đảo → cảnh báo rõ ràng với emoji 🚨⚠️
- Nếu an toàn → xác nhận nhưng vẫn khuyên cẩn thận
- Nếu họ chỉ chat thông thường → trả lời thân thiện, có thể gợi ý các tính năng bot
- Trả lời ngắn gọn, dễ hiểu (tối đa 3-4 đoạn)
- Khi phù hợp, gợi ý: "Bạn có thể gửi link/ảnh để mình kiểm tra chi tiết hơn nhé!"

${userName ? `Người dùng tên là ${userName}.` : ''}`
          },
          { role: 'user', content: message }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    return data.choices?.[0]?.message?.content || 'Xin lỗi, mình không hiểu ý bạn. Bạn có thể nói rõ hơn không? 🤔'
  } catch (error) {
    console.error('AI Error:', error)
    return 'Xin lỗi, có lỗi xảy ra. Bạn thử hỏi lại nhé! 😊'
  }
}

// ============================================
// COMMAND HANDLERS
// ============================================

function getWelcomeMessage(): string {
  return `🛡️ <b>Chào mừng đến với Anti-Scam Bot!</b>

Tôi là trợ lý AI giúp bạn phát hiện lừa đảo online.

<b>📌 Cách sử dụng:</b>
• Gửi <b>link website</b> → Tôi sẽ phân tích ngay
• Gửi <b>hình ảnh</b> tin nhắn → AI sẽ kiểm tra
• Gửi <b>số tài khoản/SĐT</b> → Tra cứu database
• Hỏi bất kỳ điều gì về lừa đảo

<b>🔧 Lệnh:</b>
/start - Menu chính
/check [url] - Kiểm tra link
/bank [stk] - Tra số tài khoản
/phone [sdt] - Tra số điện thoại
/quiz - Quiz nhanh
/tips - Mẹo chống lừa đảo
/stats - Thống kê

⚠️ Kết quả chỉ mang tính tham khảo!`
}

async function handleQuizCommand(chatId: number) {
  const quiz = QUIZ_QUESTIONS[Math.floor(Math.random() * QUIZ_QUESTIONS.length)]

  let message = `❓ <b>QUIZ CHỐNG LỪA ĐẢO</b>\n\n`
  message += `${quiz.question}\n\n`
  quiz.options.forEach((opt, idx) => {
    message += `<b>${String.fromCharCode(65 + idx)}.</b> ${opt}\n`
  })

  await sendMessage(chatId, message, {
    replyMarkup: getQuizAnswerKeyboard(quiz.correct),
  })
}

async function handleTipsCommand(chatId: number) {
  const tip = ANTI_SCAM_TIPS[Math.floor(Math.random() * ANTI_SCAM_TIPS.length)]
  await sendMessage(chatId, tip)
}

async function handleStatsCommand(chatId: number) {
  try {
    const [totalScans, totalReports, todayStats] = await Promise.all([
      prisma.scan.count(),
      prisma.report.count(),
      prisma.dailyStats.findFirst({ orderBy: { date: 'desc' } }),
    ])

    const message = `📊 <b>THỐNG KÊ ANTI-SCAM</b>\n
🔍 Tổng số lần scan: <b>${totalScans.toLocaleString()}</b>
📢 Báo cáo lừa đảo: <b>${totalReports.toLocaleString()}</b>
📅 Hôm nay: <b>${todayStats?.totalScans || 0}</b> lượt scan

🛡️ Cùng nhau chống lừa đảo!`

    await sendMessage(chatId, message)
  } catch (error) {
    await sendMessage(chatId, '📊 Thống kê đang cập nhật...')
  }
}

async function handleBankLookup(chatId: number, account: string) {
  try {
    const result = await checkScamAccount('BANK_ACCOUNT', account)

    if (result.isScam) {
      await sendMessage(chatId, `🚨 <b>CẢNH BÁO!</b>

Số tài khoản <code>${account}</code> đã bị báo cáo lừa đảo!

📢 Số lần báo cáo: <b>${result.reportCount}</b>
${result.description ? `📝 Mô tả: ${result.description}` : ''}

⚠️ <b>KHÔNG CHUYỂN TIỀN</b> cho tài khoản này!`)
    } else {
      await sendMessage(chatId, `✅ Số tài khoản <code>${account}</code> chưa có trong database lừa đảo.

⚠️ <b>Lưu ý:</b> Điều này không đảm bảo tài khoản an toàn. Hãy luôn cẩn thận!`)
    }
  } catch (error) {
    await sendMessage(chatId, ' Không thể tra cứu. Vui lòng thử lại.')
  }
}

async function handlePhoneLookup(chatId: number, phone: string) {
  try {
    const result = await checkScamAccount('PHONE', phone)

    if (result.isScam) {
      await sendMessage(chatId, `🚨 <b>CẢNH BÁO!</b>

Số điện thoại <code>${phone}</code> đã bị báo cáo lừa đảo!

📢 Số lần báo cáo: <b>${result.reportCount}</b>
${result.description ? `📝 Mô tả: ${result.description}` : ''}

⚠️ <b>CẢNH GIÁC</b> với số này!`)
    } else {
      await sendMessage(chatId, `✅ Số điện thoại <code>${phone}</code> chưa có trong database lừa đảo.

⚠️ <b>Lưu ý:</b> Điều này không đảm bảo số an toàn. Hãy luôn cẩn thận!`)
    }
  } catch (error) {
    await sendMessage(chatId, ' Không thể tra cứu. Vui lòng thử lại.')
  }
}

// ============================================
// CALLBACK QUERY HANDLER
// ============================================

async function handleCallbackQuery(callbackQuery: any) {
  const chatId = callbackQuery.message.chat.id
  const data = callbackQuery.data

  await answerCallbackQuery(callbackQuery.id)

  if (data === 'action_check_url') {
    await sendMessage(chatId, '🔍 Gửi link website bạn muốn kiểm tra:')
  } else if (data === 'action_lookup') {
    await sendMessage(chatId, '📱 Gửi số tài khoản hoặc số điện thoại cần tra cứu:')
  } else if (data === 'action_quiz') {
    await handleQuizCommand(chatId)
  } else if (data === 'action_tips') {
    await handleTipsCommand(chatId)
  } else if (data === 'action_report') {
    await sendMessage(chatId, `📢 <b>BÁO CÁO LỪA ĐẢO</b>

Để báo cáo, vui lòng truy cập:
🌐 https://maitamsite.site/report

Hoặc gửi thông tin cho chúng tôi:
• URL website lừa đảo
• Số tài khoản/SĐT lừa đảo
• Ảnh chụp tin nhắn lừa đảo

Cảm ơn bạn đã góp phần bảo vệ cộng đồng! 💪`)
  } else if (data === 'action_stats') {
    await handleStatsCommand(chatId)
  } else if (data.startsWith('quiz_answer_')) {
    const parts = data.split('_')
    const selectedAnswer = parseInt(parts[2])
    const correctAnswer = parseInt(parts[3])

    if (selectedAnswer === correctAnswer) {
      await sendMessage(chatId, `✅ <b>CHÍNH XÁC!</b> 🎉

Bạn đã trả lời đúng. Tiếp tục học hỏi để bảo vệ bản thân!

/quiz - Câu hỏi tiếp theo`)
    } else {
      const quiz = QUIZ_QUESTIONS.find(q => q.correct === correctAnswer) || QUIZ_QUESTIONS[0]
      await sendMessage(chatId, ` <b>Chưa đúng!</b>

Đáp án đúng là: <b>${String.fromCharCode(65 + correctAnswer)}</b>

${quiz.explanation}

/quiz - Thử câu khác`)
    }
  }
}

// ============================================
// MAIN WEBHOOK HANDLER
// ============================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Handle callback queries (button clicks)
    if (body.callback_query) {
      await handleCallbackQuery(body.callback_query)
      return NextResponse.json({ ok: true })
    }

    const message = body.message
    if (!message) {
      return NextResponse.json({ ok: true })
    }

    const chatId = message.chat.id
    const text = message.text || ''
    const photo = message.photo
    const caption = message.caption || ''
    const userName = message.from?.first_name || 'bạn'

    console.log(`[Telegram] Message from ${userName}: ${text || (photo ? '[PHOTO]' : '')}`)

    await sendTyping(chatId)

    // Handle photo messages
    if (photo && photo.length > 0) {
      await sendMessage(chatId, '🔍 Đang phân tích hình ảnh...')

      const largestPhoto = photo[photo.length - 1]
      const imageBase64 = await downloadPhoto(largestPhoto.file_id)

      if (imageBase64) {
        try {
          const result = await analyzeImage(imageBase64, caption)
          await sendMessage(chatId, formatImageResult(result))
        } catch (error) {
          await sendMessage(chatId, ' Không thể phân tích hình ảnh. Vui lòng thử lại.')
        }
      } else {
        await sendMessage(chatId, ' Không thể tải hình ảnh. Vui lòng thử lại.')
      }
      return NextResponse.json({ ok: true })
    }

    // Handle commands
    if (text.startsWith('/start') || text.startsWith('/menu')) {
      await sendMessage(chatId, getWelcomeMessage(), {
        replyMarkup: getMainMenuKeyboard(),
      })
      return NextResponse.json({ ok: true })
    }

    if (text.startsWith('/help')) {
      await sendMessage(chatId, getWelcomeMessage(), {
        replyMarkup: getMainMenuKeyboard(),
      })
      return NextResponse.json({ ok: true })
    }

    if (text.startsWith('/check ')) {
      const url = text.replace('/check ', '').trim()
      if (url) {
        try {
          const result = await analyzeUrl(url)
          await sendMessage(chatId, formatScanResult(result))
        } catch (error) {
          await sendMessage(chatId, ' Không thể phân tích URL này.')
        }
      } else {
        await sendMessage(chatId, 'Nhập URL sau lệnh /check\nVí dụ: /check https://example.com')
      }
      return NextResponse.json({ ok: true })
    }

    if (text.startsWith('/bank ')) {
      const account = text.replace('/bank ', '').trim().replace(/\D/g, '')
      if (account.length >= 8) {
        await handleBankLookup(chatId, account)
      } else {
        await sendMessage(chatId, ' Nhập số tài khoản sau lệnh /bank\nVí dụ: /bank 1234567890')
      }
      return NextResponse.json({ ok: true })
    }

    if (text.startsWith('/phone ')) {
      const phone = text.replace('/phone ', '').trim().replace(/\D/g, '')
      if (phone.length >= 9) {
        await handlePhoneLookup(chatId, phone)
      } else {
        await sendMessage(chatId, ' Nhập SĐT sau lệnh /phone\nVí dụ: /phone 0912345678')
      }
      return NextResponse.json({ ok: true })
    }

    if (text.startsWith('/quiz')) {
      await handleQuizCommand(chatId)
      return NextResponse.json({ ok: true })
    }

    if (text.startsWith('/tips')) {
      await handleTipsCommand(chatId)
      return NextResponse.json({ ok: true })
    }

    if (text.startsWith('/stats')) {
      await handleStatsCommand(chatId)
      return NextResponse.json({ ok: true })
    }

    if (text.startsWith('/report')) {
      await sendMessage(chatId, `📢 Để báo cáo lừa đảo, truy cập:\n🌐 https://maitamsite.site/report`)
      return NextResponse.json({ ok: true })
    }

    // Auto-detect URLs
    const urls = extractUrls(text)
    if (urls.length > 0) {
      for (const url of urls.slice(0, 3)) {
        try {
          const result = await analyzeUrl(url)
          await sendMessage(chatId, formatScanResult(result))
        } catch (error) {
          await sendMessage(chatId, `❌ Không thể phân tích: ${url}`)
        }
      }
      return NextResponse.json({ ok: true })
    }

    // Auto-detect phone numbers
    const phones = extractPhoneNumbers(text)
    if (phones.length > 0) {
      for (const phone of phones.slice(0, 2)) {
        await handlePhoneLookup(chatId, phone.replace(/\D/g, ''))
      }
      return NextResponse.json({ ok: true })
    }

    // Auto-detect bank accounts (only if message looks like an account query)
    if (text.includes('tài khoản') || text.includes('stk') || text.includes('chuyển tiền')) {
      const accounts = extractBankAccounts(text)
      if (accounts.length > 0) {
        for (const account of accounts.slice(0, 2)) {
          await handleBankLookup(chatId, account)
        }
        return NextResponse.json({ ok: true })
      }
    }

    // Chat with AI for other messages
    const aiResponse = await chatWithAI(text, userName)
    await sendMessage(chatId, aiResponse, { parseMode: 'Markdown' })

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error('[Telegram] Webhook error:', error)
    return NextResponse.json({ ok: true })
  }
}

// Verify webhook (GET request)
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    bot: 'Anti-Scam Telegram Bot v2.0',
    features: ['URL scan', 'Image analysis', 'Bank/Phone lookup', 'Quiz', 'AI chat'],
    webhook: 'active'
  })
}
