// Suppress console warnings in production
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  const originalWarn = console.warn
  const originalError = console.error

  console.warn = (...args) => {
    const message = args[0]?.toString() || ''
    
    // Suppress React DevTools warning
    if (message.includes('Download the React DevTools')) return
    
    // Suppress extra attributes warning
    if (message.includes('Extra attributes from the server')) return
    
    // Suppress bis_register warnings (browser extension)
    if (message.includes('bis_register') || message.includes('__processed_')) return
    
    originalWarn.apply(console, args)
  }

  console.error = (...args) => {
    const message = args[0]?.toString() || ''
    
    // Suppress storage access errors (handled gracefully in code)
    if (message.includes('Access to storage is not allowed')) return
    
    originalError.apply(console, args)
  }
}
