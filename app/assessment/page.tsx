'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ArrowLeft, ArrowRight, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface Question {
  id: number
  category: string
  question: string
  options: { value: number; label: string }[]
  explanation: {
    title: string
    content: string
  }
}

const questions: Question[] = [
  {
    id: 1,
    category: 'Thói quen về Mật khẩu',
    question: 'Bạn có sử dụng xác thực hai yếu tố (2FA) cho các tài khoản quan trọng (email, ngân hàng) không?',
    options: [
      { value: 3, label: 'Có, cho tất cả các tài khoản quan trọng' },
      { value: 2, label: 'Có, nhưng chỉ cho một vài tài khoản' },
      { value: 0, label: 'Không, tôi không sử dụng' },
    ],
    explanation: {
      title: 'Tại sao điều này quan trọng?',
      content: 'Xác thực hai yếu tố (2FA) thêm một lớp bảo mật mạnh mẽ bằng cách yêu cầu một mã xác minh thứ hai, thường từ điện thoại của bạn. Điều này giúp ngăn chặn truy cập trái phép ngay cả khi mật khẩu của bạn bị lộ.'
    }
  },
  {
    id: 2,
    category: 'Thói quen về Mật khẩu',
    question: 'Bạn có sử dụng cùng một mật khẩu cho nhiều tài khoản không?',
    options: [
      { value: 0, label: 'Có, tôi dùng chung mật khẩu cho hầu hết tài khoản' },
      { value: 1, label: 'Có, nhưng chỉ cho một số tài khoản ít quan trọng' },
      { value: 3, label: 'Không, mỗi tài khoản có mật khẩu riêng' },
    ],
    explanation: {
      title: 'Tại sao điều này quan trọng?',
      content: 'Sử dụng cùng mật khẩu cho nhiều tài khoản rất nguy hiểm. Nếu một tài khoản bị hack, kẻ tấn công có thể truy cập tất cả các tài khoản khác của bạn.'
    }
  },
  {
    id: 3,
    category: 'Nhận biết Lừa đảo',
    question: 'Khi nhận được email từ ngân hàng yêu cầu cập nhật thông tin, bạn thường làm gì?',
    options: [
      { value: 0, label: 'Click vào link trong email và làm theo hướng dẫn' },
      { value: 2, label: 'Kiểm tra địa chỉ email gửi trước khi quyết định' },
      { value: 3, label: 'Không click link, truy cập trực tiếp website ngân hàng hoặc gọi hotline' },
    ],
    explanation: {
      title: 'Tại sao điều này quan trọng?',
      content: 'Email phishing giả mạo ngân hàng rất phổ biến. Luôn truy cập trực tiếp website chính thức hoặc gọi hotline thay vì click link trong email để tránh bị lừa đảo.'
    }
  },
  {
    id: 4,
    category: 'Nhận biết Lừa đảo',
    question: 'Bạn có kiểm tra URL website trước khi nhập thông tin đăng nhập không?',
    options: [
      { value: 3, label: 'Luôn luôn kiểm tra kỹ URL và biểu tượng khóa HTTPS' },
      { value: 1, label: 'Thỉnh thoảng, khi cảm thấy nghi ngờ' },
      { value: 0, label: 'Không, tôi không để ý' },
    ],
    explanation: {
      title: 'Tại sao điều này quan trọng?',
      content: 'Website giả mạo thường có URL tương tự nhưng khác một chút so với website thật. Kiểm tra URL và HTTPS giúp bạn tránh nhập thông tin vào trang lừa đảo.'
    }
  },
  {
    id: 5,
    category: 'Bảo mật Thiết bị',
    question: 'Thiết bị của bạn (điện thoại, máy tính) có được cập nhật phần mềm thường xuyên không?',
    options: [
      { value: 3, label: 'Có, tôi luôn cập nhật ngay khi có bản mới' },
      { value: 1, label: 'Thỉnh thoảng, khi nhớ ra' },
      { value: 0, label: 'Không, tôi thường bỏ qua thông báo cập nhật' },
    ],
    explanation: {
      title: 'Tại sao điều này quan trọng?',
      content: 'Các bản cập nhật phần mềm thường chứa các bản vá bảo mật quan trọng. Không cập nhật khiến thiết bị của bạn dễ bị tấn công bởi các lỗ hổng đã biết.'
    }
  },
  {
    id: 6,
    category: 'Bảo mật Thiết bị',
    question: 'Bạn có sử dụng phần mềm diệt virus/bảo mật trên thiết bị không?',
    options: [
      { value: 3, label: 'Có, và luôn cập nhật định kỳ' },
      { value: 1, label: 'Có, nhưng không cập nhật thường xuyên' },
      { value: 0, label: 'Không sử dụng' },
    ],
    explanation: {
      title: 'Tại sao điều này quan trọng?',
      content: 'Phần mềm bảo mật giúp phát hiện và ngăn chặn malware, virus, và các mối đe dọa khác. Đây là lớp bảo vệ cơ bản cho mọi thiết bị.'
    }
  },
  {
    id: 7,
    category: 'Mạng xã hội & Quyền riêng tư',
    question: 'Bạn chia sẻ thông tin cá nhân (số điện thoại, địa chỉ, nơi làm việc) trên mạng xã hội như thế nào?',
    options: [
      { value: 0, label: 'Công khai cho tất cả mọi người' },
      { value: 2, label: 'Chỉ cho bạn bè' },
      { value: 3, label: 'Hạn chế tối đa hoặc không chia sẻ' },
    ],
    explanation: {
      title: 'Tại sao điều này quan trọng?',
      content: 'Thông tin cá nhân công khai có thể bị kẻ xấu sử dụng để lừa đảo, đánh cắp danh tính, hoặc tấn công có chủ đích vào bạn.'
    }
  },
  {
    id: 8,
    category: 'Mạng xã hội & Quyền riêng tư',
    question: 'Khi nhận được tin nhắn từ người lạ với link hoặc file đính kèm, bạn thường làm gì?',
    options: [
      { value: 0, label: 'Mở xem ngay vì tò mò' },
      { value: 1, label: 'Hỏi lại người gửi trước khi mở' },
      { value: 3, label: 'Không bao giờ mở link/file từ người lạ' },
    ],
    explanation: {
      title: 'Tại sao điều này quan trọng?',
      content: 'Link và file từ người lạ có thể chứa malware hoặc dẫn đến trang lừa đảo. Đây là một trong những cách phổ biến nhất để tấn công người dùng.'
    }
  },
]

