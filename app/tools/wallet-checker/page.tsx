'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Wallet, Search, Shield, AlertTriangle, CheckCircle, XCircle, 
  ExternalLink, Copy, Loader2, Info, TrendingUp, Clock, Hash,
  Coins, Activity, FileWarning, Globe
} from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useTranslation } from '../../lib/i18n/LanguageContext'

type NetworkKey = 'ethereum' | 'bsc' | 'polygon' | 'sepolia'

interface WalletResult {
  address: string
  isValid: boolean
  riskLevel: 'SAFE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'DANGEROUS'
  riskScore: number
  flags: string[]
  details: {
    balance?: string
    txCount?: number
    isContract?: boolean
    reportCount?: number
    totalLoss?: string
    category?: string
  }
  network: string
}

const NETWORKS = {
  ethereum: { name: 'Ethereum', symbol: 'ETH', icon: '⟠', color: 'from-blue-500 to-purple-500' },
  bsc: { name: 'BNB Chain', symbol: 'BNB', icon: '🔶', color: 'from-yellow-500 to-orange-500' },
  polygon: { name: 'Polygon', symbol: 'MATIC', icon: '🟣', color: 'from-purple-500 to-pink-500' },
  sepolia: { name: 'Sepolia (Test)', symbol: 'ETH', icon: '🧪', color: 'from-gray-500 to-gray-600' }
}

