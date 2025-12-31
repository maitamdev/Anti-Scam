'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, History, Trash2, Shield, ShieldAlert, ShieldX,
  Globe, Lock, Unlock, Server, CheckCircle, XCircle, AlertTriangle,
  Brain, Eye, ChevronDown, ChevronUp, ExternalLink, Sparkles, Search, Home
} from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RiskBadge from '../components/RiskBadge'
import GlowingCard from '../components/GlowingCard'
import SecurityScore from '../components/SecurityScore'
import { safeStorage } from '../lib/safeStorage'

interface WebsiteInfo {
  title?: string
  description?: string
  category?: string
  industry?: string
  subCategory?: string
  technologies?: string[]
  framework?: string | null
  cms?: string | null
  hasSSL?: boolean
  hasLoginForm?: boolean
  hasPaymentForm?: boolean
  hasContactInfo?: boolean
  hasSocialLinks?: boolean
  hasPrivacyPolicy?: boolean
  riskFactors?: string[]
  trustFactors?: string[]
  mobileOptimized?: boolean
}

interface VirusTotalResult {
  detected: boolean
  stats: {
    malicious: number
    suspicious: number
    harmless: number
    undetected: number
    total: number
  }
}

interface HistoryItem {
  url: string
  domain: string
  score: number
  label: 'SAFE' | 'CAUTION' | 'DANGEROUS'
  reasons: string[]
  aiConfidence: number
  timestamp: string
  heuristicScore?: number
  aiScore?: number
  websiteInfo?: WebsiteInfo | null
  categoryGuess?: { category: string; confidence: number } | string
  externalSources?: string[]
  virusTotal?: VirusTotalResult | null
}

