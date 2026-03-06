'use client'
import { useState, useEffect } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => { const h = () => { const s = document.documentElement.scrollTop; const t = document.documentElement.scrollHeight - document.documentElement.clientHeight; setProgress(t > 0 ? (s / t) * 100 : 0) }; window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h) }, [])
  return <div className='fixed top-0 left-0 right-0 h-1 z-[60]'><div className='h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-150' style={{ width: progress + '%' }} /></div>
}