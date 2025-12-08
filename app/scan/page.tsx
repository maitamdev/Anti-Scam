'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  Link2, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Loader2,
  Image as ImageIcon
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ImageUpload from '../components/ImageUpload'
import ScamTips from '../components/ScamTips'

interface WebsiteInfo {
  title?: string
  description?: string
  category?: string
  industry?: string
  subCategory?: string
  technologies?: string[]
  framework?: string
  cms?: string
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
}

export default function ScanPage() {
  const [activeTab, setActiveTab] = useState<'url' | 'image'>('url')
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<ScanResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [expandedSection, setExpandedSection] = useState<string | null>('details')

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      const data = await res.json()

      if (!data.success) {
        throw new Error(data.error || 'Có lỗi xảy ra')
      }

      setResult(data.data)
      setExpandedSection('details')

      // Save to localStorage (only in browser)
      if (typeof window !== 'undefined') {
        const history = JSON.parse(localStorage.getItem('scanHistory') || '[]')
        history.unshift({ ...data.data, timestamp: new Date().toISOString() })
        localStorage.setItem('scanHistory', JSON.stringify(history.slice(0, 20)))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setUrl('')
    setResult(null)
    setError('')
  }

  const getResultConfig = () => {
    if (!result) return null
    
    switch (result.label) {
      case 'SAFE':
        return {
          icon: CheckCircle,
          iconBg: 'bg-green-500/20',
          iconColor: 'text-green-400',
          borderColor: 'border-green-500/30',
          label: 'WEBSITE AN TOÀN',
          labelColor: 'text-green-400',
          title: 'Website này an toàn để truy cập.',
          description: 'Chúng tôi đã phân tích các yếu tố bảo mật và không tìm thấy dấu hiệu đáng ngờ nào. Bạn có thể yên tâm truy cập.'
        }
      case 'CAUTION':
        return {
          icon: AlertTriangle,
          iconBg: 'bg-yellow-500/20',
          iconColor: 'text-yellow-400',
          borderColor: 'border-yellow-500/30',
          label: 'CẦN CẨN THẬN',
          labelColor: 'text-yellow-400',
          title: 'Website này có một số dấu hiệu đáng ngờ.',
          description: 'Chúng tôi phát hiện một số yếu tố cần lưu ý. Hãy cẩn thận khi nhập thông tin cá nhân hoặc tài chính.'
        }
      case 'DANGEROUS':
        return {
          icon: XCircle,
          iconBg: 'bg-red-500/20',
          iconColor: 'text-red-400',
          borderColor: 'border-red-500/30',
          label: 'WEBSITE NGUY HIỂM',
          labelColor: 'text-red-400',
          title: 'Website này có nguy cơ lừa đảo cao!',
          description: 'Chúng tôi phát hiện nhiều dấu hiệu lừa đảo. KHÔNG nên truy cập hoặc cung cấp bất kỳ thông tin nào.'
        }
    }
  }

  const config = getResultConfig()

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Kiểm tra URL & Tin nhắn
            </h1>
            <p className="text-gray-400 text-sm sm:text-lg px-2">
              Dán link hoặc upload ảnh tin nhắn đáng ngờ để kiểm tra dấu hiệu lừa đảo.
            </p>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <ScamTips />
          </motion.div>

          {/* Tab Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-2 mb-6 sm:mb-8"
          >
            <button
              onClick={() => { setActiveTab('url'); setResult(null); setError(''); }}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all text-sm sm:text-base ${
                activeTab === 'url'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <Link2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Kiểm tra</span> URL
            </button>
            <button
              onClick={() => { setActiveTab('image'); setResult(null); setError(''); }}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all text-sm sm:text-base ${
                activeTab === 'image'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Kiểm tra</span> Hình ảnh
            </button>
          </motion.div>

          {/* Image Upload Tab */}
          <AnimatePresence mode="wait">
            {activeTab === 'image' && (
              <motion.div
                key="image-tab"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-10"
              >
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">
                  <div className="text-center mb-4">
                    <p className="text-gray-400 text-sm">
                      Tải lên ảnh chụp màn hình tin nhắn, email, hoặc website đáng ngờ để AI phân tích
                    </p>
                  </div>
                  <ImageUpload />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* URL Search Form */}
          {activeTab === 'url' && (
            <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleScan}
            className="mb-8 sm:mb-10"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Link2 className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Dán URL website vào đây..."
                  className="w-full bg-[#111827] border border-gray-700 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 sm:pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed rounded-lg sm:rounded-xl font-medium text-white transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span className="hidden sm:inline">Đang kiểm tra...</span>
                    <span className="sm:hidden">Đang...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    Kiểm tra
                  </>
                )}
              </button>
            </div>
          </motion.form>
          )}

          {/* Error */}
          {error && activeTab === 'url' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Result - only show for URL tab */}
          <AnimatePresence>
            {result && config && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-xl font-semibold mb-4">Kết quả phân tích</h2>

                {/* Main Result Card */}
                <div className={`bg-[#111827] rounded-2xl p-6 border ${config.borderColor} mb-4`}>
                  <div className="flex items-start gap-5">
                    <div className={`w-16 h-16 rounded-2xl ${config.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <config.icon className={`w-8 h-8 ${config.iconColor}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${config.labelColor} mb-1`}>{config.label}</p>
                      <h3 className="text-xl font-semibold mb-2">{config.title}</h3>
                      <p className="text-gray-400">{config.description}</p>
                    </div>
                  </div>
                </div>

                {/* Expandable Sections */}
                <div className="space-y-3">
                  {/* Chi tiết phân tích */}
                  <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">
                    <button
                      onClick={() => toggleSection('details')}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-[#1a2332] transition-colors"
                    >
                      <span className="font-medium">Chi tiết phân tích</span>
                      {expandedSection === 'details' ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedSection === 'details' && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 border-t border-gray-800">
                            <div className="space-y-4 text-sm">
                              {/* Basic Info */}
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-[#0d1320] rounded-lg p-3">
                                  <p className="text-gray-500 text-xs mb-1">Domain</p>
                                  <p className="text-gray-200 font-medium truncate">{result.domain}</p>
                                </div>
                                <div className="bg-[#0d1320] rounded-lg p-3">
                                  <p className="text-gray-500 text-xs mb-1">Điểm rủi ro</p>
                                  <p className={`font-bold text-lg ${
                                    result.score <= 30 ? 'text-green-400' :
                                    result.score <= 60 ? 'text-yellow-400' : 'text-red-400'
                                  }`}>{result.score}/100</p>
                                </div>
                                <div className="bg-[#0d1320] rounded-lg p-3">
                                  <p className="text-gray-500 text-xs mb-1">Độ tin cậy AI</p>
                                  <p className="text-gray-200 font-medium">{Math.round(result.aiConfidence * 100)}%</p>
                                </div>
                                <div className="bg-[#0d1320] rounded-lg p-3">
                                  <p className="text-gray-500 text-xs mb-1">Phân loại</p>
                                  <p className="text-gray-200 font-medium">
                                    {typeof result.categoryGuess === 'object' 
                                      ? result.categoryGuess.category 
                                      : result.categoryGuess || result.websiteInfo?.category || 'Không xác định'}
                                  </p>
                                </div>
                              </div>

                              {/* SSL & Security */}
                              {result.websiteInfo && (
                                <div className="bg-[#0d1320] rounded-lg p-3">
                                  <p className="text-gray-400 text-xs mb-2 font-medium">Kiểm tra bảo mật</p>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    <div className="flex items-center gap-2">
                                      {result.websiteInfo.hasSSL ? (
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                      ) : (
                                        <XCircle className="w-4 h-4 text-red-400" />
                                      )}
                                      <span className="text-gray-300 text-xs">Chứng chỉ SSL</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {result.websiteInfo.hasPrivacyPolicy ? (
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                      ) : (
                                        <XCircle className="w-4 h-4 text-yellow-400" />
                                      )}
                                      <span className="text-gray-300 text-xs">Chính sách bảo mật</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {result.websiteInfo.hasContactInfo ? (
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                      ) : (
                                        <XCircle className="w-4 h-4 text-yellow-400" />
                                      )}
                                      <span className="text-gray-300 text-xs">Thông tin liên hệ</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {result.websiteInfo.hasSocialLinks ? (
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                      ) : (
                                        <AlertTriangle className="w-4 h-4 text-gray-500" />
                                      )}
                                      <span className="text-gray-300 text-xs">Liên kết MXH</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {result.websiteInfo.hasLoginForm ? (
                                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                      ) : (
                                        <CheckCircle className="w-4 h-4 text-gray-500" />
                                      )}
                                      <span className="text-gray-300 text-xs">Form đăng nhập</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {result.websiteInfo.hasPaymentForm ? (
                                        <AlertTriangle className="w-4 h-4 text-orange-400" />
                                      ) : (
                                        <CheckCircle className="w-4 h-4 text-gray-500" />
                                      )}
                                      <span className="text-gray-300 text-xs">Form thanh toán</span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Website Info */}
                              {result.websiteInfo?.title && (
                                <div className="bg-[#0d1320] rounded-lg p-3">
                                  <p className="text-gray-400 text-xs mb-1">Tiêu đề website</p>
                                  <p className="text-gray-200">{result.websiteInfo.title}</p>
                                  {result.websiteInfo.description && (
                                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">{result.websiteInfo.description}</p>
                                  )}
                                </div>
                              )}

                              {/* Risk Factors */}
                              {result.websiteInfo?.riskFactors && result.websiteInfo.riskFactors.length > 0 && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                  <p className="text-red-400 text-xs mb-2 font-medium">⚠️ Yếu tố rủi ro phát hiện</p>
                                  <ul className="space-y-1">
                                    {result.websiteInfo.riskFactors.map((factor, i) => (
                                      <li key={i} className="text-red-300 text-xs flex items-start gap-2">
                                        <span>•</span>{factor}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Trust Factors */}
                              {result.websiteInfo?.trustFactors && result.websiteInfo.trustFactors.length > 0 && (
                                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                                  <p className="text-green-400 text-xs mb-2 font-medium">✓ Yếu tố tin cậy</p>
                                  <ul className="space-y-1">
                                    {result.websiteInfo.trustFactors.map((factor, i) => (
                                      <li key={i} className="text-green-300 text-xs flex items-start gap-2">
                                        <span>•</span>{factor}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Analysis Reasons */}
                              {result.reasons.length > 0 && (
                                <div className="bg-[#0d1320] rounded-lg p-3">
                                  <p className="text-gray-400 text-xs mb-2 font-medium">Phân tích nội dung</p>
                                  <ul className="space-y-1">
                                    {result.reasons.map((reason, i) => (
                                      <li key={i} className="text-gray-300 text-xs flex items-start gap-2">
                                        <span className="text-blue-400">•</span>{reason}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* External Sources */}
                              {result.externalSources && result.externalSources.length > 0 && (
                                <div className="bg-[#0d1320] rounded-lg p-3">
                                  <p className="text-gray-400 text-xs mb-2 font-medium">Nguồn kiểm tra bên ngoài</p>
                                  <ul className="space-y-1">
                                    {result.externalSources.map((source, i) => (
                                      <li key={i} className="text-gray-300 text-xs">{source}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Technologies */}
                              {result.websiteInfo?.technologies && result.websiteInfo.technologies.length > 0 && (
                                <div className="bg-[#0d1320] rounded-lg p-3">
                                  <p className="text-gray-400 text-xs mb-2 font-medium">Công nghệ phát hiện</p>
                                  <div className="flex flex-wrap gap-1">
                                    {result.websiteInfo.technologies.map((tech, i) => (
                                      <span key={i} className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">{tech}</span>
                                    ))}
                                    {result.websiteInfo.framework && (
                                      <span className="px-2 py-0.5 bg-blue-500/20 rounded text-xs text-blue-300">{result.websiteInfo.framework}</span>
                                    )}
                                    {result.websiteInfo.cms && (
                                      <span className="px-2 py-0.5 bg-purple-500/20 rounded text-xs text-purple-300">{result.websiteInfo.cms}</span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Tại sao kết quả này quan trọng */}
                  <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">
                    <button
                      onClick={() => toggleSection('why')}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-[#1a2332] transition-colors"
                    >
                      <span className="font-medium">Tại sao kết quả này lại quan trọng?</span>
                      {expandedSection === 'why' ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedSection === 'why' && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 border-t border-gray-800">
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {result.label === 'SAFE' 
                                ? 'Website an toàn giúp bạn yên tâm khi truy cập và thực hiện các giao dịch. Tuy nhiên, hãy luôn cảnh giác và không chia sẻ thông tin nhạy cảm nếu không cần thiết.'
                                : result.label === 'CAUTION'
                                ? 'Các website có dấu hiệu đáng ngờ có thể là trang giả mạo hoặc chứa nội dung không an toàn. Việc nhận biết sớm giúp bạn tránh được các rủi ro về tài chính và thông tin cá nhân.'
                                : 'Website nguy hiểm có thể đánh cắp thông tin đăng nhập, số thẻ tín dụng, hoặc cài đặt phần mềm độc hại vào thiết bị của bạn. Hàng nghìn người Việt Nam bị lừa đảo mỗi ngày qua các trang web giả mạo.'}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Tôi nên làm gì tiếp theo */}
                  <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">
                    <button
                      onClick={() => toggleSection('next')}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-[#1a2332] transition-colors"
                    >
                      <span className="font-medium">Tôi nên làm gì tiếp theo?</span>
                      {expandedSection === 'next' ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedSection === 'next' && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 border-t border-gray-800">
                            <ul className="space-y-2 text-sm text-gray-400">
                              {result.label === 'SAFE' ? (
                                <>
                                  <li className="flex items-start gap-2"><span className="text-green-400">✓</span> Bạn có thể truy cập website này một cách an toàn</li>
                                  <li className="flex items-start gap-2"><span className="text-green-400">✓</span> Vẫn nên kiểm tra URL trên thanh địa chỉ trước khi đăng nhập</li>
                                  <li className="flex items-start gap-2"><span className="text-green-400">✓</span> Không chia sẻ OTP hoặc mật khẩu qua bất kỳ kênh nào</li>
                                </>
                              ) : result.label === 'CAUTION' ? (
                                <>
                                  <li className="flex items-start gap-2"><span className="text-yellow-400">!</span> Không nhập thông tin đăng nhập hoặc tài chính</li>
                                  <li className="flex items-start gap-2"><span className="text-yellow-400">!</span> Kiểm tra kỹ URL, so sánh với website chính thức</li>
                                  <li className="flex items-start gap-2"><span className="text-yellow-400">!</span> Tìm kiếm đánh giá về website này trên Google</li>
                                  <li className="flex items-start gap-2"><span className="text-yellow-400">!</span> Nếu nghi ngờ, hãy liên hệ trực tiếp với tổ chức qua hotline chính thức</li>
                                </>
                              ) : (
                                <>
                                  <li className="flex items-start gap-2"><span className="text-red-400">✗</span> KHÔNG truy cập website này</li>
                                  <li className="flex items-start gap-2"><span className="text-red-400">✗</span> KHÔNG nhập bất kỳ thông tin nào</li>
                                  <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Nếu đã nhập thông tin, hãy đổi mật khẩu ngay</li>
                                  <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Báo cáo website này để bảo vệ người khác</li>
                                </>
                              )}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 text-center">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-xl font-medium transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Kiểm tra một đường dẫn khác
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State - only for URL tab */}
          {activeTab === 'url' && !result && !isLoading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center py-12"
            >
              <Shield className="w-20 h-20 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500">Nhập URL để bắt đầu kiểm tra</p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
