/**
 * Browser Detection Utility
 * Detect browser type, version, and capabilities
 */

export interface BrowserInfo {
  name: string
  version: string
  isChrome: boolean
  isFirefox: boolean
  isSafari: boolean
  isEdge: boolean
  isOpera: boolean
  isMobile: boolean
  isBot: boolean
}

/**
 * Detect browser information from user agent string
 */
export function detectBrowser(userAgent?: string): BrowserInfo {
  const ua = userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : '')

  const isChrome = /Chrome\/(\d+)/.test(ua) && !/Edg\//.test(ua) && !/OPR\//.test(ua)
  const isFirefox = /Firefox\/(\d+)/.test(ua)
  const isSafari = /Safari\/(\d+)/.test(ua) && !isChrome
  const isEdge = /Edg\/(\d+)/.test(ua)
  const isOpera = /OPR\/(\d+)/.test(ua)
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(ua)
  const isBot = /bot|crawler|spider|crawling/i.test(ua)

  let name = 'Unknown'
  let version = ''

  if (isEdge) {
    name = 'Edge'
    version = ua.match(/Edg\/(\d+[\d.]*)/)?.[1] || ''
  } else if (isOpera) {
    name = 'Opera'
    version = ua.match(/OPR\/(\d+[\d.]*)/)?.[1] || ''
  } else if (isChrome) {
    name = 'Chrome'
    version = ua.match(/Chrome\/(\d+[\d.]*)/)?.[1] || ''
  } else if (isFirefox) {
    name = 'Firefox'
    version = ua.match(/Firefox\/(\d+[\d.]*)/)?.[1] || ''
  } else if (isSafari) {
    name = 'Safari'
    version = ua.match(/Version\/(\d+[\d.]*)/)?.[1] || ''
  }

  return { name, version, isChrome, isFirefox, isSafari, isEdge, isOpera, isMobile, isBot }
}

/**
 * Check if WebP is supported
 */
export function isWebPSupported(): boolean {
  if (typeof document === 'undefined') return false
  const canvas = document.createElement('canvas')
  return canvas.toDataURL('image/webp').startsWith('data:image/webp')
}

/**
 * Check if the browser supports service workers
 */
export function isServiceWorkerSupported(): boolean {
  return typeof navigator !== 'undefined' && 'serviceWorker' in navigator
}
