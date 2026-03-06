'use client'
import { useState } from 'react'

interface FaqItem { question: string; answer: string }

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <div className='space-y-3'>
      {items.map((item, i) => (
        <div key={i} className='border rounded-xl overflow-hidden'>
          <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className='w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50'>
            <span className='font-medium'>{item.question}</span>
            <span className='text-xl'>{openIndex === i ? '\u2212' : '+'}</span>
          </button>
          {openIndex === i && <div className='px-6 pb-4 text-gray-600'>{item.answer}</div>}
        </div>
      ))}
    </div>
  )
}