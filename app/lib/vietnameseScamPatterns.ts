/**
 * Vietnamese Scam Patterns Database
 * Comprehensive patterns for detecting Vietnamese-specific scams
 */

// ============================================================================
// GAMBLING / CASINO PATTERNS (Cờ Bạc)
// ============================================================================

export const VIETNAMESE_GAMBLING_PATTERNS = {
    // Nhà cái online nổi tiếng
    casinoSites: [
        'jun88', 'new88', 'hi88', 'fb88', 'w88', 'm88', 'v9bet',
        'kubet', 'oxbet', 'sbobet', 'bk8', '188bet', 'fun88', 'dafabet',
        'ae888', 'sin88', 'ta88', 'uk88', 'vn88', 'qh88',
        'debet', 'zbet', 'sodo', 'onbet', 'typhu88', 'mu88',
        'shbet', 'mb66', '789bet', 'f8bet', '8xbet', 'sv388',
    ],

    // Game bài đổi thưởng
    cardGames: [
        'sunwin', 'iwin', 'go88', 'rik', 'rikvip', 'b52', 'hit', 'yo88',
        'twin', '789club', '888b', 'may88', 'nohu', 'hitclub',
        'win79', 'win88', 'win99', 'vip88', 'vip99',
    ],

    // Từ khóa cờ bạc tiếng Việt
    vietnameseTerms: [
        'nổ hũ', 'quay hũ', 'slot game', 'tài xỉu', 'xóc đĩa',
        'baccarat', 'poker', 'blackjack', 'roulette',
        'cá cược', 'đặt cược', 'cá độ', 'nhà cái', 'kèo bóng',
        'lô đề', 'xổ số', 'soi cầu', 'dự đoán', 'bắn cá',
        'game bài', 'đánh bài', 'tiến lên', 'phỏm', 'liêng',
        'mậu binh', 'ba cây', 'xì tố', 'xì dách',
    ],

    // Regex patterns
    patterns: [
        /\d{2,3}(vip|club|win|bet|game|slot|casino)/i,
        /(vip|club|win|bet|game|slot|casino)\d{2,3}/i,
        /(casino|inn|palace|crown|royal|diamond|gold|king|queen)(vip|win|bet|88|game|fun|live)/i,
        /x(ổ|o).?s(ố|o)/i,
        /l(ô|o).?đ(ề|e)/i,
        /n(ổ|o).?h(ũ|u)/i,
        /t(à|a)i.?x(ỉ|i)u/i,
        /x(ó|o)c.?đ(ĩ|i)a/i,
        /c(á|a).?c(ư|u)(ớ|o)c/i,
        /nh(à|a).?c(á|a)i/i,
    ],

    // Lucky numbers commonly used in gambling domains
    luckyNumbers: ['68', '88', '99', '168', '188', '288', '388', '588', '666', '777', '888', '999'],
}

// ============================================================================
// PHISHING PATTERNS (Giả Mạo)
// ============================================================================

