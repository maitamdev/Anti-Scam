'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Shield, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/scan', label: 'Phân tích' },
  { href: '/quiz', label: 'Trắc nghiệm' },
  { href: '/guide', label: 'Cẩm nang' },
  { href: '/report', label: 'Báo cáo' },
  { href: '/pricing', label: 'Bảng giá' },
  { href: '/about', label: 'Giới thiệu' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-blue-500/20 shadow-lg shadow-blue-500/5' 
          : 'bg-transparent'
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
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                ANTI-SCAM
              </span>
              
            </div>
          </Link>

          {/* Desktop nav */}
          <LayoutGroup>
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              const isHovered = hoveredLink === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    isActive 
                      ? 'text-blue-400' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {/* Hover background - slides in */}
                  {(isHovered || isActive) && (
                    <motion.div
                      layoutId="hoverBg"
                      className={`absolute inset-0 rounded-lg ${
                        isActive 
                          ? 'bg-blue-500/10 border border-blue-500/30' 
                          : 'bg-white/5'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                    />
                  )}
                  
                  {/* Text */}
                  <span className="relative z-10">{link.label}</span>
                  
                  {/* Active/Hover indicator line */}
                  {(isActive || isHovered) && (
                    <motion.div
                      layoutId="navLine"
                      className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full ${
                        isActive 
                          ? 'w-8 bg-gradient-to-r from-blue-400 to-blue-500' 
                          : 'w-4 bg-white/50'
                      }`}
                      transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
                    />
                  )}
                </Link>
              )
            })}
            
            {/* Auth Button - Đăng nhập */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="ml-2 lg:ml-4"
            >
              <Link
                href="/auth/signin"
                className="flex items-center gap-1.5 px-3 lg:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg text-sm font-semibold text-white transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
              >
                <span>Đăng nhập</span>
              </Link>
            </motion.div>
          </div>
          </LayoutGroup>

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
                  <Link
                    href="/auth/signin"
                    className="flex items-center justify-center gap-2 mx-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
