import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
})

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://anti-scam-kappa.vercel.app'),
  title: 'ANTI-SCAM - Kiểm tra & Cảnh báo Lừa đảo Mạng',
  description: 'Nền tảng AI phân tích và cảnh báo website lừa đảo, bảo vệ người dùng Việt Nam khỏi các chiêu trò lừa đảo trực tuyến. Kiểm tra link nghi ngờ, học cách nhận biết lừa đảo ngay.',
  keywords: ['chống lừa đảo', 'kiểm tra link', 'phishing', 'scam', 'an toàn mạng', 'bảo mật', 'lừa đảo online', 'cảnh báo lừa đảo'],
  authors: [{ name: 'ANTI-SCAM Team' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'ANTI-SCAM - Bảo Vệ Bạn Khỏi Lừa Đảo Online',
    description: '🛡️ Kiểm tra link nghi ngờ • 🤖 AI phân tích thông minh • 📚 5000+ câu hỏi quiz • 🚨 Cảnh báo lừa đảo mới nhất',
    url: 'https://anti-scam-kappa.vercel.app',
    siteName: 'ANTI-SCAM',
    images: [
      {
        url: '/hero-shield.jpg',
        width: 1200,
        height: 630,
        alt: 'ANTI-SCAM - Nền tảng chống lừa đảo online',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ANTI-SCAM - Bảo Vệ Bạn Khỏi Lừa Đảo Online',
    description: '🛡️ Kiểm tra link • 🤖 AI phân tích • 📚 Quiz nhận biết lừa đảo',
    images: ['/hero-shield.jpg'],
  },
  robots: {
    index: true,
    follow: true,
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
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined') {
              const originalWarn = console.warn;
              console.warn = (...args) => {
                const msg = args[0]?.toString() || '';
                if (msg.includes('Download the React DevTools') || 
                    msg.includes('Extra attributes from the server') ||
                    msg.includes('bis_register') ||
                    msg.includes('__processed_')) return;
                originalWarn.apply(console, args);
              };
            }
          `
        }} />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans bg-gray-900 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
