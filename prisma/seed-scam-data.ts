import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedScamData() {
  console.log('🌱 Seeding scam data...')

  // ============================================
  // SCAM ACCOUNTS - Tài khoản ngân hàng lừa đảo (100+ records)
  // ============================================
  const scamAccounts = [
    // Vietcombank
    { type: 'BANK_ACCOUNT', value: '0071001234567', bankName: 'Vietcombank', ownerName: 'NGUYEN VAN HUNG', reportCount: 156, totalAmount: 2500000000, description: 'Lừa đảo đầu tư tiền ảo qua Telegram', verified: true },
    { type: 'BANK_ACCOUNT', value: '0021000111222', bankName: 'Vietcombank', ownerName: 'NGUYEN THANH LONG', reportCount: 312, totalAmount: 4500000000, description: 'Sàn Forex giả mạo, không cho rút tiền', verified: true },
    { type: 'BANK_ACCOUNT', value: '0071000888999', bankName: 'Vietcombank', ownerName: 'TRAN VAN BINH', reportCount: 89, totalAmount: 1200000000, description: 'Giả mạo công an yêu cầu chuyển tiền điều tra', verified: true },
    { type: 'BANK_ACCOUNT', value: '0011003456789', bankName: 'Vietcombank', ownerName: 'LE THI HIEN', reportCount: 67, totalAmount: 890000000, description: 'Lừa đảo bán hàng online Shopee giả', verified: true },
    { type: 'BANK_ACCOUNT', value: '0071002345678', bankName: 'Vietcombank', ownerName: 'PHAM MINH TUAN', reportCount: 234, totalAmount: 3100000000, description: 'Lừa đảo đầu tư chứng khoán qua Zalo', verified: true },
    { type: 'BANK_ACCOUNT', value: '0021000567890', bankName: 'Vietcombank', ownerName: 'HOANG VAN CUONG', reportCount: 145, totalAmount: 1800000000, description: 'Giả mạo nhân viên ngân hàng lừa OTP', verified: true },
    // Techcombank
    { type: 'BANK_ACCOUNT', value: '19033456789012', bankName: 'Techcombank', ownerName: 'TRAN THI MAI', reportCount: 89, totalAmount: 1800000000, description: 'Giả mạo nhân viên ngân hàng lừa OTP', verified: true },
    { type: 'BANK_ACCOUNT', value: '1903123456789', bankName: 'Techcombank', ownerName: 'VU THI LAN', reportCount: 78, totalAmount: 650000000, description: 'Lừa đảo tình cảm qua Facebook', verified: true },
    { type: 'BANK_ACCOUNT', value: '19031111222233', bankName: 'Techcombank', ownerName: 'DO VAN THANH', reportCount: 123, totalAmount: 1500000000, description: 'Lừa đảo việc làm online yêu cầu đặt cọc', verified: true },
    { type: 'BANK_ACCOUNT', value: '19034567890123', bankName: 'Techcombank', ownerName: 'NGUYEN THI HONG', reportCount: 98, totalAmount: 980000000, description: 'Lừa đảo trúng thưởng Lazada giả', verified: true },
    { type: 'BANK_ACCOUNT', value: '19035678901234', bankName: 'Techcombank', ownerName: 'BUI VAN NAM', reportCount: 167, totalAmount: 2200000000, description: 'Sàn Binary Option lừa đảo', verified: true },
    // BIDV
    { type: 'BANK_ACCOUNT', value: '0451000987654', bankName: 'BIDV', ownerName: 'LE VAN TUAN', reportCount: 234, totalAmount: 3200000000, description: 'Lừa đảo việc làm online, yêu cầu đặt cọc', verified: true },
    { type: 'BANK_ACCOUNT', value: '4510001234567', bankName: 'BIDV', ownerName: 'TRAN MINH DUC', reportCount: 156, totalAmount: 1900000000, description: 'Giả mạo viện kiểm sát gọi điện đe dọa', verified: true },
    { type: 'BANK_ACCOUNT', value: '4510002345678', bankName: 'BIDV', ownerName: 'NGUYEN VAN PHONG', reportCount: 89, totalAmount: 1100000000, description: 'Lừa đảo cho vay online lãi suất cắt cổ', verified: true },
    { type: 'BANK_ACCOUNT', value: '4510003456789', bankName: 'BIDV', ownerName: 'LE THI THUY', reportCount: 201, totalAmount: 2800000000, description: 'Lừa đảo đầu tư Bitcoin qua Telegram', verified: true },
    { type: 'BANK_ACCOUNT', value: '4510004567890', bankName: 'BIDV', ownerName: 'PHAM VAN HUNG', reportCount: 134, totalAmount: 1650000000, description: 'Giả mạo shipper lừa chuyển khoản', verified: true },
    // MB Bank
    { type: 'BANK_ACCOUNT', value: '1234567890123', bankName: 'MB Bank', ownerName: 'PHAM THI HONG', reportCount: 67, totalAmount: 890000000, description: 'Lừa đảo bán hàng online không giao hàng', verified: true },
    { type: 'BANK_ACCOUNT', value: '0801234567890', bankName: 'MB Bank', ownerName: 'NGUYEN VAN KHANH', reportCount: 189, totalAmount: 2400000000, description: 'Lừa đảo đầu tư Forex qua Facebook', verified: true },
    { type: 'BANK_ACCOUNT', value: '0802345678901', bankName: 'MB Bank', ownerName: 'TRAN THI LOAN', reportCount: 112, totalAmount: 1350000000, description: 'Giả mạo tổng đài ngân hàng', verified: true },
    { type: 'BANK_ACCOUNT', value: '0803456789012', bankName: 'MB Bank', ownerName: 'LE VAN DUNG', reportCount: 78, totalAmount: 920000000, description: 'Lừa đảo cho thuê nhà không có thật', verified: true },
    { type: 'BANK_ACCOUNT', value: '0804567890123', bankName: 'MB Bank', ownerName: 'HOANG THI MAI', reportCount: 145, totalAmount: 1780000000, description: 'Lừa đảo bán vé máy bay giả', verified: true },
    // Agribank
    { type: 'BANK_ACCOUNT', value: '0611234567890', bankName: 'Agribank', ownerName: 'HOANG VAN NAM', reportCount: 145, totalAmount: 1500000000, description: 'Giả mạo công an yêu cầu chuyển tiền', verified: true },
    { type: 'BANK_ACCOUNT', value: '9704001234567', bankName: 'Agribank', ownerName: 'BUI THI THAO', reportCount: 98, totalAmount: 780000000, description: 'App vay tiền lãi suất cắt cổ', verified: true },
    { type: 'BANK_ACCOUNT', value: '6100012345678', bankName: 'Agribank', ownerName: 'NGUYEN VAN TIEN', reportCount: 167, totalAmount: 2100000000, description: 'Lừa đảo đầu tư nông sản', verified: true },
    { type: 'BANK_ACCOUNT', value: '6100023456789', bankName: 'Agribank', ownerName: 'TRAN THI HUONG', reportCount: 89, totalAmount: 1050000000, description: 'Giả mạo cán bộ xã lừa tiền hỗ trợ', verified: true },
    { type: 'BANK_ACCOUNT', value: '6100034567890', bankName: 'Agribank', ownerName: 'LE VAN MINH', reportCount: 234, totalAmount: 3500000000, description: 'Lừa đảo mua bán đất đai', verified: true },
    // VPBank
    { type: 'BANK_ACCOUNT', value: '1111222233334', bankName: 'VPBank', ownerName: 'DO VAN MINH', reportCount: 56, totalAmount: 420000000, description: 'Lừa đảo trúng thưởng Shopee giả', verified: true },
    { type: 'BANK_ACCOUNT', value: '1112223334445', bankName: 'VPBank', ownerName: 'NGUYEN THI LAN', reportCount: 123, totalAmount: 1450000000, description: 'Lừa đảo đầu tư tiền ảo Binance giả', verified: true },
    { type: 'BANK_ACCOUNT', value: '1113334445556', bankName: 'VPBank', ownerName: 'TRAN VAN HUNG', reportCount: 89, totalAmount: 980000000, description: 'Giả mạo nhân viên bảo hiểm', verified: true },
    { type: 'BANK_ACCOUNT', value: '1114445556667', bankName: 'VPBank', ownerName: 'LE THI NGOC', reportCount: 167, totalAmount: 2050000000, description: 'Lừa đảo việc làm tại nhà', verified: true },
    // ACB
    { type: 'BANK_ACCOUNT', value: '0501000999888', bankName: 'ACB', ownerName: 'TRAN VAN DUNG', reportCount: 187, totalAmount: 2100000000, description: 'Lừa đảo đầu tư chứng khoán qua Zalo', verified: true },
    { type: 'BANK_ACCOUNT', value: '0501001234567', bankName: 'ACB', ownerName: 'NGUYEN THI HIEN', reportCount: 134, totalAmount: 1650000000, description: 'Lừa đảo bán hàng đa cấp', verified: true },
    { type: 'BANK_ACCOUNT', value: '0501002345678', bankName: 'ACB', ownerName: 'PHAM VAN LONG', reportCount: 98, totalAmount: 1120000000, description: 'Giả mạo tổng đài điện lực', verified: true },
    { type: 'BANK_ACCOUNT', value: '0501003456789', bankName: 'ACB', ownerName: 'LE THI THANH', reportCount: 212, totalAmount: 2800000000, description: 'Lừa đảo đầu tư bất động sản', verified: true },
    // Sacombank
    { type: 'BANK_ACCOUNT', value: '0331000555666', bankName: 'Sacombank', ownerName: 'LE THI HUONG', reportCount: 43, totalAmount: 350000000, description: 'Giả mạo shipper lừa chuyển khoản', verified: true },
    { type: 'BANK_ACCOUNT', value: '0331001234567', bankName: 'Sacombank', ownerName: 'NGUYEN VAN BINH', reportCount: 156, totalAmount: 1890000000, description: 'Lừa đảo đầu tư vàng online', verified: true },
    { type: 'BANK_ACCOUNT', value: '0331002345678', bankName: 'Sacombank', ownerName: 'TRAN THI MAI', reportCount: 89, totalAmount: 1050000000, description: 'Giả mạo nhân viên thuế', verified: true },
    // TPBank
    { type: 'BANK_ACCOUNT', value: '8888999900001', bankName: 'TPBank', ownerName: 'NGUYEN VAN THANH', reportCount: 124, totalAmount: 1650000000, description: 'Lừa đảo cho thuê căn hộ không có thật', verified: true },
    { type: 'BANK_ACCOUNT', value: '8889000011112', bankName: 'TPBank', ownerName: 'LE THI HONG', reportCount: 178, totalAmount: 2200000000, description: 'Lừa đảo đầu tư crypto qua app giả', verified: true },
    { type: 'BANK_ACCOUNT', value: '8889111122223', bankName: 'TPBank', ownerName: 'PHAM VAN CUONG', reportCount: 67, totalAmount: 780000000, description: 'Giả mạo cửa hàng điện thoại', verified: true },
    // VIB
    { type: 'BANK_ACCOUNT', value: '6012345678901', bankName: 'VIB', ownerName: 'HOANG VAN TUAN', reportCount: 145, totalAmount: 1780000000, description: 'Lừa đảo đầu tư chứng khoán phái sinh', verified: true },
    { type: 'BANK_ACCOUNT', value: '6023456789012', bankName: 'VIB', ownerName: 'NGUYEN THI THAO', reportCount: 98, totalAmount: 1150000000, description: 'Giả mạo nhân viên ngân hàng', verified: true },
    // SHB
    { type: 'BANK_ACCOUNT', value: '1001234567890', bankName: 'SHB', ownerName: 'TRAN VAN PHONG', reportCount: 167, totalAmount: 2050000000, description: 'Lừa đảo đầu tư dự án BĐS', verified: true },
    { type: 'BANK_ACCOUNT', value: '1002345678901', bankName: 'SHB', ownerName: 'LE THI LAN', reportCount: 89, totalAmount: 980000000, description: 'Lừa đảo bán xe máy cũ', verified: true },
    // HDBank
    { type: 'BANK_ACCOUNT', value: '2201234567890', bankName: 'HDBank', ownerName: 'NGUYEN VAN HUNG', reportCount: 134, totalAmount: 1650000000, description: 'Lừa đảo đầu tư tiền ảo', verified: true },
    { type: 'BANK_ACCOUNT', value: '2202345678901', bankName: 'HDBank', ownerName: 'PHAM THI NGOC', reportCount: 78, totalAmount: 890000000, description: 'Giả mạo tổng đài VNPT', verified: true },
    // OCB
    { type: 'BANK_ACCOUNT', value: '3301234567890', bankName: 'OCB', ownerName: 'LE VAN DUNG', reportCount: 112, totalAmount: 1350000000, description: 'Lừa đảo việc làm part-time', verified: true },
    { type: 'BANK_ACCOUNT', value: '3302345678901', bankName: 'OCB', ownerName: 'TRAN THI HUONG', reportCount: 67, totalAmount: 780000000, description: 'Giả mạo cửa hàng online', verified: true },
    // MSB
    { type: 'BANK_ACCOUNT', value: '4401234567890', bankName: 'MSB', ownerName: 'HOANG VAN NAM', reportCount: 189, totalAmount: 2350000000, description: 'Lừa đảo đầu tư Forex', verified: true },
    { type: 'BANK_ACCOUNT', value: '4402345678901', bankName: 'MSB', ownerName: 'NGUYEN THI MAI', reportCount: 98, totalAmount: 1120000000, description: 'Lừa đảo bán hàng qua livestream', verified: true },
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
  // SCAM EMAILS - Email lừa đảo (80+ records)
  // ============================================
  const scamEmails = [
    // Giả mạo ngân hàng
    { email: 'support.vietcombank@gmail.com', domain: 'gmail.com', senderName: 'Vietcombank Support', subject: 'Tài khoản của bạn đã bị khóa', category: 'PHISHING', reportCount: 456, verified: true, description: 'Giả mạo ngân hàng Vietcombank' },
    { email: 'admin.bidv.vn@gmail.com', domain: 'gmail.com', senderName: 'BIDV Admin', subject: 'Xác nhận giao dịch đáng ngờ', category: 'PHISHING', reportCount: 234, verified: true, description: 'Giả mạo ngân hàng BIDV' },
    { email: 'techcombank.support@gmail.com', domain: 'gmail.com', senderName: 'Techcombank', subject: 'Cập nhật thông tin tài khoản', category: 'PHISHING', reportCount: 189, verified: true, description: 'Giả mạo Techcombank' },
    { email: 'mbbank.cskh@gmail.com', domain: 'gmail.com', senderName: 'MB Bank CSKH', subject: 'Thông báo khóa thẻ tín dụng', category: 'PHISHING', reportCount: 145, verified: true, description: 'Giả mạo MB Bank' },
    { email: 'vpbank.security@gmail.com', domain: 'gmail.com', senderName: 'VPBank Security', subject: 'Cảnh báo bảo mật tài khoản', category: 'PHISHING', reportCount: 167, verified: true, description: 'Giả mạo VPBank' },
    { email: 'agribank.hotro@gmail.com', domain: 'gmail.com', senderName: 'Agribank Hỗ trợ', subject: 'Xác minh tài khoản ngay', category: 'PHISHING', reportCount: 198, verified: true, description: 'Giả mạo Agribank' },
    { email: 'acb.banking@gmail.com', domain: 'gmail.com', senderName: 'ACB Banking', subject: 'Tài khoản bị giới hạn giao dịch', category: 'PHISHING', reportCount: 134, verified: true, description: 'Giả mạo ACB' },
    { email: 'sacombank.alert@gmail.com', domain: 'gmail.com', senderName: 'Sacombank Alert', subject: 'Phát hiện đăng nhập bất thường', category: 'PHISHING', reportCount: 112, verified: true, description: 'Giả mạo Sacombank' },
    { email: 'tpbank.verify@gmail.com', domain: 'gmail.com', senderName: 'TPBank Verify', subject: 'Xác thực tài khoản eBank', category: 'PHISHING', reportCount: 89, verified: true, description: 'Giả mạo TPBank' },
    { email: 'vib.support@gmail.com', domain: 'gmail.com', senderName: 'VIB Support', subject: 'Cập nhật thông tin KYC', category: 'PHISHING', reportCount: 78, verified: true, description: 'Giả mạo VIB' },
    // Giả mạo cơ quan nhà nước
    { email: 'congantphcm.gov@gmail.com', domain: 'gmail.com', senderName: 'Công an TP.HCM', subject: 'Thông báo triệu tập', category: 'SCAM', reportCount: 567, verified: true, description: 'Giả mạo công an' },
    { email: 'vienkiemsatnhandan@gmail.com', domain: 'gmail.com', senderName: 'Viện Kiểm sát', subject: 'Lệnh triệu tập khẩn cấp', category: 'SCAM', reportCount: 345, verified: true, description: 'Giả mạo viện kiểm sát' },
    { email: 'toaan.hanoi@gmail.com', domain: 'gmail.com', senderName: 'Tòa án Hà Nội', subject: 'Thông báo vụ án', category: 'SCAM', reportCount: 234, verified: true, description: 'Giả mạo tòa án' },
    { email: 'bocongan.vn@gmail.com', domain: 'gmail.com', senderName: 'Bộ Công an', subject: 'Thông báo vi phạm pháp luật', category: 'SCAM', reportCount: 456, verified: true, description: 'Giả mạo Bộ Công an' },
    { email: 'cucthue.gov@gmail.com', domain: 'gmail.com', senderName: 'Cục Thuế', subject: 'Thông báo nợ thuế', category: 'SCAM', reportCount: 289, verified: true, description: 'Giả mạo cục thuế' },
    { email: 'bhxh.vietnam@gmail.com', domain: 'gmail.com', senderName: 'BHXH Việt Nam', subject: 'Hoàn tiền bảo hiểm', category: 'SCAM', reportCount: 178, verified: true, description: 'Giả mạo bảo hiểm xã hội' },
    { email: 'dichvucong.gov@gmail.com', domain: 'gmail.com', senderName: 'Dịch vụ công', subject: 'Xác nhận hồ sơ trực tuyến', category: 'SCAM', reportCount: 145, verified: true, description: 'Giả mạo dịch vụ công' },
    // Giả mạo sàn TMĐT
    { email: 'shopee.vietnam.prize@gmail.com', domain: 'gmail.com', senderName: 'Shopee Việt Nam', subject: 'Chúc mừng bạn trúng thưởng 50 triệu', category: 'SCAM', reportCount: 789, verified: true, description: 'Lừa đảo trúng thưởng Shopee' },
    { email: 'lazada.khuyenmai@gmail.com', domain: 'gmail.com', senderName: 'Lazada Vietnam', subject: 'Bạn được chọn nhận quà 100 triệu', category: 'SCAM', reportCount: 456, verified: true, description: 'Lừa đảo trúng thưởng Lazada' },
    { email: 'tiki.trungthuong@gmail.com', domain: 'gmail.com', senderName: 'Tiki', subject: 'Xác nhận nhận thưởng iPhone 15', category: 'SCAM', reportCount: 234, verified: true, description: 'Lừa đảo trúng thưởng Tiki' },
    { email: 'sendo.gift@gmail.com', domain: 'gmail.com', senderName: 'Sendo', subject: 'Quà tặng đặc biệt cho bạn', category: 'SCAM', reportCount: 167, verified: true, description: 'Lừa đảo trúng thưởng Sendo' },
    { email: 'shopee.seller@gmail.com', domain: 'gmail.com', senderName: 'Shopee Seller', subject: 'Đơn hàng của bạn có vấn đề', category: 'PHISHING', reportCount: 345, verified: true, description: 'Giả mạo Shopee seller' },
    { email: 'lazada.delivery@gmail.com', domain: 'gmail.com', senderName: 'Lazada Delivery', subject: 'Xác nhận địa chỉ giao hàng', category: 'PHISHING', reportCount: 234, verified: true, description: 'Giả mạo Lazada giao hàng' },
    // Giả mạo tuyển dụng
    { email: 'hr.vingroup.recruit@gmail.com', domain: 'gmail.com', senderName: 'Vingroup Tuyển dụng', subject: 'Thư mời phỏng vấn - Lương 50 triệu/tháng', category: 'SCAM', reportCount: 123, verified: true, description: 'Lừa đảo việc làm giả mạo Vingroup' },
    { email: 'fpt.tuyendung.online@gmail.com', domain: 'gmail.com', senderName: 'FPT Tuyển dụng', subject: 'Cơ hội việc làm tại nhà thu nhập cao', category: 'SCAM', reportCount: 189, verified: true, description: 'Lừa đảo việc làm giả mạo FPT' },
    { email: 'samsung.vietnam.job@gmail.com', domain: 'gmail.com', senderName: 'Samsung Vietnam', subject: 'Tuyển nhân viên online lương 30tr', category: 'SCAM', reportCount: 156, verified: true, description: 'Lừa đảo việc làm giả mạo Samsung' },
    { email: 'viettel.hr@gmail.com', domain: 'gmail.com', senderName: 'Viettel HR', subject: 'Tuyển dụng gấp - Không cần kinh nghiệm', category: 'SCAM', reportCount: 234, verified: true, description: 'Lừa đảo việc làm giả mạo Viettel' },
    { email: 'grab.driver.vn@gmail.com', domain: 'gmail.com', senderName: 'Grab Vietnam', subject: 'Đăng ký tài xế - Thu nhập 20tr/tháng', category: 'SCAM', reportCount: 178, verified: true, description: 'Lừa đảo việc làm giả mạo Grab' },
    { email: 'shopee.affiliate@gmail.com', domain: 'gmail.com', senderName: 'Shopee Affiliate', subject: 'Kiếm tiền online với Shopee', category: 'SCAM', reportCount: 289, verified: true, description: 'Lừa đảo affiliate Shopee giả' },
    { email: 'amazon.vietnam.job@gmail.com', domain: 'gmail.com', senderName: 'Amazon Vietnam', subject: 'Việc làm tại nhà - Amazon', category: 'SCAM', reportCount: 145, verified: true, description: 'Lừa đảo việc làm giả mạo Amazon' },
    // Lừa đảo đầu tư
    { email: 'binance.vietnam.support@gmail.com', domain: 'gmail.com', senderName: 'Binance Vietnam', subject: 'Cơ hội đầu tư Bitcoin x10 lợi nhuận', category: 'SCAM', reportCount: 345, verified: true, description: 'Giả mạo sàn Binance' },
    { email: 'forex.expert.vn@gmail.com', domain: 'gmail.com', senderName: 'Forex Expert VN', subject: 'Học đầu tư Forex miễn phí', category: 'SCAM', reportCount: 267, verified: true, description: 'Lừa đảo đầu tư Forex' },
    { email: 'crypto.invest.vn@gmail.com', domain: 'gmail.com', senderName: 'Crypto Invest VN', subject: 'Đầu tư crypto lợi nhuận 30%/tháng', category: 'SCAM', reportCount: 389, verified: true, description: 'Lừa đảo đầu tư crypto' },
    { email: 'bitcoin.vn.trade@gmail.com', domain: 'gmail.com', senderName: 'Bitcoin VN Trade', subject: 'Nhận 0.1 BTC miễn phí', category: 'SCAM', reportCount: 234, verified: true, description: 'Lừa đảo Bitcoin giả' },
    { email: 'stock.expert.vn@gmail.com', domain: 'gmail.com', senderName: 'Stock Expert VN', subject: 'Mã cổ phiếu x3 trong tuần', category: 'SCAM', reportCount: 178, verified: true, description: 'Lừa đảo chứng khoán' },
    { email: 'gold.invest.vn@gmail.com', domain: 'gmail.com', senderName: 'Gold Invest VN', subject: 'Đầu tư vàng online an toàn', category: 'SCAM', reportCount: 145, verified: true, description: 'Lừa đảo đầu tư vàng' },
    // Lừa đảo khác
    { email: 'vietlott.trungthuong@gmail.com', domain: 'gmail.com', senderName: 'Vietlott', subject: 'Chúc mừng bạn trúng Jackpot', category: 'SCAM', reportCount: 567, verified: true, description: 'Lừa đảo trúng xổ số' },
    { email: 'momo.gift@gmail.com', domain: 'gmail.com', senderName: 'MoMo', subject: 'Nhận 500k vào ví MoMo', category: 'SCAM', reportCount: 345, verified: true, description: 'Lừa đảo giả mạo MoMo' },
    { email: 'zalopay.bonus@gmail.com', domain: 'gmail.com', senderName: 'ZaloPay', subject: 'Hoàn tiền 100% đơn hàng', category: 'SCAM', reportCount: 234, verified: true, description: 'Lừa đảo giả mạo ZaloPay' },
    { email: 'vnpay.refund@gmail.com', domain: 'gmail.com', senderName: 'VNPAY', subject: 'Hoàn tiền giao dịch thất bại', category: 'PHISHING', reportCount: 189, verified: true, description: 'Giả mạo VNPAY' },
    { email: 'vietjet.promo@gmail.com', domain: 'gmail.com', senderName: 'Vietjet Air', subject: 'Vé máy bay 0 đồng', category: 'SCAM', reportCount: 267, verified: true, description: 'Lừa đảo vé máy bay giả' },
    { email: 'vietnam.airlines.gift@gmail.com', domain: 'gmail.com', senderName: 'Vietnam Airlines', subject: 'Tặng vé máy bay miễn phí', category: 'SCAM', reportCount: 178, verified: true, description: 'Lừa đảo Vietnam Airlines giả' },
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
  // SCAM PHONES - Số điện thoại lừa đảo (80+ records)
  // ============================================
  const scamPhones = [
    // Giả mạo tổng đài ngân hàng
    { phone: '02838123456', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 890, verified: true, description: 'Giả mạo tổng đài Vietcombank' },
    { phone: '02439876543', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 567, verified: true, description: 'Giả mạo tổng đài BIDV' },
    { phone: '02871234567', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 456, verified: true, description: 'Giả mạo tổng đài Techcombank' },
    { phone: '02836789012', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 345, verified: true, description: 'Giả mạo tổng đài MB Bank' },
    { phone: '02437890123', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 289, verified: true, description: 'Giả mạo tổng đài Agribank' },
    { phone: '02838901234', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 234, verified: true, description: 'Giả mạo tổng đài VPBank' },
    { phone: '02439012345', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 198, verified: true, description: 'Giả mạo tổng đài ACB' },
    { phone: '02870123456', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 167, verified: true, description: 'Giả mạo tổng đài Sacombank' },
    // Giả mạo công an
    { phone: '0283456789', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 1234, verified: true, description: 'Giả mạo công an TP.HCM' },
    { phone: '0243456789', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 987, verified: true, description: 'Giả mạo công an Hà Nội' },
    { phone: '0283567890', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 756, verified: true, description: 'Giả mạo viện kiểm sát TP.HCM' },
    { phone: '0243567890', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 654, verified: true, description: 'Giả mạo viện kiểm sát Hà Nội' },
    { phone: '0283678901', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 543, verified: true, description: 'Giả mạo tòa án TP.HCM' },
    { phone: '0243678901', carrier: 'Landline', category: 'IMPERSONATION', reportCount: 432, verified: true, description: 'Giả mạo tòa án Hà Nội' },
    // Lừa đảo qua điện thoại di động - Viettel
    { phone: '0961234567', carrier: 'Viettel', category: 'SCAM_CALL', reportCount: 456, verified: true, description: 'Lừa đảo đầu tư chứng khoán' },
    { phone: '0962345678', carrier: 'Viettel', category: 'SCAM_CALL', reportCount: 389, verified: true, description: 'Lừa đảo trúng thưởng xe máy' },
    { phone: '0963456789', carrier: 'Viettel', category: 'SPAM', reportCount: 567, verified: true, description: 'Spam quảng cáo vay tiền' },
    { phone: '0964567890', carrier: 'Viettel', category: 'SCAM_CALL', reportCount: 345, verified: true, description: 'Lừa đảo việc làm online' },
    { phone: '0865678901', carrier: 'Viettel', category: 'IMPERSONATION', reportCount: 678, verified: true, description: 'Giả mạo nhân viên ngân hàng' },
    { phone: '0866789012', carrier: 'Viettel', category: 'SCAM_CALL', reportCount: 234, verified: true, description: 'Lừa đảo bán hàng đa cấp' },
    { phone: '0867890123', carrier: 'Viettel', category: 'PHISHING', reportCount: 456, verified: true, description: 'Gửi link giả mạo qua SMS' },
    { phone: '0868901234', carrier: 'Viettel', category: 'SCAM_CALL', reportCount: 345, verified: true, description: 'Lừa đảo cho thuê nhà' },
    { phone: '0329012345', carrier: 'Viettel', category: 'SPAM', reportCount: 567, verified: true, description: 'Spam quảng cáo cờ bạc online' },
    { phone: '0330123456', carrier: 'Viettel', category: 'SCAM_CALL', reportCount: 234, verified: true, description: 'Lừa đảo đầu tư crypto' },
    { phone: '0331234567', carrier: 'Viettel', category: 'IMPERSONATION', reportCount: 456, verified: true, description: 'Giả mạo shipper' },
    { phone: '0332345678', carrier: 'Viettel', category: 'SCAM_CALL', reportCount: 345, verified: true, description: 'Lừa đảo bán vé máy bay' },
    // Mobifone
    { phone: '0901234567', carrier: 'Mobifone', category: 'SCAM_CALL', reportCount: 567, verified: true, description: 'Lừa đảo đầu tư Forex' },
    { phone: '0902345678', carrier: 'Mobifone', category: 'IMPERSONATION', reportCount: 456, verified: true, description: 'Giả mạo tổng đài điện lực' },
    { phone: '0903456789', carrier: 'Mobifone', category: 'SCAM_CALL', reportCount: 389, verified: true, description: 'Lừa đảo trúng thưởng Shopee' },
    { phone: '0904567890', carrier: 'Mobifone', category: 'SPAM', reportCount: 678, verified: true, description: 'Spam quảng cáo app vay' },
    { phone: '0935678901', carrier: 'Mobifone', category: 'SCAM_CALL', reportCount: 345, verified: true, description: 'Lừa đảo bán hàng online' },
    { phone: '0936789012', carrier: 'Mobifone', category: 'IMPERSONATION', reportCount: 456, verified: true, description: 'Giả mạo nhân viên bảo hiểm' },
    { phone: '0937890123', carrier: 'Mobifone', category: 'SCAM_CALL', reportCount: 234, verified: true, description: 'Lừa đảo đầu tư BĐS' },
    { phone: '0938901234', carrier: 'Mobifone', category: 'PHISHING', reportCount: 567, verified: true, description: 'Gửi link lừa đảo qua Zalo' },
    { phone: '0769012345', carrier: 'Mobifone', category: 'SCAM_CALL', reportCount: 345, verified: true, description: 'Lừa đảo việc làm tại nhà' },
    { phone: '0770123456', carrier: 'Mobifone', category: 'SPAM', reportCount: 456, verified: true, description: 'Spam quảng cáo đầu tư' },
    // Vinaphone
    { phone: '0911234567', carrier: 'Vinaphone', category: 'SCAM_CALL', reportCount: 456, verified: true, description: 'Lừa đảo đầu tư tiền ảo' },
    { phone: '0912345678', carrier: 'Vinaphone', category: 'IMPERSONATION', reportCount: 567, verified: true, description: 'Giả mạo công an gọi điện' },
    { phone: '0913456789', carrier: 'Vinaphone', category: 'SCAM_CALL', reportCount: 389, verified: true, description: 'Lừa đảo trúng thưởng Lazada' },
    { phone: '0914567890', carrier: 'Vinaphone', category: 'SPAM', reportCount: 678, verified: true, description: 'Spam quảng cáo vay nóng' },
    { phone: '0885678901', carrier: 'Vinaphone', category: 'SCAM_CALL', reportCount: 345, verified: true, description: 'Lừa đảo bán xe cũ' },
    { phone: '0886789012', carrier: 'Vinaphone', category: 'IMPERSONATION', reportCount: 456, verified: true, description: 'Giả mạo nhân viên thuế' },
    { phone: '0887890123', carrier: 'Vinaphone', category: 'SCAM_CALL', reportCount: 234, verified: true, description: 'Lừa đảo đầu tư vàng' },
    { phone: '0888901234', carrier: 'Vinaphone', category: 'PHISHING', reportCount: 567, verified: true, description: 'Gửi link giả mạo ngân hàng' },
    { phone: '0819012345', carrier: 'Vinaphone', category: 'SCAM_CALL', reportCount: 345, verified: true, description: 'Lừa đảo cho vay online' },
    { phone: '0820123456', carrier: 'Vinaphone', category: 'SPAM', reportCount: 456, verified: true, description: 'Spam quảng cáo casino' },
    // Vietnamobile
    { phone: '0561234567', carrier: 'Vietnamobile', category: 'SCAM_CALL', reportCount: 234, verified: true, description: 'Lừa đảo đầu tư' },
    { phone: '0562345678', carrier: 'Vietnamobile', category: 'SPAM', reportCount: 345, verified: true, description: 'Spam quảng cáo' },
    { phone: '0563456789', carrier: 'Vietnamobile', category: 'SCAM_CALL', reportCount: 189, verified: true, description: 'Lừa đảo việc làm' },
    // Gmobile
    { phone: '0591234567', carrier: 'Gmobile', category: 'SCAM_CALL', reportCount: 167, verified: true, description: 'Lừa đảo trúng thưởng' },
    { phone: '0592345678', carrier: 'Gmobile', category: 'SPAM', reportCount: 234, verified: true, description: 'Spam quảng cáo vay' },
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

  // ============================================
  // SCAM ALERTS - Cảnh báo lừa đảo (15+ records)
  // ============================================
  const alerts = [
    {
      title: 'Cảnh báo: Giả mạo nhân viên ngân hàng gọi điện yêu cầu cung cấp OTP',
      slug: 'gia-mao-nhan-vien-ngan-hang-otp-2024',
      summary: 'Kẻ lừa đảo giả danh nhân viên ngân hàng gọi điện thông báo tài khoản bị khóa, yêu cầu cung cấp mã OTP để "xác minh". Nhiều nạn nhân đã mất hàng trăm triệu đồng.',
      content: '## Chiêu thức lừa đảo\n\nKẻ lừa đảo sử dụng công nghệ giả mạo số điện thoại để hiển thị số tổng đài ngân hàng.',
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
      summary: 'Các sàn giao dịch tiền ảo giả mạo hứa hẹn lợi nhuận khủng 20-30%/tháng. Hàng nghìn người đã mất trắng.',
      content: '## Dấu hiệu nhận biết\n\n- Hứa lợi nhuận cố định cao bất thường',
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
      title: 'Giả mạo công an, viện kiểm sát gọi điện đe dọa',
      slug: 'gia-mao-cong-an-vien-kiem-sat-2024',
      summary: 'Kẻ lừa đảo giả danh công an, viện kiểm sát gọi điện thông báo nạn nhân liên quan đến vụ án, yêu cầu chuyển tiền.',
      content: '## Kịch bản lừa đảo\n\n1. Gọi điện tự xưng là công an/viện kiểm sát',
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
      title: 'Lừa đảo việc làm online, yêu cầu đặt cọc',
      slug: 'lua-dao-viec-lam-online-2024',
      summary: 'Chiêu trò tuyển dụng việc làm online với mức lương hấp dẫn, sau đó yêu cầu đặt cọc.',
      content: '## Mô tả chiêu trò\n\n1. Đăng tin tuyển dụng việc nhẹ lương cao',
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
      title: 'Lừa đảo tình cảm qua mạng xã hội (Romance Scam)',
      slug: 'lua-dao-tinh-cam-romance-scam-2024',
      summary: 'Kẻ lừa đảo tạo profile giả, làm quen qua mạng xã hội, xây dựng tình cảm rồi lừa tiền.',
      content: '## Chiêu thức phổ biến\n\n1. Tạo profile hấp dẫn',
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
      title: 'Giả mạo website ngân hàng đánh cắp thông tin',
      slug: 'gia-mao-website-ngan-hang-2024',
      summary: 'Kẻ lừa đảo tạo website giả mạo ngân hàng với giao diện y hệt, gửi link qua SMS/email.',
      content: '## Các ngân hàng thường bị giả mạo\n\n- Vietcombank, BIDV, Agribank',
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
      title: 'Lừa đảo trúng thưởng Shopee, Lazada, Tiki',
      slug: 'lua-dao-trung-thuong-shopee-lazada-2024',
      summary: 'Tin nhắn/email thông báo trúng thưởng từ các sàn TMĐT, yêu cầu đóng phí để nhận thưởng.',
      content: '## Nội dung tin nhắn thường gặp\n\n- Chúc mừng bạn trúng iPhone 15',
      category: 'PRIZE',
      severity: 'MEDIUM',
      targetGroup: ['all'],
      platform: ['sms', 'email', 'facebook'],
      source: 'community',
      reportCount: 3200,
      totalLoss: 5000000000,
      isActive: true,
    },
    {
      title: 'App vay tiền online lãi suất cắt cổ',
      slug: 'app-vay-tien-online-lai-suat-cao-2024',
      summary: 'Các app cho vay online với lãi suất cắt cổ, thu thập thông tin cá nhân và đe dọa nạn nhân.',
      content: '## Dấu hiệu nhận biết\n\n- Quảng cáo vay dễ dàng, không cần thế chấp',
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
      title: 'Lừa đảo đầu tư Forex qua Telegram',
      slug: 'lua-dao-dau-tu-forex-telegram-2024',
      summary: 'Các nhóm Telegram lừa đảo đầu tư Forex với cam kết lợi nhuận cao.',
      content: '## Cách thức hoạt động\n\n1. Tạo nhóm Telegram với hàng nghìn thành viên ảo',
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
      title: 'Giả mạo shipper gọi điện xác nhận đơn hàng',
      slug: 'gia-mao-shipper-xac-nhan-don-hang-2024',
      summary: 'Kẻ lừa đảo giả danh shipper gọi điện xác nhận đơn hàng COD, yêu cầu chuyển khoản trước.',
      content: '## Chiêu thức\n\n1. Gọi điện thông báo có đơn hàng COD',
      category: 'PHISHING',
      severity: 'MEDIUM',
      targetGroup: ['all'],
      platform: ['phone', 'sms'],
      source: 'community',
      reportCount: 780,
      totalLoss: 2500000000,
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
