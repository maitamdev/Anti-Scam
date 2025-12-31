'use client'

import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
  id: string
  title: string
  content: ReactNode
  icon?: ReactNode
}

interface Props {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpen?: string[]
  variant?: 'default' | 'bordered' | 'separated'
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  variant = 'default'
}: Props) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen)

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      )
    } else {
      setOpenItems(prev => (prev.includes(id) ? [] : [id]))
    }
  }

  const isOpen = (id: string) => openItems.includes(id)

  const variantStyles = {
    default: {
      container: 'divide-y divide-gray-800',
      item: '',
      header: 'py-4',
      content: 'pb-4'
    },
    bordered: {
      container: 'border border-gray-800 rounded-xl overflow-hidden divide-y divide-gray-800',
      item: '',
      header: 'p-4 bg-white/5',
      content: 'p-4 bg-white/[0.02]'
    },
    separated: {
      container: 'space-y-3',
      item: 'bg-white/5 border border-gray-800 rounded-xl overflow-hidden',
      header: 'p-4',
      content: 'px-4 pb-4'
    }
  }

  const styles = variantStyles[variant]

  return (
    <div className={styles.container}>
      {items.map(item => (
        <div key={item.id} className={styles.item}>
          <button
            onClick={() => toggleItem(item.id)}
            className={`w-full flex items-center justify-between text-left ${styles.header} hover:bg-white/5 transition-colors`}
          >
            <div className="flex items-center gap-3">
              {item.icon && (
                <span className="text-blue-400">{item.icon}</span>
              )}
              <span className="font-medium text-white">{item.title}</span>
            </div>
            <motion.div
              animate={{ rotate: isOpen(item.id) ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isOpen(item.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className={`${styles.content} text-gray-400`}>
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
