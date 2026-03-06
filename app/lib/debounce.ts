/**
 * Debounce Utility
 * Delays function execution until after a specified wait time
 */

type AnyFunction = (...args: unknown[]) => unknown

/**
 * Create a debounced version of a function
 * @param func - The function to debounce
 * @param waitMs - The debounce delay in milliseconds
 * @returns Debounced function with cancel method
 */
export function debounce<T extends AnyFunction>(
  func: T,
  waitMs: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const debounced = function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args)
      timeoutId = null
    }, waitMs)
  } as T & { cancel: () => void }

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return debounced
}
