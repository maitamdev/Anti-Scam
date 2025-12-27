'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Shield, ExternalLink, Share2, AlertTriangle, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface SharedScan {
  url: string
  domain: string
  score: number
  label: string
  reasons: string[]
  aiConfidence: number
  createdAt: string
  sharedBy: string
}

export default function SharePage() {
  const params = useParams()
  const token = params.token as string
  const [scan, setScan] = useState<SharedScan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSharedScan()
  }, [token])

  const fetchSharedScan = async () => {
    try {
      const res = await fetch(`/api/share/${token}`)
      const data = await res.json()
      
      if (data.success) {
        setScan(data.data)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Không thể tải kết quả')
    } finally {
      setLoading(false)
    }
  }

  const getLabelConfig = (label: string) => {
    switch (label) {
      case 'SAFE':
        return {
          color: 'from-green-500 to-emerald-500',
          icon: CheckCircle,
          text: 'An toàn',
          bg: 'from-green-500/20 to-emerald-500/20',
          border: 'border-green-500/30',
        }
      case 'CAUTION':
        return {
          color: 'from-yellow-500 to-orange-500',
          icon: AlertTriangle,
          text: 'Cảnh báo',
          bg: 'from-yellow-500/20 to-orange-500/20',
          border: 'border-yellow-500/30',
        }
      case 'DANGEROUS':
        return {
          color: 'from-red-500 to-rose-500',
          icon: Shield,
          text: 'Nguy hiểm',
          bg: 'from-red-500/20 to-rose-500/20',
          border: 'border-red-500/30',
        }
      default:
        return {
          color: 'from-gray-500 to-gray-600',
          icon: Shield,
          text: 'Không xác định',
          bg: 'from-gray-500/20 to-gray-600/20',
          border: 'border-gray-500/30',
        }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0d1425] to-[#0a0f1a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Đang tải kết quả...</p>
        </div>
      </div>
    )
  }

  if (error || !scan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0d1425] to-[#0a0f1a] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Không tìm thấy</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    )
  }

  const config = getLabelConfig(scan.label)
  const Icon = config.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0d1425] to-[#0a0f1a] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${config.color} rounded-full mb-4 shadow-lg`}>
            <Icon className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            Kết quả phân tích website
          </h1>
          
          <p className="text-gray-400">
            Được chia sẻ bởi <span className="text-blue-400">{scan.sharedBy}</span>
          </p>
        </motion.div>

        {/* Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`bg-gradient-to-br ${config.bg} border ${config.border} rounded-2xl p-8 backdrop-blur-sm mb-6`}
        >
          {/* URL */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-2">Website được kiểm tra:</p>
            <a
              href={scan.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-lg font-medium flex items-center gap-2 break-all"
            >
              {scan.url}
              <ExternalLink className="w-5 h-5 flex-shrink-0" />
            </a>
          </div>

          {/* Score */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-700/50">
            <div>
              <p className="text-gray-400 text-sm mb-1">Điểm nguy hiểm</p>
              <p className={`text-5xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                {scan.score}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-gray-400 text-sm mb-1">Đánh giá</p>
              <p className={`text-2xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                {config.text}
              </p>
            </div>
          </div>

          {/* Reasons */}
          {scan.reasons.length > 0 && (
            <div className="mb-6">
              <p className="text-white font-semibold mb-3">Lý do phát hiện:</p>
              <ul className="space-y-2">
                {scan.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AI Confidence */}
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>Độ tin cậy AI:</span>
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${config.color}`}
                style={{ width: `${scan.aiConfidence * 100}%` }}
              />
            </div>
            <span className="font-semibold">{(scan.aiConfidence * 100).toFixed(0)}%</span>
          </div>

          {/* Timestamp */}
          <p className="text-gray-500 text-sm mt-4">
            Phân tích lúc: {new Date(scan.createdAt).toLocaleString('vi-VN')}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-4"
        >
          <Link
            href="/scan"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all"
          >
            Kiểm tra website của bạn
          </Link>
          
          <p className="text-gray-500 text-sm">
            Bảo vệ bản thân khỏi lừa đảo trực tuyến với ANTI-SCAM
          </p>
        </motion.div>
      </div>
    </div>
  )
}
