'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, Hash, CheckCircle, XCircle, Loader2, Copy, 
  FileCheck, Clock, Link2, ArrowLeft, Sparkles
} from 'lucide-react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useTranslation } from '../../lib/i18n/LanguageContext'

export default function BlockchainVerifyPage() {
  const { language } = useTranslation()
  const [hash, setHash] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    verified: boolean
    timestamp?: number
    message: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const handleVerify = async () => {
    if (!hash.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const res = await fetch(`/api/blockchain/verify-report?hash=${encodeURIComponent(hash)}`)
      const data = await res.json()
      
      if (data.success) {
        setResult({
          verified: data.verified,
          timestamp: data.timestamp,
          message: data.message || (data.verified 
            ? (language === 'vi' ? 'Báo cáo đã được xác minh trên blockchain' : 'Report verified on blockchain')
            : (language === 'vi' ? 'Không tìm thấy báo cáo với hash này' : 'No report found with this hash'))
        })
      }
    } catch (error) {
      setResult({
        verified: false,
        message: language === 'vi' ? 'Lỗi kết nối' : 'Connection error'
      })
    } finally {
      setLoading(false)
    }
  }

  const copyHash = () => {
    navigator.clipboard.writeText(hash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link href="/tools" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {language === 'vi' ? 'Quay lại công cụ' : 'Back to Tools'}
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Blockchain Verification</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">{language === 'vi' ? 'Xác minh ' : 'Verify '}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                {language === 'vi' ? 'Báo cáo' : 'Report'}
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {language === 'vi' 
                ? 'Kiểm tra tính xác thực của báo cáo lừa đảo bằng blockchain hash'
                : 'Verify the authenticity of scam reports using blockchain hash'}
            </p>
          </motion.div>

          {/* Verify Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 mb-8"
          >
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                {language === 'vi' ? 'Hash báo cáo' : 'Report Hash'}
              </label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={hash}
                  onChange={(e) => setHash(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                  placeholder="0x..."
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 font-mono text-sm"
                />
                {hash && (
                  <button
                    onClick={copyHash}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || !hash.trim()}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white font-semibold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {language === 'vi' ? 'Đang xác minh...' : 'Verifying...'}
                </>
              ) : (
                <>
                  <FileCheck className="w-5 h-5" />
                  {language === 'vi' ? 'Xác minh báo cáo' : 'Verify Report'}
                </>
              )}
            </button>
          </motion.div>

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl p-6 border ${
                result.verified 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-red-500/10 border-red-500/30'
              }`}
            >
              <div className="flex items-center gap-4">
                {result.verified ? (
                  <CheckCircle className="w-12 h-12 text-green-400" />
                ) : (
                  <XCircle className="w-12 h-12 text-red-400" />
                )}
                <div>
                  <h3 className={`text-xl font-bold ${result.verified ? 'text-green-400' : 'text-red-400'}`}>
                    {result.verified 
                      ? (language === 'vi' ? 'Đã xác minh ✓' : 'Verified ✓')
                      : (language === 'vi' ? 'Không xác minh' : 'Not Verified')}
                  </h3>
                  <p className="text-gray-400">{result.message}</p>
                  {result.timestamp && (
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(result.timestamp).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid md:grid-cols-2 gap-4"
          >
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <Sparkles className="w-8 h-8 text-green-400 mb-3" />
              <h4 className="font-semibold text-white mb-2">
                {language === 'vi' ? 'Tại sao dùng Blockchain?' : 'Why Blockchain?'}
              </h4>
              <p className="text-sm text-gray-400">
                {language === 'vi' 
                  ? 'Blockchain đảm bảo báo cáo không thể bị sửa đổi sau khi ghi nhận, tạo bằng chứng minh bạch và đáng tin cậy.'
                  : 'Blockchain ensures reports cannot be modified after recording, creating transparent and trustworthy evidence.'}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <Hash className="w-8 h-8 text-emerald-400 mb-3" />
              <h4 className="font-semibold text-white mb-2">
                {language === 'vi' ? 'Hash là gì?' : 'What is Hash?'}
              </h4>
              <p className="text-sm text-gray-400">
                {language === 'vi'
                  ? 'Hash là mã định danh duy nhất được tạo từ nội dung báo cáo. Bất kỳ thay đổi nào cũng sẽ tạo ra hash khác.'
                  : 'Hash is a unique identifier generated from report content. Any change will produce a different hash.'}
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
