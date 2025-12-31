'use client'

import { motion } from 'framer-motion'
import { Shield, ShieldAlert, ShieldX, ExternalLink, Copy, Check, Globe, Lock, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

interface Props {
  url: string
  domain: string
  score: number
  label: 'SAFE' | 'CAUTION' | 'DANGEROUS'
  reasons: string[]
  hasSSL?: boolean
  language?: string
}

export default function ScanResultSummary({
  url,
  domain,
  score,
  label,
  reasons,
  hasSSL = true,
  language = 'vi'
}: Props) {
  const [copied, setCopied] = useState(false)

  const config = {
    SAFE: {
      icon: Shield,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      label: language === 'vi' ? 'An toàn' : 'Safe',
      message: language === 'vi' ? 'Website này an toàn để truy cập' : 'This website is safe to visit'
    },
    CAUTION: {
      icon: ShieldAlert,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      label: language === 'vi' ? 'Cảnh báo' : 'Caution',
      message: language === 'vi' ? 'Cần thận trọng khi truy cập' : 'Be careful when visiting'
    },
    DANGEROUS: {
      icon: ShieldX,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      label: language === 'vi' ? 'Nguy hiểm' : 'Dangerous',
      message: language === 'vi' ? 'Không nên truy cập website này' : 'Do not visit this website'
    }
  }[label]

  const Icon = config.icon

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${config.bg} ${config.border} border rounded-2xl overflow-hidden`}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-start gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className={`p-3 ${config.bg} rounded-xl`}
          >
            <Icon className={`w-8 h-8 ${config.color}`} />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`text-xl font-bold ${config.color}`}>
                {config.label}
              </h3>
              <span className={`px-2 py-0.5 ${config.bg} ${config.color} rounded-full text-xs font-medium`}>
                {score}/100
              </span>
            </div>
            <p className="text-gray-400 text-sm">{config.message}</p>
          </div>
        </div>
      </div>

      {/* URL Info */}
      <div className="p-4 bg-black/20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {hasSSL ? (
              <Lock className="w-4 h-4 text-green-400 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-white font-medium truncate">{domain}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title={language === 'vi' ? 'Sao chép URL' : 'Copy URL'}
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title={language === 'vi' ? 'Mở trong tab mới' : 'Open in new tab'}
            >
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Reasons */}
      {reasons.length > 0 && (
        <div className="p-4">
          <p className="text-sm text-gray-400 mb-3">
            {language === 'vi' ? 'Phân tích chi tiết:' : 'Analysis details:'}
          </p>
          <ul className="space-y-2">
            {reasons.slice(0, 5).map((reason, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 text-sm"
              >
                <span className={config.color}>•</span>
                <span className="text-gray-300">{reason}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )
}
