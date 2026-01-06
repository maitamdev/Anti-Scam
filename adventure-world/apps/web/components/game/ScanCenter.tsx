'use client';

import { useState } from 'react';

interface ScanCenterProps {
    userId: string;
    onClose: () => void;
}

interface ScanResult {
    riskScore: number;
    riskLevel: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS' | 'CRITICAL';
    reasons: string[];
    recommendations: string[];
}

export default function ScanCenter({ userId, onClose }: ScanCenterProps) {
    const [inputType, setInputType] = useState<'url' | 'text' | 'image'>('url');
    const [inputValue, setInputValue] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);
    const [history, setHistory] = useState<ScanResult[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    const handleScan = async () => {
        if (!inputValue.trim()) return;

        setIsScanning(true);

        try {
            const res = await fetch(`/api/scan/${inputType}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [inputType]: inputValue }),
            });

            const data = await res.json();

            if (data.success) {
                setResult(data.result);
                setHistory([data.result, ...history.slice(0, 9)]);
            } else {
                alert(data.error || 'Đã có lỗi xảy ra');
            }
        } catch (error) {
            // Mock result for demo
            const mockResult = mockScanResult(inputValue);
            setResult(mockResult);
            setHistory([mockResult, ...history.slice(0, 9)]);
        } finally {
            setIsScanning(false);
        }
    };

    const mockScanResult = (input: string): ScanResult => {
        // Simple mock logic
        const suspiciousPatterns = [
            /trúng thưởng/i,
            /click ngay/i,
            /chuyển tiền/i,
            /otp/i,
            /tài khoản.*khóa/i,
            /bit\.ly/i,
            /\.xyz/i,
            /@gmail\.com.*ngân hàng/i,
        ];

        let score = 10;
        const reasons: string[] = [];

        suspiciousPatterns.forEach(pattern => {
            if (pattern.test(input)) {
                score += 25;
                reasons.push(`Phát hiện pattern đáng ngờ: ${pattern.source.slice(0, 20)}...`);
            }
        });

        // Domain checks for URLs
        if (inputType === 'url') {
            try {
                const url = new URL(input);
                if (url.hostname.includes('-') && url.hostname.split('-').length > 2) {
                    score += 20;
                    reasons.push('Domain có nhiều dấu gạch ngang bất thường');
                }
                if (url.protocol === 'http:') {
                    score += 15;
                    reasons.push('Website không dùng HTTPS');
                }
                if (url.hostname.endsWith('.xyz') || url.hostname.endsWith('.tk')) {
                    score += 30;
                    reasons.push('Domain TLD không đáng tin cậy');
                }
            } catch {
                score += 10;
                reasons.push('URL format không chuẩn');
            }
        }

        if (reasons.length === 0) {
            reasons.push('Không phát hiện dấu hiệu đáng ngờ rõ ràng');
        }

        score = Math.min(100, score);

        let riskLevel: ScanResult['riskLevel'] = 'SAFE';
        if (score > 80) riskLevel = 'CRITICAL';
        else if (score > 50) riskLevel = 'DANGEROUS';
        else if (score > 20) riskLevel = 'SUSPICIOUS';

        const recommendations = [];
        if (score > 50) {
            recommendations.push('KHÔNG click vào link này');
            recommendations.push('Không cung cấp thông tin cá nhân');
            recommendations.push('Báo cáo nếu nhận được từ người lạ');
        } else if (score > 20) {
            recommendations.push('Cẩn thận khi tương tác');
            recommendations.push('Xác minh nguồn gốc trước khi tin tưởng');
        } else {
            recommendations.push('Có vẻ an toàn, nhưng luôn cảnh giác');
        }

        return { riskScore: score, riskLevel, reasons, recommendations };
    };

    const getRiskColor = (level: ScanResult['riskLevel']) => {
        const colors = {
            SAFE: 'text-green-400',
            SUSPICIOUS: 'text-yellow-400',
            DANGEROUS: 'text-orange-400',
            CRITICAL: 'text-red-400',
        };
        return colors[level];
    };

    const getRiskLabel = (level: ScanResult['riskLevel']) => {
        const labels = {
            SAFE: 'An toàn',
            SUSPICIOUS: 'Đáng ngờ',
            DANGEROUS: 'Nguy hiểm',
            CRITICAL: 'Rất nguy hiểm',
        };
        return labels[level];
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content max-w-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">🔍 Scan Center</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
                        ✕
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        className={`px-4 py-2 rounded-lg transition ${!showHistory ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                        onClick={() => setShowHistory(false)}
                    >
                        Quét mới
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg transition ${showHistory ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                        onClick={() => setShowHistory(true)}
                    >
                        Lịch sử ({history.length})
                    </button>
                </div>

                {!showHistory ? (
                    <>
                        {/* Input Type Selection */}
                        <div className="flex gap-2 mb-4">
                            {(['url', 'text', 'image'] as const).map((type) => (
                                <button
                                    key={type}
                                    className={`flex-1 py-2 rounded-lg transition ${inputType === type ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    onClick={() => {
                                        setInputType(type);
                                        setInputValue('');
                                        setResult(null);
                                    }}
                                >
                                    {type === 'url' && '🔗 URL'}
                                    {type === 'text' && '📝 Text'}
                                    {type === 'image' && '🖼️ Image'}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="mb-6">
                            {inputType === 'image' ? (
                                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="image-upload"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) setInputValue(file.name);
                                        }}
                                    />
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        <div className="text-4xl mb-2">📷</div>
                                        <div>Click để upload ảnh</div>
                                        {inputValue && <div className="mt-2 text-blue-400">{inputValue}</div>}
                                    </label>
                                </div>
                            ) : (
                                <textarea
                                    className="chat-input w-full h-32 resize-none"
                                    placeholder={inputType === 'url'
                                        ? 'Dán URL cần kiểm tra...'
                                        : 'Dán nội dung tin nhắn cần kiểm tra...'}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                            )}
                        </div>

                        {/* Scan Button */}
                        <button
                            className="btn-game w-full mb-6"
                            onClick={handleScan}
                            disabled={isScanning || !inputValue.trim()}
                        >
                            {isScanning ? '⏳ Đang quét...' : '🔍 Kiểm tra ngay'}
                        </button>

                        {/* Result */}
                        {result && (
                            <div className="game-panel">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold">Kết quả</h3>
                                    <span className={`text-xl font-bold ${getRiskColor(result.riskLevel)}`}>
                                        {result.riskScore}/100 - {getRiskLabel(result.riskLevel)}
                                    </span>
                                </div>

                                {/* Risk meter */}
                                <div className="h-4 bg-gray-700 rounded-full overflow-hidden mb-4">
                                    <div
                                        className={`h-full transition-all duration-500 ${result.riskScore > 80 ? 'bg-red-500' :
                                                result.riskScore > 50 ? 'bg-orange-500' :
                                                    result.riskScore > 20 ? 'bg-yellow-500' :
                                                        'bg-green-500'
                                            }`}
                                        style={{ width: `${result.riskScore}%` }}
                                    />
                                </div>

                                {/* Reasons */}
                                <div className="mb-4">
                                    <h4 className="font-medium mb-2">⚠️ Lý do:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                                        {result.reasons.map((reason, i) => (
                                            <li key={i}>{reason}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Recommendations */}
                                <div>
                                    <h4 className="font-medium mb-2">💡 Khuyến nghị:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                                        {result.recommendations.map((rec, i) => (
                                            <li key={i}>{rec}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    /* History View */
                    <div className="space-y-3">
                        {history.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">
                                Chưa có lịch sử quét
                            </div>
                        ) : (
                            history.map((item, i) => (
                                <div key={i} className="game-panel flex items-center justify-between">
                                    <div>
                                        <span className={`font-bold ${getRiskColor(item.riskLevel)}`}>
                                            {getRiskLabel(item.riskLevel)}
                                        </span>
                                        <span className="text-gray-400 ml-2">
                                            {item.riskScore}/100
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {item.reasons[0]?.slice(0, 30)}...
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
