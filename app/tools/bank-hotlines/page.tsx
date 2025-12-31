'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Search, ArrowLeft, AlertTriangle, Building2, Globe, Shield } from 'lucide-react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useTranslation } from '../../lib/i18n/LanguageContext'

interface Bank {
  name: string
  shortName: string
  hotline: string
  hotline24h?: string
  cardBlock?: string
  website: string
  logo?: string
}

const banks: Bank[] = [
  { name: 'Ngân hàng TMCP Ngoại thương Việt Nam', shortName: 'Vietcombank', hotline: '1900 545 413', hotline24h: '1800 599 919', cardBlock: '1900 545 413', website: 'vietcombank.com.vn' },
  { name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam', shortName: 'BIDV', hotline: '1900 9247', hotline24h: '1900 9247', cardBlock: '1900 9247', website: 'bidv.com.vn' },
  { name: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn', shortName: 'Agribank', hotline: '1900 558 818', hotline24h: '1900 558 818', website: 'agribank.com.vn' },
  { name: 'Ngân hàng TMCP Công Thương Việt Nam', shortName: 'VietinBank', hotline: '1900 558 868', hotline24h: '1900 558 868', cardBlock: '1900 558 868', website: 'vietinbank.vn' },
  { name: 'Ngân hàng TMCP Kỹ Thương Việt Nam', shortName: 'Techcombank', hotline: '1800 588 822', hotline24h: '1800 588 822', cardBlock: '1800 588 822', website: 'techcombank.com.vn' },
  { name: 'Ngân hàng TMCP Việt Nam Thịnh Vượng', shortName: 'VPBank', hotline: '1900 545 415', hotline24h: '1900 545 415', website: 'vpbank.com.vn' },
  { name: 'Ngân hàng TMCP Quân đội', shortName: 'MB Bank', hotline: '1900 545 426', hotline24h: '1900 545 426', cardBlock: '1900 545 426', website: 'mbbank.com.vn' },
  { name: 'Ngân hàng TMCP Á Châu', shortName: 'ACB', hotline: '1900 545 486', hotline24h: '1900 545 486', cardBlock: '1900 545 486', website: 'acb.com.vn' },
  { name: 'Ngân hàng TMCP Sài Gòn Thương Tín', shortName: 'Sacombank', hotline: '1900 5555 88', hotline24h: '1900 5555 88', website: 'sacombank.com.vn' },
  { name: 'Ngân hàng TMCP Tiên Phong', shortName: 'TPBank', hotline: '1900 585 885', hotline24h: '1900 585 885', website: 'tpb.vn' },
  { name: 'Ngân hàng TMCP Quốc tế Việt Nam', shortName: 'VIB', hotline: '1800 8180', hotline24h: '1800 8180', website: 'vib.com.vn' },
  { name: 'Ngân hàng TMCP Phát triển TP.HCM', shortName: 'HDBank', hotline: '1900 6060 60', hotline24h: '1900 6060 60', website: 'hdbank.com.vn' },
  { name: 'Ngân hàng TMCP Phương Đông', shortName: 'OCB', hotline: '1800 6678', hotline24h: '1800 6678', website: 'ocb.com.vn' },
  { name: 'Ngân hàng TMCP Hàng Hải Việt Nam', shortName: 'MSB', hotline: '1900 6083', hotline24h: '1900 6083', website: 'msb.com.vn' },
  { name: 'Ngân hàng TMCP Đông Nam Á', shortName: 'SeABank', hotline: '1900 555 587', hotline24h: '1900 555 587', website: 'seabank.com.vn' },
  { name: 'Ngân hàng TMCP Bưu điện Liên Việt', shortName: 'LienVietPostBank', hotline: '1900 545 596', website: 'lienvietpostbank.com.vn' },
  { name: 'Ngân hàng TMCP Xuất Nhập khẩu Việt Nam', shortName: 'Eximbank', hotline: '1900 5555 99', website: 'eximbank.com.vn' },
  { name: 'Ngân hàng TMCP Sài Gòn - Hà Nội', shortName: 'SHB', hotline: '1900 588 855', website: 'shb.com.vn' },
  { name: 'Ngân hàng TMCP Quốc Dân', shortName: 'NCB', hotline: '1900 6016', website: 'ncb-bank.vn' },
  { name: 'Ngân hàng TMCP An Bình', shortName: 'ABBank', hotline: '1900 6085', website: 'abbank.vn' },
]

const fakeHotlines = [
  '1900 xxxx xx (số lạ gọi đến)',
  '028 xxxx xxxx (số cố định lạ)',
  'Số di động cá nhân (09x, 03x...)',
  'Số Zalo/Viber/Telegram',
]

export default function BankHotlinesPage() {
  const { language } = useTranslation()
  const [search, setSearch] = useState('')

  const filteredBanks = banks.filter(bank => 
    bank.name.toLowerCase().includes(search.toLowerCase()) ||
    bank.shortName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {language === 'vi' ? 'Quay lại trang chủ' : 'Back to Home'}
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-2xl mb-4">
              <Phone className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'vi' ? 'Hotline Ngân hàng Chính thức' : 'Official Bank Hotlines'}
            </h1>
            <p className="text-gray-400">
              {language === 'vi' 
                ? 'Danh sách số điện thoại chính thức của các ngân hàng tại Việt Nam'
                : 'List of official phone numbers of banks in Vietnam'}
            </p>
          </motion.div>

          {/* Warning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-400 mb-2">
                  {language === 'vi' ? '⚠️ Cảnh báo số giả mạo' : '⚠️ Fake Number Warning'}
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  {language === 'vi' 
                    ? 'Ngân hàng KHÔNG BAO GIỜ gọi điện yêu cầu cung cấp OTP, mật khẩu, hoặc chuyển tiền. Các số sau thường là LỪA ĐẢO:'
                    : 'Banks NEVER call asking for OTP, password, or money transfer. These numbers are usually SCAMS:'}
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  {fakeHotlines.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={language === 'vi' ? 'Tìm ngân hàng...' : 'Search bank...'}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </motion.div>

          {/* Bank List */}
          <div className="space-y-3">
            {filteredBanks.map((bank, index) => (
              <motion.div
                key={bank.shortName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.02 }}
                className="bg-blue-900/10 border border-gray-800 rounded-xl p-4 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-5 h-5 text-blue-400" />
                      <h3 className="font-semibold text-white">{bank.shortName}</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{bank.name}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`tel:${bank.hotline.replace(/\s/g, '')}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {bank.hotline}
                      </a>
                      {bank.hotline24h && bank.hotline24h !== bank.hotline && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm">
                          24/7: {bank.hotline24h}
                        </span>
                      )}
                      <a
                        href={`https://${bank.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-500/20 text-gray-400 rounded-lg text-sm hover:bg-gray-500/30 transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        {bank.website}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredBanks.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">
                {language === 'vi' ? 'Không tìm thấy ngân hàng' : 'No bank found'}
              </p>
            </div>
          )}

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-green-500/10 border border-green-500/20 rounded-xl p-4"
          >
            <h3 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {language === 'vi' ? 'Cách xác minh số hotline' : 'How to verify hotline'}
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• {language === 'vi' ? 'Tra cứu trên website chính thức của ngân hàng' : 'Look up on official bank website'}</li>
              <li>• {language === 'vi' ? 'Kiểm tra trên thẻ ATM/thẻ tín dụng của bạn' : 'Check on your ATM/credit card'}</li>
              <li>• {language === 'vi' ? 'Gọi đến chi nhánh ngân hàng gần nhất để xác nhận' : 'Call nearest bank branch to confirm'}</li>
              <li>• {language === 'vi' ? 'KHÔNG gọi lại số lạ tự xưng là ngân hàng' : 'DO NOT call back unknown numbers claiming to be bank'}</li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
