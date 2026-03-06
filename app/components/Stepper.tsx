'use client'

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className='flex items-center gap-4'>
      {steps.map((step, i) => (
        <div key={i} className='flex items-center gap-2'>
          <div className={w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold +
            (i <= current ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500')}>
            {i < current ? '\u2713' : i + 1}
          </div>
          <span className={i <= current ? 'font-medium' : 'text-gray-400'}>{step}</span>
          {i < steps.length - 1 && <div className='w-8 h-px bg-gray-300' />}
        </div>
      ))}
    </div>
  )
}