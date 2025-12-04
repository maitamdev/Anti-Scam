'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, History, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ResultCard from '../components/ResultCard'
import RiskBadge from '../components/RiskBadge'

interface HistoryItem {
  url: string
  domain: string
  score: number
  label: 'SAFE' | 'CAUTION' | 'DANGEROUS'
  reasons: string[]
  aiConfidence: number
  timestamp: string
}

export default function ResultPage() {
  const searchParams = useSearchParams()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [selectedResult, setSelectedResult] = useState<HistoryItem | null>(null)

  useEffect(() => {
    // Load history from localStorage
    const saved = localStorage.getItem('scanHistory')
    if (saved) {
      const parsed = JSON.parse(saved)
      setHistory(parsed)
      
      // Check if there's a URL param to show specific result
      const urlParam = searchParams.get('url')
      if (urlParam) {
        const found = parsed.find((item: HistoryItem) => item.url === urlParam)
        if (found) setSelectedResult(found)
      }
    }
  }, [searchParams])

  const clearHistory = () => {
    localStorage.removeItem('scanHistory')
    setHistory([])
    setSelectedResult(null)
  }

  const removeItem = (index: number) => {
    const newHistory = history.filter((_, i) => i !== index)
    localStorage.setItem('scanHistory', JSON.stringify(newHistory))
    setHistory(newHistory)
    if (selectedResult === history[index]) {
      setSelectedResult(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Link href="/" className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    <History className="w-6 h-6 text-blue-500" />
                    Lịch sử kiểm tra
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {history.length} kết quả được lưu trên thiết bị này
                  </p>
                </div>
              </div>
              
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa tất cả
                </button>
              )}
            </div>

            {selectedResult && (
              <div className="mb-8">
                <ResultCard result={selectedResult} />
              </div>
            )}

            {history.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <History className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Chưa có lịch sử kiểm tra</p>
                <Link
                  href="/"
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Kiểm tra ngay
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {history.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-gray-800 rounded-xl p-4 border cursor-pointer transition-colors ${
                      selectedResult === item 
                        ? 'border-blue-500' 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedResult(item)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.domain}</p>
                        <p className="text-sm text-gray-400 truncate">{item.url}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(item.timestamp).toLocaleString('vi-VN')}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <div className="text-right">
                          <p className={`font-bold ${
                            item.score <= 30 ? 'text-green-400' :
                            item.score <= 60 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {item.score}/100
                          </p>
                        </div>
                        <RiskBadge label={item.label} size="sm" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeItem(index)
                          }}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
