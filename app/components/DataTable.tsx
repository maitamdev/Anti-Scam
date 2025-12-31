'use client'

import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown, Search } from 'lucide-react'
import { useState, useMemo } from 'react'

interface Column<T> {
  key: keyof T | string
  header: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
  width?: string
}

interface Props<T> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  emptyMessage?: string
  onRowClick?: (item: T) => void
}

export default function DataTable<T extends Record<string, unknown>>({ 
  data, 
  columns, 
  searchable = false,
  searchPlaceholder = 'Tìm kiếm...',
  emptyMessage = 'Không có dữ liệu',
  onRowClick
}: Props<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const filteredAndSortedData = useMemo(() => {
    let result = [...data]

    // Filter
    if (searchQuery) {
      result = result.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    // Sort
    if (sortKey) {
      result.sort((a, b) => {
        const aVal = a[sortKey as keyof T]
        const bVal = b[sortKey as keyof T]
        
        if (aVal === bVal) return 0
        
        const comparison = aVal < bVal ? -1 : 1
        return sortDirection === 'asc' ? comparison : -comparison
      })
    }

    return result
  }, [data, searchQuery, sortKey, sortDirection])

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
      {searchable && (
        <div className="p-4 border-b border-gray-700/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700/50">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-4 py-3 text-left text-sm font-medium text-gray-400 ${column.width || ''}`}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(String(column.key))}
                      className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                      {column.header}
                      <span className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 ${sortKey === column.key && sortDirection === 'asc' ? 'text-blue-400' : 'text-gray-600'}`} />
                        <ChevronDown className={`w-3 h-3 -mt-1 ${sortKey === column.key && sortDirection === 'desc' ? 'text-blue-400' : 'text-gray-600'}`} />
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              filteredAndSortedData.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => onRowClick?.(item)}
                  className={`border-b border-gray-700/30 ${onRowClick ? 'cursor-pointer hover:bg-gray-700/30' : ''} transition-colors`}
                >
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-4 py-3 text-sm text-gray-300">
                      {column.render 
                        ? column.render(item) 
                        : String(item[column.key as keyof T] ?? '')}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
