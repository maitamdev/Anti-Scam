/**
 * Throttle Utility
 * Limits function execution to at most once per specified interval
 */

type AnyFunction = (...args: unknown[]) => unknown

/**
 * Create a throttled version of a function
 * @param func - The function to throttle
 * @param limitMs - Minimum interval between executions in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends AnyFunction>(
  func: T,
  limitMs: number
): T & { cancel: () => void } {
  let inThrottle = false
  let lastArgs: Parameters<T> | null = null
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const throttled = function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      timeoutId = setTimeout(() => {
        inThrottle = false
        if (lastArgs) {
          func.apply(this, lastArgs)
          lastArgs = null
        }
      }, limitMs)
    } else {
      lastArgs = args
    }
  } as T & { cancel: () => void }

  throttled.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    inThrottle = false
    lastArgs = null
  }

  return throttled
}
