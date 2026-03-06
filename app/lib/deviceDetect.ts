/**
 * Device Detection Utility
 * Detect device type, OS, and screen characteristics
 */

export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop'
  os: string
  osVersion: string
  isIOS: boolean
  isAndroid: boolean
  isWindows: boolean
  isMac: boolean
  isLinux: boolean
  screenWidth: number
  screenHeight: number
  pixelRatio: number
  isTouchDevice: boolean
}

/**
 * Detect device information
 */
export function detectDevice(): DeviceInfo {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : ''

  const isIOS = /iPad|iPhone|iPod/.test(ua)
  const isAndroid = /Android/.test(ua)
  const isWindows = /Windows/.test(ua)
  const isMac = /Macintosh/.test(ua)
  const isLinux = /Linux/.test(ua) && !isAndroid

  let os = 'Unknown'
  let osVersion = ''

  if (isIOS) {
    os = 'iOS'
    osVersion = ua.match(/OS (\d+[_\d]*)/)?.[1]?.replace(/_/g, '.') || ''
  } else if (isAndroid) {
    os = 'Android'
    osVersion = ua.match(/Android (\d+[\d.]*)/)?.[1] || ''
  } else if (isWindows) {
    os = 'Windows'
    osVersion = ua.match(/Windows NT (\d+[\d.]*)/)?.[1] || ''
  } else if (isMac) {
    os = 'macOS'
    osVersion = ua.match(/Mac OS X (\d+[_\d]*)/)?.[1]?.replace(/_/g, '.') || ''
  } else if (isLinux) {
    os = 'Linux'
  }

  const isMobile = isIOS || isAndroid || /Mobile/.test(ua)
  const isTablet = /iPad|Tablet/.test(ua) || (isAndroid && !/Mobile/.test(ua))
  const type = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop'

  const screenWidth = typeof screen !== 'undefined' ? screen.width : 0
  const screenHeight = typeof screen !== 'undefined' ? screen.height : 0
  const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  const isTouchDevice = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)

  return {
    type,
    os,
    osVersion,
    isIOS,
    isAndroid,
    isWindows,
    isMac,
    isLinux,
    screenWidth,
    screenHeight,
    pixelRatio,
    isTouchDevice,
  }
}

/**
 * Get a human-readable device description
 */
export function getDeviceDescription(): string {
  const device = detectDevice()
  return `${device.os} ${device.osVersion} (${device.type})`
}
