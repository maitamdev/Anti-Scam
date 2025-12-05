/**
 * Quiz Constants - Shared constants for quiz system
 */

export interface QuizQuestion {
  id: string
  type: 'text' | 'image' | 'scenario'
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  image?: string
  imageData?: QuizImage
  scenario?: string
  options: {
    id: string
    text: string
    isCorrect: boolean
  }[]
  explanation: string
  tags: string[]
}

export interface QuizImage {
  dataUrl: string
  type: 'zalo' | 'sms' | 'messenger' | 'bank' | 'email' | 'website'
  isScam: boolean
  description: string
  redFlags: string[]
}

// Categories
export const QUIZ_CATEGORIES = {
  PHISHING: 'Lừa đảo Phishing',
  MONEY_TRANSFER: 'Nhờ chuyển tiền',
  FAKE_BANK: 'Giả mạo ngân hàng',
  PRIZE_SCAM: 'Trúng thưởng giả',
  JOB_SCAM: 'Tuyển dụng lừa đảo',
  INVESTMENT: 'Đầu tư lừa đảo',
  ROMANCE: 'Lừa đảo tình cảm',
  IMPERSONATION: 'Giả mạo người thân',
  GAMBLING: 'Cờ bạc online',
  MALWARE: 'Phần mềm độc hại',
  SOCIAL_ENGINEERING: 'Kỹ thuật xã hội',
  PASSWORD: 'Bảo mật mật khẩu',
  PRIVACY: 'Quyền riêng tư',
  SAFE_BROWSING: 'Duyệt web an toàn',
  OTP_SCAM: 'Lừa đảo OTP',
}
