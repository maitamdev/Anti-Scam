'use client'

export function SocialLinks({ links }: { links: { platform: string; url: string }[] }) {
  const icons: Record<string, string> = { facebook: 'FB', twitter: 'TW', github: 'GH', linkedin: 'LI', youtube: 'YT' }
  return (
    <div className='flex items-center gap-3'>
      {links.map((link, i) => (
        <a key={i} href={link.url} target='_blank' rel='noopener noreferrer' className='w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-bold hover:bg-blue-100 transition-colors'>
          {icons[link.platform] || link.platform.slice(0,2).toUpperCase()}
        </a>
      ))}
    </div>
  )
}