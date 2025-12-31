'use client'

import { motion } from 'framer-motion'
import { Share2, Facebook, Twitter, Link2, MessageCircle, Check } from 'lucide-react'
import { useState } from 'react'

interface Props {
  url: string
  title: string
  description?: string
  variant?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
}

export default function ShareButtons({ 
  url, 
  title, 
  description = '',
  variant = 'horizontal',
  size = 'md' 
}: Props) {
  const [copied, setCopied] = useState(false)

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDesc = encodeURIComponent(description)

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-600 hover:text-white',
      bgColor: 'bg-blue-600/20 text-blue-400'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-sky-500 hover:text-white',
      bgColor: 'bg-sky-500/20 text-sky-400'
    },
    {
      name: 'Zalo',
      icon: MessageCircle,
      href: `https://zalo.me/share?url=${encodedUrl}`,
      color: 'hover:bg-blue-500 hover:text-white',
      bgColor: 'bg-blue-500/20 text-blue-400'
    }
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className={`flex ${variant === 'vertical' ? 'flex-col' : 'flex-row'} gap-2`}>
      {shareLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${sizes[size]} ${link.bgColor} rounded-xl flex items-center justify-center transition-all ${link.color}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          title={`Chia sẻ lên ${link.name}`}
        >
          <link.icon className={iconSizes[size]} />
        </motion.a>
      ))}
      
      <motion.button
        onClick={copyToClipboard}
        className={`${sizes[size]} ${copied ? 'bg-green-500/20 text-green-400' : 'bg-gray-700/50 text-gray-400'} rounded-xl flex items-center justify-center transition-all hover:bg-gray-600 hover:text-white`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        title="Sao chép link"
      >
        {copied ? (
          <Check className={iconSizes[size]} />
        ) : (
          <Link2 className={iconSizes[size]} />
        )}
      </motion.button>
    </div>
  )
}
