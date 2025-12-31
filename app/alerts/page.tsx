'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Shield, Clock, Eye, ChevronRight, Filter, Search, Bell, TrendingUp, Home, ExternalLink, Newspaper, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '../lib/i18n/LanguageContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GlowingCard from '../components/GlowingCard'
import AnimatedCounter from '../components/AnimatedCounter'

interface ScamAlert {
  id: string
  title: string
  slug: string
  summary: string
  category: string
  severity: string
  targetGroup: string[]
  platform: string[]
  reportCount: number
  totalLoss: number | null
  views: number
  isPinned: boolean
  createdAt: string
}

// Bài viết từ nguồn uy tín - cập nhật thường xuyên
const trustedNews = [
  {
    id: 'news-1',
    title: 'Cảnh báo lừa đảo giả mạo cơ quan công an yêu cầu cài đặt app',
    summary: 'Công an cảnh báo thủ đoạn giả danh công an, viện kiểm sát gọi điện yêu cầu cài đặt ứng dụng để chiếm đoạt tài sản.',
    source: 'Báo Công an Nhân dân',
    url: 'https://congan.com.vn/an-ninh-mang',
    category: 'IMPERSONATION',
    severity: 'CRITICAL',
    date: '2024-12-30',
    icon: '👮'
  },
  {
    id: 'news-2', 
    title: 'Cảnh giác với chiêu trò lừa đảo "việc nhẹ lương cao" trên mạng',
    summary: 'Hàng nghìn người đã bị lừa với chiêu trò tuyển dụng việc làm online, yêu cầu nạp tiền để nhận nhiệm vụ.',
    source: 'VnExpress',
    url: 'https://vnexpress.net/chu-de/lua-dao-3162',
    category: 'JOB',
    severity: 'HIGH',
    date: '2024-12-28',
    icon: '📰'
  },
  {
    id: 'news-3',
    title: 'Cảnh báo lừa đảo đầu tư tài chính, tiền ảo với lợi nhuận "khủng"',
    summary: 'Nhiều sàn giao dịch tiền ảo, forex giả mạo hứa hẹn lợi nhuận 30-50%/tháng để chiếm đoạt tiền của nhà đầu tư.',
    source: 'Ngân hàng Nhà nước',
    url: 'https://www.sbv.gov.vn',
    category: 'INVESTMENT',
    severity: 'CRITICAL',
    date: '2024-12-25',
    icon: '🏦'
  },
  {
    id: 'news-4',
    title: 'Cảnh báo website giả mạo ngân hàng để đánh cắp thông tin',
    summary: 'Xuất hiện hàng loạt website giả mạo các ngân hàng lớn như Vietcombank, BIDV, Techcombank để lừa đảo.',
    source: 'Trung tâm NCSC',
    url: 'https://canhbao.ncsc.gov.vn',
    category: 'PHISHING',
    severity: 'CRITICAL',
    date: '2024-12-20',
    icon: '🛡️'
  },
  {
    id: 'news-5',
    title: 'Cảnh báo tin nhắn giả mạo thông báo trúng thưởng từ Shopee, Lazada',
    summary: 'Kẻ lừa đảo gửi tin nhắn giả mạo các sàn TMĐT thông báo trúng thưởng, yêu cầu nạp phí để nhận quà.',
    source: 'Tuổi Trẻ Online',
    url: 'https://tuoitre.vn/phap-luat/phong-chong-lua-dao.html',
    category: 'PRIZE',
    severity: 'HIGH',
    date: '2024-12-18',
    icon: '📰'
  },
]

