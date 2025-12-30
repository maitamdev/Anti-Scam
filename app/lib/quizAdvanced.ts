/**
 * Advanced Quiz Questions - Câu hỏi nâng cao về nhận biết lừa đảo
 * Bao gồm: Deepfake, AI Scam, Crypto, Social Engineering, Case Studies thực tế
 */

import { QuizQuestion, QUIZ_CATEGORIES } from './quizConstants'

// ============================================
// DEEPFAKE & AI SCAM - Câu hỏi về công nghệ mới
// ============================================

export const ADVANCED_AI_SCAM: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'hard',
    question: 'Bạn nhận video call từ "sếp" yêu cầu chuyển gấp 500 triệu cho đối tác. Giọng nói và khuôn mặt giống hệt sếp. Bạn nên làm gì?',
    scenario: 'Video call từ người giống sếp yêu cầu chuyển tiền gấp',
    options: [
      { id: 'a', text: 'Chuyển ngay vì đã thấy mặt sếp', isCorrect: false },
      { id: 'b', text: 'Xác nhận qua kênh khác (gọi điện số cũ, gặp trực tiếp)', isCorrect: true },
      { id: 'c', text: 'Hỏi thêm chi tiết trong cuộc gọi', isCorrect: false },
      { id: 'd', text: 'Chuyển một phần để thử', isCorrect: false },
    ],
    explanation: 'Deepfake có thể tạo video giả mạo khuôn mặt và giọng nói cực kỳ chân thực. Năm 2024, một công ty HK mất 25 triệu USD vì deepfake giả sếp. LUÔN xác nhận qua kênh khác trước khi chuyển tiền lớn.',
    tags: ['deepfake', 'video call', 'ceo fraud', 'ai scam'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'hard',
    question: 'Dấu hiệu nào giúp nhận biết video deepfake?',
    options: [
      { id: 'a', text: 'Chất lượng video cao = video thật', isCorrect: false },
      { id: 'b', text: 'Chớp mắt bất thường, viền mặt mờ, ánh sáng không khớp', isCorrect: true },
      { id: 'c', text: 'Deepfake không thể phát hiện bằng mắt thường', isCorrect: false },
      { id: 'd', text: 'Giọng nói khớp môi = video thật', isCorrect: false },
    ],
    explanation: 'Deepfake thường có: chớp mắt không tự nhiên, viền khuôn mặt mờ/nhòe, ánh sáng trên mặt không khớp với môi trường, chuyển động đầu cứng. Tuy nhiên, công nghệ ngày càng tốt nên cần xác nhận qua kênh khác.',
    tags: ['deepfake', 'nhận biết', 'ai'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'hard',
    question: 'Bạn nhận tin nhắn thoại từ "con" đang du học: "Mẹ ơi con bị tai nạn, cần 100 triệu gấp, chuyển vào số TK này." Giọng giống hệt con. Bạn nên?',
    scenario: 'Tin nhắn thoại giọng giống con yêu cầu tiền gấp',
    options: [
      { id: 'a', text: 'Chuyển ngay vì nghe giọng con', isCorrect: false },
      { id: 'b', text: 'Gọi video call hoặc hỏi câu hỏi bí mật chỉ con biết', isCorrect: true },
      { id: 'c', text: 'Chuyển một phần trước', isCorrect: false },
      { id: 'd', text: 'Nhờ người thân khác chuyển', isCorrect: false },
    ],
    explanation: 'AI có thể clone giọng nói chỉ với 3 giây audio. Kẻ gian lấy giọng từ video TikTok/Facebook của con bạn. LUÔN video call hoặc hỏi câu hỏi bí mật (tên thú cưng, kỷ niệm riêng) để xác nhận.',
    tags: ['voice clone', 'ai scam', 'giả mạo người thân'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'medium',
    question: 'ChatGPT và AI có thể bị lợi dụng để lừa đảo như thế nào?',
    options: [
      { id: 'a', text: 'AI không thể dùng để lừa đảo', isCorrect: false },
      { id: 'b', text: 'Viết email phishing chuyên nghiệp, tạo website giả, chatbot lừa đảo', isCorrect: true },
      { id: 'c', text: 'Chỉ dùng để hack mật khẩu', isCorrect: false },
      { id: 'd', text: 'Chỉ nguy hiểm với người già', isCorrect: false },
    ],
    explanation: 'AI giúp kẻ gian: viết email phishing không lỗi chính tả, tạo website giả chuyên nghiệp, chatbot tự động lừa đảo 24/7, dịch sang nhiều ngôn ngữ. Email lừa đảo ngày càng khó phát hiện.',
    tags: ['ai', 'chatgpt', 'phishing', 'automation'],
  },

  // ============================================
  // CRYPTO & NFT SCAM - Lừa đảo tiền điện tử
  // ============================================
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.INVESTMENT,
    difficulty: 'hard',
    question: 'Bạn được mời vào group Telegram "Tín hiệu Crypto VIP" với admin khoe lợi nhuận 1000%. Họ yêu cầu nạp tiền vào sàn "mới" để nhận bonus 50%. Đây có an toàn?',
    scenario: 'Group crypto VIP với sàn giao dịch mới',
    options: [
      { id: 'a', text: 'An toàn nếu admin có nhiều follower', isCorrect: false },
      { id: 'b', text: 'LỪA ĐẢO - Sàn giả, bạn sẽ không rút được tiền', isCorrect: true },
      { id: 'c', text: 'Thử với số tiền nhỏ', isCorrect: false },
      { id: 'd', text: 'An toàn nếu có hợp đồng', isCorrect: false },
    ],
    explanation: 'Đây là "pig butchering" crypto: Group giả → Sàn giả → Bạn nạp tiền → Thấy "lợi nhuận" ảo → Nạp thêm → Không rút được. Chỉ dùng sàn uy tín (Binance, Coinbase) và KHÔNG tin group VIP.',
    tags: ['crypto', 'telegram', 'sàn giả', 'pig butchering'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.INVESTMENT,
    difficulty: 'medium',
    question: 'Dấu hiệu nào cho thấy một dự án crypto/NFT là lừa đảo (rug pull)?',
    options: [
      { id: 'a', text: 'Có website đẹp và whitepaper dài', isCorrect: false },
      { id: 'b', text: 'Team ẩn danh, hứa lợi nhuận khủng, thanh khoản thấp', isCorrect: true },
      { id: 'c', text: 'Được nhiều người nổi tiếng quảng cáo', isCorrect: false },
      { id: 'd', text: 'Giá tăng nhanh', isCorrect: false },
    ],
    explanation: 'Red flags của rug pull: Team ẩn danh/giả, hứa lợi nhuận phi thực tế, thanh khoản bị khóa ngắn hạn, marketing quá mạnh, không có sản phẩm thực. Người nổi tiếng có thể bị trả tiền để quảng cáo scam.',
    tags: ['crypto', 'nft', 'rug pull', 'scam coin'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.INVESTMENT,
    difficulty: 'hard',
    question: 'Bạn nhận được NFT miễn phí trong ví crypto. Khi cố bán, website yêu cầu "approve" quyền truy cập ví. Bạn nên?',
    scenario: 'NFT miễn phí xuất hiện trong ví',
    options: [
      { id: 'a', text: 'Approve để bán NFT', isCorrect: false },
      { id: 'b', text: 'KHÔNG approve - đây là scam đánh cắp toàn bộ ví', isCorrect: true },
      { id: 'c', text: 'Kiểm tra giá NFT trước', isCorrect: false },
      { id: 'd', text: 'Chuyển NFT sang ví khác rồi bán', isCorrect: false },
    ],
    explanation: 'Đây là "airdrop scam": NFT rác được gửi miễn phí → Bạn cố bán → Website yêu cầu approve → Smart contract độc hại rút sạch ví. KHÔNG BAO GIỜ tương tác với NFT/token lạ xuất hiện trong ví.',
    tags: ['nft', 'airdrop scam', 'wallet drain', 'smart contract'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.INVESTMENT,
    difficulty: 'medium',
    question: 'Seed phrase (12/24 từ khôi phục ví crypto) nên được bảo quản như thế nào?',
    options: [
      { id: 'a', text: 'Lưu trong file Word trên máy tính', isCorrect: false },
      { id: 'b', text: 'Viết tay trên giấy, cất nơi an toàn, KHÔNG lưu online', isCorrect: true },
      { id: 'c', text: 'Chụp ảnh lưu trong điện thoại', isCorrect: false },
      { id: 'd', text: 'Gửi email cho chính mình để backup', isCorrect: false },
    ],
    explanation: 'Seed phrase = chìa khóa ví crypto. Ai có seed phrase = sở hữu toàn bộ tiền trong ví. KHÔNG BAO GIỜ lưu online, chụp ảnh, hay chia sẻ cho bất kỳ ai. Viết tay và cất nơi an toàn như két sắt.',
    tags: ['crypto', 'seed phrase', 'bảo mật ví'],
  },

  // ============================================
  // SOCIAL ENGINEERING NÂNG CAO
  // ============================================
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'hard',
    question: 'Bạn nhận email từ "IT department" công ty yêu cầu đổi mật khẩu qua link vì "hệ thống bị tấn công". Email có logo công ty và chữ ký đầy đủ. Bạn nên?',
    scenario: 'Email từ IT yêu cầu đổi mật khẩu gấp',
    options: [
      { id: 'a', text: 'Click link và đổi mật khẩu ngay', isCorrect: false },
      { id: 'b', text: 'Liên hệ IT qua kênh chính thức (điện thoại, chat nội bộ) để xác nhận', isCorrect: true },
      { id: 'c', text: 'Kiểm tra email có đuôi công ty không', isCorrect: false },
      { id: 'd', text: 'Forward cho đồng nghiệp hỏi ý kiến', isCorrect: false },
    ],
    explanation: 'Đây là spear phishing nhắm vào nhân viên công ty. Email có thể giả mạo hoàn hảo (logo, chữ ký, thậm chí email domain). LUÔN xác nhận qua kênh khác trước khi click link hoặc cung cấp thông tin.',
    tags: ['spear phishing', 'corporate', 'it scam'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'hard',
    question: 'Pretexting trong lừa đảo là gì?',
    options: [
      { id: 'a', text: 'Gửi email hàng loạt', isCorrect: false },
      { id: 'b', text: 'Tạo kịch bản/câu chuyện giả để lấy lòng tin nạn nhân', isCorrect: true },
      { id: 'c', text: 'Hack mật khẩu bằng phần mềm', isCorrect: false },
      { id: 'd', text: 'Gọi điện tự động', isCorrect: false },
    ],
    explanation: 'Pretexting = tạo "pretext" (lý do giả). VD: Giả làm nhân viên ngân hàng gọi "xác minh tài khoản", giả làm IT support "sửa máy tính", giả làm shipper "xác nhận địa chỉ". Kịch bản càng chi tiết, nạn nhân càng dễ tin.',
    tags: ['pretexting', 'social engineering', 'kịch bản'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'hard',
    question: 'Bạn nhận cuộc gọi: "Đây là Công an quận X. Số CMND của anh/chị liên quan đến vụ rửa tiền. Chuyển tiền vào TK điều tra để chứng minh trong sạch, nếu không sẽ bị bắt." Bạn nên?',
    scenario: 'Cuộc gọi từ "công an" đe dọa bắt giữ',
    options: [
      { id: 'a', text: 'Chuyển tiền để chứng minh trong sạch', isCorrect: false },
      { id: 'b', text: 'CÚP MÁY - Công an KHÔNG BAO GIỜ yêu cầu chuyển tiền qua điện thoại', isCorrect: true },
      { id: 'c', text: 'Hỏi tên và đơn vị để kiểm tra', isCorrect: false },
      { id: 'd', text: 'Nhờ luật sư tư vấn', isCorrect: false },
    ],
    explanation: 'Đây là lừa đảo giả công an phổ biến nhất. CÔNG AN KHÔNG BAO GIỜ: gọi điện yêu cầu chuyển tiền, đe dọa bắt qua điện thoại, yêu cầu "TK điều tra". Nếu thật sự có vấn đề, họ sẽ gửi giấy triệu tập chính thức.',
    tags: ['giả công an', 'đe dọa', 'rửa tiền giả'],
  },

  // ============================================
  // CASE STUDIES THỰC TẾ TẠI VIỆT NAM
  // ============================================
  {
    type: 'text',
    category: QUIZ_CATEGORIES.MONEY_TRANSFER,
    difficulty: 'medium',
    question: 'Theo thống kê, hình thức lừa đảo nào phổ biến nhất tại Việt Nam năm 2024?',
    options: [
      { id: 'a', text: 'Hack tài khoản ngân hàng', isCorrect: false },
      { id: 'b', text: 'Giả mạo người thân/bạn bè nhờ chuyển tiền', isCorrect: true },
      { id: 'c', text: 'Lừa đảo crypto', isCorrect: false },
      { id: 'd', text: 'Ransomware', isCorrect: false },
    ],
    explanation: 'Giả mạo người thân qua Zalo/Facebook chiếm >40% vụ lừa đảo tại VN. Kẻ gian hack/giả mạo tài khoản → nhờ chuyển tiền với lý do "bank lỗi", "cần gấp". Thiệt hại trung bình 5-50 triệu/vụ.',
    tags: ['thống kê', 'việt nam', 'giả mạo'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.JOB_SCAM,
    difficulty: 'hard',
    question: 'Bạn làm "CTV Shopee" được 1 tuần, đã rút được 2 triệu tiền hoa hồng. Giờ họ yêu cầu nạp 20 triệu để "mở khóa đơn hàng lớn, hoa hồng 5 triệu". Bạn nên?',
    scenario: 'Đã nhận được tiền từ "công việc" CTV',
    options: [
      { id: 'a', text: 'Nạp tiền vì đã được trả lương trước đó', isCorrect: false },
      { id: 'b', text: 'DỪNG NGAY - Đây là giai đoạn "mổ lợn" của lừa đảo', isCorrect: true },
      { id: 'c', text: 'Nạp 10 triệu để thử', isCorrect: false },
      { id: 'd', text: 'Hỏi "quản lý" để đàm phán', isCorrect: false },
    ],
    explanation: 'Đây là "pig butchering" (nuôi lợn mổ thịt): Trả tiền nhỏ để tạo niềm tin → Yêu cầu nạp số tiền lớn hơn → Bạn nạp → Không rút được. 2 triệu bạn nhận là "mồi", họ muốn lấy 20 triệu hoặc hơn.',
    tags: ['ctv giả', 'pig butchering', 'shopee giả'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'medium',
    question: 'Website giả mạo ngân hàng thường có đặc điểm gì?',
    options: [
      { id: 'a', text: 'Không có HTTPS', isCorrect: false },
      { id: 'b', text: 'URL khác domain chính thức (vd: vietcombank-vn.com thay vì vietcombank.com.vn)', isCorrect: true },
      { id: 'c', text: 'Giao diện khác hoàn toàn', isCorrect: false },
      { id: 'd', text: 'Không có logo ngân hàng', isCorrect: false },
    ],
    explanation: 'Website giả có thể: có HTTPS (chứng chỉ SSL miễn phí), giao diện giống 100%, có logo. Điểm khác biệt DUY NHẤT là URL. Luôn kiểm tra URL trước khi đăng nhập: vietcombank.com.vn (thật) vs vietcombank-vn.com (giả).',
    tags: ['phishing', 'website giả', 'url'],
  },

  // ============================================
  // BẢO MẬT NÂNG CAO
  // ============================================
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PASSWORD,
    difficulty: 'hard',
    question: '2FA (Xác thực 2 yếu tố) nào an toàn nhất?',
    options: [
      { id: 'a', text: 'SMS OTP', isCorrect: false },
      { id: 'b', text: 'Hardware key (YubiKey) hoặc Authenticator app', isCorrect: true },
      { id: 'c', text: 'Email OTP', isCorrect: false },
      { id: 'd', text: 'Câu hỏi bảo mật', isCorrect: false },
    ],
    explanation: 'SMS OTP có thể bị đánh cắp qua SIM swap. Email OTP nguy hiểm nếu email bị hack. Hardware key (YubiKey) và Authenticator app (Google Authenticator, Authy) an toàn nhất vì không thể bị intercept từ xa.',
    tags: ['2fa', 'bảo mật', 'authenticator'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PASSWORD,
    difficulty: 'medium',
    question: 'SIM swap attack là gì?',
    options: [
      { id: 'a', text: 'Đổi SIM điện thoại thông thường', isCorrect: false },
      { id: 'b', text: 'Kẻ gian lừa nhà mạng chuyển số điện thoại của bạn sang SIM của họ', isCorrect: true },
      { id: 'c', text: 'Hack SIM bằng phần mềm', isCorrect: false },
      { id: 'd', text: 'Sao chép SIM vật lý', isCorrect: false },
    ],
    explanation: 'SIM swap: Kẻ gian dùng thông tin cá nhân của bạn (CMND, địa chỉ) để lừa nhà mạng cấp SIM mới. Họ nhận được tất cả SMS của bạn, bao gồm OTP ngân hàng. Đây là lý do SMS OTP không an toàn 100%.',
    tags: ['sim swap', 'otp', 'nhà mạng'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.MALWARE,
    difficulty: 'hard',
    question: 'Bạn nhận email "Hóa đơn điện tháng 12" với file đính kèm .pdf.exe. Bạn nên?',
    scenario: 'Email hóa đơn với file đính kèm lạ',
    options: [
      { id: 'a', text: 'Mở file vì là hóa đơn điện', isCorrect: false },
      { id: 'b', text: 'XÓA NGAY - File .pdf.exe là malware ngụy trang', isCorrect: true },
      { id: 'c', text: 'Quét virus rồi mở', isCorrect: false },
      { id: 'd', text: 'Đổi tên file thành .pdf rồi mở', isCorrect: false },
    ],
    explanation: 'File có 2 đuôi (.pdf.exe) là malware ngụy trang. Windows ẩn đuôi file nên bạn chỉ thấy ".pdf". Khi mở = chạy file .exe = cài malware. EVN và các công ty điện KHÔNG gửi hóa đơn qua email với file đính kèm.',
    tags: ['malware', 'file giả', 'email'],
  },

  // ============================================
  // QR CODE & PAYMENT SCAM
  // ============================================
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.MONEY_TRANSFER,
    difficulty: 'medium',
    question: 'Bạn mua hàng, người bán đưa mã QR để thanh toán. Sau khi quét, app banking hiện "Chuyển 5.000.000đ cho NGUYEN VAN A". Bạn nên?',
    scenario: 'Quét QR thanh toán nhưng tên người nhận lạ',
    options: [
      { id: 'a', text: 'Chuyển vì đã quét QR của người bán', isCorrect: false },
      { id: 'b', text: 'Kiểm tra tên người nhận có khớp với người bán không', isCorrect: true },
      { id: 'c', text: 'Chuyển nếu số tiền đúng', isCorrect: false },
      { id: 'd', text: 'Hỏi người bán tại sao tên khác', isCorrect: false },
    ],
    explanation: 'Kẻ gian có thể dán QR giả lên QR thật của cửa hàng. LUÔN kiểm tra tên người nhận trước khi xác nhận. Nếu tên không khớp với tên cửa hàng/người bán = QR giả.',
    tags: ['qr code', 'thanh toán', 'qr giả'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.MONEY_TRANSFER,
    difficulty: 'easy',
    question: 'Khi chuyển tiền qua app banking, thông tin nào QUAN TRỌNG NHẤT cần kiểm tra?',
    options: [
      { id: 'a', text: 'Số tài khoản', isCorrect: false },
      { id: 'b', text: 'Tên người nhận hiển thị trên app', isCorrect: true },
      { id: 'c', text: 'Ngân hàng người nhận', isCorrect: false },
      { id: 'd', text: 'Nội dung chuyển khoản', isCorrect: false },
    ],
    explanation: 'Số tài khoản có thể bị đọc sai/gõ nhầm. TÊN NGƯỜI NHẬN là xác nhận cuối cùng. Nếu tên không khớp với người bạn muốn chuyển = SAI TÀI KHOẢN. Luôn đọc kỹ tên trước khi bấm xác nhận.',
    tags: ['chuyển tiền', 'kiểm tra', 'tên người nhận'],
  },
]

// Export tất cả câu hỏi nâng cao
export const ALL_ADVANCED_QUESTIONS = [...ADVANCED_AI_SCAM]
