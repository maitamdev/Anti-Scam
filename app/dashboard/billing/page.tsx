'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Download, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function BillingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [subscription, setSubscription] = useState<any>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user && session.user.tier !== 'FREE') {
      fetchSubscription()
    }
  }, [session])

  const fetchSubscription = async () => {
    try {
      const res = await fetch('/api/subscription')
      const data = await res.json()
      if (data.success) {
        setSubscription(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch subscription:', error)
    }
  }

  const handleManageSubscription = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()
      
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Failed to open portal:', error)
      alert('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!session) return null

  const isFree = session.user.tier === 'FREE'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          <CreditCard size={32} />
          Thanh toán & Gói dịch vụ
        </h1>

        {/* Current Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Gói hiện tại</h2>
          
          <div className={`inline-block px-6 py-3 rounded-lg font-bold text-lg mb-4 ${
            isFree ? 'bg-gray-200 text-gray-700' :
            session.user.tier === 'PRO' ? 'bg-blue-500 text-white' :
            session.user.tier === 'BUSINESS' ? 'bg-purple-500 text-white' :
            'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
          }`}>
            {session.user.tier} Plan
          </div>

          {!isFree && subscription && (
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>Trạng thái:</strong> {subscription.status}</p>
              <p><strong>Chu kỳ hiện tại:</strong> {new Date(subscription.currentPeriodStart).toLocaleDateString('vi-VN')} - {new Date(subscription.currentPeriodEnd).toLocaleDateString('vi-VN')}</p>
              {subscription.cancelAtPeriodEnd && (
                <p className="text-orange-600 font-semibold">
                  Gói sẽ hết hạn vào {new Date(subscription.currentPeriodEnd).toLocaleDateString('vi-VN')}
                </p>
              )}
            </div>
          )}

          <div className="mt-6 flex gap-4">
            {isFree ? (
              <Link
                href="/pricing"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Nâng cấp lên Pro
              </Link>
            ) : (
              <>
                <button
                  onClick={handleManageSubscription}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 flex items-center gap-2"
                >
                  <ExternalLink size={20} />
                  {loading ? 'Đang tải...' : 'Quản lý gói'}
                </button>
                <Link
                  href="/pricing"
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
                >
                  Thay đổi gói
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Usage Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Sử dụng hôm nay</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Scans</span>
                <span className="text-sm text-gray-600">
                  0 / {session.user.tier === 'FREE' ? '10' : session.user.tier === 'PRO' ? '100' : '1000'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Image Scans</span>
                <span className="text-sm text-gray-600">
                  0 / {session.user.tier === 'FREE' ? '3' : session.user.tier === 'PRO' ? '30' : '200'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment History */}
        {!isFree && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Lịch sử thanh toán</h2>
            
            <p className="text-gray-600 dark:text-gray-400">
              Xem lịch sử thanh toán và tải hóa đơn trong{' '}
              <button
                onClick={handleManageSubscription}
                className="text-blue-600 hover:underline"
              >
                Stripe Customer Portal
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
