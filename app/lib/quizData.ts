/**
 * Quiz Data - 5000+ câu hỏi về nhận biết lừa đảo
 * Sử dụng template system để generate nhiều variations
 */

import {
  generateMoneyTransferScam,
  generateFakeBankSMS,
  generatePrizeScam,
  generateJobScam,
  generateOTPScam,
  generateImpersonationScam,
  generatePhishingEmail,
  generateLegitimateMessage,
  generateFakeWebsiteLogin,
  generateFakeQRCode,
  generateFakeTransferConfirmation,
  generateFakeAppNotification,
  generateCryptoScam,
  generateRomanceScamProfile,
} from './quizImages'

// Re-export from constants
export type { QuizQuestion, QuizImage } from './quizConstants'
export { QUIZ_CATEGORIES } from './quizConstants'
import type { QuizQuestion } from './quizConstants'
import { QUIZ_CATEGORIES } from './quizConstants'

// Vietnamese banks for realistic scenarios
const BANKS = ['Vietcombank', 'Techcombank', 'MB Bank', 'VPBank', 'ACB', 'Agribank', 'BIDV', 'VietinBank', 'TPBank', 'Sacombank']
const ECOMMERCE = ['Shopee', 'Lazada', 'Tiki', 'Sendo', 'TikTok Shop']
const SOCIAL = ['Facebook', 'Zalo', 'Telegram', 'Instagram', 'TikTok']
const GAMES = ['Liên Quân', 'PUBG Mobile', 'Free Fire', 'Genshin Impact', 'Mobile Legends']

// Helper to generate random elements
const random = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
const randomAmount = () => [500000, 1000000, 2000000, 3000000, 5000000, 10000000][Math.floor(Math.random() * 6)]
const formatMoney = (n: number) => n.toLocaleString('vi-VN') + 'đ'

// ============================================
// QUESTION TEMPLATES - Mỗi template có thể generate nhiều variations
// ============================================

interface QuestionTemplate {
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  type: 'text' | 'image' | 'scenario'
  generate: () => Omit<QuizQuestion, 'id'>
}

