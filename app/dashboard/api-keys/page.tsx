'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Key, Plus, Trash2, Copy, Eye, EyeOff } from 'lucide-react'

interface ApiKeyItem {
  id: string
  name: string
  prefix: string
  lastUsedAt?: string
  createdAt: string
}

export default function ApiKeysPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (session?.user.tier === 'FREE' || session?.user.tier === 'PRO') {
      router.push('/pricing?feature=api')
    }
  }, [status, session, router])

  useEffect(() => {
    if (session?.user && (session.user.tier === 'BUSINESS' || session.user.tier === 'ENTERPRISE')) {
      fetchApiKeys()
    }
  }, [session])

  const fetchApiKeys = async () => {
    try {
      const res = await fetch('/api/api-keys')
      const data = await res.json()
      if (data.success) {
        setApiKeys(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch API keys:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch('/api/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName }),
      })

      const data = await res.json()
      
      if (data.success) {
        setNewlyCreatedKey(data.key)
        setApiKeys([data.data, ...apiKeys])
        setNewKeyName('')
      } else {
        alert(data.error || 'Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Failed to create:', error)
      alert('Có lỗi xảy ra')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa API key này? Các ứng dụng đang dùng key này sẽ không hoạt động.')) return

    try {
      const res = await fetch(`/api/api-keys/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setApiKeys(apiKeys.filter(key => key.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Đã copy!')
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

  if (!session || session.user.tier === 'FREE' || session.user.tier === 'PRO') return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Key size={32} />
              API Keys
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Quản lý API keys cho tích hợp với ứng dụng của bạn
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Tạo key mới
          </button>
        </div>

        {/* Create Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => !newlyCreatedKey && setShowCreateForm(false)}>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
              {newlyCreatedKey ? (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-green-600">✅ Key đã tạo thành công!</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Lưu key này ngay. Bạn sẽ không thể xem lại!
                    </p>
                    <code className="block text-sm font-mono break-all text-gray-900 dark:text-white mb-2">
                      {newlyCreatedKey}
                    </code>
                    <button
                      onClick={() => copyToClipboard(newlyCreatedKey)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <Copy size={16} />
                      Copy key
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setNewlyCreatedKey(null)
                      setShowCreateForm(false)
                    }}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Đã lưu key, đóng
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCreate}>
                  <h3 className="text-xl font-bold mb-4">Tạo API Key mới</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Tên key</label>
                    <input
                      type="text"
                      required
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="vd: Production Server"
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Tạo
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* API Documentation */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-2">📖 API Documentation</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Xem hướng dẫn chi tiết cách sử dụng API tại <a href="/docs/api" className="text-blue-600 hover:underline font-semibold">docs/api</a>
          </p>
          <div className="bg-white dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Example: Scan URL</p>
            <code className="block text-xs font-mono overflow-x-auto">
              curl -X POST {process.env.NEXT_PUBLIC_APP_URL}/api/scan \<br/>
              &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY" \<br/>
              &nbsp;&nbsp;-H "Content-Type: application/json" \<br/>
              &nbsp;&nbsp;-d '{`{"url": "https://example.com"}`}'
            </code>
          </div>
        </div>

        {/* API Keys List */}
        {apiKeys.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <Key size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Chưa có API key nào. Tạo key đầu tiên để bắt đầu tích hợp.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Key
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Dùng lần cuối
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tạo lúc
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {key.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-sm font-mono text-gray-600 dark:text-gray-400">
                        {key.prefix}••••••••••••
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleDateString('vi-VN') : 'Chưa dùng'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(key.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => handleDelete(key.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Rate Limits */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-6">
          <h3 className="font-semibold mb-4">Rate Limits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border dark:border-gray-700 rounded-lg p-4">
              <p className="text-2xl font-bold text-blue-600">
                {session.user.tier === 'BUSINESS' ? '50,000' : 'Unlimited'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">API calls/tháng</p>
            </div>
            <div className="border dark:border-gray-700 rounded-lg p-4">
              <p className="text-2xl font-bold text-green-600">
                {session.user.tier === 'BUSINESS' ? '100' : 'Unlimited'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Requests/phút</p>
            </div>
            <div className="border dark:border-gray-700 rounded-lg p-4">
              <p className="text-2xl font-bold text-purple-600">
                {apiKeys.length}/10
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">API keys</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
