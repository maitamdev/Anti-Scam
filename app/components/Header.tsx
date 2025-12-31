'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Shield, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from '../lib/i18n/LanguageContext'

export default function Header() {
  const { data: session, status } = useSession()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const userMenuRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { href: '/', label: t.common.home },
    { href: '/scan', label: t.common.scan },
    { href: '/alerts', label: t.common.alerts },
    { href: '/quiz', label: t.common.quiz },
    { href: '/guide', label: t.common.guide },
    { href: '/report', label: t.common.report },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0a0f1a]/70 backdrop-blur-lg border-b border-blue-500/20 shadow-lg shadow-blue-500/5' 
          : 'bg-[#0a0f1a]/50 backdrop-blur-md border-b border-blue-500/10'
      }`}
    >
      {/* Gradient line on top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
      
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-500/30 rounded-xl blur-lg group-hover:bg-blue-400/40 transition-colors" />
              <Image 
                src="/logo.png" 
                alt="ANTI-SCAM Logo" 
                width={36} 
                height={36}
                className="rounded-xl relative z-10 sm:w-10 sm:h-10"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-wide">
                <span className="text-white">ANTI</span>
                <span className="text-blue-500">-</span>
                <span className="text-cyan-400">SCAM</span>
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`relative px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-150 rounded-lg ${
                    isActive 
                      ? 'text-blue-400 bg-blue-500/10' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            
            {/* User Menu or Login Button */}
            {status === 'loading' ? (
              <div className="ml-2 lg:ml-4 w-8 h-8 rounded-full bg-gray-700 animate-pulse" />
            ) : session ? (
              <div className="relative ml-2 lg:ml-4" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold">
                    {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm text-gray-300 hidden lg:block max-w-[100px] truncate">
                    {session.user.name || session.user.email?.split('@')[0]}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm font-medium text-white truncate">
                          {session.user.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {session.user.email}
                        </p>
                        <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                          session.user.tier === 'FREE' ? 'bg-gray-600 text-gray-300' :
                          session.user.tier === 'PRO' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {session.user.tier}
                        </span>
                      </div>
                      
                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/history"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                          <Shield className="w-4 h-4" />
                          Lịch sử quét
                        </Link>
                      </div>
                      
                      <div className="border-t border-gray-700 py-1">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false)
                            signOut({ callbackUrl: '/' })
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Đăng xuất
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="ml-2 lg:ml-4"
              >
                <Link
                  href="/auth/signin"
                  className="flex items-center gap-1.5 px-3 lg:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg text-sm font-semibold text-white transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                >
                  <span>{t.common.login}</span>
                </Link>
              </motion.div>
            )}
            
            {/* Language Switcher */}
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-gray-800/50">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive 
                            ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-500' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {isActive && <Shield className="w-4 h-4" />}
                        <span>{link.label}</span>
                      </Link>
                    </motion.div>
                  )
                })}
                
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-3"
                >
                  {session ? (
                    <div className="mx-4 space-y-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center justify-center gap-2 py-3 bg-gray-800 rounded-xl text-white font-semibold"
                        onClick={() => setIsOpen(false)}
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          setIsOpen(false)
                          signOut({ callbackUrl: '/' })
                        }}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-red-500/20 rounded-xl text-red-400 font-semibold"
                      >
                        <LogOut className="w-5 h-5" />
                        Đăng xuất
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/auth/signin"
                      className="flex items-center justify-center gap-2 mx-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      Đăng nhập
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
