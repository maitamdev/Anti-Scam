import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat, Space_Grotesk } from 'next/font/google'
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

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-title',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://maitamsite.site'),
  title: {
    default: 'ANTI-SCAM - Kiểm tra Lừa đảo Online | Chống Scam Việt Nam',
    template: '%s | ANTI-SCAM'
  },
  description: 'ANTI-SCAM - Nền tảng AI kiểm tra và cảnh báo lừa đảo online hàng đầu Việt Nam. Kiểm tra link lừa đảo, số tài khoản ngân hàng, email phishing, số điện thoại scam miễn phí. Bảo vệ bạn khỏi các chiêu trò lừa đảo trực tuyến.',
  keywords: [
    'antiscam', 'anti-scam', 'anti scam', 'chống lừa đảo', 'kiểm tra lừa đảo',
    'kiểm tra link lừa đảo', 'kiểm tra website lừa đảo', 'phishing', 'scam',
    'lừa đảo online', 'lừa đảo trực tuyến', 'cảnh báo lừa đảo', 'check scam',
    'kiểm tra số tài khoản lừa đảo', 'kiểm tra email lừa đảo', 'an toàn mạng',
    'bảo mật online', 'chống phishing', 'website giả mạo', 'link giả mạo',
    'scam vietnam', 'lừa đảo việt nam', 'kiểm tra url', 'check link'
  ],
  authors: [{ name: 'ANTI-SCAM Vietnam', url: 'https://maitamsite.site' }],
  creator: 'ANTI-SCAM Team',
  publisher: 'ANTI-SCAM Vietnam',
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'ANTI-SCAM - Kiểm tra & Cảnh báo Lừa đảo Online Việt Nam',
    description: '🛡️ Kiểm tra link lừa đảo miễn phí • 🤖 AI phân tích thông minh • 🏦 Check số tài khoản scam • 📱 Kiểm tra SĐT lừa đảo • 🚨 Cảnh báo lừa đảo mới nhất',
    url: 'https://maitamsite.site',
    siteName: 'ANTI-SCAM Vietnam',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ANTI-SCAM - Nền tảng chống lừa đảo online Việt Nam',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ANTI-SCAM - Kiểm tra Lừa đảo Online Việt Nam',
    description: '🛡️ Kiểm tra link lừa đảo • 🤖 AI phân tích • 🏦 Check tài khoản scam • 📱 Kiểm tra SĐT',
    images: ['/og-image.png'],
    creator: '@antiscam_vn',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://maitamsite.site',
    languages: {
      'vi-VN': 'https://maitamsite.site',
      'en-US': 'https://maitamsite.site',
    },
  },
  verification: {
    google: 'XQLeFbBWTvnGRd6n6xfNKdnxCv0bqEo7qQtXPXK_eas',
  },
  category: 'technology',
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
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ANTI-SCAM',
              alternateName: ['Anti Scam', 'AntiScam', 'Chống Lừa Đảo'],
              url: 'https://maitamsite.site',
              description: 'Nền tảng AI kiểm tra và cảnh báo lừa đảo online hàng đầu Việt Nam',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://maitamsite.site/scan?url={search_term_string}'
                },
                'query-input': 'required name=search_term_string'
              },
              publisher: {
                '@type': 'Organization',
                name: 'ANTI-SCAM Vietnam',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://maitamsite.site/logo.png'
                }
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'ANTI-SCAM',
              applicationCategory: 'SecurityApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'VND'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '1000'
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} ${spaceGrotesk.variable} font-sans text-white min-h-screen`} suppressHydrationWarning>
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