export const VIETNAMESE_PHISHING_PATTERNS = {
    // Giả mạo ngân hàng
    bankPhishing: [
        // Typosquatting
        /vietc[o0]mbank(?!\.com\.vn)/i,
        /techc[o0]mbank(?!\.com\.vn)/i,
        /vietinb[a4]nk(?!\.vn)/i,
        /mb.?bank(?!\.com\.vn)/i,
        /tpb[a4]nk(?!\.vn)/i,
        /vpb[a4]nk(?!\.com\.vn)/i,
        /[a4]cb(?!\.com\.vn)/i,
        /bidv(?!\.com\.vn)/i,
        /[a4]grib[a4]nk(?!\.com\.vn)/i,

        // Subdomain abuse
        /(vietcombank|techcombank|mbbank|tpbank|vpbank|acb|bidv|agribank)\.[^.]+\.(com|net|xyz|top|online|site)/i,

        // Fake verification/login pages
        /(vietcombank|techcombank|mbbank|tpbank).*(verify|login|secure|update|confirm)/i,
    ],

    // Giả mạo TMĐT (E-commerce)
    ecommercePhishing: [
        /sh[o0]pee(?!\.vn)/i,
        /l[a4]z[a4]d[a4](?!\.vn)/i,
        /tiki(?!\.vn)/i,
        /send[o0](?!\.vn)/i,
        /(shopee|lazada|tiki|sendo)\.[^.]+\.(com|net|xyz|top)/i,
    ],

    // Giả mạo ví điện tử (E-wallets)
    ewalletPhishing: [
        /m[o0]m[o0](?!\.vn)/i,
        /zal[o0]pay(?!\.vn)/i,
        /vnpay(?!\.vn)/i,
        /sh[o0]peepay(?!\.vn)/i,
        /(momo|zalopay|vnpay|shopeepay)\.[^.]+\.(com|net|xyz)/i,
    ],

    // Giả mạo chính phủ/dịch vụ công
    governmentPhishing: [
        /gov\.vn\.[^.]+/i,
        /chinhphu\.[^.]+\.(?!vn)/i,
        /congan\.[^.]+\.(?!gov\.vn)/i,
        /thue\.[^.]+\.(?!gov\.vn)/i,
        /dichvucong\.[^.]+\.(?!gov\.vn)/i,
    ],

    // URL patterns đáng ngờ
    suspiciousPatterns: [
        /login.*(bank|ngan.?hang)/i,
        /bank.*(verify|xac.?minh)/i,
        /update.*(account|tai.?khoan)/i,
        /secure.*(payment|thanh.?toan)/i,
        /(dang|đăng).?nhap.*(ngan|ngân).?hang/i,
        /(cap|cập).?nhat.*(tai|tài).?khoan/i,
        /(xac|xác).?minh.*(the|thẻ|tai.?khoan)/i,
        /confirm.*(otp|password|mat.?khau)/i,
    ],
}

// ============================================================================
// INVESTMENT SCAMS (Lừa Đảo Đầu Tư)
// ============================================================================

export const VIETNAMESE_INVESTMENT_SCAMS = {
    // Keywords lợi nhuận phi thực tế
    unrealisticReturns: [
        'lãi suất 30%', 'lãi suất 50%', 'lợi nhuận 100%',
        'sinh lời 200%', 'x100', 'x1000', 'x10000',
        'tăng gấp đôi', 'tăng gấp ba', 'nhân đôi tài sản',
        'lãi 5%/ngày', 'lãi 10%/tuần', 'lãi 50%/tháng',
    ],

    // Cam kết không rủi ro
    noRiskClaims: [
        'cam kết lãi', 'bảo toàn vốn', 'không rủi ro',
        'guaranteed profit', 'risk-free investment',
        '100% an toàn', 'chắc chắn có lãi',
        'không mất tiền', 'hoàn vốn 100%',
    ],

    // Forex/Crypto scam keywords
    forexCryptoScam: [
        'forex tự động', 'bot forex', 'EA forex', 'robot forex',
        'airdrop miễn phí', 'claim token', 'presale token',
        'staking 100% APY', 'staking 1000% APY',
        'yield farming 500%', 'liquidity mining',
        'pump and dump', 'shitcoin', 'memecoin đầu tư',
    ],

    // MLM/Ponzi scheme
    mlmPonzi: [
        'mạng lưới', 'hoa hồng cấp', 'hoa hồng đa cấp',
        'thu nhập thụ động', 'passive income',
        'giới thiệu bạn bè', 'hệ thống cấp bậc',
        'downline', 'upline', 'binary', 'matrix',
        'tuyển đại lý', 'tuyển cộng tác viên',
    ],

    // Regex patterns
    patterns: [
        /l(ợ|o)i.*nhu(ậ|a)n.*\d{2,3}%/i,
        /l(ã|a)i.*su(ấ|a)t.*\d{2,3}%/i,
        /x\d{2,4}/i,
        /apy.*\d{3,}/i,
        /apr.*\d{3,}/i,
        /staking.*\d{3,}%/i,
        /yield.*\d{3,}%/i,
    ],
}

// ============================================================================
// JOB SCAMS (Lừa Đảo Việc Làm)
// ============================================================================

