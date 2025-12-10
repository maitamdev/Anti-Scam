'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, History, Trash2, Shield, ShieldAlert, ShieldX,
  Globe, Lock, Unlock, Server, CheckCircle, XCircle, AlertTriangle,
  Brain, Eye, ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RiskBadge from '../components/RiskBadge'
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
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Link href="/" className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    <History className="w-6 h-6 text-blue-500" />
                    Lịch sử kiểm tra
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {history.length} kết quả được lưu trên thiết bị này
                  </p>
                </div>
              </div>
              
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa tất cả
                </button>
              )}
            </div>

            {selectedResult && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden"
              >
                {/* Header */}
                <div className={`p-6 ${
                  selectedResult.label === 'SAFE' ? 'bg-green-500/10' :
                  selectedResult.label === 'CAUTION' ? 'bg-yellow-500/10' : 'bg-red-500/10'
                }`}>
                  <div className="flex items-center gap-4">
                    {selectedResult.label === 'SAFE' ? (
                      <Shield className="w-12 h-12 text-green-400" />
                    ) : selectedResult.label === 'CAUTION' ? (
                      <ShieldAlert className="w-12 h-12 text-yellow-400" />
                    ) : (
                      <ShieldX className="w-12 h-12 text-red-400" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
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
                        className="text-blue-400 hover:underline flex items-center gap-1 text-sm"
                      >
                        {selectedResult.url}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <button
                      onClick={() => setSelectedResult(null)}
                      className="p-2 hover:bg-gray-700 rounded-lg"
                    >
                      <XCircle className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="p-4 grid grid-cols-4 gap-3 border-b border-gray-700">
                  <div className="text-center p-3 bg-gray-900 rounded-lg">
                    <p className={`text-2xl font-bold ${
                      selectedResult.score <= 30 ? 'text-green-400' :
                      selectedResult.score <= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>{selectedResult.score}</p>
                    <p className="text-xs text-gray-500">Điểm rủi ro</p>
                  </div>
                  <div className="text-center p-3 bg-gray-900 rounded-lg">
                    <p className="text-2xl font-bold text-blue-400">{Math.round(selectedResult.aiConfidence * 100)}%</p>
                    <p className="text-xs text-gray-500">Độ tin cậy AI</p>
                  </div>
                  <div className="text-center p-3 bg-gray-900 rounded-lg">
                    <p className="text-2xl font-bold text-purple-400">{selectedResult.heuristicScore ?? '-'}</p>
                    <p className="text-xs text-gray-500">Heuristic</p>
                  </div>
                  <div className="text-center p-3 bg-gray-900 rounded-lg">
                    <p className="text-2xl font-bold text-cyan-400">{selectedResult.aiScore ?? '-'}</p>
                    <p className="text-xs text-gray-500">AI Score</p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-4">
                  {/* Website Info */}
                  {selectedResult.websiteInfo && (
                    <div className="bg-gray-900 rounded-lg p-4">
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
                    <div className="bg-gray-900 rounded-lg p-4">
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
                    <div className="bg-gray-900 rounded-lg p-4">
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
                    <div className="bg-gray-900 rounded-lg p-4">
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
              </motion.div>
            )}

            {history.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <History className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Chưa có lịch sử kiểm tra</p>
                <Link
                  href="/"
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Kiểm tra ngay
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {history.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-gray-800 rounded-xl p-4 border cursor-pointer transition-colors ${
                      selectedResult === item 
                        ? 'border-blue-500' 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedResult(item)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium truncate">{item.domain}</p>
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
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
