'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, TrendingUp, Users, AlertTriangle, Link2, Image as ImageIcon } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import UrlInput from './components/UrlInput'
import ResultCard from './components/ResultCard'
import ImageUpload from './components/ImageUpload'

interface ScanResult {
  url: string
  domain: string
  score: number
  label: 'SAFE' | 'CAUTION' | 'DANGEROUS'
  reasons: string[]
  aiConfidence: number
  heuristicScore?: number
  aiScore?: number
}

interface Stats {
  totalScans: number
  dangerousCount: number
  reportsCount: number
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'url' | 'image'>('url')
  const [result, setResult] = useState<ScanResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [stats, setStats] = useState<Stats>({ totalScans: 0, dangerousCount: 0, reportsCount: 0 })

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats({
            totalScans: data.data.totalScans,
            dangerousCount: data.data.dangerousCount,
            reportsCount: data.data.reportsCount,
          })
        }
      })
      .catch(() => {})
  }, [])

  const handleScan = async (url: string) => {
    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      const data = await res.json()

      if (!data.success) {
        throw new Error(data.error || 'Có lỗi xảy ra')
      }

      setResult(data.data)

      // Save to localStorage
      const history = JSON.parse(localStorage.getItem('scanHistory') || '[]')
      history.unshift({ ...data.data, timestamp: new Date().toISOString() })
      localStorage.setItem('scanHistory', JSON.stringify(history.slice(0, 20)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Shield className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                <span className="gradient-text">ANTISCAM</span>
              </h1>
              <p className="text-lg text-gray-400">
                Kiểm tra Website & Hình ảnh Lừa đảo bằng AI
              </p>
            </motion.div>

            {/* Tab Switcher */}
            <div className="flex justify-center gap-2 mb-8">
              <button
                onClick={() => { setActiveTab('url'); setResult(null); setError(''); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'url'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Link2 className="w-5 h-5" />
                Kiểm tra URL
              </button>
              <button
                onClick={() => { setActiveTab('image'); setResult(null); setError(''); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'image'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <ImageIcon className="w-5 h-5" />
                Phân tích Hình ảnh
              </button>
            </div>

            {/* URL Tab */}
            {activeTab === 'url' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-400 mb-6">
                  Nhập URL website để AI phân tích và phát hiện lừa đảo
                </p>
                <UrlInput onSubmit={handleScan} isLoading={isLoading} />
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 mt-4"
                  >
                    {error}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Image Tab */}
            {activeTab === 'image' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-400 mb-6">
                  Tải lên ảnh chụp màn hình tin nhắn, website để phát hiện lừa đảo
                </p>
                <ImageUpload />
              </motion.div>
            )}
          </div>
        </section>

        {/* Result Section */}
        {result && activeTab === 'url' && (
          <section className="py-8 px-4">
            <ResultCard result={result} />
          </section>
        )}

        {/* Stats Section */}
        <section className="py-12 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Thống kê hệ thống</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center"
              >
                <TrendingUp className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <p className="text-3xl font-bold">{stats.totalScans.toLocaleString()}</p>
                <p className="text-gray-400">Lượt kiểm tra</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center"
              >
                <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <p className="text-3xl font-bold">{stats.dangerousCount.toLocaleString()}</p>
                <p className="text-gray-400">Website nguy hiểm</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center"
              >
                <Users className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <p className="text-3xl font-bold">{stats.reportsCount.toLocaleString()}</p>
                <p className="text-gray-400">Báo cáo cộng đồng</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Tính năng nổi bật</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Phân tích URL bằng AI', desc: 'Groq Llama 3.3 phân tích nội dung website thực' },
                { title: 'Phân tích Hình ảnh', desc: 'OCR + AI phát hiện lừa đảo trong ảnh chụp màn hình' },
                { title: 'Kiểm tra tức thì', desc: 'Kết quả trong vài giây với độ chính xác cao' },
                { title: 'Cộng đồng báo cáo', desc: 'Học từ báo cáo để ngày càng thông minh hơn' },
                { title: 'API công khai', desc: 'Tích hợp dễ dàng vào ứng dụng của bạn' },
                { title: 'Miễn phí', desc: 'Hoàn toàn miễn phí cho người dùng cá nhân' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
