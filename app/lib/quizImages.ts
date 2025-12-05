/**
 * Quiz Images - Generate fake scam message screenshots as SVG/data URLs
 * Tạo hình ảnh tin nhắn lừa đảo giả để dùng trong quiz
 */

// Helper to create SVG data URL
const svgToDataUrl = (svg: string): string => {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// Random helpers
const random = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
const randomPhone = () => `0${random(['9', '8', '7', '3'])}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`
const randomAmount = () => [500000, 1000000, 2000000, 3000000, 5000000][Math.floor(Math.random() * 5)]
const formatMoney = (n: number) => n.toLocaleString('vi-VN') + 'đ'
const randomTime = () => `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
const randomBankAccount = () => Math.floor(Math.random() * 9000000000 + 1000000000).toString()

// Vietnamese names
const NAMES = ['Minh', 'Hương', 'Tuấn', 'Linh', 'Đức', 'Thảo', 'Nam', 'Mai', 'Hùng', 'Lan', 'Phong', 'Ngọc']
const BANKS = ['Vietcombank', 'Techcombank', 'MB Bank', 'VPBank', 'ACB', 'BIDV', 'VietinBank', 'TPBank']

// ============================================
// MESSAGE BUBBLE TEMPLATES
// ============================================

interface MessageBubble {
  text: string
  isScammer: boolean
  time?: string
}

// Zalo-style message screenshot
function createZaloMessage(messages: MessageBubble[], senderName: string, senderAvatar?: string): string {
  const height = 120 + messages.length * 60
  const bubbles = messages.map((msg, i) => {
    const y = 80 + i * 55
    if (msg.isScammer) {
      return `
        <rect x="20" y="${y}" width="${Math.min(msg.text.length * 8 + 20, 260)}" height="40" rx="12" fill="#e8e8e8"/>
        <text x="30" y="${y + 26}" font-size="13" fill="#333">${msg.text.slice(0, 35)}${msg.text.length > 35 ? '...' : ''}</text>
        <text x="20" y="${y + 52}" font-size="10" fill="#999">${msg.time || randomTime()}</text>
      `
    } else {
      return `
        <rect x="${320 - Math.min(msg.text.length * 8 + 20, 260)}" y="${y}" width="${Math.min(msg.text.length * 8 + 20, 260)}" height="40" rx="12" fill="#0068ff"/>
        <text x="${330 - Math.min(msg.text.length * 8 + 20, 260)}" y="${y + 26}" font-size="13" fill="white">${msg.text.slice(0, 35)}${msg.text.length > 35 ? '...' : ''}</text>
      `
    }
  }).join('')

  return svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="340" height="${height}" viewBox="0 0 340 ${height}">
      <rect width="340" height="${height}" fill="#f5f5f5"/>
      <!-- Header -->
      <rect width="340" height="60" fill="#0068ff"/>
      <circle cx="35" cy="30" r="18" fill="#fff"/>
      <text x="35" y="35" font-size="14" fill="#0068ff" text-anchor="middle" font-weight="bold">${senderName.charAt(0)}</text>
      <text x="60" y="28" font-size="14" fill="white" font-weight="bold">${senderName}</text>
      <text x="60" y="44" font-size="11" fill="#cce5ff">Đang hoạt động</text>
      <!-- Messages -->
      ${bubbles}
    </svg>
  `)
}

