'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Loader2 } from 'lucide-react'

interface Props {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  suggestions?: string[]
  loading?: boolean
  className?: string
}

export default function SearchInput({
  placeholder = 'Tìm kiếm...',
  value = '',
  onChange,
  onSearch,
  suggestions = [],
  loading = false,
  className = ''
}: Props) {
  const [inputValue, setInputValue] = useState(value)
  const [isFocused, setIsFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onChange?.(newValue)
    setShowSuggestions(newValue.length > 0 && suggestions.length > 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(inputValue)
    setShowSuggestions(false)
  }

  const handleClear = () => {
    setInputValue('')
    onChange?.('')
    inputRef.current?.focus()
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    onChange?.(suggestion)
    onSearch?.(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className={`relative flex items-center bg-gray-800/50 border rounded-xl transition-all ${
          isFocused ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-700'
        }`}>
          <div className="pl-4">
            {loading ? (
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-gray-400" />
            )}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleChange}
            onFocus={() => {
              setIsFocused(true)
              if (inputValue.length > 0 && suggestions.length > 0) {
                setShowSuggestions(true)
              }
            }}
            onBlur={() => {
              setIsFocused(false)
              setTimeout(() => setShowSuggestions(false), 200)
            }}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-3 py-3 text-white placeholder-gray-500 focus:outline-none"
          />
          
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="pr-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-xl z-50"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center gap-3"
              >
                <Search className="w-4 h-4 text-gray-500" />
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
