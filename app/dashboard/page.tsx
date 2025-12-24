'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { 
  BarChart3, 
  History, 
  Eye, 
  CreditCard, 
  Key, 
  Settings,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  const menuItems = [
    {
      title: 'Thống kê',
      href: '/dashboard',
      icon: BarChart3,
      description: 'Xem tổng quan hoạt động',
    },
    {
      title: 'Lịch sử quét',
      href: '/dashboard/history',
      icon: History,
      description: 'Xem lại các lần quét',
    },
    {
      title: 'Watchlist',
      href: '/dashboard/watchlist',
      icon: Eye,
      description: 'Theo dõi domain nghi ngờ',
    },
    {
      title: 'Thanh toán',
      href: '/dashboard/billing',
      icon: CreditCard,
      description: 'Quản lý gói dịch vụ',
    },
    {
      title: 'API Keys',
      href: '/dashboard/api-keys',
      icon: Key,
      description: 'Quản lý API keys',
    },
    {
      title: 'Cài đặt',
      href: '/dashboard/settings',
      icon: Settings,
      description: 'Cài đặt tài khoản',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Chào mừng trở lại, {session.user.name || session.user.email}
          </p>
        </div>

        {/* Tier Badge */}
        <div className="mb-8 flex items-center gap-4">
          <div className={`px-4 py-2 rounded-lg font-semibold ${
            session.user.tier === 'FREE' ? 'bg-gray-200 text-gray-700' :
            session.user.tier === 'PRO' ? 'bg-blue-500 text-white' :
            session.user.tier === 'BUSINESS' ? 'bg-purple-500 text-white' :
            'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
          }`}>
            {session.user.tier} Plan
          </div>
          {session.user.tier === 'FREE' && (
            <Link 
              href="/pricing"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
            >
              Nâng cấp lên Pro →
            </Link>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Lượt quét hôm nay
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              0 / {session.user.tier === 'FREE' ? '10' : session.user.tier === 'PRO' ? '100' : '1000'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Tổng lượt quét
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              0
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Cảnh báo Watchlist
            </h3>
            <p className="text-3xl font-bold text-orange-600 mt-2 flex items-center gap-2">
              <AlertTriangle size={24} />
              0
            </p>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
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