// SMS-style message
function createSMSMessage(sender: string, content: string, isBank: boolean = false): string {
  const lines = content.match(/.{1,40}/g) || [content]
  const height = 140 + lines.length * 18

  return svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="340" height="${height}" viewBox="0 0 340 ${height}">
      <rect width="340" height="${height}" fill="#000"/>
      <!-- Status bar -->
      <text x="20" y="20" font-size="12" fill="#fff">${randomTime()}</text>
      <text x="280" y="20" font-size="12" fill="#fff">📶 🔋</text>
      <!-- Header -->
      <rect y="30" width="340" height="50" fill="#1c1c1e"/>
      <text x="170" y="60" font-size="16" fill="#fff" text-anchor="middle" font-weight="bold">${sender}</text>
      <!-- Message bubble -->
      <rect x="20" y="95" width="300" height="${40 + lines.length * 18}" rx="16" fill="${isBank ? '#34c759' : '#e5e5ea'}"/>
      ${lines.map((line, i) => `
        <text x="35" y="${118 + i * 18}" font-size="14" fill="${isBank ? '#fff' : '#000'}">${line}</text>
      `).join('')}
      <text x="290" y="${130 + lines.length * 18}" font-size="10" fill="#8e8e93" text-anchor="end">${randomTime()}</text>
    </svg>
  `)
}

// Facebook Messenger style
function createMessengerMessage(messages: MessageBubble[], senderName: string): string {
  const height = 120 + messages.length * 55
  const bubbles = messages.map((msg, i) => {
    const y = 80 + i * 50
    if (msg.isScammer) {
      return `
        <rect x="50" y="${y}" width="${Math.min(msg.text.length * 7.5 + 24, 240)}" height="36" rx="18" fill="#e4e6eb"/>
        <text x="62" y="${y + 24}" font-size="13" fill="#050505">${msg.text.slice(0, 32)}${msg.text.length > 32 ? '...' : ''}</text>
      `
    } else {
      return `
        <rect x="${320 - Math.min(msg.text.length * 7.5 + 24, 240)}" y="${y}" width="${Math.min(msg.text.length * 7.5 + 24, 240)}" height="36" rx="18" fill="#0084ff"/>
        <text x="${332 - Math.min(msg.text.length * 7.5 + 24, 240)}" y="${y + 24}" font-size="13" fill="white">${msg.text.slice(0, 32)}${msg.text.length > 32 ? '...' : ''}</text>
      `
    }
  }).join('')

  return svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="340" height="${height}" viewBox="0 0 340 ${height}">
      <rect width="340" height="${height}" fill="#fff"/>
      <!-- Header -->
      <rect width="340" height="65" fill="#fff"/>
      <line x1="0" y1="65" x2="340" y2="65" stroke="#ddd"/>
      <circle cx="35" cy="35" r="20" fill="#0084ff"/>
      <text x="35" y="40" font-size="16" fill="white" text-anchor="middle" font-weight="bold">${senderName.charAt(0)}</text>
      <text x="65" y="30" font-size="15" fill="#050505" font-weight="bold">${senderName}</text>
      <text x="65" y="48" font-size="12" fill="#65676b">Messenger</text>
      <!-- Messages -->
      <circle cx="30" cy="100" r="15" fill="#e4e6eb"/>
      <text x="30" y="105" font-size="12" fill="#65676b" text-anchor="middle">${senderName.charAt(0)}</text>
      ${bubbles}
    </svg>
  `)
}

// Bank notification style
function createBankNotification(bankName: string, content: string, isReal: boolean = false): string {
  const lines = content.match(/.{1,38}/g) || [content]
  const height = 160 + lines.length * 16

  return svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="340" height="${height}" viewBox="0 0 340 ${height}">
      <rect width="340" height="${height}" fill="#f2f2f7"/>
      <!-- Notification card -->
      <rect x="15" y="40" width="310" height="${height - 60}" rx="14" fill="#fff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"/>
      <!-- Bank icon -->
      <rect x="30" y="55" width="40" height="40" rx="8" fill="${isReal ? '#1a73e8' : '#ff3b30'}"/>
      <text x="50" y="82" font-size="18" fill="white" text-anchor="middle" font-weight="bold">${bankName.charAt(0)}</text>
      <!-- Bank name -->
      <text x="80" y="72" font-size="14" fill="#000" font-weight="bold">${bankName}</text>
      <text x="80" y="88" font-size="11" fill="#8e8e93">Thông báo • ${randomTime()}</text>
      <!-- Content -->
      ${lines.map((line, i) => `
        <text x="30" y="${115 + i * 16}" font-size="13" fill="#333">${line}</text>
      `).join('')}
      ${!isReal ? `<text x="30" y="${125 + lines.length * 16}" font-size="12" fill="#007aff">Nhấn để xem chi tiết →</text>` : ''}
    </svg>
  `)
}

// Email preview style
function createEmailPreview(from: string, subject: string, preview: string, isScam: boolean = true): string {
  return svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="340" height="180" viewBox="0 0 340 180">
      <rect width="340" height="180" fill="#fff"/>
      <!-- Header -->
      <rect width="340" height="50" fill="#f6f8fc"/>
      <text x="20" y="32" font-size="16" fill="#202124" font-weight="bold">Hộp thư đến</text>
      <!-- Email item -->
      <rect x="10" y="60" width="320" height="110" rx="8" fill="${isScam ? '#fff4e5' : '#fff'}" stroke="#e0e0e0"/>
      <circle cx="35" cy="90" r="18" fill="${isScam ? '#ea4335' : '#34a853'}"/>
      <text x="35" y="95" font-size="14" fill="white" text-anchor="middle" font-weight="bold">${from.charAt(0).toUpperCase()}</text>
      <text x="60" y="82" font-size="13" fill="#202124" font-weight="bold">${from.slice(0, 30)}</text>
      <text x="60" y="100" font-size="12" fill="#202124">${subject.slice(0, 35)}${subject.length > 35 ? '...' : ''}</text>
      <text x="60" y="118" font-size="11" fill="#5f6368">${preview.slice(0, 40)}${preview.length > 40 ? '...' : ''}</text>
      <text x="280" y="82" font-size="10" fill="#5f6368">${randomTime()}</text>
      ${isScam ? '<text x="300" y="100" font-size="16">⚠️</text>' : ''}
    </svg>
  `)
}

