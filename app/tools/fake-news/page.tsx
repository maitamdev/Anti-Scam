'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Newspaper, ArrowLeft, AlertTriangle, CheckCircle, XCircle, Search, Loader2, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useTranslation } from '../../lib/i18n/LanguageContext'

interface CheckResult {
  score: number
  level: 'likely_real' | 'uncertain' | 'likely_fake'
  indicators: { label: string; type: 'good' | 'bad' | 'neutral' }[]
  tips: string[]
}

const trustedDomains = [
  'vnexpress.net', 'tuoitre.vn', 'thanhnien.vn', 'dantri.com.vn', 'vietnamnet.vn',
  'nhandan.vn', 'baochinhphu.vn', 'vtv.vn', 'vov.vn', 'zing.vn', 'kenh14.vn',
  'cafef.vn', 'cafebiz.vn', 'genk.vn', 'soha.vn', 'eva.vn', 'afamily.vn',
  'bbc.com', 'reuters.com', 'ap.org', 'nytimes.com', 'theguardian.com',
  'washingtonpost.com', 'cnn.com', 'forbes.com', 'bloomberg.com'
]

const suspiciousPatterns = [
  { pattern: /SHOCK|SỐC|KINH HOÀNG|KHÔNG THỂ TIN|BẤT NGỜ/i, label: 'Tiêu đề giật gân' },
  { pattern: /100%|CHẮC CHẮN|TUYỆT ĐỐI|KHÔNG AI BIẾT/i, label: 'Khẳng định tuyệt đối' },
  { pattern: /CHIA SẺ NGAY|SHARE GẤP|LAN TRUYỀN/i, label: 'Kêu gọi chia sẻ gấp' },
  { pattern: /BÍ MẬT|BỊ CHE GIẤU|CHÍNH PHỦ GIẤU/i, label: 'Thuyết âm mưu' },
  { pattern: /CHỮA BỆNH|THẦN DƯỢC|KHỎI NGAY/i, label: 'Quảng cáo y tế sai sự thật' },
]

