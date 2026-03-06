'use client'

export function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (p: number) => void }) {
  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1)
  return (
    <nav className='flex items-center gap-2'>
      <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1} className='px-3 py-1 rounded border disabled:opacity-50'>\u2190</button>
      {pages.map(p => (
        <button key={p} onClick={() => onPageChange(p)} className={px-3 py-1 rounded border + (p === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100')}>{p}</button>
      ))}
      <button onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages} className='px-3 py-1 rounded border disabled:opacity-50'>\u2192</button>
    </nav>
  )
}