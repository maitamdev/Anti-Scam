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
    'cccd', 'cmnd', 'can-cuoc', 'chung-minh',
    'pin', 'cvv', 'cvc', 'expiry',
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
    'bonus', 'hoàn tiền', 'cashback',
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
  'agribank.com.vn',
  'pvcombank.com.vn',
  'kienlongbank.com.vn',
  'ncb-bank.vn',
  'pgbank.com.vn',
  'vietabank.com.vn',
  'baovibank.com.vn',
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
  'hasaki.vn',
  'concung.com',
  'mediamart.vn',
  'nguyenkim.com',
  'phongvu.vn',
  'gearvn.com',
  'hoanghamobile.com',
  'viettelstore.vn',
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
  'mic.gov.vn',
  'moj.gov.vn',
  'mps.gov.vn',
  'customs.gov.vn',
  'gdt.gov.vn',
  'baohiemxahoi.gov.vn',
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
  'threads.net',
  'x.com',
]

// Suspicious TLDs - expanded list
export const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.club', '.work', '.click',
  '.link', '.info', '.online', '.site', '.website',
  '.space', '.fun', '.icu', '.buzz', '.monster',
  '.tk', '.ml', '.ga', '.cf', '.gq', '.pw',
  '.loan', '.win', '.bid', '.trade', '.date',
  '.review', '.stream', '.download', '.racing',
  '.accountant', '.cricket', '.science', '.party',
  '.faith', '.webcam', '.kim', '.country', '.rocks',
  '.ninja', '.guru', '.life', '.live', '.today',
  '.world', '.zone', '.host', '.press', '.news',
  '.uno', '.rest', '.bar', '.pub', '.fit',
  '.li', '.to', '.cc', '.ws', '.bz', '.nu',
]

// Link shortener / Bio link services - often abused for scams
export const LINK_SHORTENERS = [
  'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly',
  'is.gd', 'buff.ly', 'adf.ly', 'shorte.st', 'bc.vc',
  'j.mp', 'v.gd', 'tr.im', 'tiny.cc', 'lnk.to',
  'rb.gy', 'cutt.ly', 's.id', 'shorturl.at', 'rebrand.ly',
  'clck.ru', 'qps.ru', 'tinu.be', 'u.to', 'x.co',
  'soo.gd', 'po.st', 'su.pr', 'cli.gs', 'budurl.com',
]

// Bio link services - commonly used for scam landing pages
export const BIO_LINK_SERVICES = [
  'linktr.ee', 'lnk.bio', 'bio.link', 'linkin.bio',
  'lnkbio.me', 'linkbio.co', 'tap.bio', 'campsite.bio',
  'beacons.ai', 'hoo.be', 'solo.to', 'carrd.co',
  'bio.fm', 'withkoji.com', 'snipfeed.co', 'stan.store',
  'allmylinks.com', 'contactinbio.com', 'lynk.id', 'msha.ke',
  'milkshake.app', 'direct.me', 'flowpage.com', 'link.space',
  'about.me', 'linktree.com', 'shorby.com', 'taplink.cc',
]

// Scam keywords in URL path - Vietnamese - expanded
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
  'hoan-tien', 'hoantien', 'cashback', 'refund',
  'tang-qua', 'tangqua', 'giveaway', 'airdrop',
  'nap-tien', 'naptien', 'topup', 'recharge',
  'mo-khoa', 'mokhoa', 'unlock', 'unblock',
  'khoi-phuc', 'khoiphuc', 'recover', 'restore',
  'bao-mat', 'baomat', 'security', 'secure',
  'canh-bao', 'canhbao', 'warning', 'alert',
  'khan-cap', 'khancap', 'urgent', 'emergency',
]

// Gambling/Casino keywords - illegal in Vietnam - expanded
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
  // More gambling sites
  'jun88', 'new88', 'hi88', 'fb88', 'w88', 'm88', 'v9bet',
  'kubet', 'oxbet', 'sbobet', 'bk8', '188bet', 'dafabet',
  'bet365', '12bet', 'fun88', 'letou', 'happyluke',
  'ae888', 'sin88', 'ta88', 'uk88', 'vn88', 'qh88',
  'debet', 'zbet', 'sodo', 'onbet', 'typhu88', 'mu88',
  // Lottery
  'xsmb', 'xsmn', 'xsmt', 'kqxs', 'xstd', 'xsvn',
  'mien-bac', 'mien-nam', 'mien-trung',
  // Card games
  'tien-len', 'tienlen', 'phom', 'sam', 'lieng', 'mau-binh',
  'ba-cay', 'bacay', 'xi-to', 'xito', 'xi-dach', 'xidach',
]

// Brand keywords that scammers often impersonate - expanded
export const BRAND_KEYWORDS = [
  // Banks
  'vietcombank', 'techcombank', 'vietinbank', 'bidv', 'mbbank',
  'tpbank', 'vpbank', 'acb', 'sacombank', 'hdbank',
  'agribank', 'ocb', 'msb', 'vib', 'shb', 'seabank',
  // E-commerce
  'shopee', 'lazada', 'tiki', 'sendo', 'amazon',
  // Tech
  'facebook', 'zalo', 'google', 'microsoft', 'apple',
  'samsung', 'tiktok', 'instagram', 'twitter', 'telegram',
  // Ride-hailing & Delivery
  'grab', 'gojek', 'be', 'baemin', 'shopeefood', 'grabfood',
  // E-wallets
  'momo', 'zalopay', 'vnpay', 'viettelpay', 'airpay', 'paypal',
  // Telco
  'viettel', 'mobifone', 'vinaphone', 'vietnamobile',
  // Airlines
  'vietjet', 'vietnamairlines', 'bamboo', 'pacific',
  // Government
  'bhxh', 'dichvucong', 'congan', 'thue', 'customs',
]

// Phishing URL patterns
export const PHISHING_PATTERNS = [
  // Typosquatting patterns
  /vietc[o0]mbank/i,
  /techc[o0]mbank/i,
  /vietinb[a4]nk/i,
  /sh[o0]pee/i,
  /l[a4]z[a4]d[a4]/i,
  /faceb[o0][o0]k/i,
  /g[o0][o0]gle/i,
  /micr[o0]s[o0]ft/i,
  /[a4]pple/i,
  // Subdomain abuse
  /vietcombank\.[^.]+\.(com|net|org|xyz|top)/i,
  /shopee\.[^.]+\.(com|net|org|xyz|top)/i,
  /facebook\.[^.]+\.(com|net|org|xyz|top)/i,
  // Fake login pages
  /login.*bank/i,
  /bank.*login/i,
  /secure.*update/i,
  /verify.*account/i,
  /account.*verify/i,
]

// Crypto scam patterns
export const CRYPTO_SCAM_PATTERNS = [
  /airdrop/i,
  /free.*bitcoin/i,
  /free.*crypto/i,
  /double.*bitcoin/i,
  /send.*receive.*double/i,
  /elon.*musk.*giveaway/i,
  /crypto.*giveaway/i,
  /nft.*free/i,
  /metamask.*connect/i,
  /wallet.*connect/i,
  /claim.*token/i,
  /presale.*token/i,
]

// Investment scam patterns
export const INVESTMENT_SCAM_PATTERNS = [
  /lợi.*nhuận.*\d+%/i,
  /profit.*\d+%/i,
  /guaranteed.*return/i,
  /cam.*kết.*lãi/i,
  /đầu.*tư.*x\d+/i,
  /invest.*x\d+/i,
  /passive.*income/i,
  /thu.*nhập.*thụ.*động/i,
  /làm.*giàu.*nhanh/i,
  /get.*rich.*quick/i,
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
