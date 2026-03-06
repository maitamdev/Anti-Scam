'use client'
import { useState, useEffect } from 'react'

export function CookieConsent() {
  const [show, setShow] = useState(false)
  useEffect(() => { if (!localStorage.getItem('cookie-consent')) setShow(true) }, [])
  const accept = () => { localStorage.setItem('cookie-consent', 'true'); setShow(false) }
  if (!show) return null
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 flex items-center justify-between flex-wrap gap-4'>
      <p className='text-sm'>Trang web s\u1EED d\u1EE5ng cookie \u0111\u1EC3 c\u1EA3i thi\u1EC7n tr\u1EA3i nghi\u1EC7m. B\u1EB1ng vi\u1EC7c ti\u1EBFp t\u1EE5c, b\u1EA1n \u0111\u1ED3ng y\u0301 v\u1EDBi ch\u00EDnh s\u00E1ch cookie.</p>
      <div className='flex gap-2'><button onClick={accept} className='px-4 py-2 bg-blue-500 rounded text-sm hover:bg-blue-600'>Ch\u1EA5p nh\u1EADn</button><button onClick={() => setShow(false)} className='px-4 py-2 border border-gray-600 rounded text-sm hover:bg-gray-800'>T\u1EEB ch\u1ED1i</button></div>
    </div>
  )
}