export default function ResultPage() {
  const searchParams = useSearchParams()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [selectedResult, setSelectedResult] = useState<HistoryItem | null>(null)

  useEffect(() => {
    // Load history from safeStorage
    const saved = safeStorage.getItem('scanHistory')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setHistory(parsed)
        
        // Check if there's a URL param to show specific result
        const urlParam = searchParams.get('url')
        if (urlParam) {
          const found = parsed.find((item: HistoryItem) => item.url === urlParam)
          if (found) setSelectedResult(found)
        }
      } catch (error) {
        console.warn('[Result] Failed to parse history:', error)
      }
    }
  }, [searchParams])

  const clearHistory = () => {
    safeStorage.removeItem('scanHistory')
    setHistory([])
    setSelectedResult(null)
  }

  const removeItem = (index: number) => {
    const newHistory = history.filter((_, i) => i !== index)
    safeStorage.setItem('scanHistory', JSON.stringify(newHistory))
    setHistory(newHistory)
    if (selectedResult === history[index]) {
      setSelectedResult(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Premium Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
            >
              <div className="flex items-center gap-4">
                <Link href="/" className="p-2 hover:bg-white/5 rounded-lg transition-colors border border-white/10">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg"
                    >
                      <History className="w-5 h-5 text-blue-400" />
                    </motion.div>
                    <h1 className="text-2xl font-bold text-white">
                      Lịch sử kiểm tra
                    </h1>
                  </div>
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    {history.length} kết quả được lưu trên thiết bị này
                  </p>
                </div>
              </div>
              
              {history.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={clearHistory}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg flex items-center gap-2 transition-colors border border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa tất cả
                </motion.button>
              )}
            </motion.div>

            {selectedResult && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <GlowingCard glowColor={
                  selectedResult.label === 'SAFE' ? 'rgba(34, 197, 94, 0.3)' :
                  selectedResult.label === 'CAUTION' ? 'rgba(234, 179, 8, 0.3)' : 'rgba(239, 68, 68, 0.3)'
                }>
                  <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
                    {/* Header with SecurityScore */}
                    <div className={`p-6 ${
                      selectedResult.label === 'SAFE' ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10' :
                      selectedResult.label === 'CAUTION' ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10' : 'bg-gradient-to-r from-red-500/10 to-rose-500/10'
                    }`}>
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Security Score */}
                        <SecurityScore score={selectedResult.score} size="md" language="vi" />
                        
                        <div className="flex-1 text-center md:text-left">
                          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                            {selectedResult.label === 'SAFE' ? (
                              <Shield className="w-8 h-8 text-green-400" />
                            ) : selectedResult.label === 'CAUTION' ? (
                              <ShieldAlert className="w-8 h-8 text-yellow-400" />
                            ) : (
                              <ShieldX className="w-8 h-8 text-red-400" />
                            )}
                            <h3 className={`text-xl font-bold ${
                              selectedResult.label === 'SAFE' ? 'text-green-400' :
                              selectedResult.label === 'CAUTION' ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {selectedResult.label === 'SAFE' ? 'Website An Toàn' :
                               selectedResult.label === 'CAUTION' ? 'Cần Thận Trọng' : 'Nguy Hiểm!'}
                            </h3>
                            <RiskBadge label={selectedResult.label} size="sm" />
                          </div>
                          <a 
                            href={selectedResult.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline flex items-center justify-center md:justify-start gap-1 text-sm"
                          >
                            {selectedResult.url}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <button
                          onClick={() => setSelectedResult(null)}
                          className="p-2 hover:bg-gray-700 rounded-lg absolute top-4 right-4 md:relative md:top-0 md:right-0"
                        >
                          <XCircle className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="p-4 grid grid-cols-4 gap-3 border-b border-gray-700">
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <p className={`text-2xl font-bold ${
                          selectedResult.score <= 30 ? 'text-green-400' :
                          selectedResult.score <= 60 ? 'text-yellow-400' : 'text-red-400'
                        }`}>{selectedResult.score}</p>
                        <p className="text-xs text-gray-500">Điểm rủi ro</p>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <p className="text-2xl font-bold text-blue-400">{Math.round(selectedResult.aiConfidence * 100)}%</p>
                        <p className="text-xs text-gray-500">Độ tin cậy AI</p>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <p className="text-2xl font-bold text-purple-400">{selectedResult.heuristicScore ?? '-'}</p>
                        <p className="text-xs text-gray-500">Heuristic</p>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <p className="text-2xl font-bold text-cyan-400">{selectedResult.aiScore ?? '-'}</p>
                        <p className="text-xs text-gray-500">AI Score</p>
                      </div>
                    </div>

                {/* Details */}
                <div className="p-4 space-y-4">
                  {/* Website Info */}
                  {selectedResult.websiteInfo && (
                    <div className=" rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-400" />
                        Thông tin Website
                      </h4>
                      {selectedResult.websiteInfo.title && (
                        <p className="text-white mb-1">{selectedResult.websiteInfo.title}</p>
                      )}
                      {selectedResult.websiteInfo.description && (
                        <p className="text-gray-400 text-sm mb-3">{selectedResult.websiteInfo.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {selectedResult.websiteInfo.category && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                            {selectedResult.websiteInfo.category}
                          </span>
                        )}
                        {selectedResult.websiteInfo.subCategory && (
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                            {selectedResult.websiteInfo.subCategory}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Security Checks */}
                  {selectedResult.websiteInfo && (
                    <div className=" rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-green-400" />
                        Kiểm tra bảo mật
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          {selectedResult.websiteInfo.hasSSL ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                          <span className="text-gray-300">SSL/HTTPS</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedResult.websiteInfo.hasPrivacyPolicy ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-yellow-400" />
                          )}
                          <span className="text-gray-300">Chính sách bảo mật</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedResult.websiteInfo.hasContactInfo ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-yellow-400" />
                          )}
                          <span className="text-gray-300">Thông tin liên hệ</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedResult.websiteInfo.hasLoginForm ? (
                            <AlertTriangle className="w-4 h-4 text-yellow-400" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="text-gray-300">Form đăng nhập</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedResult.websiteInfo.hasPaymentForm ? (
                            <AlertTriangle className="w-4 h-4 text-orange-400" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="text-gray-300">Form thanh toán</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedResult.websiteInfo.hasSocialLinks ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="text-gray-300">Liên kết MXH</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Risk & Trust Factors */}
                  <div className="grid grid-cols-2 gap-3">
                    {selectedResult.websiteInfo?.riskFactors && selectedResult.websiteInfo.riskFactors.length > 0 && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <h4 className="font-medium mb-2 text-red-400 text-sm flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          Yếu tố rủi ro
                        </h4>
                        <ul className="space-y-1">
                          {selectedResult.websiteInfo.riskFactors.map((f, i) => (
                            <li key={i} className="text-red-300 text-xs">• {f}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedResult.websiteInfo?.trustFactors && selectedResult.websiteInfo.trustFactors.length > 0 && (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <h4 className="font-medium mb-2 text-green-400 text-sm flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Yếu tố tin cậy
                        </h4>
                        <ul className="space-y-1">
                          {selectedResult.websiteInfo.trustFactors.map((f, i) => (
                            <li key={i} className="text-green-300 text-xs">• {f}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Reasons */}
                  {selectedResult.reasons.length > 0 && (
                    <div className=" rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Eye className="w-4 h-4 text-purple-400" />
                        Phân tích chi tiết ({selectedResult.reasons.length})
                      </h4>
                      <ul className="space-y-2">
                        {selectedResult.reasons.map((reason, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className={
                              selectedResult.label === 'SAFE' ? 'text-green-400' :
                              selectedResult.label === 'CAUTION' ? 'text-yellow-400' : 'text-red-400'
                            }>•</span>
                            <span className="text-gray-300">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {selectedResult.websiteInfo?.technologies && selectedResult.websiteInfo.technologies.length > 0 && (
                    <div className=" rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Server className="w-4 h-4 text-cyan-400" />
                        Công nghệ
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedResult.websiteInfo.technologies.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">{tech}</span>
                        ))}
                        {selectedResult.websiteInfo.framework && (
                          <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">{selectedResult.websiteInfo.framework}</span>
                        )}
                        {selectedResult.websiteInfo.cms && (
                          <span className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300">{selectedResult.websiteInfo.cms}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* External Sources */}
                  {selectedResult.externalSources && selectedResult.externalSources.length > 0 && (
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-orange-400 text-sm">⚠️ Cảnh báo từ nguồn bên ngoài</h4>
                      <ul className="space-y-1">
                        {selectedResult.externalSources.map((source, i) => (
                          <li key={i} className="text-orange-300 text-xs">• {source}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                  </div>
                </GlowingCard>
              </motion.div>
            )}

            {history.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <GlowingCard glowColor="rgba(107, 114, 128, 0.2)">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-12 border border-gray-700">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <History className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-gray-400 text-lg mb-2">Chưa có lịch sử kiểm tra</p>
                    <p className="text-gray-500 text-sm mb-6">Bắt đầu kiểm tra URL để xem kết quả ở đây</p>
                    <Link
                      href="/scan"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl transition-all shadow-lg shadow-blue-500/25"
                    >
                      <Search className="w-5 h-5" />
                      Kiểm tra ngay
                    </Link>
                  </div>
                </GlowingCard>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {history.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GlowingCard glowColor={
                      item.label === 'SAFE' ? 'rgba(34, 197, 94, 0.2)' :
                      item.label === 'CAUTION' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)'
                    }>
                      <div 
                        className={`bg-gray-800/50 rounded-xl p-4 border cursor-pointer transition-all ${
                          selectedResult === item 
                            ? 'border-blue-500 shadow-lg shadow-blue-500/10' 
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                        onClick={() => setSelectedResult(item)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium truncate text-white">{item.domain}</p>
                              {item.websiteInfo?.hasSSL ? (
                                <Lock className="w-3 h-3 text-green-400" />
                              ) : (
                                <Unlock className="w-3 h-3 text-red-400" />
                              )}
                            </div>
                            <p className="text-sm text-gray-400 truncate">{item.url}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <p className="text-xs text-gray-500">
                                {new Date(item.timestamp).toLocaleString('vi-VN')}
                              </p>
                              {item.websiteInfo?.category && (
                                <span className="text-xs px-2 py-0.5 bg-gray-700 rounded text-gray-400">
                                  {item.websiteInfo.category}
                                </span>
                              )}
                              {item.reasons.length > 0 && (
                                <span className="text-xs text-gray-500">
                                  {item.reasons.length} dấu hiệu
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 ml-4">
                            <div className="text-right">
                              <p className={`font-bold ${
                                item.score <= 30 ? 'text-green-400' :
                                item.score <= 60 ? 'text-yellow-400' : 'text-red-400'
                              }`}>
                                {item.score}/100
                              </p>
                              <p className="text-xs text-gray-500">
                                AI: {Math.round(item.aiConfidence * 100)}%
                              </p>
                            </div>
                            <RiskBadge label={item.label} size="sm" />
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                removeItem(index)
                              }}
                              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </GlowingCard>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Back to Home CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
              >
                <Home className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-300">Về trang chủ</span>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
