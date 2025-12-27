'use client'

import { useEffect, useState } from 'react'
import { Trophy, Medal, Award, TrendingUp, Users, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface LeaderboardEntry {
  userId: string
  userName: string
  userAvatar: string | null
  totalScore: number
  totalQuizzes: number
  averageScore: number
  rank: number
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [period, setPeriod] = useState<'all' | 'week' | 'month'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [period])

  const fetchLeaderboard = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/quiz/leaderboard?period=${period}&limit=50`)
      const data = await res.json()
      if (data.success) {
        setLeaderboard(data.data.leaderboard)
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-8 h-8 text-yellow-500" />
    if (rank === 2) return <Medal className="w-8 h-8 text-gray-400" />
    if (rank === 3) return <Award className="w-8 h-8 text-amber-600" />
    return <span className="text-2xl font-bold text-gray-400">#{rank}</span>
  }

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30'
    if (rank === 2) return 'from-gray-400/20 to-gray-500/20 border-gray-400/30'
    if (rank === 3) return 'from-amber-500/20 to-amber-600/20 border-amber-500/30'
    return 'from-gray-800/50 to-gray-900/50 border-gray-700/50'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0d1425] to-[#0a0f1a] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mb-6 shadow-lg shadow-yellow-500/20">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
            Bảng Xếp Hạng
          </h1>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Những người dùng xuất sắc nhất trong việc nhận diện lừa đảo
          </p>
        </motion.div>

        {/* Period Filter */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { value: 'all', label: 'Tất cả' },
            { value: 'month', label: 'Tháng này' },
            { value: 'week', label: 'Tuần này' },
          ].map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value as any)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                period === p.value
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6"
          >
            <Users className="w-8 h-8 text-blue-400 mb-3" />
            <p className="text-gray-400 text-sm mb-1">Tổng người chơi</p>
            <p className="text-3xl font-bold text-white">{leaderboard.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6"
          >
            <Target className="w-8 h-8 text-green-400 mb-3" />
            <p className="text-gray-400 text-sm mb-1">Điểm trung bình</p>
            <p className="text-3xl font-bold text-white">
              {leaderboard.length > 0
                ? Math.round(
                    leaderboard.reduce((sum, e) => sum + e.averageScore, 0) /
                      leaderboard.length
                  )
                : 0}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6"
          >
            <TrendingUp className="w-8 h-8 text-purple-400 mb-3" />
            <p className="text-gray-400 text-sm mb-1">Tổng bài quiz</p>
            <p className="text-3xl font-bold text-white">
              {leaderboard.reduce((sum, e) => sum + e.totalQuizzes, 0)}
            </p>
          </motion.div>
        </div>

        {/* Leaderboard */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Đang tải bảng xếp hạng...</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">Chưa có dữ liệu xếp hạng</p>
            <Link
              href="/quiz"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Bắt đầu làm quiz
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboard.map((entry, index) => (
              <motion.div
                key={entry.userId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-gradient-to-r ${getRankBg(
                  entry.rank
                )} border rounded-xl p-6 backdrop-blur-sm hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center gap-6">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-16 flex justify-center">
                    {getRankIcon(entry.rank)}
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {entry.userAvatar ? (
                      <img
                        src={entry.userAvatar}
                        alt={entry.userName}
                        className="w-14 h-14 rounded-full border-2 border-gray-600"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                        {entry.userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white mb-1 truncate">
                      {entry.userName}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {entry.totalQuizzes} bài quiz • Trung bình {entry.averageScore} điểm
                    </p>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {entry.totalScore}
                    </p>
                    <p className="text-gray-400 text-sm">điểm</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all"
          >
            <Target className="w-5 h-5" />
            Làm quiz để lên bảng xếp hạng
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