// ============================================
// SCAM MESSAGE GENERATORS
// ============================================

export interface QuizImage {
  dataUrl: string
  type: 'zalo' | 'sms' | 'messenger' | 'bank' | 'email' | 'website'
  isScam: boolean
  description: string
  redFlags: string[]
}

// Generate money transfer scam message
export function generateMoneyTransferScam(): QuizImage {
  const name = random(NAMES)
  const amount = randomAmount()
  const bank = random(BANKS)
  
  const messages: MessageBubble[] = [
    { text: `Ê ${random(['bạn', 'cậu', 'ông', 'bà'])} ơi`, isScammer: true },
    { text: `Banking mình đang lỗi`, isScammer: true },
    { text: `Chuyển giúp mình ${formatMoney(amount)} được ko?`, isScammer: true },
    { text: `STK: ${randomBankAccount()} - ${bank}`, isScammer: true },
    { text: `Tí mình chuyển lại ngay`, isScammer: true },
  ]

  return {
    dataUrl: createZaloMessage(messages, name),
    type: 'zalo',
    isScam: true,
    description: 'Tin nhắn nhờ chuyển tiền với lý do banking lỗi',
    redFlags: [
      'Lý do "banking lỗi" - chiêu trò phổ biến',
      'Yêu cầu chuyển tiền gấp',
      'Hứa chuyển lại ngay - không đáng tin',
      'Có thể là tài khoản bị hack/giả mạo',
    ],
  }
}

// Generate fake bank SMS
export function generateFakeBankSMS(): QuizImage {
  const bank = random(BANKS)
  const scenarios = [
    {
      content: `[${bank}] Tai khoan cua quy khach se bi KHOA trong 24h do phat hien giao dich bat thuong. Truy cap ${bank.toLowerCase()}-xacminh.com de xac nhan.`,
      redFlags: ['URL giả mạo không phải domain chính thức', 'Tạo áp lực thời gian 24h', 'Không có tên khách hàng cụ thể'],
    },
    {
      content: `${bank}: Quy khach vua thuc hien GD -${formatMoney(randomAmount() * 10)}. Neu khong phai ban, truy cap ${bank.toLowerCase()}-baove.vn de huy GD.`,
      redFlags: ['URL giả mạo', 'Thông báo giao dịch không thực hiện', 'Yêu cầu truy cập link lạ'],
    },
    {
      content: `[CSKH ${bank}] He thong phat hien TK cua ban dang bi truy cap trai phep. Goi 1900xxxx de duoc ho tro khan cap.`,
      redFlags: ['Số hotline giả', 'Tạo hoảng loạn', 'Ngân hàng thật không nhắn tin kiểu này'],
    },
  ]
  
  const scenario = random(scenarios)
  
  return {
    dataUrl: createSMSMessage(bank, scenario.content, false),
    type: 'sms',
    isScam: true,
    description: `SMS giả mạo ngân hàng ${bank}`,
    redFlags: scenario.redFlags,
  }
}

