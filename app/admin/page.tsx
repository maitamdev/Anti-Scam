'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Shield, AlertTriangle, Users, RefreshCw } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface StatsData {
  totalScans: number
  safeCount: number
  cautionCount: number
  dangerousCount: number
  reportsCount: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stats')
      const data = await res.json()
      if (data.success) setStats(data.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
        <Footer />
      </div>
    )
  }

  const safePercent = stats?.totalScans ? Math.round((stats.safeCount / stats.totalScans) * 100) : 0
  const dangerPercent = stats?.totalScans ? Math.round((stats.dangerousCount / stats.totalScans) * 100) : 0

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
      <Header />

      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-500" />
                Thống kê
              </h1>
              <p className="text-gray-400 mt-1">
                Tổng quan hoạt động của hệ thống ANTI-SCAM
              </p>
            </div>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-[#1a2332] hover:bg-[#1f2937] border border-gray-700 rounded-lg flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Làm mới
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111827] rounded-2xl p-6 border border-gray-800"
            >
              <Shield className="w-8 h-8 text-blue-500 mb-3" />
              <p className="text-3xl font-bold">{stats?.totalScans.toLocaleString() || 0}</p>
              <p className="text-gray-400 text-sm">Lượt kiểm tra</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#111827] rounded-2xl p-6 border border-gray-800"
            >
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                <span className="text-lg">✓</span>
              </div>
              <p className="text-3xl font-bold text-green-400">{stats?.safeCount.toLocaleString() || 0}</p>
              <p className="text-gray-400 text-sm">Website an toàn</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#111827] rounded-2xl p-6 border border-gray-800"
            >
              <AlertTriangle className="w-8 h-8 text-red-500 mb-3" />
              <p className="text-3xl font-bold text-red-400">{stats?.dangerousCount.toLocaleString() || 0}</p>
              <p className="text-gray-400 text-sm">Website nguy hiểm</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#111827] rounded-2xl p-6 border border-gray-800"
            >
              <Users className="w-8 h-8 text-purple-500 mb-3" />
              <p className="text-3xl font-bold">{stats?.reportsCount.toLocaleString() || 0}</p>
              <p className="text-gray-400 text-sm">Báo cáo cộng đồng</p>
            </motion.div>
          </div>

          {/* Simple Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#111827] rounded-2xl p-6 border border-gray-800"
          >
            <h2 className="text-lg font-semibold mb-6">Tỷ lệ phân loại</h2>
            
            <div className="space-y-4">
              {/* Safe bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">An toàn</span>
                  <span className="text-green-400 font-medium">{safePercent}%</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${safePercent}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>

              {/* Caution bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Cần cẩn thận</span>
                  <span className="text-yellow-400 font-medium">
                    {stats?.totalScans ? Math.round((stats.cautionCount / stats.totalScans) * 100) : 0}%
                  </span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${stats?.totalScans ? (stats.cautionCount / stats.totalScans) * 100 : 0}%` }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </div>
              </div>

              {/* Dangerous bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Nguy hiểm</span>
                  <span className="text-red-400 font-medium">{dangerPercent}%</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${dangerPercent}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-sm text-center">
                Hệ thống đã phát hiện <span className="text-red-400 font-semibold">{stats?.dangerousCount || 0}</span> website nguy hiểm 
                từ <span className="text-white font-semibold">{stats?.totalScans.toLocaleString() || 0}</span> lượt kiểm tra
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