export default function FakeNewsPage() {
  const { language } = useTranslation()
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<CheckResult | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const checkContent = () => {
    if (!content.trim() && !url.trim()) return

    setIsChecking(true)
    setResult(null)

    setTimeout(() => {
      const indicators: { label: string; type: 'good' | 'bad' | 'neutral' }[] = []
      let score = 50 // Start neutral

      // Check URL if provided
      if (url.trim()) {
        try {
          const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
          const domain = urlObj.hostname.replace('www.', '')
          
          if (trustedDomains.some(d => domain.includes(d))) {
            indicators.push({ 
              label: language === 'vi' ? `Nguồn uy tín: ${domain}` : `Trusted source: ${domain}`, 
              type: 'good' 
            })
            score += 30
          } else {
            indicators.push({ 
              label: language === 'vi' ? `Nguồn chưa xác minh: ${domain}` : `Unverified source: ${domain}`, 
              type: 'neutral' 
            })
          }
        } catch {
          indicators.push({ 
            label: language === 'vi' ? 'URL không hợp lệ' : 'Invalid URL', 
            type: 'bad' 
          })
          score -= 10
        }
      }

      // Check content patterns
      const textToCheck = content + ' ' + url
      
      suspiciousPatterns.forEach(({ pattern, label }) => {
        if (pattern.test(textToCheck)) {
          indicators.push({ 
            label: language === 'vi' ? label : label, 
            type: 'bad' 
          })
          score -= 15
        }
      })

      // Check for sources/citations
      if (/theo|nguồn|source|according to/i.test(content)) {
        indicators.push({ 
          label: language === 'vi' ? 'Có trích dẫn nguồn' : 'Has source citation', 
          type: 'good' 
        })
        score += 10
      }

      // Check for specific dates
      if (/\d{1,2}\/\d{1,2}\/\d{2,4}|\d{1,2}-\d{1,2}-\d{2,4}|ngày \d{1,2}/i.test(content)) {
        indicators.push({ 
          label: language === 'vi' ? 'Có ngày tháng cụ thể' : 'Has specific dates', 
          type: 'good' 
        })
        score += 5
      }

      // Check for excessive caps
      const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length
      if (capsRatio > 0.3 && content.length > 20) {
        indicators.push({ 
          label: language === 'vi' ? 'Quá nhiều chữ in hoa' : 'Excessive capitalization', 
          type: 'bad' 
        })
        score -= 10
      }

      // Check for emotional language
      if (/!!!|!!!|\?\?\?|😱|🔥|💥|⚠️⚠️/i.test(content)) {
        indicators.push({ 
          label: language === 'vi' ? 'Ngôn ngữ cảm xúc mạnh' : 'Strong emotional language', 
          type: 'bad' 
        })
        score -= 10
      }

      // Normalize score
      score = Math.max(0, Math.min(100, score))

      const level = score >= 70 ? 'likely_real' : score >= 40 ? 'uncertain' : 'likely_fake'

      const tips = [
        language === 'vi' ? 'Kiểm tra nguồn gốc bài viết' : 'Verify the source of the article',
        language === 'vi' ? 'Tìm kiếm thông tin tương tự từ nhiều nguồn' : 'Search for similar info from multiple sources',
        language === 'vi' ? 'Kiểm tra ngày đăng bài' : 'Check the publication date',
      ]

      setResult({ score, level, indicators, tips })
      setIsChecking(false)
    }, 800)
  }

  const getLevelConfig = (level: string) => {
    switch (level) {
      case 'likely_real':
        return { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30', label: language === 'vi' ? 'Có vẻ đáng tin' : 'Likely Credible' }
      case 'uncertain':
        return { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', label: language === 'vi' ? 'Cần xác minh thêm' : 'Needs Verification' }
      case 'likely_fake':
        return { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', label: language === 'vi' ? 'Có dấu hiệu tin giả' : 'Likely Fake' }
      default:
        return { icon: AlertTriangle, color: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/30', label: '' }
    }
  }


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link href="/tools" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {language === 'vi' ? 'Quay lại' : 'Back'}
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-2xl mb-4">
              <Newspaper className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'vi' ? 'Kiểm tra Tin giả' : 'Fake News Checker'}
            </h1>
            <p className="text-gray-400">
              {language === 'vi' 
                ? 'Phân tích nội dung để phát hiện dấu hiệu tin giả'
                : 'Analyze content to detect signs of fake news'}
            </p>
          </motion.div>

          {/* URL Input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">
              {language === 'vi' ? 'Link bài viết (tùy chọn)' : 'Article URL (optional)'}
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/article..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
            />
          </motion.div>

          {/* Content Input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">
              {language === 'vi' ? 'Nội dung cần kiểm tra' : 'Content to check'}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={language === 'vi' ? 'Dán tiêu đề hoặc nội dung bài viết vào đây...' : 'Paste article title or content here...'}
              className="w-full h-40 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 resize-none"
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={checkContent}
                disabled={isChecking || (!content.trim() && !url.trim())}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-colors flex items-center gap-2"
              >
                {isChecking ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {language === 'vi' ? 'Đang phân tích...' : 'Analyzing...'}
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    {language === 'vi' ? 'Kiểm tra' : 'Check'}
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Result */}
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Score */}
              <div className={`p-4 rounded-xl border ${getLevelConfig(result.level).bg} ${getLevelConfig(result.level).border}`}>
                <div className="flex items-center gap-3">
                  {(() => {
                    const config = getLevelConfig(result.level)
                    const Icon = config.icon
                    return <Icon className={`w-8 h-8 ${config.color}`} />
                  })()}
                  <div className="flex-1">
                    <p className={`font-bold text-lg ${getLevelConfig(result.level).color}`}>
                      {getLevelConfig(result.level).label}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {language === 'vi' ? `Điểm tin cậy: ${result.score}/100` : `Credibility score: ${result.score}/100`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Indicators */}
              {result.indicators.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="font-semibold mb-3">{language === 'vi' ? 'Phân tích chi tiết' : 'Detailed Analysis'}</h3>
                  <div className="space-y-2">
                    {result.indicators.map((ind, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        {ind.type === 'good' && <CheckCircle className="w-4 h-4 text-green-400" />}
                        {ind.type === 'bad' && <XCircle className="w-4 h-4 text-red-400" />}
                        {ind.type === 'neutral' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                        <span className={ind.type === 'good' ? 'text-green-300' : ind.type === 'bad' ? 'text-red-300' : 'text-yellow-300'}>
                          {ind.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <h3 className="font-semibold text-blue-400 mb-2">{language === 'vi' ? 'Gợi ý xác minh' : 'Verification Tips'}</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  {result.tips.map((t, i) => <li key={i}>• {t}</li>)}
                </ul>
              </div>

              {/* Fact-check links */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <h3 className="font-semibold text-gray-300 mb-3">{language === 'vi' ? '🔍 Trang kiểm chứng tin tức' : '🔍 Fact-checking websites'}</h3>
                <div className="flex flex-wrap gap-2">
                  <a href="https://factcheck.afp.com/afp-vietnam" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors">
                    AFP Fact Check <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="https://www.snopes.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors">
                    Snopes <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="https://www.factcheck.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors">
                    FactCheck.org <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Warning */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
            <p className="text-sm text-yellow-300">
              ⚠️ {language === 'vi' 
                ? 'Công cụ này chỉ mang tính tham khảo. Luôn kiểm tra từ nhiều nguồn đáng tin cậy trước khi chia sẻ thông tin.'
                : 'This tool is for reference only. Always verify from multiple trusted sources before sharing information.'}
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
