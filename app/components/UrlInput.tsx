'use client'

import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface UrlInputProps {
  onSubmit: (url: string) => void
  isLoading?: boolean
}

export default function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url.trim())
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Nhập URL cần kiểm tra (vd: example.com)"
          className="w-full px-6 py-4 pr-32 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full font-medium transition-colors flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Đang kiểm tra
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Kiểm tra
            </>
          )}
        </button>
      </div>
      <p className="text-gray-400 text-sm mt-3 text-center">
        Nhập đường link website bạn muốn kiểm tra độ an toàn
      </p>
    </motion.form>
  )
}
