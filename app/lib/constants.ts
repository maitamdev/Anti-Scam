// Risk keywords for heuristic analysis
export const RISK_KEYWORDS = {
  high: [
    'login', 'signin', 'sign-in', 'đăng nhập', 'dang-nhap',
    'password', 'mật khẩu', 'mat-khau',
    'otp', 'verify', 'xác minh', 'xac-minh',
    'account', 'tài khoản', 'tai-khoan',
    'bank', 'ngân hàng', 'ngan-hang',
    'credit', 'thẻ tín dụng',
    'update', 'cập nhật', 'cap-nhat',
    'confirm', 'xác nhận',
    'secure', 'bảo mật',
    'wallet', 'ví điện tử',
    'transfer', 'chuyển tiền', 'chuyen-tien',
  ],
  medium: [
    'free', 'miễn phí', 'mien-phi',
    'winner', 'trúng thưởng', 'trung-thuong',
    'prize', 'giải thưởng',
    'gift', 'quà tặng',
    'urgent', 'khẩn cấp',
    'limited', 'giới hạn',
    'click', 'nhấn',
    'download', 'tải xuống',
    'install', 'cài đặt',
  ],
}

// Vietnamese bank domains (whitelist)
export const BANK_DOMAINS = [
  'vietcombank.com.vn',
  'techcombank.com.vn',
  'vietinbank.vn',
  'bidv.com.vn',
  'mbbank.com.vn',
  'tpbank.vn',
  'vpbank.com.vn',
  'acb.com.vn',
  'sacombank.com.vn',
  'hdbank.com.vn',
  'ocb.com.vn',
  'msb.com.vn',
  'vib.com.vn',
  'eximbank.com.vn',
  'shb.com.vn',
  'seabank.com.vn',
  'lpbank.com.vn',
  'namabank.com.vn',
  'abbank.vn',
  'baovietbank.com.vn',
]

// E-commerce domains (whitelist)
export const ECOMMERCE_DOMAINS = [
  'shopee.vn',
  'lazada.vn',
  'tiki.vn',
  'sendo.vn',
  'thegioididong.com',
  'dienmayxanh.com',
  'fptshop.com.vn',
  'cellphones.com.vn',
  'bachhoaxanh.com',
]

// Government domains (whitelist)
export const GOV_DOMAINS = [
  'gov.vn',
  'chinhphu.vn',
  'dangcongsan.vn',
  'quochoi.vn',
  'mof.gov.vn',
  'moit.gov.vn',
  'moet.gov.vn',
  'moh.gov.vn',
]

// Social media domains (whitelist)
export const SOCIAL_DOMAINS = [
  'facebook.com',
  'zalo.me',
  'tiktok.com',
  'youtube.com',
  'instagram.com',
  'twitter.com',
  'linkedin.com',
]

// Suspicious TLDs
export const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.club', '.work', '.click',
  '.link', '.info', '.online', '.site', '.website',
  '.space', '.fun', '.icu', '.buzz', '.monster',
  '.tk', '.ml', '.ga', '.cf', '.gq', '.pw',
]

// Link shortener / Bio link services - often abused for scams
export const LINK_SHORTENERS = [
  'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly',
  'is.gd', 'buff.ly', 'adf.ly', 'shorte.st', 'bc.vc',
  'j.mp', 'v.gd', 'tr.im', 'tiny.cc', 'lnk.to',
  'rb.gy', 'cutt.ly', 's.id', 'shorturl.at', 'rebrand.ly',
]

// Bio link services - commonly used for scam landing pages
export const BIO_LINK_SERVICES = [
  'linktr.ee', 'lnk.bio', 'bio.link', 'linkin.bio',
  'lnkbio.me', 'linkbio.co', 'tap.bio', 'campsite.bio',
  'beacons.ai', 'hoo.be', 'solo.to', 'carrd.co',
  'bio.fm', 'withkoji.com', 'snipfeed.co', 'stan.store',
  'allmylinks.com', 'contactinbio.com', 'lynk.id', 'msha.ke',
  'milkshake.app', 'direct.me', 'flowpage.com', 'link.space',
]

// Scam keywords in URL path - Vietnamese
export const SCAM_URL_KEYWORDS = [
  'trung-thuong', 'trungthuong', 'nhan-qua', 'nhanqua',
  'khuyen-mai', 'khuyenmai', 'giam-gia', 'giamgia',
  'mien-phi', 'mienphi', 'free-gift', 'freegift',
  'dau-tu', 'dautu', 'kiem-tien', 'kiemtien',
  'lam-giau', 'lamgiau', 'x100', 'x1000', 'profit',
  'vay-tien', 'vaytien', 'vay-nhanh', 'vaynhanh',
  'ho-tro', 'hotro', 'cskh', 'support', 'verify',
  'xac-minh', 'xacminh', 'cap-nhat', 'capnhat',
  'dang-nhap', 'dangnhap', 'login', 'signin',
  'nhan-tien', 'nhantien', 'rut-tien', 'ruttien',
  'chuyen-khoan', 'chuyenkhoan', 'the-cao', 'thecao',
]

// Gambling/Casino keywords - illegal in Vietnam
export const GAMBLING_KEYWORDS = [
  'vip', 'bet', 'casino', 'slot', 'poker', 'baccarat', 'blackjack',
  'xoso', 'xo-so', 'lo-de', 'lode', 'soi-cau', 'soicau',
  'game-bai', 'gamebai', 'danh-bai', 'danhbai',
  'ca-cuoc', 'cacuoc', 'cuoc', 'dat-cuoc', 'datcuoc',
  'nha-cai', 'nhacai', 'bong-da', 'bongda', 'the-thao', 'thethao',
  'tai-xiu', 'taixiu', 'xoc-dia', 'xocdia', 'bau-cua', 'baucua',
  'no-hu', 'nohu', 'quay-hu', 'quayhu', 'jackpot',
  'win', 'lucky', 'bonus', 'spin', 'roll',
  '68', '88', '99', '789', '888', '666', '777', '168',
  'sv388', 'sunwin', 'iwin', 'go88', 'rik', 'b52',
  'may88', 'hit', 'club', 'fun', 'live',
  // Casino-specific patterns
  'inn', 'palace', 'crown', 'royal', 'diamond', 'gold', 'king', 'queen',
  'vegas', 'monte', 'atlantic', 'roulette', 'dice', 'chip',
]

// Brand keywords that scammers often impersonate
export const BRAND_KEYWORDS = [
  'vietcombank', 'techcombank', 'vietinbank', 'bidv', 'mbbank',
  'tpbank', 'vpbank', 'acb', 'sacombank', 'hdbank',
  'shopee', 'lazada', 'tiki', 'sendo',
  'facebook', 'zalo', 'google', 'microsoft',
  'apple', 'samsung', 'grab', 'gojek', 'be',
  'momo', 'zalopay', 'vnpay', 'viettelpay',
]

// Labels
export const LABELS = {
  SAFE: 'SAFE',
  CAUTION: 'CAUTION', 
  DANGEROUS: 'DANGEROUS',
} as const

export type Label = typeof LABELS[keyof typeof LABELS]

// AI Labels for training
export const AI_LABELS = [
  'SAFE',
  'PHISHING',
  'SCAM',
  'SPAM',
  'MALWARE',
] as const

export type AILabel = typeof AI_LABELS[number]
