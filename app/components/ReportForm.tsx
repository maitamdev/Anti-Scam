'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle } from 'lucide-react'

export default function ReportForm() {
  const [url, setUrl] = useState('')
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [scanUrl, setScanUrl] = useState('')

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

      const data = await res.json()
      setSubmitted(true)
      setScanUrl(data.data?.scanUrl || '')
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
        <p className="text-gray-400 mb-2">
          Báo cáo của bạn đã được gửi thành công và công khai trên URLScan.io 🌍
        </p>
        {scanUrl && (
          <a
            href={scanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-400 hover:text-blue-300 text-sm mb-6 underline"
          >
            Xem kết quả scan tại URLScan.io →
          </a>
        )}
        {!scanUrl && (
          <p className="text-gray-500 text-sm mb-6">
            Báo cáo đã được lưu và sẽ giúp bảo vệ cộng đồng.
          </p>
        )}
        <button
          onClick={() => {
            setSubmitted(false)
            setScanUrl('')
          }}
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
          className="w-full px-4 py-3 bg-blue-500/10 border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 placeholder:text-gray-500"
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
          className="w-full px-4 py-3 bg-blue-500/10 border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
          required
        >
          <option value="" className="bg-[#0a0f1a]">Chọn loại</option>
          <option value="phishing" className="bg-[#0a0f1a]">Giả mạo đăng nhập (Phishing)</option>
          <option value="scam" className="bg-[#0a0f1a]">Lừa đảo tài chính</option>
          <option value="fake_shop" className="bg-[#0a0f1a]">Cửa hàng giả mạo</option>
          <option value="malware" className="bg-[#0a0f1a]">Phát tán mã độc</option>
          <option value="fake_prize" className="bg-[#0a0f1a]">Trúng thưởng giả</option>
          <option value="investment" className="bg-[#0a0f1a]">Đầu tư lừa đảo</option>
          <option value="other" className="bg-[#0a0f1a]">Khác</option>
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
          className="w-full px-4 py-3 bg-blue-500/10 border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 resize-none placeholder:text-gray-500"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !url.trim() || !reason}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
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
