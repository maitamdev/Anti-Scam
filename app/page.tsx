'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  Search,
  Brain,
  Eye,
  Lock,
  Play,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import Image from 'next/image'
import Header from './components/Header'
import Footer from './components/Footer'
import StatsCounter from './components/StatsCounter'
import TrustBadges from './components/TrustBadges'
import ScamTrendWidget from './components/ScamTrendWidget'
import QuickCheckWidget from './components/QuickCheckWidget'
import ExtensionBanner from './components/ExtensionBanner'
import FeatureShowcase from './components/FeatureShowcase'
import TestimonialCarousel from './components/TestimonialCarousel'
import ScamTypeCards from './components/ScamTypeCards'
import TypewriterText from './components/TypewriterText'
import SafetyToolkit from './components/SafetyToolkit'
import { useRouter } from 'next/navigation'
import { useTranslation } from './lib/i18n/LanguageContext'

const stats = [
  { value: '15', label: 'Loại lừa đảo', suffix: '+' },
  { value: '100', label: 'Free', suffix: '%' },
  { value: '5000', label: 'Câu hỏi Quiz', suffix: '+' },
]

const howItWorks = [
  {
    step: '01',
    titleVi: 'Nhập URL hoặc Upload ảnh',
    titleEn: 'Enter URL or Upload image',
    descVi: 'Dán link website đáng ngờ hoặc tải lên ảnh chụp tin nhắn lừa đảo',
    descEn: 'Paste suspicious website link or upload screenshot of scam message'
  },
  {
    step: '02',
    titleVi: 'AI Phân tích',
    titleEn: 'AI Analysis',
    descVi: 'Hệ thống AI phân tích đa lớp: URL patterns, nội dung, database lừa đảo',
    descEn: 'Multi-layer AI analysis: URL patterns, content, scam database'
  },
  {
    step: '03',
    titleVi: 'Nhận kết quả',
    titleEn: 'Get Results',
    descVi: 'Xem điểm rủi ro, dấu hiệu lừa đảo và khuyến nghị hành động cụ thể',
    descEn: 'View risk score, scam indicators and specific action recommendations'
  }
]

