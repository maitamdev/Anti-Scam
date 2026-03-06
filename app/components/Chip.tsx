'use client'

export function Chip({ label, color = 'blue', onRemove }: { label: string; color?: string; onRemove?: () => void }) {
  const colors: Record<string, string> = { blue: 'bg-blue-100 text-blue-800', green: 'bg-green-100 text-green-800', red: 'bg-red-100 text-red-800', yellow: 'bg-yellow-100 text-yellow-800', gray: 'bg-gray-100 text-gray-800' }
  return (
    <span className={inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium }>
      {label}
      {onRemove && <button onClick={onRemove} className='ml-1 hover:opacity-70'>\u2715</button>}
    </span>
  )
}