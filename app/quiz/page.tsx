'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, Trophy, Target, Clock, CheckCircle, XCircle, 
  ArrowRight, RotateCcw, Home, Zap, Award, TrendingUp,
  ChevronDown, ArrowLeft, Star, Sparkles, Share2
} from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GlowingCard from '../components/GlowingCard'
import Confetti from '../components/Confetti'
import ShareButtons from '../components/ShareButtons'
import { useTranslation } from '../lib/i18n/LanguageContext'
import { 
  generateQuestions, 
  generateQuestionsByCategory,
  generateQuestionsByDifficulty,
  getCategories,
  getCategoryName,
  type QuizQuestion 
} from '../lib/quizData'

type GameMode = 'quick' | 'challenge' | 'practice' | 'custom'
type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed'

interface GameConfig {
  mode: GameMode
  questionCount: number
  difficulty: Difficulty
  category: string | null
  timeLimit: number | null // seconds per question, null = no limit
}

interface GameState {
  questions: QuizQuestion[]
  currentIndex: number
  answers: Record<string, string>
  score: number
  startTime: number
  endTime: number | null
}

const DEFAULT_CONFIG: GameConfig = {
  mode: 'quick',
  questionCount: 10,
  difficulty: 'mixed',
  category: null,
  timeLimit: null,
}

