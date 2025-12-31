'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, ArrowLeft, ThumbsUp, Send, User, Calendar, Tag, AlertTriangle, Plus, X } from 'lucide-react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useTranslation } from '../../lib/i18n/LanguageContext'

interface Story {
  id: number
  category: string
  title: string
  content: string
  lossAmount?: number
  date: string
  helpful: number
  isAnonymous: boolean
}

const categories = [
  { id: 'banking', labelVi: 'Lừa đảo ngân hàng', labelEn: 'Banking Scam' },
  { id: 'shopping', labelVi: 'Mua hàng online', labelEn: 'Online Shopping' },
  { id: 'investment', labelVi: 'Đầu tư tài chính', labelEn: 'Investment' },
  { id: 'romance', labelVi: 'Lừa tình cảm', labelEn: 'Romance Scam' },
  { id: 'job', labelVi: 'Việc làm giả', labelEn: 'Fake Job' },
  { id: 'lottery', labelVi: 'Trúng thưởng giả', labelEn: 'Fake Lottery' },
  { id: 'other', labelVi: 'Khác', labelEn: 'Other' },
]

// Sample stories (in real app, fetch from API)
const sampleStories: Story[] = [
  {
    id: 1,
    category: 'banking',
    title: 'Bị lừa qua tin nhắn giả mạo ngân hàng',
    content: 'Tôi nhận được tin nhắn SMS từ "VCB" thông báo tài khoản bị khóa, yêu cầu click link để xác minh. Link dẫn đến trang web giống hệt Vietcombank. Sau khi nhập thông tin, tài khoản bị rút hết 15 triệu trong vài phút.',
    lossAmount: 15000000,
    date: '2025-12-15',
    helpful: 45,
    isAnonymous: true
  },
  {
    id: 2,
    category: 'shopping',
    title: 'Đặt hàng Shopee nhưng nhận được hàng giả',
    content: 'Mua điện thoại iPhone 15 giá rẻ hơn thị trường 3 triệu. Shop có nhiều đánh giá 5 sao. Khi nhận hàng mới phát hiện là hàng nhái, shop đã đóng cửa và không liên lạc được.',
    lossAmount: 12000000,
    date: '2025-12-10',
    helpful: 32,
    isAnonymous: true
  },
  {
    id: 3,
    category: 'investment',
    title: 'Sập bẫy đầu tư tiền ảo lãi suất cao',
    content: 'Được bạn giới thiệu app đầu tư crypto lãi 30%/tháng. Ban đầu rút được tiền bình thường. Sau khi nạp thêm 50 triệu thì app biến mất, không rút được.',
    lossAmount: 50000000,
    date: '2025-12-05',
    helpful: 78,
    isAnonymous: true
  },
  {
    id: 4,
    category: 'job',
    title: 'Việc làm online lương cao - bẫy đa cấp',
    content: 'Thấy quảng cáo việc làm online lương 500k/ngày, chỉ cần like và share. Sau đó bị yêu cầu nạp tiền để "nâng cấp tài khoản" mới được rút. Nạp 5 triệu rồi không rút được.',
    lossAmount: 5000000,
    date: '2025-11-28',
    helpful: 56,
    isAnonymous: true
  },
]

