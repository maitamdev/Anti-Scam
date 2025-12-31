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
  Image as ImageIcon,
  Database,
  ShieldAlert,
  ShieldX,
  CreditCard,
  Mail,
  Phone,
  Building2,
  Info,
  Globe,
  Zap,
  FileText
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ImageUpload from '../components/ImageUpload'
import ScamTips from '../components/ScamTips'
import AnimatedEye from '../components/AnimatedEye'
import ScanMascot from '../components/ScanMascot'
import { safeStorage } from '../lib/safeStorage'

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

interface VirusTotalResult {
  detected: boolean
  stats: {
    malicious: number
    suspicious: number
    harmless: number
    undetected: number
    total: number
  } | null
  notFound?: boolean
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

type CheckType = 'bank' | 'email' | 'phone'

interface CheckResult {
  success: boolean
  found: boolean
  matchType?: string
  data: {
    riskLevel: string
    reportCount?: number
    verified?: boolean
    bankName?: string
    ownerName?: string
    totalLoss?: number
    carrier?: string
    category?: string
    description?: string
    firstReported?: string
    relatedScamEmails?: number
  }
  message: string
}

const banks = [
  'Vietcombank', 'BIDV', 'Agribank', 'Techcombank', 'VPBank', 'MB Bank',
  'ACB', 'Sacombank', 'TPBank', 'VIB', 'SHB', 'HDBank', 'OCB', 'MSB',
  'SeABank', 'LienVietPostBank', 'Eximbank', 'NCB', 'ABBank', 'BacABank',
  'VietABank', 'PGBank', 'VietBank', 'KienLongBank', 'NamABank', 'Khác'
]

export default function ScanPage() {
  const [activeTab, setActiveTab] = useState<'url' | 'image' | 'check'>('url')
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<ScanResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [expandedSection, setExpandedSection] = useState<string | null>('details')
  
  // Check states
  const [checkType, setCheckType] = useState<CheckType>('bank')
  const [checkInput, setCheckInput] = useState('')
  const [bankName, setBankName] = useState('')
  const [checkLoading, setCheckLoading] = useState(false)
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null)
  const [checkError, setCheckError] = useState('')

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
      const saved = safeStorage.getItem('scanHistory')
      if (saved !== null) {
        const history = JSON.parse(saved || '[]')
        history.unshift({ ...data.data, timestamp: new Date().toISOString() })
        safeStorage.setItem('scanHistory', JSON.stringify(history.slice(0, 20)))
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

  // Check functions
  const handleCheck = async () => {
    if (!checkInput.trim()) {
      setCheckError('Vui lòng nhập thông tin cần kiểm tra')
      return
    }

    setCheckLoading(true)
    setCheckError('')
    setCheckResult(null)

    try {
      let endpoint = ''
      let body: Record<string, string> = {}

      switch (checkType) {
        case 'bank':
          endpoint = '/api/check/bank-account'
          body = { accountNumber: checkInput, bankName }
          break
        case 'email':
          endpoint = '/api/check/email'
          body = { email: checkInput }
          break
        case 'phone':
          endpoint = '/api/check/phone'
          body = { phone: checkInput }
          break
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (data.success) {
        setCheckResult(data)
      } else {
        setCheckError(data.error || 'Có lỗi xảy ra')
      }
    } catch (err) {
      setCheckError('Không thể kết nối đến server')
    } finally {
      setCheckLoading(false)
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'DANGEROUS': return 'text-red-400 bg-red-500/20 border-red-500/30'
      case 'SUSPICIOUS': return 'text-orange-400 bg-orange-500/20 border-orange-500/30'
      case 'CAUTION': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'UNKNOWN': return 'text-green-400 bg-green-500/20 border-green-500/30'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'DANGEROUS': return <XCircle className="w-6 h-6 text-red-400" />
      case 'SUSPICIOUS': return <AlertTriangle className="w-6 h-6 text-orange-400" />
      case 'CAUTION': return <AlertTriangle className="w-6 h-6 text-yellow-400" />
      case 'UNKNOWN': return <CheckCircle className="w-6 h-6 text-green-400" />
      default: return <Info className="w-6 h-6 text-gray-400" />
    }
  }

  const getCheckPlaceholder = () => {
    switch (checkType) {
      case 'bank': return 'Nhập số tài khoản ngân hàng...'
      case 'email': return 'Nhập địa chỉ email...'
      case 'phone': return 'Nhập số điện thoại...'
    }
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
    <div className="min-h-screen flex flex-col ">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
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
            className="flex justify-center gap-2 mb-6 sm:mb-8 flex-wrap"
          >
            <button
              onClick={() => { setActiveTab('url'); setResult(null); setError(''); setCheckResult(null); }}
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
              onClick={() => { setActiveTab('image'); setResult(null); setError(''); setCheckResult(null); }}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all text-sm sm:text-base ${
                activeTab === 'image'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Kiểm tra</span> Hình ảnh
            </button>
            <button
              onClick={() => { setActiveTab('check'); setResult(null); setError(''); setCheckResult(null); setCheckInput(''); }}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all text-sm sm:text-base ${
                activeTab === 'check'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Tra cứu</span> Lừa đảo
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
                <div className="bg-blue-900/10 rounded-2xl p-6 border border-gray-800">
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

          {/* Check Tab - Kiểm tra tài khoản/email/phone */}
          <AnimatePresence mode="wait">
            {activeTab === 'check' && (
              <motion.div
                key="check-tab"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-10"
              >
                <div className="bg-blue-900/10 rounded-2xl p-6 border border-gray-800">
                  {/* Check Type Tabs */}
                  <div className="flex justify-center gap-2 mb-6">
                    <button
                      onClick={() => { setCheckType('bank'); setCheckResult(null); setCheckInput(''); setCheckError(''); }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                        checkType === 'bank'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      Tài khoản
                    </button>
                    <button
                      onClick={() => { setCheckType('email'); setCheckResult(null); setCheckInput(''); setCheckError(''); }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                        checkType === 'email'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </button>
                    <button
                      onClick={() => { setCheckType('phone'); setCheckResult(null); setCheckInput(''); setCheckError(''); }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                        checkType === 'phone'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      Điện thoại
                    </button>
                  </div>

                  {/* Bank selector */}
                  {checkType === 'bank' && (
                    <div className="mb-4">
                      <label className="block text-sm text-gray-400 mb-2">Ngân hàng (tùy chọn)</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50"
                        >
                          <option value="">Chọn ngân hàng...</option>
                          {banks.map(bank => (
                            <option key={bank} value={bank}>{bank}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Main input */}
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={checkType === 'email' ? 'email' : 'text'}
                        value={checkInput}
                        onChange={(e) => setCheckInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                        placeholder={getCheckPlaceholder()}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {checkError && (
                    <p className="text-red-400 text-sm mb-4">{checkError}</p>
                  )}

                  {/* Submit button */}
                  <button
                    onClick={handleCheck}
                    disabled={checkLoading}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {checkLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Đang kiểm tra...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Kiểm tra ngay
                      </>
                    )}
                  </button>

                  {/* Check Result */}
                  <AnimatePresence mode="wait">
                    {checkResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`mt-6 border rounded-xl p-4 ${getRiskColor(checkResult.data.riskLevel)}`}
                      >
                        <div className="flex items-start gap-4">
                          {getRiskIcon(checkResult.data.riskLevel)}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {checkResult.message}
                            </h3>
                            
                            {checkResult.found && checkResult.data && (
                              <div className="space-y-2 mt-4">
                                {checkResult.data.reportCount && (
                                  <p className="text-sm text-gray-300">
                                    📊 Số lần bị báo cáo: <span className="font-semibold text-white">{checkResult.data.reportCount}</span>
                                  </p>
                                )}
                                {checkResult.data.bankName && (
                                  <p className="text-sm text-gray-300">
                                    🏦 Ngân hàng: <span className="font-semibold text-white">{checkResult.data.bankName}</span>
                                  </p>
                                )}
                                {checkResult.data.ownerName && (
                                  <p className="text-sm text-gray-300">
                                    👤 Chủ tài khoản: <span className="font-semibold text-white">{checkResult.data.ownerName}</span>
                                  </p>
                                )}
                                {checkResult.data.totalLoss && (
                                  <p className="text-sm text-gray-300">
                                    💰 Tổng thiệt hại: <span className="font-semibold text-red-400">
                                      {checkResult.data.totalLoss.toLocaleString('vi-VN')} VNĐ
                                    </span>
                                  </p>
                                )}
                                {checkResult.data.carrier && (
                                  <p className="text-sm text-gray-300">
                                    📱 Nhà mạng: <span className="font-semibold text-white">{checkResult.data.carrier}</span>
                                  </p>
                                )}
                                {checkResult.data.category && (
                                  <p className="text-sm text-gray-300">
                                    🏷️ Loại: <span className="font-semibold text-white">{checkResult.data.category}</span>
                                  </p>
                                )}
                                {checkResult.data.description && (
                                  <p className="text-sm text-gray-300">
                                    📝 Mô tả: <span className="text-white">{checkResult.data.description}</span>
                                  </p>
                                )}
                                {checkResult.data.verified && (
                                  <p className="text-sm text-red-400 font-semibold">
                                    ✓ Đã được xác minh bởi hệ thống
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tips */}
                  <div className="mt-6 grid md:grid-cols-3 gap-3">
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                      <CreditCard className="w-6 h-6 text-blue-400 mb-2" />
                      <h4 className="font-medium text-white text-sm mb-1">Kiểm tra tài khoản</h4>
                      <p className="text-xs text-gray-400">
                        Tra cứu số tài khoản trước khi chuyển tiền
                      </p>
                    </div>
                    <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3">
                      <Mail className="w-6 h-6 text-cyan-400 mb-2" />
                      <h4 className="font-medium text-white text-sm mb-1">Kiểm tra email</h4>
                      <p className="text-xs text-gray-400">
                        Xác minh email có phải lừa đảo không
                      </p>
                    </div>
                    <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3">
                      <Phone className="w-6 h-6 text-purple-400 mb-2" />
                      <h4 className="font-medium text-white text-sm mb-1">Kiểm tra SĐT</h4>
                      <p className="text-xs text-gray-400">
                        Tra cứu số điện thoại lạ gọi đến
                      </p>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-300">
                        Kết quả chỉ mang tính tham khảo. Không tìm thấy không đảm bảo 100% an toàn.
                      </p>
                    </div>
                  </div>
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
              <div className="flex-1 relative group">
                <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 transition-transform group-focus-within:scale-110 z-10">
                  <AnimatedEye />
                </div>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Dán URL website vào đây..."
                  className="w-full bg-blue-900/10 border border-gray-700 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-24 sm:pl-32 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base"
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

                {/* Main Result Card with Mascot */}
                <div className={`bg-blue-900/10 rounded-2xl p-6 border ${config.borderColor} mb-4`}>
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    {/* Mascot */}
                    <div className="flex-shrink-0">
                      <ScanMascot 
                        state={result.label === 'SAFE' ? 'safe' : result.label === 'CAUTION' ? 'caution' : 'danger'} 
                        size={100} 
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <p className={`text-sm font-semibold ${config.labelColor} mb-1`}>{config.label}</p>
                      <h3 className="text-xl font-semibold mb-2">{config.title}</h3>
                      <p className="text-gray-400">{config.description}</p>
                    </div>
                  </div>
                </div>

                {/* Expandable Sections */}
                <div className="space-y-3">
                  {/* Chi tiết phân tích */}
                  <div className="bg-blue-900/10 rounded-xl border border-gray-800 overflow-hidden">
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
                                <div className=" rounded-lg p-3">
                                  <p className="text-gray-500 text-xs mb-1">Domain</p>
                                  <p className="text-gray-200 font-medium truncate">{result.domain}</p>
                                </div>
                                <div className=" rounded-lg p-3">
                                  <p className="text-gray-500 text-xs mb-1">Điểm rủi ro</p>
                                  <p className={`font-bold text-lg ${
                                    result.score <= 30 ? 'text-green-400' :
                                    result.score <= 60 ? 'text-yellow-400' : 'text-red-400'
                                  }`}>{result.score}/100</p>
                                </div>
                                <div className=" rounded-lg p-3">
                                  <p className="text-gray-500 text-xs mb-1">Độ tin cậy AI</p>
                                  <p className="text-gray-200 font-medium">{Math.round(result.aiConfidence * 100)}%</p>
                                </div>
                                <div className=" rounded-lg p-3">
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
                                <div className=" rounded-lg p-3">
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

                              {/* VirusTotal Results */}
                              {result.virusTotal && result.virusTotal.stats && (result.virusTotal.stats.malicious > 0 || result.virusTotal.stats.suspicious > 0) && (
                                <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-3">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Database className="w-4 h-4 text-blue-400" />
                                    <p className="text-gray-200 text-xs font-medium">VirusTotal Security Scan</p>
                                    <span className="ml-auto text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                                      {result.virusTotal.stats.total} engines
                                    </span>
                                  </div>
                                  
                                  <div className="grid grid-cols-4 gap-2 mb-3">
                                    <div className="bg-blue-500/10 rounded p-2 text-center">
                                      <div className="text-lg font-bold text-red-400">
                                        {result.virusTotal.stats.malicious}
                                      </div>
                                      <div className="text-[10px] text-gray-400">Độc hại</div>
                                    </div>
                                    <div className="bg-blue-500/10 rounded p-2 text-center">
                                      <div className="text-lg font-bold text-yellow-400">
                                        {result.virusTotal.stats.suspicious}
                                      </div>
                                      <div className="text-[10px] text-gray-400">Đáng ngờ</div>
                                    </div>
                                    <div className="bg-blue-500/10 rounded p-2 text-center">
                                      <div className="text-lg font-bold text-green-400">
                                        {result.virusTotal.stats.harmless}
                                      </div>
                                      <div className="text-[10px] text-gray-400">An toàn</div>
                                    </div>
                                    <div className="bg-blue-500/10 rounded p-2 text-center">
                                      <div className="text-lg font-bold text-gray-400">
                                        {result.virusTotal.stats.undetected}
                                      </div>
                                      <div className="text-[10px] text-gray-400">Chưa xác định</div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 text-xs">
                                    {result.virusTotal.stats.malicious > 0 ? (
                                      <>
                                        <ShieldX className="w-4 h-4 text-red-400" />
                                        <span className="text-red-400 font-medium">
                                          ⚠️ {result.virusTotal.stats.malicious} antivirus phát hiện mối đe dọa!
                                        </span>
                                      </>
                                    ) : result.virusTotal.stats.suspicious > 0 ? (
                                      <>
                                        <ShieldAlert className="w-4 h-4 text-yellow-400" />
                                        <span className="text-yellow-400 font-medium">
                                          ⚠️ {result.virusTotal.stats.suspicious} antivirus đánh dấu đáng ngờ
                                        </span>
                                      </>
                                    ) : null}
                                  </div>
                                </div>
                              )}

                              {/* Website Info */}
                              {result.websiteInfo?.title && (
                                <div className=" rounded-lg p-3">
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
                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                                  <p className="text-blue-400 text-xs mb-2 font-medium">✓ Yếu tố tin cậy</p>
                                  <ul className="space-y-1">
                                    {result.websiteInfo.trustFactors.map((factor, i) => (
                                      <li key={i} className="text-blue-300 text-xs flex items-start gap-2">
                                        <span>•</span>{factor}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Analysis Reasons - Enhanced UI */}
                              {result.reasons.length > 0 && (() => {
                                // Parse reasons into categories
                                const parseReasons = (reasons: string[]) => {
                                  const categories: {
                                    loaiWebsite: string | null;
                                    chucNang: string | null;
                                    phanTichDomain: string | null;
                                    baoMat: string | null;
                                    ketLuan: string | null;
                                    other: string[];
                                  } = {
                                    loaiWebsite: null,
                                    chucNang: null,
                                    phanTichDomain: null,
                                    baoMat: null,
                                    ketLuan: null,
                                    other: []
                                  };
                                  
                                  reasons.forEach(reason => {
                                    const cleanReason = reason.replace(/[\uD800-\uDFFF]./g, '').replace(/[\u2600-\u27BF]/g, '').trim();
                                    
                                    if (cleanReason.toLowerCase().startsWith('loại website:') || cleanReason.toLowerCase().startsWith('loai website:')) {
                                      categories.loaiWebsite = cleanReason.replace(/^loại website:|^loai website:/i, '').trim();
                                    } else if (cleanReason.toLowerCase().startsWith('chức năng:') || cleanReason.toLowerCase().startsWith('chuc nang:')) {
                                      categories.chucNang = cleanReason.replace(/^chức năng:|^chuc nang:/i, '').trim();
                                    } else if (cleanReason.toLowerCase().startsWith('phân tích domain:') || cleanReason.toLowerCase().startsWith('phan tich domain:')) {
                                      categories.phanTichDomain = cleanReason.replace(/^phân tích domain:|^phan tich domain:/i, '').trim();
                                    } else if (cleanReason.toLowerCase().startsWith('bảo mật:') || cleanReason.toLowerCase().startsWith('bao mat:')) {
                                      categories.baoMat = cleanReason.replace(/^bảo mật:|^bao mat:/i, '').trim();
                                    } else if (cleanReason.toLowerCase().startsWith('kết luận:') || cleanReason.toLowerCase().startsWith('ket luan:')) {
                                      categories.ketLuan = cleanReason.replace(/^kết luận:|^ket luan:/i, '').trim();
                                    } else if (cleanReason.trim()) {
                                      categories.other.push(cleanReason);
                                    }
                                  });
                                  
                                  return categories;
                                };
                                
                                const parsed = parseReasons(result.reasons);
                                const hasStructuredData = parsed.loaiWebsite || parsed.chucNang || parsed.phanTichDomain || parsed.baoMat || parsed.ketLuan;
                                
                                return (
                                  <div className="rounded-xl p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                                    <h4 className="text-white text-sm font-semibold mb-4 flex items-center gap-2">
                                      <FileText className="w-4 h-4 text-cyan-400" />
                                      Chi tiết phân tích AI
                                    </h4>
                                    
                                    {hasStructuredData ? (
                                      <div className="space-y-3">
                                        {/* Loại Website */}
                                        {parsed.loaiWebsite && (
                                          <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-lg p-3">
                                            <div className="flex items-start gap-3">
                                              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                                <Globe className="w-4 h-4 text-purple-400" />
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <p className="text-purple-400 text-xs font-medium mb-1">Loại website</p>
                                                <p className="text-gray-200 text-sm leading-relaxed">{parsed.loaiWebsite}</p>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* Chức năng */}
                                        {parsed.chucNang && (
                                          <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-3">
                                            <div className="flex items-start gap-3">
                                              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                                <Zap className="w-4 h-4 text-blue-400" />
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <p className="text-blue-400 text-xs font-medium mb-1">Chức năng</p>
                                                <p className="text-gray-200 text-sm leading-relaxed">{parsed.chucNang}</p>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* Phân tích Domain */}
                                        {parsed.phanTichDomain && (
                                          <div className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-lg p-3">
                                            <div className="flex items-start gap-3">
                                              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                                <Link2 className="w-4 h-4 text-cyan-400" />
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <p className="text-cyan-400 text-xs font-medium mb-1">Phân tích domain</p>
                                                <p className="text-gray-200 text-sm leading-relaxed">{parsed.phanTichDomain}</p>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* Bảo mật */}
                                        {parsed.baoMat && (
                                          <div className={`bg-gradient-to-r ${
                                            parsed.baoMat.toLowerCase().includes('an toàn') || parsed.baoMat.toLowerCase().includes('an toan')
                                              ? 'from-green-500/10 to-green-600/5 border-green-500/20'
                                              : parsed.baoMat.toLowerCase().includes('rủi ro') || parsed.baoMat.toLowerCase().includes('nguy hiểm')
                                              ? 'from-red-500/10 to-red-600/5 border-red-500/20'
                                              : 'from-yellow-500/10 to-yellow-600/5 border-yellow-500/20'
                                          } border rounded-lg p-3`}>
                                            <div className="flex items-start gap-3">
                                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                parsed.baoMat.toLowerCase().includes('an toàn') || parsed.baoMat.toLowerCase().includes('an toan')
                                                  ? 'bg-green-500/20'
                                                  : parsed.baoMat.toLowerCase().includes('rủi ro') || parsed.baoMat.toLowerCase().includes('nguy hiểm')
                                                  ? 'bg-red-500/20'
                                                  : 'bg-yellow-500/20'
                                              }`}>
                                                <Shield className={`w-4 h-4 ${
                                                  parsed.baoMat.toLowerCase().includes('an toàn') || parsed.baoMat.toLowerCase().includes('an toan')
                                                    ? 'text-green-400'
                                                    : parsed.baoMat.toLowerCase().includes('rủi ro') || parsed.baoMat.toLowerCase().includes('nguy hiểm')
                                                    ? 'text-red-400'
                                                    : 'text-yellow-400'
                                                }`} />
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <p className={`text-xs font-medium mb-1 ${
                                                  parsed.baoMat.toLowerCase().includes('an toàn') || parsed.baoMat.toLowerCase().includes('an toan')
                                                    ? 'text-green-400'
                                                    : parsed.baoMat.toLowerCase().includes('rủi ro') || parsed.baoMat.toLowerCase().includes('nguy hiểm')
                                                    ? 'text-red-400'
                                                    : 'text-yellow-400'
                                                }`}>Bảo mật</p>
                                                <p className="text-gray-200 text-sm leading-relaxed">{parsed.baoMat}</p>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* Kết luận */}
                                        {parsed.ketLuan && (
                                          <div className={`bg-gradient-to-r ${
                                            result.score <= 30
                                              ? 'from-green-500/15 to-green-600/5 border-green-500/30'
                                              : result.score <= 60
                                              ? 'from-yellow-500/15 to-yellow-600/5 border-yellow-500/30'
                                              : 'from-red-500/15 to-red-600/5 border-red-500/30'
                                          } border rounded-lg p-4`}>
                                            <div className="flex items-start gap-3">
                                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                                result.score <= 30
                                                  ? 'bg-green-500/20'
                                                  : result.score <= 60
                                                  ? 'bg-yellow-500/20'
                                                  : 'bg-red-500/20'
                                              }`}>
                                                {result.score <= 30 ? (
                                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                                ) : result.score <= 60 ? (
                                                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                                ) : (
                                                  <XCircle className="w-5 h-5 text-red-400" />
                                                )}
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <p className={`text-xs font-semibold mb-1 ${
                                                  result.score <= 30
                                                    ? 'text-green-400'
                                                    : result.score <= 60
                                                    ? 'text-yellow-400'
                                                    : 'text-red-400'
                                                }`}>Kết luận</p>
                                                <p className="text-gray-100 text-sm leading-relaxed font-medium">{parsed.ketLuan}</p>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        
                                        {/* Other reasons */}
                                        {parsed.other.length > 0 && (
                                          <div className="bg-gray-800/30 border border-gray-700/30 rounded-lg p-3">
                                            <p className="text-gray-400 text-xs font-medium mb-2">Thông tin khác</p>
                                            <div className="space-y-2">
                                              {parsed.other.map((reason, i) => (
                                                <div key={i} className="flex items-start gap-2">
                                                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 flex-shrink-0" />
                                                  <p className="text-gray-300 text-sm leading-relaxed">{reason}</p>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      /* Fallback for unstructured reasons */
                                      <div className="space-y-2">
                                        {result.reasons.map((reason, i) => {
                                          const cleanReason = reason.replace(/[\uD800-\uDFFF]./g, '').replace(/[\u2600-\u27BF]/g, '').trim();
                                          const isDanger = cleanReason.toLowerCase().includes('lừa đảo') || cleanReason.toLowerCase().includes('nguy hiểm') || cleanReason.toLowerCase().includes('rủi ro cao');
                                          const isWarning = cleanReason.toLowerCase().includes('đáng ngờ') || cleanReason.toLowerCase().includes('cẩn thận');
                                          const isSafe = cleanReason.toLowerCase().includes('an toàn') || cleanReason.toLowerCase().includes('tin cậy');
                                          
                                          return (
                                            <div key={i} className={`p-3 rounded-lg border ${
                                              isDanger ? 'bg-red-500/10 border-red-500/20' :
                                              isWarning ? 'bg-yellow-500/10 border-yellow-500/20' :
                                              isSafe ? 'bg-green-500/10 border-green-500/20' :
                                              'bg-blue-500/10 border-blue-500/20'
                                            }`}>
                                              <div className="flex items-start gap-3">
                                                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                                                  isDanger ? 'bg-red-400' :
                                                  isWarning ? 'bg-yellow-400' :
                                                  isSafe ? 'bg-green-400' :
                                                  'bg-blue-400'
                                                }`} />
                                                <p className="text-gray-200 text-sm leading-relaxed flex-1">{cleanReason}</p>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}

                              {/* External Sources */}
                              {result.externalSources && result.externalSources.length > 0 && (
                                <div className=" rounded-lg p-3">
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
                                <div className=" rounded-lg p-3">
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
                  <div className="bg-blue-900/10 rounded-xl border border-gray-800 overflow-hidden">
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
                  <div className="bg-blue-900/10 rounded-xl border border-gray-800 overflow-hidden">
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
