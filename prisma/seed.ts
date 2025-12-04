import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Whitelist - Các domain uy tín
  const whitelistData = [
    { domain: 'vietcombank.com.vn', brand: 'Vietcombank', category: 'bank' },
    { domain: 'techcombank.com.vn', brand: 'Techcombank', category: 'bank' },
    { domain: 'mbbank.com.vn', brand: 'MB Bank', category: 'bank' },
    { domain: 'tpbank.vn', brand: 'TPBank', category: 'bank' },
    { domain: 'acb.com.vn', brand: 'ACB', category: 'bank' },
    { domain: 'bidv.com.vn', brand: 'BIDV', category: 'bank' },
    { domain: 'agribank.com.vn', brand: 'Agribank', category: 'bank' },
    { domain: 'vpbank.com.vn', brand: 'VPBank', category: 'bank' },
    { domain: 'sacombank.com.vn', brand: 'Sacombank', category: 'bank' },
    { domain: 'shopee.vn', brand: 'Shopee', category: 'ecommerce' },
    { domain: 'lazada.vn', brand: 'Lazada', category: 'ecommerce' },
    { domain: 'tiki.vn', brand: 'Tiki', category: 'ecommerce' },
    { domain: 'sendo.vn', brand: 'Sendo', category: 'ecommerce' },
    { domain: 'thegioididong.com', brand: 'Thế Giới Di Động', category: 'ecommerce' },
    { domain: 'fpt.com.vn', brand: 'FPT', category: 'tech' },
    { domain: 'vnexpress.net', brand: 'VnExpress', category: 'news' },
    { domain: 'tuoitre.vn', brand: 'Tuổi Trẻ', category: 'news' },
    { domain: 'gov.vn', brand: 'Chính phủ', category: 'government' },
    { domain: 'facebook.com', brand: 'Facebook', category: 'social' },
    { domain: 'zalo.me', brand: 'Zalo', category: 'social' },
  ]

  for (const item of whitelistData) {
    await prisma.whitelist.upsert({
      where: { domain: item.domain },
      update: {},
      create: item,
    })
  }
  console.log(`✅ Whitelist: ${whitelistData.length} domains`)

  // Scam Patterns - Mẫu lừa đảo thực tế từ MXH Việt Nam
  const scamPatterns = [
    // MONEY_TRANSFER - Nhờ chuyển tiền
    {
      category: 'MONEY_TRANSFER',
      pattern: 'nhờ chuyển|chuyển giúp|chuyển hộ|giúp chuyển',
      description: 'Người lạ/quen nhờ chuyển tiền hộ với các lý do như bank lỗi, cần gấp',
      example: 'C nhờ tí việc với, TK còn dư 15tr đó không, c nhờ chuyển qua Techcombank giúp c với',
      severity: 90,
      source: 'facebook,zalo,messenger',
    },
    {
      category: 'MONEY_TRANSFER',
      pattern: 'bank.*lỗi|ngân hàng.*lỗi|app.*lỗi|không chuyển được',
      description: 'Lý do bank/app lỗi để nhờ chuyển tiền',
      example: 'Bank của c đang lỗi mất, e chuyển giúp c được không',
      severity: 95,
      source: 'facebook,zalo',
    },
    {
      category: 'MONEY_TRANSFER',
      pattern: 'có banking không|dùng banking không|có app bank không',
      description: 'Hỏi có dùng banking để chuẩn bị nhờ chuyển tiền',
      example: 'TK ngân hàng có dùng banking đó không, c nhờ tí việc với',
      severity: 85,
      source: 'facebook,zalo,messenger',
    },
    {
      category: 'MONEY_TRANSFER',
      pattern: 'cần gấp|gấp lắm|khẩn cấp|emergency',
      description: 'Tạo áp lực gấp gáp để nạn nhân không kịp suy nghĩ',
      example: 'C đang có tí việc cần chuyển ngay, giúp c với',
      severity: 70,
      source: 'all',
    },

    // FAKE_BANK - Giả mạo ngân hàng
    {
      category: 'FAKE_BANK',
      pattern: 'tài khoản.*khóa|tk.*bị khóa|account.*locked',
      description: 'Thông báo giả tài khoản bị khóa',
      example: 'Tài khoản của bạn đã bị khóa do hoạt động bất thường. Click link để xác minh',
      severity: 95,
      source: 'sms,email',
    },
    {
      category: 'FAKE_BANK',
      pattern: 'xác minh.*tài khoản|verify.*account|cập nhật.*thông tin',
      description: 'Yêu cầu xác minh/cập nhật thông tin tài khoản',
      example: 'Vui lòng cập nhật thông tin tài khoản để tiếp tục sử dụng dịch vụ',
      severity: 90,
      source: 'sms,email',
    },
    {
      category: 'FAKE_BANK',
      pattern: 'giao dịch.*đáng ngờ|suspicious.*transaction',
      description: 'Cảnh báo giả về giao dịch đáng ngờ',
      example: 'Phát hiện giao dịch đáng ngờ 50,000,000đ. Nếu không phải bạn, click link để hủy',
      severity: 90,
      source: 'sms',
    },

    // PRIZE - Trúng thưởng
    {
      category: 'PRIZE',
      pattern: 'trúng thưởng|chúc mừng.*trúng|congratulations.*win',
      description: 'Thông báo trúng thưởng giả',
      example: 'Chúc mừng bạn đã trúng thưởng iPhone 15 Pro Max từ Shopee',
      severity: 85,
      source: 'facebook,sms,email',
    },
    {
      category: 'PRIZE',
      pattern: 'nhận quà|phiếu quà|gift.*voucher|free.*gift',
      description: 'Hứa hẹn quà tặng miễn phí',
      example: 'Bạn được tặng voucher 500k từ Lazada. Click link để nhận ngay',
      severity: 75,
      source: 'facebook,sms',
    },
    {
      category: 'PRIZE',
      pattern: 'nộp phí.*nhận|đóng phí.*nhận|phí ship.*nhận',
      description: 'Yêu cầu nộp phí để nhận quà/thưởng',
      example: 'Để nhận thưởng, vui lòng nộp phí xử lý 200k',
      severity: 95,
      source: 'all',
    },

    // JOB - Tuyển dụng lừa đảo
    {
      category: 'JOB',
      pattern: 'việc nhẹ.*lương cao|lương cao.*việc nhẹ|easy.*job.*high.*salary',
      description: 'Quảng cáo việc nhẹ lương cao',
      example: 'Tuyển CTV làm việc tại nhà, chỉ cần điện thoại, thu nhập 500k-2tr/ngày',
      severity: 85,
      source: 'facebook,zalo,telegram',
    },
    {
      category: 'JOB',
      pattern: 'tuyển ctv|tuyển cộng tác viên|cần người làm thêm',
      description: 'Tuyển CTV online với hứa hẹn thu nhập cao',
      example: 'Tuyển CTV đánh giá sản phẩm Shopee, hoa hồng 10-30%/đơn',
      severity: 80,
      source: 'facebook,zalo',
    },
    {
      category: 'JOB',
      pattern: 'làm tại nhà|work from home|online job|việc online',
      description: 'Việc làm online tại nhà với thu nhập hấp dẫn',
      example: 'Việc làm online tại nhà, chỉ cần 2-3h/ngày, thu nhập 10-20tr/tháng',
      severity: 70,
      source: 'facebook,zalo',
    },
    {
      category: 'JOB',
      pattern: 'đặt cọc|nạp tiền.*trước|deposit.*first',
      description: 'Yêu cầu đặt cọc/nạp tiền trước khi làm việc',
      example: 'Để bắt đầu, bạn cần nạp 500k tiền cọc vào hệ thống',
      severity: 95,
      source: 'all',
    },

    // INVESTMENT - Đầu tư lừa đảo
    {
      category: 'INVESTMENT',
      pattern: 'lãi suất.*cao|lợi nhuận.*cao|high.*profit|high.*return',
      description: 'Hứa hẹn lãi suất/lợi nhuận cao bất thường',
      example: 'Đầu tư Forex, lãi 30%/tháng, rút tiền bất cứ lúc nào',
      severity: 90,
      source: 'facebook,telegram,zalo',
    },
    {
      category: 'INVESTMENT',
      pattern: 'đầu tư.*forex|đầu tư.*crypto|đầu tư.*coin|trading.*signal',
      description: 'Mời đầu tư Forex/Crypto với lời hứa lãi cao',
      example: 'Tham gia group VIP trading, signal chính xác 95%, lãi 50%/tuần',
      severity: 85,
      source: 'facebook,telegram',
    },
    {
      category: 'INVESTMENT',
      pattern: 'cam kết.*lãi|đảm bảo.*lợi nhuận|guaranteed.*profit',
      description: 'Cam kết lãi suất cố định (dấu hiệu Ponzi)',
      example: 'Cam kết lãi 2%/ngày, hoàn vốn sau 50 ngày',
      severity: 95,
      source: 'all',
    },

    // GAMBLING - Cờ bạc
    {
      category: 'GAMBLING',
      pattern: 'casino|slot|poker|baccarat|roulette',
      description: 'Quảng cáo casino online',
      example: 'Casino online uy tín, nạp 100k tặng 500k, rút tiền nhanh',
      severity: 90,
      source: 'facebook,telegram',
    },
    {
      category: 'GAMBLING',
      pattern: 'lô đề|xổ số|lottery|đánh đề|soi cầu',
      description: 'Quảng cáo lô đề, xổ số online',
      example: 'Soi cầu miễn phí, tỷ lệ trúng 90%, đăng ký nhận 100k',
      severity: 90,
      source: 'facebook,zalo,telegram',
    },
    {
      category: 'GAMBLING',
      pattern: 'cá độ|cá cược|betting|kèo.*bóng',
      description: 'Cá độ bóng đá, thể thao online',
      example: 'Cá độ bóng đá uy tín, tỷ lệ cược cao nhất, rút tiền 5 phút',
      severity: 85,
      source: 'facebook,telegram',
    },

    // ROMANCE - Lừa đảo tình cảm
    {
      category: 'ROMANCE',
      pattern: 'kết bạn|làm quen|add friend|muốn làm bạn',
      description: 'Người lạ chủ động kết bạn làm quen',
      example: 'Chào bạn, mình thấy profile bạn hay quá, kết bạn làm quen nhé',
      severity: 50,
      source: 'facebook,zalo',
    },
    {
      category: 'ROMANCE',
      pattern: 'gửi quà.*từ nước ngoài|package.*customs|bưu kiện.*hải quan',
      description: 'Lừa đảo gửi quà từ nước ngoài, yêu cầu đóng phí hải quan',
      example: 'Anh gửi quà cho em từ Mỹ, em đóng phí hải quan 5tr để nhận nhé',
      severity: 95,
      source: 'facebook,zalo',
    },

    // IMPERSONATION - Giả mạo người thân
    {
      category: 'IMPERSONATION',
      pattern: 'con.*đây|mẹ.*ơi|bố.*ơi|em.*đây.*số mới',
      description: 'Giả mạo con cái/người thân nhắn tin xin tiền',
      example: 'Mẹ ơi con đây, số mới của con. Con cần gấp 10tr để đóng học phí',
      severity: 90,
      source: 'sms,zalo',
    },
    {
      category: 'IMPERSONATION',
      pattern: 'hack.*facebook|mất.*facebook|fb.*bị hack',
      description: 'Giả mạo bạn bè bị hack FB để xin tiền',
      example: 'Ê, FB tao bị hack, mày chuyển tao 2tr đi, mai tao trả',
      severity: 85,
      source: 'facebook,messenger',
    },

    // OTP/PHISHING - Lừa lấy OTP
    {
      category: 'PHISHING',
      pattern: 'mã otp|mã xác nhận|verification code|mã xác thực',
      description: 'Yêu cầu cung cấp mã OTP',
      example: 'Cho mình xin mã OTP vừa gửi về điện thoại bạn để xác nhận giao dịch',
      severity: 100,
      source: 'all',
    },
    {
      category: 'PHISHING',
      pattern: 'mật khẩu|password|pass.*word',
      description: 'Yêu cầu cung cấp mật khẩu',
      example: 'Để hỗ trợ bạn, vui lòng cung cấp mật khẩu tài khoản',
      severity: 100,
      source: 'all',
    },
    {
      category: 'PHISHING',
      pattern: 'cmnd|cccd|căn cước|chứng minh nhân dân',
      description: 'Yêu cầu cung cấp CMND/CCCD',
      example: 'Gửi ảnh CMND 2 mặt để xác minh danh tính',
      severity: 80,
      source: 'all',
    },

    // LOAN - Vay tiền lừa đảo
    {
      category: 'LOAN',
      pattern: 'vay.*nhanh|vay.*online|vay.*không cần|cho vay.*dễ dàng',
      description: 'Quảng cáo vay tiền nhanh, dễ dàng',
      example: 'Vay online 50tr trong 5 phút, không cần thế chấp, lãi suất 0%',
      severity: 75,
      source: 'facebook,sms',
    },
    {
      category: 'LOAN',
      pattern: 'phí.*giải ngân|phí.*duyệt|phí.*hồ sơ',
      description: 'Yêu cầu đóng phí trước khi giải ngân',
      example: 'Hồ sơ đã được duyệt, vui lòng đóng phí 500k để giải ngân',
      severity: 95,
      source: 'all',
    },
  ]

  for (const pattern of scamPatterns) {
    await prisma.scamPattern.create({
      data: pattern,
    })
  }
  console.log(`✅ Scam Patterns: ${scamPatterns.length} patterns`)

  // Scam Accounts - Số tài khoản/điện thoại lừa đảo (ví dụ)
  const scamAccounts = [
    {
      type: 'BANK_ACCOUNT',
      value: '1234567890',
      bankName: 'Techcombank',
      ownerName: 'NGUYEN VAN A',
      reportCount: 15,
      totalAmount: 150000000,
      description: 'Lừa đảo nhờ chuyển tiền qua Facebook',
      verified: true,
    },
    {
      type: 'PHONE',
      value: '0901234567',
      reportCount: 8,
      description: 'Gọi điện giả mạo công an, yêu cầu chuyển tiền',
      verified: true,
    },
    {
      type: 'ZALO',
      value: '0912345678',
      reportCount: 12,
      description: 'Lừa đảo tuyển CTV Shopee',
      verified: true,
    },
  ]

  for (const account of scamAccounts) {
    await prisma.scamAccount.upsert({
      where: {
        type_value: {
          type: account.type,
          value: account.value,
        },
      },
      update: { reportCount: account.reportCount },
      create: account,
    })
  }
  console.log(`✅ Scam Accounts: ${scamAccounts.length} accounts`)

  // Model Version
  await prisma.modelVersion.upsert({
    where: { version: 1 },
    update: {},
    create: {
      version: 1,
      samples: scamPatterns.length + whitelistData.length,
      accuracy: 0.85,
      precision: 0.82,
      recall: 0.88,
      f1Score: 0.85,
      isActive: true,
      notes: 'Initial model with Vietnamese scam patterns from social media',
    },
  })
  console.log('✅ Model Version: v1')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
