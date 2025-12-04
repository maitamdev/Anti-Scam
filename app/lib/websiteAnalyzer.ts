/**
 * Advanced Website Analyzer
 * Phân tích chi tiết website: lĩnh vực, công nghệ, độ tin cậy
 */

export interface WebsiteInfo {
  // Basic info
  title: string
  description: string
  favicon: string | null
  language: string

  // Category & Industry
  category: string
  industry: string
  subCategory: string

  // Trust signals
  hasSSL: boolean
  sslIssuer: string | null
  domainAge: string | null
  registrar: string | null

  // Technology
  technologies: string[]
  framework: string | null
  cms: string | null
  hosting: string | null

  // Content analysis
  hasLoginForm: boolean
  hasPaymentForm: boolean
  hasContactInfo: boolean
  hasSocialLinks: boolean
  hasPrivacyPolicy: boolean
  hasTermsOfService: boolean

  // Risk indicators
  riskFactors: string[]
  trustFactors: string[]

  // SEO & Performance
  hasMetaTags: boolean
  hasSitemap: boolean
  mobileOptimized: boolean
}

// Industry detection patterns
const INDUSTRY_PATTERNS: Record<
  string,
  { keywords: string[]; category: string; subCategory: string }
> = {
  banking: {
    keywords: [
      'ngân hàng',
      'bank',
      'tài khoản',
      'chuyển tiền',
      'gửi tiết kiệm',
      'vay',
      'thẻ tín dụng',
      'internet banking',
      'mobile banking',
    ],
    category: 'Tài chính',
    subCategory: 'Ngân hàng',
  },
  ewallet: {
    keywords: [
      'ví điện tử',
      'e-wallet',
      'momo',
      'zalopay',
      'vnpay',
      'thanh toán',
      'nạp tiền',
      'rút tiền',
    ],
    category: 'Tài chính',
    subCategory: 'Ví điện tử',
  },
  ecommerce: {
    keywords: [
      'mua sắm',
      'shopping',
      'giỏ hàng',
      'đặt hàng',
      'freeship',
      'khuyến mãi',
      'sale',
      'sản phẩm',
      'giá',
    ],
    category: 'Thương mại điện tử',
    subCategory: 'Mua sắm online',
  },
  gambling: {
    keywords: [
      'casino',
      'slot',
      'poker',
      'baccarat',
      'lô đề',
      'xổ số',
      'cá cược',
      'cá độ',
      'nổ hũ',
      'game bài',
      'tài xỉu',
    ],
    category: 'Cờ bạc',
    subCategory: 'Casino/Lô đề',
  },
  investment: {
    keywords: [
      'đầu tư',
      'forex',
      'crypto',
      'bitcoin',
      'chứng khoán',
      'trading',
      'lợi nhuận',
      'lãi suất',
    ],
    category: 'Đầu tư',
    subCategory: 'Tài chính/Crypto',
  },
  news: {
    keywords: [
      'tin tức',
      'news',
      'báo',
      'thời sự',
      'bài viết',
      'phóng sự',
      'chuyên mục',
    ],
    category: 'Tin tức',
    subCategory: 'Báo chí',
  },
  education: {
    keywords: [
      'giáo dục',
      'học',
      'trường',
      'đại học',
      'khóa học',
      'đào tạo',
      'sinh viên',
      'giảng viên',
    ],
    category: 'Giáo dục',
    subCategory: 'Đào tạo',
  },
  government: {
    keywords: [
      'chính phủ',
      'bộ',
      'sở',
      'ubnd',
      'công an',
      'thuế',
      'hành chính',
      'dịch vụ công',
    ],
    category: 'Chính phủ',
    subCategory: 'Dịch vụ công',
  },
  healthcare: {
    keywords: [
      'bệnh viện',
      'y tế',
      'sức khỏe',
      'bác sĩ',
      'thuốc',
      'khám bệnh',
      'điều trị',
    ],
    category: 'Y tế',
    subCategory: 'Chăm sóc sức khỏe',
  },
  job: {
    keywords: [
      'tuyển dụng',
      'việc làm',
      'job',
      'career',
      'ứng tuyển',
      'cv',
      'nhân sự',
      'lương',
    ],
    category: 'Việc làm',
    subCategory: 'Tuyển dụng',
  },
  social: {
    keywords: [
      'mạng xã hội',
      'social',
      'bạn bè',
      'kết nối',
      'chia sẻ',
      'follow',
      'like',
    ],
    category: 'Mạng xã hội',
    subCategory: 'Social Media',
  },
  travel: {
    keywords: [
      'du lịch',
      'travel',
      'khách sạn',
      'vé máy bay',
      'tour',
      'booking',
      'resort',
    ],
    category: 'Du lịch',
    subCategory: 'Đặt phòng/Tour',
  },
  realestate: {
    keywords: [
      'bất động sản',
      'nhà đất',
      'căn hộ',
      'chung cư',
      'mua bán nhà',
      'cho thuê',
    ],
    category: 'Bất động sản',
    subCategory: 'Mua bán/Cho thuê',
  },
}