export default function StoriesPage() {
  const { language } = useTranslation()
  const [stories] = useState<Story[]>(sampleStories)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showForm, setShowForm] = useState(false)
  const [newStory, setNewStory] = useState({ category: '', title: '', content: '', lossAmount: '' })

  const filteredStories = selectedCategory === 'all' 
    ? stories 
    : stories.filter(s => s.category === selectedCategory)

  const getCategoryLabel = (catId: string) => {
    const cat = categories.find(c => c.id === catId)
    return cat ? (language === 'vi' ? cat.labelVi : cat.labelEn) : catId
  }

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ'
  }

  const handleSubmit = () => {
    // In real app, submit to API
    alert(language === 'vi' ? 'Cảm ơn bạn đã chia sẻ! Câu chuyện sẽ được duyệt trước khi đăng.' : 'Thank you for sharing! Your story will be reviewed before posting.')
    setShowForm(false)
    setNewStory({ category: '', title: '', content: '', lossAmount: '' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {language === 'vi' ? 'Quay lại' : 'Back'}
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-4">
              <MessageSquare className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'vi' ? 'Câu chuyện Lừa đảo' : 'Scam Stories'}
            </h1>
            <p className="text-gray-400">
              {language === 'vi' 
                ? 'Chia sẻ và học hỏi từ kinh nghiệm của cộng đồng'
                : 'Share and learn from community experiences'}
            </p>
          </motion.div>

          {/* Add Story Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {language === 'vi' ? 'Chia sẻ câu chuyện của bạn' : 'Share your story'}
            </button>
          </motion.div>

          {/* Category Filter */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'all' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {language === 'vi' ? 'Tất cả' : 'All'}
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {language === 'vi' ? cat.labelVi : cat.labelEn}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Stories List */}
          <div className="space-y-4">
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-medium mb-2">
                      <Tag className="w-3 h-3" />
                      {getCategoryLabel(story.category)}
                    </span>
                    <h3 className="text-lg font-semibold text-white">{story.title}</h3>
                  </div>
                  {story.lossAmount && (
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-gray-500">{language === 'vi' ? 'Thiệt hại' : 'Loss'}</p>
                      <p className="text-red-400 font-semibold">{formatMoney(story.lossAmount)}</p>
                    </div>
                  )}
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{story.content}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {story.isAnonymous ? (language === 'vi' ? 'Ẩn danh' : 'Anonymous') : 'User'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(story.date).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <button className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{story.helpful}</span>
                    <span className="text-xs">{language === 'vi' ? 'hữu ích' : 'helpful'}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredStories.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">
                {language === 'vi' ? 'Chưa có câu chuyện nào trong danh mục này' : 'No stories in this category yet'}
              </p>
            </div>
          )}

          {/* Warning */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-300">
                  {language === 'vi' 
                    ? 'Các câu chuyện được chia sẻ ẩn danh và đã được kiểm duyệt. Mục đích là cảnh báo cộng đồng, không nhằm bôi nhọ cá nhân hay tổ chức.'
                    : 'Stories are shared anonymously and moderated. The purpose is to warn the community, not to defame individuals or organizations.'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Submit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{language === 'vi' ? 'Chia sẻ câu chuyện' : 'Share your story'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{language === 'vi' ? 'Loại lừa đảo' : 'Scam Type'}</label>
                  <select
                    value={newStory.category}
                    onChange={e => setNewStory({...newStory, category: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">{language === 'vi' ? 'Chọn loại' : 'Select type'}</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{language === 'vi' ? cat.labelVi : cat.labelEn}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">{language === 'vi' ? 'Tiêu đề' : 'Title'}</label>
                  <input
                    type="text"
                    value={newStory.title}
                    onChange={e => setNewStory({...newStory, title: e.target.value})}
                    placeholder={language === 'vi' ? 'Tóm tắt ngắn gọn...' : 'Brief summary...'}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">{language === 'vi' ? 'Nội dung chi tiết' : 'Details'}</label>
                  <textarea
                    value={newStory.content}
                    onChange={e => setNewStory({...newStory, content: e.target.value})}
                    placeholder={language === 'vi' ? 'Mô tả chi tiết cách bạn bị lừa...' : 'Describe how you were scammed...'}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">{language === 'vi' ? 'Số tiền thiệt hại (VNĐ)' : 'Loss Amount (VND)'}</label>
                  <input
                    type="number"
                    value={newStory.lossAmount}
                    onChange={e => setNewStory({...newStory, lossAmount: e.target.value})}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <p className="text-xs text-gray-500">
                  {language === 'vi' 
                    ? '* Câu chuyện sẽ được đăng ẩn danh và kiểm duyệt trước khi hiển thị.'
                    : '* Story will be posted anonymously and moderated before display.'}
                </p>

                <button
                  onClick={handleSubmit}
                  disabled={!newStory.category || !newStory.title || !newStory.content}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {language === 'vi' ? 'Gửi câu chuyện' : 'Submit Story'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