const severityColors: Record<string, string> = {
  CRITICAL: 'bg-red-500/20 text-red-400 border-red-500/30',
  HIGH: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  MEDIUM: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  LOW: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

export default function AlertsPage() {
  const { language } = useTranslation()
  const [alerts, setAlerts] = useState<ScamAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedSeverity, setSelectedSeverity] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')

  const categoryLabels: Record<string, string> = language === 'vi' ? {
    PHISHING: 'Giả mạo',
    INVESTMENT: 'Đầu tư',
    ROMANCE: 'Tình cảm',
    JOB: 'Việc làm',
    PRIZE: 'Trúng thưởng',
    IMPERSONATION: 'Mạo danh',
    CRYPTO: 'Tiền ảo',
    OTHER: 'Khác',
  } : {
    PHISHING: 'Phishing',
    INVESTMENT: 'Investment',
    ROMANCE: 'Romance',
    JOB: 'Job',
    PRIZE: 'Prize',
    IMPERSONATION: 'Impersonation',
    CRYPTO: 'Crypto',
    OTHER: 'Other',
  }

  const severityLabels: Record<string, string> = language === 'vi' ? {
    CRITICAL: 'Nghiêm trọng',
    HIGH: 'Cao',
    MEDIUM: 'Trung bình',
    LOW: 'Thấp',
  } : {
    CRITICAL: 'Critical',
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low',
  }

  useEffect(() => {
    fetchAlerts()
  }, [selectedCategory, selectedSeverity])

  const fetchAlerts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory) params.append('category', selectedCategory)
      if (selectedSeverity) params.append('severity', selectedSeverity)
      params.append('limit', '20')

      const res = await fetch(`/api/alerts?${params}`)
      const data = await res.json()
      if (data.success) {
        setAlerts(data.data)
      }
    } catch (error) {
      console.error('Error fetching alerts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAlerts = alerts.filter(alert =>
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.summary.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const formatMoney = (amount: number | null) => {
    if (!amount) return null
    if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(1)} tỷ`
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(0)} triệu`
    return `${amount.toLocaleString('vi-VN')} đ`
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back to Home - Top */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm"
          >
            <Home className="w-4 h-4 text-cyan-400" />
            <span className="text-gray-300">{language === 'vi' ? 'Về trang chủ' : 'Back to Home'}</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full mb-6"
          >
            <Bell className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-red-400 text-sm font-medium">{language === 'vi' ? 'Cập nhật liên tục' : 'Continuously updating'}</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">{language === 'vi' ? 'Cảnh báo ' : 'Scam '}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">{language === 'vi' ? 'Lừa đảo' : 'Alerts'}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {language === 'vi' 
              ? 'Thông tin mới nhất về các chiêu trò lừa đảo đang hoành hành tại Việt Nam'
              : 'Latest information about scams currently happening'}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <GlowingCard glowColor="rgba(59, 130, 246, 0.3)">
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/20 rounded-xl p-4 text-center">
              <AlertTriangle className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter end={alerts.length} />
              </div>
              <div className="text-sm text-gray-400">{language === 'vi' ? 'Cảnh báo' : 'Alerts'}</div>
            </div>
          </GlowingCard>
          <GlowingCard glowColor="rgba(239, 68, 68, 0.3)">
            <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-500/20 rounded-xl p-4 text-center">
              <Shield className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter end={alerts.filter(a => a.severity === 'CRITICAL').length} />
              </div>
              <div className="text-sm text-gray-400">{language === 'vi' ? 'Nghiêm trọng' : 'Critical'}</div>
            </div>
          </GlowingCard>
          <GlowingCard glowColor="rgba(249, 115, 22, 0.3)">
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 border border-orange-500/20 rounded-xl p-4 text-center">
              <TrendingUp className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter end={alerts.reduce((sum, a) => sum + a.reportCount, 0)} />
              </div>
              <div className="text-sm text-gray-400">{language === 'vi' ? 'Báo cáo' : 'Reports'}</div>
            </div>
          </GlowingCard>
          <GlowingCard glowColor="rgba(168, 85, 247, 0.3)">
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/20 rounded-xl p-4 text-center">
              <Eye className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter end={alerts.reduce((sum, a) => sum + a.views, 0)} />
              </div>
              <div className="text-sm text-gray-400">{language === 'vi' ? 'Lượt xem' : 'Views'}</div>
            </div>
          </GlowingCard>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <GlowingCard glowColor="rgba(59, 130, 246, 0.2)">
            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-xl p-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    placeholder={language === 'vi' ? 'Tìm kiếm cảnh báo...' : 'Search alerts...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="">{language === 'vi' ? 'Tất cả loại' : 'All types'}</option>
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* Severity Filter */}
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50"
                >
                  <option value="">{language === 'vi' ? 'Tất cả mức độ' : 'All levels'}</option>
                  {Object.entries(severityLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          </GlowingCard>
        </motion.div>

        {/* Trusted News from Official Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">{language === 'vi' ? 'Tin tức từ nguồn uy tín' : 'News from trusted sources'}</h2>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">{language === 'vi' ? 'Xác thực' : 'Verified'}</span>
          </div>
          <div className="space-y-3">
            {trustedNews.map((news, index) => (
              <motion.a
                key={news.id}
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="block bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/20 rounded-xl p-4 hover:from-emerald-500/10 hover:to-teal-500/10 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{news.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-xs rounded-full border ${severityColors[news.severity]}`}>
                        {severityLabels[news.severity]}
                      </span>
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                        {categoryLabels[news.category]}
                      </span>
                      <span className="text-xs text-emerald-400 ml-auto flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        {news.source}
                      </span>
                    </div>
                    <h3 className="text-white font-medium mb-1 group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {news.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{news.summary}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {news.date}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 flex-shrink-0" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          <span className="text-gray-500 text-sm">{language === 'vi' ? 'Cảnh báo từ cộng đồng' : 'Community Alerts'}</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        </div>

        {/* Alerts List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/5 rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-white/10 rounded w-3/4 mb-4" />
                <div className="h-4 bg-white/10 rounded w-full mb-2" />
                <div className="h-4 bg-white/10 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredAlerts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">{language === 'vi' ? 'Chưa có cảnh báo nào' : 'No alerts yet'}</h3>
            <p className="text-gray-400">{language === 'vi' ? 'Hệ thống đang cập nhật thông tin mới nhất' : 'System is updating with latest information'}</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/alerts/${alert.slug}`}>
                  <div className={`bg-blue-500/5 border rounded-xl p-6 hover:bg-blue-500/10 transition-all cursor-pointer ${
                    alert.isPinned ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-blue-500/20'
                  }`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {alert.isPinned && (
                            <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                              📌 Ghim
                            </span>
                          )}
                          <span className={`px-2 py-0.5 text-xs rounded-full border ${severityColors[alert.severity]}`}>
                            {severityLabels[alert.severity]}
                          </span>
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                            {categoryLabels[alert.category] || alert.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                          {alert.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                          {alert.summary}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {formatDate(alert.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {alert.reportCount} báo cáo
                          </span>
                          {alert.totalLoss && (
                            <span className="text-red-400">
                              💰 Thiệt hại: {formatMoney(alert.totalLoss)}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {alert.views}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-2">{language === 'vi' ? 'Bạn phát hiện chiêu trò lừa đảo mới?' : 'Discovered a new scam?'}</h3>
            <p className="text-gray-400 mb-4">{language === 'vi' ? 'Hãy báo cáo để giúp cộng đồng cảnh giác' : 'Report it to help the community stay alert'}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/report"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
              >
                <AlertTriangle className="w-5 h-5" />
                {language === 'vi' ? 'Báo cáo ngay' : 'Report Now'}
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-xl text-gray-300 font-semibold hover:bg-white/5 transition-all"
              >
                <Home className="w-5 h-5" />
                {language === 'vi' ? 'Về trang chủ' : 'Back to Home'}
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Trusted Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>📚</span> {language === 'vi' ? 'Nguồn thông tin uy tín từ cơ quan chức năng' : 'Trusted information sources from authorities'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a
                href="https://canhbao.ncsc.gov.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <span className="text-2xl">🛡️</span>
                <div className="flex-1">
                  <p className="text-white font-medium group-hover:text-emerald-400 transition-colors">Cổng cảnh báo ATTT quốc gia</p>
                  <p className="text-xs text-gray-500">Trung tâm Giám sát ATTT Quốc gia - Bộ TT&TT</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400" />
              </a>
              <a
                href="https://tingia.gov.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <span className="text-2xl">🔍</span>
                <div className="flex-1">
                  <p className="text-white font-medium group-hover:text-emerald-400 transition-colors">Trung tâm xử lý tin giả</p>
                  <p className="text-xs text-gray-500">Cổng thông tin tiếp nhận tin giả Việt Nam</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400" />
              </a>
              <a
                href="https://vnexpress.net/chu-de/lua-dao-3162"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <span className="text-2xl">📰</span>
                <div className="flex-1">
                  <p className="text-white font-medium group-hover:text-emerald-400 transition-colors">VnExpress - Chủ đề Lừa đảo</p>
                  <p className="text-xs text-gray-500">Tin tức cập nhật về các vụ lừa đảo</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400" />
              </a>
              <a
                href="https://tuoitre.vn/phap-luat/phong-chong-lua-dao.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <span className="text-2xl">📰</span>
                <div className="flex-1">
                  <p className="text-white font-medium group-hover:text-emerald-400 transition-colors">Tuổi Trẻ - Phòng chống lừa đảo</p>
                  <p className="text-xs text-gray-500">Chuyên mục pháp luật về lừa đảo</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400" />
              </a>
              <a
                href="https://congan.com.vn/an-ninh-mang"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <span className="text-2xl">👮</span>
                <div className="flex-1">
                  <p className="text-white font-medium group-hover:text-emerald-400 transition-colors">Báo Công an Nhân dân</p>
                  <p className="text-xs text-gray-500">Chuyên mục An ninh mạng</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400" />
              </a>
              <a
                href="https://www.sbv.gov.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <span className="text-2xl">🏦</span>
                <div className="flex-1">
                  <p className="text-white font-medium group-hover:text-emerald-400 transition-colors">Ngân hàng Nhà nước Việt Nam</p>
                  <p className="text-xs text-gray-500">Cảnh báo lừa đảo tài chính, ngân hàng</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Back to Home - Fixed Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 rounded-2xl transition-all text-lg font-semibold"
          >
            <Home className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300">{language === 'vi' ? 'Quay lại trang chủ' : 'Back to Home'}</span>
          </Link>
        </motion.div>
      </div>
    </main>
    <Footer />
    </div>
  )
}
