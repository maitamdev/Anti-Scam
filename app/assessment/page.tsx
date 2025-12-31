'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ArrowLeft, ArrowRight, Info, Sparkles, CheckCircle, Lock, Eye, Users, Brain } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GlowingCard from '../components/GlowingCard'
import ProgressBar from '../components/ProgressBar'

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

  const categoryIcons: Record<string, React.ReactNode> = {
    'Thói quen về Mật khẩu': <Lock className="w-5 h-5 text-purple-400" />,
    'Nhận biết Lừa đảo': <Eye className="w-5 h-5 text-red-400" />,
    'Bảo mật Thiết bị': <Shield className="w-5 h-5 text-blue-400" />,
    'Mạng xã hội & Quyền riêng tư': <Users className="w-5 h-5 text-green-400" />,
  }

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />

      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Premium Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full mb-4"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Đánh giá miễn phí</span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-white">Bài Đánh giá </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">An ninh mạng</span>
            </h1>
            <p className="text-gray-400">
              Kiểm tra và cải thiện mức độ an toàn của bạn trên không gian mạng chỉ trong vài phút.
            </p>
          </motion.div>

          {/* Progress Bar Premium */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-400" />
                Câu hỏi {currentQuestion + 1}/{questions.length}
              </span>
              <span className="text-blue-400 font-medium">{Math.round(progress)}%</span>
            </div>
            <ProgressBar progress={progress} variant="gradient" color="blue" showLabel={false} />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              {/* Question Card */}
              <div className="lg:col-span-2">
                <GlowingCard glowColor="rgba(59, 130, 246, 0.3)">
                  <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-4">
                      {categoryIcons[question.category] || <Shield className="w-5 h-5 text-blue-400" />}
                      <p className="text-blue-400 text-sm font-medium">
                        {question.category}
                      </p>
                    </div>
                    <h2 className="text-xl font-semibold mb-6 text-white">{question.question}</h2>

                    <div className="space-y-3">
                      {question.options.map((option, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setSelectedOption(option.value)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
                            selectedOption === option.value
                              ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                              : 'bg-white/5 border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-white/10'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            selectedOption === option.value 
                              ? 'border-blue-500 bg-blue-500' 
                              : 'border-gray-600'
                          }`}>
                            {selectedOption === option.value && (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2.5 h-2.5 rounded-full bg-white" 
                              />
                            )}
                          </div>
                          <span>{option.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </GlowingCard>
              </div>

              {/* Explanation Card */}
              <GlowingCard glowColor="rgba(168, 85, 247, 0.3)">
                <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-purple-500/20 h-full">
                  <div className="flex items-center gap-2 text-purple-400 mb-3">
                    <Info className="w-5 h-5" />
                    <span className="font-medium">{question.explanation.title}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{question.explanation.content}</p>
                  <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/10 rounded-xl p-4 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Shield className="w-16 h-16 text-purple-500/50" />
                    </motion.div>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-between items-center mt-8"
          >
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentQuestion === 0 
                  ? 'text-gray-600 cursor-not-allowed' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </button>

            <motion.button
              onClick={handleNext}
              disabled={selectedOption === null}
              whileHover={selectedOption !== null ? { scale: 1.02 } : {}}
              whileTap={selectedOption !== null ? { scale: 0.98 } : {}}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                selectedOption !== null
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentQuestion === questions.length - 1 ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Xem kết quả
                </>
              ) : (
                <>
                  Tiếp theo
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Question Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-2 mt-8"
          >
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentQuestion
                    ? 'w-6 bg-gradient-to-r from-blue-500 to-purple-500'
                    : index < currentQuestion
                    ? 'bg-green-500'
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
