'use client'
import { useEffect } from 'react'

/**
 * useDocumentTitle - Set the document title reactively
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title
    return () => {
      document.title = previousTitle
    }
  }, [title])
}
