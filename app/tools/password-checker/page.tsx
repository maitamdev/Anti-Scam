'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, ArrowLeft, Eye, EyeOff, CheckCircle, XCircle, AlertTriangle, Shield, Copy, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useTranslation } from '../../lib/i18n/LanguageContext'

interface PasswordStrength {
  score: number
  level: 'weak' | 'fair' | 'good' | 'strong'
  checks: { label: string; passed: boolean }[]
  crackTime: string
  suggestions: string[]
}

export default function PasswordCheckerPage() {
  const { language } = useTranslation()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState<PasswordStrength | null>(null)
  const [generatedPassword, setGeneratedPassword] = useState('')

  const checkPassword = (pwd: string): PasswordStrength => {
    const checks = [
      { label: language === 'vi' ? 'Ít nhất 8 ký tự' : 'At least 8 characters', passed: pwd.length >= 8 },
      { label: language === 'vi' ? 'Ít nhất 12 ký tự' : 'At least 12 characters', passed: pwd.length >= 12 },
      { label: language === 'vi' ? 'Chữ hoa (A-Z)' : 'Uppercase (A-Z)', passed: /[A-Z]/.test(pwd) },
      { label: language === 'vi' ? 'Chữ thường (a-z)' : 'Lowercase (a-z)', passed: /[a-z]/.test(pwd) },
      { label: language === 'vi' ? 'Số (0-9)' : 'Numbers (0-9)', passed: /[0-9]/.test(pwd) },
      { label: language === 'vi' ? 'Ký tự đặc biệt (!@#$...)' : 'Special chars (!@#$...)', passed: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd) },
      { label: language === 'vi' ? 'Không có pattern lặp (aaa, 123)' : 'No repeating patterns', passed: !/(.)\1{2,}/.test(pwd) && !/012|123|234|345|456|567|678|789|890|abc|bcd|cde/.test(pwd.toLowerCase()) },
    ]

    const passedCount = checks.filter(c => c.passed).length
    let score = 0
    if (pwd.length >= 8) score += 20
    if (pwd.length >= 12) score += 15
    if (pwd.length >= 16) score += 10
    if (/[A-Z]/.test(pwd)) score += 15
    if (/[a-z]/.test(pwd)) score += 10
    if (/[0-9]/.test(pwd)) score += 15
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) score += 15
    if (passedCount >= 6) score = Math.min(100, score)

    const level = score < 30 ? 'weak' : score < 50 ? 'fair' : score < 75 ? 'good' : 'strong'

    // Estimate crack time
    const charset = ((/[a-z]/.test(pwd) ? 26 : 0) + (/[A-Z]/.test(pwd) ? 26 : 0) + (/[0-9]/.test(pwd) ? 10 : 0) + (/[^a-zA-Z0-9]/.test(pwd) ? 32 : 0)) || 26
    const combinations = Math.pow(charset, pwd.length)
    const guessesPerSec = 10000000000 // 10 billion
    const seconds = combinations / guessesPerSec
    
    let crackTime = ''
    if (seconds < 1) crackTime = language === 'vi' ? 'Ngay lập tức' : 'Instantly'
    else if (seconds < 60) crackTime = language === 'vi' ? `${Math.round(seconds)} giây` : `${Math.round(seconds)} seconds`
    else if (seconds < 3600) crackTime = language === 'vi' ? `${Math.round(seconds/60)} phút` : `${Math.round(seconds/60)} minutes`
    else if (seconds < 86400) crackTime = language === 'vi' ? `${Math.round(seconds/3600)} giờ` : `${Math.round(seconds/3600)} hours`
    else if (seconds < 31536000) crackTime = language === 'vi' ? `${Math.round(seconds/86400)} ngày` : `${Math.round(seconds/86400)} days`
    else if (seconds < 31536000 * 100) crackTime = language === 'vi' ? `${Math.round(seconds/31536000)} năm` : `${Math.round(seconds/31536000)} years`
    else crackTime = language === 'vi' ? 'Hàng triệu năm' : 'Millions of years'

    const suggestions: string[] = []
    if (!checks[0].passed) suggestions.push(language === 'vi' ? 'Thêm ký tự để đạt ít nhất 8' : 'Add characters to reach at least 8')
    if (!checks[2].passed) suggestions.push(language === 'vi' ? 'Thêm chữ hoa' : 'Add uppercase letters')
    if (!checks[4].passed) suggestions.push(language === 'vi' ? 'Thêm số' : 'Add numbers')
    if (!checks[5].passed) suggestions.push(language === 'vi' ? 'Thêm ký tự đặc biệt' : 'Add special characters')

    return { score, level, checks, crackTime, suggestions }
  }

  useEffect(() => {
    if (password) {
      setStrength(checkPassword(password))
    } else {
      setStrength(null)
    }
  }, [password, language])

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let pwd = ''
    for (let i = 0; i < 16; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setGeneratedPassword(pwd)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getLevelConfig = (level: string) => {
    switch (level) {
      case 'weak': return { color: 'text-red-400', bg: 'bg-red-500', label: language === 'vi' ? 'Yếu' : 'Weak' }
      case 'fair': return { color: 'text-yellow-400', bg: 'bg-yellow-500', label: language === 'vi' ? 'Trung bình' : 'Fair' }
      case 'good': return { color: 'text-blue-400', bg: 'bg-blue-500', label: language === 'vi' ? 'Tốt' : 'Good' }
      case 'strong': return { color: 'text-green-400', bg: 'bg-green-500', label: language === 'vi' ? 'Mạnh' : 'Strong' }
      default: return { color: 'text-gray-400', bg: 'bg-gray-500', label: '' }
    }
  }


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link href="/tools" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {language === 'vi' ? 'Quay lại' : 'Back'}
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-4">
              <Lock className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'vi' ? 'Kiểm tra Mật khẩu' : 'Password Checker'}
            </h1>
            <p className="text-gray-400">
              {language === 'vi' ? 'Kiểm tra độ mạnh mật khẩu của bạn' : 'Check your password strength'}
            </p>
          </motion.div>

          {/* Password Input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={language === 'vi' ? 'Nhập mật khẩu để kiểm tra...' : 'Enter password to check...'}
                className="w-full px-4 py-4 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 text-lg"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {language === 'vi' ? '🔒 Mật khẩu không được gửi đi - kiểm tra hoàn toàn trên thiết bị của bạn' : '🔒 Password is not sent anywhere - checked entirely on your device'}
            </p>
          </motion.div>

          {/* Strength Result */}
          {strength && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mb-8">
              {/* Score Bar */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">{language === 'vi' ? 'Độ mạnh' : 'Strength'}</span>
                  <span className={`font-bold ${getLevelConfig(strength.level).color}`}>
                    {getLevelConfig(strength.level).label}
                  </span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${strength.score}%` }}
                    className={`h-full ${getLevelConfig(strength.level).bg} rounded-full`}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {language === 'vi' ? 'Thời gian bẻ khóa ước tính: ' : 'Estimated crack time: '}
                  <span className="text-white font-medium">{strength.crackTime}</span>
                </p>
              </div>

              {/* Checks */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-semibold mb-3">{language === 'vi' ? 'Tiêu chí' : 'Criteria'}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {strength.checks.map((check, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {check.passed ? (
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      )}
                      <span className={check.passed ? 'text-gray-300' : 'text-gray-500'}>{check.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              {strength.suggestions.length > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                  <h3 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    {language === 'vi' ? 'Gợi ý cải thiện' : 'Suggestions'}
                  </h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {strength.suggestions.map((s, i) => <li key={i}>• {s}</li>)}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {/* Password Generator */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <h3 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {language === 'vi' ? 'Tạo mật khẩu mạnh' : 'Generate Strong Password'}
            </h3>
            <div className="flex gap-2">
              <div className="flex-1 bg-black/20 rounded-lg px-4 py-3 font-mono text-sm text-white break-all">
                {generatedPassword || (language === 'vi' ? 'Nhấn nút để tạo...' : 'Click button to generate...')}
              </div>
              <button onClick={generatePassword} className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors" title="Generate">
                <RefreshCw className="w-5 h-5" />
              </button>
              {generatedPassword && (
                <button onClick={() => copyToClipboard(generatedPassword)} className="p-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors" title="Copy">
                  <Copy className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <h3 className="font-semibold text-gray-300 mb-2">💡 {language === 'vi' ? 'Mẹo tạo mật khẩu an toàn' : 'Tips for secure passwords'}</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• {language === 'vi' ? 'Sử dụng cụm từ dễ nhớ thay vì từ đơn' : 'Use memorable phrases instead of single words'}</li>
              <li>• {language === 'vi' ? 'Không dùng thông tin cá nhân (ngày sinh, tên...)' : 'Avoid personal info (birthday, name...)'}</li>
              <li>• {language === 'vi' ? 'Mỗi tài khoản nên có mật khẩu riêng' : 'Use unique password for each account'}</li>
              <li>• {language === 'vi' ? 'Sử dụng trình quản lý mật khẩu' : 'Use a password manager'}</li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
