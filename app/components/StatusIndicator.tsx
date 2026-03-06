'use client'

export function StatusIndicator({ status, label }: { status: 'online' | 'offline' | 'busy' | 'away'; label?: string }) {
  const colors = { online: 'bg-green-500', offline: 'bg-gray-400', busy: 'bg-red-500', away: 'bg-yellow-500' }
  return (
    <div className='flex items-center gap-2'>
      <span className={w-2.5 h-2.5 rounded-full  + (status === 'online' ? 'animate-pulse' : '')} />
      {label && <span className='text-sm text-gray-600'>{label}</span>}
    </div>
  )
}