export default function Home() {
  const router = useRouter()
  const { language } = useTranslation()

  const features = [
    {
      icon: Search,
      title: language === 'vi' ? 'Kiểm tra URL' : 'Check URL',
      description: language === 'vi'
        ? 'Dán link website đáng ngờ để kiểm tra các dấu hiệu phishing, giả mạo ngân hàng, TMĐT.'
        : 'Paste suspicious website link to check for phishing, fake banking, e-commerce signs.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Eye,
      title: language === 'vi' ? 'Phân tích Hình ảnh' : 'Image Analysis',
      description: language === 'vi'
        ? 'Upload ảnh chụp tin nhắn Zalo, SMS, email để AI nhận diện các chiêu trò lừa đảo.'
        : 'Upload screenshots of Zalo, SMS, email messages for AI to identify scam tactics.',
      color: 'from-blue-400 to-blue-500'
    },
    {
      icon: Brain,
      title: language === 'vi' ? 'Quiz Trắc nghiệm' : 'Quiz Test',
      description: language === 'vi'
        ? '5000+ câu hỏi giúp bạn nhận biết các hình thức lừa đảo phổ biến tại Việt Nam.'
        : '5000+ questions to help you recognize common scam types.',
      color: 'from-blue-500 to-blue-600'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-8 sm:pb-16 px-3 sm:px-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-20 text-center lg:text-left"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full mb-4 sm:mb-6"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm text-gray-300 font-medium">
                    {language === 'vi' ? 'Công cụ hỗ trợ phát hiện lừa đảo' : 'Scam detection support tool'}
                  </span>
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black leading-[1.1] mb-3 sm:mb-6 uppercase tracking-wider italic relative z-30" style={{ letterSpacing: '0.05em' }}>
                  {language === 'vi' ? (
                    <>
                      <span className="text-white drop-shadow-lg">Bạn có đang</span>
                      <br />
                      <span className="whitespace-nowrap">
                        <span className="text-white drop-shadow-lg">lướt mạng </span>
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent text-gradient-animated">
                          an toàn?
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-white drop-shadow-lg">Are you</span>
                      <br />
                      <span className="whitespace-nowrap">
                        <span className="text-white drop-shadow-lg">browsing </span>
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent text-gradient-animated">
                          safely?
                        </span>
                      </span>
                    </>
                  )}
                </h1>

                {/* Typewriter subtitle */}
                <div className="text-sm sm:text-base lg:text-lg text-cyan-400 mb-3 sm:mb-4 h-6 sm:h-7">
                  <TypewriterText
                    texts={language === 'vi'
                      ? ['Phát hiện website lừa đảo', 'Kiểm tra tin nhắn giả mạo', 'Bảo vệ thông tin cá nhân', 'Quiz 5000+ câu hỏi']
                      : ['Detect scam websites', 'Check fake messages', 'Protect personal info', 'Quiz 5000+ questions']
                    }
                    className="font-medium"
                  />
                </div>

                <p className="text-sm sm:text-base lg:text-lg text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {language === 'vi' ? (
                    <>Kiểm tra URL và hình ảnh để <span className="text-white font-semibold">phát hiện dấu hiệu lừa đảo</span>. Công cụ miễn phí giúp bạn cẩn thận hơn khi lướt web.</>
                  ) : (
                    <>Check URLs and images to <span className="text-white font-semibold">detect scam signs</span>. Free tool to help you stay safe while browsing.</>
                  )}
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                  <motion.button
                    onClick={() => router.push('/scan')}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-semibold text-white text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-blue-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    {language === 'vi' ? 'Kiểm tra ngay' : 'Check Now'}
                  </motion.button>

                  <motion.button
                    onClick={() => router.push('/quiz')}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium text-white text-sm sm:text-base flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    {language === 'vi' ? 'Làm Quiz' : 'Take Quiz'}
                  </motion.button>

                  <motion.button
                    onClick={() => router.push('/report')}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 bg-red-500/10 border border-red-500/30 rounded-xl font-medium text-red-400 text-sm sm:text-base flex items-center gap-2 hover:bg-red-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                    {language === 'vi' ? 'Báo cáo' : 'Report'}
                  </motion.button>
                </div>
              </motion.div>

              {/* Right - Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center lg:justify-end order-first lg:order-last"
              >
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[480px] md:h-[400px] lg:w-[540px] lg:h-[460px]">
                  {/* Animated glow rings */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-3xl animate-pulse" />
                  <div className="absolute inset-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />

                  {/* Orbiting particles */}
                  <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50" />
                  </div>

                  {/* Hero Image with float animation */}
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src="/1h.png"
                      alt="ANTI-SCAM Security Shield"
                      fill
                      sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 540px"
                      className="object-contain relative z-10 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                      priority
                    />
                  </motion.div>

                  {/* Scanning line effect */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-line opacity-60" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 sm:py-12 px-4 border-y border-gray-800/50 bg-blue-900/5">
          <div className="max-w-7xl mx-auto">
            <StatsCounter stats={stats} />
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <TrustBadges />
          </div>
        </section>

        {/* Quick Check & Scam Stats Section */}
        <section className="py-12 px-4 bg-gradient-to-b from-transparent to-blue-900/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Quick Check Widget */}
              <div className="lg:col-span-1">
                <QuickCheckWidget language={language} />
              </div>

              {/* Scam Trend Widget */}
              <div className="lg:col-span-1">
                <ScamTrendWidget language={language} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                {language === 'vi' ? 'Các tính năng chính' : 'Key Features'}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {language === 'vi'
                  ? 'Những công cụ giúp bạn cẩn thận hơn trên không gian mạng'
                  : 'Tools to help you stay safe in cyberspace'}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-[#111827] to-[#0d1320] rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-r ${feature.color} p-0.5 mb-4 sm:mb-6`}>
                    <div className="w-full h-full bg-blue-900/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{feature.description}</p>

                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-12 sm:py-20 px-4 bg-blue-900/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                {language === 'vi' ? 'Cách sử dụng' : 'How to Use'}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                {language === 'vi' ? 'Chỉ 3 bước đơn giản để kiểm tra' : 'Just 3 simple steps to check'}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
              {howItWorks.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Connector line */}
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent -translate-x-1/2" />
                  )}

                  <div className="bg-blue-900/10 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-gray-800 h-full">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mb-4 sm:mb-6">
                      <span className="text-white font-bold text-sm sm:text-base">{item.step}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                      {language === 'vi' ? item.titleVi : item.titleEn}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base">
                      {language === 'vi' ? item.descVi : item.descEn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Left - Feature list */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                  {language === 'vi' ? 'Tại sao nên sử dụng?' : 'Why Use This?'}
                </h2>
                <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">
                  {language === 'vi'
                    ? 'Công cụ đơn giản giúp bạn kiểm tra nhanh các link và tin nhắn đáng ngờ trước khi click hoặc cung cấp thông tin cá nhân.'
                    : 'Simple tool to quickly check suspicious links and messages before clicking or providing personal information.'}
                </p>

                <div className="space-y-3 sm:space-y-4">
                  {(language === 'vi' ? [
                    'Kiểm tra URL website trong vài giây',
                    'Upload ảnh tin nhắn để phân tích',
                    'Quiz 5000+ câu hỏi về lừa đảo',
                    'Cẩm nang hướng dẫn nhận biết',
                    'Hoàn toàn miễn phí',
                  ] : [
                    'Check website URLs in seconds',
                    'Upload message screenshots for analysis',
                    'Quiz with 5000+ questions about scams',
                    'Guide to recognize scams',
                    'Completely free',
                  ]).map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                      </div>
                      <span className="text-gray-300 text-sm sm:text-base">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  onClick={() => router.push('/scan')}
                  className="mt-6 sm:mt-8 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold text-white flex items-center gap-2 text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {language === 'vi' ? 'Bắt đầu ngay' : 'Get Started'}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Right - Feature cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-3 sm:gap-4"
              >
                {(language === 'vi' ? [
                  { icon: Search, title: 'Kiểm tra URL', desc: 'Phân tích link đáng ngờ' },
                  { icon: Eye, title: 'Scan Hình ảnh', desc: 'Nhận diện tin nhắn lừa đảo' },
                  { icon: Brain, title: 'Quiz Trắc nghiệm', desc: 'Học cách nhận biết' },
                  { icon: Lock, title: 'Miễn phí', desc: 'Không giới hạn sử dụng' },
                ] : [
                  { icon: Search, title: 'Check URL', desc: 'Analyze suspicious links' },
                  { icon: Eye, title: 'Scan Image', desc: 'Detect scam messages' },
                  { icon: Brain, title: 'Quiz Test', desc: 'Learn to recognize' },
                  { icon: Lock, title: 'Free', desc: 'Unlimited usage' },
                ]).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-blue-900/10 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-800 hover:border-blue-500/30 transition-colors"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3 sm:mb-4">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-20 px-4 bg-blue-900/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-blue-500/20 text-center overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                  {language === 'vi' ? 'Thử kiểm tra ngay?' : 'Try checking now?'}
                </h2>
                <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto">
                  {language === 'vi'
                    ? 'Dán link hoặc upload ảnh tin nhắn đáng ngờ để kiểm tra. Hoàn toàn miễn phí, không cần đăng ký.'
                    : 'Paste link or upload suspicious message screenshot to check. Completely free, no registration required.'}
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <motion.button
                    onClick={() => router.push('/scan')}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {language === 'vi' ? 'Phân tích URL/Ảnh' : 'Analyze URL/Image'}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    onClick={() => router.push('/quiz')}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {language === 'vi' ? 'Làm Quiz Trắc nghiệm' : 'Take Quiz'}
                  </motion.button>

                  <motion.button
                    onClick={() => router.push('/report')}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 rounded-xl font-semibold text-red-400 hover:text-red-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Shield className="w-5 h-5" />
                    {language === 'vi' ? 'Báo cáo lừa đảo' : 'Report Scam'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Scam Types Section - NEW */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400 font-medium">
                  {language === 'vi' ? 'Nhận biết các loại lừa đảo' : 'Recognize scam types'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                {language === 'vi' ? 'Các hình thức Lừa đảo phổ biến' : 'Common Scam Types'}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {language === 'vi'
                  ? 'Tìm hiểu các chiêu trò lừa đảo đang hoành hành để tự bảo vệ mình'
                  : 'Learn about scam tactics to protect yourself'}
              </p>
            </motion.div>

            <ScamTypeCards language={language} />
          </div>
        </section>

        {/* Feature Showcase Section - NEW */}
        <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-blue-900/5 to-transparent">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                {language === 'vi' ? 'Khám phá Tính năng' : 'Explore Features'}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {language === 'vi'
                  ? 'Bộ công cụ toàn diện giúp bạn an toàn trên không gian mạng'
                  : 'Comprehensive toolkit to keep you safe online'}
              </p>
            </motion.div>

            <FeatureShowcase language={language} />
          </div>
        </section>

        {/* Safety Toolkit Section - NEW */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-2">
                  {language === 'vi' ? 'Tăng tốc an toàn' : 'Accelerate your safety'}
                </h2>
                <p className="text-gray-400 max-w-2xl">
                  {language === 'vi'
                    ? 'Chọn bước tiếp theo để tận dụng tối đa bộ công cụ chống lừa đảo.'
                    : 'Pick your next move to get the most from the anti-scam toolkit.'}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-cyan-200">
                <Sparkles className="h-4 w-4" />
                {language === 'vi' ? 'Đề xuất thông minh' : 'Smart recommendations'}
              </div>
            </motion.div>

            <SafetyToolkit />
          </div>
        </section>

        {/* Testimonials Section - NEW */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                {language === 'vi' ? 'Người dùng nói gì?' : 'What Users Say'}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {language === 'vi'
                  ? 'Phản hồi từ cộng đồng người dùng ANTI-SCAM'
                  : 'Feedback from the ANTI-SCAM user community'}
              </p>
            </motion.div>

            <TestimonialCarousel language={language} />
          </div>
        </section>

        {/* Extension Banner Section - NEW */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <ExtensionBanner language={language} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
