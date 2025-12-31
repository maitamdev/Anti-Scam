'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { 
  BarChart3, 
  History, 
  Eye, 
  CreditCard, 
  Key, 
  AlertTriangle,
  Search,
  Shield,
  TrendingUp,
  Calendar,
  Target,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface UserStats {
  totalScans: number
  safeCount: number
  cautionCount: number
  dangerousCount: number
  avgScore: number
  scansToday: number
  scansThisWeek: number
  scansThisMonth: number
  dailyStats: Array<{
    date: string
    scans: number
    safe: number
    caution: number
    dangerous: number
  }>
  monthlyStats: Array<{
    month: string
    scans: number
    safe: number
    caution: number
    dangerous: number
  }>
  topDomains: Array<{
    domain: string
    count: number
  }>
  recentScans: Array<{
    id: string
    domain: string
    score: number
    label: string
    createdAt: string
  }>
}

const COLORS = {
  safe: '#22c55e',
  caution: '#f59e0b', 
  dangerous: '#ef4444'
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [chartView, setChartView] = useState<'daily' | 'monthly'>('daily')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      fetchStats()
    }
  }, [session])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/user/stats')
      const data = await res.json()
      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  const tierLimits = {
    FREE: 10,
    PRO: 100,
    BUSINESS: 1000,
    ENTERPRISE: 10000,
  }
  const dailyLimit = tierLimits[session.user.tier as keyof typeof tierLimits] || 10

  const pieData = stats ? [
    { name: 'An toàn', value: stats.safeCount, color: COLORS.safe },
    { name: 'Cảnh báo', value: stats.cautionCount, color: COLORS.caution },
    { name: 'Nguy hiểm', value: stats.dangerousCount, color: COLORS.dangerous },
  ].filter(d => d.value > 0) : []

  const menuItems = [
    {
      title: 'Kiểm tra URL',
      href: '/scan',
      icon: Search,
      description: 'Phân tích website đáng ngờ',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Lịch sử quét',
      href: '/dashboard/history',
      icon: History,
      description: 'Xem lại các lần quét',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Watchlist',
      href: '/dashboard/watchlist',
      icon: Eye,
      description: 'Theo dõi domain nghi ngờ',
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Quiz Trắc nghiệm',
      href: '/quiz',
      icon: Shield,
      description: 'Kiểm tra kiến thức',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'API Keys',
      href: '/dashboard/api-keys',
      icon: Key,
      description: 'Quản lý API keys',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Thanh toán',
      href: '/dashboard/billing',
      icon: CreditCard,
      description: 'Quản lý gói dịch vụ',
      color: 'from-indigo-500 to-purple-500',
    },
  ]

  const getLabelColor = (label: string) => {
    switch (label) {
      case 'SAFE': return 'text-green-400 bg-green-500/20'
      case 'CAUTION': return 'text-yellow-400 bg-yellow-500/20'
      case 'DANGEROUS': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getLabelIcon = (label: string) => {
    switch (label) {
      case 'SAFE': return <CheckCircle className="w-4 h-4" />
      case 'CAUTION': return <AlertCircle className="w-4 h-4" />
      case 'DANGEROUS': return <XCircle className="w-4 h-4" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Chào mừng trở lại, {session.user.name || session.user.email}
            </p>
          </motion.div>

          {/* Tier Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 flex items-center gap-4"
          >
            <div className={`px-4 py-2 rounded-lg font-semibold ${
              session.user.tier === 'FREE' ? 'bg-gray-700 text-gray-300' :
              session.user.tier === 'PRO' ? 'bg-blue-500 text-white' :
              session.user.tier === 'BUSINESS' ? 'bg-purple-500 text-white' :
              'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
            }`}>
              {session.user.tier} Plan
            </div>
            {session.user.tier === 'FREE' && (
              <Link 
                href="/pricing"
                className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2"
              >
                Nâng cấp lên Pro →
              </Link>
            )}
          </motion.div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-5 rounded-xl border border-blue-500/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/30 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-sm text-gray-400">Hôm nay</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats?.scansToday || 0}</p>
              <p className="text-xs text-gray-500 mt-1">/ {dailyLimit} lượt</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-5 rounded-xl border border-purple-500/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-sm text-gray-400">Tuần này</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats?.scansThisWeek || 0}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-5 rounded-xl border border-green-500/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/30 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-sm text-gray-400">Tổng cộng</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats?.totalScans || 0}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-5 rounded-xl border border-orange-500/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-500/30 rounded-lg">
                  <Target className="w-5 h-5 text-orange-400" />
                </div>
                <span className="text-sm text-gray-400">Điểm TB</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats?.avgScore || 0}</p>
              <p className="text-xs text-gray-500 mt-1">/ 100 điểm</p>
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Pie Chart - Distribution */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Phân bố kết quả
              </h3>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151', 
                        borderRadius: '8px' 
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[220px] flex items-center justify-center text-gray-500">
                  Chưa có dữ liệu
                </div>
              )}
              {/* Legend */}
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-400">An toàn ({stats?.safeCount || 0})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-400">Cảnh báo ({stats?.cautionCount || 0})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-400">Nguy hiểm ({stats?.dangerousCount || 0})</span>
                </div>
              </div>
            </motion.div>

            {/* Area Chart - Trend */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700 lg:col-span-2"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Lượt quét theo thời gian
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setChartView('daily')}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      chartView === 'daily' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    7 ngày
                  </button>
                  <button
                    onClick={() => setChartView('monthly')}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      chartView === 'monthly' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    6 tháng
                  </button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartView === 'daily' ? stats?.dailyStats : stats?.monthlyStats}>
                  <defs>
                    <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey={chartView === 'daily' ? 'date' : 'month'} 
                    stroke="#9ca3af" 
                    fontSize={12} 
                  />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151', 
                      borderRadius: '8px' 
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="scans" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorScans)" 
                    name="Lượt quét"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Stacked Bar Chart - Results by Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700 mb-8"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Chi tiết kết quả theo {chartView === 'daily' ? 'ngày' : 'tháng'}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartView === 'daily' ? stats?.dailyStats : stats?.monthlyStats}>
                <XAxis 
                  dataKey={chartView === 'daily' ? 'date' : 'month'} 
                  stroke="#9ca3af" 
                  fontSize={12} 
                />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151', 
                    borderRadius: '8px' 
                  }}
                />
                <Legend />
                <Bar dataKey="safe" stackId="a" fill={COLORS.safe} name="An toàn" radius={[0, 0, 0, 0]} />
                <Bar dataKey="caution" stackId="a" fill={COLORS.caution} name="Cảnh báo" radius={[0, 0, 0, 0]} />
                <Bar dataKey="dangerous" stackId="a" fill={COLORS.dangerous} name="Nguy hiểm" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Scans & Top Domains */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Scans */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-gray-800/50 backdrop-blur rounded-xl border border-gray-700 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-400" />
                  Quét gần đây
                </h3>
                <Link href="/dashboard/history" className="text-blue-400 hover:text-blue-300 text-sm">
                  Xem tất cả →
                </Link>
              </div>
              <div className="divide-y divide-gray-700">
                {stats?.recentScans && stats.recentScans.length > 0 ? (
                  stats.recentScans.map((scan) => (
                    <div key={scan.id} className="p-4 hover:bg-gray-700/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{scan.domain}</p>
                          <p className="text-gray-500 text-sm">
                            {new Date(scan.createdAt).toLocaleDateString('vi-VN', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 text-sm">{scan.score}/100</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getLabelColor(scan.label)}`}>
                            {getLabelIcon(scan.label)}
                            {scan.label === 'SAFE' ? 'An toàn' : scan.label === 'CAUTION' ? 'Cảnh báo' : 'Nguy hiểm'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Chưa có lịch sử quét</p>
                    <Link href="/scan" className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block">
                      Bắt đầu quét ngay →
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Top Domains */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800/50 backdrop-blur rounded-xl border border-gray-700 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Domain quét nhiều nhất
                </h3>
              </div>
              <div className="p-4">
                {stats?.topDomains && stats.topDomains.length > 0 ? (
                  <div className="space-y-3">
                    {stats.topDomains.map((item, index) => (
                      <div key={item.domain} className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-500 text-black' :
                          index === 1 ? 'bg-gray-400 text-black' :
                          index === 2 ? 'bg-orange-600 text-white' :
                          'bg-gray-700 text-gray-300'
                        }`}>
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white truncate">{item.domain}</p>
                        </div>
                        <span className="text-gray-400 text-sm">{item.count} lần</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Chưa có dữ liệu</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Menu Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">Tính năng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-gray-800/50 backdrop-blur p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all group hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color}`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
