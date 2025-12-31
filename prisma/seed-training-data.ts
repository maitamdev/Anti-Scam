import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedTrainingData() {
  console.log('🧠 Seeding training data...')

  const trainingData = [
    // SAFE - Ngân hàng chính thống
    { url: 'https://vietcombank.com.vn', text: 'Vietcombank ngân hàng thương mại cổ phần ngoại thương Việt Nam', label: 'SAFE', source: 'manual' },
    { url: 'https://techcombank.com.vn', text: 'Techcombank ngân hàng kỹ thương Việt Nam', label: 'SAFE', source: 'manual' },
    { url: 'https://bidv.com.vn', text: 'BIDV ngân hàng đầu tư và phát triển Việt Nam', label: 'SAFE', source: 'manual' },
    { url: 'https://mbbank.com.vn', text: 'MB Bank ngân hàng quân đội', label: 'SAFE', source: 'manual' },
    { url: 'https://tpbank.vn', text: 'TPBank ngân hàng tiên phong', label: 'SAFE', source: 'manual' },
    { url: 'https://vpbank.com.vn', text: 'VPBank ngân hàng Việt Nam thịnh vượng', label: 'SAFE', source: 'manual' },
    { url: 'https://acb.com.vn', text: 'ACB ngân hàng Á Châu', label: 'SAFE', source: 'manual' },
    { url: 'https://sacombank.com.vn', text: 'Sacombank ngân hàng Sài Gòn thương tín', label: 'SAFE', source: 'manual' },
    { url: 'https://agribank.com.vn', text: 'Agribank ngân hàng nông nghiệp', label: 'SAFE', source: 'manual' },
    
    // SAFE - E-commerce
    { url: 'https://shopee.vn', text: 'Shopee mua sắm online giá rẻ', label: 'SAFE', source: 'manual' },
    { url: 'https://lazada.vn', text: 'Lazada mua sắm trực tuyến', label: 'SAFE', source: 'manual' },
    { url: 'https://tiki.vn', text: 'Tiki mua hàng online', label: 'SAFE', source: 'manual' },
    { url: 'https://thegioididong.com', text: 'Thế giới di động điện thoại laptop', label: 'SAFE', source: 'manual' },
    { url: 'https://fptshop.com.vn', text: 'FPT Shop điện thoại máy tính', label: 'SAFE', source: 'manual' },
    
    // SAFE - Giáo dục
    { url: 'https://28tech.com.vn', text: '28Tech học lập trình online C++ Java Python', label: 'SAFE', source: 'manual' },
    { url: 'https://codelearn.io', text: 'CodeLearn học lập trình trực tuyến', label: 'SAFE', source: 'manual' },
    { url: 'https://fullstack.edu.vn', text: 'F8 học lập trình web fullstack', label: 'SAFE', source: 'manual' },
    { url: 'https://khoahoc.vietjack.com', text: 'VietJack học online miễn phí', label: 'SAFE', source: 'manual' },
    
    // SAFE - Tin tức
    { url: 'https://vnexpress.net', text: 'VnExpress tin tức mới nhất', label: 'SAFE', source: 'manual' },
    { url: 'https://tuoitre.vn', text: 'Tuổi Trẻ báo điện tử', label: 'SAFE', source: 'manual' },
    { url: 'https://thanhnien.vn', text: 'Thanh Niên báo điện tử', label: 'SAFE', source: 'manual' },
    { url: 'https://dantri.com.vn', text: 'Dân Trí tin tức', label: 'SAFE', source: 'manual' },
    
    // PHISHING - Giả mạo ngân hàng
    { url: 'https://vietcombannk.com', text: 'Vietcombank đăng nhập xác minh tài khoản OTP', label: 'PHISHING', source: 'manual' },
    { url: 'https://techcombank-verify.xyz', text: 'Techcombank cập nhật thông tin bảo mật', label: 'PHISHING', source: 'manual' },
    { url: 'https://bidv-online.top', text: 'BIDV xác nhận giao dịch đáng ngờ', label: 'PHISHING', source: 'manual' },
    { url: 'https://mbbank-security.club', text: 'MB Bank khóa thẻ tín dụng xác minh', label: 'PHISHING', source: 'manual' },
    { url: 'https://vietcombank.login-secure.com', text: 'Vietcombank đăng nhập bảo mật', label: 'PHISHING', source: 'manual' },
    { url: 'https://secure-techcombank.net', text: 'Techcombank bảo mật tài khoản', label: 'PHISHING', source: 'manual' },
    { url: 'https://vietinbank-update.info', text: 'Vietinbank cập nhật thông tin KYC', label: 'PHISHING', source: 'manual' },
    { url: 'https://agribank-hotro.online', text: 'Agribank hỗ trợ khách hàng xác minh', label: 'PHISHING', source: 'manual' },
    
    // PHISHING - Giả mạo e-commerce
    { url: 'https://shopee-trungthuong.xyz', text: 'Shopee chúc mừng trúng thưởng 50 triệu', label: 'PHISHING', source: 'manual' },
    { url: 'https://lazada-gift.top', text: 'Lazada tặng quà 100 triệu đồng', label: 'PHISHING', source: 'manual' },
    { url: 'https://tiki-khuyenmai.club', text: 'Tiki khuyến mãi iPhone 15 miễn phí', label: 'PHISHING', source: 'manual' },
    { url: 'https://shopee.prize-winner.com', text: 'Shopee winner nhận thưởng ngay', label: 'PHISHING', source: 'manual' },
    
    // SCAM - Lừa đảo đầu tư
    { url: 'https://bitcoin-x100.com', text: 'Đầu tư Bitcoin lợi nhuận x100 trong 24h', label: 'SCAM', source: 'manual' },
    { url: 'https://forex-profit-30.xyz', text: 'Forex lợi nhuận 30% mỗi tháng cam kết', label: 'SCAM', source: 'manual' },
    { url: 'https://crypto-airdrop-free.top', text: 'Airdrop miễn phí nhận 1000 USDT', label: 'SCAM', source: 'manual' },
    { url: 'https://binance-giveaway.club', text: 'Binance giveaway Bitcoin miễn phí', label: 'SCAM', source: 'manual' },
    { url: 'https://elon-musk-crypto.xyz', text: 'Elon Musk tặng Bitcoin gấp đôi', label: 'SCAM', source: 'manual' },
    { url: 'https://dautu-chungkhoan-x10.com', text: 'Đầu tư chứng khoán x10 lợi nhuận', label: 'SCAM', source: 'manual' },
    { url: 'https://kiem-tien-online-nhanh.xyz', text: 'Kiếm tiền online nhanh 50 triệu/tháng', label: 'SCAM', source: 'manual' },
    { url: 'https://lam-giau-tu-crypto.top', text: 'Làm giàu từ crypto không cần vốn', label: 'SCAM', source: 'manual' },
    
    // SCAM - Lừa đảo việc làm
    { url: 'https://viec-lam-tai-nha.xyz', text: 'Việc làm tại nhà lương 30 triệu không cần kinh nghiệm', label: 'SCAM', source: 'manual' },
    { url: 'https://tuyen-dung-online.top', text: 'Tuyển dụng online việc nhẹ lương cao', label: 'SCAM', source: 'manual' },
    { url: 'https://shopee-affiliate-job.club', text: 'Shopee affiliate kiếm 20 triệu/tháng', label: 'SCAM', source: 'manual' },
    { url: 'https://amazon-work-from-home.xyz', text: 'Amazon việc làm tại nhà thu nhập cao', label: 'SCAM', source: 'manual' },
    
    // SCAM - Cờ bạc
    { url: 'https://go88.vin', text: 'Go88 game bài đổi thưởng nổ hũ', label: 'SCAM', source: 'manual' },
    { url: 'https://sunwin.club', text: 'Sunwin cổng game bài đổi thưởng', label: 'SCAM', source: 'manual' },
    { url: 'https://iwin68.club', text: 'iWin game bài casino online', label: 'SCAM', source: 'manual' },
    { url: 'https://b52.club', text: 'B52 club game bài đổi thưởng', label: 'SCAM', source: 'manual' },
    { url: 'https://jun88.com', text: 'Jun88 nhà cái cá cược bóng đá', label: 'SCAM', source: 'manual' },
    { url: 'https://new88.com', text: 'New88 cá cược thể thao casino', label: 'SCAM', source: 'manual' },
    { url: 'https://hi88.com', text: 'Hi88 nhà cái uy tín cá cược', label: 'SCAM', source: 'manual' },
    { url: 'https://kubet.com', text: 'Kubet cá cược bóng đá casino', label: 'SCAM', source: 'manual' },
    { url: 'https://oxbet.com', text: 'Oxbet nhà cái cá độ bóng đá', label: 'SCAM', source: 'manual' },
    { url: 'https://ae888.com', text: 'AE888 casino trực tuyến', label: 'SCAM', source: 'manual' },
    { url: 'https://casino-vip88.xyz', text: 'Casino VIP88 slot nổ hũ jackpot', label: 'SCAM', source: 'manual' },
    { url: 'https://lode-online.top', text: 'Lô đề online soi cầu miền bắc', label: 'SCAM', source: 'manual' },
    { url: 'https://xoso-tructiep.club', text: 'Xổ số trực tiếp kết quả XSMB XSMN', label: 'SCAM', source: 'manual' },
    { url: 'https://taixiu-online.xyz', text: 'Tài xỉu online đổi thưởng', label: 'SCAM', source: 'manual' },
    { url: 'https://nohu-jackpot.top', text: 'Nổ hũ jackpot game slot đổi thưởng', label: 'SCAM', source: 'manual' },
    
    // SCAM - Vay tiền lãi cao
    { url: 'https://vay-tien-nhanh.xyz', text: 'Vay tiền nhanh online không cần thế chấp', label: 'SCAM', source: 'manual' },
    { url: 'https://app-vay-tien.top', text: 'App vay tiền duyệt nhanh 30 phút', label: 'SCAM', source: 'manual' },
    { url: 'https://vay-online-0dong.club', text: 'Vay online 0 đồng lãi suất thấp', label: 'SCAM', source: 'manual' },
    
    // SPAM - Quảng cáo spam
    { url: 'https://giam-can-nhanh.xyz', text: 'Giảm cân nhanh 10kg trong 1 tuần', label: 'SPAM', source: 'manual' },
    { url: 'https://tang-kich-thuoc.top', text: 'Tăng kích thước tự nhiên hiệu quả', label: 'SPAM', source: 'manual' },
    { url: 'https://thuoc-cuong-duong.club', text: 'Thuốc cường dương hiệu quả nhất', label: 'SPAM', source: 'manual' },
    
    // MALWARE - Phần mềm độc hại
    { url: 'https://crack-software-free.xyz', text: 'Crack phần mềm miễn phí download', label: 'MALWARE', source: 'manual' },
    { url: 'https://keygen-full.top', text: 'Keygen full crack serial key', label: 'MALWARE', source: 'manual' },
    { url: 'https://download-apk-mod.club', text: 'Download APK mod hack game', label: 'MALWARE', source: 'manual' },
  ]

  let created = 0
  for (const data of trainingData) {
    try {
      await prisma.trainingData.create({
        data: {
          url: data.url,
          text: data.text,
          label: data.label,
          source: data.source,
          used: false,
        },
      })
      created++
    } catch (e) {
      // Skip duplicates
    }
  }
  console.log(`✅ Created ${created} training data records`)

  // Add more blocklist entries
  const blocklistEntries = [
    // Gambling sites
    { domain: 'go88.vin', reason: 'Cờ bạc trực tuyến', severity: 'CRITICAL', source: 'manual' },
    { domain: 'sunwin.club', reason: 'Cờ bạc trực tuyến', severity: 'CRITICAL', source: 'manual' },
    { domain: 'iwin68.club', reason: 'Cờ bạc trực tuyến', severity: 'CRITICAL', source: 'manual' },
    { domain: 'b52.club', reason: 'Cờ bạc trực tuyến', severity: 'CRITICAL', source: 'manual' },
    { domain: 'jun88.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'new88.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'hi88.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'kubet.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'oxbet.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'ae888.com', reason: 'Casino trực tuyến', severity: 'CRITICAL', source: 'manual' },
    { domain: 'sin88.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'ta88.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'uk88.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'vn88.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'qh88.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'debet.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'zbet.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'sodo66.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'onbet.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'typhu88.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'mu88.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'may88.com', reason: 'Nhà cái cá cược', severity: 'CRITICAL', source: 'manual' },
    { domain: 'rik.vip', reason: 'Cờ bạc trực tuyến', severity: 'CRITICAL', source: 'manual' },
    { domain: 'sv388.com', reason: 'Cá cược đá gà', severity: 'CRITICAL', source: 'manual' },
  ]

  let blockedCount = 0
  for (const entry of blocklistEntries) {
    try {
      await prisma.blocklist.upsert({
        where: { domain: entry.domain },
        update: entry,
        create: entry,
      })
      blockedCount++
    } catch (e) {
      // Skip errors
    }
  }
  console.log(`✅ Added ${blockedCount} blocklist entries`)

  // Add whitelist entries
  const whitelistEntries = [
    // Banks
    { domain: 'vietcombank.com.vn', brand: 'Vietcombank', category: 'bank' },
    { domain: 'techcombank.com.vn', brand: 'Techcombank', category: 'bank' },
    { domain: 'bidv.com.vn', brand: 'BIDV', category: 'bank' },
    { domain: 'mbbank.com.vn', brand: 'MB Bank', category: 'bank' },
    { domain: 'tpbank.vn', brand: 'TPBank', category: 'bank' },
    { domain: 'vpbank.com.vn', brand: 'VPBank', category: 'bank' },
    { domain: 'acb.com.vn', brand: 'ACB', category: 'bank' },
    { domain: 'sacombank.com.vn', brand: 'Sacombank', category: 'bank' },
    { domain: 'agribank.com.vn', brand: 'Agribank', category: 'bank' },
    { domain: 'hdbank.com.vn', brand: 'HDBank', category: 'bank' },
    { domain: 'vietinbank.vn', brand: 'Vietinbank', category: 'bank' },
    { domain: 'ocb.com.vn', brand: 'OCB', category: 'bank' },
    { domain: 'msb.com.vn', brand: 'MSB', category: 'bank' },
    { domain: 'vib.com.vn', brand: 'VIB', category: 'bank' },
    { domain: 'shb.com.vn', brand: 'SHB', category: 'bank' },
    { domain: 'seabank.com.vn', brand: 'SeABank', category: 'bank' },
    // E-commerce
    { domain: 'shopee.vn', brand: 'Shopee', category: 'ecommerce' },
    { domain: 'lazada.vn', brand: 'Lazada', category: 'ecommerce' },
    { domain: 'tiki.vn', brand: 'Tiki', category: 'ecommerce' },
    { domain: 'sendo.vn', brand: 'Sendo', category: 'ecommerce' },
    { domain: 'thegioididong.com', brand: 'Thế Giới Di Động', category: 'ecommerce' },
    { domain: 'dienmayxanh.com', brand: 'Điện Máy Xanh', category: 'ecommerce' },
    { domain: 'fptshop.com.vn', brand: 'FPT Shop', category: 'ecommerce' },
    { domain: 'cellphones.com.vn', brand: 'CellphoneS', category: 'ecommerce' },
    // Education
    { domain: '28tech.com.vn', brand: '28Tech', category: 'education' },
    { domain: 'fullstack.edu.vn', brand: 'F8', category: 'education' },
    { domain: 'codelearn.io', brand: 'CodeLearn', category: 'education' },
    // Social
    { domain: 'facebook.com', brand: 'Facebook', category: 'social' },
    { domain: 'zalo.me', brand: 'Zalo', category: 'social' },
    { domain: 'tiktok.com', brand: 'TikTok', category: 'social' },
    { domain: 'youtube.com', brand: 'YouTube', category: 'social' },
    // News
    { domain: 'vnexpress.net', brand: 'VnExpress', category: 'news' },
    { domain: 'tuoitre.vn', brand: 'Tuổi Trẻ', category: 'news' },
    { domain: 'thanhnien.vn', brand: 'Thanh Niên', category: 'news' },
    { domain: 'dantri.com.vn', brand: 'Dân Trí', category: 'news' },
    // E-wallets
    { domain: 'momo.vn', brand: 'MoMo', category: 'ewallet' },
    { domain: 'zalopay.vn', brand: 'ZaloPay', category: 'ewallet' },
    { domain: 'vnpay.vn', brand: 'VNPAY', category: 'ewallet' },
  ]

  let whitelistCount = 0
  for (const entry of whitelistEntries) {
    try {
      await prisma.whitelist.upsert({
        where: { domain: entry.domain },
        update: entry,
        create: entry,
      })
      whitelistCount++
    } catch (e) {
      // Skip errors
    }
  }
  console.log(`✅ Added ${whitelistCount} whitelist entries`)

  console.log('🎉 Training data seeding completed!')
}

seedTrainingData()
  .catch((e) => {
    console.error('Error seeding training data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
