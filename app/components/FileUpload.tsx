'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react'

interface Props {
  accept?: string
  maxSize?: number // in MB
  onUpload: (file: File) => void | Promise<void>
  label?: string
  description?: string
}

export default function FileUpload({ 
  accept = '*/*', 
  maxSize = 10,
  onUpload,
  label = 'Tải lên tệp',
  description = 'Kéo thả hoặc click để chọn tệp'
}: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFile(droppedFile)
    }
  }

  const handleFile = async (selectedFile: File) => {
    setError(null)
    
    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`Tệp quá lớn. Tối đa ${maxSize}MB`)
      return
    }

    setFile(selectedFile)
    setUploading(true)
    
    try {
      await onUpload(selectedFile)
    } catch (err) {
      setError('Có lỗi xảy ra khi tải lên')
    } finally {
      setUploading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFile(selectedFile)
    }
  }

  const removeFile = () => {
    setFile(null)
    setError(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              isDragging 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/30'
            }`}
          >
            <motion.div
              animate={{ y: isDragging ? -5 : 0 }}
              className="flex flex-col items-center"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                isDragging ? 'bg-blue-500/20' : 'bg-gray-800'
              }`}>
                <Upload className={`w-7 h-7 ${isDragging ? 'text-blue-400' : 'text-gray-400'}`} />
              </div>
              <p className="text-white font-medium mb-1">{label}</p>
              <p className="text-gray-500 text-sm">{description}</p>
              <p className="text-gray-600 text-xs mt-2">Tối đa {maxSize}MB</p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="file"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <File className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{file.name}</p>
                <p className="text-gray-500 text-sm">{formatFileSize(file.size)}</p>
              </div>
              {uploading ? (
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <button
                    onClick={removeFile}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2 text-red-400 text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.div>
      )}
    </div>
  )
}