// Generate prize scam
export function generatePrizeScam(): QuizImage {
  const brand = random(['Shopee', 'Lazada', 'Tiki', 'VinMart', 'Apple', 'Samsung'])
  const prize = random(['iPhone 15 Pro Max', 'xe SH 150i', 'Laptop MacBook', '50.000.000đ'])
  
  const content = `🎉 CHÚC MỪNG! Bạn là khách hàng may mắn được ${brand} trao tặng ${prize}! Truy cập ${brand.toLowerCase()}-khuyenmai.com để nhận thưởng. Hết hạn sau 24h!`
  
  return {
    dataUrl: createSMSMessage(brand, content, false),
    type: 'sms', 
    isScam: true,
    description: 'Tin nhắn trúng thưởng giả',
    redFlags: [
      'Trúng thưởng từ chương trình không tham gia',
      'URL giả mạo không phải website chính thức',
      'Tạo áp lực thời gian "hết hạn 24h"',
      'Quà có giá trị quá lớn - phi thực tế',
    ],
  }
}

// Generate job scam
export function generateJobScam(): QuizImage {
  const platform = random(['Shopee', 'Lazada', 'TikTok', 'Facebook'])
  
  const messages: MessageBubble[] = [
    { text: `Chào bạn! Tuyển CTV ${platform}`, isScammer: true },
    { text: `Lương 500k-2tr/ngày`, isScammer: true },
    { text: `Chỉ cần điện thoại, làm tại nhà`, isScammer: true },
    { text: `Không cần kinh nghiệm`, isScammer: true },
    { text: `Liên hệ Zalo: ${randomPhone()}`, isScammer: true },
  ]

  return {
    dataUrl: createMessengerMessage(messages, 'Tuyển Dụng Online'),
    type: 'messenger',
    isScam: true,
    description: 'Tin nhắn tuyển dụng "việc nhẹ lương cao"',
    redFlags: [
      '"Việc nhẹ lương cao" - dấu hiệu lừa đảo #1',
      'Lương phi thực tế (500k-2tr/ngày)',
      'Không yêu cầu kinh nghiệm, bằng cấp',
      'Liên hệ qua Zalo cá nhân thay vì kênh chính thức',
    ],
  }
}

// Generate OTP scam call
export function generateOTPScam(): QuizImage {
  const bank = random(BANKS)
  
  const messages: MessageBubble[] = [
    { text: `Đây là ${bank} gọi`, isScammer: true },
    { text: `TK của anh/chị có GD đáng ngờ`, isScammer: true },
    { text: `Để hủy GD, vui lòng đọc mã OTP`, isScammer: true },
    { text: `Mã vừa gửi đến SĐT của anh/chị`, isScammer: true },
  ]

  return {
    dataUrl: createZaloMessage(messages, `CSKH ${bank}`),
    type: 'zalo',
    isScam: true,
    description: 'Cuộc gọi/tin nhắn yêu cầu OTP',
    redFlags: [
      'Ngân hàng KHÔNG BAO GIỜ hỏi OTP qua điện thoại',
      'Tạo tình huống "giao dịch đáng ngờ" để hoảng loạn',
      'OTP là mã bảo mật chỉ bạn được biết',
      'Đọc OTP = mất tiền ngay lập tức',
    ],
  }
}

// Generate impersonation scam
export function generateImpersonationScam(): QuizImage {
  const relation = random(['Con', 'Cháu', 'Em'])
  const amount = randomAmount() * 3
  
  const messages: MessageBubble[] = [
    { text: `${relation} đây, số mới`, isScammer: true },
    { text: `${relation} đang ở bệnh viện`, isScammer: true },
    { text: `Cần ${formatMoney(amount)} gấp`, isScammer: true },
    { text: `Chuyển ngay giúp ${relation.toLowerCase()} với`, isScammer: true },
    { text: `STK: ${randomBankAccount()}`, isScammer: true },
  ]

  return {
    dataUrl: createZaloMessage(messages, `Số mới - ${relation}`),
    type: 'zalo',
    isScam: true,
    description: 'Tin nhắn giả mạo người thân',
    redFlags: [
      '"Số mới" - không xác minh được danh tính',
      'Tình huống khẩn cấp (bệnh viện, tai nạn)',
      'Yêu cầu chuyển tiền gấp',
      'Cần gọi điện số cũ để xác nhận',
    ],
  }
}