export default function AssessmentPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const question = questions[currentQuestion]

  const handleNext = () => {
    if (selectedOption !== null) {
      setAnswers({ ...answers, [question.id]: selectedOption })
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(answers[questions[currentQuestion + 1]?.id] ?? null)
      } else {
        const totalScore = Object.values({ ...answers, [question.id]: selectedOption }).reduce((a, b) => a + b, 0)
        const maxScore = questions.length * 3
        const percentage = Math.round((totalScore / maxScore) * 100)
        router.push(`/assessment/result?score=${percentage}`)
      }
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(answers[questions[currentQuestion - 1]?.id] ?? null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
      <Header />

      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3 italic">
              Bài Đánh giá An ninh mạng Cá nhân
            </h1>
            <p className="text-gray-400">
              Kiểm tra và cải thiện mức độ an toàn của bạn trên không gian mạng chỉ trong vài phút.
            </p>
          </motion.div>

          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Tiến độ của bạn</span>
              <span className="text-gray-400">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 bg-[#111827] rounded-2xl p-8 border border-gray-800">
                <p className="text-blue-400 text-sm font-medium mb-3">
                  Phần {Math.ceil((currentQuestion + 1) / 2)}: {question.category}
                </p>
                <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedOption(option.value)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
                        selectedOption === option.value
                          ? 'bg-blue-600/20 border-blue-500 text-white'
                          : 'bg-[#1a2332] border-gray-700 text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedOption === option.value ? 'border-blue-500 bg-blue-500' : 'border-gray-600'
                      }`}>
                        {selectedOption === option.value && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800 h-fit">
                <div className="flex items-center gap-2 text-blue-400 mb-3">
                  <Info className="w-5 h-5" />
                  <span className="font-medium">{question.explanation.title}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{question.explanation.content}</p>
                <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/10 rounded-xl p-4 flex items-center justify-center">
                  <Shield className="w-16 h-16 text-blue-500/50" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentQuestion === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-white'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </button>

            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                selectedOption !== null
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Xem kết quả' : 'Tiếp theo'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
