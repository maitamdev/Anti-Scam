'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Eye, Brain, Shield, Zap, Lock, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Feature {
  id: string
  icon: React.ElementType
  titleVi: string
  titleEn: string
  descVi: string
  descEn: string
  color: string
  image?: string
  stats?: { labelVi: string; labelEn: string; value: string }[]
}

const features: Feature[] = [
  {
    id: 'url-scan',
    icon: Search,
    titleVi: 'Kiểm tra URL',
    titleEn: 'URL Scanner',
    descVi: 'Phân tích URL với AI và 98+ nguồn dữ liệu để phát hiện website lừa đảo, phishing, malware.',
    descEn: 'Analyze URLs with AI and 98+ data sources to detect scam, phishing, malware websites.',
    color: 'from-blue-500 to-cyan-500',
    stats: [
      { labelVi: 'Nguồn dữ liệu', labelEn: 'Data sources', value: '98+' },
      { labelVi: 'Độ chính xác', labelEn: 'Accuracy', value: '99.2%' },
      { labelVi: 'Thời gian', labelEn: 'Time', value: '<3s' }
    ]
  },
  {
    id: 'image-scan',
    icon: Eye,
    titleVi: 'Phân tích Hình ảnh',
    titleEn: 'Image Analysis',
    descVi: 'Upload ảnh chụp tin nhắn, email để AI nhận diện các chiêu trò lừa đảo phổ biến.',
    descEn: 'Upload screenshots of messages, emails for AI to identify common scam tactics.',
    color: 'from-purple-500 to-pink-500',
    stats: [
      { labelVi: 'Loại lừa đảo', labelEn: 'Scam types', value: '50+' },
      { labelVi: 'Ngôn ngữ', labelEn: 'Languages', value: 'VI/EN' },
      { labelVi: 'OCR', labelEn: 'OCR', value: 'AI' }
    ]
  },
  {
    id: 'quiz',
    icon: Brain,
    titleVi: 'Quiz Trắc nghiệm',
    titleEn: 'Quiz Test',
    descVi: '5000+ câu hỏi giúp bạn nhận biết các hình thức lừa đảo phổ biến tại Việt Nam.',
    descEn: '5000+ questions to help you recognize common scam types in Vietnam.',
    color: 'from-green-500 to-emerald-500',
    stats: [
      { labelVi: 'Câu hỏi', labelEn: 'Questions', value: '5000+' },
      { labelVi: 'Chủ đề', labelEn: 'Topics', value: '15+' },
      { labelVi: 'Cấp độ', labelEn: 'Levels', value: '3' }
    ]
  },
  {
    id: 'tools',
    icon: Shield,
    titleVi: 'Công cụ Bảo mật',
    titleEn: 'Security Tools',
    descVi: 'Bộ công cụ đầy đủ: QR Scanner, Email Analyzer, Password Checker, Link Expander...',
    descEn: 'Complete toolkit: QR Scanner, Email Analyzer, Password Checker, Link Expander...',
    color: 'from-orange-500 to-red-500',
    stats: [
      { labelVi: 'Công cụ', labelEn: 'Tools', value: '9+' },
      { labelVi: 'Miễn phí', labelEn: 'Free', value: '100%' },
      { labelVi: 'Cập nhật', labelEn: 'Updates', value: '24/7' }
    ]
  }
]

interface Props {
  language: string
}

export default function FeatureShowcase({ language }: Props) {
  const [activeFeature, setActiveFeature] = useState(features[0])

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      {/* Feature List */}
      <div className="space-y-3">
        {features.map((feature) => {
          const isActive = activeFeature.id === feature.id
          return (
            <motion.button
              key={feature.id}
              onClick={() => setActiveFeature(feature)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                isActive 
                  ? 'bg-white/10 border-blue-500/50' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-0.5`}>
                  <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">
                    {language === 'vi' ? feature.titleVi : feature.titleEn}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-1">
                    {language === 'vi' ? feature.descVi : feature.descEn}
                  </p>
                </div>
                <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? 'rotate-90 text-blue-400' : 'text-gray-500'}`} />
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Feature Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFeature.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`bg-gradient-to-br ${activeFeature.color} p-0.5 rounded-2xl`}
        >
          <div className="bg-gray-900 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <activeFeature.icon className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-bold text-white">
                {language === 'vi' ? activeFeature.titleVi : activeFeature.titleEn}
              </h3>
            </div>
            
            <p className="text-gray-300 mb-6">
              {language === 'vi' ? activeFeature.descVi : activeFeature.descEn}
            </p>

            {activeFeature.stats && (
              <div className="grid grid-cols-3 gap-4">
                {activeFeature.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 rounded-xl p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-gray-400">
                      {language === 'vi' ? stat.labelVi : stat.labelEn}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
