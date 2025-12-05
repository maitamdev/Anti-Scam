'use client'

import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  AlertCircle,
  CheckCircle, 
  ChevronDown, 
  ChevronUp,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Key,
  Mail,
  Smartphone,
  Wifi,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

interface Vulnerability {
  id: string
  title: string
  description: string
  severity: 'high' | 'medium' | 'low'
  icon: any
  recommendation: string
  guideLink?: string
}

function ResultContent() {
  const searchParams = useSearchParams()
  const score = parseInt(searchParams.get('score') || '0')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Generate vulnerabilities based on score
  const generateVulnerabilities = (): Vulnerability[] => {
    const vulns: Vulnerability[] = []
    
    if (score < 90) {
      vulns.push({
        id: '2fa',
        title: 'Thiếu Xác thực Hai yếu tố (2FA)',
        description: 'Tài khoản của bạn chưa được bảo vệ bằng 2FA.',
        severity: 'high',
        icon: Key,
        recommendation: 'Bật 2FA là cách hiệu quả nhất để ngăn chặn truy cập trái phép, ngay cả khi mật khẩu của bạn bị lộ. Hãy bật 2FA cho tất cả tài khoản quan trọng như email, ngân hàng, mạng xã hội.',
        guideLink: '/guide/5-buoc-tao-mat-khau-manh'
      })
    }
    
    if (score < 80) {
      vulns.push({
        id: 'password',
        title: 'Mật khẩu yếu hoặc trùng lặp',
        description: 'Mật khẩu cho các tài khoản của bạn có thể dễ bị đoán ra.',
        severity: 'medium',
        icon: ShieldAlert,
        recommendation: 'Sử dụng mật khẩu dài ít nhất 12 ký tự, kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt. Mỗi tài khoản nên có mật khẩu riêng. Cân nhắc sử dụng trình quản lý mật khẩu như Bitwarden.',
        guideLink: '/guide/5-buoc-tao-mat-khau-manh'
      })
    }
    
    if (score < 70) {
      vulns.push({
        id: 'phishing',
        title: 'Dễ bị tấn công Phishing',
        description: 'Bạn có thể chưa nhận biết tốt các email và tin nhắn lừa đảo.',
        severity: 'high',
        icon: Mail,
        recommendation: 'Luôn kiểm tra địa chỉ email gửi, không click link trong email đáng ngờ. Truy cập trực tiếp website ngân hàng thay vì qua link. Không bao giờ cung cấp OTP, mật khẩu qua điện thoại hoặc tin nhắn.',
        guideLink: '/guide/nhan-biet-email-lua-dao'
      })
    }
    
    if (score < 75) {
      vulns.push({
        id: 'software',
        title: 'Phần mềm chưa cập nhật',
        description: 'Thiết bị của bạn có thể có phiên bản phần mềm cũ với lỗ hổng bảo mật.',
        severity: 'medium',
        icon: RefreshCw,
        recommendation: 'Bật cập nhật tự động cho hệ điều hành và ứng dụng. Cập nhật ngay khi có thông báo, đặc biệt là các bản vá bảo mật (Security Update).',
        guideLink: '/guide/tai-sao-cap-nhat-phan-mem'
      })
    }
    
    if (score < 65) {
      vulns.push({
        id: 'social',
        title: 'Quyền riêng tư trên Mạng xã hội',
        description: 'Cài đặt chia sẻ công khai trên tài khoản mạng xã hội của bạn.',
        severity: 'low',
        icon: Shield,
        recommendation: 'Xem lại cài đặt quyền riêng tư trên Facebook, Instagram, TikTok. Hạn chế chia sẻ thông tin cá nhân như địa chỉ, số điện thoại, lịch trình đi du lịch.',
        guideLink: '/guide/an-toan-mang-xa-hoi'
      })
    }

    if (score < 60) {
      vulns.push({
        id: 'device',
        title: 'Thiết bị chưa được bảo vệ đầy đủ',
        description: 'Điện thoại hoặc máy tính của bạn có thể thiếu các lớp bảo vệ cần thiết.',
        severity: 'medium',
        icon: Smartphone,
        recommendation: 'Cài đặt phần mềm bảo mật, bật khóa màn hình, không cài app từ nguồn không rõ. Bật Find My Device để có thể định vị và xóa dữ liệu từ xa nếu mất thiết bị.',
        guideLink: '/guide/bao-ve-dien-thoai-malware'
      })
    }

    if (score < 55) {
      vulns.push({
        id: 'wifi',
        title: 'Rủi ro khi sử dụng Wi-Fi',
        description: 'Bạn có thể đang sử dụng Wi-Fi công cộng không an toàn hoặc Wi-Fi nhà chưa được bảo mật.',
        severity: 'low',
        icon: Wifi,
        recommendation: 'Tránh truy cập ngân hàng trên Wi-Fi công cộng. Đổi mật khẩu router mặc định, sử dụng mã hóa WPA3/WPA2. Cân nhắc sử dụng VPN khi kết nối Wi-Fi lạ.',
        guideLink: '/guide/bao-mat-wifi-tai-nha'
      })
    }

    return vulns
  }

  const vulnerabilities = generateVulnerabilities()
  
  const highCount = vulnerabilities.filter(v => v.severity === 'high').length
  const mediumCount = vulnerabilities.filter(v => v.severity === 'medium').length
  const lowCount = vulnerabilities.filter(v => v.severity === 'low').length
  const fixedCount = Math.max(0, 7 - vulnerabilities.length)

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreMessage = () => {
    if (score >= 80) return { text: 'Tuyệt vời! Bạn đang làm rất tốt.', color: 'text-green-400' }
    if (score >= 60) return { text: 'Khá tốt, nhưng vẫn cần cải thiện.', color: 'text-yellow-400' }
    if (score >= 40) return { text: 'Cần chú ý! Có nhiều điểm cần cải thiện.', color: 'text-orange-400' }
    return { text: 'Cảnh báo! Bạn đang có nhiều rủi ro bảo mật.', color: 'text-red-400' }
  }

  const scoreMessage = getScoreMessage()

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">Cao</span>
      case 'medium':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Trung bình</span>
      case 'low':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">Thấp</span>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
      <Header />

      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 italic">
                Kết quả Đánh giá An toàn của bạn
              </h1>
              <p className="text-gray-400">
                Lần quét gần nhất vào ngày {new Date().toLocaleDateString('vi-VN')}
              </p>
            </div>
            <Link
              href="/assessment"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Quét lại
            </Link>
          </div>

          {/* Score Overview */}
          <div className="grid md:grid-cols-5 gap-4 mb-10">
            {/* Main Score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="md:col-span-2 bg-[#111827] rounded-2xl p-6 border border-gray-800 flex flex-col items-center justify-center"
            >
              <div className="relative w-40 h-40 mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="#1f2937" strokeWidth="10" fill="none" />
                  <motion.circle
                    cx="80" cy="80" r="70"
                    stroke={score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444'}
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: '0 440' }}
                    animate={{ strokeDasharray: `${(score / 100) * 440} 440` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    className={`text-4xl font-bold ${getScoreColor()}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {score}
                  </motion.span>
                  <span className="text-gray-500 text-sm">/ 100</span>
                </div>
              </div>
              <p className="font-semibold text-center">Điểm an toàn tổng thể</p>
              <p className={`text-sm text-center ${scoreMessage.color}`}>{scoreMessage.text}</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="md:col-span-3 grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#111827] rounded-2xl p-5 border border-gray-800"
              >
                <p className="text-gray-400 text-sm mb-1">Lỗ hổng nghiêm trọng</p>
                <p className="text-3xl font-bold text-red-400">{highCount}</p>
                <p className="text-gray-500 text-xs">Cần hành động ngay</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#111827] rounded-2xl p-5 border border-gray-800"
              >
                <p className="text-gray-400 text-sm mb-1">Cảnh báo trung bình</p>
                <p className="text-3xl font-bold text-yellow-400">{mediumCount}</p>
                <p className="text-gray-500 text-xs">Nên xem xét sớm</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#111827] rounded-2xl p-5 border border-gray-800"
              >
                <p className="text-gray-400 text-sm mb-1">Rủi ro thấp</p>
                <p className="text-3xl font-bold text-blue-400">{lowCount}</p>
                <p className="text-gray-500 text-xs">Gợi ý cải thiện</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#111827] rounded-2xl p-5 border border-gray-800"
              >
                <p className="text-gray-400 text-sm mb-1">Đã khắc phục</p>
                <p className="text-3xl font-bold text-green-400">{fixedCount}</p>
                <p className="text-gray-500 text-xs">Bảo vệ đang hoạt động</p>
              </motion.div>
            </div>
          </div>

          {/* Vulnerabilities Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-2">Các Lỗ hổng được phát hiện & Khuyến nghị</h2>
            <p className="text-gray-400 mb-6">
              Dưới đây là danh sách các vấn đề bảo mật được tìm thấy và các bước bạn nên thực hiện để cải thiện độ an toàn.
            </p>

            {vulnerabilities.length > 0 ? (
              <div className="space-y-4">
                {vulnerabilities.map((vuln, index) => (
                  <motion.div
                    key={vuln.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`bg-[#111827] rounded-2xl border overflow-hidden ${
                      vuln.severity === 'high' ? 'border-red-500/30' :
                      vuln.severity === 'medium' ? 'border-yellow-500/30' :
                      'border-gray-700'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedId(expandedId === vuln.id ? null : vuln.id)}
                      className="w-full p-5 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          vuln.severity === 'high' ? 'bg-red-500/20' :
                          vuln.severity === 'medium' ? 'bg-yellow-500/20' :
                          'bg-blue-500/20'
                        }`}>
                          <vuln.icon className={`w-6 h-6 ${
                            vuln.severity === 'high' ? 'text-red-400' :
                            vuln.severity === 'medium' ? 'text-yellow-400' :
                            'text-blue-400'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{vuln.title}</h3>
                          <p className="text-gray-400 text-sm">{vuln.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getSeverityBadge(vuln.severity)}
                        {expandedId === vuln.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedId === vuln.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-gray-800"
                        >
                          <div className="p-5 bg-[#0d1320]">
                            <p className="text-gray-300 mb-4 leading-relaxed">{vuln.recommendation}</p>
                            <div className="flex gap-3">
                              {vuln.guideLink && (
                                <Link
                                  href={vuln.guideLink}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                                >
                                  Xem hướng dẫn
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                              )}
                              <button className="px-4 py-2 bg-[#1a2332] hover:bg-[#1f2937] border border-gray-700 rounded-lg text-sm font-medium transition-colors">
                                Đánh dấu đã hoàn thành
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-[#111827] rounded-2xl p-8 border border-green-500/30 text-center">
                <ShieldCheck className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Tuyệt vời!</h3>
                <p className="text-gray-400">Không phát hiện lỗ hổng bảo mật nghiêm trọng nào. Hãy tiếp tục duy trì thói quen bảo mật tốt!</p>
              </div>
            )}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/guide"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1a2332] border border-gray-700 text-gray-300 hover:border-gray-600 transition-colors"
            >
              Xem tất cả hướng dẫn
            </Link>
            <Link
              href="/scan"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Kiểm tra URL đáng ngờ
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}
