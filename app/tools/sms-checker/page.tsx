'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, ArrowLeft, AlertTriangle, CheckCircle, XCircle, Shield, Loader2, Copy } from 'lucide-react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useTranslation } from '../../lib/i18n/LanguageContext'

interface CheckResult {
  score: number
  level: 'safe' | 'suspicious' | 'scam'
  indicators: { label: string; type: 'good' | 'bad' | 'neutral' }[]
  extractedUrls: string[]
  extractedPhones: string[]
}

const scamPatterns = [
  { pattern: /trúng thưởng|trung thuong|won prize|congratulations/i, label: 'Thông báo trúng thưởng', weight: 30 },
  { pattern: /OTP|mã xác nhận|verification code/i, label: 'Yêu cầu OTP', weight: 25 },
  { pattern: /tài khoản.*bị khóa|account.*locked|suspended/i, label: 'Cảnh báo khóa tài khoản', weight: 25 },
  { pattern: /click.*link|nhấn.*link|bấm.*link/i, label: 'Yêu cầu click link', weight: 20 },
  { pattern: /chuyển.*tiền|transfer.*money|gửi.*tiền/i, label: 'Yêu cầu chuyển tiền', weight: 30 },
  { pattern: /khẩn cấp|urgent|gấp|ngay lập tức|immediately/i, label: 'Tạo áp lực thời gian', weight: 20 },
  { pattern: /ngân hàng|bank|vietcombank|bidv|techcombank|vpbank|mbbank/i, label: 'Giả danh ngân hàng', weight: 15 },
  { pattern: /cảnh sát|công an|police|tòa án|court/i, label: 'Giả danh cơ quan chức năng', weight: 25 },
  { pattern: /nợ|debt|phạt|fine|penalty/i, label: 'Đe dọa nợ/phạt', weight: 20 },
  { pattern: /bit\.ly|tinyurl|goo\.gl|short\./i, label: 'Link rút gọn đáng ngờ', weight: 15 },
  { pattern: /\d{10,11}/g, label: 'Số điện thoại trong tin nhắn', weight: 5 },
]

const legitimatePatterns = [
  { pattern: /1900|1800|19001/i, label: 'Số hotline chính thức', weight: -10 },
  { pattern: /mã giao dịch|transaction id|ma giao dich/i, label: 'Có mã giao dịch', weight: -5 },
]