// Generate phishing email
export function generatePhishingEmail(): QuizImage {
  const bank = random(BANKS)
  
  return {
    dataUrl: createEmailPreview(
      `security@${bank.toLowerCase()}-alert.com`,
      `[KHẨN CẤP] Tài khoản ${bank} của bạn cần xác minh`,
      `Kính gửi Quý khách, Chúng tôi phát hiện hoạt động đáng ngờ trên tài khoản của bạn...`,
      true
    ),
    type: 'email',
    isScam: true,
    description: 'Email phishing giả mạo ngân hàng',
    redFlags: [
      'Email không phải domain chính thức của ngân hàng',
      'Tiêu đề tạo hoảng loạn "KHẨN CẤP"',
      'Ngân hàng không gửi email yêu cầu xác minh qua link',
      'Nên truy cập trực tiếp website ngân hàng',
    ],
  }
}

// Generate legitimate message for comparison
export function generateLegitimateMessage(): QuizImage {
  const bank = random(BANKS)
  const amount = randomAmount()
  
  const content = `${bank}: TK ...1234 -${formatMoney(amount)} luc ${randomTime()}. SD: ${formatMoney(amount * 10)}. Neu khong phai ban thuc hien, goi 1900xxxx (so chinh thuc tren website).`
  
  return {
    dataUrl: createSMSMessage(bank, content, true),
    type: 'sms',
    isScam: false,
    description: 'Tin nhắn thông báo giao dịch thật từ ngân hàng',
    redFlags: [], // No red flags - this is legitimate
  }
}

// Generate random quiz image
export function generateRandomQuizImage(): QuizImage {
  const generators = [
    generateMoneyTransferScam,
    generateFakeBankSMS,
    generatePrizeScam,
    generateJobScam,
    generateOTPScam,
    generateImpersonationScam,
    generatePhishingEmail,
    generateLegitimateMessage,
  ]
  
  return random(generators)()
}

// Generate multiple quiz images
export function generateQuizImages(count: number): QuizImage[] {
  const images: QuizImage[] = []
  for (let i = 0; i < count; i++) {
    images.push(generateRandomQuizImage())
  }
  return images
}


// ============================================
// ADDITIONAL SCAM IMAGE GENERATORS
// ============================================