export const VIETNAMESE_JOB_SCAMS = {
    // Việc nhẹ lương cao
    unrealisticJobs: [
        'việc nhẹ lương cao', 'lương 20-30 triệu',
        'không cần kinh nghiệm', 'làm tại nhà',
        'part-time 10 triệu', 'online 15 triệu',
        'làm 2-3h/ngày', 'thu nhập 5-10 triệu',
    ],

    // Yêu cầu đặt cọc
    depositRequired: [
        'đặt cọc', 'phí đào tạo', 'mua tài liệu',
        'phí xét duyệt', 'phí hồ sơ', 'phí bảo lãnh',
        'mua thiết bị', 'mua sản phẩm trước',
    ],

    // Công việc đáng ngờ
    suspiciousJobs: [
        'tuyển cộng tác viên', 'nhấn like kiếm tiền',
        'đánh giá sản phẩm', 'chạy đơn hàng',
        'nạp rút tiền', 'làm nhiệm vụ',
        'tăng follow', 'tăng view', 'buff like',
        'đánh số đề online', 'làm admin group',
    ],

    patterns: [
        /vi(ệ|e)c.*nh(ẹ|e).*l(ươ|uo)ng.*cao/i,
        /l(ươ|uo)ng.*\d{2,3}.*tri(ệ|e)u/i,
        /kh(ô|o)ng.*c(ầ|a)n.*kinh.*nghi(ệ|e)m/i,
        /part.?time.*\d{1,2}.*tri(ệ|e)u/i,
    ],
}

// ============================================================================
// FAKE PRIZES (Giả Mạo Trúng Thưởng)
// ============================================================================

export const VIETNAMESE_FAKE_PRIZE_PATTERNS = {
    // Thông báo trúng thưởng
    prizeAnnouncements: [
        'chúc mừng bạn đã trúng', 'bạn là người may mắn',
        'nhận ngay 10 triệu', 'quà tặng iPhone',
        'trúng thưởng Viettel', 'trúng Mobifone',
        'nhận voucher 500k', 'mã giảm giá 1 triệu',
        'trúng xe SH', 'trúng ô tô', 'trúng vàng',
    ],

    // Urgency tactics (Chiến thuật gây áp lực)
    urgencyTactics: [
        'chỉ còn 5 phút', 'hết hạn hôm nay',
        'nhanh tay kẻo lỡ', 'còn 3 suất cuối',
        'click ngay', 'nhận ngay', 'đăng ký ngay',
        'số lượng có hạn', 'chỉ còn 10 suất',
    ],

    patterns: [
        /tr(ú|u)ng.*th(ư|u)(ơ|o)ng/i,
        /nh(ậ|a)n.*qu(à|a)/i,
        /mi(ễ|e)n.*ph(í|i)/i,
        /c(ò|o)n.*\d+.*su(ấ|a)t/i,
        /ch(ỉ|i).*c(ò|o)n.*\d+.*ph(ú|u)t/i,
        /nhanh.*tay/i,
    ],
}

// ============================================================================
// SOCIAL ENGINEERING INDICATORS
// ============================================================================

export const SOCIAL_ENGINEERING_INDICATORS = {
    // Urgency (Gấp rút)
    urgency: [
        'khẩn cấp', 'gấp', 'ngay lập tức', 'trong 24h',
        'hết hạn', 'sắp hết', 'chỉ còn', 'cuối cùng',
        'urgent', 'emergency', 'immediate', 'expires',
        'deadline', 'limited time', 'act now',
    ],

    // Fear (Sợ hãi)
    fear: [
        'tài khoản bị khóa', 'vi phạm', 'cảnh báo',
        'bị hack', 'mất tiền', 'nguy hiểm', 'bị phạt',
        'account locked', 'suspended', 'violation',
        'legal action', 'lawsuit', 'arrest warrant',
    ],

    // Greed (Tham lam)
    greed: [
        'miễn phí', 'free', 'quà tặng', 'bonus',
        'giảm giá 90%', 'sale off', 'khuyến mãi',
        'kiếm tiền dễ dàng', 'làm giàu nhanh',
        'passive income', 'get rich quick',
    ],

    // Authority (Quyền lực)
    authority: [
        'chính phủ yêu cầu', 'ngân hàng thông báo',
        'cảnh sát', 'công an', 'thuế', 'tòa án',
        'official', 'government', 'police',
        'tax authority', 'court order',
    ],

    patterns: [
        /kh(ẩ|a)n.*c(ấ|a)p/i,
        /t(à|a)i.*kho(ả|a)n.*b(ị|i).*kh(ó|o)a/i,
        /vi.*ph(ạ|a)m/i,
        /mi(ễ|e)n.*ph(í|i)/i,
    ],
}

