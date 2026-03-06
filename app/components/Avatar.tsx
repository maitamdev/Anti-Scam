'use client'

export function Avatar({ src, name, size = 40 }: { src?: string; name: string; size?: number }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  if (src) return <img src={src} alt={name} width={size} height={size} className='rounded-full object-cover' />
  const colors = ['bg-blue-500','bg-green-500','bg-purple-500','bg-orange-500','bg-pink-500']
  const color = colors[name.length % colors.length]
  return <div style={{width:size,height:size}} className={${color} rounded-full flex items-center justify-center text-white font-bold text-sm}>{initials}</div>
}