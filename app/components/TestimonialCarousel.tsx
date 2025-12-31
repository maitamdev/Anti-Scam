'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

interface Testimonial {
  id: number
  nameVi: string
  nameEn: string
  roleVi: string
  roleEn: string
  contentVi: string
  contentEn: string
  rating: number
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    nameVi: 'Nguyễn Văn A',
    nameEn: 'Nguyen Van A',
    roleVi: 'Nhân viên văn phòng',
    roleEn: 'Office Worker',
    contentVi: 'Nhờ ANTI-SCAM mà tôi đã tránh được một vụ lừa đảo qua tin nhắn giả mạo ngân hàng. Công cụ rất hữu ích!',
    contentEn: 'Thanks to ANTI-SCAM, I avoided a scam through fake bank messages. Very useful tool!',
    rating: 5,
    avatar: '👨‍💼'
  },
  {
    id: 2,
    nameVi: 'Trần Thị B',
    nameEn: 'Tran Thi B',
    roleVi: 'Sinh viên',
    roleEn: 'Student',
    contentVi: 'Quiz trắc nghiệm giúp tôi học được rất nhiều về các chiêu trò lừa đảo. Giờ tôi tự tin hơn khi lướt web.',
    contentEn: 'The quiz helped me learn a lot about scam tactics. Now I feel more confident browsing the web.',
    rating: 5,
    avatar: '👩‍🎓'
  },
  {
    id: 3,
    nameVi: 'Lê Văn C',
    nameEn: 'Le Van C',
    roleVi: 'Chủ doanh nghiệp',
    roleEn: 'Business Owner',
    contentVi: 'Tôi đã giới thiệu ANTI-SCAM cho toàn bộ nhân viên công ty. Đây là công cụ cần thiết cho mọi người.',
    contentEn: 'I introduced ANTI-SCAM to all my employees. This is an essential tool for everyone.',
    rating: 5,
    avatar: '👨‍💻'
  },
  {
    id: 4,
    nameVi: 'Phạm Thị D',
    nameEn: 'Pham Thi D',
    roleVi: 'Người cao tuổi',
    roleEn: 'Senior Citizen',
    contentVi: 'Con cháu cài cho tôi extension này, giờ mỗi khi vào web lạ đều được cảnh báo. Rất an tâm!',
    contentEn: 'My grandchildren installed this extension for me. Now I get warnings for suspicious sites. Very reassuring!',
    rating: 5,
    avatar: '👵'
  }
]

interface Props {
  language: string
}

export default function TestimonialCarousel({ language }: Props) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  }

  const t = testimonials[current]

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Quote icon */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
        <Quote className="w-6 h-6 text-blue-400" />
      </div>

      {/* Testimonial card */}
      <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-8 pt-10 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {/* Avatar */}
            <div className="text-5xl mb-4">{t.avatar}</div>

            {/* Rating */}
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            {/* Content */}
            <p className="text-lg text-gray-200 mb-6 italic">
              "{language === 'vi' ? t.contentVi : t.contentEn}"
            </p>

            {/* Author */}
            <div>
              <p className="font-semibold text-white">
                {language === 'vi' ? t.nameVi : t.nameEn}
              </p>
              <p className="text-sm text-gray-400">
                {language === 'vi' ? t.roleVi : t.roleEn}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1)
                  setCurrent(index)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current ? 'w-6 bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
