'use client'
import { useState, useEffect } from 'react'

export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => { const h = () => setShow(window.scrollY > 400); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h) }, [])
  if (!show) return null
  return <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='fixed bottom-6 right-6 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-all z-50' aria-label='Back to top'>\u2191</button>
}