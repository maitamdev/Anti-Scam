'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, Trophy, Target, Clock, CheckCircle, XCircle, 
  ArrowRight, RotateCcw, Home, Zap, Award, TrendingUp,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
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
      <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
        <Header />
        <main className="flex-1 pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 sm:mb-10"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
                <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                Quiz Nhận Biết Lừa Đảo
              </h1>
              <p className="text-gray-400 text-sm sm:text-lg px-2">
                5000+ câu hỏi đa dạng giúp bạn nhận biết các chiêu trò lừa đảo online
              </p>
            </motion.div>

            {/* Game Modes */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {[
                { mode: 'quick' as GameMode, icon: Zap, title: 'Chơi Nhanh', desc: '10 câu ngẫu nhiên', color: 'blue' },
                { mode: 'challenge' as GameMode, icon: Trophy, title: 'Thử Thách', desc: '20 câu, giới hạn thời gian', color: 'yellow' },
                { mode: 'practice' as GameMode, icon: Target, title: 'Luyện Tập', desc: 'Chọn chủ đề', color: 'green' },
                { mode: 'custom' as GameMode, icon: Award, title: 'Tùy Chỉnh', desc: 'Thiết lập theo ý muốn', color: 'purple' },
              ].map(({ mode, icon: Icon, title, desc, color }) => (
                <motion.button
                  key={mode}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                  className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border text-left transition-all ${
                    gameConfig.mode === mode
                      ? `bg-${color}-500/20 border-${color}-500`
                      : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 text-${color}-400`} />
                  <h3 className="font-semibold text-sm sm:text-lg mb-0.5 sm:mb-1">{title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">{desc}</p>
                </motion.button>
              ))}
            </div>

            {/* Custom Options */}
            {(gameConfig.mode === 'practice' || gameConfig.mode === 'custom') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-gray-800/50 rounded-2xl p-6 mb-8 border border-gray-700"
              >
                <h3 className="font-semibold mb-4">Tùy chỉnh</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Question Count */}
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Số câu hỏi</label>
                    <select
                      value={gameConfig.questionCount}
                      onChange={(e) => setGameConfig({ ...gameConfig, questionCount: parseInt(e.target.value) })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    >
                      <option value={5}>5 câu</option>
                      <option value={10}>10 câu</option>
                      <option value={20}>20 câu</option>
                      <option value={30}>30 câu</option>
                      <option value={50}>50 câu</option>
                    </select>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Độ khó</label>
                    <select
                      value={gameConfig.difficulty}
                      onChange={(e) => setGameConfig({ ...gameConfig, difficulty: e.target.value as Difficulty })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="mixed">Trộn lẫn</option>
                      <option value="easy">Dễ</option>
                      <option value="medium">Trung bình</option>
                      <option value="hard">Khó</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div className="relative">
                    <label className="text-sm text-gray-400 mb-2 block">Chủ đề</label>
                    <button
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-left flex items-center justify-between"
                    >
                      <span>{gameConfig.category ? getCategoryName(gameConfig.category) : 'Tất cả'}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {showCategoryDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg overflow-hidden z-10 max-h-60 overflow-y-auto">
                        <button
                          onClick={() => { setGameConfig({ ...gameConfig, category: null }); setShowCategoryDropdown(false) }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-600 text-sm"
                        >
                          Tất cả chủ đề
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
                    <label className="text-sm text-gray-400 mb-2 block">Giới hạn thời gian</label>
                    <select
                      value={gameConfig.timeLimit || 0}
                      onChange={(e) => setGameConfig({ ...gameConfig, timeLimit: parseInt(e.target.value) || null })}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    >
                      <option value={0}>Không giới hạn</option>
                      <option value={15}>15 giây/câu</option>
                      <option value={30}>30 giây/câu</option>
                      <option value={60}>60 giây/câu</option>
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
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Bắt Đầu Chơi
            </motion.button>
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
    
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
        <Header />
        <main className="flex-1 pt-24 pb-12">
          <div className="max-w-2xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 text-center"
            >
              <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                percentage >= 80 ? 'bg-green-500/20' : percentage >= 50 ? 'bg-yellow-500/20' : 'bg-red-500/20'
              }`}>
                <Trophy className={`w-12 h-12 ${
                  percentage >= 80 ? 'text-green-400' : percentage >= 50 ? 'text-yellow-400' : 'text-red-400'
                }`} />
              </div>

              <h2 className="text-2xl font-bold mb-2">
                {percentage >= 80 ? 'Xuất sắc!' : percentage >= 50 ? 'Khá tốt!' : 'Cần cải thiện!'}
              </h2>
              <p className="text-gray-400 mb-6">
                {percentage >= 80 
                  ? 'Bạn có kiến thức tốt về nhận biết lừa đảo!'
                  : percentage >= 50 
                  ? 'Bạn đã nắm được cơ bản, hãy tiếp tục học hỏi!'
                  : 'Hãy đọc thêm hướng dẫn để bảo vệ bản thân tốt hơn!'}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <p className={`text-3xl font-bold ${
                    percentage >= 80 ? 'text-green-400' : percentage >= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>{percentage}%</p>
                  <p className="text-gray-400 text-sm">Điểm số</p>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <p className="text-3xl font-bold text-blue-400">{gameState.score}/{gameState.questions.length}</p>
                  <p className="text-gray-400 text-sm">Đúng</p>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <p className="text-3xl font-bold text-purple-400">{timeTaken}s</p>
                  <p className="text-gray-400 text-sm">Thời gian</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={resetGame}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Chơi lại
                </button>
                <Link
                  href="/guide"
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  Học thêm
                </Link>
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
    <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Câu {gameState.currentIndex + 1}/{gameState.questions.length}</span>
              <span className="text-gray-400">Điểm: {gameState.score}</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
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
                    currentQuestion.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                    currentQuestion.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {currentQuestion.difficulty === 'easy' ? 'Dễ' : currentQuestion.difficulty === 'medium' ? 'TB' : 'Khó'}
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
                    <h4 className="font-semibold text-blue-400 mb-2">💡 Giải thích</h4>
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
                      Xác nhận
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium flex items-center justify-center gap-2"
                    >
                      {gameState.currentIndex < gameState.questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
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
