'use client'

import { useLanguage } from '../lib/i18n/LanguageContext'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = () => {
    const newLang = language === 'vi' ? 'en' : 'vi'
    setLanguage(newLang)
    // Force full page reload to apply language change
    window.location.reload()
  }

  return (
    <button
      onClick={handleLanguageChange}
      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm"
      title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
    >
      <Globe className="w-4 h-4 text-cyan-400" />
      <span className="text-gray-300 font-medium">
        {language === 'vi' ? 'EN' : 'VI'}
      </span>
    </button>
  )
}