export default function WalletCheckerPage() {
  const { language } = useTranslation()
  const [address, setAddress] = useState('')
  const [network, setNetwork] = useState<NetworkKey>('ethereum')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<WalletResult | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCheck = async () => {
    if (!address.trim()) {
      setError(language === 'vi' ? 'Vui lòng nhập địa chỉ ví' : 'Please enter wallet address')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/blockchain/check-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, network })
      })

      const data = await res.json()
      
      if (data.success) {
        setResult({ ...data.result, network: NETWORKS[network].name })
      } else {
        setError(data.error || 'Failed to check wallet')
      }
    } catch (err) {
      setError(language === 'vi' ? 'Lỗi kết nối. Vui lòng thử lại.' : 'Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'DANGEROUS': return 'from-red-500 to-red-600'
      case 'HIGH': return 'from-orange-500 to-red-500'
      case 'MEDIUM': return 'from-yellow-500 to-orange-500'
      case 'LOW': return 'from-blue-500 to-cyan-500'
      case 'SAFE': return 'from-green-500 to-emerald-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'DANGEROUS': return <XCircle className="w-8 h-8 text-red-400" />
      case 'HIGH': return <AlertTriangle className="w-8 h-8 text-orange-400" />
      case 'MEDIUM': return <AlertTriangle className="w-8 h-8 text-yellow-400" />
      case 'LOW': return <Info className="w-8 h-8 text-blue-400" />
      case 'SAFE': return <CheckCircle className="w-8 h-8 text-green-400" />
      default: return <Shield className="w-8 h-8 text-gray-400" />
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
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <Wallet className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">Blockchain Security</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">{language === 'vi' ? 'Kiểm tra ' : 'Check '}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {language === 'vi' ? 'Ví Crypto' : 'Crypto Wallet'}
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {language === 'vi' 
                ? 'Kiểm tra địa chỉ ví cryptocurrency có liên quan đến lừa đảo, rug pull hay phishing không'
                : 'Check if a cryptocurrency wallet address is associated with scams, rug pulls or phishing'}
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 mb-8"
          >
            {/* Network Selector */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                {language === 'vi' ? 'Chọn mạng blockchain' : 'Select blockchain network'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(NETWORKS) as NetworkKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setNetwork(key)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                      network === key
                        ? `bg-gradient-to-r ${NETWORKS[key].color} border-transparent text-white`
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-lg">{NETWORKS[key].icon}</span>
                    <span className="text-sm font-medium">{NETWORKS[key].name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Address Input */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                {language === 'vi' ? 'Địa chỉ ví' : 'Wallet Address'}
              </label>
              <div className="relative">
                <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                  placeholder="0x..."
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 font-mono text-sm"
                />
                {address && (
                  <button
                    onClick={copyAddress}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                )}
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm mb-4">{error}</p>
            )}

            <button
              onClick={handleCheck}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {language === 'vi' ? 'Đang kiểm tra...' : 'Checking...'}
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  {language === 'vi' ? 'Kiểm tra ví' : 'Check Wallet'}
                </>
              )}
            </button>
          </motion.div>

          {/* Result */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Risk Score Card */}
                <div className={`bg-gradient-to-r ${getRiskColor(result.riskLevel)} p-0.5 rounded-2xl`}>
                  <div className="bg-gray-900 rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                      {getRiskIcon(result.riskLevel)}
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {result.riskLevel === 'SAFE' && (language === 'vi' ? 'Ví An toàn' : 'Safe Wallet')}
                          {result.riskLevel === 'LOW' && (language === 'vi' ? 'Rủi ro Thấp' : 'Low Risk')}
                          {result.riskLevel === 'MEDIUM' && (language === 'vi' ? 'Rủi ro Trung bình' : 'Medium Risk')}
                          {result.riskLevel === 'HIGH' && (language === 'vi' ? 'Rủi ro Cao' : 'High Risk')}
                          {result.riskLevel === 'DANGEROUS' && (language === 'vi' ? 'NGUY HIỂM!' : 'DANGEROUS!')}
                        </h3>
                        <p className="text-gray-400">{result.network}</p>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-4xl font-bold text-white">{result.riskScore}</div>
                        <div className="text-sm text-gray-400">{language === 'vi' ? 'Điểm rủi ro' : 'Risk Score'}</div>
                      </div>
                    </div>

                    {/* Risk Progress Bar */}
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-6">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.riskScore}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${getRiskColor(result.riskLevel)}`}
                      />
                    </div>

                    {/* Flags */}
                    <div className="space-y-2">
                      {result.flags.map((flag, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <FileWarning className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{flag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {result.details.balance && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Coins className="w-4 h-4" />
                        <span className="text-sm">{language === 'vi' ? 'Số dư' : 'Balance'}</span>
                      </div>
                      <p className="text-xl font-semibold text-white">{result.details.balance}</p>
                    </div>
                  )}
                  
                  {result.details.txCount !== undefined && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Activity className="w-4 h-4" />
                        <span className="text-sm">{language === 'vi' ? 'Giao dịch' : 'Transactions'}</span>
                      </div>
                      <p className="text-xl font-semibold text-white">{result.details.txCount}</p>
                    </div>
                  )}

                  {result.details.reportCount && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-red-400 mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm">{language === 'vi' ? 'Báo cáo' : 'Reports'}</span>
                      </div>
                      <p className="text-xl font-semibold text-red-400">{result.details.reportCount}</p>
                    </div>
                  )}

                  {result.details.totalLoss && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-red-400 mb-2">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">{language === 'vi' ? 'Thiệt hại' : 'Total Loss'}</span>
                      </div>
                      <p className="text-xl font-semibold text-red-400">{result.details.totalLoss}</p>
                    </div>
                  )}
                </div>

                {/* Address Info */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{language === 'vi' ? 'Địa chỉ' : 'Address'}</p>
                      <p className="font-mono text-sm text-white break-all">{result.address}</p>
                    </div>
                    <a
                      href={`https://etherscan.io/address/${result.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm"
                    >
                      <Globe className="w-4 h-4" />
                      Explorer
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid md:grid-cols-3 gap-4"
          >
            <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4">
              <Shield className="w-8 h-8 text-purple-400 mb-3" />
              <h4 className="font-semibold text-white mb-2">
                {language === 'vi' ? 'Phát hiện Scam' : 'Scam Detection'}
              </h4>
              <p className="text-sm text-gray-400">
                {language === 'vi' 
                  ? 'Kiểm tra ví có trong danh sách đen lừa đảo crypto không'
                  : 'Check if wallet is in crypto scam blacklist'}
              </p>
            </div>
            <div className="bg-pink-500/5 border border-pink-500/20 rounded-xl p-4">
              <Activity className="w-8 h-8 text-pink-400 mb-3" />
              <h4 className="font-semibold text-white mb-2">
                {language === 'vi' ? 'Phân tích Hoạt động' : 'Activity Analysis'}
              </h4>
              <p className="text-sm text-gray-400">
                {language === 'vi'
                  ? 'Xem số dư, số giao dịch và các pattern đáng ngờ'
                  : 'View balance, transactions and suspicious patterns'}
              </p>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
              <Hash className="w-8 h-8 text-blue-400 mb-3" />
              <h4 className="font-semibold text-white mb-2">
                {language === 'vi' ? 'Đa mạng' : 'Multi-chain'}
              </h4>
              <p className="text-sm text-gray-400">
                {language === 'vi'
                  ? 'Hỗ trợ Ethereum, BNB Chain, Polygon và testnet'
                  : 'Support Ethereum, BNB Chain, Polygon and testnet'}
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
