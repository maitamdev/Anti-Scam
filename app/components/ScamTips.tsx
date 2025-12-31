'use client'

import { useState, useEffect } from 'react'
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '../lib/i18n/LanguageContext'

export default function ScamTips() {
  const { t } = useTranslation()
  const tips = t.tips.items
  const [currentTip, setCurrentTip] = useState(0)

  // Reset currentTip if it's out of bounds when tips change
  useEffect(() => {
    if (currentTip >= tips.length) {
      setCurrentTip(0)
    }
  }, [tips.length, currentTip])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [tips.length])

  const nextTip = () => setCurrentTip((prev) => (prev + 1) % tips.length)
  const prevTip = () => setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length)

  // Safety check
  const currentTipData = tips[currentTip] || tips[0]
  if (!currentTipData) return null

  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-4 h-4 text-blue-400" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-blue-400 font-medium">{t.tips.tip} #{currentTip + 1}</span>
            <div className="flex items-center gap-1">
              <button onClick={prevTip} className="p-1 hover:bg-white/10 rounded">
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </button>
              <button onClick={nextTip} className="p-1 hover:bg-white/10 rounded">
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="font-medium text-sm mb-1">{currentTipData.title}</h4>
              <p className="text-gray-400 text-xs">{currentTipData.content}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Progress dots */}
      <div className="flex justify-center gap-1 mt-3">
        {tips.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentTip(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === currentTip ? 'bg-blue-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
