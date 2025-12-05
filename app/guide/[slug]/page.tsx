'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Eye, Tag, BookOpen, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

interface Guide {
  id: string
  title: string
  slug: string
  description: string
  content: string
  thumbnail: string | null
  level: string
  category: { name: string; slug: string }
  views: number
  createdAt: string
}

export default function GuideDetailPage() {
  const params = useParams()
  const [guide, setGuide] = useState<Guide | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const res = await fetch(`/api/guides/${params.slug}`)
        const data = await res.json()

        if (data.success) {
          setGuide(data.data)
        } else {
          setError('Không tìm thấy bài viết')
        }
      } catch {
        setError('Có lỗi xảy ra')
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchGuide()
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !guide) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
        <Header />
        <main className="flex-1 pt-24 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">{error || 'Không tìm thấy bài viết'}</h1>
            <Link href="/guide" className="text-blue-400 hover:text-blue-300">
              ← Quay lại danh sách
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Parse content into sections
  const parseContent = (html: string) => {
    const sections: Array<{ type: string; title?: string; items?: string[]; text?: string }> = []
    
    // Simple parsing - extract h2, p, ul, ol
    const h2Regex = /<h2>(.*?)<\/h2>/g
    const parts = html.split(/<h2>.*?<\/h2>/)
    const titles: string[] = []
    let match
    while ((match = h2Regex.exec(html)) !== null) {
      titles.push(match[1])
    }
    
    titles.forEach((title, i) => {
      const content = parts[i + 1] || ''
      
      // Check for list
      const ulMatch = content.match(/<ul>([\s\S]*?)<\/ul>/)
      const olMatch = content.match(/<ol>([\s\S]*?)<\/ol>/)
      
      if (ulMatch || olMatch) {
        const listContent = ulMatch ? ulMatch[1] : olMatch![1]
        const liRegex = /<li>([\s\S]*?)<\/li>/g
        const items: string[] = []
        let liMatch
        while ((liMatch = liRegex.exec(listContent)) !== null) {
          items.push(liMatch[1].replace(/<\/?strong>/g, '').replace(/<\/?[^>]+(>|$)/g, '').trim())
        }
        sections.push({ type: olMatch ? 'numbered' : 'bullet', title, items })
      }
      
      // Check for paragraph
      const pMatch = content.match(/<p>([\s\S]*?)<\/p>/)
      if (pMatch && !ulMatch && !olMatch) {
        sections.push({ type: 'text', title, text: pMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() })
      } else if (pMatch) {
        // Add intro text before list
        const introText = pMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim()
        if (introText && sections.length > 0) {
          sections[sections.length - 1] = { 
            ...sections[sections.length - 1], 
            text: introText 
          }
        }
      }
    })
    
    return sections
  }

  const sections = parseContent(guide.content)

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
      <Header />

      <main className="flex-1 pt-24 pb-12">
        <article className="max-w-4xl mx-auto px-4">
          {/* Back link */}
          <Link
            href="/guide"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
              <span className={`px-3 py-1 rounded-full font-medium ${
                guide.level === 'advanced'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              }`}>
                {guide.level === 'advanced' ? 'Nâng cao' : 'Cơ bản'}
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <Tag className="w-4 h-4" />
                {guide.category.name}
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <Eye className="w-4 h-4" />
                {guide.views} lượt xem
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <Clock className="w-4 h-4" />
                {new Date(guide.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{guide.title}</h1>
            <p className="text-xl text-gray-400">{guide.description}</p>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-[#111827] rounded-2xl p-6 md:p-8 border border-gray-800"
              >
                {/* Section Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                    {section.type === 'numbered' ? (
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                    ) : section.title?.includes('Rủi ro') || section.title?.includes('không nên') ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Lightbulb className="w-5 h-5 text-cyan-400" />
                    )}
                  </div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>

                {/* Intro text */}
                {section.text && (
                  <p className="text-gray-400 mb-4 leading-relaxed">{section.text}</p>
                )}

                {/* List items */}
                {section.items && (
                  <div className="space-y-3">
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[#1a2332] border border-gray-700/50"
                      >
                        {section.type === 'numbered' ? (
                          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-white">{i + 1}</span>
                          </div>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        )}
                        <p className="text-gray-300 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-8 bg-gradient-to-br from-blue-600/20 to-cyan-600/10 rounded-2xl border border-blue-500/20 text-center"
          >
            <h3 className="text-xl font-semibold mb-2">Kiểm tra mức độ an toàn của bạn</h3>
            <p className="text-gray-400 mb-6">
              Làm bài đánh giá để biết bạn đang ở mức độ nào và cần cải thiện gì.
            </p>
            <Link
              href="/assessment"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
            >
              Bắt đầu đánh giá
            </Link>
          </motion.div>

          {/* Related guides suggestion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex justify-between items-center"
          >
            <Link
              href="/guide"
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Xem thêm bài viết khác
            </Link>
            <Link
              href="/scan"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Kiểm tra URL ngay →
            </Link>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
