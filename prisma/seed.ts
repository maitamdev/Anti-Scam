import { PrismaClient } from '@prisma/client'

// @ts-ignore - Models will be available after prisma generate
const prisma = new PrismaClient() as any

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

  // Guide Categories
  const guideCategories = [
    { name: 'Quản lý Mật khẩu', slug: 'mat-khau', icon: 'Lock', order: 1 },
    { name: 'Nhận biết Lừa đảo', slug: 'lua-dao', icon: 'Mail', order: 2 },
    { name: 'Bảo mật Wi-Fi & Mạng', slug: 'wifi-mang', icon: 'Wifi', order: 3 },
    { name: 'An toàn trên Mạng xã hội', slug: 'mang-xa-hoi', icon: 'Shield', order: 4 },
    { name: 'Bảo vệ Thiết bị', slug: 'thiet-bi', icon: 'Smartphone', order: 5 },
    { name: 'Cập nhật Phần mềm', slug: 'phan-mem', icon: 'RefreshCw', order: 6 },
  ]

  for (const cat of guideCategories) {
    await prisma.guideCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log(`✅ Guide Categories: ${guideCategories.length} categories`)

  // Guides - Inline content
  const guides = [
    {
      title: '5 bước tạo mật khẩu không thể bẻ khóa',
      slug: '5-buoc-tao-mat-khau-manh',
      description: 'Hướng dẫn chi tiết cách tạo và quản lý mật khẩu mạnh để bảo vệ tài khoản của bạn khỏi hacker.',
      level: 'basic',
      categorySlug: 'mat-khau',
      content: `<h2>Tại sao mật khẩu mạnh lại quan trọng?</h2><p>Mật khẩu là lớp bảo vệ đầu tiên và quan trọng nhất cho tài khoản trực tuyến của bạn. Theo thống kê từ Verizon Data Breach Report 2023, hơn 80% các vụ xâm nhập dữ liệu liên quan đến mật khẩu yếu hoặc bị đánh cắp. Một mật khẩu yếu như "123456" hoặc "password" có thể bị bẻ khóa trong chưa đầy 1 giây.</p><h2>5 bước tạo mật khẩu không thể bẻ khóa</h2><ol><li><strong>Độ dài tối thiểu 12-16 ký tự:</strong> Mỗi ký tự thêm vào làm tăng độ khó bẻ khóa theo cấp số nhân.</li><li><strong>Kết hợp đa dạng ký tự:</strong> Sử dụng chữ hoa (A-Z), chữ thường (a-z), số (0-9) và ký tự đặc biệt (!@#$%^&*).</li><li><strong>Tránh thông tin cá nhân:</strong> Không dùng tên, ngày sinh, số điện thoại.</li><li><strong>Sử dụng cụm từ (passphrase):</strong> Ví dụ: "Tôi thích uống cà phê mỗi sáng" → "T0i_Th1ch#CaPhe@MoiSang!"</li><li><strong>Mỗi tài khoản một mật khẩu riêng:</strong> Nếu một tài khoản bị hack, các tài khoản khác vẫn an toàn.</li></ol><h2>Sử dụng trình quản lý mật khẩu</h2><ul><li><strong>Bitwarden (Miễn phí):</strong> Mã nguồn mở, bảo mật cao, đồng bộ đa thiết bị.</li><li><strong>1Password (Trả phí):</strong> Giao diện đẹp, tính năng chia sẻ gia đình.</li><li><strong>LastPass (Freemium):</strong> Phổ biến, dễ sử dụng.</li></ul><h2>Kiểm tra mật khẩu đã bị lộ</h2><p>Truy cập haveibeenpwned.com để kiểm tra xem email hoặc mật khẩu của bạn có trong các vụ rò rỉ dữ liệu không.</p>`
    },
    {
      title: 'Hướng dẫn nhận biết email lừa đảo (Phishing)',
      slug: 'nhan-biet-email-lua-dao',
      description: 'Các dấu hiệu cảnh báo chi tiết để phát hiện và tránh các cuộc tấn công lừa đảo qua email.',
      level: 'basic',
      categorySlug: 'lua-dao',
      content: `<h2>Email lừa đảo (Phishing) là gì?</h2><p>Phishing là hình thức tấn công mạng phổ biến nhất, chiếm hơn 90% các cuộc tấn công. Kẻ lừa đảo gửi email giả mạo từ các tổ chức uy tín để đánh cắp thông tin đăng nhập, số thẻ tín dụng.</p><h2>10 dấu hiệu nhận biết email phishing</h2><ol><li><strong>Địa chỉ email gửi đáng ngờ:</strong> Kiểm tra kỹ domain. Ví dụ: support@vietcombank-secure.com (giả) vs support@vietcombank.com.vn (thật).</li><li><strong>Lời chào chung chung:</strong> "Kính gửi Quý khách hàng" thay vì tên cụ thể.</li><li><strong>Tạo cảm giác khẩn cấp:</strong> "Tài khoản sẽ bị khóa trong 24h".</li><li><strong>Link đáng ngờ:</strong> Hover chuột để xem URL thật trước khi click.</li><li><strong>Lỗi chính tả và ngữ pháp:</strong> Email chính thức hiếm khi có lỗi.</li><li><strong>Yêu cầu thông tin nhạy cảm:</strong> Ngân hàng KHÔNG BAO GIỜ yêu cầu mật khẩu, OTP qua email.</li><li><strong>File đính kèm đáng ngờ:</strong> Đặc biệt các file .exe, .zip, .js.</li><li><strong>Thiết kế email kém:</strong> Logo mờ, màu sắc không đúng brand.</li><li><strong>Không có thông tin liên hệ:</strong> Email thật luôn có footer với địa chỉ, hotline.</li><li><strong>Quá tốt để là thật:</strong> "Bạn trúng thưởng 100 triệu" - nếu không tham gia thì không thể trúng.</li></ol><h2>Cách xử lý khi nhận email đáng ngờ</h2><ul><li>KHÔNG click bất kỳ link nào</li><li>KHÔNG tải file đính kèm</li><li>Truy cập trực tiếp website chính thức</li><li>Gọi hotline chính thức để xác nhận</li></ul>`
    },
    {
      title: 'Cách bảo mật mạng Wi-Fi tại nhà',
      slug: 'bao-mat-wifi-tai-nha',
      description: 'Hướng dẫn chi tiết thiết lập mạng không dây an toàn để ngăn chặn truy cập trái phép.',
      level: 'advanced',
      categorySlug: 'wifi-mang',
      content: `<h2>Tại sao cần bảo mật Wi-Fi?</h2><p>Wi-Fi không được bảo mật có thể dẫn đến: người lạ sử dụng internet miễn phí, đánh cắp dữ liệu cá nhân, theo dõi hoạt động trực tuyến. Hơn 40% router tại Việt Nam vẫn sử dụng mật khẩu mặc định.</p><h2>Các bước bảo mật Wi-Fi chi tiết</h2><ol><li><strong>Đổi mật khẩu admin router:</strong> Truy cập 192.168.1.1, đăng nhập và đổi mật khẩu mặc định (admin/admin).</li><li><strong>Sử dụng mã hóa WPA3 hoặc WPA2-AES:</strong> TUYỆT ĐỐI không dùng WEP.</li><li><strong>Đặt mật khẩu Wi-Fi mạnh:</strong> Tối thiểu 12 ký tự, kết hợp chữ hoa, chữ thường, số.</li><li><strong>Đổi tên mạng (SSID):</strong> Không dùng tên mặc định như "TP-Link_XXXX".</li><li><strong>Tắt WPS:</strong> WPS có lỗ hổng bảo mật nghiêm trọng.</li><li><strong>Cập nhật firmware router:</strong> Kiểm tra và cập nhật mỗi 3 tháng.</li><li><strong>Tạo mạng Guest riêng:</strong> Cho khách sử dụng mạng Guest với mật khẩu khác.</li></ol><h2>Cài đặt nâng cao</h2><ul><li>Tắt quản lý từ xa (Remote Management)</li><li>Bật tường lửa router</li><li>Sử dụng DNS an toàn: 1.1.1.1 (Cloudflare) hoặc 8.8.8.8 (Google)</li></ul>`
    },
    {
      title: 'An toàn khi sử dụng mạng xã hội',
      slug: 'an-toan-mang-xa-hoi',
      description: 'Hướng dẫn cài đặt quyền riêng tư và chia sẻ thông tin thông minh trên Facebook, Zalo, TikTok.',
      level: 'basic',
      categorySlug: 'mang-xa-hoi',
      content: `<h2>Rủi ro khi chia sẻ quá nhiều</h2><p>Mạng xã hội là mỏ vàng thông tin cho kẻ lừa đảo. Từ thông tin như ngày sinh, tên thú cưng, trường học, kẻ xấu có thể: đoán mật khẩu, giả mạo danh tính, tấn công có chủ đích. 78% kẻ trộm sử dụng mạng xã hội để xác định mục tiêu.</p><h2>Cài đặt quyền riêng tư trên Facebook</h2><ol><li><strong>Ai có thể xem bài đăng:</strong> Settings → Privacy → Chọn "Friends"</li><li><strong>Giới hạn bài đăng cũ:</strong> Settings → Privacy → Limit Past Posts</li><li><strong>Ẩn danh sách bạn bè:</strong> Profile → Friends → Edit Privacy → "Only me"</li><li><strong>Kiểm soát tag:</strong> Bật "Review tags" và "Review posts you're tagged in"</li><li><strong>Ẩn thông tin cá nhân:</strong> Chọn "Only me" cho số điện thoại, email, ngày sinh</li></ol><h2>Những điều KHÔNG NÊN chia sẻ</h2><ul><li>Ảnh CMND/CCCD, bằng lái, hộ chiếu</li><li>Vé máy bay, boarding pass (chứa mã PNR)</li><li>Địa chỉ nhà cụ thể</li><li>Lịch trình đi du lịch ("Đi Đà Nẵng 1 tuần" = "Nhà tôi trống 1 tuần")</li><li>Thông tin tài chính: lương, số dư tài khoản</li></ul>`
    },
    {
      title: 'Bảo vệ điện thoại khỏi phần mềm độc hại',
      slug: 'bao-ve-dien-thoai-malware',
      description: 'Hướng dẫn toàn diện bảo vệ smartphone Android và iPhone khỏi virus, malware, spyware.',
      level: 'advanced',
      categorySlug: 'thiet-bi',
      content: `<h2>Các loại malware phổ biến trên điện thoại</h2><ul><li><strong>Spyware:</strong> Theo dõi vị trí, ghi âm cuộc gọi, đọc tin nhắn</li><li><strong>Banking Trojan:</strong> Đánh cắp thông tin đăng nhập ngân hàng, OTP</li><li><strong>Ransomware:</strong> Khóa điện thoại, đòi tiền chuộc</li><li><strong>Adware:</strong> Hiển thị quảng cáo liên tục</li></ul><h2>Cách malware xâm nhập</h2><ol><li>Ứng dụng giả mạo từ store không chính thức</li><li>Click link trong SMS, email độc hại</li><li>File APK từ nguồn lạ</li><li>Wi-Fi công cộng không an toàn</li></ol><h2>10 bước bảo vệ điện thoại</h2><ol><li><strong>Chỉ cài app từ store chính thức:</strong> Google Play, App Store</li><li><strong>Kiểm tra quyền truy cập:</strong> App đèn pin không cần quyền đọc tin nhắn</li><li><strong>Đọc đánh giá trước khi cài:</strong> Cẩn thận với app mới, ít review</li><li><strong>Cập nhật hệ điều hành:</strong> Bật cập nhật tự động</li><li><strong>Không root/jailbreak:</strong> Vô hiệu hóa nhiều lớp bảo mật</li><li><strong>Cài phần mềm bảo mật:</strong> Kaspersky, Bitdefender</li><li><strong>Bật khóa màn hình:</strong> PIN 6 số, vân tay, Face ID</li><li><strong>Bật Find My Device:</strong> Định vị, khóa, xóa dữ liệu từ xa</li><li><strong>Sao lưu dữ liệu:</strong> Backup thường xuyên</li><li><strong>Cẩn thận với Wi-Fi công cộng:</strong> Sử dụng VPN</li></ol><h2>Dấu hiệu điện thoại bị nhiễm malware</h2><ul><li>Pin hết nhanh bất thường</li><li>Điện thoại nóng khi không sử dụng</li><li>Data di động tăng đột biến</li><li>Xuất hiện app lạ không cài</li></ul>`
    },
    {
      title: 'Tại sao cập nhật phần mềm lại quan trọng?',
      slug: 'tai-sao-cap-nhat-phan-mem',
      description: 'Hiểu rõ tầm quan trọng của việc luôn cập nhật hệ điều hành, trình duyệt và ứng dụng.',
      level: 'basic',
      categorySlug: 'phan-mem',
      content: `<h2>Cập nhật phần mềm = Vá lỗ hổng bảo mật</h2><p>Mỗi phần mềm đều có lỗi (bug), và một số lỗi có thể bị hacker khai thác. Khi lỗ hổng được phát hiện, nhà phát triển phát hành bản vá trong các bản cập nhật. Ví dụ: Lỗ hổng WannaCry năm 2017 đã lây nhiễm hơn 200,000 máy tính, gây thiệt hại hàng tỷ đô la - dù Microsoft đã phát hành bản vá 2 tháng trước.</p><h2>Các loại cập nhật quan trọng</h2><ol><li><strong>Cập nhật hệ điều hành:</strong> Windows Update, macOS Update, iOS/Android Update</li><li><strong>Cập nhật trình duyệt:</strong> Chrome, Firefox, Safari, Edge</li><li><strong>Cập nhật ứng dụng:</strong> Đặc biệt app ngân hàng, email, mạng xã hội</li><li><strong>Cập nhật firmware:</strong> Router, camera IP, thiết bị IoT</li></ol><h2>Rủi ro khi không cập nhật</h2><ul><li>Bị khai thác lỗ hổng đã biết</li><li>Malware xâm nhập</li><li>Dữ liệu bị đánh cắp</li><li>Thiết bị bị kiểm soát thành botnet</li><li>Ransomware mã hóa dữ liệu</li></ul><h2>Cách cập nhật an toàn</h2><ol><li><strong>Bật cập nhật tự động:</strong> Windows: Settings → Update & Security</li><li><strong>Cập nhật ngay khi có thông báo:</strong> Đừng nhấn "Remind me later"</li><li><strong>Ưu tiên Security Update:</strong> Các bản cập nhật có ghi "Security" hoặc "Critical"</li><li><strong>Backup trước khi cập nhật lớn:</strong> Phòng trường hợp lỗi</li><li><strong>Cập nhật từ nguồn chính thức:</strong> Không tải từ link lạ</li></ol>`
    }
  ]

  for (const guide of guides) {
    const category = await prisma.guideCategory.findUnique({
      where: { slug: guide.categorySlug },
    })
    if (category) {
      await prisma.guide.upsert({
        where: { slug: guide.slug },
        update: {},
        create: {
          title: guide.title,
          slug: guide.slug,
          description: guide.description,
          content: guide.content,
          level: guide.level,
          categoryId: category.id,
        },
      })
    }
  }
  console.log(`✅ Guides: ${guides.length} articles`)

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