// Technology detection
const TECH_PATTERNS: Record<string, RegExp> = {
  React: /react|__NEXT_DATA__|_next/i,
  'Next.js': /__NEXT_DATA__|_next\/static/i,
  Vue: /vue|__VUE__|v-app/i,
  Angular: /ng-app|angular/i,
  WordPress: /wp-content|wordpress/i,
  Shopify: /shopify|cdn\.shopify/i,
  Laravel: /laravel|csrf-token/i,
  Django: /csrfmiddlewaretoken|django/i,
  Bootstrap: /bootstrap/i,
  Tailwind: /tailwind/i,
  jQuery: /jquery/i,
  'Google Analytics': /google-analytics|gtag/i,
  'Facebook Pixel': /fbevents|facebook.*pixel/i,
  Cloudflare: /cloudflare/i,
  'Google Fonts': /fonts\.googleapis/i,
  reCAPTCHA: /recaptcha/i,
}

// Analyze website content
export async function analyzeWebsite(url: string): Promise<WebsiteInfo | null> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0',
        Accept: 'text/html',
      },
    })
    clearTimeout(timeout)

    if (!res.ok) return null

    const html = await res.text()
    const htmlLower = html.toLowerCase()

    // Extract basic info
    const title =
      html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || ''
    const description =
      html.match(
        /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i
      )?.[1] || ''
    const favicon =
      html.match(/<link[^>]*rel=["']icon["'][^>]*href=["']([^"']*)["']/i)?.[1] ||
      null
    const language =
      html.match(/<html[^>]*lang=["']([^"']*)["']/i)?.[1] || 'vi'

    // Detect industry
    let detectedIndustry = {
      category: 'Khác',
      industry: 'Chưa xác định',
      subCategory: 'Chưa phân loại',
    }
    const contentText = `${title} ${description} ${html
      .replace(/<[^>]+>/g, ' ')
      .slice(0, 10000)}`.toLowerCase()

    for (const [key, pattern] of Object.entries(INDUSTRY_PATTERNS)) {
      const matchCount = pattern.keywords.filter((k) =>
        contentText.includes(k)
      ).length
      if (matchCount >= 2) {
        detectedIndustry = {
          category: pattern.category,
          industry: key,
          subCategory: pattern.subCategory,
        }
        break
      }
    }

    // Detect technologies
    const technologies: string[] = []
    let framework: string | null = null
    let cms: string | null = null

    for (const [tech, pattern] of Object.entries(TECH_PATTERNS)) {
      if (pattern.test(html)) {
        technologies.push(tech)
        if (['React', 'Vue', 'Angular', 'Next.js'].includes(tech)) {
          framework = tech
        }
        if (['WordPress', 'Shopify'].includes(tech)) {
          cms = tech
        }
      }
    }

    // Content analysis
    const hasLoginForm = /<input[^>]*type=["']password["']/i.test(html)
    const hasPaymentForm = /credit.?card|cvv|thẻ.?tín.?dụng|visa|mastercard/i.test(html)
    const hasContactInfo = /contact|liên hệ|hotline|điện thoại|email/i.test(htmlLower)
    const hasSocialLinks = /facebook\.com|twitter\.com|instagram\.com|youtube\.com|zalo/i.test(html)
    const hasPrivacyPolicy = /privacy|chính sách bảo mật|điều khoản riêng tư/i.test(htmlLower)
    const hasTermsOfService = /terms|điều khoản|quy định/i.test(htmlLower)
    const hasMetaTags = /<meta[^>]*property=["']og:/i.test(html)
    const hasSitemap = /sitemap/i.test(html)
    const mobileOptimized = /viewport/i.test(html)

    // Risk factors
    const riskFactors: string[] = []
    const trustFactors: string[] = []

    // Check SSL
    const hasSSL = url.startsWith('https://')
    if (!hasSSL) riskFactors.push('Không có HTTPS')
    else trustFactors.push('Có chứng chỉ SSL')

    // Check for suspicious patterns
    if (hasLoginForm && !hasSSL) riskFactors.push('Form đăng nhập không bảo mật')
    if (hasPaymentForm && !hasSSL) riskFactors.push('Form thanh toán không bảo mật')
    if (detectedIndustry.industry === 'gambling') riskFactors.push('Website cờ bạc')
    if (!hasContactInfo) riskFactors.push('Không có thông tin liên hệ')
    if (!hasPrivacyPolicy) riskFactors.push('Không có chính sách bảo mật')

    // Trust factors
    if (hasContactInfo) trustFactors.push('Có thông tin liên hệ')
    if (hasSocialLinks) trustFactors.push('Có liên kết mạng xã hội')
    if (hasPrivacyPolicy) trustFactors.push('Có chính sách bảo mật')
    if (hasTermsOfService) trustFactors.push('Có điều khoản sử dụng')
    if (mobileOptimized) trustFactors.push('Tối ưu cho mobile')

    return {
      title,
      description,
      favicon,
      language,
      category: detectedIndustry.category,
      industry: detectedIndustry.industry,
      subCategory: detectedIndustry.subCategory,
      hasSSL,
      sslIssuer: null, // Would need additional API
      domainAge: null, // Would need WHOIS API
      registrar: null,
      technologies,
      framework,
      cms,
      hosting: null,
      hasLoginForm,
      hasPaymentForm,
      hasContactInfo,
      hasSocialLinks,
      hasPrivacyPolicy,
      hasTermsOfService,
      riskFactors,
      trustFactors,
      hasMetaTags,
      hasSitemap,
      mobileOptimized,
    }
  } catch (error) {
    console.error('[WebsiteAnalyzer] Error:', error)
    return null
  }
}

// Quick category detection from domain
export function detectCategoryFromDomain(domain: string): {
  category: string
  confidence: number
} {
  const d = domain.toLowerCase()

  // Government
  if (d.endsWith('.gov.vn') || d.endsWith('.edu.vn')) {
    return { category: 'Chính phủ/Giáo dục', confidence: 0.95 }
  }

  // Banks
  if (
    d.includes('bank') ||
    d.includes('vietcom') ||
    d.includes('techcom') ||
    d.includes('bidv') ||
    d.includes('agri')
  ) {
    return { category: 'Ngân hàng', confidence: 0.8 }
  }

  // E-commerce
  if (
    d.includes('shop') ||
    d.includes('store') ||
    d.includes('mart') ||
    d.includes('buy')
  ) {
    return { category: 'Thương mại điện tử', confidence: 0.7 }
  }

  // Gambling
  if (
    /\d{2,}(vip|club|win|bet|game)/.test(d) ||
    /(casino|slot|poker|bet|game)\d{2,}/.test(d)
  ) {
    return { category: 'Cờ bạc', confidence: 0.9 }
  }

  // News
  if (d.includes('news') || d.includes('bao') || d.includes('tin')) {
    return { category: 'Tin tức', confidence: 0.6 }
  }

  return { category: 'Chưa xác định', confidence: 0.3 }
}