const questionTemplates: QuestionTemplate[] = [
  // ========== PHISHING - 500+ variations ==========
  {
    category: 'PHISHING',
    difficulty: 'easy',
    type: 'text',
    generate: () => {
      const bank = random(BANKS)
      return {
        type: 'text',
        category: QUIZ_CATEGORIES.PHISHING,
        difficulty: 'easy',
        question: `Bạn nhận được email từ "${bank.toLowerCase()}-security@gmail.com" yêu cầu xác minh tài khoản. Đây có phải email chính thức từ ${bank}?`,
        options: [
          { id: 'a', text: 'Có, vì có tên ngân hàng trong email', isCorrect: false },
          { id: 'b', text: 'Không, ngân hàng không dùng Gmail để gửi email chính thức', isCorrect: true },
          { id: 'c', text: 'Cần kiểm tra thêm nội dung email', isCorrect: false },
          { id: 'd', text: 'Có, nếu email có logo ngân hàng', isCorrect: false },
        ],
        explanation: `Ngân hàng ${bank} và các tổ chức tài chính KHÔNG BAO GIỜ sử dụng Gmail, Yahoo, hay các email miễn phí để liên hệ khách hàng. Email chính thức luôn có domain riêng như @${bank.toLowerCase()}.com.vn`,
        tags: ['email', 'phishing', 'ngân hàng'],
      }
    },
  },
  {
    category: 'PHISHING',
    difficulty: 'medium',
    type: 'scenario',
    generate: () => {
      const bank = random(BANKS)
      const fakeUrl = `${bank.toLowerCase()}-vn.com`
      return {
        type: 'scenario',
        category: QUIZ_CATEGORIES.PHISHING,
        difficulty: 'medium',
        question: `Bạn nhận SMS: "${bank}: Tài khoản của bạn sẽ bị khóa trong 24h. Truy cập ${fakeUrl} để xác minh ngay." Bạn nên làm gì?`,
        scenario: `SMS từ số lạ với nội dung cảnh báo khẩn cấp`,
        options: [
          { id: 'a', text: 'Truy cập link ngay để tránh bị khóa tài khoản', isCorrect: false },
          { id: 'b', text: 'Gọi hotline chính thức của ngân hàng để xác nhận', isCorrect: true },
          { id: 'c', text: 'Reply SMS để hỏi thêm thông tin', isCorrect: false },
          { id: 'd', text: 'Chờ 24h xem có bị khóa thật không', isCorrect: false },
        ],
        explanation: `Đây là SMS phishing điển hình. URL "${fakeUrl}" không phải website chính thức. Ngân hàng không bao giờ gửi link qua SMS yêu cầu đăng nhập. Luôn gọi hotline chính thức để xác nhận.`,
        tags: ['sms', 'phishing', 'ngân hàng', 'url giả'],
      }
    },
  },

  {
    category: 'PHISHING',
    difficulty: 'hard',
    type: 'image',
    generate: () => {
      const bank = random(BANKS)
      return {
        type: 'image',
        category: QUIZ_CATEGORIES.PHISHING,
        difficulty: 'hard',
        question: `Website này có phải trang đăng nhập chính thức của ${bank}?`,
        image: `/quiz/fake-bank-${Math.floor(Math.random() * 10) + 1}.png`,
        options: [
          { id: 'a', text: 'Có, giao diện giống hệt website chính thức', isCorrect: false },
          { id: 'b', text: 'Không, cần kiểm tra URL trên thanh địa chỉ', isCorrect: true },
          { id: 'c', text: 'Có, vì có biểu tượng khóa HTTPS', isCorrect: false },
          { id: 'd', text: 'Không thể xác định từ hình ảnh', isCorrect: false },
        ],
        explanation: `Giao diện có thể bị sao chép hoàn hảo. Điều quan trọng nhất là kiểm tra URL. Website chính thức của ${bank} là ${bank.toLowerCase()}.com.vn. Biểu tượng HTTPS chỉ nghĩa là kết nối được mã hóa, không đảm bảo website an toàn.`,
        tags: ['website', 'phishing', 'url', 'https'],
      }
    },
  },

  // ========== MONEY TRANSFER SCAM - 500+ variations ==========
  {
    category: 'MONEY_TRANSFER',
    difficulty: 'easy',
    type: 'scenario',
    generate: () => {
      const amount = randomAmount()
      const platform = random(SOCIAL)
      return {
        type: 'scenario',
        category: QUIZ_CATEGORIES.MONEY_TRANSFER,
        difficulty: 'easy',
        question: `Bạn nhận tin nhắn ${platform}: "Ê, banking mình đang lỗi, chuyển giúp mình ${formatMoney(amount)} được không? Tí mình chuyển lại." Đây có phải lừa đảo?`,
        scenario: `Tin nhắn từ tài khoản có tên giống bạn bè`,
        options: [
          { id: 'a', text: 'Không, bạn bè nhờ giúp là bình thường', isCorrect: false },
          { id: 'b', text: 'Có thể là lừa đảo, cần gọi điện xác nhận trực tiếp', isCorrect: true },
          { id: 'c', text: 'Chuyển trước rồi hỏi sau', isCorrect: false },
          { id: 'd', text: 'Chỉ lừa đảo nếu số tiền lớn', isCorrect: false },
        ],
        explanation: `Đây là chiêu lừa đảo phổ biến nhất tại Việt Nam. Kẻ gian hack/giả mạo tài khoản bạn bè rồi nhờ chuyển tiền với lý do "bank lỗi". LUÔN gọi điện trực tiếp để xác nhận trước khi chuyển tiền.`,
        tags: ['chuyển tiền', 'giả mạo', 'bạn bè', platform.toLowerCase()],
      }
    },
  },
  {
    category: 'MONEY_TRANSFER',
    difficulty: 'medium',
    type: 'text',
    generate: () => {
      const bank = random(BANKS)
      const amount = randomAmount()
      return {
        type: 'text',
        category: QUIZ_CATEGORIES.MONEY_TRANSFER,
        difficulty: 'medium',
        question: `Dấu hiệu nào KHÔNG phải là dấu hiệu lừa đảo nhờ chuyển tiền?`,
        options: [
          { id: 'a', text: 'Lý do "app banking đang lỗi/bảo trì"', isCorrect: false },
          { id: 'b', text: 'Hỏi "có banking không?" trước khi nhờ', isCorrect: false },
          { id: 'c', text: 'Người nhờ gọi video call xác nhận danh tính', isCorrect: true },
          { id: 'd', text: 'Tạo áp lực "cần gấp", "khẩn cấp"', isCorrect: false },
        ],
        explanation: `Kẻ lừa đảo thường tránh gọi điện/video call vì sẽ lộ danh tính. Nếu người nhờ chủ động video call để xác nhận, đó là dấu hiệu tích cực. Các dấu hiệu còn lại đều là red flags của lừa đảo.`,
        tags: ['chuyển tiền', 'dấu hiệu', 'video call'],
      }
    },
  },
  {
    category: 'MONEY_TRANSFER',
    difficulty: 'hard',
    type: 'scenario',
    generate: () => {
      const amount1 = randomAmount()
      const amount2 = amount1 * 2
      return {
        type: 'scenario',
        category: QUIZ_CATEGORIES.MONEY_TRANSFER,
        difficulty: 'hard',
        question: `Người quen nhờ chuyển ${formatMoney(amount1)}, hứa trả lại ${formatMoney(amount2)} vì "đang kẹt tiền làm ăn". Bạn nên làm gì?`,
        scenario: `Lời hứa trả gấp đôi số tiền`,
        options: [
          { id: 'a', text: 'Chuyển vì có lời', isCorrect: false },
          { id: 'b', text: 'Từ chối, đây là dấu hiệu lừa đảo', isCorrect: true },
          { id: 'c', text: 'Chuyển một nửa để thử', isCorrect: false },
          { id: 'd', text: 'Yêu cầu viết giấy nợ rồi chuyển', isCorrect: false },
        ],
        explanation: `Hứa trả gấp đôi/gấp ba là chiêu lừa đảo kinh điển. Không ai cho tiền không cả. Kẻ gian có thể trả lần đầu để tạo niềm tin, sau đó lừa số tiền lớn hơn nhiều.`,
        tags: ['chuyển tiền', 'lãi suất cao', 'ponzi'],
      }
    },
  },

  // ========== FAKE BANK - 400+ variations ==========
  {
    category: 'FAKE_BANK',
    difficulty: 'easy',
    type: 'text',
    generate: () => {
      const bank = random(BANKS)
      return {
        type: 'text',
        category: QUIZ_CATEGORIES.FAKE_BANK,
        difficulty: 'easy',
        question: `${bank} có bao giờ gọi điện yêu cầu bạn cung cấp mã OTP không?`,
        options: [
          { id: 'a', text: 'Có, khi cần xác minh giao dịch', isCorrect: false },
          { id: 'b', text: 'Có, khi tài khoản có vấn đề', isCorrect: false },
          { id: 'c', text: 'KHÔNG BAO GIỜ - đây là lừa đảo', isCorrect: true },
          { id: 'd', text: 'Có, nếu nhân viên xưng tên đầy đủ', isCorrect: false },
        ],
        explanation: `KHÔNG CÓ NGÂN HÀNG NÀO gọi điện yêu cầu OTP. OTP là mã bảo mật chỉ bạn biết. Bất kỳ ai hỏi OTP qua điện thoại đều là LỪA ĐẢO, dù họ xưng là ai.`,
        tags: ['otp', 'ngân hàng', 'điện thoại'],
      }
    },
  },
  {
    category: 'FAKE_BANK',
    difficulty: 'medium',
    type: 'scenario',
    generate: () => {
      const bank = random(BANKS)
      const amount = randomAmount() * 10
      return {
        type: 'scenario',
        category: QUIZ_CATEGORIES.FAKE_BANK,
        difficulty: 'medium',
        question: `Bạn nhận cuộc gọi: "Đây là ${bank}, tài khoản của anh/chị vừa có giao dịch ${formatMoney(amount)} đáng ngờ. Để hủy giao dịch, vui lòng cung cấp mã OTP." Bạn nên?`,
        scenario: `Cuộc gọi từ số lạ tự xưng là ngân hàng`,
        options: [
          { id: 'a', text: 'Cung cấp OTP để hủy giao dịch', isCorrect: false },
          { id: 'b', text: 'Cúp máy, gọi lại hotline chính thức của ngân hàng', isCorrect: true },
          { id: 'c', text: 'Hỏi tên nhân viên để kiểm tra', isCorrect: false },
          { id: 'd', text: 'Yêu cầu gửi email xác nhận', isCorrect: false },
        ],
        explanation: `Đây là kịch bản lừa đảo phổ biến. Ngân hàng KHÔNG BAO GIỜ gọi điện yêu cầu OTP. Nếu lo lắng, hãy cúp máy và gọi lại hotline chính thức (tra trên website ngân hàng, không dùng số trong tin nhắn/email).`,
        tags: ['otp', 'ngân hàng', 'giao dịch giả'],
      }
    },
  },


  // ========== PRIZE SCAM - 400+ variations ==========
  {
    category: 'PRIZE_SCAM',
    difficulty: 'easy',
    type: 'text',
    generate: () => {
      const brand = random([...ECOMMERCE, ...SOCIAL, 'Apple', 'Samsung', 'Vingroup'])
      const prize = random(['iPhone 15 Pro Max', 'xe SH', 'laptop', '100 triệu đồng', 'chuyến du lịch'])
      return {
        type: 'text',
        category: QUIZ_CATEGORIES.PRIZE_SCAM,
        difficulty: 'easy',
        question: `Bạn nhận tin nhắn: "Chúc mừng! Bạn là người may mắn trúng ${prize} từ ${brand}. Click link để nhận thưởng." Đây có phải lừa đảo?`,
        options: [
          { id: 'a', text: 'Không, có thể mình may mắn thật', isCorrect: false },
          { id: 'b', text: 'Có, đây là lừa đảo trúng thưởng điển hình', isCorrect: true },
          { id: 'c', text: 'Cần kiểm tra link trước', isCorrect: false },
          { id: 'd', text: 'Chỉ lừa đảo nếu yêu cầu tiền', isCorrect: false },
        ],
        explanation: `Đây là lừa đảo "trúng thưởng" kinh điển. Bạn KHÔNG THỂ trúng thưởng từ chương trình bạn chưa từng tham gia. Các công ty lớn không bao giờ thông báo trúng thưởng qua tin nhắn/email với link lạ.`,
        tags: ['trúng thưởng', 'link lạ', brand.toLowerCase()],
      }
    },
  },
  {
    category: 'PRIZE_SCAM',
    difficulty: 'medium',
    type: 'scenario',
    generate: () => {
      const prize = random(['iPhone', 'xe máy', 'laptop', 'TV'])
      const fee = random([200000, 500000, 1000000, 2000000])
      return {
        type: 'scenario',
        category: QUIZ_CATEGORIES.PRIZE_SCAM,
        difficulty: 'medium',
        question: `Bạn "trúng" ${prize}, nhưng phải nộp ${formatMoney(fee)} "phí vận chuyển/thuế" để nhận. Đây có hợp lý không?`,
        scenario: `Yêu cầu nộp phí để nhận quà trúng thưởng`,
        options: [
          { id: 'a', text: 'Hợp lý, phí vận chuyển là bình thường', isCorrect: false },
          { id: 'b', text: 'Không hợp lý, đây là lừa đảo', isCorrect: true },
          { id: 'c', text: 'Hợp lý nếu phí thấp hơn giá trị quà', isCorrect: false },
          { id: 'd', text: 'Cần hỏi thêm chi tiết', isCorrect: false },
        ],
        explanation: `Quy tắc vàng: Trúng thưởng thật KHÔNG BAO GIỜ yêu cầu nộp tiền trước. Nếu phải trả phí để nhận quà, đó là LỪA ĐẢO 100%. Các chương trình khuyến mãi hợp pháp sẽ trừ phí vào giá trị giải thưởng hoặc miễn phí hoàn toàn.`,
        tags: ['trúng thưởng', 'phí', 'nộp tiền'],
      }
    },
  },

  // ========== JOB SCAM - 400+ variations ==========
  {
    category: 'JOB_SCAM',
    difficulty: 'easy',
    type: 'text',
    generate: () => {
      const platform = random(ECOMMERCE)
      const salary = random(['500k-2tr/ngày', '300k-1tr/giờ', '10-30tr/tháng làm tại nhà'])
      return {
        type: 'text',
        category: QUIZ_CATEGORIES.JOB_SCAM,
        difficulty: 'easy',
        question: `Quảng cáo: "Tuyển CTV ${platform}, ${salary}, chỉ cần điện thoại, không cần kinh nghiệm." Đây có phải công việc thật?`,
        options: [
          { id: 'a', text: 'Có, nhiều người làm CTV online', isCorrect: false },
          { id: 'b', text: 'Không, đây là lừa đảo "việc nhẹ lương cao"', isCorrect: true },
          { id: 'c', text: 'Cần tìm hiểu thêm', isCorrect: false },
          { id: 'd', text: 'Có nếu là công ty uy tín', isCorrect: false },
        ],
        explanation: `"Việc nhẹ lương cao" là dấu hiệu lừa đảo #1. ${platform} và các sàn TMĐT không tuyển CTV qua tin nhắn/quảng cáo. Các "công việc" này thường yêu cầu nạp tiền và bạn sẽ mất trắng.`,
        tags: ['tuyển dụng', 'việc nhẹ lương cao', platform.toLowerCase()],
      }
    },
  },
  {
    category: 'JOB_SCAM',
    difficulty: 'medium',
    type: 'scenario',
    generate: () => {
      const deposit = random([500000, 1000000, 2000000, 5000000])
      const job = random(['đánh giá sản phẩm', 'like video', 'đặt đơn ảo', 'nhập liệu'])
      return {
        type: 'scenario',
        category: QUIZ_CATEGORIES.JOB_SCAM,
        difficulty: 'medium',
        question: `Công việc "${job}" yêu cầu đặt cọc ${formatMoney(deposit)} để "đảm bảo hoàn thành nhiệm vụ". Bạn nên làm gì?`,
        scenario: `Yêu cầu đặt cọc khi xin việc online`,
        options: [
          { id: 'a', text: 'Đặt cọc nếu công ty có giấy phép', isCorrect: false },
          { id: 'b', text: 'Từ chối ngay, công việc thật không yêu cầu đặt cọc', isCorrect: true },
          { id: 'c', text: 'Đặt cọc ít hơn để thử', isCorrect: false },
          { id: 'd', text: 'Yêu cầu hợp đồng rồi đặt cọc', isCorrect: false },
        ],
        explanation: `KHÔNG CÓ CÔNG VIỆC HỢP PHÁP NÀO yêu cầu người lao động đặt cọc. Đây là chiêu lừa đảo: bạn đặt cọc → làm vài nhiệm vụ nhỏ → được trả tiền → tin tưởng nạp thêm → mất trắng.`,
        tags: ['tuyển dụng', 'đặt cọc', 'task scam'],
      }
    },
  },
  {
    category: 'JOB_SCAM',
    difficulty: 'hard',
    type: 'scenario',
    generate: () => {
      const platform = random(ECOMMERCE)
      return {
        type: 'scenario',
        category: QUIZ_CATEGORIES.JOB_SCAM,
        difficulty: 'hard',
        question: `Bạn làm "CTV ${platform}", được trả tiền 3 lần đầu. Giờ họ yêu cầu nạp 5 triệu để "mở khóa nhiệm vụ VIP lương cao hơn". Bạn nên?`,
        scenario: `Đã nhận được tiền từ "công việc" online`,
        options: [
          { id: 'a', text: 'Nạp tiền vì đã được trả lương trước đó', isCorrect: false },
          { id: 'b', text: 'Dừng lại ngay, đây là giai đoạn 2 của lừa đảo', isCorrect: true },
          { id: 'c', text: 'Nạp ít hơn để thử', isCorrect: false },
          { id: 'd', text: 'Hỏi ý kiến "quản lý" trước', isCorrect: false },
        ],
        explanation: `Đây là chiêu "pig butchering" - nuôi lợn rồi mổ. Kẻ gian trả tiền nhỏ để tạo niềm tin, sau đó yêu cầu nạp số tiền lớn hơn nhiều. Bạn sẽ KHÔNG BAO GIỜ rút được tiền đã nạp.`,
        tags: ['tuyển dụng', 'pig butchering', 'nạp tiền'],
      }
    },
  },

  // ========== INVESTMENT SCAM - 400+ variations ==========
  {
    category: 'INVESTMENT',
    difficulty: 'easy',
    type: 'text',
    generate: () => {
      const rate = random(['2%/ngày', '30%/tháng', '100%/năm', '5%/tuần'])
      const type = random(['crypto', 'forex', 'chứng khoán', 'bất động sản'])
      return {
        type: 'text',
        category: QUIZ_CATEGORIES.INVESTMENT,
        difficulty: 'easy',
        question: `Quảng cáo đầu tư ${type} cam kết lãi ${rate}, "không rủi ro, rút tiền bất cứ lúc nào". Đây có đáng tin?`,
        options: [
          { id: 'a', text: 'Có, nếu có nhiều người đã đầu tư', isCorrect: false },
          { id: 'b', text: 'Không, cam kết lãi cao + không rủi ro = lừa đảo', isCorrect: true },
          { id: 'c', text: 'Cần nghiên cứu thêm về công ty', isCorrect: false },
          { id: 'd', text: 'Có nếu được cấp phép', isCorrect: false },
        ],
        explanation: `Quy tắc đầu tư: Lợi nhuận cao = Rủi ro cao. Không có khoản đầu tư nào "cam kết" lãi suất cố định cao mà không có rủi ro. Đây là dấu hiệu của mô hình Ponzi - trả lãi bằng tiền người mới.`,
        tags: ['đầu tư', 'lãi suất cao', type],
      }
    },
  },
  {
    category: 'INVESTMENT',
    difficulty: 'medium',
    type: 'scenario',
    generate: () => {
      const platform = random(['Binance', 'Coinbase', 'MetaTrader', 'eToro'])
      return {
        type: 'scenario',
        category: QUIZ_CATEGORIES.INVESTMENT,
        difficulty: 'medium',
        question: `Bạn được mời vào group "VIP Trading ${platform}" với "chuyên gia" hướng dẫn đầu tư. Họ khoe lợi nhuận khủng và mời bạn nạp tiền. Đây có an toàn?`,
        scenario: `Group đầu tư trên Telegram/Zalo`,
        options: [
          { id: 'a', text: 'An toàn nếu ${platform} là sàn uy tín', isCorrect: false },
          { id: 'b', text: 'Không an toàn, đây là chiêu lừa đảo phổ biến', isCorrect: true },
          { id: 'c', text: 'Thử với số tiền nhỏ', isCorrect: false },
          { id: 'd', text: 'An toàn nếu "chuyên gia" có chứng chỉ', isCorrect: false },
        ],
        explanation: `Các group "VIP Trading" là lừa đảo. Họ dùng tên sàn uy tín nhưng không liên quan. "Chuyên gia" là kẻ gian, ảnh lợi nhuận là giả. Bạn sẽ nạp tiền vào sàn giả và mất trắng.`,
        tags: ['đầu tư', 'group vip', 'crypto', 'forex'],
      }
    },
  },

  // ========== ROMANCE SCAM - 300+ variations ==========
  {
    category: 'ROMANCE',
    difficulty: 'medium',
    type: 'scenario',
    generate: () => {
      const country = random(['Mỹ', 'Anh', 'Đức', 'Úc', 'Canada'])
      const job = random(['bác sĩ', 'kỹ sư', 'quân nhân', 'doanh nhân'])
      return {
        type: 'scenario',
        category: QUIZ_CATEGORIES.ROMANCE,
        difficulty: 'medium',
        question: `Người ${country} (${job}) quen qua mạng 2 tuần, nói yêu bạn và muốn gửi quà. Sau đó nhờ bạn đóng "phí hải quan" để nhận quà. Đây có phải lừa đảo?`,
        scenario: `Người nước ngoài quen qua mạng xã hội`,
        options: [
          { id: 'a', text: 'Không, họ thật sự muốn gửi quà', isCorrect: false },
          { id: 'b', text: 'Có, đây là lừa đảo tình cảm điển hình', isCorrect: true },
          { id: 'c', text: 'Cần video call để xác nhận', isCorrect: false },
          { id: 'd', text: 'Chỉ lừa đảo nếu số tiền lớn', isCorrect: false },
        ],
        explanation: `Đây là "romance scam" kinh điển. Kẻ gian giả làm người nước ngoài thành đạt, tạo tình cảm nhanh chóng, rồi xin tiền với nhiều lý do (phí hải quan, bệnh viện, vé máy bay...). Họ KHÔNG BAO GIỜ xuất hiện thật.`,
        tags: ['tình cảm', 'người nước ngoài', 'phí hải quan'],
      }
    },
  },

  // ========== IMPERSONATION - 300+ variations ==========
  {
    category: 'IMPERSONATION',
    difficulty: 'easy',
    type: 'scenario',
    generate: () => {
      const relation = random(['con', 'cháu', 'em', 'bạn thân'])
      const reason = random(['bị tai nạn', 'bị công an bắt', 'cần tiền gấp', 'đang ở bệnh viện'])
      const amount = randomAmount() * 5
      return {
        type: 'scenario',
        category: QUIZ_CATEGORIES.IMPERSONATION,
        difficulty: 'easy',
        question: `Bạn nhận tin nhắn: "${relation.charAt(0).toUpperCase() + relation.slice(1)} đây, số mới. ${reason.charAt(0).toUpperCase() + reason.slice(1)}, chuyển gấp ${formatMoney(amount)} giúp ${relation}." Bạn nên làm gì?`,
        scenario: `Tin nhắn từ số lạ tự xưng là người thân`,
        options: [
          { id: 'a', text: 'Chuyển ngay vì ${relation} đang gặp nạn', isCorrect: false },
          { id: 'b', text: 'Gọi điện số cũ của ${relation} để xác nhận', isCorrect: true },
          { id: 'c', text: 'Hỏi thêm chi tiết qua tin nhắn', isCorrect: false },
          { id: 'd', text: 'Chuyển một phần tiền trước', isCorrect: false },
        ],
        explanation: `Đây là lừa đảo giả mạo người thân. Kẻ gian tạo tình huống khẩn cấp để bạn không kịp suy nghĩ. LUÔN gọi điện số cũ hoặc liên hệ người thân khác để xác nhận trước khi chuyển tiền.`,
        tags: ['giả mạo', 'người thân', 'khẩn cấp'],
      }
    },
  },


  // ========== OTP SCAM - 300+ variations ==========
  {
    category: 'OTP_SCAM',
    difficulty: 'easy',
    type: 'text',
    generate: () => {
      const service = random([...BANKS, ...ECOMMERCE, 'MoMo', 'ZaloPay', 'VNPay'])
      return {
        type: 'text',
        category: QUIZ_CATEGORIES.OTP_SCAM,
        difficulty: 'easy',
        question: `Ai có thể yêu cầu bạn cung cấp mã OTP của ${service}?`,
        options: [
          { id: 'a', text: 'Nhân viên ${service} khi hỗ trợ', isCorrect: false },
          { id: 'b', text: 'Công an khi điều tra', isCorrect: false },
          { id: 'c', text: 'KHÔNG AI CẢ - OTP chỉ bạn biết', isCorrect: true },
          { id: 'd', text: 'Người thân khi cần gấp', isCorrect: false },
        ],
        explanation: `OTP (One-Time Password) là mã bảo mật CHỈ BẠN được biết. Không có tổ chức, cá nhân nào được phép yêu cầu OTP của bạn. Bất kỳ ai hỏi OTP đều là LỪA ĐẢO, kể cả tự xưng là ngân hàng, công an, hay người thân.`,
        tags: ['otp', 'bảo mật', service.toLowerCase()],
      }
    },
  },
  {
    category: 'OTP_SCAM',
    difficulty: 'medium',
    type: 'scenario',
    generate: () => {
      const bank = random(BANKS)
      return {
        type: 'scenario',
        category: QUIZ_CATEGORIES.OTP_SCAM,
        difficulty: 'medium',
        question: `Bạn nhận OTP từ ${bank} dù không thực hiện giao dịch. Ngay sau đó có người gọi xưng là ${bank} nói "hệ thống lỗi gửi nhầm, đọc OTP để hủy". Bạn nên?`,
        scenario: `Nhận OTP bất ngờ + cuộc gọi yêu cầu đọc OTP`,
        options: [
          { id: 'a', text: 'Đọc OTP để hủy giao dịch lỗi', isCorrect: false },
          { id: 'b', text: 'Cúp máy, KHÔNG đọc OTP, gọi hotline ngân hàng', isCorrect: true },
          { id: 'c', text: 'Hỏi tên nhân viên để kiểm tra', isCorrect: false },
          { id: 'd', text: 'Đợi xem có bị trừ tiền không', isCorrect: false },
        ],
        explanation: `Đây là lừa đảo tinh vi: kẻ gian đang cố đăng nhập tài khoản của bạn, OTP được gửi đến bạn. Họ gọi điện để lừa lấy OTP. Nếu đọc OTP, bạn sẽ mất tiền ngay lập tức. KHÔNG BAO GIỜ đọc OTP cho bất kỳ ai.`,
        tags: ['otp', 'ngân hàng', 'cuộc gọi lừa đảo'],
      }
    },
  },

  // ========== GAMBLING - 200+ variations ==========
  {
    category: 'GAMBLING',
    difficulty: 'easy',
    type: 'text',
    generate: () => {
      const type = random(['casino online', 'cá độ bóng đá', 'lô đề online', 'slot game', 'poker online'])
      return {
        type: 'text',
        category: QUIZ_CATEGORIES.GAMBLING,
        difficulty: 'easy',
        question: `Quảng cáo ${type} với "tỷ lệ thắng 99%", "rút tiền nhanh", "nhiều người đã giàu". Đây có đáng tin?`,
        options: [
          { id: 'a', text: 'Có, nếu nhiều người chơi', isCorrect: false },
          { id: 'b', text: 'Không, cờ bạc online là bất hợp pháp và lừa đảo', isCorrect: true },
          { id: 'c', text: 'Thử với số tiền nhỏ', isCorrect: false },
          { id: 'd', text: 'Có nếu website có giấy phép', isCorrect: false },
        ],
        explanation: `Cờ bạc online là BẤT HỢP PHÁP tại Việt Nam. Các website này thường: (1) Gian lận tỷ lệ, (2) Không cho rút tiền khi thắng, (3) Đánh cắp thông tin. "Tỷ lệ thắng 99%" là lời nói dối - nhà cái luôn thắng.`,
        tags: ['cờ bạc', type, 'bất hợp pháp'],
      }
    },
  },

  // ========== MALWARE - 200+ variations ==========
  {
    category: 'MALWARE',
    difficulty: 'medium',
    type: 'text',
    generate: () => {
      const fileType = random(['.apk', '.exe', '.zip', '.rar'])
      const source = random(['email lạ', 'tin nhắn Zalo', 'link Facebook', 'website không rõ nguồn'])
      return {
        type: 'text',
        category: QUIZ_CATEGORIES.MALWARE,
        difficulty: 'medium',
        question: `Bạn nhận file ${fileType} từ ${source} với nội dung "Ảnh bạn bị lộ" hoặc "Hóa đơn cần thanh toán". Bạn nên làm gì?`,
        options: [
          { id: 'a', text: 'Mở xem vì tò mò', isCorrect: false },
          { id: 'b', text: 'Xóa ngay, KHÔNG mở file từ nguồn không tin cậy', isCorrect: true },
          { id: 'c', text: 'Quét virus rồi mở', isCorrect: false },
          { id: 'd', text: 'Hỏi người gửi trước khi mở', isCorrect: false },
        ],
        explanation: `File ${fileType} từ nguồn lạ có thể chứa malware, virus, hoặc ransomware. Tiêu đề gây tò mò ("ảnh lộ", "hóa đơn") là chiêu để bạn mở file. KHÔNG BAO GIỜ mở file từ nguồn không tin cậy.`,
        tags: ['malware', 'file độc hại', fileType],
      }
    },
  },

  // ========== PASSWORD SECURITY - 200+ variations ==========
  {
    category: 'PASSWORD',
    difficulty: 'easy',
    type: 'text',
    generate: () => {
      const weakPass = random(['123456', 'password', 'qwerty', 'abc123', '111111', 'ngày sinh'])
      return {
        type: 'text',
        category: QUIZ_CATEGORIES.PASSWORD,
        difficulty: 'easy',
        question: `Mật khẩu "${weakPass}" có an toàn không?`,
        options: [
          { id: 'a', text: 'An toàn vì dễ nhớ', isCorrect: false },
          { id: 'b', text: 'Không an toàn, quá đơn giản và phổ biến', isCorrect: true },
          { id: 'c', text: 'An toàn nếu chỉ dùng cho tài khoản ít quan trọng', isCorrect: false },
          { id: 'd', text: 'An toàn nếu thêm số ở cuối', isCorrect: false },
        ],
        explanation: `"${weakPass}" nằm trong top mật khẩu phổ biến nhất, hacker có thể crack trong vài giây. Mật khẩu an toàn cần: ít nhất 12 ký tự, kết hợp chữ hoa/thường/số/ký tự đặc biệt, không dùng thông tin cá nhân.`,
        tags: ['mật khẩu', 'bảo mật', 'password'],
      }
    },
  },
  {
    category: 'PASSWORD',
    difficulty: 'medium',
    type: 'text',
    generate: () => {
      return {
        type: 'text',
        category: QUIZ_CATEGORIES.PASSWORD,
        difficulty: 'medium',
        question: `Bạn nên làm gì khi một website bị hack và lộ mật khẩu người dùng?`,
        options: [
          { id: 'a', text: 'Đổi mật khẩu website đó', isCorrect: false },
          { id: 'b', text: 'Đổi mật khẩu tất cả tài khoản dùng chung mật khẩu đó', isCorrect: true },
          { id: 'c', text: 'Chờ website thông báo', isCorrect: false },
          { id: 'd', text: 'Không cần làm gì nếu chưa bị hack', isCorrect: false },
        ],
        explanation: `Khi mật khẩu bị lộ, hacker sẽ thử mật khẩu đó trên nhiều website khác (credential stuffing). Nếu bạn dùng chung mật khẩu, TẤT CẢ tài khoản đều có nguy cơ. Đây là lý do nên dùng mật khẩu khác nhau cho mỗi tài khoản.`,
        tags: ['mật khẩu', 'data breach', 'credential stuffing'],
      }
    },
  },

  // ========== PRIVACY - 200+ variations ==========
  {
    category: 'PRIVACY',
    difficulty: 'easy',
    type: 'text',
    generate: () => {
      const info = random(['số CMND/CCCD', 'ảnh CMND', 'số tài khoản ngân hàng', 'địa chỉ nhà', 'số điện thoại'])
      const platform = random(SOCIAL)
      return {
        type: 'text',
        category: QUIZ_CATEGORIES.PRIVACY,
        difficulty: 'easy',
        question: `Bạn có nên đăng ${info} lên ${platform} không?`,
        options: [
          { id: 'a', text: 'Có, nếu chỉ bạn bè thấy', isCorrect: false },
          { id: 'b', text: 'KHÔNG BAO GIỜ đăng thông tin nhạy cảm lên mạng', isCorrect: true },
          { id: 'c', text: 'Có, nếu cần thiết', isCorrect: false },
          { id: 'd', text: 'Có, nếu che một phần thông tin', isCorrect: false },
        ],
        explanation: `${info} là thông tin nhạy cảm có thể bị sử dụng để: đánh cắp danh tính, mở tài khoản giả, vay tiền online, hoặc lừa đảo người khác. KHÔNG BAO GIỜ chia sẻ thông tin này trên mạng xã hội, kể cả ở chế độ riêng tư.`,
        tags: ['quyền riêng tư', info, platform.toLowerCase()],
      }
    },
  },

  // ========== SAFE BROWSING - 200+ variations ==========
  {
    category: 'SAFE_BROWSING',
    difficulty: 'easy',
    type: 'text',
    generate: () => {
      const site = random(['ngân hàng', 'email', 'mạng xã hội', 'mua sắm online'])
      return {
        type: 'text',
        category: QUIZ_CATEGORIES.SAFE_BROWSING,
        difficulty: 'easy',
        question: `Khi truy cập website ${site}, bạn nên kiểm tra điều gì đầu tiên?`,
        options: [
          { id: 'a', text: 'Giao diện có đẹp không', isCorrect: false },
          { id: 'b', text: 'URL trên thanh địa chỉ có đúng không', isCorrect: true },
          { id: 'c', text: 'Có nhiều người dùng không', isCorrect: false },
          { id: 'd', text: 'Tốc độ load trang', isCorrect: false },
        ],
        explanation: `URL là thứ QUAN TRỌNG NHẤT cần kiểm tra. Website giả có thể copy giao diện 100% nhưng URL sẽ khác. Ví dụ: vietcombank.com.vn (thật) vs vietcombank-vn.com (giả). Luôn kiểm tra URL trước khi đăng nhập.`,
        tags: ['url', 'duyệt web', site],
      }
    },
  },
  {
    category: 'SAFE_BROWSING',
    difficulty: 'medium',
    type: 'text',
    generate: () => {
      return {
        type: 'text',
        category: QUIZ_CATEGORIES.SAFE_BROWSING,
        difficulty: 'medium',
        question: `Website có biểu tượng khóa HTTPS có nghĩa là gì?`,
        options: [
          { id: 'a', text: 'Website 100% an toàn và đáng tin cậy', isCorrect: false },
          { id: 'b', text: 'Kết nối được mã hóa, nhưng website có thể vẫn là lừa đảo', isCorrect: true },
          { id: 'c', text: 'Website được chính phủ xác nhận', isCorrect: false },
          { id: 'd', text: 'Không thể bị hack', isCorrect: false },
        ],
        explanation: `HTTPS chỉ nghĩa là kết nối giữa bạn và website được mã hóa, không ai có thể đọc trộm. Nhưng website LỪA ĐẢO cũng có thể có HTTPS! Kẻ gian có thể tạo website giả với HTTPS miễn phí. Vẫn cần kiểm tra URL.`,
        tags: ['https', 'ssl', 'bảo mật'],
      }
    },
  },

  // ========== SOCIAL ENGINEERING - 200+ variations ==========
  {
    category: 'SOCIAL_ENGINEERING',
    difficulty: 'hard',
    type: 'scenario',
    generate: () => {
      const org = random(['công an', 'viện kiểm sát', 'tòa án', 'ngân hàng nhà nước', 'bộ công an'])
      const crime = random(['rửa tiền', 'buôn ma túy', 'lừa đảo', 'trốn thuế'])
      return {
        type: 'scenario',
        category: QUIZ_CATEGORIES.SOCIAL_ENGINEERING,
        difficulty: 'hard',
        question: `Bạn nhận cuộc gọi tự xưng ${org}, nói bạn liên quan đến vụ án ${crime}, yêu cầu chuyển tiền vào "tài khoản an toàn" để điều tra. Đây có phải thật?`,
        scenario: `Cuộc gọi từ "cơ quan chức năng"`,
        options: [
          { id: 'a', text: 'Có thể thật, cần hợp tác điều tra', isCorrect: false },
          { id: 'b', text: 'Lừa đảo 100% - cơ quan chức năng không làm việc qua điện thoại như vậy', isCorrect: true },
          { id: 'c', text: 'Yêu cầu gặp trực tiếp để xác nhận', isCorrect: false },
          { id: 'd', text: 'Hỏi số hiệu công an để kiểm tra', isCorrect: false },
        ],
        explanation: `Đây là lừa đảo "giả danh công an" rất phổ biến. Cơ quan chức năng KHÔNG BAO GIỜ: (1) Gọi điện yêu cầu chuyển tiền, (2) Có "tài khoản an toàn", (3) Đe dọa qua điện thoại. Nếu thật sự có vụ án, họ sẽ gửi giấy triệu tập chính thức.`,
        tags: ['giả danh', 'công an', 'tài khoản an toàn'],
      }
    },
  },

  // ========== IMAGE-BASED QUESTIONS ==========
  {
    category: 'MONEY_TRANSFER',
    difficulty: 'medium',
    type: 'image',
    generate: () => {
      const imageData = generateMoneyTransferScam()
      return {
        type: 'image' as const,
        category: QUIZ_CATEGORIES.MONEY_TRANSFER,
        difficulty: 'medium' as const,
        question: 'Xem tin nhắn dưới đây. Đây có phải là lừa đảo không?',
        image: imageData.dataUrl,
        imageData,
        options: [
          { id: 'a', text: 'Không, bạn bè nhờ giúp là bình thường', isCorrect: false },
          { id: 'b', text: 'Có, đây là lừa đảo nhờ chuyển tiền điển hình', isCorrect: true },
          { id: 'c', text: 'Cần hỏi thêm thông tin', isCorrect: false },
          { id: 'd', text: 'Chỉ lừa đảo nếu số tiền lớn', isCorrect: false },
        ],
        explanation: `🚨 DẤU HIỆU LỪA ĐẢO:\n${imageData.redFlags.map(f => `• ${f}`).join('\n')}\n\nLuôn gọi điện xác nhận trực tiếp trước khi chuyển tiền!`,
        tags: ['hình ảnh', 'chuyển tiền', 'zalo'],
      }
    },
  },
  {
    category: 'FAKE_BANK',
    difficulty: 'medium',
    type: 'image',
    generate: () => {
      const imageData = generateFakeBankSMS()
      return {
        type: 'image' as const,
        category: QUIZ_CATEGORIES.FAKE_BANK,
        difficulty: 'medium' as const,
        question: 'Bạn nhận được SMS như hình. Đây có phải tin nhắn thật từ ngân hàng?',
        image: imageData.dataUrl,
        imageData,
        options: [
          { id: 'a', text: 'Có, vì có tên ngân hàng', isCorrect: false },
          { id: 'b', text: 'Không, đây là SMS phishing giả mạo', isCorrect: true },
          { id: 'c', text: 'Cần truy cập link để kiểm tra', isCorrect: false },
          { id: 'd', text: 'Có nếu số gửi là số ngân hàng', isCorrect: false },
        ],
        explanation: `🚨 DẤU HIỆU LỪA ĐẢO:\n${imageData.redFlags.map(f => `• ${f}`).join('\n')}\n\nNgân hàng KHÔNG BAO GIỜ gửi link qua SMS yêu cầu đăng nhập!`,
        tags: ['hình ảnh', 'sms', 'ngân hàng', 'phishing'],
      }
    },
  },
  {
    category: 'PRIZE_SCAM',
    difficulty: 'easy',
    type: 'image',
    generate: () => {
      const imageData = generatePrizeScam()
      return {
        type: 'image' as const,
        category: QUIZ_CATEGORIES.PRIZE_SCAM,
        difficulty: 'easy' as const,
        question: 'Bạn nhận được tin nhắn trúng thưởng như hình. Bạn nên làm gì?',
        image: imageData.dataUrl,
        imageData,
        options: [
          { id: 'a', text: 'Truy cập link để nhận thưởng', isCorrect: false },
          { id: 'b', text: 'Xóa ngay, đây là lừa đảo trúng thưởng', isCorrect: true },
          { id: 'c', text: 'Chia sẻ cho bạn bè cùng nhận', isCorrect: false },
          { id: 'd', text: 'Gọi số trong tin nhắn để xác nhận', isCorrect: false },
        ],
        explanation: `🚨 DẤU HIỆU LỪA ĐẢO:\n${imageData.redFlags.map(f => `• ${f}`).join('\n')}\n\nBạn KHÔNG THỂ trúng thưởng từ chương trình chưa tham gia!`,
        tags: ['hình ảnh', 'trúng thưởng', 'sms'],
      }
    },
  },
  {
    category: 'JOB_SCAM',
    difficulty: 'medium',
    type: 'image',
    generate: () => {
      const imageData = generateJobScam()
      return {
        type: 'image' as const,
        category: QUIZ_CATEGORIES.JOB_SCAM,
        difficulty: 'medium' as const,
        question: 'Bạn nhận được tin nhắn tuyển dụng như hình. Đây có phải công việc thật?',
        image: imageData.dataUrl,
        imageData,
        options: [
          { id: 'a', text: 'Có, nhiều người làm CTV online', isCorrect: false },
          { id: 'b', text: 'Không, đây là lừa đảo "việc nhẹ lương cao"', isCorrect: true },
          { id: 'c', text: 'Thử liên hệ để tìm hiểu thêm', isCorrect: false },
          { id: 'd', text: 'Có nếu không yêu cầu đặt cọc', isCorrect: false },
        ],
        explanation: `🚨 DẤU HIỆU LỪA ĐẢO:\n${imageData.redFlags.map(f => `• ${f}`).join('\n')}\n\nCông việc thật không hứa lương cao phi thực tế!`,
        tags: ['hình ảnh', 'tuyển dụng', 'messenger'],
      }
    },
  },
  {
    category: 'OTP_SCAM',
    difficulty: 'hard',
    type: 'image',
    generate: () => {
      const imageData = generateOTPScam()
      return {
        type: 'image' as const,
        category: QUIZ_CATEGORIES.OTP_SCAM,
        difficulty: 'hard' as const,
        question: 'Bạn nhận được tin nhắn yêu cầu OTP như hình. Bạn nên làm gì?',
        image: imageData.dataUrl,
        imageData,
        options: [
          { id: 'a', text: 'Đọc OTP để hủy giao dịch lỗi', isCorrect: false },
          { id: 'b', text: 'KHÔNG đọc OTP, cúp máy và gọi hotline ngân hàng', isCorrect: true },
          { id: 'c', text: 'Hỏi tên nhân viên để kiểm tra', isCorrect: false },
          { id: 'd', text: 'Đợi xem có bị trừ tiền không', isCorrect: false },
        ],
        explanation: `🚨 DẤU HIỆU LỪA ĐẢO:\n${imageData.redFlags.map(f => `• ${f}`).join('\n')}\n\nOTP là mã bảo mật CHỈ BẠN được biết. Đọc OTP = mất tiền!`,
        tags: ['hình ảnh', 'otp', 'ngân hàng'],
      }
    },
  },
  {
    category: 'IMPERSONATION',
    difficulty: 'medium',
    type: 'image',
    generate: () => {
      const imageData = generateImpersonationScam()
      return {
        type: 'image' as const,
        category: QUIZ_CATEGORIES.IMPERSONATION,
        difficulty: 'medium' as const,
        question: 'Bạn nhận được tin nhắn từ "người thân" như hình. Bạn nên làm gì?',
        image: imageData.dataUrl,
        imageData,
        options: [
          { id: 'a', text: 'Chuyển tiền ngay vì người thân đang gặp nạn', isCorrect: false },
          { id: 'b', text: 'Gọi điện số cũ của người thân để xác nhận', isCorrect: true },
          { id: 'c', text: 'Hỏi thêm chi tiết qua tin nhắn', isCorrect: false },
          { id: 'd', text: 'Chuyển một phần tiền trước', isCorrect: false },
        ],
        explanation: `🚨 DẤU HIỆU LỪA ĐẢO:\n${imageData.redFlags.map(f => `• ${f}`).join('\n')}\n\nLuôn gọi điện số cũ để xác nhận trước khi chuyển tiền!`,
        tags: ['hình ảnh', 'giả mạo', 'người thân'],
      }
    },
  },
  {
    category: 'PHISHING',
    difficulty: 'hard',
    type: 'image',
    generate: () => {
      const imageData = generatePhishingEmail()
      return {
        type: 'image' as const,
        category: QUIZ_CATEGORIES.PHISHING,
        difficulty: 'hard' as const,
        question: 'Bạn nhận được email như hình. Đây có phải email thật từ ngân hàng?',
        image: imageData.dataUrl,
        imageData,
        options: [
          { id: 'a', text: 'Có, vì nội dung chuyên nghiệp', isCorrect: false },
          { id: 'b', text: 'Không, đây là email phishing giả mạo', isCorrect: true },
          { id: 'c', text: 'Cần click link để kiểm tra', isCorrect: false },
          { id: 'd', text: 'Có nếu có logo ngân hàng', isCorrect: false },
        ],
        explanation: `🚨 DẤU HIỆU LỪA ĐẢO:\n${imageData.redFlags.map(f => `• ${f}`).join('\n')}\n\nLuôn truy cập trực tiếp website ngân hàng, không click link trong email!`,
        tags: ['hình ảnh', 'email', 'phishing'],
      }
    },
  },
  {
    category: 'SAFE_BROWSING',
    difficulty: 'easy',
    type: 'image',
    generate: () => {
      const imageData = generateLegitimateMessage()
      return {
        type: 'image' as const,
        category: QUIZ_CATEGORIES.SAFE_BROWSING,
        difficulty: 'easy' as const,
        question: 'Xem tin nhắn dưới đây. Đây có phải tin nhắn lừa đảo không?',
        image: imageData.dataUrl,
        imageData,
        options: [
          { id: 'a', text: 'Có, tất cả SMS ngân hàng đều là lừa đảo', isCorrect: false },
          { id: 'b', text: 'Không, đây là thông báo giao dịch bình thường', isCorrect: true },
          { id: 'c', text: 'Cần gọi ngân hàng để xác nhận', isCorrect: false },
          { id: 'd', text: 'Có vì có số điện thoại', isCorrect: false },
        ],
        explanation: `✅ ĐÂY LÀ TIN NHẮN THẬT:\n• Chỉ thông báo giao dịch, không yêu cầu hành động\n• Không có link lạ\n• Số hotline là số chính thức (kiểm tra trên website)\n• Không tạo áp lực hay đe dọa`,
        tags: ['hình ảnh', 'sms', 'an toàn'],
      }
    },
  },

  // ========== NEW IMAGE-BASED QUESTIONS ==========
  {
    category: 'PHISHING',
    difficulty: 'hard',
    type: 'image',
    generate: () => {
      const imageData = generateFakeWebsiteLogin()
      return {
        type: 'image' as const,
        category: QUIZ_CATEGORIES.PHISHING,
        difficulty: 'hard' as const,
        question: 'Xem trang đăng nhập dưới đây. Đây có phải website chính thức của ngân hàng?',
        image: imageData.dataUrl,
        imageData,
        options: [
          { id: 'a', text: 'Có, giao diện giống hệt website chính thức', isCorrect: false },
          { id: 'b', text: 'Không, URL trên thanh địa chỉ là giả mạo', isCorrect: true },
          { id: 'c', text: 'Có, vì có logo ngân hàng', isCorrect: false },
          { id: 'd', text: 'Cần đăng nhập thử để kiểm tra', isCorrect: false },
        ],
        explanation: `🚨 DẤU HIỆU LỪA ĐẢO:\n${imageData.redFlags.map(f => `• ${f}`).join('\n')}\n\nLuôn kiểm tra URL trước khi đăng nhập!`,
        tags: ['hình ảnh', 'website', 'phishing', 'url'],
      }
    },
  },
  {
    category: 'SAFE_BROWSING',
    difficulty: 'medium',
    type: 'image',
    generate: () => {
      const imageData = generateFakeQRCode()
      return {
        type: 'image' as const,
        category: QUIZ_CATEGORIES.SAFE_BROWSING,
        difficulty: 'medium' as const,
        question: 'Bạn thấy QR code như hình ở nơi công cộng. Bạn nên làm gì?',
        image: imageData.dataUrl,
        imageData,
        options: [
          { id: 'a', text: 'Quét ngay để thanh toán/nhận ưu đãi', isCorrect: false },
          { id: 'b', text: 'Kiểm tra kỹ QR có bị dán đè không, xem URL sau khi quét', isCorrect: true },
          { id: 'c', text: 'QR code luôn an toàn, cứ quét', isCorrect: false },
          { id: 'd', text: 'Chỉ quét nếu ở cửa hàng lớn', isCorrect: false },
        ],
        explanation: `🚨 DẤU HIỆU LỪA ĐẢO:\n${imageData.redFlags.map(f => `• ${f}`).join('\n')}\n\nKẻ gian có thể dán QR giả đè lên QR thật!`,
        tags: ['hình ảnh', 'qr code', 'thanh toán'],
      }
    },
  },
  {
    category: 'MONEY_TRANSFER',
    difficulty: 'hard',
    type: 'image',
    generate: () => {
      const imageData = generateFakeTransferConfirmation()
      return {
        type: 'image' as const,
        category: QUIZ_CATEGORIES.MONEY_TRANSFER,
        difficulty: 'hard' as const,
        question: 'Người mua hàng gửi ảnh chuyển tiền như hình và yêu cầu giao hàng. Bạn nên làm gì?',
        image: imageData.dataUrl,
        imageData,
        options: [
          { id: 'a', text: 'Giao hàng ngay vì có bằng chứng chuyển tiền', isCorrect: false },
          { id: 'b', text: 'Kiểm tra số dư tài khoản thực tế trước khi giao', isCorrect: true },
          { id: 'c', text: 'Yêu cầu gửi thêm ảnh biên lai', isCorrect: false },
          { id: 'd', text: 'Tin tưởng nếu ảnh rõ nét', isCorrect: false },
        ],
        explanation: `🚨 DẤU HIỆU LỪA ĐẢO:\n${imageData.redFlags.map(f => `• ${f}`).join('\n')}\n\nChỉ tin thông báo từ app ngân hàng, không tin ảnh chụp màn hình!`,
        tags: ['hình ảnh', 'chuyển tiền', 'photoshop'],
      }
    },
  },
  {
    category: 'PRIZE_SCAM',
    difficulty: 'medium',
    type: 'image',
    generate: () => {
      const imageData = generateFakeAppNotification()
      return {
        type: 'image' as const,
        category: QUIZ_CATEGORIES.PRIZE_SCAM,
        difficulty: 'medium' as const,
        question: 'Bạn nhận được thông báo như hình trên điện thoại. Đây có phải thật không?',
        image: imageData.dataUrl,
        imageData,
        options: [
          { id: 'a', text: 'Có, vì thông báo từ app chính thức', isCorrect: false },
          { id: 'b', text: 'Không chắc, cần mở app để kiểm tra trực tiếp', isCorrect: true },
          { id: 'c', text: 'Có, nhấn ngay để nhận tiền', isCorrect: false },
          { id: 'd', text: 'Có nếu số tiền nhỏ', isCorrect: false },
        ],
        explanation: `🚨 DẤU HIỆU LỪA ĐẢO:\n${imageData.redFlags.map(f => `• ${f}`).join('\n')}\n\nLuôn mở app chính thức để kiểm tra, không nhấn vào notification!`,
        tags: ['hình ảnh', 'notification', 'app giả'],
      }
    },
  },
  {
    category: 'INVESTMENT',
    difficulty: 'easy',
    type: 'image',
    generate: () => {
      const imageData = generateCryptoScam()
      return {
        type: 'image' as const,
        category: QUIZ_CATEGORIES.INVESTMENT,
        difficulty: 'easy' as const,
        question: 'Bạn thấy quảng cáo đầu tư như hình. Đây có đáng tin không?',
        image: imageData.dataUrl,
        imageData,
        options: [
          { id: 'a', text: 'Có, nhiều người đã giàu từ crypto', isCorrect: false },
          { id: 'b', text: 'Không, đây là lừa đảo đầu tư điển hình', isCorrect: true },
          { id: 'c', text: 'Thử với số tiền nhỏ', isCorrect: false },
          { id: 'd', text: 'Có nếu có testimonial', isCorrect: false },
        ],
        explanation: `🚨 DẤU HIỆU LỪA ĐẢO:\n${imageData.redFlags.map(f => `• ${f}`).join('\n')}\n\nKhông có đầu tư nào cam kết lợi nhuận cao mà không có rủi ro!`,
        tags: ['hình ảnh', 'đầu tư', 'crypto', 'ponzi'],
      }
    },
  },
  {
    category: 'ROMANCE',
    difficulty: 'medium',
    type: 'image',
    generate: () => {
      const imageData = generateRomanceScamProfile()
      return {
        type: 'image' as const,
        category: QUIZ_CATEGORIES.ROMANCE,
        difficulty: 'medium' as const,
        question: 'Bạn nhận được lời mời kết bạn từ profile như hình. Đây có đáng tin không?',
        image: imageData.dataUrl,
        imageData,
        options: [
          { id: 'a', text: 'Có, profile đầy đủ thông tin', isCorrect: false },
          { id: 'b', text: 'Cần cảnh giác, có nhiều dấu hiệu lừa đảo tình cảm', isCorrect: true },
          { id: 'c', text: 'Có nếu họ video call', isCorrect: false },
          { id: 'd', text: 'Có vì người nước ngoài thường thật thà', isCorrect: false },
        ],
        explanation: `🚨 DẤU HIỆU LỪA ĐẢO:\n${imageData.redFlags.map(f => `• ${f}`).join('\n')}\n\nLừa đảo tình cảm thường bắt đầu từ profile "hoàn hảo" như thế này!`,
        tags: ['hình ảnh', 'tình cảm', 'romance scam', 'profile giả'],
      }
    },
  },
]

