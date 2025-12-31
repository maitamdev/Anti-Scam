'use client'

import { useState, useEffect } from 'react'
import { Lightbulb, ChevronLeft, ChevronRight, Home, ExternalLink, Newspaper } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const tips = [
  {
    title: 'Kiểm tra URL cẩn thận',
    content: 'Website giả thường có URL tương tự nhưng khác một chút: vietcombank-vn.com thay vì vietcombank.com.vn'
  },
  {
    title: 'Ngân hàng không bao giờ hỏi OTP',
    content: 'Không có ngân hàng hay tổ chức nào gọi điện/nhắn tin yêu cầu bạn cung cấp mã OTP.'
  },
  {
    title: '"Banking lỗi" = Lừa đảo',
    content: 'Nếu ai đó nhờ chuyển tiền với lý do "app banking đang lỗi", hãy gọi điện xác nhận trực tiếp.'
  },
  {
    title: 'Trúng thưởng bất ngờ = Lừa đảo',
    content: 'Bạn không thể trúng thưởng từ chương trình bạn chưa từng tham gia.'
  },
  {
    title: 'Việc nhẹ lương cao = Lừa đảo',
    content: 'Không có công việc nào trả 500k-2tr/ngày mà chỉ cần điện thoại và không cần kinh nghiệm.'
  },
  {
    title: 'Không nộp tiền để nhận việc',
    content: 'Công việc hợp pháp không bao giờ yêu cầu bạn đặt cọc hay nạp tiền trước.'
  },
  {
    title: 'Xác minh qua video call',
    content: 'Nếu người quen nhờ chuyển tiền, hãy yêu cầu video call để xác nhận danh tính.'
  },
  {
    title: 'Liên hệ hotline chính thức',
    content: 'Khi nghi ngờ, gọi hotline chính thức của ngân hàng (tra trên website, không dùng số trong tin nhắn).'
  },
]

// Bài viết từ nguồn uy tín
const trustedArticles = [
  {
    title: 'Cảnh báo lừa đảo qua mạng',
    source: 'Cổng TTĐT Bộ Công an',
    url: 'https://bocongan.gov.vn/tintuc/Pages/chong-lua-dao.aspx',
    icon: '🛡️'
  },
  {
    title: 'Nhận diện các chiêu trò lừa đảo',
    source: 'VnExpress',
    url: 'https://vnexpress.net/chu-de/lua-dao-3162',
    icon: '📰'
  },
  {
    title: 'Cảnh báo an toàn thông tin',
    source: 'Cục ATTT - Bộ TT&TT',
    url: 'https://khonggianmang.vn/canh-bao-an-toan-thong-tin',
    icon: '🔒'
  },
  {
    title: 'Phòng chống lừa đảo trực tuyến',
    source: 'Ngân hàng Nhà nước',
    url: 'https://www.sbv.gov.vn/webcenter/portal/vi/menu/trangchu/ttsk',
    icon: '🏦'
  },
]

export default function ScamTips() {
  const [currentTip, setCurrentTip] = useState(0)
  const [showArticles, setShowArticles] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const nextTip = () => setCurrentTip((prev) => (prev + 1) % tips.length)
  const prevTip = () => setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length)

  return (
    <div className="space-y-3">
      {/* Tips Section */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-4 h-4 text-blue-400" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-blue-400 font-medium">Mẹo #{currentTip + 1}</span>
              <div className="flex items-center gap-1">
                <button onClick={prevTip} className="p-1 hover:bg-white/10 rounded">
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </button>
                <button onClick={nextTip} className="p-1 hover:bg-white/10 rounded">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTip}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-medium text-sm mb-1">{tips[currentTip].title}</h4>
                <p className="text-gray-400 text-xs">{tips[currentTip].content}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Progress dots */}
        <div className="flex justify-center gap-1 mt-3">
          {tips.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentTip(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === currentTip ? 'bg-blue-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trusted Articles Toggle */}
      <button
        onClick={() => setShowArticles(!showArticles)}
        className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 rounded-lg transition-colors text-sm"
      >
        <Newspaper className="w-4 h-4 text-cyan-400" />
        <span className="text-gray-300">
          {showArticles ? 'Ẩn bài viết' : 'Xem bài viết từ nguồn uy tín'}
        </span>
      </button>

      {/* Trusted Articles */}
      <AnimatePresence>
        {showArticles && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-4">
              <h4 className="text-sm font-medium text-emerald-400 mb-3 flex items-center gap-2">
                <span>📚</span> Nguồn thông tin uy tín
              </h4>
              <div className="space-y-2">
                {trustedArticles.map((article, i) => (
                  <a
                    key={i}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-lg">{article.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-200 group-hover:text-white truncate">
                        {article.title}
                      </p>
                      <p className="text-xs text-gray-500">{article.source}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-emerald-400 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 rounded-xl transition-all text-sm font-medium"
      >
        <Home className="w-4 h-4 text-cyan-400" />
        <span className="text-cyan-300">Quay lại trang chủ</span>
      </Link>
    </div>
  )
}
