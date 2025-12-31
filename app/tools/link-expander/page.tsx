'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link2, ArrowLeft, ExternalLink, AlertTriangle, CheckCircle, Loader2, Shield, Copy } from 'lucide-react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useTranslation } from '../../lib/i18n/LanguageContext'

interface ExpandResult {
  originalUrl: string
  expandedUrl: string
  redirectChain: string[]
  finalDomain: string
  isSuspicious: boolean
  warnings: string[]
}

const shortenerDomains = [
  'bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'buff.ly',
  'adf.ly', 'j.mp', 'tr.im', 'cli.gs', 'short.to', 'budurl.com', 'ping.fm',
  'post.ly', 'just.as', 'bkite.com', 'snipr.com', 'fic.kr', 'loopt.us',
  'doiop.com', 'short.ie', 'kl.am', 'wp.me', 'rubyurl.com', 'om.ly',
  'to.ly', 'bit.do', 'lnkd.in', 'db.tt', 'qr.ae', 'cur.lv', 'ity.im',
  'q.gs', 'po.st', 'bc.vc', 'twitthis.com', 'u.telegrambot.com', 'v.gd',
  'rb.gy', 'shorturl.at', 'cutt.ly', 'rebrand.ly', 'bl.ink', 'short.cm'
]

export default function LinkExpanderPage() {
  const { language } = useTranslation()
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<ExpandResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const isShortUrl = (inputUrl: string): boolean => {
    try {
      const urlObj = new URL(inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`)
      return shortenerDomains.some(d => urlObj.hostname.includes(d))
    } catch {
      return false
    }
  }

  const expandUrl = async () => {
    if (!url.trim()) {
      setError(language === 'vi' ? 'Vui lòng nhập URL' : 'Please enter URL')
      return
    }

    const fullUrl = url.startsWith('http') ? url : `https://${url}`
    
    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      // Use our API to expand URL
      const res = await fetch('/api/expand-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: fullUrl })
      })

      if (res.ok) {
        const data = await res.json()
        setResult(data)
      } else {
        // Fallback: just show the URL as-is with warning
        const urlObj = new URL(fullUrl)
        const warnings: string[] = []
        
        if (isShortUrl(fullUrl)) {
          warnings.push(language === 'vi' 
            ? 'Đây là link rút gọn - không thể mở rộng trực tiếp từ trình duyệt'
            : 'This is a shortened link - cannot expand directly from browser')
        }

        setResult({
          originalUrl: fullUrl,
          expandedUrl: fullUrl,
          redirectChain: [fullUrl],
          finalDomain: urlObj.hostname,
          isSuspicious: isShortUrl(fullUrl),
          warnings
        })
      }
    } catch (err) {
      // Fallback for any error
      try {
        const urlObj = new URL(fullUrl)
        setResult({
          originalUrl: fullUrl,
          expandedUrl: fullUrl,
          redirectChain: [fullUrl],
          finalDomain: urlObj.hostname,
          isSuspicious: isShortUrl(fullUrl),
          warnings: [language === 'vi' ? 'Không thể mở rộng link - hiển thị URL gốc' : 'Cannot expand link - showing original URL']
        })
      } catch {
        setError(language === 'vi' ? 'URL không hợp lệ' : 'Invalid URL')
      }
    }

    setIsLoading(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-2xl mb-4">
              <Link2 className="w-8 h-8 text-orange-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'vi' ? 'Mở rộng Link Rút gọn' : 'Expand Shortened Links'}
            </h1>
            <p className="text-gray-400">
              {language === 'vi' 
                ? 'Xem URL thật đằng sau link rút gọn (bit.ly, tinyurl...)'
                : 'See the real URL behind shortened links (bit.ly, tinyurl...)'}
            </p>
          </motion.div>

          {/* Input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && expandUrl()}
                placeholder="bit.ly/abc123, tinyurl.com/xyz..."
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
              />
              <button
                onClick={expandUrl}
                disabled={isLoading}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 rounded-xl text-white font-medium transition-colors flex items-center gap-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ExternalLink className="w-5 h-5" />}
                {language === 'vi' ? 'Mở rộng' : 'Expand'}
              </button>
            </div>
          </motion.div>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center">
              {error}
            </motion.div>
          )}

          {/* Result */}
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Status */}
              <div className={`p-4 rounded-xl border ${result.isSuspicious ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
                <div className="flex items-center gap-3">
                  {result.isSuspicious ? (
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  )}
                  <div>
                    <p className={`font-semibold ${result.isSuspicious ? 'text-yellow-400' : 'text-green-400'}`}>
                      {result.isSuspicious 
                        ? (language === 'vi' ? 'Cẩn thận với link này' : 'Be careful with this link')
                        : (language === 'vi' ? 'Link đã được mở rộng' : 'Link expanded')}
                    </p>
                  </div>
                </div>
              </div>

              {/* URLs */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{language === 'vi' ? 'Link gốc' : 'Original Link'}</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-black/20 rounded-lg px-3 py-2 text-sm text-gray-300 break-all">{result.originalUrl}</code>
                    <button onClick={() => copyToClipboard(result.originalUrl)} className="p-2 text-gray-400 hover:text-white">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1">{language === 'vi' ? 'Link đích thực' : 'Actual Destination'}</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-black/20 rounded-lg px-3 py-2 text-sm text-white break-all font-medium">{result.expandedUrl}</code>
                    <button onClick={() => copyToClipboard(result.expandedUrl)} className="p-2 text-gray-400 hover:text-white">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1">{language === 'vi' ? 'Domain đích' : 'Final Domain'}</p>
                  <p className="text-white font-medium">{result.finalDomain}</p>
                </div>
              </div>

              {/* Warnings */}
              {result.warnings.length > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                  <h3 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    {language === 'vi' ? 'Lưu ý' : 'Notes'}
                  </h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {result.warnings.map((w, i) => <li key={i}>• {w}</li>)}
                  </ul>
                </div>
              )}

              {/* Scan button */}
              <div className="flex justify-center">
                <Link
                  href={`/scan?url=${encodeURIComponent(result.expandedUrl)}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium transition-colors"
                >
                  <Shield className="w-5 h-5" />
                  {language === 'vi' ? 'Kiểm tra URL này' : 'Scan this URL'}
                </Link>
              </div>
            </motion.div>
          )}

          {/* Common shorteners */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <h3 className="font-semibold text-gray-300 mb-3">
              {language === 'vi' ? '🔗 Các dịch vụ rút gọn link phổ biến' : '🔗 Common URL shorteners'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'rb.gy', 'cutt.ly', 'short.io'].map(domain => (
                <span key={domain} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">{domain}</span>
              ))}
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <h3 className="font-semibold text-blue-400 mb-2">💡 {language === 'vi' ? 'Tại sao cần kiểm tra link rút gọn?' : 'Why check shortened links?'}</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• {language === 'vi' ? 'Link rút gọn che giấu URL thật - có thể dẫn đến trang lừa đảo' : 'Shortened links hide real URL - may lead to phishing sites'}</li>
              <li>• {language === 'vi' ? 'Kẻ xấu thường dùng link rút gọn để qua mặt bộ lọc' : 'Scammers often use shortened links to bypass filters'}</li>
              <li>• {language === 'vi' ? 'Luôn kiểm tra trước khi click vào link lạ' : 'Always check before clicking unknown links'}</li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
