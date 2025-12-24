'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { History, Search, Filter, Download, Share2, Trash2, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface ScanHistoryItem {
  id: string
  url: string
  domain: string
  score: number
  label: string
  reasons: string[]
  aiConfidence: number
  shareToken?: string
  createdAt: string
}

export default function HistoryPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [history, setHistory] = useState<ScanHistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterLabel, setFilterLabel] = useState<string>('ALL')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?redirect=/dashboard/history')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      fetchHistory()
    }
  }, [session])

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history')
      const data = await res.json()
      if (data.success) {
        setHistory(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch history:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa lần quét này?')) return

    try {
      const res = await fetch(`/api/history/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setHistory(history.filter(item => item.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  const handleExport = async () => {
    try {
      const res = await fetch('/api/history/export')
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `scan-history-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
    } catch (error) {
      console.error('Failed to export:', error)
    }
  }

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.url.toLowerCase().includes(search.toLowerCase()) ||
                         item.domain.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filterLabel === 'ALL' || item.label === filterLabel
    return matchesSearch && matchesFilter
  })

  const getLabelColor = (label: string) => {
    switch (label) {
      case 'SAFE': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'CAUTION': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'DANGEROUS': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Đang tải lịch sử...</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  // Free tier limit
  const isFree = session.user.tier === 'FREE'
  const displayHistory = isFree ? filteredHistory.slice(0, 10) : filteredHistory

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <History size={32} />
              Lịch sử quét
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {isFree ? 'Gói Free: Chỉ lưu 10 lần quét gần nhất' : `Tổng ${history.length} lần quét`}
            </p>
          </div>
          {session.user.tier !== 'FREE' && (
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Download size={20} />
              Xuất CSV
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm URL hoặc domain..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={filterLabel}
                onChange={(e) => setFilterLabel(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="ALL">Tất cả</option>
                <option value="SAFE">An toàn</option>
                <option value="CAUTION">Cảnh báo</option>
                <option value="DANGEROUS">Nguy hiểm</option>
              </select>
            </div>
          </div>
        </div>

        {/* Upgrade notice for free users */}
        {isFree && history.length > 10 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p className="text-blue-900 dark:text-blue-200">
              Bạn có {history.length - 10} lần quét cũ hơn. 
              <Link href="/pricing" className="font-semibold ml-2 underline hover:text-blue-700">
                Nâng cấp lên Pro để xem tất cả →
              </Link>
            </p>
          </div>
        )}

        {/* History List */}
        {displayHistory.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <History size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {search || filterLabel !== 'ALL' 
                ? 'Không tìm thấy kết quả' 
                : 'Chưa có lịch sử quét nào'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayHistory.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLabelColor(item.label)}`}>
                        {item.label}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </div>
                    
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-lg font-medium flex items-center gap-2 break-all"
                    >
                      {item.url}
                      <ExternalLink size={16} />
                    </a>
                    
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>Domain: <strong>{item.domain}</strong></span>
                      <span>Score: <strong>{item.score}</strong></span>
                      <span>AI: <strong>{(item.aiConfidence * 100).toFixed(0)}%</strong></span>
                    </div>

                    {item.reasons.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lý do:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {item.reasons.slice(0, 3).map((reason, idx) => (
                            <li key={idx}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {item.shareToken && (
                      <button
                        onClick={() => {
                          const shareUrl = `${window.location.origin}/share/${item.shareToken}`
                          navigator.clipboard.writeText(shareUrl)
                          alert('Đã copy link chia sẻ!')
                        }}
                        className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                        title="Chia sẻ"
                      >
                        <Share2 size={20} />
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                      title="Xóa"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