// ============================================
// GENERATOR FUNCTIONS
// ============================================

// Import static questions from extra files
import { ALL_EXTRA_QUESTIONS } from './quizExtraData'
import { ALL_STATIC_QUESTIONS } from './quizStaticData'

// Combine all static questions
const ALL_STATIC_COMBINED = [...ALL_EXTRA_QUESTIONS, ...ALL_STATIC_QUESTIONS]

let questionCounter = 0

// Generate a single question from templates
export function generateQuestion(): QuizQuestion {
  const template = random(questionTemplates)
  const question = template.generate()
  questionCounter++
  
  return {
    id: `q_${Date.now()}_${questionCounter}`,
    ...question,
  } as QuizQuestion
}

// Get a random static question
function getRandomStaticQuestion(): QuizQuestion {
  const staticQ = random(ALL_STATIC_COMBINED)
  questionCounter++
  return {
    id: `q_static_${Date.now()}_${questionCounter}`,
    ...staticQ,
  } as QuizQuestion
}

// Helper to shuffle array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Generate questions - mix of templates (60%) and static (40%)
export function generateQuestions(count: number): QuizQuestion[] {
  const questions: QuizQuestion[] = []
  const templateCount = Math.ceil(count * 0.6)
  const staticCount = count - templateCount
  
  // Add template-generated questions
  for (let i = 0; i < templateCount; i++) {
    questions.push(generateQuestion())
  }
  
  // Add static questions
  const shuffledStatic = [...ALL_STATIC_COMBINED].sort(() => Math.random() - 0.5)
  for (let i = 0; i < Math.min(staticCount, shuffledStatic.length); i++) {
    questionCounter++
    questions.push({
      id: `q_static_${Date.now()}_${questionCounter}`,
      ...shuffledStatic[i],
    } as QuizQuestion)
  }
  
  // Shuffle all questions and their options
  return questions
    .sort(() => Math.random() - 0.5)
    .map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }))
}

