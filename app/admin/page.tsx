'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Shield,
  AlertTriangle,
  Users,
  Brain,
  RefreshCw,
  Lock,
  LogOut,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ChartPanel from '../components/ChartPanel'
import RiskBadge from '../components/RiskBadge'

interface StatsData {
  totalScans: number
  safeCount: number
  cautionCount: number
  dangerousCount: number
  reportsCount: number
  dailyStats: Array<{
    date: string
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
    url: string
    domain: string
    score: number
    label: 'SAFE' | 'CAUTION' | 'DANGEROUS'
    createdAt: string
  }>
}

interface ModelInfo {
  version: number
  samples: number
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  trainedAt: string
  pendingTrainingData: number
  backend: string
}

// Login Form Component
function LoginForm({ onLogin }: { onLogin: (secret: string) => void }) {
  const [secret, setSecret] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      })

      const data = await res.json()

      if (data.success) {
        // Save to session storage (not localStorage for security)
        sessionStorage.setItem('admin_auth', secret)
        onLogin(secret)
      } else {
        setError('Mật khẩu không đúng')
      }
    } catch {
      setError('Lỗi kết nối')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-8 border border-gray-700 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Nhập mật khẩu để truy cập</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Nhập Admin Secret..."
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !secret}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Đăng nhập
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

// Main Admin Dashboard
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminSecret, setAdminSecret] = useState('')
  const [stats, setStats] = useState<StatsData | null>(null)
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Check existing auth on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('admin_auth')
    if (savedAuth) {
      // Verify saved auth
      fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: savedAuth }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setAdminSecret(savedAuth)
            setIsAuthenticated(true)
          } else {
            sessionStorage.removeItem('admin_auth')
          }
        })
        .finally(() => setCheckingAuth(false))
    } else {
      setCheckingAuth(false)
    }
  }, [])

  const handleLogin = (secret: string) => {
    setAdminSecret(secret)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    setIsAuthenticated(false)
    setAdminSecret('')
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const [statsRes, modelRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/model/info'),
      ])

      const statsData = await statsRes.json()
      const modelData = await modelRes.json()

      if (statsData.success) setStats(statsData.data)
      if (modelData.success) setModelInfo(modelData.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated])

  // Show loading while checking auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
        <Footer />
      </div>
    )
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />
  }

  // Show loading while fetching data
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-blue-500" />
                  Dashboard
                </h1>
                <p className="text-gray-400 mt-1">
                  Thống kê và quản lý hệ thống ANTISCAM
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={fetchData}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Làm mới
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Tổng lượt kiểm tra</p>
                    <p className="text-2xl font-bold">
                      {stats?.totalScans.toLocaleString() || 0}
                    </p>
                  </div>
                  <Shield className="w-10 h-10 text-blue-500 opacity-50" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">An toàn</p>
                    <p className="text-2xl font-bold text-green-400">
                      {stats?.safeCount.toLocaleString() || 0}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-xl">🟢</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Nguy hiểm</p>
                    <p className="text-2xl font-bold text-red-400">
                      {stats?.dangerousCount.toLocaleString() || 0}
                    </p>
                  </div>
                  <AlertTriangle className="w-10 h-10 text-red-500 opacity-50" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Báo cáo</p>
                    <p className="text-2xl font-bold">
                      {stats?.reportsCount.toLocaleString() || 0}
                    </p>
                  </div>
                  <Users className="w-10 h-10 text-purple-500 opacity-50" />
                </div>
              </motion.div>
            </div>

            {/* Model Info */}
            {modelInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8"
              >
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  Thông tin mô hình AI
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Phiên bản</p>
                    <p className="font-semibold">v{modelInfo.version}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Mẫu đã học</p>
                    <p className="font-semibold">
                      {modelInfo.samples.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Accuracy</p>
                    <p className="font-semibold text-green-400">
                      {(modelInfo.accuracy * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Precision</p>
                    <p className="font-semibold">
                      {modelInfo.precision
                        ? (modelInfo.precision * 100).toFixed(1)
                        : 'N/A'}
                      %
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Recall</p>
                    <p className="font-semibold">
                      {modelInfo.recall
                        ? (modelInfo.recall * 100).toFixed(1)
                        : 'N/A'}
                      %
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Backend</p>
                    <p className="font-semibold capitalize">{modelInfo.backend}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Charts */}
            {stats && <ChartPanel data={stats} />}

            {/* Recent Scans */}
            {stats?.recentScans && stats.recentScans.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 mt-8"
              >
                <h2 className="text-lg font-semibold mb-4">Kiểm tra gần đây</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                        <th className="pb-3">Domain</th>
                        <th className="pb-3">Điểm</th>
                        <th className="pb-3">Đánh giá</th>
                        <th className="pb-3">Thời gian</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentScans.map((scan) => (
                        <tr
                          key={scan.id}
                          className="border-b border-gray-700/50"
                        >
                          <td className="py-3 text-sm">{scan.domain}</td>
                          <td className="py-3">
                            <span
                              className={`font-medium ${
                                scan.score <= 30
                                  ? 'text-green-400'
                                  : scan.score <= 60
                                    ? 'text-yellow-400'
                                    : 'text-red-400'
                              }`}
                            >
                              {scan.score}
                            </span>
                          </td>
                          <td className="py-3">
                            <RiskBadge label={scan.label} size="sm" />
                          </td>
                          <td className="py-3 text-sm text-gray-400">
                            {new Date(scan.createdAt).toLocaleString('vi-VN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
