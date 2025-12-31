'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, ArrowLeft, AlertTriangle, CheckCircle, Shield, Loader2, Upload, XCircle } from 'lucide-react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useTranslation } from '../../lib/i18n/LanguageContext'

interface RedFlag {
  keyword: string
  context: string
  severity: 'high' | 'medium' | 'low'
  explanation: string
}

interface AnalysisResult {
  totalFlags: number
  highRisk: number
  mediumRisk: number
  lowRisk: number
  flags: RedFlag[]
  overallRisk: 'safe' | 'caution' | 'danger'
}

const redFlagPatterns = [
  // High risk
  { pattern: /không hoàn lại|không được hoàn|không hoàn trả/gi, severity: 'high' as const, explanation: 'Điều khoản không hoàn tiền - rủi ro cao nếu dịch vụ không đạt yêu cầu' },
  { pattern: /từ bỏ quyền|từ bỏ mọi quyền|khước từ quyền/gi, severity: 'high' as const, explanation: 'Yêu cầu từ bỏ quyền lợi - có thể mất quyền khiếu nại' },
  { pattern: /không chịu trách nhiệm|miễn trừ trách nhiệm|không bồi thường/gi, severity: 'high' as const, explanation: 'Miễn trừ trách nhiệm hoàn toàn - bên cung cấp không chịu trách nhiệm gì' },
  { pattern: /phạt.*%|phí phạt|tiền phạt/gi, severity: 'high' as const, explanation: 'Điều khoản phạt - kiểm tra mức phạt có hợp lý không' },
  { pattern: /tự động gia hạn|gia hạn tự động/gi, severity: 'high' as const, explanation: 'Tự động gia hạn - có thể bị tính phí không mong muốn' },
  { pattern: /chuyển nhượng.*bên thứ ba|bán.*thông tin/gi, severity: 'high' as const, explanation: 'Chia sẻ thông tin cho bên thứ ba - rủi ro về quyền riêng tư' },
  
  // Medium risk
  { pattern: /thay đổi.*không cần thông báo|sửa đổi.*bất kỳ lúc nào/gi, severity: 'medium' as const, explanation: 'Có thể thay đổi điều khoản mà không báo trước' },
  { pattern: /thanh toán trước|đặt cọc.*100%|trả trước toàn bộ/gi, severity: 'medium' as const, explanation: 'Yêu cầu thanh toán trước 100% - rủi ro nếu không nhận được dịch vụ' },
  { pattern: /không được hủy|cấm hủy|không hủy được/gi, severity: 'medium' as const, explanation: 'Không cho phép hủy hợp đồng' },
  { pattern: /bảo mật.*vô thời hạn|bảo mật.*vĩnh viễn/gi, severity: 'medium' as const, explanation: 'Điều khoản bảo mật vô thời hạn - có thể hạn chế quyền của bạn' },
  { pattern: /độc quyền|exclusive|排他/gi, severity: 'medium' as const, explanation: 'Điều khoản độc quyền - kiểm tra phạm vi và thời hạn' },
  
  // Low risk (cần chú ý)
  { pattern: /tranh chấp.*trọng tài|giải quyết.*trọng tài/gi, severity: 'low' as const, explanation: 'Giải quyết tranh chấp qua trọng tài - có thể tốn kém hơn tòa án' },
  { pattern: /luật.*nước ngoài|pháp luật.*quốc tế/gi, severity: 'low' as const, explanation: 'Áp dụng luật nước ngoài - có thể khó khiếu nại' },
  { pattern: /bất khả kháng|force majeure/gi, severity: 'low' as const, explanation: 'Điều khoản bất khả kháng - kiểm tra định nghĩa có quá rộng không' },
]

