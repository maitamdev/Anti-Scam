'use client'
import { useState } from 'react'

export default function DashboardNotificationsPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900'>
      <div className='max-w-6xl mx-auto px-4 py-16'>
        <h1 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600'>
          DashboardNotifications
        </h1>
        <p className='mt-4 text-lg text-gray-600 dark:text-gray-400'>Thong bao</p>
        <div className='mt-12 grid gap-8'>
          <div className='p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700'>
            <p className='text-gray-500'>Content coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