// Fake website login page
export function generateFakeWebsiteLogin(): QuizImage {
  const bank = random(BANKS)
  const fakeUrl = random([
    `${bank.toLowerCase()}-dangnhap.com`,
    `${bank.toLowerCase()}-vn.net`,
    `secure-${bank.toLowerCase()}.xyz`,
    `${bank.toLowerCase()}-online.top`,
  ])
  
  const svg = svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="340" height="280" viewBox="0 0 340 280">
      <rect width="340" height="280" fill="#f5f5f5"/>
      <!-- Browser bar -->
      <rect width="340" height="35" fill="#dee1e6"/>
      <circle cx="15" cy="17" r="5" fill="#ff5f57"/>
      <circle cx="30" cy="17" r="5" fill="#febc2e"/>
      <circle cx="45" cy="17" r="5" fill="#28c840"/>
      <!-- URL bar -->
      <rect x="60" y="8" width="220" height="20" rx="4" fill="#fff"/>
      <text x="68" y="22" font-size="9" fill="#c00">⚠️ ${fakeUrl}</text>
      <!-- Page content -->
      <rect x="20" y="50" width="300" height="210" rx="8" fill="#fff" stroke="#ddd"/>
      <!-- Bank logo area -->
      <rect x="120" y="65" width="100" height="30" rx="4" fill="#1a73e8"/>
      <text x="170" y="85" font-size="12" fill="white" text-anchor="middle" font-weight="bold">${bank}</text>
      <!-- Login form -->
      <text x="170" y="115" font-size="11" fill="#333" text-anchor="middle">Đăng nhập Internet Banking</text>
      <rect x="70" y="130" width="200" height="32" rx="4" fill="#f5f5f5" stroke="#ddd"/>
      <text x="80" y="150" font-size="10" fill="#999">Tên đăng nhập</text>
      <rect x="70" y="170" width="200" height="32" rx="4" fill="#f5f5f5" stroke="#ddd"/>
      <text x="80" y="190" font-size="10" fill="#999">Mật khẩu</text>
      <rect x="70" y="215" width="200" height="32" rx="6" fill="#1a73e8"/>
      <text x="170" y="236" font-size="12" fill="white" text-anchor="middle" font-weight="bold">ĐĂNG NHẬP</text>
    </svg>
  `)

  return {
    dataUrl: svg,
    type: 'website',
    isScam: true,
    description: `Website giả mạo trang đăng nhập ${bank}`,
    redFlags: [
      `URL giả: ${fakeUrl} không phải domain chính thức`,
      'Domain lạ (.com, .net, .xyz, .top thay vì .com.vn)',
      'Giao diện có thể giống 100% nhưng URL khác',
      'Không có chứng chỉ SSL hợp lệ của ngân hàng',
    ],
  }
}

// Fake QR code scam
export function generateFakeQRCode(): QuizImage {
  const scenarios = [
    { context: 'quán cafe', reason: 'thanh toán', redFlag: 'QR code bị dán đè lên QR gốc' },
    { context: 'bãi đỗ xe', reason: 'phí gửi xe', redFlag: 'QR code dán ở vị trí bất thường' },
    { context: 'ATM', reason: 'hướng dẫn rút tiền', redFlag: 'QR code không phải của ngân hàng' },
    { context: 'poster đường phố', reason: 'khuyến mãi', redFlag: 'QR code dẫn đến link lạ' },
  ]
  const scenario = random(scenarios)
  
  const svg = svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="340" height="260" viewBox="0 0 340 260">
      <rect width="340" height="260" fill="#fff"/>
      <!-- QR Code frame -->
      <rect x="95" y="30" width="150" height="150" fill="#fff" stroke="#333" stroke-width="2"/>
      <!-- Fake QR pattern -->
      <rect x="105" y="40" width="30" height="30" fill="#333"/>
      <rect x="145" y="40" width="30" height="30" fill="#333"/>
      <rect x="185" y="40" width="30" height="30" fill="#333"/>
      <rect x="105" y="80" width="30" height="30" fill="#333"/>
      <rect x="165" y="80" width="30" height="30" fill="#333"/>
      <rect x="105" y="120" width="30" height="30" fill="#333"/>
      <rect x="145" y="120" width="30" height="30" fill="#333"/>
      <rect x="185" y="120" width="30" height="30" fill="#333"/>
      <!-- Warning sticker -->
      <rect x="180" y="130" width="60" height="25" fill="#ff0" stroke="#f00" stroke-width="2" transform="rotate(-15 210 142)"/>
      <text x="210" y="147" font-size="8" fill="#f00" text-anchor="middle" transform="rotate(-15 210 142)">FAKE!</text>
      <!-- Context -->
      <text x="170" y="200" font-size="12" fill="#333" text-anchor="middle">Quét để ${scenario.reason}</text>
      <text x="170" y="220" font-size="10" fill="#666" text-anchor="middle">Tại ${scenario.context}</text>
      <text x="170" y="245" font-size="9" fill="#c00" text-anchor="middle">⚠️ ${scenario.redFlag}</text>
    </svg>
  `)

  return {
    dataUrl: svg,
    type: 'website',
    isScam: true,
    description: `QR code giả tại ${scenario.context}`,
    redFlags: [
      scenario.redFlag,
      'Kẻ gian dán QR giả đè lên QR thật',
      'QR dẫn đến trang web lừa đảo hoặc chuyển tiền',
      'Luôn kiểm tra URL sau khi quét QR',
    ],
  }
}

