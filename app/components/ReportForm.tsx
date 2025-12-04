'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle, Upload } from 'lucide-react'

export default function ReportForm() {
  const [url, setUrl] = useState('')
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim() || !reason) return

    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, reason, description }),
      })

      if (!res.ok) throw new Error('Gửi báo cáo thất bại')

      setSubmitted(true)
      setUrl('')
      setReason('')
      setDescription('')
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Cảm ơn bạn đã báo cáo!</h3>
        <p className="text-gray-400 mb-6">
          Báo cáo của bạn sẽ được xem xét và giúp bảo vệ cộng đồng.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Gửi báo cáo khác
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium mb-2">
          URL đáng ngờ <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Loại lừa đảo <span className="text-red-400">*</span>
        </label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
          required
        >
          <option value="">Chọn loại</option>
          <option value="phishing">Giả mạo đăng nhập (Phishing)</option>
          <option value="scam">Lừa đảo tài chính</option>
          <option value="fake_shop">Cửa hàng giả mạo</option>
          <option value="malware">Phát tán mã độc</option>
          <option value="fake_prize">Trúng thưởng giả</option>
          <option value="investment">Đầu tư lừa đảo</option>
          <option value="other">Khác</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Mô tả chi tiết
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả cách thức lừa đảo, nội dung đáng ngờ..."
          rows={4}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !url.trim() || !reason}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Đang gửi...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Gửi báo cáo
          </>
        )}
      </button>
    </motion.form>
  )
}
