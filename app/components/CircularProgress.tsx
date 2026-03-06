'use client'

export function CircularProgress({ value, size = 80, strokeWidth = 8, color = '#3B82F6' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  return (
    <svg width={size} height={size} className='transform -rotate-90'>
      <circle cx={size/2} cy={size/2} r={radius} stroke='#E5E7EB' strokeWidth={strokeWidth} fill='none' />
      <circle cx={size/2} cy={size/2} r={radius} stroke={color} strokeWidth={strokeWidth} fill='none' strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap='round' className='transition-all duration-500' />
      <text x='50%' y='50%' textAnchor='middle' dy='.3em' className='transform rotate-90 origin-center fill-current text-sm font-bold'>{Math.round(value)}%</text>
    </svg>
  )
}