// Generate questions by category - mix templates and static
export function generateQuestionsByCategory(category: string, count: number): QuizQuestion[] {
  const categoryKey = Object.keys(QUIZ_CATEGORIES).find(
    k => QUIZ_CATEGORIES[k as keyof typeof QUIZ_CATEGORIES] === category || k === category
  ) || category
  
  const categoryTemplates = questionTemplates.filter(t => t.category === categoryKey)
  const categoryStatic = ALL_STATIC_COMBINED.filter(q => 
    q.category === category || q.category === QUIZ_CATEGORIES[categoryKey as keyof typeof QUIZ_CATEGORIES]
  )
  
  const questions: QuizQuestion[] = []
  const templateCount = Math.ceil(count * 0.6)
  const staticCount = count - templateCount
  
  // Add from templates
  for (let i = 0; i < templateCount; i++) {
    if (categoryTemplates.length > 0) {
      const template = random(categoryTemplates)
      const question = template.generate()
      questionCounter++
      questions.push({
        id: `q_${Date.now()}_${questionCounter}`,
        ...question,
      } as QuizQuestion)
    } else {
      questions.push(generateQuestion())
    }
  }
  
  // Add from static
  const shuffledStatic = [...categoryStatic].sort(() => Math.random() - 0.5)
  for (let i = 0; i < Math.min(staticCount, shuffledStatic.length); i++) {
    questionCounter++
    questions.push({
      id: `q_static_${Date.now()}_${questionCounter}`,
      ...shuffledStatic[i],
    } as QuizQuestion)
  }
  
  // Fill remaining with templates if not enough static
  while (questions.length < count) {
    questions.push(generateQuestion())
  }
  
  // Shuffle questions and their options
  return questions
    .sort(() => Math.random() - 0.5)
    .map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }))
}

