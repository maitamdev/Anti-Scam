import crypto from 'crypto';

// ==================== HASH UTILS ====================

export function hashString(input: string): string {
    return crypto.createHash('sha256').update(input).digest('hex');
}

// ==================== URL UTILS ====================

export function extractDomain(url: string): string {
    try {
        const parsed = new URL(url);
        return parsed.hostname;
    } catch {
        return url;
    }
}

export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// ==================== CONTENT FILTER ====================

const BAD_WORDS = [
    // Add Vietnamese and English profanity
    'scam', 'lừa đảo', 'hack', 'cheat',
];

const SCAM_PATTERNS = [
    /trúng thưởng/i,
    /chuyển tiền ngay/i,
    /otp|mã xác thực/i,
    /tài khoản.*bị khóa/i,
    /click.*link.*ngay/i,
    /cung cấp.*thông tin/i,
    /urgent|긴급|紧急/i,
];

export function filterContent(content: string): {
    cleaned: string;
    hasViolation: boolean;
    violations: string[];
} {
    let cleaned = content;
    const violations: string[] = [];

    // Check bad words
    for (const word of BAD_WORDS) {
        if (content.toLowerCase().includes(word.toLowerCase())) {
            cleaned = cleaned.replace(new RegExp(word, 'gi'), '***');
            violations.push('profanity');
        }
    }

    // Check scam patterns
    for (const pattern of SCAM_PATTERNS) {
        if (pattern.test(content)) {
            violations.push('scam_pattern');
            break;
        }
    }

    return {
        cleaned,
        hasViolation: violations.length > 0,
        violations: [...new Set(violations)],
    };
}

// ==================== LINK MASKING ====================

const WHITELISTED_DOMAINS = [
    'google.com',
    'youtube.com',
    'facebook.com',
    'gov.vn',
];

export function maskLinks(content: string): string {
    const urlRegex = /(https?:\/\/[^\s]+)/gi;

    return content.replace(urlRegex, (url) => {
        const domain = extractDomain(url);

        // Allow whitelisted domains
        if (WHITELISTED_DOMAINS.some(d => domain.endsWith(d))) {
            return url;
        }

        // Mask potentially dangerous links
        const truncated = domain.length > 20
            ? domain.substring(0, 20) + '...'
            : domain;

        return `[🔗 ${truncated}]`;
    });
}

// ==================== FORMAT UTILS ====================

export function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

export function formatTimeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return 'Vừa xong';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} phút trước`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} giờ trước`;
    return `${Math.floor(seconds / 86400)} ngày trước`;
}

// ==================== RANDOM UTILS ====================

export function generateCode(length: number = 6): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
