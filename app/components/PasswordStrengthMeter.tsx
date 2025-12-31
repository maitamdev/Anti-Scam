'use client'

import { motion } from 'framer-motion'
import { Shield, ShieldAlert, ShieldX, ShieldCheck, Eye, EyeOff } from 'lucide-react'
import { useState, useMemo } from 'react'

interface Props {
  password: string
  showPassword?: boolean
  onToggleShow?: () => void
  language?: string
}

export default function PasswordStrengthMeter({ 
  password, 
  showPassword = false,
  onToggleShow,
  language = 'vi'
}: Props) {
  const analysis = useMemo(() => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      noCommon: !['password', '123456', 'qwerty', 'admin'].some(common => 
        password.toLowerCase().includes(common)
      )
    }

    const score = Object.values(checks).filter(Boolean).length
    
    let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak'
    if (score >= 5) strength = 'strong'
    else if (score >= 4) strength = 'good'
    else if (score >= 3) strength = 'fair'

    return { checks, score, strength }
  }, [password])

  const strengthConfig = {
    weak: {
      color: 'text-red-400',
      bg: 'bg-red-500',
      label: language === 'vi' ? 'Yếu' : 'Weak',
      icon: ShieldX
    },
    fair: {
      color: 'text-yellow-400',
      bg: 'bg-yellow-500',
      label: language === 'vi' ? 'Trung bình' : 'Fair',
      icon: ShieldAlert
    },
    good: {
      color: 'text-blue-400',
      bg: 'bg-blue-500',
      label: language === 'vi' ? 'Tốt' : 'Good',
      icon: Shield
    },
    strong: {
      color: 'text-green-400',
      bg: 'bg-green-500',
      label: language === 'vi' ? 'Mạnh' : 'Strong',
      icon: ShieldCheck
    }
  }

  const config = strengthConfig[analysis.strength]
  const Icon = config.icon

  const checkLabels = {
    length: language === 'vi' ? 'Ít nhất 8 ký tự' : 'At least 8 characters',
    uppercase: language === 'vi' ? 'Chữ hoa (A-Z)' : 'Uppercase (A-Z)',
    lowercase: language === 'vi' ? 'Chữ thường (a-z)' : 'Lowercase (a-z)',
    number: language === 'vi' ? 'Số (0-9)' : 'Number (0-9)',
    special: language === 'vi' ? 'Ký tự đặc biệt (!@#$...)' : 'Special character (!@#$...)',
    noCommon: language === 'vi' ? 'Không dùng mật khẩu phổ biến' : 'No common passwords'
  }

  if (!password) return null

  return (
    <div className="space-y-4">
      {/* Strength bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">
            {language === 'vi' ? 'Độ mạnh' : 'Strength'}
          </span>
          <span className={`text-sm font-medium ${config.color} flex items-center gap-1`}>
            <Icon className="w-4 h-4" />
            {config.label}
          </span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(analysis.score / 6) * 100}%` }}
            className={`h-full ${config.bg} rounded-full`}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(analysis.checks).map(([key, passed]) => (
          <div
            key={key}
            className={`flex items-center gap-2 text-xs ${
              passed ? 'text-green-400' : 'text-gray-500'
            }`}
          >
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
              passed ? 'bg-green-500/20' : 'bg-gray-700'
            }`}>
              {passed ? '✓' : '○'}
            </div>
            {checkLabels[key as keyof typeof checkLabels]}
          </div>
        ))}
      </div>
    </div>
  )
}
