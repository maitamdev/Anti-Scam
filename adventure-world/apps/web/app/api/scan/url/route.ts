import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Scan history (in-memory for demo)
const scanHistory: Map<string, any[]> = new Map();

// Suspicious patterns
const SUSPICIOUS_PATTERNS = [
    { pattern: /trúng thưởng/i, score: 30, reason: 'Chứa từ khóa "trúng thưởng" - dấu hiệu lừa đảo phổ biến' },
    { pattern: /click ngay|nhấn ngay/i, score: 20, reason: 'Tạo áp lực hành động gấp' },
    { pattern: /chuyển tiền|nạp tiền|gửi tiền/i, score: 25, reason: 'Yêu cầu chuyển tiền' },
    { pattern: /otp|mã xác thực|mã xác nhận/i, score: 35, reason: 'Yêu cầu OTP - ngân hàng không bao giờ hỏi OTP' },
    { pattern: /tài khoản.*khóa|khóa.*tài khoản/i, score: 30, reason: 'Đe dọa khóa tài khoản - chiêu lừa đảo phổ biến' },
    { pattern: /bit\.ly|tinyurl|shorturl/i, score: 15, reason: 'Sử dụng URL rút gọn - khó xác minh đích đến' },
    { pattern: /\.xyz|\.tk|\.ml|\.gq/i, score: 25, reason: 'Domain TLD không đáng tin cậy' },
    { pattern: /@gmail\.com.*ngân hàng|bank.*@gmail/i, score: 35, reason: 'Ngân hàng không dùng Gmail' },
    { pattern: /urgent|gấp|khẩn cấp/i, score: 20, reason: 'Tạo cảm giác cấp bách' },
    { pattern: /cung cấp.*thông tin|xác minh.*thông tin/i, score: 25, reason: 'Yêu cầu thông tin cá nhân' },
];

// Domain blacklist
const BLACKLISTED_DOMAINS = [
    'phishing-example.com',
    'fake-bank.xyz',
    'scam-site.tk',
];

function analyzeUrl(url: string) {
    let score = 10;
    const reasons: string[] = [];

    try {
        const parsed = new URL(url);

        // Check protocol
        if (parsed.protocol === 'http:') {
            score += 15;
            reasons.push('Website không dùng HTTPS - dữ liệu không được mã hóa');
        }

        // Check blacklist
        if (BLACKLISTED_DOMAINS.some(d => parsed.hostname.includes(d))) {
            score += 50;
            reasons.push('Domain nằm trong danh sách đen');
        }

        // Check suspicious patterns in URL
        SUSPICIOUS_PATTERNS.forEach(({ pattern, score: s, reason }) => {
            if (pattern.test(url)) {
                score += s;
                reasons.push(reason);
            }
        });

        // Check domain structure
        const parts = parsed.hostname.split('.');
        if (parts.length > 4) {
            score += 15;
            reasons.push('Domain có cấu trúc phức tạp bất thường');
        }

        // Check for domain spoofing (e.g., vietcombank-secure.com)
        const bankKeywords = ['vietcombank', 'techcombank', 'vcb', 'bidv', 'agribank', 'momo', 'zalopay'];
        const domainLower = parsed.hostname.toLowerCase();
        if (bankKeywords.some(k => domainLower.includes(k)) && !domainLower.endsWith('.vn')) {
            score += 30;
            reasons.push('Domain giả mạo ngân hàng/ví điện tử');
        }

        // Check TLD
        const tld = parts[parts.length - 1];
        if (['xyz', 'tk', 'ml', 'gq', 'cf', 'ga'].includes(tld)) {
            score += 20;
            reasons.push(`Domain TLD ".${tld}" thường được sử dụng cho trang lừa đảo`);
        }

    } catch {
        score += 10;
        reasons.push('URL format không hợp lệ');
    }

    if (reasons.length === 0) {
        reasons.push('Không phát hiện dấu hiệu đáng ngờ rõ ràng');
    }

    return { score: Math.min(100, score), reasons };
}

function getRiskLevel(score: number): 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS' | 'CRITICAL' {
    if (score > 80) return 'CRITICAL';
    if (score > 50) return 'DANGEROUS';
    if (score > 20) return 'SUSPICIOUS';
    return 'SAFE';
}

function getRecommendations(riskLevel: string): string[] {
    switch (riskLevel) {
        case 'CRITICAL':
            return [
                'KHÔNG CLICK vào link này dưới mọi hình thức',
                'Không cung cấp bất kỳ thông tin cá nhân nào',
                'Báo cáo trang web này cho cơ quan chức năng',
                'Xóa tin nhắn chứa link này',
            ];
        case 'DANGEROUS':
            return [
                'KHÔNG click vào link này',
                'Không cung cấp thông tin cá nhân hoặc tài chính',
                'Xác minh nguồn gốc qua kênh chính thức',
            ];
        case 'SUSPICIOUS':
            return [
                'Cẩn thận khi truy cập',
                'Xác minh nguồn gốc trước khi tin tưởng',
                'Không nhập thông tin đăng nhập hoặc thanh toán',
            ];
        default:
            return [
                'Link có vẻ an toàn, nhưng luôn cảnh giác',
                'Kiểm tra thanh địa chỉ trước khi nhập thông tin',
            ];
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json(
                { success: false, error: 'Vui lòng nhập URL' },
                { status: 400 }
            );
        }

        // Analyze
        const { score, reasons } = analyzeUrl(url);
        const riskLevel = getRiskLevel(score);
        const recommendations = getRecommendations(riskLevel);

        const result = {
            id: `scan_${Date.now()}`,
            inputType: 'URL',
            inputValue: url,
            riskScore: score,
            riskLevel,
            reasons,
            recommendations,
            scannedAt: new Date().toISOString(),
        };

        // Store in history (would use Prisma in production)
        const userHistory = scanHistory.get('default') || [];
        userHistory.unshift(result);
        if (userHistory.length > 50) userHistory.pop();
        scanHistory.set('default', userHistory);

        return NextResponse.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error('Scan error:', error);
        return NextResponse.json(
            { success: false, error: 'Đã có lỗi xảy ra' },
            { status: 500 }
        );
    }
}

export async function GET() {
    // Get scan history
    const history = scanHistory.get('default') || [];
    return NextResponse.json({ success: true, history });
}
