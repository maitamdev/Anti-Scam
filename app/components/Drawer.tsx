'use client'
import { useEffect } from 'react'

export function Drawer({ open, onClose, children, side = 'right' }: { open: boolean; onClose: () => void; children: React.ReactNode; side?: 'left' | 'right' }) {
  useEffect(() => { if (open) document.body.style.overflow = 'hidden'; else document.body.style.overflow = ''; return () => { document.body.style.overflow = '' } }, [open])
  if (!open) return null
  return (
    <div className='fixed inset-0 z-50'>
      <div className='absolute inset-0 bg-black/50' onClick={onClose} />
      <div className={bsolute top-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-xl p-6 overflow-y-auto transition-transform + (side === 'right' ? 'right-0' : 'left-0')}>
        <button onClick={onClose} className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'>\u2715</button>
        {children}
      </div>
    </div>
  )
}