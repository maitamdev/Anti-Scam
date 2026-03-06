/**
 * Date Manipulation Helpers
 * Vietnamese-friendly date utilities
 */

/**
 * Check if a date is today
 */
export function isToday(date: Date | string): boolean {
  const d = new Date(date)
  const today = new Date()
  return d.toDateString() === today.toDateString()
}

/**
 * Check if a date is yesterday
 */
export function isYesterday(date: Date | string): boolean {
  const d = new Date(date)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return d.toDateString() === yesterday.toDateString()
}

/**
 * Get start of day
 */
export function startOfDay(date: Date = new Date()): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * Get end of day
 */
export function endOfDay(date: Date = new Date()): Date {
  const d = new Date(date)
  d.setHours(23, 59, 59, 999)
  return d
}

/**
 * Get the difference in days between two dates
 */
export function diffInDays(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Get Vietnamese day of week name
 */
export function getDayNameVN(date: Date): string {
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
  return days[date.getDay()]
}

/**
 * Get Vietnamese month name
 */
export function getMonthNameVN(month: number): string {
  const months = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
    'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
    'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
  ]
  return months[month]
}

/**
 * Check if a date is within the last N days
 */
export function isWithinLastDays(date: Date | string, days: number): boolean {
  const d = new Date(date)
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  return d >= cutoff
}

/**
 * Format a date range (e.g., "1 - 7 Tháng 3, 2024")
 */
export function formatDateRange(start: Date, end: Date): string {
  const sameMonth = start.getMonth() === end.getMonth()
  const sameYear = start.getFullYear() === end.getFullYear()

  if (sameMonth && sameYear) {
    return `${start.getDate()} - ${end.getDate()} ${getMonthNameVN(start.getMonth())}, ${start.getFullYear()}`
  }
  if (sameYear) {
    return `${start.getDate()} ${getMonthNameVN(start.getMonth())} - ${end.getDate()} ${getMonthNameVN(end.getMonth())}, ${start.getFullYear()}`
  }
  return `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()} - ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`
}
