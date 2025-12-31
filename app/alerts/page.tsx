'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Shield, Clock, Eye, ChevronRight, Filter, Search, Bell, TrendingUp, Home } from 'lucide-react'
import Link from 'next/link'

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

const categoryLabels: Record<string, string> = {
  PHISHING: 'Giả mạo',
  INVESTMENT: 'Đầu tư',
  ROMANCE: 'Tình cảm',
  JOB: 'Việc làm',
  PRIZE: 'Trúng thưởng',
  IMPERSONATION: 'Mạo danh',
  CRYPTO: 'Tiền ảo',
  OTHER: 'Khác',
}

const severityColors: Record<string, string> = {
  CRITICAL: 'bg-red-500/20 text-red-400 border-red-500/30',
  HIGH: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  MEDIUM: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  LOW: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

const severityLabels: Record<string, string> = {
  CRITICAL: 'Nghiêm trọng',
  HIGH: 'Cao',
  MEDIUM: 'Trung bình',
  LOW: 'Thấp',
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<ScamAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedSeverity, setSelectedSeverity] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')

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
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
            <Bell className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-medium">Cập nhật liên tục</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Cảnh báo </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Lừa đảo</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Thông tin mới nhất về các chiêu trò lừa đảo đang hoành hành tại Việt Nam
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{alerts.length}</div>
            <div className="text-sm text-gray-400">Cảnh báo</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
            <Shield className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {alerts.filter(a => a.severity === 'CRITICAL').length}
            </div>
            <div className="text-sm text-gray-400">Nghiêm trọng</div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
            <TrendingUp className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {alerts.reduce((sum, a) => sum + a.reportCount, 0)}
            </div>
            <div className="text-sm text-gray-400">Báo cáo</div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-center">
            <Eye className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {alerts.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Lượt xem</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm cảnh báo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
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
                <option value="">Tất cả loại</option>
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
              <option value="">Tất cả mức độ</option>
              {Object.entries(severityLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </motion.div>

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
            <h3 className="text-xl font-semibold text-white mb-2">Chưa có cảnh báo nào</h3>
            <p className="text-gray-400">Hệ thống đang cập nhật thông tin mới nhất</p>
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
            <h3 className="text-xl font-bold text-white mb-2">Bạn phát hiện chiêu trò lừa đảo mới?</h3>
            <p className="text-gray-400 mb-4">Hãy báo cáo để giúp cộng đồng cảnh giác</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/report"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
              >
                <AlertTriangle className="w-5 h-5" />
                Báo cáo ngay
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-xl text-gray-300 font-semibold hover:bg-white/5 transition-all"
              >
                <Home className="w-5 h-5" />
                Về trang chủ
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
