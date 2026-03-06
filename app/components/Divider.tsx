'use client'

export function Divider({ label, className = '' }: { label?: string; className?: string }) {
  if (!label) return <hr className={order-gray-200 dark:border-gray-700 } />
  return (
    <div className={lex items-center gap-4 }>
      <div className='flex-1 h-px bg-gray-200 dark:bg-gray-700' />
      <span className='text-sm text-gray-400'>{label}</span>
      <div className='flex-1 h-px bg-gray-200 dark:bg-gray-700' />
    </div>
  )
}