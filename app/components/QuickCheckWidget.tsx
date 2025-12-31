'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Link2, Phone, Mail, CreditCard, ArrowRight, Loader2, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  language: string
}

type CheckMode = 'url' | 'phone' | 'email' | 'bank'

export default function QuickCheckWidget({ language }: Props) {
  const router = useRouter()
  const [mode, setMode] = useState<CheckMode>('url')
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ status: 'safe' | 'warning' | 'danger'; message: string } | null>(null)

  const modes = [
    { id: 'url' as CheckMode, icon: Link2, labelVi: 'URL', labelEn: 'URL' },
    { id: 'phone' as CheckMode, icon: Phone, labelVi: 'SĐT', labelEn: 'Phone' },
    { id: 'email' as CheckMode, icon: Mail, labelVi: 'Email', labelEn: 'Email' },
    { id: 'bank' as CheckMode, icon: CreditCard, labelVi: 'STK', labelEn: 'Bank' },
  ]

  const getPlaceholder = () => {
    switch (mode) {
      case 'url': return language === 'vi' ? 'Nhập URL cần kiểm tra...' : 'Enter URL to check...'
      case 'phone': return language === 'vi' ? 'Nhập số điện thoại...' : 'Enter phone number...'
      case 'email': return language === 'vi' ? 'Nhập địa chỉ email...' : 'Enter email address...'
      case 'bank': return language === 'vi' ? 'Nhập số tài khoản...' : 'Enter bank account...'
    }
  }

  const handleQuickCheck = async () => {
    if (!input.trim()) return
    
    setIsLoading(true)
    setResult(null)

    // Simulate quick check - in real app, call API
    await new Promise(resolve => setTimeout(resolve, 1500))

    // For demo, redirect to full scan page
    if (mode === 'url') {
      router.push(`/scan?url=${encodeURIComponent(input)}`)
    } else {
      router.push(`/scan?tab=check&type=${mode}&value=${encodeURIComponent(input)}`)
    }
    
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleQuickCheck()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-blue-900/30 to-cyan-900/20 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Search className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">
            {language === 'vi' ? 'Kiểm tra Nhanh' : 'Quick Check'}
          </h3>
          <p className="text-xs text-gray-500">
            {language === 'vi' ? 'Kiểm tra URL, SĐT, Email, STK ngay' : 'Check URL, Phone, Email, Bank instantly'}
          </p>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-1 p-1 bg-white/5 rounded-lg mb-4">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); setInput(''); setResult(null); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-all ${
              mode === m.id 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <m.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'vi' ? m.labelVi : m.labelEn}</span>
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="relative mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 pr-12"
        />
        <button
          onClick={handleQuickCheck}
          disabled={!input.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-white animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4 text-white" />
          )}
        </button>
      </div>

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-3 rounded-lg flex items-center gap-2 ${
            result.status === 'safe' ? 'bg-green-500/20 text-green-400' :
            result.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}
        >
          {result.status === 'safe' ? <CheckCircle className="w-4 h-4" /> :
           result.status === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
           <XCircle className="w-4 h-4" />}
          <span className="text-sm">{result.message}</span>
        </motion.div>
      )}

      {/* Quick tips */}
      <div className="mt-4 text-xs text-gray-500">
        <p>💡 {language === 'vi' 
          ? 'Mẹo: Dán link đáng ngờ từ tin nhắn, email để kiểm tra ngay'
          : 'Tip: Paste suspicious links from messages, emails to check instantly'}</p>
      </div>
    </motion.div>
  )
}
