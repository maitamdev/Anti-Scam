'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Newspaper, ArrowLeft, AlertTriangle, CheckCircle, XCircle, Search,
  Loader2, ExternalLink, TrendingUp, Shield, Clock, Hash, Info,
  Link2, FileText, Eye, History, Sparkles, Globe
} from 'lucide-react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import GlowingCard from '../../components/GlowingCard'
import { useTranslation } from '../../lib/i18n/LanguageContext'

interface CheckResult {
  score: number
  level: 'likely_real' | 'uncertain' | 'likely_fake'
  indicators: { label: string; type: 'good' | 'bad' | 'neutral'; icon?: any }[]
  tips: string[]
  analysis: {
    contentLength: number
    hasUrl: boolean
    hasDates: boolean
    hasSources: boolean
    suspiciousCount: number
  }
}

interface HistoryItem {
  id: string
  url: string
  content: string
  score: number
  level: string
  timestamp: number
}

const trustedDomains = [
  // Vietnamese news
  'vnexpress.net', 'tuoitre.vn', 'thanhnien.vn', 'dantri.com.vn', 'vietnamnet.vn',
  'nhandan.vn', 'baochinhphu.vn', 'vtv.vn', 'vov.vn', 'zing.vn', 'kenh14.vn',
  'cafef.vn', 'cafebiz.vn', 'genk.vn', 'soha.vn', 'eva.vn', 'afamily.vn',
  'zingnews.vn', '24h.com.vn', 'tienphong.vn', 'baomoi.com', 'nguoiduatin.vn',
  // International news
  'bbc.com', 'reuters.com', 'ap.org', 'nytimes.com', 'theguardian.com',
  'washingtonpost.com', 'cnn.com', 'forbes.com', 'bloomberg.com', 'aljazeera.com',
  'npr.org', 'time.com', 'newsweek.com', 'economist.com', 'ft.com'
]

const suspiciousPatterns = [
  { pattern: /SHOCK|SỐC|KINH HOÀNG|KHÔNG THỂ TIN|BẤT NGỜ|CHOÁNG|RÚNG ĐỘNG/i, label: 'Tiêu đề giật gân', labelEn: 'Clickbait headline' },
  { pattern: /100%|CHẮC CHẮN|TUYỆT ĐỐI|KHÔNG AI BIẾT|CHẮC CHẮN 100%/i, label: 'Khẳng định tuyệt đối', labelEn: 'Absolute claims' },
  { pattern: /CHIA SẺ NGAY|SHARE GẤP|LAN TRUYỀN|ĐỪNG BỎ LỠ|NHANH TAY/i, label: 'Kêu gọi chia sẻ gấp', labelEn: 'Urgency to share' },
  { pattern: /BÍ MẬT|BỊ CHE GIẤU|CHÍNH PHỦ GIẤU|ÂM MƯU|BỊ KIỂM DUYỆT/i, label: 'Thuyết âm mưu', labelEn: 'Conspiracy theory' },
  { pattern: /CHỮA BỆNH|THẦN DƯỢC|KHỎI NGAY|CHỮA KHỎI|PHƯƠNG PHÁP KỲ DIỆU/i, label: 'Quảng cáo y tế sai sự thật', labelEn: 'False medical claims' },
  { pattern: /KIẾM TIỀN|GIÀU NÊN|THU NHẬP|TRIỆU\/NGÀY|KHÔNG CẦN VỐN/i, label: 'Lừa đảo tài chính', labelEn: 'Financial scam' },
  { pattern: /MIỄN PHÍ|FREE|TẶNG|QUÀ TẶNG|NHẬN NGAY/i, label: 'Mồi nhử miễn phí', labelEn: 'Free offer bait' },
]

