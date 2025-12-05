import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'vietnamese'] })

export const metadata: Metadata = {
  title: 'ANTISCAM - Kiểm tra & Cảnh báo Lừa đảo Mạng',
  description: 'Nền tảng AI phân tích và cảnh báo website lừa đảo, bảo vệ người dùng Việt Nam khỏi các chiêu trò lừa đảo trực tuyến.',
  keywords: ['chống lừa đảo', 'kiểm tra link', 'phishing', 'scam', 'an toàn mạng', 'bảo mật'],
  authors: [{ name: 'ANTISCAM Team' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1f2937',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
