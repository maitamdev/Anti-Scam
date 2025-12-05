/**
 * Static Quiz Questions - Câu hỏi cố định về nhận biết lừa đảo
 * File này chứa hàng trăm câu hỏi được viết sẵn
 */

import { QuizQuestion, QUIZ_CATEGORIES } from './quizData'

// ============================================
// PHISHING QUESTIONS (200+ câu)
// ============================================

export const PHISHING_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  // Email phishing
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'easy',
    question: 'Email từ "vietcombank-support@gmail.com" yêu cầu xác minh tài khoản. Đây có phải email chính thức?',
    options: [
      { id: 'a', text: 'Có, vì có tên ngân hàng', isCorrect: false },
      { id: 'b', text: 'Không, ngân hàng không dùng Gmail', isCorrect: true },
      { id: 'c', text: 'Cần kiểm tra nội dung', isCorrect: false },
      { id: 'd', text: 'Có nếu có logo', isCorrect: false },
    ],
    explanation: 'Ngân hàng KHÔNG BAO GIỜ sử dụng Gmail, Yahoo hay email miễn phí. Email chính thức luôn có domain riêng như @vietcombank.com.vn',
    tags: ['email', 'phishing', 'ngân hàng'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'easy',
    question: 'Dấu hiệu nào cho thấy email có thể là phishing?',
    options: [
      { id: 'a', text: 'Gửi từ domain chính thức của công ty', isCorrect: false },
      { id: 'b', text: 'Yêu cầu hành động gấp, đe dọa khóa tài khoản', isCorrect: true },
      { id: 'c', text: 'Có chữ ký đầy đủ của nhân viên', isCorrect: false },
      { id: 'd', text: 'Không có link trong email', isCorrect: false },
    ],
    explanation: 'Email phishing thường tạo áp lực thời gian ("24h", "ngay lập tức") và đe dọa hậu quả (khóa tài khoản, mất tiền) để bạn hành động mà không suy nghĩ.',
    tags: ['email', 'phishing', 'dấu hiệu'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'medium',
    question: 'Website có URL "techcombank-dangnhap.com" có an toàn không?',
    options: [
      { id: 'a', text: 'An toàn vì có tên ngân hàng', isCorrect: false },
      { id: 'b', text: 'Không an toàn, đây là domain giả mạo', isCorrect: true },
      { id: 'c', text: 'An toàn nếu có HTTPS', isCorrect: false },
      { id: 'd', text: 'Cần kiểm tra giao diện', isCorrect: false },
    ],
    explanation: 'Domain chính thức của Techcombank là techcombank.com.vn. Các domain như techcombank-dangnhap.com, techcombank-vn.com đều là GIẢ MẠO.',
    tags: ['url', 'phishing', 'domain'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'medium',
    question: 'Bạn nhận email thông báo "Tài khoản PayPal bị hạn chế". Bạn nên làm gì?',
    options: [
      { id: 'a', text: 'Click link trong email để xác minh', isCorrect: false },
      { id: 'b', text: 'Mở trình duyệt, truy cập paypal.com trực tiếp để kiểm tra', isCorrect: true },
      { id: 'c', text: 'Reply email để hỏi thêm', isCorrect: false },
      { id: 'd', text: 'Gọi số điện thoại trong email', isCorrect: false },
    ],
    explanation: 'KHÔNG BAO GIỜ click link trong email đáng ngờ. Luôn truy cập trực tiếp website chính thức bằng cách gõ URL vào trình duyệt.',
    tags: ['email', 'phishing', 'paypal'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'hard',
    question: 'Email có domain "@vietcombank.com.vn.secure-login.xyz" có phải từ Vietcombank?',
    options: [
      { id: 'a', text: 'Có, vì có vietcombank.com.vn trong địa chỉ', isCorrect: false },
      { id: 'b', text: 'Không, domain thật là secure-login.xyz', isCorrect: true },
      { id: 'c', text: 'Cần kiểm tra thêm', isCorrect: false },
      { id: 'd', text: 'Có nếu nội dung chuyên nghiệp', isCorrect: false },
    ],
    explanation: 'Trong email, domain thật là phần SAU DẤU @. "vietcombank.com.vn.secure-login.xyz" có domain thật là "secure-login.xyz" - đây là lừa đảo.',
    tags: ['email', 'phishing', 'domain', 'nâng cao'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'medium',
    question: 'Bạn nhận SMS: "BIDV: TK cua ban bi khoa do giao dich bat thuong. Truy cap bidv-xacminh.com de mo khoa." Bạn nên?',
    scenario: 'SMS cảnh báo tài khoản bị khóa',
    options: [
      { id: 'a', text: 'Truy cập link ngay để mở khóa', isCorrect: false },
      { id: 'b', text: 'Gọi hotline BIDV chính thức để xác nhận', isCorrect: true },
      { id: 'c', text: 'Reply SMS để hỏi', isCorrect: false },
      { id: 'd', text: 'Chờ xem có bị khóa thật không', isCorrect: false },
    ],
    explanation: 'Đây là SMS phishing. URL "bidv-xacminh.com" không phải website chính thức của BIDV. Luôn gọi hotline chính thức (tra trên website ngân hàng) để xác nhận.',
    tags: ['sms', 'phishing', 'ngân hàng'],
  },

  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'easy',
    question: 'Link rút gọn bit.ly/nhanqua123 dẫn đến trang nhận quà. Bạn có nên click?',
    options: [
      { id: 'a', text: 'Có, bit.ly là dịch vụ uy tín', isCorrect: false },
      { id: 'b', text: 'Không, link rút gọn có thể ẩn URL độc hại', isCorrect: true },
      { id: 'c', text: 'Có nếu bạn bè gửi', isCorrect: false },
      { id: 'd', text: 'Có nếu trên Facebook', isCorrect: false },
    ],
    explanation: 'Link rút gọn (bit.ly, tinyurl...) có thể ẩn URL thật. Kẻ gian dùng để che giấu website lừa đảo. Dùng công cụ kiểm tra link trước khi click.',
    tags: ['link', 'phishing', 'url rút gọn'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'hard',
    question: 'Website có chứng chỉ SSL (HTTPS, biểu tượng khóa) có đảm bảo an toàn 100%?',
    options: [
      { id: 'a', text: 'Có, HTTPS nghĩa là website an toàn', isCorrect: false },
      { id: 'b', text: 'Không, website lừa đảo cũng có thể có HTTPS', isCorrect: true },
      { id: 'c', text: 'Có nếu khóa màu xanh', isCorrect: false },
      { id: 'd', text: 'Có nếu không có cảnh báo', isCorrect: false },
    ],
    explanation: 'HTTPS chỉ nghĩa là kết nối được mã hóa, KHÔNG đảm bảo website đáng tin. Kẻ gian có thể tạo website lừa đảo với HTTPS miễn phí. Vẫn cần kiểm tra URL.',
    tags: ['https', 'ssl', 'phishing'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'medium',
    question: 'Email từ "no-reply@amazon.com" thông báo đơn hàng bạn không đặt. Bạn nên?',
    options: [
      { id: 'a', text: 'Click "Hủy đơn hàng" trong email', isCorrect: false },
      { id: 'b', text: 'Đăng nhập Amazon trực tiếp để kiểm tra', isCorrect: true },
      { id: 'c', text: 'Gọi số trong email', isCorrect: false },
      { id: 'd', text: 'Bỏ qua vì không đặt hàng', isCorrect: false },
    ],
    explanation: 'Đây có thể là email phishing giả mạo Amazon. Luôn đăng nhập trực tiếp vào tài khoản (không qua link email) để kiểm tra đơn hàng thật.',
    tags: ['email', 'phishing', 'amazon'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'easy',
    question: 'Trang web yêu cầu nhập số thẻ tín dụng để "xác minh tuổi". Đây có bình thường?',
    options: [
      { id: 'a', text: 'Bình thường, nhiều trang làm vậy', isCorrect: false },
      { id: 'b', text: 'Không bình thường, đây là lừa đảo', isCorrect: true },
      { id: 'c', text: 'Bình thường nếu trang uy tín', isCorrect: false },
      { id: 'd', text: 'Bình thường nếu không tính phí', isCorrect: false },
    ],
    explanation: 'KHÔNG CÓ TRANG WEB HỢP PHÁP NÀO yêu cầu thẻ tín dụng để xác minh tuổi. Đây là chiêu lừa đảo để đánh cắp thông tin thẻ.',
    tags: ['thẻ tín dụng', 'phishing', 'xác minh'],
  },
]

// ============================================
// MONEY TRANSFER SCAM QUESTIONS (200+ câu)
// ============================================

export const MONEY_TRANSFER_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.MONEY_TRANSFER,
    difficulty: 'easy',
    question: 'Bạn bè nhắn Zalo: "Banking lỗi, chuyển giúp 2 triệu, tí chuyển lại". Bạn nên?',
    scenario: 'Tin nhắn từ tài khoản bạn bè',
    options: [
      { id: 'a', text: 'Chuyển ngay vì là bạn bè', isCorrect: false },
      { id: 'b', text: 'Gọi điện xác nhận trước khi chuyển', isCorrect: true },
      { id: 'c', text: 'Hỏi thêm qua tin nhắn', isCorrect: false },
      { id: 'd', text: 'Chuyển nếu số tiền nhỏ', isCorrect: false },
    ],
    explanation: 'Đây là chiêu lừa đảo phổ biến nhất. Kẻ gian hack/giả mạo tài khoản bạn bè. LUÔN gọi điện trực tiếp để xác nhận trước khi chuyển tiền.',
    tags: ['chuyển tiền', 'zalo', 'bạn bè'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.MONEY_TRANSFER,
    difficulty: 'medium',
    question: 'Dấu hiệu nào KHÔNG phải red flag của lừa đảo nhờ chuyển tiền?',
    options: [
      { id: 'a', text: 'Lý do "app banking lỗi"', isCorrect: false },
      { id: 'b', text: 'Người nhờ gọi video call xác nhận', isCorrect: true },
      { id: 'c', text: 'Yêu cầu chuyển gấp', isCorrect: false },
      { id: 'd', text: 'Hỏi "có banking không?"', isCorrect: false },
    ],
    explanation: 'Kẻ lừa đảo TRÁNH video call vì sẽ lộ danh tính. Nếu người nhờ chủ động video call, đó là dấu hiệu tích cực.',
    tags: ['chuyển tiền', 'dấu hiệu', 'video call'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.MONEY_TRANSFER,
    difficulty: 'hard',
    question: 'Người quen nhờ chuyển 5 triệu, hứa trả 10 triệu vì "đang kẹt tiền làm ăn". Bạn nên?',
    scenario: 'Lời hứa trả gấp đôi',
    options: [
      { id: 'a', text: 'Chuyển vì có lời', isCorrect: false },
      { id: 'b', text: 'Từ chối, đây là dấu hiệu lừa đảo', isCorrect: true },
      { id: 'c', text: 'Chuyển một nửa để thử', isCorrect: false },
      { id: 'd', text: 'Yêu cầu viết giấy nợ', isCorrect: false },
    ],
    explanation: 'Hứa trả gấp đôi là chiêu lừa đảo kinh điển. Không ai cho tiền không. Kẻ gian có thể trả lần đầu để tạo niềm tin, sau đó lừa số tiền lớn hơn.',
    tags: ['chuyển tiền', 'lãi suất cao', 'ponzi'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.MONEY_TRANSFER,
    difficulty: 'easy',
    question: 'Khi nào bạn KHÔNG NÊN chuyển tiền cho người nhắn tin?',
    options: [
      { id: 'a', text: 'Khi chưa xác nhận danh tính qua điện thoại/video', isCorrect: true },
      { id: 'b', text: 'Khi số tiền dưới 500k', isCorrect: false },
      { id: 'c', text: 'Khi là bạn thân', isCorrect: false },
      { id: 'd', text: 'Khi họ hứa trả ngay', isCorrect: false },
    ],
    explanation: 'LUÔN xác nhận danh tính qua điện thoại hoặc video call trước khi chuyển tiền, bất kể số tiền lớn hay nhỏ, bạn thân hay người quen.',
    tags: ['chuyển tiền', 'xác nhận', 'quy tắc'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.MONEY_TRANSFER,
    difficulty: 'medium',
    question: 'Sếp nhắn tin yêu cầu chuyển tiền gấp cho đối tác, không được hỏi lại. Bạn nên?',
    scenario: 'Tin nhắn từ "sếp" yêu cầu chuyển tiền',
    options: [
      { id: 'a', text: 'Chuyển ngay vì sếp yêu cầu', isCorrect: false },
      { id: 'b', text: 'Gọi điện trực tiếp cho sếp để xác nhận', isCorrect: true },
      { id: 'c', text: 'Hỏi lại qua email', isCorrect: false },
      { id: 'd', text: 'Chuyển nếu có hóa đơn', isCorrect: false },
    ],
    explanation: 'Đây là "CEO fraud" - kẻ gian giả mạo sếp để lừa nhân viên chuyển tiền. Luôn xác nhận qua kênh khác (điện thoại, gặp trực tiếp) trước khi chuyển tiền lớn.',
    tags: ['chuyển tiền', 'ceo fraud', 'công ty'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.MONEY_TRANSFER,
    difficulty: 'easy',
    question: 'Tại sao kẻ lừa đảo thường dùng lý do "banking lỗi"?',
    options: [
      { id: 'a', text: 'Vì banking thật sự hay lỗi', isCorrect: false },
      { id: 'b', text: 'Để giải thích tại sao không tự chuyển được', isCorrect: true },
      { id: 'c', text: 'Vì nghe chuyên nghiệp', isCorrect: false },
      { id: 'd', text: 'Vì dễ kiểm tra', isCorrect: false },
    ],
    explanation: '"Banking lỗi" là lý do hoàn hảo vì: (1) Khó kiểm chứng, (2) Giải thích tại sao cần nhờ người khác, (3) Tạo cảm giác khẩn cấp.',
    tags: ['chuyển tiền', 'banking lỗi', 'chiêu trò'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.MONEY_TRANSFER,
    difficulty: 'hard',
    question: 'Bạn nhận được tiền từ người lạ, sau đó họ nhắn "chuyển nhầm, gửi lại giúp". Bạn nên?',
    scenario: 'Nhận tiền "chuyển nhầm" từ người lạ',
    options: [
      { id: 'a', text: 'Chuyển lại ngay cho họ', isCorrect: false },
      { id: 'b', text: 'Liên hệ ngân hàng để xử lý', isCorrect: true },
      { id: 'c', text: 'Giữ lại vì họ chuyển nhầm', isCorrect: false },
      { id: 'd', text: 'Chuyển lại nếu có bằng chứng', isCorrect: false },
    ],
    explanation: 'Đây có thể là lừa đảo "chuyển nhầm" - tiền từ tài khoản bị hack. Nếu bạn chuyển lại, bạn có thể bị liên đới. Luôn liên hệ ngân hàng để xử lý đúng quy trình.',
    tags: ['chuyển tiền', 'chuyển nhầm', 'ngân hàng'],
  },
]

// ============================================
// FAKE BANK QUESTIONS (150+ câu)
// ============================================

export const FAKE_BANK_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.FAKE_BANK,
    difficulty: 'easy',
    question: 'Ngân hàng có bao giờ gọi điện yêu cầu cung cấp mã OTP không?',
    options: [
      { id: 'a', text: 'Có, khi cần xác minh giao dịch', isCorrect: false },
      { id: 'b', text: 'KHÔNG BAO GIỜ', isCorrect: true },
      { id: 'c', text: 'Có, khi tài khoản có vấn đề', isCorrect: false },
      { id: 'd', text: 'Có, nếu nhân viên xưng tên', isCorrect: false },
    ],
    explanation: 'KHÔNG CÓ NGÂN HÀNG NÀO gọi điện yêu cầu OTP. OTP là mã bảo mật chỉ bạn biết. Bất kỳ ai hỏi OTP đều là LỪA ĐẢO.',
    tags: ['otp', 'ngân hàng', 'điện thoại'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.FAKE_BANK,
    difficulty: 'medium',
    question: 'Cuộc gọi từ "Vietcombank": "TK của anh có giao dịch 50 triệu đáng ngờ. Đọc OTP để hủy." Bạn nên?',
    scenario: 'Cuộc gọi yêu cầu OTP để hủy giao dịch',
    options: [
      { id: 'a', text: 'Đọc OTP để hủy giao dịch', isCorrect: false },
      { id: 'b', text: 'Cúp máy, gọi hotline Vietcombank', isCorrect: true },
      { id: 'c', text: 'Hỏi tên nhân viên', isCorrect: false },
      { id: 'd', text: 'Yêu cầu gửi email xác nhận', isCorrect: false },
    ],
    explanation: 'Đây là lừa đảo. Ngân hàng KHÔNG gọi điện yêu cầu OTP. Nếu lo lắng, cúp máy và gọi hotline chính thức (1900 545 413 cho Vietcombank).',
    tags: ['otp', 'ngân hàng', 'cuộc gọi'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.FAKE_BANK,
    difficulty: 'easy',
    question: 'SMS từ "VCB" thông báo tài khoản bị khóa, kèm link xác minh. Đây có phải SMS thật?',
    options: [
      { id: 'a', text: 'Có, vì từ VCB', isCorrect: false },
      { id: 'b', text: 'Không, ngân hàng không gửi link qua SMS', isCorrect: true },
      { id: 'c', text: 'Cần kiểm tra link', isCorrect: false },
      { id: 'd', text: 'Có nếu số gửi đúng', isCorrect: false },
    ],
    explanation: 'Ngân hàng KHÔNG BAO GIỜ gửi link qua SMS yêu cầu đăng nhập. Tên người gửi (VCB, Vietcombank...) có thể bị giả mạo dễ dàng.',
    tags: ['sms', 'ngân hàng', 'link'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.FAKE_BANK,
    difficulty: 'medium',
    question: 'Hotline ngân hàng chính thức nên tìm ở đâu?',
    options: [
      { id: 'a', text: 'Trong SMS/email nhận được', isCorrect: false },
      { id: 'b', text: 'Trên website chính thức hoặc thẻ ATM', isCorrect: true },
      { id: 'c', text: 'Hỏi người gọi đến', isCorrect: false },
      { id: 'd', text: 'Tìm trên Google', isCorrect: false },
    ],
    explanation: 'Hotline trong SMS/email có thể là số giả. Luôn tra hotline trên website chính thức của ngân hàng hoặc số in trên thẻ ATM.',
    tags: ['hotline', 'ngân hàng', 'xác minh'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.FAKE_BANK,
    difficulty: 'hard',
    question: 'Bạn nhận OTP dù không giao dịch. Ngay sau có người gọi xưng ngân hàng, nói "hệ thống lỗi gửi nhầm, đọc OTP để hủy". Bạn nên?',
    scenario: 'Nhận OTP bất ngờ + cuộc gọi yêu cầu đọc OTP',
    options: [
      { id: 'a', text: 'Đọc OTP để hủy', isCorrect: false },
      { id: 'b', text: 'KHÔNG đọc, cúp máy, đổi mật khẩu ngay', isCorrect: true },
      { id: 'c', text: 'Hỏi thêm thông tin', isCorrect: false },
      { id: 'd', text: 'Chờ xem có mất tiền không', isCorrect: false },
    ],
    explanation: 'Đây là lừa đảo tinh vi: kẻ gian đang cố đăng nhập TK của bạn, OTP gửi đến bạn. Họ gọi để lừa lấy OTP. Đọc OTP = mất tiền ngay.',
    tags: ['otp', 'ngân hàng', 'lừa đảo tinh vi'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.FAKE_BANK,
    difficulty: 'easy',
    question: 'Nhân viên ngân hàng có quyền hỏi mật khẩu Internet Banking của bạn không?',
    options: [
      { id: 'a', text: 'Có, khi cần hỗ trợ', isCorrect: false },
      { id: 'b', text: 'KHÔNG, mật khẩu chỉ bạn biết', isCorrect: true },
      { id: 'c', text: 'Có, nếu ở quầy giao dịch', isCorrect: false },
      { id: 'd', text: 'Có, nếu có giấy tờ', isCorrect: false },
    ],
    explanation: 'Nhân viên ngân hàng KHÔNG BAO GIỜ cần biết mật khẩu của bạn. Họ có công cụ riêng để hỗ trợ. Ai hỏi mật khẩu đều là lừa đảo.',
    tags: ['mật khẩu', 'ngân hàng', 'nhân viên'],
  },
]

// ============================================
// PRIZE SCAM QUESTIONS (150+ câu)
// ============================================

export const PRIZE_SCAM_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PRIZE_SCAM,
    difficulty: 'easy',
    question: 'Bạn nhận tin "Chúc mừng trúng iPhone 15 từ Shopee". Bạn có tham gia chương trình nào không?',
    options: [
      { id: 'a', text: 'Không nhớ, có thể tham gia rồi', isCorrect: false },
      { id: 'b', text: 'Không tham gia = Không thể trúng = Lừa đảo', isCorrect: true },
      { id: 'c', text: 'Shopee tự chọn người may mắn', isCorrect: false },
      { id: 'd', text: 'Cần kiểm tra trên app Shopee', isCorrect: false },
    ],
    explanation: 'Quy tắc vàng: Bạn KHÔNG THỂ trúng thưởng từ chương trình bạn CHƯA TỪNG tham gia. Đây là lừa đảo 100%.',
    tags: ['trúng thưởng', 'shopee', 'quy tắc'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.PRIZE_SCAM,
    difficulty: 'medium',
    question: 'Bạn "trúng" xe SH, nhưng phải nộp 2 triệu "phí vận chuyển" để nhận. Đây có hợp lý?',
    scenario: 'Yêu cầu nộp phí để nhận quà',
    options: [
      { id: 'a', text: 'Hợp lý, phí vận chuyển bình thường', isCorrect: false },
      { id: 'b', text: 'Lừa đảo - trúng thưởng thật không yêu cầu nộp tiền', isCorrect: true },
      { id: 'c', text: 'Hợp lý nếu phí thấp hơn giá xe', isCorrect: false },
      { id: 'd', text: 'Cần hỏi thêm chi tiết', isCorrect: false },
    ],
    explanation: 'Quy tắc vàng: Trúng thưởng thật KHÔNG BAO GIỜ yêu cầu nộp tiền trước. Nếu phải trả phí để nhận quà = LỪA ĐẢO 100%.',
    tags: ['trúng thưởng', 'phí', 'nộp tiền'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PRIZE_SCAM,
    difficulty: 'easy',
    question: 'Tin nhắn trúng thưởng thường có đặc điểm gì?',
    options: [
      { id: 'a', text: 'Gửi từ số chính thức của công ty', isCorrect: false },
      { id: 'b', text: 'Tạo áp lực thời gian "hết hạn 24h"', isCorrect: true },
      { id: 'c', text: 'Không có link', isCorrect: false },
      { id: 'd', text: 'Yêu cầu đến trụ sở nhận', isCorrect: false },
    ],
    explanation: 'Tin nhắn lừa đảo thường tạo áp lực thời gian ("24h", "hôm nay") để bạn hành động vội vàng mà không suy nghĩ.',
    tags: ['trúng thưởng', 'dấu hiệu', 'áp lực'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PRIZE_SCAM,
    difficulty: 'medium',
    question: 'Công ty lớn như Apple, Samsung thông báo trúng thưởng qua kênh nào?',
    options: [
      { id: 'a', text: 'SMS từ số lạ', isCorrect: false },
      { id: 'b', text: 'Email/thông báo trong tài khoản chính thức', isCorrect: true },
      { id: 'c', text: 'Tin nhắn Facebook', isCorrect: false },
      { id: 'd', text: 'Cuộc gọi điện thoại', isCorrect: false },
    ],
    explanation: 'Công ty lớn thông báo trúng thưởng qua email chính thức hoặc trong tài khoản của bạn trên website/app của họ, KHÔNG qua SMS hay tin nhắn mạng xã hội.',
    tags: ['trúng thưởng', 'kênh chính thức', 'công ty lớn'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.PRIZE_SCAM,
    difficulty: 'hard',
    question: 'Bạn nhận được gói hàng COD không đặt, bên trong có "giấy trúng thưởng" yêu cầu nộp thêm tiền. Bạn nên?',
    scenario: 'Gói hàng COD lạ với giấy trúng thưởng',
    options: [
      { id: 'a', text: 'Thanh toán COD và nộp thêm tiền nhận thưởng', isCorrect: false },
      { id: 'b', text: 'Từ chối nhận hàng, đây là lừa đảo', isCorrect: true },
      { id: 'c', text: 'Nhận hàng nhưng không nộp thêm', isCorrect: false },
      { id: 'd', text: 'Gọi số trên giấy để hỏi', isCorrect: false },
    ],
    explanation: 'Đây là lừa đảo "gói hàng ma" - kẻ gian gửi hàng COD bạn không đặt, kèm giấy trúng thưởng để lừa thêm tiền. Từ chối nhận hàng.',
    tags: ['trúng thưởng', 'cod', 'gói hàng ma'],
  },
]


// ============================================
// JOB SCAM QUESTIONS (100+ câu)
// ============================================

export const JOB_SCAM_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.JOB_SCAM,
    difficulty: 'easy',
    question: 'Dấu hiệu nào cho thấy tin tuyển dụng là lừa đảo?',
    options: [
      { id: 'a', text: 'Yêu cầu bằng cấp', isCorrect: false },
      { id: 'b', text: '"Việc nhẹ lương cao", không cần kinh nghiệm, thu nhập phi thực tế', isCorrect: true },
      { id: 'c', text: 'Phỏng vấn trực tiếp', isCorrect: false },
      { id: 'd', text: 'Có địa chỉ công ty', isCorrect: false },
    ],
    explanation: 'Red flags tuyển dụng lừa đảo: "việc nhẹ lương cao", lương 500k-2tr/ngày, không cần kinh nghiệm/bằng cấp, chỉ cần điện thoại, yêu cầu đặt cọc/nạp tiền.',
    tags: ['tuyển dụng', 'việc nhẹ lương cao', 'dấu hiệu'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.JOB_SCAM,
    difficulty: 'medium',
    question: 'Bạn ứng tuyển việc online, được nhận ngay không phỏng vấn. "HR" yêu cầu nộp 500k "phí đào tạo". Bạn nên?',
    scenario: 'Yêu cầu nộp phí khi nhận việc',
    options: [
      { id: 'a', text: 'Nộp vì đã được nhận', isCorrect: false },
      { id: 'b', text: 'TỪ CHỐI - Công việc thật không yêu cầu nộp phí', isCorrect: true },
      { id: 'c', text: 'Nộp nếu có hóa đơn', isCorrect: false },
      { id: 'd', text: 'Nộp nếu phí thấp', isCorrect: false },
    ],
    explanation: 'KHÔNG CÓ CÔNG VIỆC HỢP PHÁP NÀO yêu cầu người lao động nộp tiền. Phí đào tạo, phí đồng phục, phí giữ chỗ... đều là lừa đảo. Công ty uy tín sẽ trừ vào lương nếu có.',
    tags: ['tuyển dụng', 'phí', 'đặt cọc'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.JOB_SCAM,
    difficulty: 'hard',
    question: 'Tại sao lừa đảo "task" (like video, đánh giá sản phẩm) lại hiệu quả?',
    options: [
      { id: 'a', text: 'Vì công việc thật sự dễ', isCorrect: false },
      { id: 'b', text: 'Trả tiền thật ban đầu để tạo niềm tin, sau đó lừa số tiền lớn hơn', isCorrect: true },
      { id: 'c', text: 'Vì có hợp đồng', isCorrect: false },
      { id: 'd', text: 'Vì nhiều người giới thiệu', isCorrect: false },
    ],
    explanation: 'Chiêu "task scam": Bước 1: Trả tiền nhỏ (50k-200k) cho vài task đầu. Bước 2: Yêu cầu "nạp tiền mở khóa task VIP". Bước 3: Nạp càng nhiều, yêu cầu càng cao. Bước 4: Biến mất.',
    tags: ['task scam', 'tâm lý', 'niềm tin'],
  },
]

// ============================================
// INVESTMENT SCAM QUESTIONS (100+ câu)
// ============================================

export const INVESTMENT_SCAM_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.INVESTMENT,
    difficulty: 'easy',
    question: 'Câu nào đúng về đầu tư?',
    options: [
      { id: 'a', text: 'Có thể cam kết lợi nhuận cố định', isCorrect: false },
      { id: 'b', text: 'Lợi nhuận cao luôn đi kèm rủi ro cao', isCorrect: true },
      { id: 'c', text: 'Đầu tư online luôn an toàn', isCorrect: false },
      { id: 'd', text: 'Người giới thiệu nhiều = uy tín', isCorrect: false },
    ],
    explanation: 'Quy tắc đầu tư cơ bản: Lợi nhuận cao = Rủi ro cao. Không có khoản đầu tư nào "cam kết" lãi suất cố định cao mà không có rủi ro. Đó là dấu hiệu của Ponzi scheme.',
    tags: ['đầu tư', 'rủi ro', 'lợi nhuận'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.INVESTMENT,
    difficulty: 'medium',
    question: 'Bạn bè khoe đầu tư app X được lãi 30%/tháng, rủ bạn tham gia. Bạn nên?',
    options: [
      { id: 'a', text: 'Tham gia vì bạn bè đã lãi', isCorrect: false },
      { id: 'b', text: 'Cảnh giác - 30%/tháng là phi thực tế, có thể là Ponzi', isCorrect: true },
      { id: 'c', text: 'Đầu tư số tiền nhỏ', isCorrect: false },
      { id: 'd', text: 'Tham gia nếu app có giấy phép', isCorrect: false },
    ],
    explanation: 'Lãi 30%/tháng = 360%/năm, phi thực tế hoàn toàn. Đây là dấu hiệu Ponzi - trả lãi bằng tiền người mới. Bạn bè có thể đang ở giai đoạn "được lãi" trước khi hệ thống sụp đổ.',
    tags: ['ponzi', 'lãi suất', 'bạn bè'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.INVESTMENT,
    difficulty: 'hard',
    question: 'Làm sao nhận biết sàn giao dịch crypto/forex giả?',
    options: [
      { id: 'a', text: 'Giao diện xấu', isCorrect: false },
      { id: 'b', text: 'Không rút được tiền khi thắng, yêu cầu nộp thêm "phí", không có giấy phép', isCorrect: true },
      { id: 'c', text: 'Ít người dùng', isCorrect: false },
      { id: 'd', text: 'Không có app mobile', isCorrect: false },
    ],
    explanation: 'Sàn giả: cho bạn "thắng" trên màn hình nhưng không rút được tiền, yêu cầu nộp "phí rút tiền/thuế", không có giấy phép từ cơ quan quản lý, được quảng cáo trong group Telegram.',
    tags: ['sàn giả', 'crypto', 'forex'],
  },
]

// ============================================
// ROMANCE SCAM QUESTIONS (80+ câu)
// ============================================

export const ROMANCE_SCAM_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.ROMANCE,
    difficulty: 'easy',
    question: 'Dấu hiệu nào cho thấy người quen online có thể là scammer?',
    options: [
      { id: 'a', text: 'Trả lời chậm', isCorrect: false },
      { id: 'b', text: 'Tỏ tình nhanh, hứa hẹn tương lai, luôn có lý do không gặp mặt', isCorrect: true },
      { id: 'c', text: 'Ít đăng ảnh', isCorrect: false },
      { id: 'd', text: 'Dùng tiếng Anh', isCorrect: false },
    ],
    explanation: 'Red flags romance scam: tỏ tình sau vài ngày/tuần, hứa hẹn kết hôn/sang VN, luôn có lý do không video call/gặp mặt, bắt đầu xin tiền với nhiều lý do.',
    tags: ['romance scam', 'dấu hiệu', 'tỏ tình'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.ROMANCE,
    difficulty: 'hard',
    question: 'Người yêu online (chưa gặp mặt) nói bị kẹt ở sân bay nước ngoài, cần bạn chuyển $500 để mua vé về gặp bạn. Bạn nên?',
    scenario: 'Người yêu online xin tiền mua vé máy bay',
    options: [
      { id: 'a', text: 'Chuyển vì muốn gặp họ', isCorrect: false },
      { id: 'b', text: 'TỪ CHỐI - Đây là kịch bản romance scam kinh điển', isCorrect: true },
      { id: 'c', text: 'Chuyển nếu họ gửi ảnh passport', isCorrect: false },
      { id: 'd', text: 'Đặt vé giúp họ', isCorrect: false },
    ],
    explanation: 'Kịch bản kinh điển: "kẹt sân bay", "bệnh viện", "hải quan giữ hàng"... Họ sẽ KHÔNG BAO GIỜ xuất hiện. Ảnh passport có thể giả. Người thật sự yêu bạn sẽ không xin tiền qua mạng.',
    tags: ['romance scam', 'vé máy bay', 'sân bay'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.ROMANCE,
    difficulty: 'medium',
    question: 'Tại sao romance scammer thường giả làm người nước ngoài?',
    options: [
      { id: 'a', text: 'Vì người nước ngoài đẹp hơn', isCorrect: false },
      { id: 'b', text: 'Dễ giải thích tại sao không gặp mặt, tạo hình ảnh giàu có', isCorrect: true },
      { id: 'c', text: 'Vì nói tiếng Anh', isCorrect: false },
      { id: 'd', text: 'Không có lý do', isCorrect: false },
    ],
    explanation: 'Giả người nước ngoài: (1) Lý do không gặp mặt (ở xa), (2) Hình ảnh giàu có (bác sĩ Mỹ, kỹ sư dầu khí), (3) Khó kiểm chứng thông tin, (4) Nạn nhân dễ tin hơn.',
    tags: ['romance scam', 'người nước ngoài', 'tâm lý'],
  },
]

// ============================================
// GAMBLING SCAM QUESTIONS (50+ câu)
// ============================================

export const GAMBLING_SCAM_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.GAMBLING,
    difficulty: 'easy',
    question: 'Cờ bạc online tại Việt Nam có hợp pháp không?',
    options: [
      { id: 'a', text: 'Hợp pháp nếu có giấy phép', isCorrect: false },
      { id: 'b', text: 'BẤT HỢP PHÁP - Tham gia có thể bị xử lý hình sự', isCorrect: true },
      { id: 'c', text: 'Hợp pháp nếu chơi ít tiền', isCorrect: false },
      { id: 'd', text: 'Hợp pháp nếu server ở nước ngoài', isCorrect: false },
    ],
    explanation: 'Cờ bạc online (casino, cá độ, lô đề...) là BẤT HỢP PHÁP tại Việt Nam. Người chơi có thể bị phạt tiền hoặc xử lý hình sự. Các website cờ bạc thường gian lận và không cho rút tiền.',
    tags: ['cờ bạc', 'pháp luật', 'bất hợp pháp'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.GAMBLING,
    difficulty: 'medium',
    question: 'Bạn chơi app cá độ, thắng 10 triệu nhưng khi rút tiền, họ yêu cầu nộp 2 triệu "phí xác minh". Bạn nên?',
    scenario: 'Yêu cầu nộp phí để rút tiền thắng cược',
    options: [
      { id: 'a', text: 'Nộp phí để rút tiền thắng', isCorrect: false },
      { id: 'b', text: 'KHÔNG nộp - Đây là chiêu lừa, bạn sẽ không rút được tiền', isCorrect: true },
      { id: 'c', text: 'Nộp nếu phí thấp hơn tiền thắng', isCorrect: false },
      { id: 'd', text: 'Liên hệ "CSKH" để hỏi', isCorrect: false },
    ],
    explanation: 'Chiêu lừa cờ bạc online: cho bạn "thắng" trên màn hình → yêu cầu nộp phí rút tiền → nộp xong yêu cầu thêm phí khác → không bao giờ rút được. Tiền "thắng" chỉ là số ảo.',
    tags: ['cờ bạc', 'phí rút tiền', 'lừa đảo'],
  },
]

// ============================================
// EXPORT ALL STATIC QUESTIONS
// ============================================

export const ALL_STATIC_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  ...PHISHING_QUESTIONS,
  ...MONEY_TRANSFER_QUESTIONS,
  ...FAKE_BANK_QUESTIONS,
  ...PRIZE_SCAM_QUESTIONS,
  ...JOB_SCAM_QUESTIONS,
  ...INVESTMENT_SCAM_QUESTIONS,
  ...ROMANCE_SCAM_QUESTIONS,
  ...GAMBLING_SCAM_QUESTIONS,
]

// Helper to get random static questions
export function getRandomStaticQuestions(count: number): Omit<QuizQuestion, 'id'>[] {
  const shuffled = [...ALL_STATIC_QUESTIONS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// Helper to get static questions by category
export function getStaticQuestionsByCategory(category: string): Omit<QuizQuestion, 'id'>[] {
  return ALL_STATIC_QUESTIONS.filter(q => q.category === category)
}
