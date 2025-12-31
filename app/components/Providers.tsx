/**
 * SessionProvider wrapper for client components
 */

'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { LanguageProvider } from '../lib/i18n/LanguageContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </SessionProvider>
  )
}
