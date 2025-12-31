'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Target, Clock, Award, Share2 } from 'lucide-react'
import ShareButtons from './ShareButtons'

interface Props {
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent?: number
  language?: string
}

export default function QuizResultCard({ 
  score, 
  totalQuestions, 
  correctAnswers,
  timeSpent,
  language = 'vi'
}: Props) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100)
  
  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-400', bg: 'bg-green-500/20' }
    if (percentage >= 80) return { grade: 'A', color: 'text-green-400', bg: 'bg-green-500/20' }
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-400', bg: 'bg-blue-500/20' }
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-400', bg: 'bg-yellow-500/20' }
    if (percentage >= 50) return { grade: 'D', color: 'text-orange-400', bg: 'bg-orange-500/20' }
    return { grade: 'F', color: 'text-red-400', bg: 'bg-red-500/20' }
  }

  const getMessage = () => {
    if (percentage >= 90) return language === 'vi' ? 'Xuất sắc! Bạn là chuyên gia!' : 'Excellent! You are an expert!'
    if (percentage >= 80) return language === 'vi' ? 'Tuyệt vời! Kiến thức rất tốt!' : 'Great! Very good knowledge!'
    if (percentage >= 70) return language === 'vi' ? 'Khá tốt! Tiếp tục cố gắng!' : 'Good! Keep it up!'
    if (percentage >= 60) return language === 'vi' ? 'Được rồi! Cần học thêm!' : 'Okay! Need more learning!'
    if (percentage >= 50) return language === 'vi' ? 'Cần cải thiện thêm!' : 'Need improvement!'
    return language === 'vi' ? 'Hãy học thêm và thử lại!' : 'Learn more and try again!'
  }

  const { grade, color, bg } = getGrade()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden"
    >
      {/* Header with grade */}
      <div className={`${bg} p-6 text-center`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${bg} border-4 border-current ${color} mb-4`}
        >
          <span className="text-4xl font-bold">{grade}</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-2xl font-bold ${color}`}
        >
          {getMessage()}
        </motion.h2>
      </div>

      {/* Stats */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 rounded-xl p-4 text-center"
          >
            <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{correctAnswers}/{totalQuestions}</p>
            <p className="text-xs text-gray-400">{language === 'vi' ? 'Câu đúng' : 'Correct'}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 rounded-xl p-4 text-center"
          >
            <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{percentage}%</p>
            <p className="text-xs text-gray-400">{language === 'vi' ? 'Tỷ lệ đúng' : 'Accuracy'}</p>
          </motion.div>

          {timeSpent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800/50 rounded-xl p-4 text-center"
            >
              <Clock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{formatTime(timeSpent)}</p>
              <p className="text-xs text-gray-400">{language === 'vi' ? 'Thời gian' : 'Time'}</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-800/50 rounded-xl p-4 text-center"
          >
            <Trophy className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{score}</p>
            <p className="text-xs text-gray-400">{language === 'vi' ? 'Điểm số' : 'Score'}</p>
          </motion.div>
        </div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">{language === 'vi' ? 'Tiến độ' : 'Progress'}</span>
            <span className={color}>{percentage}%</span>
          </div>
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 0.9, duration: 1, ease: 'easeOut' }}
              className={`h-full ${bg.replace('/20', '')} rounded-full`}
            />
          </div>
        </motion.div>

        {/* Share section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="border-t border-gray-700 pt-4"
        >
          <p className="text-gray-400 text-sm mb-3 flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            {language === 'vi' ? 'Chia sẻ kết quả' : 'Share result'}
          </p>
          <ShareButtons
            url={typeof window !== 'undefined' ? window.location.href : ''}
            title={`${language === 'vi' ? 'Tôi đạt' : 'I scored'} ${percentage}% ${language === 'vi' ? 'trong bài quiz ScamShield!' : 'on ScamShield quiz!'}`}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