export default function FakeNewsPage() {
  const { language } = useTranslation()
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<CheckResult | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [showHistory, setShowHistory] = useState(false)

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('fakeNewsHistory')
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load history', e)
      }
    }
  }, [])

  const saveToHistory = (url: string, content: string, score: number, level: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      url,
      content: content.substring(0, 100),
      score,
      level,
      timestamp: Date.now()
    }
    const newHistory = [newItem, ...history].slice(0, 10) // Keep last 10
    setHistory(newHistory)
    localStorage.setItem('fakeNewsHistory', JSON.stringify(newHistory))
  }

  const checkContent = () => {
    if (!content.trim() && !url.trim()) return

    setIsChecking(true)
    setResult(null)

    setTimeout(() => {
      const indicators: { label: string; type: 'good' | 'bad' | 'neutral'; icon?: any }[] = []
      let score = 50 // Start neutral
      let suspiciousCount = 0

      // Check URL if provided
      let hasValidUrl = false
      if (url.trim()) {
        try {
          const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
          const domain = urlObj.hostname.replace('www.', '')
          hasValidUrl = true

          // Check HTTPS
          if (urlObj.protocol === 'https:') {
            indicators.push({
              label: language === 'vi' ? 'Sử dụng HTTPS bảo mật' : 'Uses secure HTTPS',
              type: 'good',
              icon: Shield
            })
            score += 5
          } else {
            indicators.push({
              label: language === 'vi' ? 'Không dùng HTTPS' : 'No HTTPS',
              type: 'bad',
              icon: AlertTriangle
            })
            score -= 10
          }

          if (trustedDomains.some(d => domain.includes(d))) {
            indicators.push({
              label: language === 'vi' ? `✓ Nguồn uy tín: ${domain}` : `✓ Trusted source: ${domain}`,
              type: 'good',
              icon: CheckCircle
            })
            score += 30
          } else {
            indicators.push({
              label: language === 'vi' ? `⚠ Nguồn chưa xác minh: ${domain}` : `⚠ Unverified source: ${domain}`,
              type: 'neutral',
              icon: Globe
            })
            score -= 5
          }

          // Check for suspicious TLDs
          if (/\.(xyz|top|club|online|site|info)$/i.test(domain)) {
            indicators.push({
              label: language === 'vi' ? 'Tên miền đáng ngờ' : 'Suspicious domain extension',
              type: 'bad',
              icon: AlertTriangle
            })
            score -= 15
            suspiciousCount++
          }
        } catch {
          indicators.push({
            label: language === 'vi' ? '✗ URL không hợp lệ' : '✗ Invalid URL',
            type: 'bad',
            icon: XCircle
          })
          score -= 10
        }
      }

      // Check content patterns
      const textToCheck = content + ' ' + url

      suspiciousPatterns.forEach(({ pattern, label, labelEn }) => {
        if (pattern.test(textToCheck)) {
          indicators.push({
            label: language === 'vi' ? `✗ ${label}` : `✗ ${labelEn}`,
            type: 'bad',
            icon: XCircle
          })
          score -= 15
          suspiciousCount++
        }
      })

      // Check content length
      const contentLength = content.trim().length
      if (contentLength > 0) {
        if (contentLength < 50) {
          indicators.push({
            label: language === 'vi' ? 'Nội dung quá ngắn' : 'Content too short',
            type: 'bad',
            icon: FileText
          })
          score -= 10
        } else if (contentLength > 200) {
          indicators.push({
            label: language === 'vi' ? 'Nội dung đầy đủ' : 'Sufficient content',
            type: 'good',
            icon: FileText
          })
          score += 5
        }
      }

      // Check for sources/citations
      let hasSources = false
      if (/theo|nguồn|source|according to|cited|trích dẫn/i.test(content)) {
        indicators.push({
          label: language === 'vi' ? '✓ Có trích dẫn nguồn' : '✓ Has source citation',
          type: 'good',
          icon: Link2
        })
        score += 15
        hasSources = true
      }

      // Check for specific dates
      let hasDates = false
      if (/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|ngày \d{1,2}|tháng \d{1,2}|năm \d{4}/i.test(content)) {
        indicators.push({
          label: language === 'vi' ? '✓ Có ngày tháng cụ thể' : '✓ Has specific dates',
          type: 'good',
          icon: Clock
        })
        score += 10
        hasDates = true
      }

      // Check for excessive caps
      const capsRatio = (content.match(/[A-ZÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ]/g) || []).length / content.length
      if (capsRatio > 0.3 && content.length > 20) {
        indicators.push({
          label: language === 'vi' ? '✗ Quá nhiều chữ in hoa' : '✗ Excessive capitalization',
          type: 'bad',
          icon: AlertTriangle
        })
        score -= 10
        suspiciousCount++
      }

      // Check for emotional language
      if (/!!!+|!!!+|\?\?\?+|😱|🔥|💥|⚠️⚠️|‼️/i.test(content)) {
        indicators.push({
          label: language === 'vi' ? '✗ Ngôn ngữ cảm xúc mạnh' : '✗ Strong emotional language',
          type: 'bad',
          icon: AlertTriangle
        })
        score -= 10
        suspiciousCount++
      }

      // Check for excessive emojis
      const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|[\uD83C-\uD83E][\uDC00-\uDFFF]/g
      const emojiCount = (content.match(emojiRegex) || []).length
      if (emojiCount > 5) {
        indicators.push({
          label: language === 'vi' ? 'Quá nhiều emoji' : 'Too many emojis',
          type: 'bad',
          icon: Sparkles
        })
        score -= 5
        suspiciousCount++
      }

      // Check for numbers/statistics without sources
      if (/\d+%|\d+\s*(người|ca|trường hợp)/i.test(content) && !hasSources) {
        indicators.push({
          label: language === 'vi' ? 'Số liệu không có nguồn' : 'Statistics without source',
          type: 'neutral',
          icon: Hash
        })
        score -= 5
      }

      // Bonus for longer, well-structured content
      if (contentLength > 300 && hasSources && hasDates) {
        indicators.push({
          label: language === 'vi' ? '✓ Nội dung có cấu trúc tốt' : '✓ Well-structured content',
          type: 'good',
          icon: CheckCircle
        })
        score += 10
      }

      // Normalize score
      score = Math.max(0, Math.min(100, score))

      const level: 'likely_real' | 'uncertain' | 'likely_fake' = score >= 70 ? 'likely_real' : score >= 40 ? 'uncertain' : 'likely_fake'

      const tips = [
        language === 'vi' ? 'Kiểm tra nguồn gốc bài viết' : 'Verify the source of the article',
        language === 'vi' ? 'Tìm kiếm thông tin tương tự từ nhiều nguồn' : 'Search for similar info from multiple sources',
        language === 'vi' ? 'Kiểm tra ngày đăng bài và cập nhật' : 'Check publication and update dates',
        language === 'vi' ? 'Xác minh các số liệu và trích dẫn' : 'Verify statistics and citations',
        language === 'vi' ? 'Tìm hiểu về tác giả bài viết' : 'Research the article author',
      ]

      const analysis = {
        contentLength,
        hasUrl: hasValidUrl,
        hasDates,
        hasSources,
        suspiciousCount
      }

      const finalResult = { score, level, indicators, tips, analysis }
      setResult(finalResult)
      setIsChecking(false)

      // Save to history
      saveToHistory(url, content, score, level)
    }, 1200)
  }

  const getLevelConfig = (level: string) => {
    switch (level) {
      case 'likely_real':
        return {
          icon: CheckCircle,
          color: 'text-green-400',
          bg: 'bg-green-500/20',
          border: 'border-green-500/30',
          gradient: 'from-green-500 to-emerald-500',
          label: language === 'vi' ? 'Có vẻ đáng tin' : 'Likely Credible'
        }
      case 'uncertain':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-400',
          bg: 'bg-yellow-500/20',
          border: 'border-yellow-500/30',
          gradient: 'from-yellow-500 to-orange-500',
          label: language === 'vi' ? 'Cần xác minh thêm' : 'Needs Verification'
        }
      case 'likely_fake':
        return {
          icon: XCircle,
          color: 'text-red-400',
          bg: 'bg-red-500/20',
          border: 'border-red-500/30',
          gradient: 'from-red-500 to-pink-500',
          label: language === 'vi' ? 'Có dấu hiệu tin giả' : 'Likely Fake'
        }
      default:
        return {
          icon: AlertTriangle,
          color: 'text-gray-400',
          bg: 'bg-gray-500/20',
          border: 'border-gray-500/30',
          gradient: 'from-gray-500 to-gray-600',
          label: ''
        }
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link href="/tools" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {language === 'vi' ? 'Quay lại' : 'Back'}
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <Newspaper className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-medium">Fact Checking</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">{language === 'vi' ? 'Kiểm tra ' : 'Check '}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
                {language === 'vi' ? 'Tin giả' : 'Fake News'}
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {language === 'vi'
                ? 'Phân tích nội dung để phát hiện dấu hiệu tin giả, tin sai sự thật'
                : 'Analyze content to detect signs of fake news and misinformation'}
            </p>
          </motion.div>

          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlowingCard glowColor="rgba(239, 68, 68, 0.3)">
              <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
                {/* URL Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'vi' ? 'Link bài viết (tùy chọn)' : 'Article URL (optional)'}
                  </label>
                  <div className="relative">
                    <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com/article..."
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Content Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'vi' ? 'Nội dung cần kiểm tra' : 'Content to check'}
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={language === 'vi' ? 'Dán tiêu đề hoặc nội dung bài viết vào đây...' : 'Paste article title or content here...'}
                    className="w-full h-40 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 resize-none transition-colors"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      <History className="w-4 h-4" />
                      {language === 'vi' ? 'Lịch sử' : 'History'} ({history.length})
                    </button>
                    <button
                      onClick={checkContent}
                      disabled={isChecking || (!content.trim() && !url.trim())}
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all shadow-lg shadow-red-500/25 flex items-center gap-2"
                    >
                      {isChecking ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {language === 'vi' ? 'Đang phân tích...' : 'Analyzing...'}
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5" />
                          {language === 'vi' ? 'Kiểm tra' : 'Check'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </GlowingCard>
          </motion.div>

          {/* History Panel */}
          <AnimatePresence>
            {showHistory && history.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {language === 'vi' ? 'Lịch sử kiểm tra' : 'Check History'}
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setUrl(item.url)
                          setContent(item.content)
                          setShowHistory(false)
                        }}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-medium ${item.level === 'likely_real' ? 'text-green-400' :
                            item.level === 'uncertain' ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                            {item.score}/100
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 truncate">{item.content || item.url}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 space-y-6"
              >
                {/* Score Card */}
                <div className={`bg-gradient-to-r ${getLevelConfig(result.level).gradient} p-0.5 rounded-2xl`}>
                  <div className="bg-gray-900 rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                      {(() => {
                        const config = getLevelConfig(result.level)
                        const Icon = config.icon
                        return <Icon className={`w-10 h-10 ${config.color}`} />
                      })()}
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold ${getLevelConfig(result.level).color}`}>
                          {getLevelConfig(result.level).label}
                        </h3>
                        <p className="text-gray-400">
                          {language === 'vi' ? `Điểm tin cậy: ${result.score}/100` : `Credibility score: ${result.score}/100`}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-5xl font-bold ${getLevelConfig(result.level).color}`}>
                          {result.score}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.score}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${getLevelConfig(result.level).gradient}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Analysis Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <FileText className="w-4 h-4" />
                      <span className="text-xs">{language === 'vi' ? 'Độ dài' : 'Length'}</span>
                    </div>
                    <p className="text-xl font-bold text-white">{result.analysis.contentLength}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <Eye className="w-4 h-4" />
                      <span className="text-xs">{language === 'vi' ? 'Phát hiện' : 'Detected'}</span>
                    </div>
                    <p className="text-xl font-bold text-white">{result.indicators.length}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs">{language === 'vi' ? 'Đáng ngờ' : 'Suspicious'}</span>
                    </div>
                    <p className="text-xl font-bold text-red-400">{result.analysis.suspiciousCount}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs">{language === 'vi' ? 'Tốt' : 'Good'}</span>
                    </div>
                    <p className="text-xl font-bold text-green-400">
                      {result.indicators.filter(i => i.type === 'good').length}
                    </p>
                  </div>
                </div>

                {/* Indicators */}
                {result.indicators.length > 0 && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      {language === 'vi' ? 'Phân tích chi tiết' : 'Detailed Analysis'}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {result.indicators.map((ind, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`flex items-start gap-3 p-3 rounded-lg ${ind.type === 'good' ? 'bg-green-500/10' :
                            ind.type === 'bad' ? 'bg-red-500/10' : 'bg-yellow-500/10'
                            }`}
                        >
                          {ind.type === 'good' && <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />}
                          {ind.type === 'bad' && <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
                          {ind.type === 'neutral' && <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />}
                          <span className={`text-sm ${ind.type === 'good' ? 'text-green-300' :
                            ind.type === 'bad' ? 'text-red-300' : 'text-yellow-300'
                            }`}>
                            {ind.label}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tips */}
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
                  <h3 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    {language === 'vi' ? 'Gợi ý xác minh' : 'Verification Tips'}
                  </h3>
                  <ul className="space-y-2">
                    {result.tips.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fact-check links */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-300 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    {language === 'vi' ? '🔍 Trang kiểm chứng tin tức' : '🔍 Fact-checking websites'}
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <a
                      href="https://factcheck.afp.com/afp-vietnam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-sm text-gray-300 transition-all hover:scale-105"
                    >
                      <span className="font-medium">AFP Fact Check</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.snopes.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-sm text-gray-300 transition-all hover:scale-105"
                    >
                      <span className="font-medium">Snopes</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.factcheck.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-sm text-gray-300 transition-all hover:scale-105"
                    >
                      <span className="font-medium">FactCheck.org</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Warning */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-5"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-300">
                {language === 'vi'
                  ? 'Công cụ này chỉ mang tính tham khảo. Luôn kiểm tra từ nhiều nguồn đáng tin cậy trước khi chia sẻ thông tin.'
                  : 'This tool is for reference only. Always verify from multiple trusted sources before sharing information.'}
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
