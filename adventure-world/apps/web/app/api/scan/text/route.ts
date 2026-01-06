import { NextRequest, NextResponse } from 'next/server';

// Suspicious patterns for text
const SUSPICIOUS_PATTERNS = [
    { pattern: /trúng thưởng/i, score: 30, reason: 'Chứa từ khóa "trúng thưởng" - dấu hiệu lừa đảo phổ biến' },
    { pattern: /click ngay|nhấn ngay|bấm ngay/i, score: 20, reason: 'Tạo áp lực hành động gấp' },
    { pattern: /chuyển tiền|nạp tiền|gửi tiền/i, score: 25, reason: 'Yêu cầu chuyển tiền' },
    { pattern: /otp|mã xác thực|mã xác nhận|mã giao dịch/i, score: 35, reason: 'Yêu cầu OTP - ngân hàng không bao giờ hỏi OTP qua tin nhắn' },
    { pattern: /tài khoản.*khóa|khóa.*tài khoản|đóng băng/i, score: 30, reason: 'Đe dọa khóa tài khoản' },
    { pattern: /urgent|gấp|khẩn cấp|ngay lập tức/i, score: 20, reason: 'Tạo cảm giác cấp bách' },
    { pattern: /cung cấp.*thông tin|xác minh.*thông tin/i, score: 25, reason: 'Yêu cầu thông tin cá nhân' },
    { pattern: /đầu tư.*lãi suất.*cao|lãi.*triệu/i, score: 35, reason: 'Hứa hẹn lãi suất cao bất thường' },
    { pattern: /việc làm.*thu nhập.*cao|online.*thu nhập/i, score: 25, reason: 'Việc làm online lương cao - có thể là lừa đảo' },
    { pattern: /ngân hàng.*gọi|công an.*gọi|tòa án.*gọi/i, score: 30, reason: 'Giả danh cơ quan chức năng' },
    { pattern: /mật khẩu|password|pin/i, score: 30, reason: 'Yêu cầu mật khẩu - không bao giờ chia sẻ' },
    { pattern: /số thẻ|card number|cvv/i, score: 35, reason: 'Yêu cầu thông tin thẻ ngân hàng' },
];

function analyzeText(text: string) {
    let score = 5;
    const reasons: string[] = [];

    // Check patterns
    SUSPICIOUS_PATTERNS.forEach(({ pattern, score: s, reason }) => {
        if (pattern.test(text)) {
            score += s;
            if (!reasons.includes(reason)) {
                reasons.push(reason);
            }
        }
    });

    // Check for phone numbers with suspicious context
    if (/\d{10,11}/.test(text) && /gọi|liên hệ|contact/i.test(text)) {
        score += 10;
        reasons.push('Chứa số điện thoại với yêu cầu liên hệ');
    }

    // Check for URLs in text
    if (/https?:\/\/[^\s]+/.test(text)) {
        score += 15;
        reasons.push('Chứa link - cần kiểm tra riêng');
    }

    // Check for bank account numbers pattern
    if (/\d{9,14}/.test(text) && /tài khoản|stk|số tk/i.test(text)) {
        score += 20;
        reasons.push('Chứa số tài khoản ngân hàng');
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
                'KHÔNG làm theo bất kỳ hướng dẫn nào trong tin nhắn này',
                'Không cung cấp OTP, mật khẩu hoặc thông tin cá nhân',
                'Chặn số điện thoại/tài khoản gửi tin nhắn',
                'Báo cáo cho nhà mạng hoặc cơ quan chức năng',
            ];
        case 'DANGEROUS':
            return [
                'Không làm theo hướng dẫn trong tin nhắn',
                'Xác minh qua kênh chính thức (gọi hotline, đến trực tiếp)',
                'Không click vào link trong tin nhắn',
            ];
        case 'SUSPICIOUS':
            return [
                'Cẩn thận với nội dung tin nhắn',
                'Xác minh thông tin qua nguồn khác',
                'Không vội vàng hành động theo yêu cầu',
            ];
        default:
            return [
                'Tin nhắn có vẻ an toàn',
                'Vẫn nên cẩn thận với các yêu cầu lạ',
            ];
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { text } = body;

        if (!text || text.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: 'Vui lòng nhập nội dung cần kiểm tra' },
                { status: 400 }
            );
        }

        const { score, reasons } = analyzeText(text);
        const riskLevel = getRiskLevel(score);
        const recommendations = getRecommendations(riskLevel);

        const result = {
            id: `scan_${Date.now()}`,
            inputType: 'TEXT',
            riskScore: score,
            riskLevel,
            reasons,
            recommendations,
            scannedAt: new Date().toISOString(),
        };

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
