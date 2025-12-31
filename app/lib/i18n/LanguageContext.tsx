'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Language, TranslationKeys } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationKeys
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('vi')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load saved language from localStorage after mount
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'vi' || saved === 'en')) {
      setLanguageState(saved)
    }
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = translations[language]

  // Always render with default language on server to avoid hydration mismatch
  // The actual language will be applied after mount
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Hook to get translation directly
export function useTranslation() {
  const { t, language, setLanguage } = useLanguage()
  return { t, language, setLanguage }
}
