'use client'

import { motion } from 'framer-motion'
import { Chrome, Shield, Zap, Bell, Lock, Download, CheckCircle, ArrowLeft, Globe, Eye, AlertTriangle, Star, Sparkles, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GlowingCard from '../components/GlowingCard'
import AnimatedCounter from '../components/AnimatedCounter'
import { useTranslation } from '../lib/i18n/LanguageContext'

const features = [
  {
    icon: Shield,
    titleVi: 'Bảo vệ Real-time',
    titleEn: 'Real-time Protection',
    descVi: 'Tự động cảnh báo khi bạn truy cập website nguy hiểm hoặc lừa đảo',
    descEn: 'Auto-warn when you visit dangerous or scam websites'
  },
  {
    icon: Eye,
    titleVi: 'Kiểm tra Link Hover',
    titleEn: 'Link Hover Check',
    descVi: 'Di chuột qua link để xem đánh giá an toàn ngay lập tức',
    descEn: 'Hover over links to see safety rating instantly'
  },
  {
    icon: Bell,
    titleVi: 'Thông báo Cảnh báo',
    titleEn: 'Alert Notifications',
    descVi: 'Nhận thông báo về các chiêu trò lừa đảo mới nhất',
    descEn: 'Get notified about latest scam tactics'
  },
  {
    icon: Lock,
    titleVi: 'Bảo vệ Form',
    titleEn: 'Form Protection',
    descVi: 'Cảnh báo khi bạn nhập thông tin nhạy cảm trên website đáng ngờ',
    descEn: 'Warn when entering sensitive info on suspicious sites'
  },
  {
    icon: Zap,
    titleVi: 'Nhẹ & Nhanh',
    titleEn: 'Light & Fast',
    descVi: 'Không làm chậm trình duyệt, hoạt động âm thầm',
    descEn: 'Does not slow down browser, works silently'
  },
  {
    icon: Globe,
    titleVi: 'Đa ngôn ngữ',
    titleEn: 'Multi-language',
    descVi: 'Hỗ trợ tiếng Việt và tiếng Anh',
    descEn: 'Supports Vietnamese and English'
  },
]

const browsers = [
  { name: 'Chrome', icon: '🌐', available: true, url: '/antiscam-extension.zip' },
  { name: 'Edge', icon: '🔷', available: true, url: '/antiscam-extension.zip' },
  { name: 'Firefox', icon: '🦊', available: true, url: '/antiscam-extension.zip' },
  { name: 'Safari', icon: '🧭', available: false, url: '#' },
]

export default function ExtensionPage() {
  const { language } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {language === 'vi' ? 'Quay lại trang chủ' : 'Back to Home'}
            </Link>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl mb-6 shadow-2xl shadow-purple-500/30 relative"
            >
              <Chrome className="w-12 h-12 text-white" />
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ filter: 'blur(20px)', zIndex: -1 }}
              />
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-white">{language === 'vi' ? 'Extension ' : 'Browser '}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                {language === 'vi' ? 'Trình duyệt' : 'Extension'}
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              {language === 'vi'
                ? 'Bảo vệ bạn 24/7 khi lướt web. Tự động phát hiện và cảnh báo website lừa đảo, phishing.'
                : 'Protect you 24/7 while browsing. Auto-detect and warn about scam, phishing websites.'}
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-6 md:gap-8 mb-8"
            >
              <GlowingCard glowColor="rgba(59, 130, 246, 0.3)">
                <div className="text-center px-6 py-4 bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl border border-blue-500/20">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-blue-400" />
                    <p className="text-2xl font-bold text-white">
                      <AnimatedCounter end={50000} suffix="+" />
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">{language === 'vi' ? 'Người dùng' : 'Users'}</p>
                </div>
              </GlowingCard>
              <GlowingCard glowColor="rgba(234, 179, 8, 0.3)">
                <div className="text-center px-6 py-4 bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 rounded-xl border border-yellow-500/20">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <p className="text-2xl font-bold text-white">4.8</p>
                  </div>
                  <p className="text-xs text-gray-500">{language === 'vi' ? 'Đánh giá' : 'Rating'}</p>
                </div>
              </GlowingCard>
              <GlowingCard glowColor="rgba(34, 197, 94, 0.3)">
                <div className="text-center px-6 py-4 bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-xl border border-green-500/20">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    <p className="text-2xl font-bold text-green-400">100%</p>
                  </div>
                  <p className="text-xs text-gray-500">{language === 'vi' ? 'Miễn phí' : 'Free'}</p>
                </div>
              </GlowingCard>
            </motion.div>

            {/* Download Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {browsers.map((browser) => (
                <motion.a
                  key={browser.name}
                  href={browser.url}
                  whileHover={{ scale: browser.available ? 1.05 : 1 }}
                  whileTap={{ scale: browser.available ? 0.95 : 1 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${browser.available
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  <span className="text-xl">{browser.icon}</span>
                  <span>{browser.name}</span>
                  {!browser.available && (
                    <span className="text-xs px-2 py-0.5 bg-gray-700 rounded-full">
                      {language === 'vi' ? 'Sắp có' : 'Soon'}
                    </span>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-center mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {language === 'vi' ? 'Tính năng nổi bật' : 'Key Features'}
              </span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <GlowingCard glowColor="rgba(139, 92, 246, 0.3)">
                    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-5 h-full hover:border-purple-500/40 transition-colors">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <feature.icon className="w-6 h-6 text-purple-400" />
                      </motion.div>
                      <h3 className="font-semibold text-white mb-2">
                        {language === 'vi' ? feature.titleVi : feature.titleEn}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {language === 'vi' ? feature.descVi : feature.descEn}
                      </p>
                    </div>
                  </GlowingCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-center mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {language === 'vi' ? 'Cách hoạt động' : 'How it works'}
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  titleVi: 'Cài đặt Extension',
                  titleEn: 'Install Extension',
                  descVi: 'Tải và cài đặt extension từ Chrome Web Store hoặc Firefox Add-ons',
                  descEn: 'Download and install from Chrome Web Store or Firefox Add-ons',
                  icon: Download
                },
                {
                  step: '02',
                  titleVi: 'Lướt web bình thường',
                  titleEn: 'Browse normally',
                  descVi: 'Extension hoạt động âm thầm, không làm phiền bạn',
                  descEn: 'Extension works silently without disturbing you',
                  icon: Globe
                },
                {
                  step: '03',
                  titleVi: 'Nhận cảnh báo',
                  titleEn: 'Get warnings',
                  descVi: 'Khi truy cập website nguy hiểm, bạn sẽ được cảnh báo ngay lập tức',
                  descEn: 'When visiting dangerous sites, you will be warned immediately',
                  icon: Bell
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent -translate-x-1/2 z-0" />
                  )}
                  <GlowingCard glowColor="rgba(6, 182, 212, 0.3)">
                    <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-xl p-6 text-center relative z-10">
                      <motion.div
                        className="w-14 h-14 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/25"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="text-xs text-cyan-400 font-bold mb-2">STEP {item.step}</div>
                      <h3 className="font-semibold text-white mb-2">
                        {language === 'vi' ? item.titleVi : item.titleEn}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {language === 'vi' ? item.descVi : item.descEn}
                      </p>
                    </div>
                  </GlowingCard>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Installation Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-center mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                {language === 'vi' ? 'Hướng dẫn Cài đặt' : 'Installation Guide'}
              </span>
            </h2>
            <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
              {language === 'vi'
                ? 'Extension chưa có trên Store, bạn cần cài đặt thủ công bằng Developer Mode. Làm theo hướng dẫn dưới đây:'
                : 'Extension is not yet on Store, you need to install manually using Developer Mode. Follow the guide below:'}
            </p>

            {/* Chrome Installation */}
            <GlowingCard glowColor="rgba(234, 179, 8, 0.3)">
              <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/20 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center text-2xl">
                    🌐
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {language === 'vi' ? 'Chrome / Edge' : 'Chrome / Edge'}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">
                        {language === 'vi' ? 'Tải Extension' : 'Download Extension'}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {language === 'vi'
                          ? 'Nhấn nút "Tải Extension" ở trên để tải file ZIP về máy'
                          : 'Click "Download Extension" button above to download the ZIP file'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">
                        {language === 'vi' ? 'Giải nén File' : 'Extract File'}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {language === 'vi'
                          ? 'Chuột phải vào file ZIP → "Extract All" → Chọn thư mục để giải nén'
                          : 'Right-click ZIP file → "Extract All" → Choose folder to extract'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">
                        {language === 'vi' ? 'Mở trang Extensions' : 'Open Extensions Page'}
                      </h4>
                      <p className="text-sm text-gray-400 mb-2">
                        {language === 'vi'
                          ? 'Mở Chrome/Edge → Gõ vào thanh địa chỉ:'
                          : 'Open Chrome/Edge → Type in address bar:'}
                      </p>
                      <div className="bg-black/30 border border-yellow-500/20 rounded-lg p-3 font-mono text-sm text-yellow-400">
                        chrome://extensions
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {language === 'vi'
                          ? '(Hoặc Edge: edge://extensions)'
                          : '(Or Edge: edge://extensions)'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 font-bold">
                      4
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">
                        {language === 'vi' ? 'Bật Developer Mode' : 'Enable Developer Mode'}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {language === 'vi'
                          ? 'Tìm và bật công tắc "Developer mode" ở góc trên bên phải'
                          : 'Find and toggle "Developer mode" switch in top right corner'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 font-bold">
                      5
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">
                        {language === 'vi' ? 'Load Extension' : 'Load Extension'}
                      </h4>
                      <p className="text-sm text-gray-400 mb-2">
                        {language === 'vi'
                          ? 'Nhấn nút "Load unpacked" → Chọn thư mục đã giải nén → Nhấn "Select Folder"'
                          : 'Click "Load unpacked" → Select extracted folder → Click "Select Folder"'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold">
                      ✓
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-400 mb-1">
                        {language === 'vi' ? 'Hoàn tất!' : 'Done!'}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {language === 'vi'
                          ? 'Extension đã được cài đặt! Bạn sẽ thấy icon Anti-Scam trên thanh công cụ.'
                          : 'Extension installed! You will see Anti-Scam icon on toolbar.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlowingCard>

            {/* Firefox Installation */}
            <GlowingCard glowColor="rgba(249, 115, 22, 0.3)">
              <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-2xl">
                    🦊
                  </div>
                  <h3 className="text-xl font-bold text-white">Firefox</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">
                        {language === 'vi' ? 'Tải & Giải nén' : 'Download & Extract'}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {language === 'vi'
                          ? 'Tải file ZIP và giải nén như hướng dẫn Chrome ở trên'
                          : 'Download ZIP file and extract as Chrome guide above'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">
                        {language === 'vi' ? 'Mở trang Add-ons' : 'Open Add-ons Page'}
                      </h4>
                      <p className="text-sm text-gray-400 mb-2">
                        {language === 'vi'
                          ? 'Mở Firefox → Gõ vào thanh địa chỉ:'
                          : 'Open Firefox → Type in address bar:'}
                      </p>
                      <div className="bg-black/30 border border-orange-500/20 rounded-lg p-3 font-mono text-sm text-orange-400">
                        about:debugging#/runtime/this-firefox
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">
                        {language === 'vi' ? 'Load Extension' : 'Load Extension'}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {language === 'vi'
                          ? 'Nhấn "Load Temporary Add-on..." → Chọn file manifest.json trong thư mục đã giải nén'
                          : 'Click "Load Temporary Add-on..." → Select manifest.json file in extracted folder'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-yellow-400 mb-1">
                        {language === 'vi' ? 'Lưu ý' : 'Note'}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {language === 'vi'
                          ? 'Extension tạm thời sẽ bị xóa khi tắt Firefox. Bạn cần load lại sau mỗi lần khởi động.'
                          : 'Temporary extension will be removed when Firefox closes. You need to reload after each restart.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlowingCard>
          </motion.div>

          {/* Privacy Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Lock className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-green-400 mb-2">
                  {language === 'vi' ? 'Cam kết Bảo mật' : 'Privacy Commitment'}
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {language === 'vi' ? 'Không thu thập dữ liệu cá nhân' : 'No personal data collection'}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {language === 'vi' ? 'Không theo dõi lịch sử duyệt web' : 'No browsing history tracking'}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {language === 'vi' ? 'Mã nguồn mở, minh bạch' : 'Open source, transparent'}
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <GlowingCard glowColor="rgba(139, 92, 246, 0.4)">
              <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full mb-4"
                  >
                    <Sparkles className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">{language === 'vi' ? 'Miễn phí vĩnh viễn' : 'Free forever'}</span>
                  </motion.div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {language === 'vi' ? 'Bảo vệ bạn ngay hôm nay!' : 'Protect yourself today!'}
                  </h2>
                  <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                    {language === 'vi'
                      ? 'Cài đặt miễn phí, không cần đăng ký, bắt đầu được bảo vệ ngay lập tức.'
                      : 'Free installation, no registration required, start being protected immediately.'}
                  </p>
                  <motion.a
                    href="/antiscam-extension.zip"
                    download
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl text-white font-semibold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow"
                  >
                    <Download className="w-5 h-5" />
                    {language === 'vi' ? 'Tải Extension Miễn phí' : 'Download Free Extension'}
                  </motion.a>
                </div>
              </div>
            </GlowingCard>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
