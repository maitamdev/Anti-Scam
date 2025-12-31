'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface Tab {
  id: string
  label: string
  icon?: LucideIcon
}

interface Props {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
  variant?: 'pills' | 'underline' | 'boxed'
  size?: 'sm' | 'md' | 'lg'
}

export default function TabSwitcher({ 
  tabs, 
  activeTab, 
  onChange, 
  variant = 'pills',
  size = 'md' 
}: Props) {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  if (variant === 'underline') {
    return (
      <div className="flex border-b border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative ${sizes[size]} flex items-center font-medium transition-colors ${
              activeTab === tab.id 
                ? 'text-blue-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.icon && <tab.icon className={iconSizes[size]} />}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              />
            )}
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'boxed') {
    return (
      <div className="inline-flex bg-gray-800/50 rounded-xl p-1 border border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative ${sizes[size]} flex items-center font-medium rounded-lg transition-all ${
              activeTab === tab.id 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="boxed-bg"
                className="absolute inset-0 bg-blue-600 rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <tab.icon className={iconSizes[size]} />}
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    )
  }

  // Pills variant (default)
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map(tab => (
        <motion.button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`${sizes[size]} flex items-center font-medium rounded-xl transition-all ${
            activeTab === tab.id 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {tab.icon && <tab.icon className={iconSizes[size]} />}
          {tab.label}
        </motion.button>
      ))}
    </div>
  )
}
