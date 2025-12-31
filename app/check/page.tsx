'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CreditCard, Mail, Phone, AlertTriangle, CheckCircle, XCircle, Loader2, Shield, Building2, Info } from 'lucide-react'
import { useTranslation } from '../lib/i18n/LanguageContext'
import Header from '../components/Header'
import Footer from '../components/Footer'

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

export default function CheckPage() {
  const { t } = useTranslation()
  const [checkType, setCheckType] = useState<CheckType>('bank')
  const [inputValue, setInputValue] = useState('')
  const [bankName, setBankName] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CheckResult | null>(null)
  const [error, setError] = useState('')

  const handleCheck = async () => {
    if (!inputValue.trim()) {
      setError(t.checkPage.enterInfo)
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      let endpoint = ''
      let body: Record<string, string> = {}

      switch (checkType) {
        case 'bank':
          endpoint = '/api/check/bank-account'
          body = { accountNumber: inputValue, bankName }
          break
        case 'email':
          endpoint = '/api/check/email'
          body = { email: inputValue }
          break
        case 'phone':
          endpoint = '/api/check/phone'
          body = { phone: inputValue }
          break
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (data.success) {
        setResult(data)
      } else {
        setError(data.error || t.common.error)
      }
    } catch (err) {
      setError(t.checkPage.connectionError)
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'DANGEROUS': return 'text-red-400 bg-red-500/20 border-red-500/30'
      case 'SUSPICIOUS': return 'text-orange-400 bg-orange-500/20 border-orange-500/30'
      case 'CAUTION': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'UNKNOWN': return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
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

  const getPlaceholder = () => {
    switch (checkType) {
      case 'bank': return t.checkPage.placeholder.bank
      case 'email': return t.checkPage.placeholder.email
      case 'phone': return t.checkPage.placeholder.phone
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">{t.checkPage.freeCheck}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">{t.checkPage.title} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{t.checkPage.titleHighlight}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t.checkPage.subtitle}
          </p>
        </motion.div>

        {/* Check Type Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-2 mb-8"
        >
          <button
            onClick={() => { setCheckType('bank'); setResult(null); setInputValue(''); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              checkType === 'bank'
                ? 'bg-blue-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            {t.checkPage.tabs.account}
          </button>
          <button
            onClick={() => { setCheckType('email'); setResult(null); setInputValue(''); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              checkType === 'email'
                ? 'bg-blue-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Mail className="w-5 h-5" />
            {t.checkPage.tabs.email}
          </button>
          <button
            onClick={() => { setCheckType('phone'); setResult(null); setInputValue(''); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              checkType === 'phone'
                ? 'bg-blue-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Phone className="w-5 h-5" />
            {t.checkPage.tabs.phone}
          </button>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 mb-8"
        >
          <div className="space-y-4">
            {/* Bank selector (only for bank check) */}
            {checkType === 'bank' && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t.checkPage.bankLabel}</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="">{t.checkPage.selectBank}</option>
                    {banks.map(bank => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Main input */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                {checkType === 'bank' ? t.checkPage.accountNumber : checkType === 'email' ? t.checkPage.emailAddress : t.checkPage.phoneNumber}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={checkType === 'email' ? 'email' : 'text'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                  placeholder={getPlaceholder()}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            {/* Submit button */}
            <button
              onClick={handleCheck}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.checkPage.checking}
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  {t.checkPage.checkNow}
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`border rounded-2xl p-6 ${getRiskColor(result.data.riskLevel)}`}
            >
              <div className="flex items-start gap-4">
                {getRiskIcon(result.data.riskLevel)}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {result.message}
                  </h3>
                  
                  {result.found && result.data && (
                    <div className="space-y-2 mt-4">
                      {result.data.reportCount && (
                        <p className="text-sm text-gray-300">
                          📊 {t.checkPage.result.reportCount}: <span className="font-semibold text-white">{result.data.reportCount}</span>
                        </p>
                      )}
                      {result.data.bankName && (
                        <p className="text-sm text-gray-300">
                          🏦 {t.checkPage.result.bank}: <span className="font-semibold text-white">{result.data.bankName}</span>
                        </p>
                      )}
                      {result.data.ownerName && (
                        <p className="text-sm text-gray-300">
                          👤 {t.checkPage.result.owner}: <span className="font-semibold text-white">{result.data.ownerName}</span>
                        </p>
                      )}
                      {result.data.totalLoss && (
                        <p className="text-sm text-gray-300">
                          💰 {t.checkPage.result.totalLoss}: <span className="font-semibold text-red-400">
                            {result.data.totalLoss.toLocaleString('vi-VN')} VNĐ
                          </span>
                        </p>
                      )}
                      {result.data.carrier && (
                        <p className="text-sm text-gray-300">
                          📱 {t.checkPage.result.carrier}: <span className="font-semibold text-white">{result.data.carrier}</span>
                        </p>
                      )}
                      {result.data.category && (
                        <p className="text-sm text-gray-300">
                          🏷️ {t.checkPage.result.category}: <span className="font-semibold text-white">{result.data.category}</span>
                        </p>
                      )}
                      {result.data.description && (
                        <p className="text-sm text-gray-300">
                          📝 {t.checkPage.result.description}: <span className="text-white">{result.data.description}</span>
                        </p>
                      )}
                      {result.data.verified && (
                        <p className="text-sm text-red-400 font-semibold">
                          ✓ {t.checkPage.result.verified}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid md:grid-cols-3 gap-4"
        >
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
            <CreditCard className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="font-semibold text-white mb-2">{t.checkPage.tips.account.title}</h4>
            <p className="text-sm text-gray-400">
              {t.checkPage.tips.account.desc}
            </p>
          </div>
          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">
            <Mail className="w-8 h-8 text-cyan-400 mb-3" />
            <h4 className="font-semibold text-white mb-2">{t.checkPage.tips.email.title}</h4>
            <p className="text-sm text-gray-400">
              {t.checkPage.tips.email.desc}
            </p>
          </div>
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4">
            <Phone className="w-8 h-8 text-purple-400 mb-3" />
            <h4 className="font-semibold text-white mb-2">{t.checkPage.tips.phone.title}</h4>
            <p className="text-sm text-gray-400">
              {t.checkPage.tips.phone.desc}
            </p>
          </div>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-400 mb-1">{t.checkPage.warning.title}</h4>
              <p className="text-sm text-gray-300">
                {t.checkPage.warning.content}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
    <Footer />
    </div>
  )
}
