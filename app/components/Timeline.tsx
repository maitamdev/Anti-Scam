'use client'

interface TimelineItem { title: string; description?: string; date?: string; icon?: React.ReactNode }

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className='space-y-6'>
      {items.map((item, i) => (
        <div key={i} className='flex gap-4'>
          <div className='flex flex-col items-center'>
            <div className='w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-100' />
            {i < items.length - 1 && <div className='w-0.5 flex-1 bg-gray-200' />}
          </div>
          <div className='pb-6'>
            <h4 className='font-medium'>{item.title}</h4>
            {item.description && <p className='text-sm text-gray-500 mt-1'>{item.description}</p>}
            {item.date && <time className='text-xs text-gray-400 mt-1'>{item.date}</time>}
          </div>
        </div>
      ))}
    </div>
  )
}