// Fake transfer confirmation
export function generateFakeTransferConfirmation(): QuizImage {
  const bank = random(BANKS)
  const amount = randomAmount() * 2
  const name = random(NAMES)
  
  const svg = svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="340" height="320" viewBox="0 0 340 320">
      <rect width="340" height="320" fill="#f0f0f0"/>
      <!-- Phone frame -->
      <rect x="20" y="10" width="300" height="300" rx="20" fill="#fff" stroke="#ddd"/>
      <!-- Header -->
      <rect x="20" y="10" width="300" height="50" rx="20" fill="#1a73e8"/>
      <text x="170" y="42" font-size="14" fill="white" text-anchor="middle" font-weight="bold">${bank}</text>
      <!-- Success icon -->
      <circle cx="170" cy="100" r="30" fill="#4caf50"/>
      <text x="170" y="110" font-size="24" fill="white" text-anchor="middle">✓</text>
      <!-- Transfer info -->
      <text x="170" y="150" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">Chuyển tiền thành công</text>
      <text x="170" y="180" font-size="20" fill="#1a73e8" text-anchor="middle" font-weight="bold">${formatMoney(amount)}</text>
      <text x="170" y="210" font-size="11" fill="#666" text-anchor="middle">Đến: ${name.toUpperCase()}</text>
      <text x="170" y="230" font-size="11" fill="#666" text-anchor="middle">STK: ***${randomBankAccount().slice(-4)}</text>
      <text x="170" y="250" font-size="10" fill="#999" text-anchor="middle">${randomTime()} - ${new Date().toLocaleDateString('vi-VN')}</text>
      <!-- Warning -->
      <rect x="40" y="270" width="260" height="30" rx="4" fill="#fff3cd"/>
      <text x="170" y="290" font-size="9" fill="#856404" text-anchor="middle">⚠️ Ảnh này có thể bị chỉnh sửa bằng Photoshop</text>
    </svg>
  `)

  return {
    dataUrl: svg,
    type: 'bank',
    isScam: true,
    description: 'Ảnh chụp màn hình chuyển tiền giả',
    redFlags: [
      'Ảnh chuyển tiền có thể bị chỉnh sửa dễ dàng',
      'Kẻ gian gửi ảnh giả để lừa bạn giao hàng/dịch vụ',
      'Luôn kiểm tra số dư tài khoản thực tế',
      'Không tin ảnh chụp màn hình, chỉ tin thông báo từ app ngân hàng',
    ],
  }
}

// Fake app notification
export function generateFakeAppNotification(): QuizImage {
  const apps = [
    { name: 'MoMo', color: '#a50064' },
    { name: 'ZaloPay', color: '#0068ff' },
    { name: 'VNPay', color: '#005baa' },
    { name: 'Shopee', color: '#ee4d2d' },
  ]
  const app = random(apps)
  const amount = randomAmount()
  
  const svg = svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="340" height="140" viewBox="0 0 340 140">
      <rect width="340" height="140" fill="#1c1c1e"/>
      <!-- Notification card -->
      <rect x="15" y="20" width="310" height="100" rx="14" fill="#2c2c2e"/>
      <!-- App icon -->
      <rect x="30" y="35" width="45" height="45" rx="10" fill="${app.color}"/>
      <text x="52" y="65" font-size="20" fill="white" text-anchor="middle" font-weight="bold">${app.name.charAt(0)}</text>
      <!-- Content -->
      <text x="90" y="50" font-size="13" fill="#fff" font-weight="bold">${app.name}</text>
      <text x="280" y="50" font-size="10" fill="#8e8e93">Bây giờ</text>
      <text x="90" y="70" font-size="12" fill="#fff">🎉 Bạn nhận được ${formatMoney(amount)}</text>
      <text x="90" y="88" font-size="11" fill="#8e8e93">Từ: CHUONG TRINH KHUYEN MAI</text>
      <text x="90" y="105" font-size="10" fill="#007aff">Nhấn để nhận ngay →</text>
    </svg>
  `)

  return {
    dataUrl: svg,
    type: 'bank',
    isScam: true,
    description: `Thông báo giả từ ${app.name}`,
    redFlags: [
      'Thông báo "nhận tiền" bất ngờ không rõ nguồn',
      'Yêu cầu "nhấn để nhận" - app thật tự động cộng tiền',
      'Có thể là notification giả hoặc app clone',
      'Kiểm tra trực tiếp trong app chính thức',
    ],
  }
}

