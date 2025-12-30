'use client'

import { motion } from 'framer-motion'
import { 
  ExternalLink, AlertCircle, CheckCircle, XCircle, Copy, Check,
  Shield, ShieldAlert, ShieldX, Globe, Lock, Unlock, Server,
  AlertTriangle, Info, Brain, Activity, Clock, TrendingUp,
  FileWarning, Link2, Fingerprint, Eye, Database
} from 'lucide-react'
import RiskBadge from './RiskBadge'
import { useState } from 'react'

interface WebsiteInfo {
  title: string
  description: string
  category: string
  industry: string
  subCategory: string
  technologies: string[]
  framework: string | null
  cms: string | null
  hasSSL: boolean
  hasLoginForm: boolean
  hasPaymentForm: boolean
  hasContactInfo: boolean
  hasSocialLinks: boolean
  hasPrivacyPolicy: boolean
  riskFactors: string[]
  trustFactors: string[]
  mobileOptimized: boolean
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

interface ScanResult {
  url: string
  domain: string
  score: number
  label: 'SAFE' | 'CAUTION' | 'DANGEROUS'
  reasons: string[]
  aiConfidence: number
  heuristicScore?: number
  aiScore?: number
  websiteInfo?: WebsiteInfo | null
  categoryGuess?: { category: string; confidence: number } | string
  externalSources?: string[]
  virusTotal?: VirusTotalResult | null
}

interface ResultCardProps {
  result: ScanResult
}

export default function ResultCard({ result }: ResultCardProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'website' | 'details' | 'recommendations'>('overview')

  const getScoreColor = (score: number) => {
    if (score <= 30) return 'text-green-400'
    if (score <= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBgColor = (score: number) => {
    if (score <= 30) return 'from-green-500/20 to-green-600/10'
    if (score <= 60) return 'from-yellow-500/20 to-yellow-600/10'
    return 'from-red-500/20 to-red-600/10'
  }

  const getProgressColor = (score: number) => {
    if (score <= 30) return 'bg-green-500'
    if (score <= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getShieldIcon = () => {
    if (result.label === 'SAFE') return <Shield className="w-16 h-16 text-green-400" />
    if (result.label === 'CAUTION') return <ShieldAlert className="w-16 h-16 text-yellow-400" />
    return <ShieldX className="w-16 h-16 text-red-400" />
  }

  const getStatusMessage = () => {
    if (result.label === 'SAFE') return 'Website này có vẻ an toàn'
    if (result.label === 'CAUTION') return 'Cần thận trọng khi truy cập'
    return 'Website này có dấu hiệu nguy hiểm!'
  }

  const getStatusDescription = () => {
    if (result.label === 'SAFE') 
      return 'Không phát hiện dấu hiệu lừa đảo hoặc phishing. Tuy nhiên, luôn cẩn thận khi nhập thông tin cá nhân.'
    if (result.label === 'CAUTION') 
      return 'Phát hiện một số dấu hiệu đáng ngờ. Hãy kiểm tra kỹ trước khi nhập bất kỳ thông tin nào.'
    return 'Website này có nhiều dấu hiệu của lừa đảo/phishing. KHÔNG nên truy cập hoặc nhập thông tin.'
  }

  const isHttps = result.url.startsWith('https://')
  
  const getDomainAge = () => {
    // Simulated - in real app would check WHOIS
    const suspicious = result.score > 50
    return suspicious ? 'Mới đăng ký (< 30 ngày)' : 'Đã hoạt động lâu'
  }

  const getRecommendations = () => {
    const recs = []
    if (result.label === 'DANGEROUS') {
      recs.push({ icon: XCircle, text: 'KHÔNG truy cập website này', type: 'danger' })
      recs.push({ icon: XCircle, text: 'KHÔNG nhập mật khẩu hoặc OTP', type: 'danger' })
      recs.push({ icon: XCircle, text: 'KHÔNG cung cấp thông tin cá nhân', type: 'danger' })
      recs.push({ icon: AlertTriangle, text: 'Báo cáo website này cho cơ quan chức năng', type: 'warning' })
    } else if (result.label === 'CAUTION') {
      recs.push({ icon: AlertTriangle, text: 'Kiểm tra kỹ URL trước khi đăng nhập', type: 'warning' })
      recs.push({ icon: AlertTriangle, text: 'Không nhập OTP nếu không chắc chắn', type: 'warning' })
      recs.push({ icon: Info, text: 'So sánh với website chính thức', type: 'info' })
      recs.push({ icon: Info, text: 'Liên hệ hotline chính thức nếu nghi ngờ', type: 'info' })
    } else {
      recs.push({ icon: CheckCircle, text: 'Website có vẻ an toàn để truy cập', type: 'success' })
      recs.push({ icon: Info, text: 'Vẫn nên kiểm tra URL cẩn thận', type: 'info' })
      recs.push({ icon: Info, text: 'Không chia sẻ OTP qua tin nhắn/email', type: 'info' })
    }
    return recs
  }

  const copyToClipboard = () => {
    const text = `🔍 Kết quả kiểm tra ANTI-SCAM
━━━━━━━━━━━━━━━━━━━━━━━━
🌐 URL: ${result.url}
📊 Đánh giá: ${result.label === 'SAFE' ? '🟢 AN TOÀN' : result.label === 'CAUTION' ? '🟡 CẦN THẬN TRỌNG' : '🔴 NGUY HIỂM'}
📈 Điểm rủi ro: ${result.score}/100
🤖 Độ tin cậy AI: ${Math.round(result.aiConfidence * 100)}%
━━━━━━━━━━━━━━━━━━━━━━━━
📋 Chi tiết phân tích:
${result.reasons.map(r => `• ${r}`).join('\n')}
━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ Lưu ý: Kết quả chỉ mang tính tham khảo
🔗 Kiểm tra tại: anti-scam.vn`
    
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Main Result Card */}
      <div className={`bg-gradient-to-br ${getScoreBgColor(result.score)} rounded-2xl p-1`}>
        <div className=" rounded-2xl p-6">
          {/* Header with Shield */}
          <div className="flex items-center gap-6 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              {getShieldIcon()}
            </motion.div>
            <div className="flex-1">
              <h2 className={`text-2xl font-bold mb-1 ${getScoreColor(result.score)}`}>
                {getStatusMessage()}
              </h2>
              <p className="text-gray-400 text-sm">{getStatusDescription()}</p>
            </div>
            <RiskBadge label={result.label} size="lg" />
          </div>

          {/* URL Info */}
          <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 text-sm">URL được kiểm tra</span>
            </div>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-2 break-all"
            >
              {result.url}
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
            </a>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-700 pb-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Tổng quan', icon: Activity },
              { id: 'website', label: 'Website', icon: Globe },
              { id: 'details', label: 'Chi tiết', icon: FileWarning },
              { id: 'recommendations', label: 'Khuyến nghị', icon: Shield },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Score Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                  <div className={`text-3xl font-bold mb-1 ${getScoreColor(result.score)}`}>
                    {result.score}
                  </div>
                  <div className="text-gray-400 text-xs">Điểm rủi ro</div>
                  <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ duration: 0.8 }}
                      className={`h-full ${getProgressColor(result.score)}`}
                    />
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold mb-1 text-blue-400">
                    {Math.round(result.aiConfidence * 100)}%
                  </div>
                  <div className="text-gray-400 text-xs">Độ tin cậy AI</div>
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-gray-500">ML Model</span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold mb-1 text-purple-400">
                    {result.reasons.length}
                  </div>
                  <div className="text-gray-400 text-xs">Dấu hiệu phát hiện</div>
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <Eye className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-gray-500">Phân tích</span>
                  </div>
                </div>

                {result.virusTotal && (
                  <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className={`text-3xl font-bold mb-1 ${
                      result.virusTotal.stats.malicious > 0 ? 'text-red-400' :
                      result.virusTotal.stats.suspicious > 0 ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {result.virusTotal.stats.total}
                    </div>
                    <div className="text-gray-400 text-xs">Antivirus Engines</div>
                    <div className="mt-2 flex items-center justify-center gap-1">
                      <Database className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-gray-500">VirusTotal</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    {isHttps ? (
                      <Lock className="w-5 h-5 text-green-400" />
                    ) : (
                      <Unlock className="w-5 h-5 text-red-400" />
                    )}
                    <span className="font-medium">Bảo mật kết nối</span>
                  </div>
                  <p className={`text-sm ${isHttps ? 'text-green-400' : 'text-red-400'}`}>
                    {isHttps ? '✓ Có mã hóa SSL/TLS' : '✗ Không có mã hóa'}
                  </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Server className="w-5 h-5 text-blue-400" />
                    <span className="font-medium">Domain</span>
                  </div>
                  <p className="text-sm text-gray-300 truncate">{result.domain}</p>
                </div>
              </div>

              {/* VirusTotal Results */}
              {result.virusTotal && (
                <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl p-4 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-5 h-5 text-blue-400" />
                    <h4 className="font-medium text-white">VirusTotal Security Scan</h4>
                    <span className="ml-auto text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {result.virusTotal.stats.total} engines
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-red-400">
                        {result.virusTotal.stats.malicious}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Độc hại</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-yellow-400">
                        {result.virusTotal.stats.suspicious}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Đáng ngờ</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        {result.virusTotal.stats.harmless}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">An toàn</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-gray-400">
                        {result.virusTotal.stats.undetected}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Chưa xác định</div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    {result.virusTotal.stats.malicious > 0 ? (
                      <>
                        <ShieldX className="w-5 h-5 text-red-400" />
                        <span className="text-sm text-red-400 font-medium">
                          ⚠️ {result.virusTotal.stats.malicious} antivirus phát hiện mối đe dọa!
                        </span>
                      </>
                    ) : result.virusTotal.stats.suspicious > 0 ? (
                      <>
                        <ShieldAlert className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm text-yellow-400 font-medium">
                          ⚠️ {result.virusTotal.stats.suspicious} antivirus đánh dấu đáng ngờ
                        </span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 text-blue-400" />
                        <span className="text-sm text-blue-400 font-medium">
                          ✓ Không phát hiện mối đe dọa từ {result.virusTotal.stats.total} antivirus engines
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'website' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {result.websiteInfo ? (
                <>
                  {/* Website Title & Category */}
                  <div className="bg-gray-800 rounded-xl p-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-400" />
                      Thông tin Website
                    </h4>
                    <div className="space-y-3">
                      {result.websiteInfo.title && (
                        <div>
                          <span className="text-gray-400 text-sm">Tiêu đề:</span>
                          <p className="text-white">{result.websiteInfo.title}</p>
                        </div>
                      )}
                      {result.websiteInfo.description && (
                        <div>
                          <span className="text-gray-400 text-sm">Mô tả:</span>
                          <p className="text-gray-300 text-sm">{result.websiteInfo.description}</p>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                          {result.websiteInfo.category}
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                          {result.websiteInfo.subCategory}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  {result.websiteInfo.technologies.length > 0 && (
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Server className="w-4 h-4 text-green-400" />
                        Công nghệ sử dụng
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.websiteInfo.technologies.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-700 rounded text-sm text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {result.websiteInfo.framework && (
                        <p className="text-sm text-gray-400 mt-2">
                          Framework: <span className="text-white">{result.websiteInfo.framework}</span>
                        </p>
                      )}
                      {result.websiteInfo.cms && (
                        <p className="text-sm text-gray-400">
                          CMS: <span className="text-white">{result.websiteInfo.cms}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Trust & Risk Factors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="font-medium mb-3 text-green-400 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Yếu tố tin cậy
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {result.websiteInfo.trustFactors.length > 0 ? (
                          result.websiteInfo.trustFactors.map((f, i) => (
                            <li key={i} className="text-gray-300 flex items-center gap-2">
                              <span className="text-green-400">✓</span> {f}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500">Không có</li>
                        )}
                      </ul>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="font-medium mb-3 text-red-400 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Yếu tố rủi ro
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {result.websiteInfo.riskFactors.length > 0 ? (
                          result.websiteInfo.riskFactors.map((f, i) => (
                            <li key={i} className="text-gray-300 flex items-center gap-2">
                              <span className="text-red-400">✗</span> {f}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500">Không có</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="bg-gray-800 rounded-xl p-4">
                    <h4 className="font-medium mb-3">Tính năng phát hiện</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        {result.websiteInfo.hasSSL ? (
                          <Lock className="w-4 h-4 text-green-400" />
                        ) : (
                          <Unlock className="w-4 h-4 text-red-400" />
                        )}
                        <span>SSL/HTTPS</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={result.websiteInfo.hasLoginForm ? 'text-yellow-400' : 'text-gray-500'}>
                          {result.websiteInfo.hasLoginForm ? '⚠️' : '○'}
                        </span>
                        <span>Form đăng nhập</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={result.websiteInfo.hasPaymentForm ? 'text-yellow-400' : 'text-gray-500'}>
                          {result.websiteInfo.hasPaymentForm ? '⚠️' : '○'}
                        </span>
                        <span>Form thanh toán</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={result.websiteInfo.hasContactInfo ? 'text-green-400' : 'text-gray-500'}>
                          {result.websiteInfo.hasContactInfo ? '✓' : '○'}
                        </span>
                        <span>Thông tin liên hệ</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={result.websiteInfo.hasSocialLinks ? 'text-green-400' : 'text-gray-500'}>
                          {result.websiteInfo.hasSocialLinks ? '✓' : '○'}
                        </span>
                        <span>Liên kết MXH</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={result.websiteInfo.hasPrivacyPolicy ? 'text-green-400' : 'text-gray-500'}>
                          {result.websiteInfo.hasPrivacyPolicy ? '✓' : '○'}
                        </span>
                        <span>Chính sách bảo mật</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-800 rounded-xl p-8 text-center">
                  <Globe className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">Không thể truy cập website để phân tích chi tiết</p>
                  <p className="text-gray-500 text-sm mt-1">Website có thể đã bị chặn hoặc không hoạt động</p>
                </div>
              )}

              {/* Category Guess */}
              {result.categoryGuess && (
                <div className="bg-gray-800 rounded-xl p-4">
                  <h4 className="font-medium mb-2">Phân loại từ domain</h4>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                      {typeof result.categoryGuess === 'object' 
                        ? result.categoryGuess.category 
                        : result.categoryGuess}
                    </span>
                    {typeof result.categoryGuess === 'object' && (
                      <span className="text-gray-400 text-sm">
                        Độ tin cậy: {Math.round(result.categoryGuess.confidence * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* External Sources */}
              {result.externalSources && result.externalSources.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <h4 className="font-medium mb-2 text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Cảnh báo từ nguồn bên ngoài
                  </h4>
                  <ul className="space-y-1">
                    {result.externalSources.map((source, i) => (
                      <li key={i} className="text-gray-300 text-sm">• {source}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'details' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Analysis Breakdown */}
              {(result.heuristicScore !== undefined || result.aiScore !== undefined) && (
                <div className="bg-gray-800 rounded-xl p-4 mb-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    Phân tích chi tiết
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Phân tích Heuristic</span>
                        <span>{result.heuristicScore ?? 0}/100</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${result.heuristicScore ?? 0}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Phân tích AI/ML</span>
                        <span>{result.aiScore ?? 0}/100</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${result.aiScore ?? 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reasons List */}
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <FileWarning className="w-4 h-4 text-yellow-400" />
                  Các dấu hiệu phát hiện ({result.reasons.length})
                </h4>
                <ul className="space-y-2">
                  {result.reasons.map((reason, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3 p-2 bg-gray-700/50 rounded-lg"
                    >
                      {result.label === 'SAFE' ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      ) : result.label === 'CAUTION' ? (
                        <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span className="text-gray-300 text-sm">{reason}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Technical Info */}
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-gray-400" />
                  Thông tin kỹ thuật
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">Protocol:</span>
                    <span className={isHttps ? 'text-green-400' : 'text-red-400'}>
                      {isHttps ? 'HTTPS' : 'HTTP'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">Domain age:</span>
                    <span className="text-gray-300">{getDomainAge()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'recommendations' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {getRecommendations().map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl flex items-start gap-3 ${
                    rec.type === 'danger' ? 'bg-red-500/10 border border-red-500/30' :
                    rec.type === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/30' :
                    rec.type === 'success' ? 'bg-green-500/10 border border-green-500/30' :
                    'bg-blue-500/10 border border-blue-500/30'
                  }`}
                >
                  <rec.icon className={`w-5 h-5 flex-shrink-0 ${
                    rec.type === 'danger' ? 'text-red-400' :
                    rec.type === 'warning' ? 'text-yellow-400' :
                    rec.type === 'success' ? 'text-green-400' :
                    'text-blue-400'
                  }`} />
                  <span className="text-gray-300">{rec.text}</span>
                </motion.div>
              ))}

              {/* Emergency Contact */}
              {result.label === 'DANGEROUS' && (
                <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                  <h5 className="font-medium text-red-400 mb-2">🚨 Nếu đã nhập thông tin:</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Đổi mật khẩu ngay lập tức</li>
                    <li>• Liên hệ ngân hàng để khóa thẻ/tài khoản</li>
                    <li>• Báo cáo tại: <span className="text-blue-400">canhbao.ncsc.gov.vn</span></li>
                    <li>• Hotline An ninh mạng: <span className="text-blue-400">1900.0091</span></li>
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {/* Warning Banner */}
          <div className="mt-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              Kết quả chỉ mang tính tham khảo. Không nhập OTP hoặc mật khẩu nếu nghi ngờ.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={copyToClipboard}
              className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  Đã sao chép
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Sao chép kết quả
                </>
              )}
            </button>
            <a
              href={`/report?url=${encodeURIComponent(result.url)}`}
              className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              Báo cáo lừa đảo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