export default function QuizPage() {
  const { t, language } = useTranslation()
  const [gameConfig, setGameConfig] = useState<GameConfig>(DEFAULT_CONFIG)
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  // Timer effect
  useEffect(() => {
    if (gameState && gameConfig.timeLimit && timeLeft !== null && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleTimeout()
    }
  }, [timeLeft, gameState, showResult])

  const startGame = () => {
    let questions: QuizQuestion[]
    
    if (gameConfig.category) {
      questions = generateQuestionsByCategory(gameConfig.category, gameConfig.questionCount)
    } else if (gameConfig.difficulty !== 'mixed') {
      questions = generateQuestionsByDifficulty(gameConfig.difficulty, gameConfig.questionCount)
    } else {
      questions = generateQuestions(gameConfig.questionCount)
    }

    setGameState({
      questions,
      currentIndex: 0,
      answers: {},
      score: 0,
      startTime: Date.now(),
      endTime: null,
    })
    setSelectedAnswer(null)
    setShowResult(false)
    setShowExplanation(false)
    if (gameConfig.timeLimit) {
      setTimeLeft(gameConfig.timeLimit)
    }
  }

  const handleTimeout = () => {
    if (!gameState) return
    setShowExplanation(true)
  }

  const handleAnswer = (answerId: string) => {
    if (showExplanation || !gameState) return
    setSelectedAnswer(answerId)
  }

  const submitAnswer = () => {
    if (!selectedAnswer || !gameState) return
    
    const currentQuestion = gameState.questions[gameState.currentIndex]
    const isCorrect = currentQuestion.options.find(o => o.id === selectedAnswer)?.isCorrect || false
    
    setGameState({
      ...gameState,
      answers: { ...gameState.answers, [currentQuestion.id]: selectedAnswer },
      score: isCorrect ? gameState.score + 1 : gameState.score,
    })
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (!gameState) return
    
    if (gameState.currentIndex < gameState.questions.length - 1) {
      setGameState({
        ...gameState,
        currentIndex: gameState.currentIndex + 1,
      })
      setSelectedAnswer(null)
      setShowExplanation(false)
      if (gameConfig.timeLimit) {
        setTimeLeft(gameConfig.timeLimit)
      }
    } else {
      setGameState({
        ...gameState,
        endTime: Date.now(),
      })
      setShowResult(true)
    }
  }

  const resetGame = () => {
    setGameState(null)
    setSelectedAnswer(null)
    setShowResult(false)
    setShowExplanation(false)
    setTimeLeft(null)
  }

  const currentQuestion = gameState?.questions[gameState.currentIndex]
  const progress = gameState ? ((gameState.currentIndex + 1) / gameState.questions.length) * 100 : 0

  // Mode selection screen
  if (!gameState) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-4">
            {/* Back Button */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>{t.quiz.backToHome}</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 sm:mb-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/25"
              >
                <Brain className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t.quiz.title}
              </h1>
              <p className="text-gray-400 text-sm sm:text-lg px-2">
                {t.quiz.subtitle}
              </p>
            </motion.div>

            {/* Game Modes */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {[
                { mode: 'quick' as GameMode, icon: Zap, title: t.quiz.modes.quick.title, desc: t.quiz.modes.quick.desc, gradient: 'from-blue-500 to-cyan-500', glowColor: 'rgba(59, 130, 246, 0.4)' },
                { mode: 'challenge' as GameMode, icon: Trophy, title: t.quiz.modes.challenge.title, desc: t.quiz.modes.challenge.desc, gradient: 'from-amber-500 to-orange-500', glowColor: 'rgba(245, 158, 11, 0.4)' },
                { mode: 'practice' as GameMode, icon: Target, title: t.quiz.modes.practice.title, desc: t.quiz.modes.practice.desc, gradient: 'from-green-500 to-emerald-500', glowColor: 'rgba(34, 197, 94, 0.4)' },
                { mode: 'custom' as GameMode, icon: Award, title: t.quiz.modes.custom.title, desc: t.quiz.modes.custom.desc, gradient: 'from-purple-500 to-pink-500', glowColor: 'rgba(168, 85, 247, 0.4)' },
              ].map(({ mode, icon: Icon, title, desc, gradient, glowColor }, index) => (
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlowingCard glowColor={glowColor} hoverScale={1.02}>
                    <button
                      onClick={() => {
                        if (mode === 'quick') {
                          setGameConfig({ ...DEFAULT_CONFIG, mode: 'quick', questionCount: 10 })
                        } else if (mode === 'challenge') {
                          setGameConfig({ ...DEFAULT_CONFIG, mode: 'challenge', questionCount: 20, timeLimit: 30 })
                        } else if (mode === 'practice') {
                          setGameConfig({ ...DEFAULT_CONFIG, mode: 'practice', questionCount: 10 })
                        } else {
                          setGameConfig({ ...DEFAULT_CONFIG, mode: 'custom' })
                        }
                      }}
                      className={`w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl border text-left transition-all ${
                        gameConfig.mode === mode
                          ? 'bg-gray-800/80 border-blue-500'
                          : 'bg-gray-800/50 border-gray-700/50'
                      }`}
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 shadow-lg`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm sm:text-lg mb-0.5 sm:mb-1 text-white">{title}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm">{desc}</p>
                      {gameConfig.mode === mode && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2"
                        >
                          <Sparkles className="w-4 h-4 text-blue-400" />
                        </motion.div>
                      )}
                    </button>
                  </GlowingCard>
                </motion.div>
              ))}
            </div>

            {/* Custom Options */}
            {(gameConfig.mode === 'practice' || gameConfig.mode === 'custom') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-gray-800/50 rounded-2xl p-6 mb-8 border border-gray-700"
              >
                <h3 className="font-semibold mb-4">{t.quiz.customize}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Question Count */}
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">{t.quiz.questionCount}</label>
                    <select
                      value={gameConfig.questionCount}
                      onChange={(e) => setGameConfig({ ...gameConfig, questionCount: parseInt(e.target.value) })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    >
                      <option value={5}>5 {t.quiz.questions}</option>
                      <option value={10}>10 {t.quiz.questions}</option>
                      <option value={20}>20 {t.quiz.questions}</option>
                      <option value={30}>30 {t.quiz.questions}</option>
                      <option value={50}>50 {t.quiz.questions}</option>
                    </select>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">{t.quiz.difficulty}</label>
                    <select
                      value={gameConfig.difficulty}
                      onChange={(e) => setGameConfig({ ...gameConfig, difficulty: e.target.value as Difficulty })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="mixed">{t.quiz.difficulties.mixed}</option>
                      <option value="easy">{t.quiz.difficulties.easy}</option>
                      <option value="medium">{t.quiz.difficulties.medium}</option>
                      <option value="hard">{t.quiz.difficulties.hard}</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div className="relative">
                    <label className="text-sm text-gray-400 mb-2 block">{t.quiz.category}</label>
                    <button
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-left flex items-center justify-between"
                    >
                      <span>{gameConfig.category ? getCategoryName(gameConfig.category) : t.quiz.allCategories}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {showCategoryDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg overflow-hidden z-10 max-h-60 overflow-y-auto">
                        <button
                          onClick={() => { setGameConfig({ ...gameConfig, category: null }); setShowCategoryDropdown(false) }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-600 text-sm"
                        >
                          {t.quiz.allCategories}
                        </button>
                        {getCategories().map(cat => (
                          <button
                            key={cat}
                            onClick={() => { setGameConfig({ ...gameConfig, category: cat }); setShowCategoryDropdown(false) }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-600 text-sm"
                          >
                            {getCategoryName(cat)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Time Limit */}
                {gameConfig.mode === 'custom' && (
                  <div className="mt-4">
                    <label className="text-sm text-gray-400 mb-2 block">{t.quiz.timeLimit}</label>
                    <select
                      value={gameConfig.timeLimit || 0}
                      onChange={(e) => setGameConfig({ ...gameConfig, timeLimit: parseInt(e.target.value) || null })}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    >
                      <option value={0}>{t.quiz.noTimeLimit}</option>
                      <option value={15}>15 {t.quiz.secondsPerQuestion}</option>
                      <option value={30}>30 {t.quiz.secondsPerQuestion}</option>
                      <option value={60}>60 {t.quiz.secondsPerQuestion}</option>
                    </select>
                  </div>
                )}
              </motion.div>
            )}

            {/* Start Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startGame}
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
            >
              <Zap className="w-5 h-5" />
              {t.quiz.startGame}
            </motion.button>

            {/* Leaderboard Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <Link
                href="/quiz/leaderboard"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Trophy className="w-4 h-4" />
                {language === 'vi' ? 'Xem bảng xếp hạng' : 'View Leaderboard'}
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Result screen
  if (showResult && gameState) {
    const percentage = Math.round((gameState.score / gameState.questions.length) * 100)
    const timeTaken = gameState.endTime ? Math.round((gameState.endTime - gameState.startTime) / 1000) : 0
    const showConfetti = percentage >= 80
    
    const getGrade = () => {
      if (percentage >= 90) return { grade: 'A+', color: 'text-green-400', bg: 'bg-green-500/20' }
      if (percentage >= 80) return { grade: 'A', color: 'text-green-400', bg: 'bg-green-500/20' }
      if (percentage >= 70) return { grade: 'B', color: 'text-blue-400', bg: 'bg-blue-500/20' }
      if (percentage >= 60) return { grade: 'C', color: 'text-yellow-400', bg: 'bg-yellow-500/20' }
      if (percentage >= 50) return { grade: 'D', color: 'text-orange-400', bg: 'bg-orange-500/20' }
      return { grade: 'F', color: 'text-red-400', bg: 'bg-red-500/20' }
    }
    
    const gradeInfo = getGrade()
    
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <Confetti active={showConfetti} />
        <main className="flex-1 pt-24 pb-12">
          <div className="max-w-2xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden"
            >
              {/* Header with grade */}
              <div className={`${gradeInfo.bg} p-8 text-center`}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className={`inline-flex items-center justify-center w-28 h-28 rounded-full ${gradeInfo.bg} border-4 border-current ${gradeInfo.color} mb-4`}
                >
                  <span className="text-5xl font-bold">{gradeInfo.grade}</span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-2xl font-bold ${gradeInfo.color}`}
                >
                  {percentage >= 80 ? t.quiz.result.excellent : percentage >= 50 ? t.quiz.result.good : t.quiz.result.needImprove}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 mt-2"
                >
                  {percentage >= 80 
                    ? t.quiz.result.excellentDesc
                    : percentage >= 50 
                    ? t.quiz.result.goodDesc
                    : t.quiz.result.needImproveDesc}
                </motion.p>
              </div>

              {/* Stats */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gray-800/50 rounded-xl p-4 text-center"
                  >
                    <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{gameState.score}/{gameState.questions.length}</p>
                    <p className="text-xs text-gray-400">{t.quiz.result.correct}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gray-800/50 rounded-xl p-4 text-center"
                  >
                    <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{percentage}%</p>
                    <p className="text-xs text-gray-400">{t.quiz.result.scoreLabel}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gray-800/50 rounded-xl p-4 text-center"
                  >
                    <Clock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{Math.floor(timeTaken / 60)}:{(timeTaken % 60).toString().padStart(2, '0')}</p>
                    <p className="text-xs text-gray-400">{t.quiz.result.time}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-gray-800/50 rounded-xl p-4 text-center"
                  >
                    <Trophy className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{gameState.score * 10}</p>
                    <p className="text-xs text-gray-400">{language === 'vi' ? 'Điểm' : 'Points'}</p>
                  </motion.div>
                </div>

                {/* Progress bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mb-6"
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">{language === 'vi' ? 'Tiến độ' : 'Progress'}</span>
                    <span className={gradeInfo.color}>{percentage}%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
                      className={`h-full ${gradeInfo.bg.replace('/20', '')} rounded-full`}
                    />
                  </div>
                </motion.div>

                {/* Share section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="border-t border-gray-700 pt-4 mb-6"
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

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetGame}
                    className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center gap-2 font-medium"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t.quiz.result.playAgain}
                  </motion.button>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Link
                      href="/guide"
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl flex items-center justify-center gap-2 font-medium"
                    >
                      <TrendingUp className="w-4 h-4" />
                      {t.quiz.result.learnMore}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Game screen
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">{t.quiz.question} {gameState.currentIndex + 1}/{gameState.questions.length}</span>
              <span className="text-gray-400">{t.quiz.score}: {gameState.score}</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Timer */}
          {gameConfig.timeLimit && timeLeft !== null && (
            <div className={`text-center mb-4 ${timeLeft <= 5 ? 'text-red-400' : 'text-gray-400'}`}>
              <Clock className="w-5 h-5 inline mr-2" />
              {timeLeft}s
            </div>
          )}

          {/* Question Card */}
          <AnimatePresence mode="wait">
            {currentQuestion && (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
              >
                {/* Category & Difficulty */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                    {currentQuestion.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    currentQuestion.difficulty === 'easy' ? 'bg-blue-500/20 text-blue-400' :
                    currentQuestion.difficulty === 'medium' ? 'bg-blue-400/20 text-blue-300' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {currentQuestion.difficulty === 'easy' ? t.quiz.difficulties.easy : currentQuestion.difficulty === 'medium' ? t.quiz.difficulties.medium : t.quiz.difficulties.hard}
                  </span>
                </div>

                {/* Scenario */}
                {currentQuestion.scenario && (
                  <div className="bg-gray-700/50 rounded-lg p-3 mb-4 text-sm text-gray-300 italic">
                    📋 {currentQuestion.scenario}
                  </div>
                )}

                {/* Question */}
                <h2 className="text-lg font-semibold mb-6">{currentQuestion.question}</h2>

                {/* Image */}
                {currentQuestion.image && (
                  <div className="mb-6 rounded-lg overflow-hidden bg-gray-700">
                    <img src={currentQuestion.image} alt="Quiz" className="w-full max-h-48 object-contain" />
                  </div>
                )}

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedAnswer === option.id
                    const isCorrect = option.isCorrect
                    const showCorrectness = showExplanation
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleAnswer(option.id)}
                        disabled={showExplanation}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
                          showCorrectness
                            ? isCorrect
                              ? 'bg-green-500/20 border-green-500'
                              : isSelected
                              ? 'bg-red-500/20 border-red-500'
                              : 'bg-gray-700/50 border-gray-600'
                            : isSelected
                            ? 'bg-blue-500/20 border-blue-500'
                            : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          showCorrectness
                            ? isCorrect
                              ? 'border-green-500 bg-green-500'
                              : isSelected
                              ? 'border-red-500 bg-red-500'
                              : 'border-gray-600'
                            : isSelected
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-600'
                        }`}>
                          {showCorrectness && isCorrect && <CheckCircle className="w-4 h-4 text-white" />}
                          {showCorrectness && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
                        </div>
                        <span>{option.text}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Explanation */}
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
                  >
                    <h4 className="font-semibold text-blue-400 mb-2">💡 {t.quiz.explanation}</h4>
                    <p className="text-gray-300 text-sm">{currentQuestion.explanation}</p>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  {!showExplanation ? (
                    <button
                      onClick={submitAnswer}
                      disabled={!selectedAnswer}
                      className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                        selectedAnswer
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {t.quiz.confirm}
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium flex items-center justify-center gap-2"
                    >
                      {gameState.currentIndex < gameState.questions.length - 1 ? t.quiz.nextQuestion : t.quiz.viewResult}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={resetGame}
                    className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl"
                  >
                    <Home className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  )
}
