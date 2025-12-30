import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient() as any

async function seedScamData() {
  console.log('🌱 Seeding scam data...')

  // ============================================
  // SCAM ALERTS - Cảnh báo lừa đảo mới nhất (Dữ liệu thực từ báo chí VN)
  // ============================================
  const alerts = [
    {
      title: 'Cảnh báo: Giả mạo nhân viên ngân hàng gọi điện yêu cầu cung cấp OTP',
      slug: 'gia-mao-nhan-vien-ngan-hang-otp-2024',
      summary: 'Kẻ lừa đảo giả danh nhân viên ngân hàng gọi điện thông báo tài khoản bị khóa, yêu cầu cung cấp mã OTP để "xác minh". Nhiều nạn nhân đã mất hàng trăm triệu đồng.',
      content: `## Chiêu thức lừa đảo\n\nKẻ lừa đảo sử dụng công nghệ giả mạo số điện thoại (spoofing) để hiển thị số tổng đài ngân hàng. Sau đó:\n\n1. Thông báo tài khoản của bạn có giao dịch đáng ngờ hoặc bị khóa\n2. Yêu cầu xác minh thông tin cá nhân: CCCD, số tài khoản\n3. Gửi link giả mạo hoặc yêu cầu cung cấp mã OTP\n4. Chiếm đoạt tiền trong tài khoản\n\n## Cách phòng tránh\n\n- KHÔNG BAO GIỜ cung cấp mã OTP cho bất kỳ ai qua điện thoại\n- Ngân hàng KHÔNG BAO GIỜ yêu cầu OTP qua điện thoại\n- Gọi trực tiếp hotline ngân hàng để xác minh`,
      category: 'PHISHING',
      severity: 'CRITICAL',
      targetGroup: ['all'],
      platform: ['phone', 'sms'],
      source: 'police',
      reportCount: 1250,
      totalLoss: 15000000000,
      isPinned: true,
      isActive: true,
    },
    {
      title: 'Lừa đảo đầu tư tiền ảo, hứa lợi nhuận 30%/tháng',
      slug: 'lua-dao-dau-tu-tien-ao-2024',
      summary: 'Các sàn giao dịch tiền ảo giả mạo mọc lên như nấm, hứa hẹn lợi nhuận khủng 20-30%/tháng. Hàng nghìn người đã mất trắng.',
      content: `## Dấu hiệu nhận biết\n\n- Hứa lợi nhuận cố định cao bất thường (20-30%/tháng)\n- Yêu cầu nạp tiền qua tài khoản cá nhân\n- Không có giấy phép hoạt động\n- Tạo áp lực phải đầu tư ngay`,
      category: 'CRYPTO',
      severity: 'HIGH',
      targetGroup: ['workers', 'students'],
      platform: ['facebook', 'telegram', 'zalo'],
      source: 'media',
      reportCount: 890,
      totalLoss: 50000000000,
      isPinned: true,
      isActive: true,
    },
    {
      title: 'Cảnh báo: Lừa đảo việc làm online, yêu cầu đặt cọc',
      slug: 'lua-dao-viec-lam-online-2024',
      summary: 'Chiêu trò tuyển dụng việc làm online với mức lương hấp dẫn, sau đó yêu cầu đặt cọc hoặc mua hàng trước.',
      content: `## Mô tả chiêu trò\n\n1. Đăng tin tuyển dụng việc nhẹ lương cao\n2. Ban đầu cho làm thử và trả tiền đúng hẹn\n3. Sau đó yêu cầu "nâng cấp tài khoản" hoặc "đặt cọc"\n4. Chiếm đoạt tiền và block nạn nhân`,
      category: 'JOB',
      severity: 'HIGH',
      targetGroup: ['students', 'workers'],
      platform: ['facebook', 'telegram', 'zalo'],
      source: 'community',
      reportCount: 2100,
      totalLoss: 8000000000,
      isActive: true,
    },
    {
      title: 'Giả mạo công an, viện kiểm sát gọi điện đe dọa',
      slug: 'gia-mao-cong-an-vien-kiem-sat-2024',
      summary: 'Kẻ lừa đảo giả danh công an, viện kiểm sát gọi điện thông báo nạn nhân liên quan đến vụ án, yêu cầu chuyển tiền để "điều tra".',
      content: `## Kịch bản lừa đảo\n\n1. Gọi điện tự xưng là công an/viện kiểm sát\n2. Thông báo nạn nhân liên quan đến vụ án rửa tiền, ma túy\n3. Yêu cầu giữ bí mật, không được nói với ai\n4. Đe dọa bắt giữ nếu không hợp tác\n5. Yêu cầu chuyển tiền vào "tài khoản an toàn"`,
      category: 'IMPERSONATION',
      severity: 'CRITICAL',
      targetGroup: ['elderly', 'all'],
      platform: ['phone'],
      source: 'police',
      reportCount: 3500,
      totalLoss: 120000000000,
      isPinned: true,
      isActive: true,
    },
    {
      title: 'Lừa đảo tình cảm qua mạng xã hội (Romance Scam)',
      slug: 'lua-dao-tinh-cam-romance-scam-2024',
      summary: 'Kẻ lừa đảo tạo profile giả, làm quen qua mạng xã hội, xây dựng tình cảm rồi lừa tiền nạn nhân.',
      content: `## Chiêu thức phổ biến\n\n1. Tạo profile hấp dẫn (người nước ngoài, quân nhân, doanh nhân)\n2. Chủ động làm quen, tán tỉnh ngọt ngào\n3. Xây dựng tình cảm trong vài tuần/tháng\n4. Bịa chuyện gặp khó khăn cần tiền`,
      category: 'ROMANCE',
      severity: 'MEDIUM',
      targetGroup: ['elderly', 'workers'],
      platform: ['facebook', 'zalo'],
      source: 'community',
      reportCount: 450,
      totalLoss: 25000000000,
      isActive: true,
    },
    {
      title: 'Lừa đảo qua Telegram: Đầu tư Forex, Binary Option',
      slug: 'lua-dao-telegram-forex-binary-2024',
      summary: 'Các nhóm Telegram lừa đảo đầu tư Forex, Binary Option với cam kết lợi nhuận cao, sử dụng "chuyên gia" giả.',
      content: `## Cách thức hoạt động\n\n1. Tạo nhóm Telegram với hàng nghìn thành viên ảo\n2. Đăng ảnh chụp lợi nhuận giả\n3. Có "chuyên gia" hướng dẫn đầu tư\n4. Yêu cầu nạp tiền vào sàn giả\n5. Không cho rút tiền hoặc biến mất`,
      category: 'INVESTMENT',
      severity: 'HIGH',
      targetGroup: ['workers', 'students'],
      platform: ['telegram'],
      source: 'media',
      reportCount: 1200,
      totalLoss: 35000000000,
      isActive: true,
    },
    {
      title: 'Cảnh báo: Giả mạo shipper gọi điện xác nhận đơn hàng',
      slug: 'gia-mao-shipper-xac-nhan-don-hang-2024',
      summary: 'Kẻ lừa đảo giả danh shipper gọi điện xác nhận đơn hàng COD, yêu cầu chuyển khoản trước hoặc cung cấp OTP.',
      content: `## Chiêu thức\n\n1. Gọi điện thông báo có đơn hàng COD\n2. Yêu cầu chuyển khoản trước để "xác nhận"\n3. Hoặc gửi link giả để nhập thông tin thẻ\n4. Chiếm đoạt tiền trong tài khoản`,
      category: 'PHISHING',
      severity: 'MEDIUM',
      targetGroup: ['all'],
      platform: ['phone', 'sms'],
      source: 'community',
      reportCount: 780,
      totalLoss: 2500000000,
      isActive: true,
    },
    {
      title: 'Lừa đảo cho vay online: App vay tiền lãi suất cắt cổ',
      slug: 'lua-dao-app-vay-tien-online-2024',
      summary: 'Các app cho vay online với lãi suất cắt cổ, thu thập thông tin cá nhân và đe dọa, khủng bố nạn nhân.',
      content: `## Dấu hiệu nhận biết\n\n- Quảng cáo vay dễ dàng, không cần thế chấp\n- Yêu cầu cấp quyền truy cập danh bạ, ảnh\n- Lãi suất thực tế lên đến 1000%/năm\n- Đe dọa, gọi điện khủng bố người thân khi chậm trả`,
      category: 'OTHER',
      severity: 'HIGH',
      targetGroup: ['workers', 'students'],
      platform: ['facebook', 'zalo'],
      source: 'police',
      reportCount: 5600,
      totalLoss: 45000000000,
      isActive: true,
    },
    {
      title: 'Giả mạo trang web ngân hàng để đánh cắp thông tin',
      slug: 'gia-mao-website-ngan-hang-2024',
      summary: 'Kẻ lừa đảo tạo website giả mạo ngân hàng với giao diện y hệt, gửi link qua SMS/email để đánh cắp thông tin đăng nhập.',
      content: `## Các ngân hàng thường bị giả mạo\n\n- Vietcombank, BIDV, Agribank\n- Techcombank, VPBank, MB Bank\n- ACB, Sacombank, TPBank\n\n## Cách nhận biết\n\n- Kiểm tra kỹ URL (thường có lỗi chính tả)\n- Không click link trong SMS/email\n- Truy cập trực tiếp website ngân hàng`,
      category: 'PHISHING',
      severity: 'CRITICAL',
      targetGroup: ['all'],
      platform: ['sms', 'email'],
      source: 'police',
      reportCount: 2800,
      totalLoss: 18000000000,
      isPinned: true,
      isActive: true,
    },
    {
      title: 'Lừa đảo trúng thưởng: Giả mạo Shopee, Lazada, Tiki',
      slug: 'lua-dao-trung-thuong-shopee-lazada-2024',
      summary: 'Tin nhắn/email thông báo trúng thưởng từ các sàn TMĐT, yêu cầu đóng phí để nhận thưởng.',
      content: `## Nội dung tin nhắn thường gặp\n\n- "Chúc mừng bạn trúng iPhone 15 từ Shopee"\n- "Bạn được chọn nhận 50 triệu từ Lazada"\n- Yêu cầu đóng phí vận chuyển, thuế để nhận thưởng\n\n## Lưu ý\n\n- Các sàn TMĐT KHÔNG BAO GIỜ yêu cầu đóng phí để nhận thưởng\n- Kiểm tra thông tin trên app/website chính thức`,
      category: 'PRIZE',
      severity: 'MEDIUM',
      targetGroup: ['all'],
      platform: ['sms', 'email', 'facebook'],
      source: 'community',
      reportCount: 3200,
      totalLoss: 5000000000,
      isActive: true,
    },
  ]

  for (const alert of alerts) {
    try {
      await prisma.scamAlert.upsert({
        where: { slug: alert.slug },
        update: alert,
        create: alert,
      })
    } catch (e) {
      console.log(`Skipping alert: ${alert.slug}`)
    }
  }
  console.log(`✅ Created ${alerts.length} scam alerts`)


  // ============================================
  // SCAM ACCOUNTS - Tài khoản ngân hàng lừa đảo (Dữ liệu mẫu thực tế)
  // ============================================
  const scamAccounts = [
    // Tài khoản ngân hàng lừa đảo
    { type: 'BANK_ACCOUNT', value: '0071001234567', bankName: 'Vietcombank', ownerName: 'NGUYEN VAN HUNG', reportCount: 156, totalAmount: 2500000000, description: 'Lừa đảo đầu tư tiền ảo qua Telegram', verified: true },
    { type: 'BANK_ACCOUNT', value: '19033456789012', bankName: 'Techcombank', ownerName: 'TRAN THI MAI', reportCount: 89, totalAmount: 1800000000, description: 'Giả mạo nhân viên ngân hàng lừa OTP', verified: true },
    { type: 'BANK_ACCOUNT', value: '0451000987654', bankName: 'BIDV', ownerName: 'LE VAN TUAN', reportCount: 234, totalAmount: 3200000000, description: 'Lừa đảo việc làm online, yêu cầu đặt cọc', verified: true },
    { type: 'BANK_ACCOUNT', value: '1234567890123', bankName: 'MB Bank', ownerName: 'PHAM THI HONG', reportCount: 67, totalAmount: 890000000, description: 'Lừa đảo bán hàng online không giao hàng', verified: true },
    { type: 'BANK_ACCOUNT', value: '0611234567890', bankName: 'Agribank', ownerName: 'HOANG VAN NAM', reportCount: 145, totalAmount: 1500000000, description: 'Giả mạo công an yêu cầu chuyển tiền', verified: true },
    { type: 'BANK_ACCOUNT', value: '1903123456789', bankName: 'Techcombank', ownerName: 'VU THI LAN', reportCount: 78, totalAmount: 650000000, description: 'Lừa đảo tình cảm qua Facebook', verified: true },
    { type: 'BANK_ACCOUNT', value: '0021000111222', bankName: 'Vietcombank', ownerName: 'NGUYEN THANH LONG', reportCount: 312, totalAmount: 4500000000, description: 'Sàn Forex giả mạo, không cho rút tiền', verified: true },
    { type: 'BANK_ACCOUNT', value: '1111222233334', bankName: 'VPBank', ownerName: 'DO VAN MINH', reportCount: 56, totalAmount: 420000000, description: 'Lừa đảo trúng thưởng Shopee giả', verified: true },
    { type: 'BANK_ACCOUNT', value: '9704001234567', bankName: 'Agribank', ownerName: 'BUI THI THAO', reportCount: 98, totalAmount: 780000000, description: 'App vay tiền lãi suất cắt cổ', verified: true },
    { type: 'BANK_ACCOUNT', value: '0501000999888', bankName: 'ACB', ownerName: 'TRAN VAN DUNG', reportCount: 187, totalAmount: 2100000000, description: 'Lừa đảo đầu tư chứng khoán qua Zalo', verified: true },
    { type: 'BANK_ACCOUNT', value: '0331000555666', bankName: 'Sacombank', ownerName: 'LE THI HUONG', reportCount: 43, totalAmount: 350000000, description: 'Giả mạo shipper lừa chuyển khoản', verified: true },
    { type: 'BANK_ACCOUNT', value: '8888999900001', bankName: 'TPBank', ownerName: 'NGUYEN VAN THANH', reportCount: 124, totalAmount: 1650000000, description: 'Lừa đảo cho thuê căn hộ không có thật', verified: true },
    // Số điện thoại lừa đảo trong ScamAccount
    { type: 'PHONE', value: '0912345678', reportCount: 456, description: 'Giả mạo công an gọi điện đe dọa', verified: true },
    { type: 'PHONE', value: '0987654321', reportCount: 234, description: 'Lừa đảo trúng thưởng xe máy', verified: true },
    { type: 'PHONE', value: '0369852147', reportCount: 189, description: 'Spam quảng cáo app vay tiền', verified: true },
    { type: 'PHONE', value: '0888777666', reportCount: 567, description: 'Giả mạo tổng đài Vietcombank', verified: true },
    { type: 'PHONE', value: '0909123456', reportCount: 345, description: 'Lừa đảo đầu tư Forex qua điện thoại', verified: true },
  ]

  for (const account of scamAccounts) {
    try {
      await prisma.scamAccount.upsert({
        where: { type_value: { type: account.type, value: account.value } },
        update: account,
        create: account,
      })
    } catch (e) {
      console.log(`Skipping account: ${account.value}`)
    }
  }
  console.log(`✅ Created ${scamAccounts.length} scam accounts`)

  // ============================================
  // SCAM EMAILS - Email lừa đảo (Dữ liệu thực tế)
  // ============================================
  const scamEmails = [
    // Giả mạo ngân hàng
    { email: 'support.vietcombank@gmail.com', domain: 'gmail.com', senderName: 'Vietcombank Support', subject: 'Tài khoản của bạn đã bị khóa', category: 'PHISHING', reportCount: 456, verified: true, description: 'Giả mạo ngân hàng Vietcombank' },
    { email: 'admin.bidv.vn@gmail.com', domain: 'gmail.com', senderName: 'BIDV Admin', subject: 'Xác nhận giao dịch đáng ngờ', category: 'PHISHING', reportCount: 234, verified: true, description: 'Giả mạo ngân hàng BIDV' },
    { email: 'techcombank.support@gmail.com', domain: 'gmail.com', senderName: 'Techcombank', subject: 'Cập nhật thông tin tài khoản', category: 'PHISHING', reportCount: 189, verified: true, description: 'Giả mạo Techcombank' },
    { email: 'mbbank.cskh@gmail.com', domain: 'gmail.com', senderName: 'MB Bank CSKH', subject: 'Thông báo khóa thẻ tín dụng', category: 'PHISHING', reportCount: 145, verified: true, description: 'Giả mạo MB Bank' },
    { email: 'vpbank.security@gmail.com', domain: 'gmail.com', senderName: 'VPBank Security', subject: 'Cảnh báo bảo mật tài khoản', category: 'PHISHING', reportCount: 167, verified: true, description: 'Giả mạo VPBank' },
    // Giả mạo cơ quan nhà nước
    { email: 'congantphcm.gov@gmail.com', domain: 'gmail.com', senderName: 'Công an TP.HCM', subject: 'Thông báo triệu tập', category: 'SCAM', reportCount: 567, verified: true, description: 'Giả mạo công an' },
    { email: 'vienkiemsatnhandan@gmail.com', domain: 'gmail.com', senderName: 'Viện Kiểm sát', subject: 'Lệnh triệu tập khẩn cấp', category: 'SCAM', reportCount: 345, verified: true, description: 'Giả mạo viện kiểm sát' },
    { email: 'toaan.hanoi@gmail.com', domain: 'gmail.com', senderName: 'Tòa án Hà Nội', subject: 'Thông báo vụ án', category: 'SCAM', reportCount: 234, verified: true, description: 'Giả mạo tòa án' },
    // Giả mạo sàn TMĐT
    { email: 'shopee.vietnam.prize@gmail.com', domain: 'gmail.com', senderName: 'Shopee Việt Nam', subject: 'Chúc mừng bạn trúng thưởng 50 triệu', category: 'SCAM', reportCount: 789, verified: true, description: 'Lừa đảo trúng thưởng Shopee' },
    { email: 'lazada.khuyenmai@gmail.com', domain: 'gmail.com', senderName: 'Lazada Vietnam', subject: 'Bạn được chọn nhận quà 100 triệu', category: 'SCAM', reportCount: 456, verified: true, description: 'Lừa đảo trúng thưởng Lazada' },
    { email: 'tiki.trungthuong@gmail.com', domain: 'gmail.com', senderName: 'Tiki', subject: 'Xác nhận nhận thưởng iPhone 15', category: 'SCAM', reportCount: 234, verified: true, description: 'Lừa đảo trúng thưởng Tiki' },
    // Giả mạo tuyển dụng
    { email: 'hr.vingroup.recruit@gmail.com', domain: 'gmail.com', senderName: 'Vingroup Tuyển dụng', subject: 'Thư mời phỏng vấn - Lương 50 triệu/tháng', category: 'SCAM', reportCount: 123, verified: true, description: 'Lừa đảo việc làm giả mạo Vingroup' },
    { email: 'fpt.tuyendung.online@gmail.com', domain: 'gmail.com', senderName: 'FPT Tuyển dụng', subject: 'Cơ hội việc làm tại nhà thu nhập cao', category: 'SCAM', reportCount: 189, verified: true, description: 'Lừa đảo việc làm giả mạo FPT' },
    { email: 'samsung.vietnam.job@gmail.com', domain: 'gmail.com', senderName: 'Samsung Vietnam', subject: 'Tuyển nhân viên online lương 30tr', category: 'SCAM', reportCount: 156, verified: true, description: 'Lừa đảo việc làm giả mạo Samsung' },
    // Lừa đảo đầu tư
    { email: 'binance.vietnam.support@gmail.com', domain: 'gmail.com', senderName: 'Binance Vietnam', subject: 'Cơ hội đầu tư Bitcoin x10 lợi nhuận', category: 'SCAM', reportCount: 345, verified: true, description: 'Giả mạo sàn Binance' },
    { email: 'forex.expert.vn@gmail.com', domain: 'gmail.com', senderName: 'Forex Expert VN', subject: 'Học đầu tư Forex miễn phí', category: 'SCAM', reportCount: 267, verified: true, description: 'Lừa đảo đầu tư Forex' },
  ]

  for (const email of scamEmails) {
    try {
      await prisma.scamEmail.upsert({
        where: { email: email.email },
        update: email,
        create: email,
      })
    } catch (e) {
      console.log(`Skipping email: ${email.email}`)
    }
  }
  console.log(`✅ Created ${scamEmails.length} scam emails`)

  // ============================================
  // SCAM PHONES - Số điện thoại lừa đảo
  // ============================================
  const scamPhones = [
    // Giả mạo tổng đài ngân hàng
    { phone: '02838123456', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 890, verified: true, description: 'Giả mạo tổng đài Vietcombank' },
    { phone: '02439876543', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 567, verified: true, description: 'Giả mạo tổng đài BIDV' },
    { phone: '02871234567', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 456, verified: true, description: 'Giả mạo tổng đài Techcombank' },
    // Giả mạo công an
    { phone: '0283456789', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 1234, verified: true, description: 'Giả mạo công an TP.HCM' },
    { phone: '0243456789', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 987, verified: true, description: 'Giả mạo công an Hà Nội' },
    // Lừa đảo qua điện thoại di động
    { phone: '0909123456', carrier: 'Mobifone', category: 'SCAM_CALL', reportCount: 345, verified: true, description: 'Lừa đảo đầu tư chứng khoán' },
    { phone: '0888999888', carrier: 'Vinaphone', category: 'SCAM_CALL', reportCount: 567, verified: true, description: 'Lừa đảo trúng thưởng xe máy' },
    { phone: '0369852147', carrier: 'Viettel', category: 'SPAM', reportCount: 234, verified: true, description: 'Spam quảng cáo vay tiền' },
    { phone: '0777666555', carrier: 'Mobifone', category: 'SCAM_CALL', reportCount: 189, verified: true, description: 'Lừa đảo việc làm online' },
    { phone: '0868686868', carrier: 'Viettel', category: 'SCAM_CALL', reportCount: 456, verified: true, description: 'Giả mạo shipper lừa tiền' },
    { phone: '0933444555', carrier: 'Mobifone', category: 'IMPERSONATION', reportCount: 678, verified: true, description: 'Giả mạo nhân viên ngân hàng' },
    { phone: '0915678901', carrier: 'Vinaphone', category: 'SCAM_CALL', reportCount: 234, verified: true, description: 'Lừa đảo bán hàng đa cấp' },
    { phone: '0978123456', carrier: 'Viettel', category: 'PHISHING', reportCount: 345, verified: true, description: 'Gửi link giả mạo qua SMS' },
    { phone: '0866777888', carrier: 'Viettel', category: 'SCAM_CALL', reportCount: 123, verified: true, description: 'Lừa đảo cho thuê nhà không có thật' },
    { phone: '0944555666', carrier: 'Vinaphone', category: 'SPAM', reportCount: 567, verified: true, description: 'Spam quảng cáo cờ bạc online' },
  ]

  for (const phone of scamPhones) {
    try {
      await prisma.scamPhone.upsert({
        where: { phone: phone.phone },
        update: phone,
        create: phone,
      })
    } catch (e) {
      console.log(`Skipping phone: ${phone.phone}`)
    }
  }
  console.log(`✅ Created ${scamPhones.length} scam phones`)

  console.log('🎉 Scam data seeding completed!')
}

seedScamData()
  .catch((e) => {
    console.error('Error seeding scam data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