export default function ContractCheckerPage() {
  const { language } = useTranslation()
  const [content, setContent] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeContract = () => {
    if (!content.trim()) return

    setIsAnalyzing(true)
    setResult(null)

    setTimeout(() => {
      const flags: RedFlag[] = []

      redFlagPatterns.forEach(({ pattern, severity, explanation }) => {
        const matches = content.match(pattern)
        if (matches) {
          matches.forEach(match => {
            // Get context around the match
            const index = content.toLowerCase().indexOf(match.toLowerCase())
            const start = Math.max(0, index - 50)
            const end = Math.min(content.length, index + match.length + 50)
            const context = '...' + content.slice(start, end) + '...'

            flags.push({
              keyword: match,
              context,
              severity,
              explanation: language === 'vi' ? explanation : explanation
            })
          })
        }
      })

      const highRisk = flags.filter(f => f.severity === 'high').length
      const mediumRisk = flags.filter(f => f.severity === 'medium').length
      const lowRisk = flags.filter(f => f.severity === 'low').length

      const overallRisk = highRisk >= 2 ? 'danger' : (highRisk >= 1 || mediumRisk >= 3) ? 'caution' : 'safe'

      setResult({
        totalFlags: flags.length,
        highRisk,
        mediumRisk,
        lowRisk,
        flags,
        overallRisk
      })
      setIsAnalyzing(false)
    }, 800)
  }

  const getRiskConfig = (level: string) => {
    switch (level) {
      case 'safe':
        return { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30', label: language === 'vi' ? 'Ít rủi ro' : 'Low Risk' }
      case 'caution':
        return { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', label: language === 'vi' ? 'Cần xem xét' : 'Needs Review' }
      case 'danger':
        return { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', label: language === 'vi' ? 'Rủi ro cao' : 'High Risk' }
      default:
        return { icon: Shield, color: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/30', label: '' }
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return { bg: 'bg-red-500/20', text: 'text-red-400', label: language === 'vi' ? 'Cao' : 'High' }
      case 'medium': return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: language === 'vi' ? 'Trung bình' : 'Medium' }
      case 'low': return { bg: 'bg-blue-500/20', text: 'text-blue-400', label: language === 'vi' ? 'Thấp' : 'Low' }
      default: return { bg: 'bg-gray-500/20', text: 'text-gray-400', label: '' }
    }
  }


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link href="/tools" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {language === 'vi' ? 'Quay lại' : 'Back'}
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-2xl mb-4">
              <FileText className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'vi' ? 'Kiểm tra Hợp đồng' : 'Contract Checker'}
            </h1>
            <p className="text-gray-400">
              {language === 'vi' 
                ? 'Phát hiện các điều khoản nguy hiểm trong hợp đồng'
                : 'Detect dangerous clauses in contracts'}
            </p>
          </motion.div>

          {/* Input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={language === 'vi' 
                ? 'Dán nội dung hợp đồng vào đây để kiểm tra các điều khoản nguy hiểm...' 
                : 'Paste contract content here to check for dangerous clauses...'}
              className="w-full h-64 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 resize-none"
            />
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-500">
                {content.length} {language === 'vi' ? 'ký tự' : 'characters'}
              </span>
              <button
                onClick={analyzeContract}
                disabled={isAnalyzing || !content.trim()}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-colors flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {language === 'vi' ? 'Đang phân tích...' : 'Analyzing...'}
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
              {/* Overall Risk */}
              <div className={`p-4 rounded-xl border ${getRiskConfig(result.overallRisk).bg} ${getRiskConfig(result.overallRisk).border}`}>
                <div className="flex items-center gap-3">
                  {(() => {
                    const config = getRiskConfig(result.overallRisk)
                    const Icon = config.icon
                    return <Icon className={`w-8 h-8 ${config.color}`} />
                  })()}
                  <div>
                    <p className={`font-bold text-lg ${getRiskConfig(result.overallRisk).color}`}>
                      {getRiskConfig(result.overallRisk).label}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {language === 'vi' 
                        ? `Phát hiện ${result.totalFlags} điều khoản cần chú ý`
                        : `Found ${result.totalFlags} clauses to review`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              {result.totalFlags > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-red-400">{result.highRisk}</p>
                    <p className="text-xs text-gray-400">{language === 'vi' ? 'Rủi ro cao' : 'High Risk'}</p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-yellow-400">{result.mediumRisk}</p>
                    <p className="text-xs text-gray-400">{language === 'vi' ? 'Trung bình' : 'Medium'}</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-blue-400">{result.lowRisk}</p>
                    <p className="text-xs text-gray-400">{language === 'vi' ? 'Cần chú ý' : 'Note'}</p>
                  </div>
                </div>
              )}

              {/* Flags List */}
              {result.flags.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="font-semibold mb-4">{language === 'vi' ? 'Chi tiết các điều khoản' : 'Clause Details'}</h3>
                  <div className="space-y-4">
                    {result.flags.map((flag, i) => {
                      const badge = getSeverityBadge(flag.severity)
                      return (
                        <div key={i} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${badge.bg} ${badge.text}`}>
                              {badge.label}
                            </span>
                            <span className="text-white font-medium">"{flag.keyword}"</span>
                          </div>
                          <p className="text-sm text-gray-400 mb-2 italic bg-black/20 rounded p-2">
                            {flag.context}
                          </p>
                          <p className="text-sm text-gray-300">
                            ⚠️ {flag.explanation}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {result.totalFlags === 0 && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-medium">
                    {language === 'vi' ? 'Không phát hiện điều khoản nguy hiểm!' : 'No dangerous clauses detected!'}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {language === 'vi' ? 'Tuy nhiên, vẫn nên đọc kỹ toàn bộ hợp đồng' : 'However, still read the entire contract carefully'}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Tips */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <h3 className="font-semibold text-gray-300 mb-3">📋 {language === 'vi' ? 'Lưu ý khi ký hợp đồng' : 'Contract signing tips'}</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• {language === 'vi' ? 'Đọc kỹ TOÀN BỘ hợp đồng, không chỉ phần tóm tắt' : 'Read the ENTIRE contract, not just the summary'}</li>
              <li>• {language === 'vi' ? 'Hỏi rõ những điều khoản không hiểu' : 'Ask about clauses you don\'t understand'}</li>
              <li>• {language === 'vi' ? 'Yêu cầu sửa đổi các điều khoản bất lợi' : 'Request changes to unfavorable clauses'}</li>
              <li>• {language === 'vi' ? 'Giữ bản sao hợp đồng đã ký' : 'Keep a copy of the signed contract'}</li>
              <li>• {language === 'vi' ? 'Tham khảo luật sư nếu hợp đồng có giá trị lớn' : 'Consult a lawyer for high-value contracts'}</li>
            </ul>
          </motion.div>

          {/* Warning */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
            <p className="text-sm text-yellow-300">
              ⚠️ {language === 'vi' 
                ? 'Công cụ này chỉ mang tính tham khảo. Với hợp đồng quan trọng, hãy tham khảo ý kiến luật sư chuyên nghiệp.'
                : 'This tool is for reference only. For important contracts, consult a professional lawyer.'}
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
