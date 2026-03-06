'use client'

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <label className='flex items-center gap-3 cursor-pointer'>
      <button role='switch' aria-checked={checked} onClick={() => onChange(!checked)}
        className={elative w-11 h-6 rounded-full transition-colors + (checked ? 'bg-blue-500' : 'bg-gray-300')}>
        <span className={bsolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform + (checked ? 'translate-x-5' : '')} />
      </button>
      {label && <span className='text-sm'>{label}</span>}
    </label>
  )
}