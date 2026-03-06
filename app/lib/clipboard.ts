/**
 * Clipboard Utilities
 * Safe clipboard interactions with fallback support
 */

/**
 * Copy text to clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    const result = document.execCommand('copy')
    document.body.removeChild(textArea)
    return result
  } catch {
    console.error('Failed to copy to clipboard')
    return false
  }
}

/**
 * Read text from clipboard
 */
export async function readFromClipboard(): Promise<string | null> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      return await navigator.clipboard.readText()
    }
    return null
  } catch {
    console.error('Failed to read from clipboard')
    return null
  }
}

/**
 * Check if clipboard API is supported
 */
export function isClipboardSupported(): boolean {
  return !!(navigator.clipboard && window.isSecureContext)
}
