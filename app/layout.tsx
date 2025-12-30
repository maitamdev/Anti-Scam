import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import { Providers } from './components/Providers'

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
  metadataBase: new URL('https://maitamsite.site'),
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
    url: 'https://maitamsite.site',
    siteName: 'ANTI-SCAM',
    images: [
      {
        url: 'https://maitamsite.site/1h.png',
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
    images: ['https://maitamsite.site/1h.png'],
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
      <body className={`${inter.variable} ${montserrat.variable} font-sans text-white min-h-screen`}>
        <Providers>
          {children}
        </Providers>
        
        {/* Telegram Floating Button */}
        <div className="fixed bottom-6 right-6 z-50 group">
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-700 shadow-xl">
            💬 Chat với Anti-Scam Bot
            <div className="absolute top-full right-4 border-8 border-transparent border-t-gray-800" />
          </div>
          
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#0088cc] animate-ping opacity-25" />
          
          {/* Button */}
          <a
            href="https://t.me/antiscam_vn_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-14 h-14 bg-gradient-to-br from-[#0088cc] to-[#0066aa] hover:from-[#0099dd] hover:to-[#0077bb] rounded-full shadow-lg shadow-blue-500/40 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-blue-500/60 active:scale-95"
          >
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
            </svg>
          </a>
        </div>
      </body>
    </html>
  )
}
