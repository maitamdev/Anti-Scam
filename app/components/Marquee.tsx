'use client'

export function Marquee({ children, speed = 30 }: { children: React.ReactNode; speed?: number }) {
  return (
    <div className='overflow-hidden whitespace-nowrap'>
      <div className='inline-flex animate-marquee' style={{ animationDuration: speed + 's' }}>
        <div className='flex items-center gap-8'>{children}</div>
        <div className='flex items-center gap-8 ml-8'>{children}</div>
      </div>
    </div>
  )
}