// Crypto/Investment scam
export function generateCryptoScam(): QuizImage {
  const profits = ['500%', '1000%', '300%', '200%']
  const profit = random(profits)
  
  const svg = svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="340" height="280" viewBox="0 0 340 280">
      <rect width="340" height="280" fill="#0d1421"/>
      <!-- Header -->
      <rect width="340" height="50" fill="#1a2332"/>
      <text x="170" y="32" font-size="14" fill="#ffd700" text-anchor="middle" font-weight="bold">💰 CRYPTO INVESTMENT VIP 💰</text>
      <!-- Fake chart -->
      <polyline points="30,180 80,160 130,170 180,120 230,100 280,60 310,40" fill="none" stroke="#00ff00" stroke-width="3"/>
      <text x="280" y="55" font-size="10" fill="#00ff00">+${profit}</text>
      <!-- Testimonials -->
      <rect x="20" y="200" width="145" height="60" rx="8" fill="#1a2332"/>
      <text x="30" y="220" font-size="9" fill="#fff">"Đầu tư 10tr, rút 50tr sau 1 tuần"</text>
      <text x="30" y="235" font-size="8" fill="#888">- Nguyễn V.A ⭐⭐⭐⭐⭐</text>
      <rect x="175" y="200" width="145" height="60" rx="8" fill="#1a2332"/>
      <text x="185" y="220" font-size="9" fill="#fff">"Lãi ${profit} chỉ sau 3 ngày"</text>
      <text x="185" y="235" font-size="8" fill="#888">- Trần T.B ⭐⭐⭐⭐⭐</text>
      <!-- CTA -->
      <rect x="70" y="265" width="200" height="10" rx="2" fill="#ffd700"/>
    </svg>
  `)

  return {
    dataUrl: svg,
    type: 'website',
    isScam: true,
    description: 'Quảng cáo đầu tư crypto lừa đảo',
    redFlags: [
      `Hứa lợi nhuận phi thực tế (${profit})`,
      'Biểu đồ chỉ đi lên - không có đầu tư nào như vậy',
      'Testimonial giả với tên chung chung',
      'Không có thông tin công ty, giấy phép',
    ],
  }
}

// Romance scam profile
export function generateRomanceScamProfile(): QuizImage {
  const jobs = ['Bác sĩ', 'Kỹ sư dầu khí', 'Quân nhân Mỹ', 'Doanh nhân']
  const countries = ['Mỹ', 'Anh', 'Đức', 'Úc']
  const job = random(jobs)
  const country = random(countries)
  
  const svg = svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="340" height="300" viewBox="0 0 340 300">
      <rect width="340" height="300" fill="#fff"/>
      <!-- Profile header -->
      <rect width="340" height="120" fill="linear-gradient(#667eea, #764ba2)"/>
      <rect x="0" y="0" width="340" height="120" fill="#667eea"/>
      <!-- Avatar -->
      <circle cx="170" cy="100" r="50" fill="#fff" stroke="#fff" stroke-width="4"/>
      <circle cx="170" cy="100" r="46" fill="#ddd"/>
      <text x="170" y="110" font-size="30" fill="#999" text-anchor="middle">👤</text>
      <!-- Info -->
      <text x="170" y="175" font-size="16" fill="#333" text-anchor="middle" font-weight="bold">Michael Johnson</text>
      <text x="170" y="195" font-size="12" fill="#666" text-anchor="middle">${job} • ${country}</text>
      <text x="170" y="215" font-size="11" fill="#888" text-anchor="middle">"Looking for true love ❤️"</text>
      <!-- Red flags -->
      <rect x="20" y="235" width="300" height="50" rx="8" fill="#fff3cd"/>
      <text x="170" y="255" font-size="9" fill="#856404" text-anchor="middle">⚠️ Dấu hiệu: Ảnh đẹp như model, nghề nghiệp "sang"</text>
      <text x="170" y="270" font-size="9" fill="#856404" text-anchor="middle">Người nước ngoài, nhanh chóng tỏ tình</text>
    </svg>
  `)

  return {
    dataUrl: svg,
    type: 'messenger',
    isScam: true,
    description: 'Profile giả trong lừa đảo tình cảm',
    redFlags: [
      'Ảnh đại diện quá hoàn hảo (thường lấy từ internet)',
      `Nghề nghiệp "sang": ${job}`,
      `Người nước ngoài (${country}) quen qua mạng`,
      'Nhanh chóng tỏ tình, hứa hẹn tương lai',
    ],
  }
}
