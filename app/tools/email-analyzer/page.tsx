'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, AlertTriangle, CheckCircle, XCircle, Shield, Loader2, Copy, Info } from 'lucide-react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useTranslation } from '../../lib/i18n/LanguageContext'

interface ParsedHeader {
  from: string
  returnPath: string
  replyTo: string
  receivedFrom: string[]
  spf: { status: 'pass' | 'fail' | 'none'; detail: string }
  dkim: { status: 'pass' | 'fail' | 'none'; detail: string }
  dmarc: { status: 'pass' | 'fail' | 'none'; detail: string }
  subject: string
  date: string
  messageId: string
  xMailer: string
  contentType: string
}

interface AnalysisResult {
  parsed: ParsedHeader
  riskLevel: 'safe' | 'caution' | 'danger'
  warnings: string[]
  tips: string[]
}

export default function EmailAnalyzerPage() {
  const { language } = useTranslation()
  const [headerText, setHeaderText] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')

  const parseEmailHeader = (header: string): ParsedHeader => {
    const getHeader = (name: string): string => {
      const regex = new RegExp(`^${name}:\\s*(.+?)(?=\\n[A-Za-z-]+:|$)`, 'ims')
      const match = header.match(regex)
      return match ? match[1].replace(/\\n\\s+/g, ' ').trim() : ''
    }

    const getReceivedChain = (): string[] => {
      const received: string[] = []
      const regex = /Received:\s*(.+?)(?=Received:|$)/gi
      let match
      while ((match = regex.exec(header)) !== null) {
        received.push(match[1].replace(/\s+/g, ' ').trim())
      }
      return received
    }

    const checkAuthResult = (type: string): { status: 'pass' | 'fail' | 'none'; detail: string } => {
      const authResults = getHeader('Authentication-Results')
      const arcAuth = getHeader('ARC-Authentication-Results')
      const combined = authResults + ' ' + arcAuth
      
      const regex = new RegExp(`${type}=([a-z]+)`, 'i')
      const match = combined.match(regex)
      
      if (match) {
        const status = match[1].toLowerCase()
        if (status === 'pass') return { status: 'pass', detail: `${type.toUpperCase()} passed` }
        if (status === 'fail' || status === 'softfail') return { status: 'fail', detail: `${type.toUpperCase()} failed` }
      }
      return { status: 'none', detail: `${type.toUpperCase()} not found` }
    }

    return {
      from: getHeader('From'),
      returnPath: getHeader('Return-Path'),
      replyTo: getHeader('Reply-To'),
      receivedFrom: getReceivedChain(),
      spf: checkAuthResult('spf'),
      dkim: checkAuthResult('dkim'),
      dmarc: checkAuthResult('dmarc'),
      subject: getHeader('Subject'),
      date: getHeader('Date'),
      messageId: getHeader('Message-ID'),
      xMailer: getHeader('X-Mailer'),
      contentType: getHeader('Content-Type'),
    }
  }


  const analyzeHeader = (parsed: ParsedHeader): AnalysisResult => {
    const warnings: string[] = []
    const tips: string[] = []
    let riskScore = 0

    // Check SPF
    if (parsed.spf.status === 'fail') {
      warnings.push(language === 'vi' ? 'SPF thất bại - Email có thể bị giả mạo' : 'SPF failed - Email may be spoofed')
      riskScore += 3
    } else if (parsed.spf.status === 'none') {
      tips.push(language === 'vi' ? 'Không tìm thấy SPF record' : 'No SPF record found')
      riskScore += 1
    }

    // Check DKIM
    if (parsed.dkim.status === 'fail') {
      warnings.push(language === 'vi' ? 'DKIM thất bại - Nội dung email có thể bị thay đổi' : 'DKIM failed - Email content may be altered')
      riskScore += 3
    } else if (parsed.dkim.status === 'none') {
      tips.push(language === 'vi' ? 'Không tìm thấy DKIM signature' : 'No DKIM signature found')
      riskScore += 1
    }

    // Check DMARC
    if (parsed.dmarc.status === 'fail') {
      warnings.push(language === 'vi' ? 'DMARC thất bại - Domain không xác thực' : 'DMARC failed - Domain not authenticated')
      riskScore += 2
    }

    // Check From vs Return-Path mismatch
    if (parsed.from && parsed.returnPath) {
      const fromDomain = parsed.from.match(/@([a-zA-Z0-9.-]+)/)?.[1]?.toLowerCase()
      const returnDomain = parsed.returnPath.match(/@([a-zA-Z0-9.-]+)/)?.[1]?.toLowerCase()
      if (fromDomain && returnDomain && fromDomain !== returnDomain) {
        warnings.push(language === 'vi' 
          ? `Domain không khớp: From (${fromDomain}) ≠ Return-Path (${returnDomain})`
          : `Domain mismatch: From (${fromDomain}) ≠ Return-Path (${returnDomain})`)
        riskScore += 2
      }
    }

    // Check Reply-To mismatch
    if (parsed.from && parsed.replyTo) {
      const fromDomain = parsed.from.match(/@([a-zA-Z0-9.-]+)/)?.[1]?.toLowerCase()
      const replyDomain = parsed.replyTo.match(/@([a-zA-Z0-9.-]+)/)?.[1]?.toLowerCase()
      if (fromDomain && replyDomain && fromDomain !== replyDomain) {
        warnings.push(language === 'vi'
          ? `Reply-To khác domain: ${replyDomain} (có thể là lừa đảo)`
          : `Reply-To different domain: ${replyDomain} (possible phishing)`)
        riskScore += 2
      }
    }

    // Add general tips
    if (warnings.length === 0 && parsed.spf.status === 'pass' && parsed.dkim.status === 'pass') {
      tips.push(language === 'vi' ? 'Email đã qua xác thực SPF và DKIM' : 'Email passed SPF and DKIM authentication')
    }

    const riskLevel = riskScore >= 5 ? 'danger' : riskScore >= 2 ? 'caution' : 'safe'

    return { parsed, riskLevel, warnings, tips }
  }

  const handleAnalyze = () => {
    if (!headerText.trim()) {
      setError(language === 'vi' ? 'Vui lòng dán email header' : 'Please paste email header')
      return
    }

    setIsAnalyzing(true)
    setError('')
    setResult(null)

    setTimeout(() => {
      try {
        const parsed = parseEmailHeader(headerText)
        const analysis = analyzeHeader(parsed)
        setResult(analysis)
      } catch (err) {
        setError(language === 'vi' ? 'Không thể phân tích header' : 'Cannot parse header')
      }
      setIsAnalyzing(false)
    }, 500)
  }

  const getRiskConfig = (level: string) => {
    switch (level) {
      case 'safe':
        return { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30', label: language === 'vi' ? 'An toàn' : 'Safe' }
      case 'caution':
        return { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', label: language === 'vi' ? 'Cẩn thận' : 'Caution' }
      case 'danger':
        return { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', label: language === 'vi' ? 'Nguy hiểm' : 'Danger' }
      default:
        return { icon: Shield, color: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/30', label: 'Unknown' }
    }
  }

  const getAuthBadge = (status: 'pass' | 'fail' | 'none') => {
    if (status === 'pass') return { bg: 'bg-green-500/20', text: 'text-green-400', label: 'PASS' }
    if (status === 'fail') return { bg: 'bg-red-500/20', text: 'text-red-400', label: 'FAIL' }
    return { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'N/A' }
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
              {language === 'vi' ? 'Quay lại' : 'Back'}
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mb-4">
              <Mail className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'vi' ? 'Phân tích Email Header' : 'Email Header Analyzer'}
            </h1>
            <p className="text-gray-400">
              {language === 'vi' 
                ? 'Kiểm tra email header để phát hiện giả mạo (spoofing)'
                : 'Check email headers to detect spoofing'}
            </p>
          </motion.div>

          {/* How to get header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6"
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-400 mb-2">
                  {language === 'vi' ? 'Cách lấy email header' : 'How to get email header'}
                </h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• <strong>Gmail:</strong> {language === 'vi' ? 'Mở email → 3 chấm → "Hiển thị bản gốc"' : 'Open email → 3 dots → "Show original"'}</li>
                  <li>• <strong>Outlook:</strong> {language === 'vi' ? 'Mở email → File → Properties → Internet headers' : 'Open email → File → Properties → Internet headers'}</li>
                  <li>• <strong>Yahoo:</strong> {language === 'vi' ? 'Mở email → 3 chấm → "View raw message"' : 'Open email → 3 dots → "View raw message"'}</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6"
          >
            <textarea
              value={headerText}
              onChange={(e) => setHeaderText(e.target.value)}
              placeholder={language === 'vi' ? 'Dán email header vào đây...' : 'Paste email header here...'}
              className="w-full h-48 p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 font-mono text-sm resize-none"
            />
            <div className="flex justify-between items-center mt-3">
              <button
                onClick={() => setHeaderText('')}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {language === 'vi' ? 'Xóa' : 'Clear'}
              </button>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !headerText.trim()}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-colors flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {language === 'vi' ? 'Đang phân tích...' : 'Analyzing...'}
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    {language === 'vi' ? 'Phân tích' : 'Analyze'}
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Result */}
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Risk Level */}
              <div className={`p-4 rounded-xl border ${getRiskConfig(result.riskLevel).bg} ${getRiskConfig(result.riskLevel).border}`}>
                <div className="flex items-center gap-3">
                  {(() => {
                    const config = getRiskConfig(result.riskLevel)
                    const Icon = config.icon
                    return <Icon className={`w-8 h-8 ${config.color}`} />
                  })()}
                  <div>
                    <p className={`font-bold text-lg ${getRiskConfig(result.riskLevel).color}`}>
                      {getRiskConfig(result.riskLevel).label}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {result.warnings.length > 0 
                        ? (language === 'vi' ? `${result.warnings.length} vấn đề phát hiện` : `${result.warnings.length} issues detected`)
                        : (language === 'vi' ? 'Không phát hiện vấn đề' : 'No issues detected')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Auth Results */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-semibold mb-3">{language === 'vi' ? 'Xác thực Email' : 'Email Authentication'}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {['spf', 'dkim', 'dmarc'].map((auth) => {
                    const status = result.parsed[auth as keyof Pick<ParsedHeader, 'spf' | 'dkim' | 'dmarc'>]
                    const badge = getAuthBadge(status.status)
                    return (
                      <div key={auth} className={`p-3 rounded-lg ${badge.bg} text-center`}>
                        <p className="text-xs text-gray-400 uppercase mb-1">{auth}</p>
                        <p className={`font-bold ${badge.text}`}>{badge.label}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Warnings */}
              {result.warnings.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <h3 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    {language === 'vi' ? 'Cảnh báo' : 'Warnings'}
                  </h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {result.warnings.map((w, i) => <li key={i}>• {w}</li>)}
                  </ul>
                </div>
              )}

              {/* Parsed Info */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-semibold mb-3">{language === 'vi' ? 'Thông tin Email' : 'Email Info'}</h3>
                <div className="space-y-2 text-sm">
                  {result.parsed.from && (
                    <div className="flex"><span className="text-gray-400 w-28">From:</span><span className="text-white break-all">{result.parsed.from}</span></div>
                  )}
                  {result.parsed.returnPath && (
                    <div className="flex"><span className="text-gray-400 w-28">Return-Path:</span><span className="text-white break-all">{result.parsed.returnPath}</span></div>
                  )}
                  {result.parsed.replyTo && (
                    <div className="flex"><span className="text-gray-400 w-28">Reply-To:</span><span className="text-white break-all">{result.parsed.replyTo}</span></div>
                  )}
                  {result.parsed.subject && (
                    <div className="flex"><span className="text-gray-400 w-28">Subject:</span><span className="text-white break-all">{result.parsed.subject}</span></div>
                  )}
                  {result.parsed.date && (
                    <div className="flex"><span className="text-gray-400 w-28">Date:</span><span className="text-white">{result.parsed.date}</span></div>
                  )}
                </div>
              </div>

              {/* Tips */}
              {result.tips.length > 0 && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-400 mb-2">{language === 'vi' ? 'Ghi chú' : 'Notes'}</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {result.tips.map((t, i) => <li key={i}>• {t}</li>)}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {/* General Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-gray-800/50 border border-gray-700 rounded-xl p-4"
          >
            <h3 className="font-semibold text-gray-300 mb-2">
              {language === 'vi' ? '💡 Dấu hiệu email lừa đảo' : '💡 Signs of phishing email'}
            </h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• {language === 'vi' ? 'SPF/DKIM/DMARC thất bại' : 'SPF/DKIM/DMARC failed'}</li>
              <li>• {language === 'vi' ? 'Domain người gửi khác Return-Path' : 'Sender domain differs from Return-Path'}</li>
              <li>• {language === 'vi' ? 'Reply-To trỏ đến domain khác' : 'Reply-To points to different domain'}</li>
              <li>• {language === 'vi' ? 'Email từ domain miễn phí giả danh tổ chức' : 'Email from free domain impersonating organization'}</li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
