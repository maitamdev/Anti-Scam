'use client'
import React from 'react'
import Link from 'next/link'

interface BreadcrumbItem { label: string; href?: string }

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label='Breadcrumb' className='flex items-center gap-2 text-sm text-gray-500'>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span>/</span>}
          {item.href ? (
            <Link href={item.href} className='hover:text-blue-500 transition-colors'>{item.label}</Link>
          ) : (
            <span className='text-gray-900 dark:text-white font-medium'>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}