export default function SMSCheckerPage() {
  const { language } = useTranslation()
  const [smsContent, setSmsContent] = useState('')
  const [result, setResult] = useState<CheckResult | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const checkSMS = () => {
    if (!smsContent.trim()) return

    setIsChecking(true)
    setResult(null)

    setTimeout(() => {
      const indicators: { label: string; type: 'good' | 'bad' | 'neutral' }[] = []
      let score = 0

      // Check scam patterns
      scamPatterns.forEach(({ pattern, label, weight }) => {
        if (pattern.test(smsContent)) {
          indicators.push({ label: language === 'vi' ? label : label, type: 'bad' })
          score += weight
        }
      })

      // Check legitimate patterns
      legitimatePatterns.forEach(({ pattern, label, weight }) => {
        if (pattern.test(smsContent)) {
          indicators.push({ label: language === 'vi' ? label : label, type: 'good' })
          score += weight
        }
      })

      // Extract URLs
      const urlRegex = /https?:\/\/[^\s]+|www\.[^\s]+/gi
      const extractedUrls = smsContent.match(urlRegex) || []
      if (extractedUrls.length > 0) {
        indicators.push({ 
          label: language === 'vi' ? `Chứa ${extractedUrls.length} link` : `Contains ${extractedUrls.length} link(s)`, 
          type: 'neutral' 
        })
      }

      // Extract phone numbers
      const phoneRegex = /0\d{9,10}|\+84\d{9,10}/g
      const extractedPhones = smsContent.match(phoneRegex) || []

      // Normalize score
      score = Math.max(0, Math.min(100, score))
      const level = score >= 50 ? 'scam' : score >= 25 ? 'suspicious' : 'safe'

      setResult({ score, level, indicators, extractedUrls, extractedPhones })
      setIsChecking(false)
    }, 500)
  }

  const getLevelConfig = (level: string) => {
    switch (level) {
      case 'safe':
        return { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30', label: language === 'vi' ? 'Có vẻ an toàn' : 'Likely Safe' }
      case 'suspicious':
        return { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', label: language === 'vi' ? 'Đáng ngờ' : 'Suspicious' }
      case 'scam':
        return { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', label: language === 'vi' ? 'Có dấu hiệu lừa đảo' : 'Likely Scam' }
      default:
        return { icon: Shield, color: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/30', label: '' }
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-2xl mb-4">
              <MessageSquare className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'vi' ? 'Kiểm tra SMS Lừa đảo' : 'SMS Scam Checker'}
            </h1>
            <p className="text-gray-400">
              {language === 'vi' 
                ? 'Dán nội dung tin nhắn để phát hiện dấu hiệu lừa đảo'
                : 'Paste message content to detect scam signs'}
            </p>
          </motion.div>

          {/* Input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
            <textarea
              value={smsContent}
              onChange={(e) => setSmsContent(e.target.value)}
              placeholder={language === 'vi' ? 'Dán nội dung tin nhắn SMS vào đây...' : 'Paste SMS content here...'}
              className="w-full h-40 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 resize-none"
            />
            <div className="flex justify-between items-center mt-3">
              <button onClick={() => setSmsContent('')} className="text-gray-400 hover:text-white text-sm transition-colors">
                {language === 'vi' ? 'Xóa' : 'Clear'}
              </button>
              <button
                onClick={checkSMS}
                disabled={isChecking || !smsContent.trim()}
                className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-colors flex items-center gap-2"
              >
                {isChecking ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {language === 'vi' ? 'Đang kiểm tra...' : 'Checking...'}
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    {language === 'vi' ? 'Kiểm tra' : 'Check'}
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Result */}
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Level */}
              <div className={`p-4 rounded-xl border ${getLevelConfig(result.level).bg} ${getLevelConfig(result.level).border}`}>
                <div className="flex items-center gap-3">
                  {(() => {
                    const config = getLevelConfig(result.level)
                    const Icon = config.icon
                    return <Icon className={`w-8 h-8 ${config.color}`} />
                  })()}
                  <div>
                    <p className={`font-bold text-lg ${getLevelConfig(result.level).color}`}>
                      {getLevelConfig(result.level).label}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {language === 'vi' ? `Điểm nguy hiểm: ${result.score}/100` : `Risk score: ${result.score}/100`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Indicators */}
              {result.indicators.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="font-semibold mb-3">{language === 'vi' ? 'Phân tích' : 'Analysis'}</h3>
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

              {/* Extracted URLs */}
              {result.extractedUrls.length > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                  <h3 className="font-semibold text-yellow-400 mb-2">{language === 'vi' ? 'Link trong tin nhắn' : 'Links in message'}</h3>
                  <div className="space-y-2">
                    {result.extractedUrls.map((url, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <code className="flex-1 bg-black/20 rounded px-2 py-1 text-xs text-gray-300 break-all">{url}</code>
                        <Link href={`/scan?url=${encodeURIComponent(url)}`} className="text-xs text-blue-400 hover:text-blue-300">
                          {language === 'vi' ? 'Kiểm tra' : 'Check'}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action */}
              {result.level === 'scam' && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <h3 className="font-semibold text-red-400 mb-2">⚠️ {language === 'vi' ? 'Khuyến nghị' : 'Recommendation'}</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• {language === 'vi' ? 'KHÔNG click vào link trong tin nhắn' : 'DO NOT click links in the message'}</li>
                    <li>• {language === 'vi' ? 'KHÔNG gọi lại số điện thoại lạ' : 'DO NOT call back unknown numbers'}</li>
                    <li>• {language === 'vi' ? 'KHÔNG cung cấp thông tin cá nhân' : 'DO NOT provide personal information'}</li>
                    <li>• {language === 'vi' ? 'Báo cáo tin nhắn spam' : 'Report the spam message'}</li>
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {/* Common scam examples */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <h3 className="font-semibold text-gray-300 mb-3">📱 {language === 'vi' ? 'Các dạng SMS lừa đảo phổ biến' : 'Common SMS scam types'}</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• {language === 'vi' ? '"Bạn đã trúng thưởng 100 triệu, click link để nhận"' : '"You won $10,000, click link to claim"'}</li>
              <li>• {language === 'vi' ? '"Tài khoản ngân hàng của bạn bị khóa, xác nhận ngay"' : '"Your bank account is locked, verify now"'}</li>
              <li>• {language === 'vi' ? '"Cảnh sát triệu tập, liên hệ số này ngay"' : '"Police summons, contact this number immediately"'}</li>
              <li>• {language === 'vi' ? '"Đơn hàng của bạn có vấn đề, click để xử lý"' : '"Your order has issues, click to resolve"'}</li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
