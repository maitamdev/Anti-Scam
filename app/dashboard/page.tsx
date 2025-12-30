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
  Settings,
  AlertTriangle,
  Search,
  Shield,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

interface UserStats {
  dailyScans: number
  totalScans: number
  watchlistAlerts: number
  recentScans: Array<{
    id: string
    url: string
    domain: string
    score: number
    label: string
    createdAt: string
  }>
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)

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
      const [historyRes, watchlistRes] = await Promise.all([
        fetch('/api/history?limit=5'),
        fetch('/api/watchlist'),
      ])
      
      const historyData = await historyRes.json()
      const watchlistData = await watchlistRes.json()
      
      // Count alerts from watchlist
      const alertCount = watchlistData.data?.reduce((acc: number, w: { alerts?: { length: number } }) => 
        acc + (w.alerts?.length || 0), 0) || 0
      
      setStats({
        dailyScans: session?.user?.dailyScans || 0,
        totalScans: session?.user?.totalScans || historyData.data?.length || 0,
        watchlistAlerts: alertCount,
        recentScans: historyData.data || [],
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
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

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Chào mừng trở lại, {session.user.name || session.user.email}
          </p>
        </div>

        {/* Tier Badge */}
        <div className="mb-8 flex items-center gap-4">
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
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">
                Lượt quét hôm nay
              </h3>
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white">
              {stats?.dailyScans || 0} / {dailyLimit}
            </p>
            <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                style={{ width: `${Math.min(((stats?.dailyScans || 0) / dailyLimit) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">
                Tổng lượt quét
              </h3>
              <BarChart3 className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-white">
              {stats?.totalScans || 0}
            </p>
            <p className="text-sm text-gray-500 mt-2">Tất cả thời gian</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">
                Cảnh báo Watchlist
              </h3>
              <AlertTriangle className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-3xl font-bold text-orange-400">
              {stats?.watchlistAlerts || 0}
            </p>
            <p className="text-sm text-gray-500 mt-2">Cần xem xét</p>
          </div>
        </div>

        {/* Recent Scans */}
        {stats?.recentScans && stats.recentScans.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Quét gần đây</h2>
              <Link href="/dashboard/history" className="text-blue-400 hover:text-blue-300 text-sm">
                Xem tất cả →
              </Link>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              {stats.recentScans.map((scan, index) => (
                <div 
                  key={scan.id}
                  className={`p-4 flex items-center justify-between ${
                    index !== stats.recentScans.length - 1 ? 'border-b border-gray-700' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{scan.domain}</p>
                    <p className="text-gray-500 text-sm truncate">{scan.url}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLabelColor(scan.label)}`}>
                      {scan.label}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(scan.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menu Grid */}
        <h2 className="text-xl font-semibold text-white mb-4">Tính năng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} bg-opacity-20`}>
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
      </div>
    </div>
  )
}
