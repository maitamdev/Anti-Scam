/**
 * Extra Quiz Questions - Câu hỏi bổ sung về nhận biết lừa đảo
 * Bao gồm: hình ảnh, tình huống thực tế, deepfake, AI scam, và nhiều chủ đề mới
 */

import { QuizQuestion, QUIZ_CATEGORIES } from './quizData'

// ============================================
// OTP & BANKING SCAM QUESTIONS (100+ câu)
// ============================================

export const OTP_BANKING_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.OTP_SCAM,
    difficulty: 'hard',
    question: 'Bạn nhận OTP từ ngân hàng dù không giao dịch. 30 giây sau có cuộc gọi: "Đây là bộ phận bảo mật, hệ thống phát hiện ai đó đang cố đăng nhập TK của anh/chị. Đọc OTP để chúng tôi khóa giao dịch." Bạn nên?',
    scenario: 'Nhận OTP bất ngờ + cuộc gọi "bảo mật"',
    options: [
      { id: 'a', text: 'Đọc OTP để khóa giao dịch đáng ngờ', isCorrect: false },
      { id: 'b', text: 'CÚP MÁY NGAY, đổi mật khẩu, gọi hotline ngân hàng', isCorrect: true },
      { id: 'c', text: 'Hỏi tên nhân viên và mã số', isCorrect: false },
      { id: 'd', text: 'Yêu cầu gửi email xác nhận', isCorrect: false },
    ],
    explanation: 'Đây là lừa đảo TINH VI NHẤT: Kẻ gian đang cố đăng nhập TK của bạn → OTP gửi đến bạn → Họ gọi điện lừa lấy OTP. Nếu đọc OTP = MẤT TIỀN NGAY. Ngân hàng KHÔNG BAO GIỜ gọi hỏi OTP.',
    tags: ['otp', 'ngân hàng', 'cuộc gọi', 'bảo mật giả'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.OTP_SCAM,
    difficulty: 'easy',
    question: 'Mã OTP có thời hạn bao lâu và dùng được mấy lần?',
    options: [
      { id: 'a', text: 'Vĩnh viễn, dùng nhiều lần', isCorrect: false },
      { id: 'b', text: 'Thường 2-5 phút, chỉ dùng 1 lần', isCorrect: true },
      { id: 'c', text: '24 giờ, dùng 3 lần', isCorrect: false },
      { id: 'd', text: '1 tuần, dùng không giới hạn', isCorrect: false },
    ],
    explanation: 'OTP (One-Time Password) có nghĩa là mật khẩu dùng 1 lần. Thường hết hạn sau 2-5 phút. Đây là lý do kẻ gian phải gọi điện NGAY khi bạn nhận OTP.',
    tags: ['otp', 'bảo mật', 'thời hạn'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.FAKE_BANK,
    difficulty: 'medium',
    question: 'Bạn nhận cuộc gọi từ số 1900xxxx (giống hotline ngân hàng): "Thẻ tín dụng của anh/chị có giao dịch 50 triệu tại Singapore. Bấm 1 để xác nhận, bấm 2 để hủy." Bạn nên?',
    scenario: 'Cuộc gọi tự động từ "ngân hàng"',
    options: [
      { id: 'a', text: 'Bấm 2 để hủy giao dịch', isCorrect: false },
      { id: 'b', text: 'Cúp máy, gọi lại hotline chính thức từ website ngân hàng', isCorrect: true },
      { id: 'c', text: 'Bấm 1 để xác nhận không phải mình', isCorrect: false },
      { id: 'd', text: 'Chờ nói chuyện với nhân viên', isCorrect: false },
    ],
    explanation: 'Số hotline có thể bị giả mạo (spoofing). Cuộc gọi tự động yêu cầu bấm phím thường là lừa đảo. Luôn CÚP MÁY và gọi lại số hotline tra trên website chính thức.',
    tags: ['ngân hàng', 'hotline giả', 'spoofing'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.FAKE_BANK,
    difficulty: 'hard',
    question: 'Kẻ lừa đảo có thể làm gì với số CMND/CCCD của bạn?',
    options: [
      { id: 'a', text: 'Không làm được gì', isCorrect: false },
      { id: 'b', text: 'Mở tài khoản ngân hàng, vay tiền online, đăng ký SIM', isCorrect: true },
      { id: 'c', text: 'Chỉ xem thông tin cá nhân', isCorrect: false },
      { id: 'd', text: 'Chỉ nguy hiểm nếu có cả ảnh CMND', isCorrect: false },
    ],
    explanation: 'Với số CMND/CCCD, kẻ gian có thể: mở tài khoản ngân hàng giả, vay tiền online (bạn phải trả), đăng ký SIM rác, mạo danh bạn lừa người khác. KHÔNG BAO GIỜ chia sẻ số CMND.',
    tags: ['cmnd', 'cccd', 'đánh cắp danh tính'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.OTP_SCAM,
    difficulty: 'medium',
    question: 'Bạn đang bán hàng online, người mua nói "Em chuyển rồi nhưng ngân hàng yêu cầu anh/chị nhập OTP để nhận tiền". Đây có đúng không?',
    scenario: 'Người mua yêu cầu OTP để "nhận tiền"',
    options: [
      { id: 'a', text: 'Đúng, một số ngân hàng yêu cầu vậy', isCorrect: false },
      { id: 'b', text: 'SAI - Nhận tiền KHÔNG CẦN OTP, đây là lừa đảo', isCorrect: true },
      { id: 'c', text: 'Đúng nếu số tiền lớn', isCorrect: false },
      { id: 'd', text: 'Cần hỏi ngân hàng', isCorrect: false },
    ],
    explanation: 'NHẬN TIỀN KHÔNG BAO GIỜ CẦN OTP. OTP chỉ dùng khi BẠN chuyển tiền đi. Nếu ai đó nói bạn cần OTP để nhận tiền = LỪA ĐẢO 100%.',
    tags: ['otp', 'bán hàng online', 'nhận tiền'],
  },
]

// ============================================
// DEEPFAKE & AI SCAM QUESTIONS (Mới - 50+ câu)
// ============================================

export const DEEPFAKE_AI_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'hard',
    question: 'Deepfake là gì và tại sao nguy hiểm trong lừa đảo?',
    options: [
      { id: 'a', text: 'Phần mềm chỉnh sửa ảnh thông thường', isCorrect: false },
      { id: 'b', text: 'Công nghệ AI tạo video/giọng nói giả giống người thật', isCorrect: true },
      { id: 'c', text: 'Loại virus máy tính', isCorrect: false },
      { id: 'd', text: 'Ứng dụng gọi video', isCorrect: false },
    ],
    explanation: 'Deepfake dùng AI để tạo video/giọng nói giả giống hệt người thật. Kẻ gian có thể tạo video "sếp" yêu cầu chuyển tiền, hoặc giả giọng người thân gọi điện. Luôn xác minh qua nhiều kênh.',
    tags: ['deepfake', 'ai', 'công nghệ mới'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'hard',
    question: 'Bạn nhận video call từ "sếp" yêu cầu chuyển tiền gấp. Video rõ nét, giọng nói giống hệt. Bạn nên làm gì?',
    scenario: 'Video call từ "sếp" có thể là deepfake',
    options: [
      { id: 'a', text: 'Chuyển ngay vì đã thấy mặt sếp', isCorrect: false },
      { id: 'b', text: 'Hỏi câu hỏi chỉ sếp thật biết, gọi lại số điện thoại khác xác nhận', isCorrect: true },
      { id: 'c', text: 'Yêu cầu sếp vẫy tay để kiểm tra', isCorrect: false },
      { id: 'd', text: 'Tin tưởng vì video call không thể giả', isCorrect: false },
    ],
    explanation: 'Deepfake có thể tạo video call giả rất thuyết phục. Cách xác minh: (1) Hỏi câu hỏi bí mật, (2) Gọi lại số điện thoại đã lưu, (3) Xác nhận qua kênh khác (email công ty, gặp trực tiếp).',
    tags: ['deepfake', 'video call', 'ceo fraud'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'medium',
    question: 'Dấu hiệu nào có thể nhận biết video deepfake?',
    options: [
      { id: 'a', text: 'Video quá mượt, không có lỗi', isCorrect: false },
      { id: 'b', text: 'Chớp mắt bất thường, viền mặt mờ, ánh sáng không khớp', isCorrect: true },
      { id: 'c', text: 'Âm thanh rõ ràng', isCorrect: false },
      { id: 'd', text: 'Nền phông đẹp', isCorrect: false },
    ],
    explanation: 'Dấu hiệu deepfake: chớp mắt ít/bất thường, viền mặt mờ hoặc nhòe, ánh sáng trên mặt không khớp với môi trường, chuyển động môi không khớp âm thanh, tóc/tai bị biến dạng.',
    tags: ['deepfake', 'nhận biết', 'dấu hiệu'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.IMPERSONATION,
    difficulty: 'hard',
    question: 'Bạn nhận cuộc gọi, giọng nói GIỐNG HỆT mẹ bạn, khóc và nói "Con ơi, mẹ bị tai nạn, chuyển gấp 20 triệu". Bạn nên?',
    scenario: 'Cuộc gọi giọng nói giả bằng AI',
    options: [
      { id: 'a', text: 'Chuyển ngay vì giọng mẹ không thể nhầm', isCorrect: false },
      { id: 'b', text: 'Cúp máy, gọi lại số mẹ đã lưu để xác nhận', isCorrect: true },
      { id: 'c', text: 'Hỏi "Mẹ đang ở đâu?"', isCorrect: false },
      { id: 'd', text: 'Chuyển một phần tiền trước', isCorrect: false },
    ],
    explanation: 'AI có thể clone giọng nói chỉ với vài giây audio từ mạng xã hội. Kẻ gian dùng giọng giả để lừa người thân. LUÔN gọi lại số đã lưu để xác nhận, không tin giọng nói.',
    tags: ['ai voice', 'giả giọng', 'người thân'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'medium',
    question: 'Chatbot AI lừa đảo có thể làm gì?',
    options: [
      { id: 'a', text: 'Chỉ trả lời câu hỏi đơn giản', isCorrect: false },
      { id: 'b', text: 'Giả làm CSKH, tư vấn viên, thậm chí "người yêu" để lừa tiền', isCorrect: true },
      { id: 'c', text: 'Không thể lừa được ai', isCorrect: false },
      { id: 'd', text: 'Chỉ gửi tin nhắn spam', isCorrect: false },
    ],
    explanation: 'Chatbot AI hiện đại có thể: giả làm CSKH ngân hàng, tư vấn đầu tư, thậm chí "người yêu" trong romance scam. Chúng trả lời tự nhiên, hoạt động 24/7, và có thể lừa nhiều người cùng lúc.',
    tags: ['chatbot', 'ai', 'cskh giả'],
  },
]

// ============================================
// SOCIAL MEDIA SCAM QUESTIONS (100+ câu)
// ============================================

export const SOCIAL_MEDIA_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'easy',
    question: 'Bạn nhận tin nhắn Facebook: "Tài khoản của bạn vi phạm chính sách, click link để xác minh trong 24h hoặc bị khóa vĩnh viễn". Đây có phải thật?',
    options: [
      { id: 'a', text: 'Có, Facebook thường gửi cảnh báo như vậy', isCorrect: false },
      { id: 'b', text: 'Không, đây là phishing giả mạo Facebook', isCorrect: true },
      { id: 'c', text: 'Cần click link để kiểm tra', isCorrect: false },
      { id: 'd', text: 'Có nếu từ trang Facebook chính thức', isCorrect: false },
    ],
    explanation: 'Facebook KHÔNG gửi tin nhắn yêu cầu click link xác minh. Thông báo thật sẽ hiện trong phần "Cài đặt > Bảo mật" của tài khoản. Đây là phishing để đánh cắp tài khoản.',
    tags: ['facebook', 'phishing', 'tài khoản'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'medium',
    question: 'Bạn thấy quảng cáo "Đăng ký nhận iPhone miễn phí, chỉ cần like và share". Bạn nên?',
    scenario: 'Quảng cáo tặng quà trên mạng xã hội',
    options: [
      { id: 'a', text: 'Like và share để có cơ hội trúng', isCorrect: false },
      { id: 'b', text: 'Bỏ qua, đây là chiêu câu like/lừa đảo', isCorrect: true },
      { id: 'c', text: 'Đăng ký nếu không yêu cầu thông tin', isCorrect: false },
      { id: 'd', text: 'Chia sẻ cho bạn bè cùng tham gia', isCorrect: false },
    ],
    explanation: 'Các trang "tặng quà miễn phí" thường là: (1) Câu like để bán trang, (2) Thu thập thông tin cá nhân, (3) Dẫn đến website lừa đảo. Không có ai tặng iPhone miễn phí cả.',
    tags: ['facebook', 'câu like', 'tặng quà giả'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'medium',
    question: 'Tại sao không nên đăng nhập Facebook/Zalo qua link trong tin nhắn?',
    options: [
      { id: 'a', text: 'Vì tốn data', isCorrect: false },
      { id: 'b', text: 'Link có thể dẫn đến trang giả, đánh cắp mật khẩu', isCorrect: true },
      { id: 'c', text: 'Vì chậm hơn app', isCorrect: false },
      { id: 'd', text: 'Không có lý do', isCorrect: false },
    ],
    explanation: 'Link trong tin nhắn có thể dẫn đến trang đăng nhập GIẢ giống hệt thật. Khi bạn nhập mật khẩu, kẻ gian sẽ đánh cắp ngay. Luôn mở app trực tiếp hoặc gõ URL vào trình duyệt.',
    tags: ['đăng nhập', 'link giả', 'mật khẩu'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.ROMANCE,
    difficulty: 'hard',
    question: 'Bạn quen người trên Tinder 1 tháng, họ nói yêu bạn và mời đầu tư crypto cùng, đã "lãi 500%". Bạn nên?',
    scenario: 'Người quen online mời đầu tư',
    options: [
      { id: 'a', text: 'Đầu tư vì họ đã chứng minh lãi', isCorrect: false },
      { id: 'b', text: 'Từ chối, đây là "pig butchering" - lừa đảo tình cảm + đầu tư', isCorrect: true },
      { id: 'c', text: 'Đầu tư số tiền nhỏ để thử', isCorrect: false },
      { id: 'd', text: 'Đồng ý nếu họ video call', isCorrect: false },
    ],
    explanation: '"Pig butchering" là lừa đảo kết hợp: tạo tình cảm (nuôi lợn) → mời đầu tư → lừa tiền (mổ lợn). Họ cho bạn "lãi" ban đầu để tin tưởng, sau đó lừa số tiền lớn. KHÔNG đầu tư theo người quen online.',
    tags: ['pig butchering', 'tinder', 'đầu tư', 'tình cảm'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PRIVACY,
    difficulty: 'easy',
    question: 'Thông tin nào KHÔNG NÊN chia sẻ công khai trên mạng xã hội?',
    options: [
      { id: 'a', text: 'Sở thích, phim yêu thích', isCorrect: false },
      { id: 'b', text: 'Ngày sinh đầy đủ, địa chỉ nhà, lịch trình đi du lịch', isCorrect: true },
      { id: 'c', text: 'Ảnh phong cảnh', isCorrect: false },
      { id: 'd', text: 'Tên trường đã học', isCorrect: false },
    ],
    explanation: 'Ngày sinh + địa chỉ có thể dùng để đánh cắp danh tính. Lịch trình du lịch cho kẻ gian biết nhà bạn đang trống. Tên mẹ, tên thú cưng thường là câu hỏi bảo mật - không nên chia sẻ.',
    tags: ['mạng xã hội', 'quyền riêng tư', 'thông tin cá nhân'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'medium',
    question: 'Bạn nhận tin nhắn từ "bạn thân" trên Facebook: "Ê, có phải mày trong video này không? [link]". Bạn nên?',
    scenario: 'Tin nhắn với link video "có bạn"',
    options: [
      { id: 'a', text: 'Click xem ngay vì tò mò', isCorrect: false },
      { id: 'b', text: 'Không click, hỏi bạn qua kênh khác (gọi điện, Zalo)', isCorrect: true },
      { id: 'c', text: 'Click nếu link từ YouTube', isCorrect: false },
      { id: 'd', text: 'Reply hỏi "Video gì?"', isCorrect: false },
    ],
    explanation: 'Đây là chiêu phishing phổ biến. Tài khoản bạn bè có thể bị hack. Link dẫn đến trang đăng nhập giả hoặc tải malware. Luôn xác nhận qua kênh khác trước khi click link lạ.',
    tags: ['facebook', 'link video', 'hack tài khoản'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PRIVACY,
    difficulty: 'medium',
    question: 'Tại sao nên tắt định vị khi đăng ảnh lên mạng xã hội?',
    options: [
      { id: 'a', text: 'Để tiết kiệm pin', isCorrect: false },
      { id: 'b', text: 'Ảnh có thể chứa vị trí chính xác, lộ địa chỉ nhà/công ty', isCorrect: true },
      { id: 'c', text: 'Để ảnh đẹp hơn', isCorrect: false },
      { id: 'd', text: 'Không cần thiết', isCorrect: false },
    ],
    explanation: 'Ảnh chụp có thể chứa metadata với tọa độ GPS chính xác. Kẻ gian có thể biết địa chỉ nhà, nơi làm việc, thói quen di chuyển của bạn. Nên tắt định vị hoặc xóa metadata trước khi đăng.',
    tags: ['định vị', 'metadata', 'ảnh'],
  },
]

// ============================================
// E-COMMERCE SCAM QUESTIONS (100+ câu)
// ============================================

export const ECOMMERCE_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.PRIZE_SCAM,
    difficulty: 'easy',
    question: 'Bạn đặt hàng Shopee 200k, nhận tin nhắn: "Đơn hàng của bạn trúng thưởng 5 triệu! Nộp 500k phí xử lý để nhận." Đây có thật?',
    scenario: 'Trúng thưởng khi mua hàng online',
    options: [
      { id: 'a', text: 'Có thể thật, Shopee hay có khuyến mãi', isCorrect: false },
      { id: 'b', text: 'Lừa đảo - không có chương trình nào yêu cầu nộp phí nhận thưởng', isCorrect: true },
      { id: 'c', text: 'Thật nếu tin nhắn từ Shopee', isCorrect: false },
      { id: 'd', text: 'Nộp phí nếu dưới giá trị giải thưởng', isCorrect: false },
    ],
    explanation: 'Shopee và các sàn TMĐT KHÔNG BAO GIỜ yêu cầu nộp phí để nhận thưởng. Giải thưởng thật sẽ được cộng trực tiếp vào tài khoản hoặc gửi về địa chỉ miễn phí.',
    tags: ['shopee', 'trúng thưởng', 'phí'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.MONEY_TRANSFER,
    difficulty: 'medium',
    question: 'Khi mua hàng online, phương thức thanh toán nào AN TOÀN NHẤT?',
    options: [
      { id: 'a', text: 'Chuyển khoản trước cho người bán', isCorrect: false },
      { id: 'b', text: 'Thanh toán qua sàn TMĐT (Shopee, Lazada) hoặc COD', isCorrect: true },
      { id: 'c', text: 'Chuyển qua Zalo Pay cho người bán', isCorrect: false },
      { id: 'd', text: 'Đặt cọc 50%', isCorrect: false },
    ],
    explanation: 'Thanh toán qua sàn TMĐT được bảo vệ - tiền giữ lại đến khi bạn nhận hàng. COD (trả tiền khi nhận) cũng an toàn. KHÔNG chuyển khoản trực tiếp cho người bán lạ.',
    tags: ['mua hàng online', 'thanh toán', 'an toàn'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.MONEY_TRANSFER,
    difficulty: 'hard',
    question: 'Bạn bán điện thoại cũ, người mua chuyển khoản và gửi ảnh "chuyển tiền thành công" nhưng bạn chưa nhận được tiền. Họ nói "ngân hàng đang xử lý, giao hàng đi". Bạn nên?',
    scenario: 'Người mua gửi ảnh chuyển tiền giả',
    options: [
      { id: 'a', text: 'Giao hàng vì có bằng chứng chuyển tiền', isCorrect: false },
      { id: 'b', text: 'KHÔNG giao cho đến khi tiền VÀO TÀI KHOẢN thật', isCorrect: true },
      { id: 'c', text: 'Giao nếu họ gửi thêm ảnh biên lai', isCorrect: false },
      { id: 'd', text: 'Chờ 1 tiếng rồi giao', isCorrect: false },
    ],
    explanation: 'Ảnh chuyển tiền có thể PHOTOSHOP dễ dàng. Chuyển khoản liên ngân hàng chỉ mất vài giây đến vài phút. Nếu tiền chưa vào = CHƯA CHUYỂN. Chỉ giao hàng khi tiền đã vào tài khoản.',
    tags: ['bán hàng', 'ảnh giả', 'photoshop'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'easy',
    question: 'Dấu hiệu nào cho thấy shop online có thể là lừa đảo?',
    options: [
      { id: 'a', text: 'Có nhiều đánh giá 5 sao', isCorrect: false },
      { id: 'b', text: 'Giá rẻ bất thường, chỉ nhận chuyển khoản, không có địa chỉ rõ ràng', isCorrect: true },
      { id: 'c', text: 'Giao hàng nhanh', isCorrect: false },
      { id: 'd', text: 'Có fanpage Facebook', isCorrect: false },
    ],
    explanation: 'Dấu hiệu shop lừa đảo: giá rẻ hơn thị trường 30-50%, chỉ nhận chuyển khoản trước, không có địa chỉ/SĐT rõ ràng, đánh giá toàn 5 sao giống nhau, mới lập gần đây.',
    tags: ['shop online', 'dấu hiệu', 'giá rẻ'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.PRIZE_SCAM,
    difficulty: 'medium',
    question: 'Bạn nhận gói hàng COD 500k mà không đặt. Shipper nói "Quà tặng từ công ty, chỉ cần trả phí ship". Bạn nên?',
    scenario: 'Gói hàng COD không đặt',
    options: [
      { id: 'a', text: 'Trả tiền nhận hàng vì có thể là quà', isCorrect: false },
      { id: 'b', text: 'TỪ CHỐI nhận, đây là lừa đảo "gói hàng ma"', isCorrect: true },
      { id: 'c', text: 'Mở xem trước rồi quyết định', isCorrect: false },
      { id: 'd', text: 'Nhận nếu phí ship thấp', isCorrect: false },
    ],
    explanation: 'Lừa đảo "gói hàng ma": kẻ gian gửi COD đến địa chỉ ngẫu nhiên, bên trong là hàng rẻ tiền hoặc rác. Nếu không đặt hàng = KHÔNG NHẬN. Có quyền từ chối COD.',
    tags: ['cod', 'gói hàng ma', 'shipper'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.MONEY_TRANSFER,
    difficulty: 'medium',
    question: 'Khi mua hàng qua Facebook/Zalo, bạn nên làm gì để tránh bị lừa?',
    options: [
      { id: 'a', text: 'Tin tưởng nếu shop có nhiều like', isCorrect: false },
      { id: 'b', text: 'Chọn COD, kiểm tra hàng trước khi trả tiền, không đặt cọc', isCorrect: true },
      { id: 'c', text: 'Chuyển khoản nếu shop có địa chỉ', isCorrect: false },
      { id: 'd', text: 'Mua nếu giá rẻ', isCorrect: false },
    ],
    explanation: 'Mua hàng qua MXH: (1) Chọn COD - trả tiền khi nhận, (2) Kiểm tra hàng trước khi trả, (3) Không đặt cọc, (4) Tìm hiểu shop qua review thật, (5) Cảnh giác giá quá rẻ.',
    tags: ['facebook', 'zalo', 'mua hàng', 'cod'],
  },
]

// ============================================
// INVESTMENT & CRYPTO SCAM QUESTIONS (100+ câu)
// ============================================

export const INVESTMENT_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.INVESTMENT,
    difficulty: 'easy',
    question: 'Dấu hiệu nào cho thấy dự án đầu tư là lừa đảo Ponzi?',
    options: [
      { id: 'a', text: 'Có văn phòng đẹp', isCorrect: false },
      { id: 'b', text: 'Cam kết lãi suất cố định cao, thưởng khi giới thiệu người mới', isCorrect: true },
      { id: 'c', text: 'Có website chuyên nghiệp', isCorrect: false },
      { id: 'd', text: 'Nhiều người tham gia', isCorrect: false },
    ],
    explanation: 'Ponzi scheme: trả lãi cho người cũ bằng tiền người mới. Dấu hiệu: lãi suất cố định cao (2%/ngày, 30%/tháng), thưởng giới thiệu, không rõ nguồn lợi nhuận. Sẽ sụp đổ khi hết người mới.',
    tags: ['ponzi', 'đầu tư', 'lãi suất'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.INVESTMENT,
    difficulty: 'medium',
    question: 'Bạn được mời vào group Telegram "Tín hiệu Crypto VIP", admin khoe lãi 1000% và mời nạp tiền vào sàn họ giới thiệu. Bạn nên?',
    scenario: 'Group đầu tư crypto trên Telegram',
    options: [
      { id: 'a', text: 'Tham gia vì có nhiều người lãi', isCorrect: false },
      { id: 'b', text: 'Thoát group, đây là lừa đảo "pump and dump" hoặc sàn giả', isCorrect: true },
      { id: 'c', text: 'Thử với số tiền nhỏ', isCorrect: false },
      { id: 'd', text: 'Tham gia nếu admin có chứng chỉ', isCorrect: false },
    ],
    explanation: 'Group "VIP Trading" là lừa đảo: (1) Sàn giả - nạp tiền vào không rút được, (2) Pump and dump - họ mua trước, kêu bạn mua, rồi bán, (3) Ảnh lãi là photoshop.',
    tags: ['telegram', 'crypto', 'group vip', 'pump dump'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.INVESTMENT,
    difficulty: 'hard',
    question: '"Rug pull" trong crypto là gì?',
    options: [
      { id: 'a', text: 'Kỹ thuật trading', isCorrect: false },
      { id: 'b', text: 'Nhà phát triển bỏ trốn với tiền nhà đầu tư sau khi tạo token', isCorrect: true },
      { id: 'c', text: 'Loại ví crypto', isCorrect: false },
      { id: 'd', text: 'Phí giao dịch', isCorrect: false },
    ],
    explanation: 'Rug pull: nhà phát triển tạo token mới, quảng cáo rầm rộ, khi nhiều người mua → họ bán hết token và biến mất, giá về 0. Cảnh giác với token mới, không rõ nguồn gốc.',
    tags: ['rug pull', 'crypto', 'token'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.INVESTMENT,
    difficulty: 'medium',
    question: 'Bạn thấy quảng cáo: "Elon Musk tặng Bitcoin! Gửi 0.1 BTC, nhận lại 0.2 BTC". Đây có thật?',
    scenario: 'Quảng cáo tặng crypto từ người nổi tiếng',
    options: [
      { id: 'a', text: 'Có thể thật, tỷ phú hay làm từ thiện', isCorrect: false },
      { id: 'b', text: 'LỪA ĐẢO 100% - không ai tặng tiền kiểu "gửi trước nhận sau"', isCorrect: true },
      { id: 'c', text: 'Thật nếu trên Twitter chính thức', isCorrect: false },
      { id: 'd', text: 'Thử với số tiền nhỏ', isCorrect: false },
    ],
    explanation: 'Lừa đảo "giveaway giả": giả mạo người nổi tiếng, hứa nhân đôi crypto. Quy tắc: KHÔNG AI cho tiền kiểu "gửi trước nhận sau". Tài khoản Twitter/YouTube có thể bị hack hoặc giả mạo.',
    tags: ['giveaway giả', 'bitcoin', 'người nổi tiếng'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.INVESTMENT,
    difficulty: 'easy',
    question: 'Sàn giao dịch crypto nào được coi là uy tín?',
    options: [
      { id: 'a', text: 'Sàn được quảng cáo trong group Telegram', isCorrect: false },
      { id: 'b', text: 'Sàn lớn như Binance, Coinbase, có giấy phép và lịch sử lâu năm', isCorrect: true },
      { id: 'c', text: 'Sàn hứa lãi suất cao', isCorrect: false },
      { id: 'd', text: 'Sàn có giao diện đẹp', isCorrect: false },
    ],
    explanation: 'Sàn uy tín: có giấy phép, hoạt động nhiều năm, khối lượng giao dịch lớn, có bảo hiểm quỹ. Ví dụ: Binance, Coinbase, Kraken. Tránh sàn lạ được quảng cáo trong group.',
    tags: ['sàn crypto', 'binance', 'uy tín'],
  },
]

// ============================================
// GOVERNMENT IMPERSONATION SCAM (50+ câu)
// ============================================

export const GOVERNMENT_SCAM_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'hard',
    question: 'Bạn nhận cuộc gọi: "Đây là Công an TP.HCM, CMND của anh/chị liên quan đến vụ rửa tiền 5 tỷ. Chuyển tiền vào tài khoản điều tra để chứng minh vô tội." Bạn nên?',
    scenario: 'Cuộc gọi từ "công an" về vụ án',
    options: [
      { id: 'a', text: 'Chuyển tiền để chứng minh vô tội', isCorrect: false },
      { id: 'b', text: 'CÚP MÁY - Công an không làm việc qua điện thoại như vậy', isCorrect: true },
      { id: 'c', text: 'Yêu cầu gặp trực tiếp', isCorrect: false },
      { id: 'd', text: 'Hỏi số hiệu công an', isCorrect: false },
    ],
    explanation: 'Đây là lừa đảo "giả danh công an" phổ biến nhất. Công an KHÔNG BAO GIỜ: (1) Gọi điện yêu cầu chuyển tiền, (2) Có "tài khoản điều tra", (3) Đe dọa qua điện thoại. Nếu có vụ án thật, họ gửi giấy triệu tập.',
    tags: ['công an giả', 'rửa tiền', 'tài khoản điều tra'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'medium',
    question: 'Cơ quan nhà nước có bao giờ yêu cầu chuyển tiền qua điện thoại không?',
    options: [
      { id: 'a', text: 'Có, trong trường hợp khẩn cấp', isCorrect: false },
      { id: 'b', text: 'KHÔNG BAO GIỜ - mọi giao dịch phải có giấy tờ chính thức', isCorrect: true },
      { id: 'c', text: 'Có, nếu là cấp cao', isCorrect: false },
      { id: 'd', text: 'Có, khi nộp phạt', isCorrect: false },
    ],
    explanation: 'Cơ quan nhà nước (công an, tòa án, thuế...) KHÔNG BAO GIỜ yêu cầu chuyển tiền qua điện thoại. Mọi thủ tục đều có giấy tờ chính thức, thực hiện tại trụ sở hoặc qua cổng dịch vụ công.',
    tags: ['cơ quan nhà nước', 'chuyển tiền', 'giấy tờ'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'medium',
    question: 'Bạn nhận cuộc gọi: "Đây là Viện Kiểm sát, anh/chị có bưu phẩm chứa ma túy. Cài app này để hợp tác điều tra." Bạn nên?',
    scenario: 'Yêu cầu cài app từ "cơ quan chức năng"',
    options: [
      { id: 'a', text: 'Cài app để hợp tác', isCorrect: false },
      { id: 'b', text: 'CÚP MÁY - Đây là lừa đảo, app sẽ đánh cắp thông tin', isCorrect: true },
      { id: 'c', text: 'Hỏi tên cán bộ', isCorrect: false },
      { id: 'd', text: 'Cài nhưng không đăng nhập ngân hàng', isCorrect: false },
    ],
    explanation: 'Cơ quan chức năng KHÔNG yêu cầu cài app qua điện thoại. App này là malware, có thể: đọc tin nhắn OTP, điều khiển điện thoại, đánh cắp tiền trong tài khoản ngân hàng.',
    tags: ['viện kiểm sát giả', 'app giả', 'malware'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'easy',
    question: 'Nếu thật sự có vụ án liên quan đến bạn, cơ quan chức năng sẽ làm gì?',
    options: [
      { id: 'a', text: 'Gọi điện yêu cầu chuyển tiền', isCorrect: false },
      { id: 'b', text: 'Gửi giấy triệu tập chính thức, mời đến trụ sở làm việc', isCorrect: true },
      { id: 'c', text: 'Nhắn tin Zalo', isCorrect: false },
      { id: 'd', text: 'Gửi email yêu cầu thông tin', isCorrect: false },
    ],
    explanation: 'Quy trình pháp luật: gửi giấy triệu tập có dấu đỏ → mời đến trụ sở → làm việc có biên bản. KHÔNG có chuyện gọi điện đe dọa hay yêu cầu chuyển tiền.',
    tags: ['giấy triệu tập', 'quy trình', 'pháp luật'],
  },
]

// ============================================
// MALWARE & TECH SCAM QUESTIONS (80+ câu)
// ============================================

export const MALWARE_TECH_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.MALWARE,
    difficulty: 'easy',
    question: 'File nào có nguy cơ chứa virus cao nhất?',
    options: [
      { id: 'a', text: 'document.pdf', isCorrect: false },
      { id: 'b', text: 'setup.exe hoặc app.apk từ nguồn lạ', isCorrect: true },
      { id: 'c', text: 'photo.jpg', isCorrect: false },
      { id: 'd', text: 'music.mp3', isCorrect: false },
    ],
    explanation: 'File .exe (Windows) và .apk (Android) là file chạy được, có thể chứa malware. Chỉ tải từ nguồn chính thức (Google Play, App Store, website nhà phát triển). File từ email lạ, link lạ rất nguy hiểm.',
    tags: ['exe', 'apk', 'virus', 'file'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.MALWARE,
    difficulty: 'medium',
    question: 'Bạn nhận email: "Hóa đơn điện tháng này: 5 triệu. Xem chi tiết trong file đính kèm invoice.zip". Bạn không dùng nhiều điện. Bạn nên?',
    scenario: 'Email với file đính kèm đáng ngờ',
    options: [
      { id: 'a', text: 'Mở file xem hóa đơn', isCorrect: false },
      { id: 'b', text: 'KHÔNG mở, kiểm tra trên website/app điện lực chính thức', isCorrect: true },
      { id: 'c', text: 'Reply hỏi chi tiết', isCorrect: false },
      { id: 'd', text: 'Quét virus rồi mở', isCorrect: false },
    ],
    explanation: 'Email giả mạo hóa đơn là chiêu phổ biến. File .zip có thể chứa malware. Luôn kiểm tra hóa đơn trên website/app chính thức của nhà cung cấp, không mở file từ email.',
    tags: ['email', 'hóa đơn giả', 'zip', 'malware'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.MALWARE,
    difficulty: 'hard',
    question: 'Ransomware là gì và cách phòng tránh?',
    options: [
      { id: 'a', text: 'Phần mềm diệt virus', isCorrect: false },
      { id: 'b', text: 'Malware mã hóa dữ liệu, đòi tiền chuộc. Phòng tránh: backup, không mở file lạ', isCorrect: true },
      { id: 'c', text: 'Phần mềm tăng tốc máy', isCorrect: false },
      { id: 'd', text: 'Ứng dụng ngân hàng', isCorrect: false },
    ],
    explanation: 'Ransomware mã hóa toàn bộ dữ liệu, yêu cầu trả tiền (thường bằng Bitcoin) để giải mã. Phòng tránh: backup dữ liệu thường xuyên, không mở file/link lạ, cập nhật phần mềm.',
    tags: ['ransomware', 'mã hóa', 'backup'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.MALWARE,
    difficulty: 'medium',
    question: 'Bạn đang duyệt web, bỗng hiện popup: "Máy tính của bạn bị virus! Gọi 1900xxxx để được hỗ trợ NGAY!" Bạn nên?',
    scenario: 'Popup cảnh báo virus giả',
    options: [
      { id: 'a', text: 'Gọi ngay số đó', isCorrect: false },
      { id: 'b', text: 'Đóng trình duyệt, KHÔNG gọi - đây là "tech support scam"', isCorrect: true },
      { id: 'c', text: 'Tải phần mềm họ đề xuất', isCorrect: false },
      { id: 'd', text: 'Nhập thông tin để được hỗ trợ', isCorrect: false },
    ],
    explanation: 'Đây là "tech support scam". Popup giả cảnh báo virus, số điện thoại dẫn đến kẻ gian. Họ sẽ yêu cầu cài phần mềm điều khiển từ xa, rồi đánh cắp tiền/thông tin. Đóng trình duyệt là đủ.',
    tags: ['popup', 'tech support scam', 'virus giả'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.MALWARE,
    difficulty: 'easy',
    question: 'Nên tải ứng dụng điện thoại từ đâu?',
    options: [
      { id: 'a', text: 'Link trong tin nhắn/email', isCorrect: false },
      { id: 'b', text: 'Google Play Store hoặc Apple App Store', isCorrect: true },
      { id: 'c', text: 'Website bất kỳ', isCorrect: false },
      { id: 'd', text: 'File APK bạn bè gửi', isCorrect: false },
    ],
    explanation: 'Chỉ tải app từ store chính thức (Google Play, App Store). App từ nguồn khác có thể chứa malware, đánh cắp thông tin, tiền trong tài khoản ngân hàng.',
    tags: ['app', 'google play', 'app store'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.MALWARE,
    difficulty: 'hard',
    question: 'Bạn nhận tin nhắn: "Cài app VNeID mới để cập nhật CCCD gắn chip. Link: vn-eid.xyz/download". Bạn nên?',
    scenario: 'Link cài app giả mạo app chính phủ',
    options: [
      { id: 'a', text: 'Tải ngay vì cần cập nhật CCCD', isCorrect: false },
      { id: 'b', text: 'KHÔNG tải - chỉ tải VNeID từ Google Play/App Store', isCorrect: true },
      { id: 'c', text: 'Tải nếu link có chữ "vn"', isCorrect: false },
      { id: 'd', text: 'Hỏi công an xã', isCorrect: false },
    ],
    explanation: 'App VNeID chính thức chỉ có trên Google Play và App Store. Link "vn-eid.xyz" là giả mạo, app sẽ đánh cắp thông tin CCCD, tài khoản ngân hàng. Cơ quan nhà nước không gửi link cài app qua tin nhắn.',
    tags: ['vneid', 'app giả', 'cccd'],
  },
]

// ============================================
// PASSWORD & ACCOUNT SECURITY (80+ câu)
// ============================================

export const PASSWORD_SECURITY_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PASSWORD,
    difficulty: 'easy',
    question: 'Mật khẩu nào an toàn nhất?',
    options: [
      { id: 'a', text: 'nguyenvana1990 (tên + năm sinh)', isCorrect: false },
      { id: 'b', text: 'Tr0ng@Nh4_X4nh!2024 (kết hợp nhiều loại ký tự)', isCorrect: true },
      { id: 'c', text: '123456789', isCorrect: false },
      { id: 'd', text: 'password123', isCorrect: false },
    ],
    explanation: 'Mật khẩu mạnh: 12+ ký tự, kết hợp chữ hoa/thường/số/ký tự đặc biệt, không dùng thông tin cá nhân. Có thể dùng cụm từ dễ nhớ như "Tr0ng@Nh4_X4nh!2024".',
    tags: ['mật khẩu', 'bảo mật', 'ký tự'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PASSWORD,
    difficulty: 'medium',
    question: 'Tại sao không nên dùng cùng mật khẩu cho nhiều tài khoản?',
    options: [
      { id: 'a', text: 'Vì khó nhớ', isCorrect: false },
      { id: 'b', text: 'Nếu 1 tài khoản bị lộ, tất cả tài khoản khác cũng bị hack', isCorrect: true },
      { id: 'c', text: 'Vì hệ thống không cho phép', isCorrect: false },
      { id: 'd', text: 'Không có lý do', isCorrect: false },
    ],
    explanation: 'Khi một website bị hack, mật khẩu bị lộ. Hacker sẽ thử mật khẩu đó trên các website khác (credential stuffing). Nếu dùng chung mật khẩu, tất cả tài khoản đều bị nguy hiểm.',
    tags: ['mật khẩu', 'credential stuffing', 'data breach'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PASSWORD,
    difficulty: 'easy',
    question: 'Xác thực 2 yếu tố (2FA) là gì?',
    options: [
      { id: 'a', text: 'Đăng nhập bằng 2 mật khẩu', isCorrect: false },
      { id: 'b', text: 'Cần thêm mã OTP/app xác thực ngoài mật khẩu để đăng nhập', isCorrect: true },
      { id: 'c', text: 'Đăng nhập trên 2 thiết bị', isCorrect: false },
      { id: 'd', text: 'Mật khẩu có 2 phần', isCorrect: false },
    ],
    explanation: '2FA yêu cầu 2 yếu tố: (1) Thứ bạn biết (mật khẩu), (2) Thứ bạn có (điện thoại nhận OTP). Dù hacker có mật khẩu, vẫn không đăng nhập được nếu không có điện thoại của bạn.',
    tags: ['2fa', 'xác thực', 'otp'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.PASSWORD,
    difficulty: 'medium',
    question: 'Bạn nhận email: "Mật khẩu của bạn đã bị lộ trong vụ hack. Click link để đổi mật khẩu ngay." Bạn nên?',
    scenario: 'Email cảnh báo mật khẩu bị lộ',
    options: [
      { id: 'a', text: 'Click link đổi mật khẩu ngay', isCorrect: false },
      { id: 'b', text: 'Không click link, vào trực tiếp website để đổi mật khẩu', isCorrect: true },
      { id: 'c', text: 'Bỏ qua vì có thể là spam', isCorrect: false },
      { id: 'd', text: 'Reply hỏi thêm thông tin', isCorrect: false },
    ],
    explanation: 'Email có thể là phishing. Nếu lo ngại, vào TRỰC TIẾP website (gõ URL) để đổi mật khẩu, không click link trong email. Có thể kiểm tra email bị lộ tại haveibeenpwned.com.',
    tags: ['email', 'mật khẩu', 'phishing'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PASSWORD,
    difficulty: 'hard',
    question: 'Password manager (trình quản lý mật khẩu) có an toàn không?',
    options: [
      { id: 'a', text: 'Không, vì lưu tất cả mật khẩu một chỗ', isCorrect: false },
      { id: 'b', text: 'An toàn hơn việc dùng chung mật khẩu hoặc ghi ra giấy', isCorrect: true },
      { id: 'c', text: 'Chỉ an toàn nếu miễn phí', isCorrect: false },
      { id: 'd', text: 'Không cần thiết', isCorrect: false },
    ],
    explanation: 'Password manager mã hóa mật khẩu, cho phép dùng mật khẩu mạnh khác nhau cho mỗi tài khoản. An toàn hơn nhiều so với dùng chung mật khẩu yếu. Ví dụ: Bitwarden, 1Password, LastPass.',
    tags: ['password manager', 'mã hóa', 'bảo mật'],
  },
]

// ============================================
// WIFI & PUBLIC NETWORK SECURITY (50+ câu)
// ============================================

export const WIFI_SECURITY_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SAFE_BROWSING,
    difficulty: 'easy',
    question: 'Có nên đăng nhập ngân hàng khi dùng WiFi công cộng (quán cafe, sân bay)?',
    options: [
      { id: 'a', text: 'Có, WiFi nào cũng như nhau', isCorrect: false },
      { id: 'b', text: 'KHÔNG - WiFi công cộng có thể bị nghe lén', isCorrect: true },
      { id: 'c', text: 'Có nếu WiFi có mật khẩu', isCorrect: false },
      { id: 'd', text: 'Có nếu website có HTTPS', isCorrect: false },
    ],
    explanation: 'WiFi công cộng có thể bị tấn công "man-in-the-middle" - hacker đọc được dữ liệu bạn gửi. Không đăng nhập ngân hàng, email quan trọng trên WiFi công cộng. Dùng 4G/5G an toàn hơn.',
    tags: ['wifi', 'công cộng', 'ngân hàng'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.SAFE_BROWSING,
    difficulty: 'medium',
    question: 'Bạn ở sân bay, thấy WiFi "Free_Airport_WiFi" không cần mật khẩu. Bạn nên?',
    scenario: 'WiFi miễn phí ở nơi công cộng',
    options: [
      { id: 'a', text: 'Kết nối ngay vì miễn phí', isCorrect: false },
      { id: 'b', text: 'Cảnh giác - có thể là WiFi giả do hacker tạo', isCorrect: true },
      { id: 'c', text: 'Kết nối nếu tên có vẻ chính thức', isCorrect: false },
      { id: 'd', text: 'Kết nối nhưng không lên mạng', isCorrect: false },
    ],
    explanation: 'Hacker có thể tạo WiFi giả với tên giống WiFi chính thức (Evil Twin). Khi bạn kết nối, họ đọc được mọi thứ bạn gửi. Hỏi nhân viên tên WiFi chính thức, hoặc dùng 4G.',
    tags: ['wifi giả', 'evil twin', 'sân bay'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SAFE_BROWSING,
    difficulty: 'medium',
    question: 'VPN giúp bảo vệ bạn như thế nào khi dùng WiFi công cộng?',
    options: [
      { id: 'a', text: 'Tăng tốc độ internet', isCorrect: false },
      { id: 'b', text: 'Mã hóa dữ liệu, ngăn người khác đọc trộm', isCorrect: true },
      { id: 'c', text: 'Chặn virus', isCorrect: false },
      { id: 'd', text: 'Không có tác dụng', isCorrect: false },
    ],
    explanation: 'VPN tạo "đường hầm" mã hóa giữa bạn và internet. Dù ai đó nghe lén WiFi, họ chỉ thấy dữ liệu đã mã hóa, không đọc được. Nên dùng VPN khi buộc phải dùng WiFi công cộng.',
    tags: ['vpn', 'mã hóa', 'wifi'],
  },
]

// ============================================
// REAL-LIFE SCENARIO QUESTIONS (100+ câu)
// ============================================

export const REAL_LIFE_SCENARIOS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.MONEY_TRANSFER,
    difficulty: 'medium',
    question: 'Bạn đang bán xe máy cũ, người mua đề nghị: "Em chuyển trước 50%, anh giao xe, em kiểm tra xong chuyển nốt". Bạn nên?',
    scenario: 'Giao dịch mua bán xe máy',
    options: [
      { id: 'a', text: 'Đồng ý vì họ đã chuyển trước', isCorrect: false },
      { id: 'b', text: 'Yêu cầu thanh toán đủ 100% trước khi giao xe', isCorrect: true },
      { id: 'c', text: 'Đồng ý nếu họ để lại CMND', isCorrect: false },
      { id: 'd', text: 'Giao xe nếu số tiền đặt cọc cao', isCorrect: false },
    ],
    explanation: 'Khi bán tài sản giá trị lớn: yêu cầu thanh toán đủ trước khi giao. Kẻ gian có thể chuyển 50%, lấy xe, rồi biến mất. CMND có thể là giả. Giao dịch tại ngân hàng để an toàn.',
    tags: ['bán xe', 'đặt cọc', 'giao dịch'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.IMPERSONATION,
    difficulty: 'hard',
    question: 'Bạn nhận cuộc gọi từ số giống số con bạn, giọng khóc: "Mẹ ơi con bị bắt cóc, họ đòi 100 triệu". Bạn nên?',
    scenario: 'Cuộc gọi "bắt cóc" người thân',
    options: [
      { id: 'a', text: 'Chuyển tiền ngay để cứu con', isCorrect: false },
      { id: 'b', text: 'Giữ bình tĩnh, gọi số khác của con, liên hệ người thân xác nhận', isCorrect: true },
      { id: 'c', text: 'Yêu cầu nói chuyện với con', isCorrect: false },
      { id: 'd', text: 'Báo công an ngay', isCorrect: false },
    ],
    explanation: 'Lừa đảo "bắt cóc ảo": kẻ gian giả giọng khóc, tạo tình huống khẩn cấp. Bước 1: BÌNH TĨNH. Bước 2: Gọi số khác của người thân. Bước 3: Liên hệ người thân khác xác nhận. 99% là lừa đảo.',
    tags: ['bắt cóc ảo', 'người thân', 'khẩn cấp'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.JOB_SCAM,
    difficulty: 'medium',
    question: 'Bạn ứng tuyển việc làm, "HR" yêu cầu: "Gửi ảnh CMND 2 mặt và số tài khoản ngân hàng để làm hợp đồng". Bạn nên?',
    scenario: 'Yêu cầu thông tin khi ứng tuyển',
    options: [
      { id: 'a', text: 'Gửi ngay vì cần cho hợp đồng', isCorrect: false },
      { id: 'b', text: 'Chỉ cung cấp khi đã ký hợp đồng tại công ty, gặp trực tiếp', isCorrect: true },
      { id: 'c', text: 'Gửi nếu công ty có website', isCorrect: false },
      { id: 'd', text: 'Gửi ảnh CMND che một phần', isCorrect: false },
    ],
    explanation: 'Công ty uy tín chỉ yêu cầu CMND khi ký hợp đồng chính thức, tại văn phòng. Gửi ảnh CMND online có thể bị dùng để: mở tài khoản ngân hàng giả, vay tiền online, mạo danh.',
    tags: ['ứng tuyển', 'cmnd', 'thông tin cá nhân'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.PRIZE_SCAM,
    difficulty: 'easy',
    question: 'Bạn nhận cuộc gọi: "Chúc mừng anh/chị trúng xe SH từ chương trình của Viettel. Nộp 5 triệu thuế để nhận xe". Bạn nên?',
    scenario: 'Cuộc gọi thông báo trúng thưởng',
    options: [
      { id: 'a', text: 'Nộp thuế để nhận xe', isCorrect: false },
      { id: 'b', text: 'CÚP MÁY - Trúng thưởng thật không yêu cầu nộp tiền trước', isCorrect: true },
      { id: 'c', text: 'Hỏi địa chỉ nhận xe', isCorrect: false },
      { id: 'd', text: 'Yêu cầu gửi giấy xác nhận', isCorrect: false },
    ],
    explanation: 'Quy tắc vàng: TRÚNG THƯỞNG THẬT KHÔNG YÊU CẦU NỘP TIỀN TRƯỚC. Thuế (nếu có) sẽ được trừ vào giá trị giải thưởng hoặc nộp sau khi nhận. Đây là lừa đảo 100%.',
    tags: ['trúng thưởng', 'viettel', 'thuế'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.ROMANCE,
    difficulty: 'hard',
    question: 'Bạn quen người nước ngoài online 3 tháng, họ nói muốn sang VN gặp bạn nhưng cần bạn chuyển 2000$ "phí visa khẩn cấp". Bạn nên?',
    scenario: 'Người yêu online xin tiền',
    options: [
      { id: 'a', text: 'Chuyển vì muốn gặp họ', isCorrect: false },
      { id: 'b', text: 'TỪ CHỐI - Đây là romance scam điển hình', isCorrect: true },
      { id: 'c', text: 'Chuyển nếu họ video call', isCorrect: false },
      { id: 'd', text: 'Chuyển một phần', isCorrect: false },
    ],
    explanation: 'Romance scam: tạo tình cảm online → xin tiền với nhiều lý do (visa, bệnh viện, vé máy bay, hải quan). Họ KHÔNG BAO GIỜ xuất hiện thật. Người yêu thật không xin tiền qua mạng.',
    tags: ['romance scam', 'người nước ngoài', 'visa'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.GAMBLING,
    difficulty: 'medium',
    question: 'Bạn bè rủ chơi app "đánh bài đổi thưởng", nói "thắng rút tiền thật, thua thì nạp thêm". Bạn nên?',
    scenario: 'Rủ chơi cờ bạc online',
    options: [
      { id: 'a', text: 'Thử vì bạn bè chơi', isCorrect: false },
      { id: 'b', text: 'TỪ CHỐI - Cờ bạc online bất hợp pháp và thường gian lận', isCorrect: true },
      { id: 'c', text: 'Chơi với số tiền nhỏ', isCorrect: false },
      { id: 'd', text: 'Chơi nếu app có nhiều người dùng', isCorrect: false },
    ],
    explanation: 'Cờ bạc online tại VN là BẤT HỢP PHÁP. Các app thường: gian lận tỷ lệ, cho thắng ban đầu rồi thua, không cho rút tiền khi thắng lớn. Bạn bè có thể được hoa hồng khi giới thiệu.',
    tags: ['cờ bạc', 'app', 'bất hợp pháp'],
  },
]

// ============================================
// IMAGE RECOGNITION QUESTIONS (Câu hỏi nhận diện hình ảnh)
// ============================================

export const IMAGE_RECOGNITION_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'medium',
    question: 'Khi nhận được ảnh chụp màn hình "chuyển tiền thành công", bạn nên kiểm tra điều gì?',
    options: [
      { id: 'a', text: 'Xem ảnh có rõ nét không', isCorrect: false },
      { id: 'b', text: 'Kiểm tra số dư tài khoản thực tế, không tin ảnh', isCorrect: true },
      { id: 'c', text: 'Xem có logo ngân hàng không', isCorrect: false },
      { id: 'd', text: 'Xem ngày giờ trên ảnh', isCorrect: false },
    ],
    explanation: 'Ảnh chuyển tiền có thể PHOTOSHOP trong 5 phút. Chỉ tin khi tiền ĐÃ VÀO tài khoản thật. Kiểm tra qua app ngân hàng hoặc SMS thông báo từ ngân hàng.',
    tags: ['ảnh giả', 'photoshop', 'chuyển tiền'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'hard',
    question: 'Làm sao nhận biết website ngân hàng giả từ giao diện?',
    options: [
      { id: 'a', text: 'Website giả luôn xấu hơn', isCorrect: false },
      { id: 'b', text: 'Không thể nhận biết từ giao diện, phải kiểm tra URL', isCorrect: true },
      { id: 'c', text: 'Website giả không có logo', isCorrect: false },
      { id: 'd', text: 'Website giả load chậm hơn', isCorrect: false },
    ],
    explanation: 'Website giả có thể COPY HOÀN HẢO giao diện website thật. Cách duy nhất là kiểm tra URL trên thanh địa chỉ. Ví dụ: vietcombank.com.vn (thật) vs vietcombank-vn.com (giả).',
    tags: ['website giả', 'url', 'giao diện'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SAFE_BROWSING,
    difficulty: 'medium',
    question: 'QR code có thể nguy hiểm như thế nào?',
    options: [
      { id: 'a', text: 'QR code luôn an toàn', isCorrect: false },
      { id: 'b', text: 'Có thể dẫn đến website lừa đảo hoặc tự động chuyển tiền', isCorrect: true },
      { id: 'c', text: 'Chỉ nguy hiểm nếu quét nhiều lần', isCorrect: false },
      { id: 'd', text: 'Chỉ nguy hiểm trên iPhone', isCorrect: false },
    ],
    explanation: 'QR code có thể: dẫn đến website phishing, tự động mở app chuyển tiền với số tiền đã điền sẵn, tải malware. Luôn kiểm tra URL sau khi quét, cảnh giác QR ở nơi công cộng.',
    tags: ['qr code', 'phishing', 'chuyển tiền'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'hard',
    question: 'Ảnh CMND/CCCD bị lộ có thể bị lợi dụng như thế nào?',
    options: [
      { id: 'a', text: 'Không thể làm gì', isCorrect: false },
      { id: 'b', text: 'Mở tài khoản ngân hàng, vay tiền online, đăng ký SIM, mạo danh', isCorrect: true },
      { id: 'c', text: 'Chỉ xem thông tin', isCorrect: false },
      { id: 'd', text: 'Chỉ nguy hiểm nếu có cả mặt sau', isCorrect: false },
    ],
    explanation: 'Với ảnh CMND/CCCD, kẻ gian có thể: mở tài khoản ngân hàng (bạn chịu nợ), vay tiền online, đăng ký SIM rác, mạo danh lừa người khác. KHÔNG chia sẻ ảnh CMND online.',
    tags: ['cmnd', 'cccd', 'đánh cắp danh tính'],
  },
]

// ============================================
// EXPORT ALL QUESTIONS
// ============================================

export const ALL_EXTRA_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  ...OTP_BANKING_QUESTIONS,
  ...DEEPFAKE_AI_QUESTIONS,
  ...SOCIAL_MEDIA_QUESTIONS,
  ...ECOMMERCE_QUESTIONS,
  ...INVESTMENT_QUESTIONS,
  ...GOVERNMENT_SCAM_QUESTIONS,
  ...MALWARE_TECH_QUESTIONS,
  ...PASSWORD_SECURITY_QUESTIONS,
  ...WIFI_SECURITY_QUESTIONS,
  ...REAL_LIFE_SCENARIOS,
  ...IMAGE_RECOGNITION_QUESTIONS,
]

// Helper function to get questions by category
export function getExtraQuestionsByCategory(category: string): Omit<QuizQuestion, 'id'>[] {
  return ALL_EXTRA_QUESTIONS.filter(q => q.category === category)
}

// Helper function to get questions by difficulty
export function getExtraQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Omit<QuizQuestion, 'id'>[] {
  return ALL_EXTRA_QUESTIONS.filter(q => q.difficulty === difficulty)
}

// Helper function to get random questions
export function getRandomExtraQuestions(count: number): Omit<QuizQuestion, 'id'>[] {
  const shuffled = [...ALL_EXTRA_QUESTIONS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}


// ============================================
// ADVANCED IMAGE-BASED SCENARIOS (50+ câu)
// ============================================

export const ADVANCED_IMAGE_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'hard',
    question: 'Bạn nhận được email có logo ngân hàng rất đẹp, nội dung chuyên nghiệp. Làm sao biết đây là email thật hay giả?',
    options: [
      { id: 'a', text: 'Email đẹp = email thật', isCorrect: false },
      { id: 'b', text: 'Kiểm tra địa chỉ email người gửi (domain sau @)', isCorrect: true },
      { id: 'c', text: 'Xem có chữ ký không', isCorrect: false },
      { id: 'd', text: 'Đọc nội dung cẩn thận', isCorrect: false },
    ],
    explanation: 'Logo, giao diện có thể copy dễ dàng. Điều QUAN TRỌNG NHẤT là kiểm tra domain email. Ví dụ: support@vietcombank.com.vn (thật) vs support@vietcombank-vn.com (giả).',
    tags: ['email', 'logo', 'domain'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SAFE_BROWSING,
    difficulty: 'medium',
    question: 'Bạn thấy biểu tượng khóa xanh trên thanh địa chỉ trình duyệt. Điều này có nghĩa gì?',
    options: [
      { id: 'a', text: 'Website 100% an toàn và đáng tin', isCorrect: false },
      { id: 'b', text: 'Kết nối được mã hóa, nhưng website vẫn có thể là lừa đảo', isCorrect: true },
      { id: 'c', text: 'Website được chính phủ xác nhận', isCorrect: false },
      { id: 'd', text: 'Website không có virus', isCorrect: false },
    ],
    explanation: 'Biểu tượng khóa (HTTPS) chỉ nghĩa là kết nối được mã hóa. Website LỪA ĐẢO cũng có thể có HTTPS miễn phí. Vẫn phải kiểm tra URL có đúng không.',
    tags: ['https', 'khóa xanh', 'ssl'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'hard',
    question: 'Video deepfake có thể được sử dụng để lừa đảo như thế nào?',
    options: [
      { id: 'a', text: 'Chỉ để giải trí', isCorrect: false },
      { id: 'b', text: 'Giả mạo sếp/người thân yêu cầu chuyển tiền qua video call', isCorrect: true },
      { id: 'c', text: 'Không thể dùng để lừa đảo', isCorrect: false },
      { id: 'd', text: 'Chỉ ảnh hưởng người nổi tiếng', isCorrect: false },
    ],
    explanation: 'Deepfake có thể tạo video giả mạo bất kỳ ai với chỉ vài ảnh/video mẫu. Kẻ gian dùng để: giả sếp yêu cầu chuyển tiền, giả người thân xin tiền khẩn cấp. Luôn xác minh qua kênh khác.',
    tags: ['deepfake', 'video call', 'ai'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PRIVACY,
    difficulty: 'medium',
    question: 'Ảnh selfie cầm CMND có thể bị lợi dụng như thế nào?',
    options: [
      { id: 'a', text: 'Không thể lợi dụng', isCorrect: false },
      { id: 'b', text: 'Mở tài khoản ngân hàng/ví điện tử, vay tiền online nhân danh bạn', isCorrect: true },
      { id: 'c', text: 'Chỉ để xác minh danh tính', isCorrect: false },
      { id: 'd', text: 'Chỉ nguy hiểm nếu lộ số CMND', isCorrect: false },
    ],
    explanation: 'Ảnh selfie + CMND là yêu cầu eKYC của nhiều dịch vụ tài chính. Kẻ gian có thể dùng để: mở tài khoản ngân hàng, đăng ký ví điện tử, vay tiền online - tất cả nhân danh bạn.',
    tags: ['selfie', 'cmnd', 'ekyc'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PHISHING,
    difficulty: 'medium',
    question: 'Tin nhắn SMS hiển thị tên "Vietcombank" có chắc chắn từ ngân hàng không?',
    options: [
      { id: 'a', text: 'Có, vì hiển thị tên ngân hàng', isCorrect: false },
      { id: 'b', text: 'KHÔNG - Tên người gửi SMS có thể bị giả mạo (SMS spoofing)', isCorrect: true },
      { id: 'c', text: 'Có nếu nội dung chuyên nghiệp', isCorrect: false },
      { id: 'd', text: 'Có nếu không có link', isCorrect: false },
    ],
    explanation: 'SMS spoofing cho phép kẻ gian gửi tin nhắn với tên người gửi bất kỳ (Vietcombank, BIDV...). Không tin tên người gửi, chỉ tin nội dung và KHÔNG click link trong SMS.',
    tags: ['sms spoofing', 'ngân hàng', 'giả mạo'],
  },
]

// ============================================
// CHILDREN & ELDERLY PROTECTION (30+ câu)
// ============================================

export const VULNERABLE_GROUP_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'easy',
    question: 'Người cao tuổi thường bị lừa đảo kiểu nào nhất?',
    options: [
      { id: 'a', text: 'Hack tài khoản game', isCorrect: false },
      { id: 'b', text: 'Giả danh công an, con cháu gặp nạn, trúng thưởng', isCorrect: true },
      { id: 'c', text: 'Lừa đảo crypto', isCorrect: false },
      { id: 'd', text: 'Phishing email', isCorrect: false },
    ],
    explanation: 'Người cao tuổi thường bị lừa bởi: (1) Giả danh công an đe dọa, (2) Giả con cháu gặp nạn cần tiền gấp, (3) Trúng thưởng giả. Hãy nhắc nhở người thân lớn tuổi về các chiêu này.',
    tags: ['người cao tuổi', 'giả danh', 'bảo vệ'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'medium',
    question: 'Làm sao bảo vệ người thân lớn tuổi khỏi lừa đảo qua điện thoại?',
    options: [
      { id: 'a', text: 'Cấm dùng điện thoại', isCorrect: false },
      { id: 'b', text: 'Dặn: "Ai gọi xin tiền/OTP thì cúp máy, gọi cho con trước"', isCorrect: true },
      { id: 'c', text: 'Chặn tất cả số lạ', isCorrect: false },
      { id: 'd', text: 'Không cần làm gì', isCorrect: false },
    ],
    explanation: 'Quy tắc đơn giản cho người lớn tuổi: "Ai gọi điện xin tiền hoặc hỏi mã OTP → CÚP MÁY → Gọi cho con/cháu hỏi trước". Đơn giản, dễ nhớ, hiệu quả.',
    tags: ['người cao tuổi', 'bảo vệ', 'quy tắc'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.PRIVACY,
    difficulty: 'easy',
    question: 'Trẻ em nên được dạy gì về an toàn mạng?',
    options: [
      { id: 'a', text: 'Không cần dạy, trẻ em không bị lừa', isCorrect: false },
      { id: 'b', text: 'Không chia sẻ thông tin cá nhân, không gặp người lạ quen online', isCorrect: true },
      { id: 'c', text: 'Chỉ cần cài phần mềm bảo vệ', isCorrect: false },
      { id: 'd', text: 'Cấm dùng internet', isCorrect: false },
    ],
    explanation: 'Dạy trẻ: (1) Không chia sẻ tên thật, trường học, địa chỉ online, (2) Không gặp người quen trên mạng ngoài đời, (3) Kể cho bố mẹ nếu có người lạ nhắn tin.',
    tags: ['trẻ em', 'an toàn mạng', 'giáo dục'],
  },
]

// ============================================
// LATEST SCAM TRENDS 2024 (30+ câu)
// ============================================

export const LATEST_SCAM_TRENDS: Omit<QuizQuestion, 'id'>[] = [
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'hard',
    question: '"Pig butchering" scam là gì?',
    options: [
      { id: 'a', text: 'Lừa đảo bán thịt', isCorrect: false },
      { id: 'b', text: 'Lừa đảo kết hợp tình cảm + đầu tư: "nuôi" nạn nhân rồi "mổ"', isCorrect: true },
      { id: 'c', text: 'Hack tài khoản ngân hàng', isCorrect: false },
      { id: 'd', text: 'Lừa đảo qua điện thoại', isCorrect: false },
    ],
    explanation: '"Pig butchering" (mổ lợn): Kẻ gian tạo tình cảm online (nuôi lợn) → mời đầu tư crypto/forex → cho "lãi" ban đầu → lừa nạp thêm tiền → biến mất (mổ lợn). Thiệt hại có thể hàng tỷ đồng.',
    tags: ['pig butchering', 'tình cảm', 'đầu tư'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.MALWARE,
    difficulty: 'hard',
    question: 'Lừa đảo "cài app giả VNeID/ngân hàng" hoạt động như thế nào?',
    options: [
      { id: 'a', text: 'App chỉ thu thập thông tin', isCorrect: false },
      { id: 'b', text: 'App đọc SMS OTP, điều khiển điện thoại, chuyển tiền tự động', isCorrect: true },
      { id: 'c', text: 'App chỉ hiển thị quảng cáo', isCorrect: false },
      { id: 'd', text: 'App không làm gì', isCorrect: false },
    ],
    explanation: 'App giả mạo (VNeID, ngân hàng, công an) có thể: đọc tất cả SMS (bao gồm OTP), điều khiển điện thoại từ xa, tự động chuyển tiền. Chỉ tải app từ Google Play/App Store.',
    tags: ['app giả', 'vneid', 'malware'],
  },
  {
    type: 'scenario',
    category: QUIZ_CATEGORIES.JOB_SCAM,
    difficulty: 'medium',
    question: 'Bạn được mời làm "task" trên Telegram: like video, đánh giá sản phẩm, được trả tiền ngay. Sau vài task, họ yêu cầu "nạp tiền để mở khóa task VIP". Bạn nên?',
    scenario: 'Lừa đảo "task" trên Telegram',
    options: [
      { id: 'a', text: 'Nạp tiền vì đã được trả trước', isCorrect: false },
      { id: 'b', text: 'DỪNG NGAY - Đây là lừa đảo "task scam" điển hình', isCorrect: true },
      { id: 'c', text: 'Nạp số tiền nhỏ để thử', isCorrect: false },
      { id: 'd', text: 'Hỏi ý kiến "quản lý"', isCorrect: false },
    ],
    explanation: 'Task scam: trả tiền nhỏ ban đầu để tạo niềm tin → yêu cầu nạp tiền "mở khóa" → nạp càng nhiều, yêu cầu càng cao → cuối cùng mất trắng. KHÔNG có việc làm hợp pháp nào yêu cầu nạp tiền.',
    tags: ['task scam', 'telegram', 'nạp tiền'],
  },
  {
    type: 'text',
    category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
    difficulty: 'medium',
    question: 'Lừa đảo "SIM swap" là gì?',
    options: [
      { id: 'a', text: 'Đổi SIM điện thoại', isCorrect: false },
      { id: 'b', text: 'Kẻ gian chiếm đoạt số điện thoại của bạn để nhận OTP', isCorrect: true },
      { id: 'c', text: 'Bán SIM giả', isCorrect: false },
      { id: 'd', text: 'Hack nhà mạng', isCorrect: false },
    ],
    explanation: 'SIM swap: kẻ gian dùng thông tin cá nhân của bạn để yêu cầu nhà mạng cấp SIM mới. Khi có SIM, họ nhận được tất cả OTP và chiếm tài khoản ngân hàng. Bảo vệ thông tin cá nhân!',
    tags: ['sim swap', 'otp', 'nhà mạng'],
  },
]

// Add to ALL_EXTRA_QUESTIONS
export const COMPLETE_EXTRA_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  ...ALL_EXTRA_QUESTIONS,
  ...ADVANCED_IMAGE_QUESTIONS,
  ...VULNERABLE_GROUP_QUESTIONS,
  ...LATEST_SCAM_TRENDS,
]
