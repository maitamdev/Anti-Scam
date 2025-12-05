import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'

const beVietnam = Be_Vietnam_Pro({ 
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'ANTI-SCAM - Kiểm tra & Cảnh báo Lừa đảo Mạng',
  description: 'Nền tảng AI phân tích và cảnh báo website lừa đảo, bảo vệ người dùng Việt Nam khỏi các chiêu trò lừa đảo trực tuyến.',
  keywords: ['chống lừa đảo', 'kiểm tra link', 'phishing', 'scam', 'an toàn mạng', 'bảo mật'],
  authors: [{ name: 'ANTI-SCAM Team' }],
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
      <body className={`${beVietnam.className} bg-gray-900 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
