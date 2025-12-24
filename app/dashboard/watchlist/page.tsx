'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, Plus, Trash2, Bell, BellOff } from 'lucide-react'

interface WatchlistItem {
  id: string
  type: string
  value: string
  name?: string
  notes?: string
  alertEmail: boolean
  alertInApp: boolean
  createdAt: string
  _count?: {
    alerts: number
  }
}

export default function WatchlistPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({
    type: 'DOMAIN',
    value: '',
    name: '',
    notes: '',
    alertEmail: true,
    alertInApp: true,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (session?.user.tier === 'FREE') {
      router.push('/pricing?feature=watchlist')
    }
  }, [status, session, router])

  useEffect(() => {
    if (session?.user && session.user.tier !== 'FREE') {
      fetchWatchlist()
    }
  }, [session])

  const fetchWatchlist = async () => {
    try {
      const res = await fetch('/api/watchlist')
      const data = await res.json()
      if (data.success) {
        setWatchlist(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch watchlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      })

      const data = await res.json()
      
      if (data.success) {
        setWatchlist([data.data, ...watchlist])
        setNewItem({
          type: 'DOMAIN',
          value: '',
          name: '',
          notes: '',
          alertEmail: true,
          alertInApp: true,
        })
        setShowAddForm(false)
      } else {
        alert(data.error || 'Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Failed to add:', error)
      alert('Có lỗi xảy ra')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa item này khỏi watchlist?')) return

    try {
      const res = await fetch(`/api/watchlist/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setWatchlist(watchlist.filter(item => item.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user.tier === 'FREE') return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Eye size={32} />
              Watchlist
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Theo dõi domains/emails/phones nghi ngờ. Nhận cảnh báo khi phát hiện.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Thêm mới
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Thêm vào Watchlist</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Loại</label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="DOMAIN">Domain</option>
                  <option value="EMAIL">Email</option>
                  <option value="PHONE">Số điện thoại</option>
                  <option value="BANK_ACCOUNT">Tài khoản ngân hàng</option>
                  <option value="SOCIAL_MEDIA">Social Media</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Giá trị *</label>
                <input
                  type="text"
                  required
                  value={newItem.value}
                  onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                  placeholder="vd: scam-website.com"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tên gợi nhớ</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="vd: Website giả mạo ngân hàng"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ghi chú</label>
                <textarea
                  value={newItem.notes}
                  onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newItem.alertEmail}
                    onChange={(e) => setNewItem({ ...newItem, alertEmail: e.target.checked })}
                  />
                  <span className="text-sm">Cảnh báo qua Email</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newItem.alertInApp}
                    onChange={(e) => setNewItem({ ...newItem, alertInApp: e.target.checked })}
                  />
                  <span className="text-sm">Cảnh báo trong App</span>
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Thêm
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Watchlist */}
        {watchlist.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <Eye size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Watchlist trống. Thêm domains/emails nghi ngờ để theo dõi.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {watchlist.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                      {item.type}
                    </span>
                    {item.name && (
                      <p className="font-medium mt-2">{item.name}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <p className="text-lg font-mono text-gray-900 dark:text-white mb-2 break-all">
                  {item.value}
                </p>

                {item.notes && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {item.notes}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {item.alertEmail && (
                    <span className="flex items-center gap-1">
                      <Bell size={14} /> Email
                    </span>
                  )}
                  {item.alertInApp && (
                    <span className="flex items-center gap-1">
                      <Bell size={14} /> In-app
                    </span>
                  )}
                  {item._count && item._count.alerts > 0 && (
                    <span className="text-orange-600 font-semibold">
                      {item._count.alerts} cảnh báo
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Thêm: {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