// Generate questions by difficulty - mix templates and static
export function generateQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard', count: number): QuizQuestion[] {
  const difficultyTemplates = questionTemplates.filter(t => t.difficulty === difficulty)
  const difficultyStatic = ALL_STATIC_COMBINED.filter(q => q.difficulty === difficulty)
  
  const questions: QuizQuestion[] = []
  const templateCount = Math.ceil(count * 0.6)
  const staticCount = count - templateCount
  
  // Add from templates
  for (let i = 0; i < templateCount; i++) {
    if (difficultyTemplates.length > 0) {
      const template = random(difficultyTemplates)
      const question = template.generate()
      questionCounter++
      questions.push({
        id: `q_${Date.now()}_${questionCounter}`,
        ...question,
      } as QuizQuestion)
    } else {
      questions.push(generateQuestion())
    }
  }
  
  // Add from static
  const shuffledStatic = [...difficultyStatic].sort(() => Math.random() - 0.5)
  for (let i = 0; i < Math.min(staticCount, shuffledStatic.length); i++) {
    questionCounter++
    questions.push({
      id: `q_static_${Date.now()}_${questionCounter}`,
      ...shuffledStatic[i],
    } as QuizQuestion)
  }
  
  // Fill remaining with templates if not enough static
  while (questions.length < count) {
    questions.push(generateQuestion())
  }
  
  // Shuffle questions and their options
  return questions
    .sort(() => Math.random() - 0.5)
    .map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }))
}

// Get all available categories
export function getCategories(): string[] {
  return Object.keys(QUIZ_CATEGORIES)
}

// Get category display name
export function getCategoryName(key: string): string {
  return QUIZ_CATEGORIES[key as keyof typeof QUIZ_CATEGORIES] || key
}

// Get total available questions count
export function getTotalQuestionsCount(): number {
  return questionTemplates.length * 10 + ALL_STATIC_COMBINED.length
}

