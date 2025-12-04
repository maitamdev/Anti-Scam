'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Loader2, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react'

interface ImageScanResult {
  score: number
  label: 'SAFE' | 'CAUTION' | 'DANGEROUS'
  category: string
  reasons: string[]
  confidence: number
  extractedText: string
}

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ImageScanResult | null>(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn file hình ảnh')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Hình ảnh quá lớn (tối đa 10MB)')
      return
    }

    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = reader.result as string
      setImage(base64)
      setResult(null)
      setError('')
      
      // Auto analyze
      await analyzeImage(base64)
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = async (imageData: string) => {
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/scan-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData }),
      })

      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Lỗi phân tích')
      setResult(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra')
    } finally {
      setIsLoading(false)
    }
  }

  const clearAll = () => {
    setImage(null)
    setResult(null)
    setError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const getScoreColor = (score: number) => {
    if (score <= 30) return 'text-green-400'
    if (score <= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getLabelIcon = (label: string) => {
    if (label === 'SAFE') return <CheckCircle className="w-6 h-6 text-green-400" />
    if (label === 'CAUTION') return <AlertTriangle className="w-6 h-6 text-yellow-400" />
    return <ShieldAlert className="w-6 h-6 text-red-400" />
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Upload Area */}
      {!image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 mb-2">Click hoặc kéo thả ảnh vào đây</p>
          <p className="text-gray-500 text-sm">PNG, JPG, GIF (tối đa 10MB)</p>
          <p className="text-blue-400 text-sm mt-2">AI sẽ tự động phân tích hình ảnh</p>
        </motion.div>
      )}

      {/* Image Preview + Loading */}
      {image && !result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
          <div className="relative rounded-xl overflow-hidden bg-gray-800">
            <img src={image} alt="Preview" className="w-full max-h-64 object-contain" />
            {!isLoading && (
              <button
                onClick={clearAll}
                className="absolute top-2 right-2 p-2 bg-gray-900/80 rounded-full hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {isLoading && (
            <div className="mt-4 flex items-center justify-center gap-3 text-blue-400">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>AI đang phân tích hình ảnh...</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Error */}
      {error && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center mt-4">
          {error}
        </motion.p>
      )}

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          {/* Image thumbnail */}
          {image && (
            <div className="relative rounded-xl overflow-hidden bg-gray-800 mb-4">
              <img src={image} alt="Analyzed" className="w-full max-h-48 object-contain" />
              <button
                onClick={clearAll}
                className="absolute top-2 right-2 p-2 bg-gray-900/80 rounded-full hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Result Card */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getLabelIcon(result.label)}
                <div>
                  <h3 className="font-semibold">Kết quả phân tích</h3>
                  <p className="text-sm text-gray-400">
                    {result.label === 'SAFE' ? 'Có vẻ an toàn' :
                     result.label === 'CAUTION' ? 'Cần thận trọng' :
                     'Phát hiện dấu hiệu lừa đảo!'}
                  </p>
                </div>
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}/100
              </div>
            </div>

            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.score}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full ${
                  result.score <= 30 ? 'bg-green-500' :
                  result.score <= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
              />
            </div>

            <div className="mb-4 p-3 bg-gray-700/50 rounded-lg">
              <span className="text-gray-400 text-sm">Phân loại: </span>
              <span className="font-medium capitalize">{result.category}</span>
            </div>

            {result.reasons.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Phát hiện:</h4>
                <ul className="space-y-1">
                  {result.reasons.map((reason, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-gray-500">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.extractedText && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Văn bản phát hiện:</h4>
                <p className="text-sm text-gray-300 bg-gray-700/50 p-3 rounded-lg">
                  {result.extractedText}
                </p>
              </div>
            )}

            <div className="text-sm text-gray-500 mb-4">
              Độ tin cậy: {Math.round(result.confidence * 100)}%
            </div>

            <button
              onClick={clearAll}
              className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
            >
              Phân tích ảnh khác
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