// ============================================================================
// FAKE TRUST INDICATORS
// ============================================================================

export const FAKE_TRUST_INDICATORS = {
    patterns: [
        // Fake reviews
        /\d+.*ng(ư|u)(ờ|o)i.*tin.*t(ư|u)(ở|o)ng/i,
        /\d+.*kh(á|a)ch.*h(à|a)ng.*h(à|a)i.*l(ò|o)ng/i,
        /\d+.*đ(á|a)nh.*gi(á|a).*5.*sao/i,
        /100%.*kh(á|a)ch.*h(à|a)ng.*h(à|a)i.*l(ò|o)ng/i,

        // Fake certifications
        /ch(ứ|u)ng.*nh(ậ|a)n.*qu(ố|o)c.*t(ế|e)/i,
        /gi(ấ|a)y.*ph(é|e)p.*kinh.*doanh/i,
        /ISO.*\d{4,5}/i,
        /c(ơ|o).*quan.*ch(ứ|u)c.*n(ă|a)ng.*c(ấ|a)p/i,

        // Fake partnerships
        /đ(ố|o)i.*t(á|a)c.*ch(í|i)nh.*th(ứ|u)c/i,
        /h(ợ|o)p.*t(á|a)c.*v(ớ|o)i.*(Google|Facebook|Apple|Microsoft)/i,
        /được.*b(ả|a)o.*tr(ợ|o).*b(ở|o)i/i,
    ],
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if domain matches gambling patterns
 */
export function isGamblingDomain(domain: string): {
    isGambling: boolean
    confidence: number
    matchedPatterns: string[]
} {
    const domainLower = domain.toLowerCase()
    const matches: string[] = []

    // Check casino sites
    for (const site of VIETNAMESE_GAMBLING_PATTERNS.casinoSites) {
        if (domainLower.includes(site)) {
            matches.push(`Nhà cái: ${site}`)
        }
    }

    // Check card games
    for (const game of VIETNAMESE_GAMBLING_PATTERNS.cardGames) {
        if (domainLower.includes(game)) {
            matches.push(`Game bài: ${game}`)
        }
    }

    // Check lucky numbers
    for (const num of VIETNAMESE_GAMBLING_PATTERNS.luckyNumbers) {
        if (domainLower.includes(num)) {
            matches.push(`Số may mắn: ${num}`)
        }
    }

    // Check regex patterns
    for (const pattern of VIETNAMESE_GAMBLING_PATTERNS.patterns) {
        if (pattern.test(domainLower)) {
            matches.push('Pattern cờ bạc phát hiện')
            break
        }
    }

    const confidence = matches.length > 0 ? Math.min(0.7 + (matches.length * 0.1), 1.0) : 0

    return {
        isGambling: matches.length > 0,
        confidence,
        matchedPatterns: matches,
    }
}

/**
 * Check if domain is phishing
 */
export function isPhishingDomain(domain: string, url: string): {
    isPhishing: boolean
    confidence: number
    matchedPatterns: string[]
} {
    const domainLower = domain.toLowerCase()
    const urlLower = url.toLowerCase()
    const matches: string[] = []

    // Check bank phishing
    for (const pattern of VIETNAMESE_PHISHING_PATTERNS.bankPhishing) {
        if (pattern.test(domainLower) || pattern.test(urlLower)) {
            matches.push('Giả mạo ngân hàng')
            break
        }
    }

    // Check e-commerce phishing
    for (const pattern of VIETNAMESE_PHISHING_PATTERNS.ecommercePhishing) {
        if (pattern.test(domainLower)) {
            matches.push('Giả mạo TMĐT')
            break
        }
    }

    // Check e-wallet phishing
    for (const pattern of VIETNAMESE_PHISHING_PATTERNS.ewalletPhishing) {
        if (pattern.test(domainLower)) {
            matches.push('Giả mạo ví điện tử')
            break
        }
    }

    // Check suspicious URL patterns
    for (const pattern of VIETNAMESE_PHISHING_PATTERNS.suspiciousPatterns) {
        if (pattern.test(urlLower)) {
            matches.push('URL đáng ngờ')
            break
        }
    }

    const confidence = matches.length > 0 ? Math.min(0.75 + (matches.length * 0.08), 0.98) : 0

    return {
        isPhishing: matches.length > 0,
        confidence,
        matchedPatterns: matches,
    }
}

/**
 * Detect social engineering tactics
 */
export function detectSocialEngineering(content: string): {
    detected: boolean
    tactics: string[]
    confidence: number
} {
    const contentLower = content.toLowerCase()
    const tactics: string[] = []

    // Check urgency
    const urgencyHits = SOCIAL_ENGINEERING_INDICATORS.urgency.filter(k =>
        contentLower.includes(k)
    )
    if (urgencyHits.length > 0) {
        tactics.push(`Urgency: ${urgencyHits.slice(0, 2).join(', ')}`)
    }

    // Check fear
    const fearHits = SOCIAL_ENGINEERING_INDICATORS.fear.filter(k =>
        contentLower.includes(k)
    )
    if (fearHits.length > 0) {
        tactics.push(`Fear: ${fearHits.slice(0, 2).join(', ')}`)
    }

    // Check greed
    const greedHits = SOCIAL_ENGINEERING_INDICATORS.greed.filter(k =>
        contentLower.includes(k)
    )
    if (greedHits.length > 0) {
        tactics.push(`Greed: ${greedHits.slice(0, 2).join(', ')}`)
    }

    // Check authority
    const authorityHits = SOCIAL_ENGINEERING_INDICATORS.authority.filter(k =>
        contentLower.includes(k)
    )
    if (authorityHits.length > 0) {
        tactics.push(`Authority: ${authorityHits.slice(0, 2).join(', ')}`)
    }

    const confidence = tactics.length > 0 ? Math.min(0.6 + (tactics.length * 0.15), 0.95) : 0

    return {
        detected: tactics.length > 0,
        tactics,
        confidence,
    }
}

/**
 * Check for investment scam indicators
 */
export function detectInvestmentScam(content: string): {
    detected: boolean
    indicators: string[]
    confidence: number
} {
    const contentLower = content.toLowerCase()
    const indicators: string[] = []

    // Check unrealistic returns
    const returnHits = VIETNAMESE_INVESTMENT_SCAMS.unrealisticReturns.filter(k =>
        contentLower.includes(k)
    )
    if (returnHits.length > 0) {
        indicators.push(`Lợi nhuận phi thực tế: ${returnHits[0]}`)
    }

    // Check no-risk claims
    const noRiskHits = VIETNAMESE_INVESTMENT_SCAMS.noRiskClaims.filter(k =>
        contentLower.includes(k)
    )
    if (noRiskHits.length > 0) {
        indicators.push(`Cam kết không rủi ro: ${noRiskHits[0]}`)
    }

    // Check forex/crypto scam
    const forexHits = VIETNAMESE_INVESTMENT_SCAMS.forexCryptoScam.filter(k =>
        contentLower.includes(k)
    )
    if (forexHits.length > 0) {
        indicators.push(`Forex/Crypto scam: ${forexHits[0]}`)
    }

    // Check MLM/Ponzi
    const mlmHits = VIETNAMESE_INVESTMENT_SCAMS.mlmPonzi.filter(k =>
        contentLower.includes(k)
    )
    if (mlmHits.length > 0) {
        indicators.push(`MLM/Ponzi: ${mlmHits[0]}`)
    }

    // Check regex patterns
    for (const pattern of VIETNAMESE_INVESTMENT_SCAMS.patterns) {
        if (pattern.test(contentLower)) {
            indicators.push('Pattern lừa đảo đầu tư')
            break
        }
    }

    const confidence = indicators.length > 0 ? Math.min(0.65 + (indicators.length * 0.12), 0.95) : 0

    return {
        detected: indicators.length > 0,
        indicators,
        confidence,
    }
}
