'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronLeft, ChevronRight, Shield, Lock, Mail, Wifi, Smartphone, RefreshCw, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
  count: number
}

interface Guide {
  id: string
  title: string
  slug: string
  description: string
  thumbnail: string | null
  level: string
  category: { name: string; slug: string }
  views: number
  createdAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

const iconMap: Record<string, any> = {
  Lock: Lock,
  Mail: Mail,
  Wifi: Wifi,
  Smartphone: Smartphone,
  Shield: Shield,
  RefreshCw: RefreshCw,
}

// Placeholder images for guides
const placeholderImages = [
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
]

export default function GuidePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [guides, setGuides] = useState<Guide[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchGuides = async (category: string, search: string, page: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '6',
      })
      if (category !== 'all') params.set('category', category)
      if (search) params.set('search', search)

      const res = await fetch(`/api/guides?${params}`)
      const data = await res.json()

      if (data.success) {
        setGuides(data.data.guides)
        setCategories(data.data.categories)
        setPagination(data.data.pagination)
      }
    } catch (error) {
      console.error('Failed to fetch guides:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGuides(selectedCategory, searchQuery, currentPage)
  }, [selectedCategory, currentPage])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchGuides(selectedCategory, searchQuery, 1)
  }

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1a]">
      <Header />

      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Quay lại trang chủ</span>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Tài nguyên & Hướng dẫn
            </h1>
            <p className="text-gray-400">
              Khám phá các bài viết, mẹo và hướng dẫn để bảo vệ bản thân trên không gian mạng.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Categories */}
              <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800 mb-6">
                <h2 className="font-semibold mb-4">Danh mục</h2>
                <div className="space-y-1">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-blue-600/20 text-blue-400'
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    <span>Tất cả</span>
                    <span className="text-sm">{categories.reduce((sum, c) => sum + c.count, 0)}</span>
                  </button>
                  {categories.map((cat) => {
                    const IconComponent = iconMap[cat.icon || 'Shield'] || Shield
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.slug)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === cat.slug
                            ? 'bg-blue-600/20 text-blue-400'
                            : 'text-gray-400 hover:bg-gray-800'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-sm">{cat.count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/10 rounded-2xl p-6 border border-blue-500/20">
                <h3 className="font-semibold mb-2">Đánh giá mức độ an toàn</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Tìm hiểu xem bạn có đang an toàn trên không gian mạng hay không.
                </p>
                <Link
                  href="/assessment"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg transition-colors"
                >
                  Bắt đầu ngay
                </Link>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm bài viết, hướng dẫn..."
                    className="w-full bg-[#111827] border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </form>

              {/* Guides Grid */}
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : guides.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {guides.map((guide, index) => (
                      <motion.div
                        key={guide.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link href={`/guide/${guide.slug}`}>
                          <div className="bg-[#111827] rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors group">
                            {/* Thumbnail */}
                            <div className="aspect-video bg-gray-800 relative overflow-hidden">
                              <img
                                src={guide.thumbnail || placeholderImages[index % placeholderImages.length]}
                                alt={guide.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            {/* Content */}
                            <div className="p-4">
                              <span className={`text-xs font-medium ${
                                guide.level === 'advanced' ? 'text-purple-400' : 'text-cyan-400'
                              }`}>
                                {guide.level === 'advanced' ? 'Nâng cao' : 'Cơ bản'}
                              </span>
                              <h3 className="font-semibold mt-1 mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                {guide.title}
                              </h3>
                              <p className="text-gray-400 text-sm line-clamp-2">
                                {guide.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-[#111827] border border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-700 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        let pageNum = i + 1
                        if (pagination.totalPages > 5) {
                          if (currentPage > 3) {
                            pageNum = currentPage - 2 + i
                          }
                          if (currentPage > pagination.totalPages - 2) {
                            pageNum = pagination.totalPages - 4 + i
                          }
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-lg transition-colors ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'bg-[#111827] border border-gray-800 hover:border-gray-700'
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      })}

                      {pagination.totalPages > 5 && currentPage < pagination.totalPages - 2 && (
                        <>
                          <span className="text-gray-500">...</span>
                          <button
                            onClick={() => setCurrentPage(pagination.totalPages)}
                            className="w-10 h-10 rounded-lg bg-[#111827] border border-gray-800 hover:border-gray-700 transition-colors"
                          >
                            {pagination.totalPages}
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                        disabled={currentPage === pagination.totalPages}
                        className="p-2 rounded-lg bg-[#111827] border border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-700 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Chưa có bài viết</h3>
                  <p className="text-gray-400">
                    {searchQuery
                      ? 'Không tìm thấy bài viết phù hợp với từ khóa của bạn.'
                      : 'Các bài viết hướng dẫn sẽ sớm được cập nhật.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
