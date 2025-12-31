'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { QrCode, Upload, Camera, AlertTriangle, CheckCircle, XCircle, ExternalLink, ArrowLeft, Shield, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useTranslation } from '../../lib/i18n/LanguageContext'
import jsQR from 'jsqr'

interface ScanResult {
  url: string
  isUrl: boolean
  riskLevel: 'safe' | 'caution' | 'danger' | 'unknown'
  message: string
}

export default function QRScannerPage() {
  const { language } = useTranslation()
  const [result, setResult] = useState<ScanResult | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processImage = async (file: File) => {
    setIsScanning(true)
    setError('')
    setResult(null)

    try {
      const img = new Image()
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      img.onload = async () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
        if (!imageData) {
          setError(language === 'vi' ? 'Không thể đọc ảnh' : 'Cannot read image')
          setIsScanning(false)
          return
        }

        const code = jsQR(imageData.data, imageData.width, imageData.height)
        
        if (code) {
          const decodedData = code.data
          const isUrl = /^https?:\/\//i.test(decodedData) || /^www\./i.test(decodedData)
          
          if (isUrl) {
            // Check URL với API
            try {
              const res = await fetch('/api/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: decodedData.startsWith('http') ? decodedData : `https://${decodedData}` })
              })
              const data = await res.json()
              
              if (data.success) {
                const riskLevel = data.data.label === 'SAFE' ? 'safe' : 
                                  data.data.label === 'CAUTION' ? 'caution' : 'danger'
                setResult({
                  url: decodedData,
                  isUrl: true,
                  riskLevel,
                  message: data.data.label === 'SAFE' 
                    ? (language === 'vi' ? 'URL an toàn' : 'Safe URL')
                    : data.data.label === 'CAUTION'
                    ? (language === 'vi' ? 'URL đáng ngờ - Cẩn thận!' : 'Suspicious URL - Be careful!')
                    : (language === 'vi' ? 'URL nguy hiểm - Không nên truy cập!' : 'Dangerous URL - Do not visit!')
                })
              } else {
                setResult({
                  url: decodedData,
                  isUrl: true,
                  riskLevel: 'unknown',
                  message: language === 'vi' ? 'Không thể kiểm tra URL' : 'Cannot check URL'
                })
              }
            } catch {
              setResult({
                url: decodedData,
                isUrl: true,
                riskLevel: 'unknown',
                message: language === 'vi' ? 'Lỗi kết nối' : 'Connection error'
              })
            }
          } else {
            setResult({
              url: decodedData,
              isUrl: false,
              riskLevel: 'unknown',
              message: language === 'vi' ? 'QR chứa text, không phải URL' : 'QR contains text, not URL'
            })
          }
        } else {
          setError(language === 'vi' ? 'Không tìm thấy mã QR trong ảnh' : 'No QR code found in image')
        }
        setIsScanning(false)
      }

      img.onerror = () => {
        setError(language === 'vi' ? 'Không thể đọc file ảnh' : 'Cannot read image file')
        setIsScanning(false)
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        img.src = e.target?.result as string
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setError(language === 'vi' ? 'Có lỗi xảy ra' : 'An error occurred')
      setIsScanning(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processImage(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      processImage(file)
    }
  }

  const getRiskConfig = (level: string) => {
    switch (level) {
      case 'safe':
        return { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' }
      case 'caution':
        return { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' }
      case 'danger':
        return { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' }
      default:
        return { icon: Shield, color: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/30' }
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link href="/scan" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {language === 'vi' ? 'Quay lại' : 'Back'}
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-4">
              <QrCode className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'vi' ? 'Quét mã QR' : 'QR Code Scanner'}
            </h1>
            <p className="text-gray-400">
              {language === 'vi' 
                ? 'Upload ảnh mã QR để kiểm tra URL trước khi truy cập'
                : 'Upload QR code image to check URL before visiting'}
            </p>
          </motion.div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
              isScanning ? 'border-purple-500/50 bg-purple-500/10' : 'border-gray-700 hover:border-gray-600'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {previewUrl && (
              <div className="mb-4">
                <img src={previewUrl} alt="QR Preview" className="max-h-48 mx-auto rounded-lg" />
              </div>
            )}
            
            {isScanning ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
                <p className="text-gray-400">{language === 'vi' ? 'Đang quét...' : 'Scanning...'}</p>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-300 mb-2">
                  {language === 'vi' ? 'Kéo thả ảnh QR vào đây' : 'Drag & drop QR image here'}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {language === 'vi' ? 'hoặc' : 'or'}
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-medium transition-colors"
                >
                  {language === 'vi' ? 'Chọn ảnh' : 'Select Image'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
            )}
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-6 rounded-xl border ${getRiskConfig(result.riskLevel).bg} ${getRiskConfig(result.riskLevel).border}`}
            >
              <div className="flex items-start gap-4">
                {(() => {
                  const config = getRiskConfig(result.riskLevel)
                  const Icon = config.icon
                  return <Icon className={`w-8 h-8 ${config.color} flex-shrink-0`} />
                })()}
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold mb-2 ${getRiskConfig(result.riskLevel).color}`}>
                    {result.message}
                  </p>
                  <div className="bg-black/20 rounded-lg p-3 mb-3">
                    <p className="text-gray-300 text-sm break-all font-mono">{result.url}</p>
                  </div>
                  {result.isUrl && result.riskLevel === 'safe' && (
                    <a
                      href={result.url.startsWith('http') ? result.url : `https://${result.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {language === 'vi' ? 'Mở link (tab mới)' : 'Open link (new tab)'}
                    </a>
                  )}
                  {result.riskLevel === 'danger' && (
                    <p className="text-red-400 text-sm mt-2">
                      ⚠️ {language === 'vi' ? 'KHÔNG nên truy cập link này!' : 'DO NOT visit this link!'}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4"
          >
            <h3 className="font-semibold text-blue-400 mb-2">
              {language === 'vi' ? '💡 Mẹo an toàn' : '💡 Safety Tips'}
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• {language === 'vi' ? 'Luôn kiểm tra QR trước khi quét bằng điện thoại' : 'Always check QR before scanning with phone'}</li>
              <li>• {language === 'vi' ? 'QR giả có thể dán đè lên QR thật ở nơi công cộng' : 'Fake QR can be pasted over real QR in public places'}</li>
              <li>• {language === 'vi' ? 'Không quét QR từ nguồn không rõ ràng' : 'Do not scan QR from unknown sources'}</li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
