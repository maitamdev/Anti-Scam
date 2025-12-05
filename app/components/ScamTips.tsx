'use client'

import { useState, useEffect } from 'react'
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

export default function ScamTips() {
  const [currentTip, setCurrentTip] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const nextTip = () => setCurrentTip((prev) => (prev + 1) % tips.length)
  const prevTip = () => setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length)

  return (
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
  )
}
