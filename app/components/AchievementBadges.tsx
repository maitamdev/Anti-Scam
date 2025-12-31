'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Star, Zap, Target, Trophy, Medal, Crown, Flame, Eye } from 'lucide-react'

interface Badge {
  id: string
  icon: React.ElementType
  nameVi: string
  nameEn: string
  descVi: string
  descEn: string
  color: string
  bgColor: string
  requirement: string
  unlocked: boolean
  progress?: number
  maxProgress?: number
}

interface Props {
  language: string
  userStats?: {
    totalScans: number
    quizScore: number
    reportsSubmitted: number
    daysActive: number
  }
}

export default function AchievementBadges({ language, userStats }: Props) {
  const stats = userStats || {
    totalScans: 0,
    quizScore: 0,
    reportsSubmitted: 0,
    daysActive: 0
  }

  const badges: Badge[] = [
    {
      id: 'first-scan',
      icon: Shield,
      nameVi: 'Người mới',
      nameEn: 'Newcomer',
      descVi: 'Hoàn thành lần quét đầu tiên',
      descEn: 'Complete your first scan',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      requirement: '1 scan',
      unlocked: stats.totalScans >= 1,
      progress: Math.min(stats.totalScans, 1),
      maxProgress: 1
    },
    {
      id: 'scanner-10',
      icon: Eye,
      nameVi: 'Thám tử',
      nameEn: 'Detective',
      descVi: 'Quét 10 URL/hình ảnh',
      descEn: 'Scan 10 URLs/images',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
      requirement: '10 scans',
      unlocked: stats.totalScans >= 10,
      progress: Math.min(stats.totalScans, 10),
      maxProgress: 10
    },
    {
      id: 'scanner-50',
      icon: Zap,
      nameVi: 'Chuyên gia',
      nameEn: 'Expert',
      descVi: 'Quét 50 URL/hình ảnh',
      descEn: 'Scan 50 URLs/images',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      requirement: '50 scans',
      unlocked: stats.totalScans >= 50,
      progress: Math.min(stats.totalScans, 50),
      maxProgress: 50
    },
    {
      id: 'scanner-100',
      icon: Crown,
      nameVi: 'Bậc thầy',
      nameEn: 'Master',
      descVi: 'Quét 100 URL/hình ảnh',
      descEn: 'Scan 100 URLs/images',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      requirement: '100 scans',
      unlocked: stats.totalScans >= 100,
      progress: Math.min(stats.totalScans, 100),
      maxProgress: 100
    },
    {
      id: 'quiz-master',
      icon: Trophy,
      nameVi: 'Quiz Master',
      nameEn: 'Quiz Master',
      descVi: 'Đạt 80% điểm quiz',
      descEn: 'Score 80% on quiz',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      requirement: '80% score',
      unlocked: stats.quizScore >= 80,
      progress: Math.min(stats.quizScore, 80),
      maxProgress: 80
    },
    {
      id: 'reporter',
      icon: Target,
      nameVi: 'Người báo cáo',
      nameEn: 'Reporter',
      descVi: 'Gửi 5 báo cáo lừa đảo',
      descEn: 'Submit 5 scam reports',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      requirement: '5 reports',
      unlocked: stats.reportsSubmitted >= 5,
      progress: Math.min(stats.reportsSubmitted, 5),
      maxProgress: 5
    },
    {
      id: 'loyal',
      icon: Flame,
      nameVi: 'Trung thành',
      nameEn: 'Loyal',
      descVi: 'Hoạt động 7 ngày liên tiếp',
      descEn: '7 days streak',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      requirement: '7 days',
      unlocked: stats.daysActive >= 7,
      progress: Math.min(stats.daysActive, 7),
      maxProgress: 7
    },
    {
      id: 'champion',
      icon: Medal,
      nameVi: 'Nhà vô địch',
      nameEn: 'Champion',
      descVi: 'Mở khóa tất cả huy hiệu',
      descEn: 'Unlock all badges',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      requirement: 'All badges',
      unlocked: false, // Special badge
    },
  ]

  const unlockedCount = badges.filter(b => b.unlocked).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 rounded-lg">
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">
              {language === 'vi' ? 'Huy hiệu Thành tích' : 'Achievement Badges'}
            </h3>
            <p className="text-xs text-gray-500">
              {unlockedCount}/{badges.length} {language === 'vi' ? 'đã mở khóa' : 'unlocked'}
            </p>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-4 gap-3">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="relative group"
          >
            <div
              className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 transition-all ${
                badge.unlocked 
                  ? `${badge.bgColor} border border-white/10` 
                  : 'bg-gray-800/50 border border-gray-700/50 opacity-50'
              }`}
            >
              <badge.icon className={`w-6 h-6 ${badge.unlocked ? badge.color : 'text-gray-600'}`} />
              {!badge.unlocked && badge.progress !== undefined && (
                <div className="absolute bottom-1 left-1 right-1">
                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${(badge.progress / (badge.maxProgress || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
              <p className="text-sm font-medium text-white">
                {language === 'vi' ? badge.nameVi : badge.nameEn}
              </p>
              <p className="text-xs text-gray-400">
                {language === 'vi' ? badge.descVi : badge.descEn}
              </p>
              {!badge.unlocked && badge.progress !== undefined && (
                <p className="text-xs text-blue-400 mt-1">
                  {badge.progress}/{badge.maxProgress}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            {language === 'vi' ? 'Tiến độ tổng' : 'Overall Progress'}
          </span>
          <span className="text-white font-medium">
            {Math.round((unlockedCount / badges.length) * 100)}%
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${(unlockedCount / badges.length) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  )
}
