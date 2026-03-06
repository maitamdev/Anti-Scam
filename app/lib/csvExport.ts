/**
 * CSV Export Utility
 * Generate CSV files from data arrays
 */

/**
 * Convert an array of objects to CSV format
 */
export function toCSV<T extends Record<string, unknown>>(
  data: T[],
  columns?: { key: keyof T; label: string }[]
): string {
  if (data.length === 0) return ''

  const cols = columns || Object.keys(data[0]).map(key => ({
    key: key as keyof T,
    label: key as string,
  }))

  // Header row
  const header = cols.map(col => escapeCSVValue(col.label)).join(',')

  // Data rows
  const rows = data.map(row =>
    cols.map(col => escapeCSVValue(String(row[col.key] ?? ''))).join(',')
  )

  return [header, ...rows].join('\n')
}

/**
 * Escape a CSV value (handle commas, quotes, newlines)
 */
function escapeCSVValue(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

/**
 * Download CSV data as a file in the browser
 */
export function downloadCSV(csvContent: string, filename: string = 'export.csv') {
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}

/**
 * Convert scan history data to CSV-ready format
 */
export function formatScanHistoryCSV(scans: Array<{
  url: string
  domain: string
  score: number
  label: string
  createdAt: string | Date
}>) {
  return toCSV(scans, [
    { key: 'url', label: 'URL' },
    { key: 'domain', label: 'Domain' },
    { key: 'score', label: 'Điểm rủi ro' },
    { key: 'label', label: 'Nhãn' },
    { key: 'createdAt', label: 'Thời gian' },
  ])
}
