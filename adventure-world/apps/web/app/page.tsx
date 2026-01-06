'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    });
    const [isRegister, setIsRegister] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
            const body = isRegister
                ? formData
                : { email: formData.email, password: formData.password };

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (data.success) {
                // Store token
                localStorage.setItem('accessToken', data.tokens.accessToken);
                localStorage.setItem('user', JSON.stringify(data.user));

                // Navigate to hub
                router.push('/hub');
            } else {
                alert(data.error || 'Đã có lỗi xảy ra');
            }
        } catch (error) {
            console.error('Auth error:', error);
            alert('Đã có lỗi xảy ra');
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickPlay = () => {
        // Demo mode - create temp user
        const tempUser = {
            id: 'demo_' + Date.now(),
            username: 'Player' + Math.floor(Math.random() * 9999),
            level: 1,
        };
        localStorage.setItem('user', JSON.stringify(tempUser));
        router.push('/hub');
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Adventure World
                </h1>
                <p className="text-xl text-gray-300 mb-2">
                    Khám phá thế giới Anti-Scam
                </p>
                <p className="text-gray-400">
                    Học cách nhận diện và phòng tránh lừa đảo qua game 3D hấp dẫn
                </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl">
                <div className="game-panel text-center">
                    <div className="text-4xl mb-3">🌲</div>
                    <h3 className="font-bold mb-2">4 Zone Phiêu Lưu</h3>
                    <p className="text-sm text-gray-400">
                        Khám phá Phishing Forest, Message Mirage và nhiều hơn nữa
                    </p>
                </div>
                <div className="game-panel text-center">
                    <div className="text-4xl mb-3">🔍</div>
                    <h3 className="font-bold mb-2">Scan Center</h3>
                    <p className="text-sm text-gray-400">
                        Kiểm tra URL, tin nhắn, hình ảnh nghi ngờ
                    </p>
                </div>
                <div className="game-panel text-center">
                    <div className="text-4xl mb-3">👥</div>
                    <h3 className="font-bold mb-2">Co-op 2-4 Người</h3>
                    <p className="text-sm text-gray-400">
                        Chơi cùng bạn bè, hoàn thành quest và boss
                    </p>
                </div>
            </div>

            {/* Buttons */}
            {!showLogin ? (
                <div className="flex gap-4">
                    <button
                        onClick={handleQuickPlay}
                        className="btn-game text-lg px-8 py-4"
                    >
                        🎮 Chơi Ngay
                    </button>
                    <button
                        onClick={() => setShowLogin(true)}
                        className="btn-game text-lg px-8 py-4"
                        style={{ background: 'rgba(255,255,255,0.1)', boxShadow: 'none' }}
                    >
                        Đăng nhập
                    </button>
                </div>
            ) : (
                /* Login/Register Form */
                <div className="game-panel w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        {isRegister ? 'Đăng ký' : 'Đăng nhập'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-2">Email</label>
                            <input
                                type="email"
                                className="chat-input"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        {isRegister && (
                            <div>
                                <label className="block text-sm mb-2">Tên người dùng</label>
                                <input
                                    type="text"
                                    className="chat-input"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    required
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm mb-2">Mật khẩu</label>
                            <input
                                type="password"
                                className="chat-input"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-game w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Đang xử lý...' : (isRegister ? 'Đăng ký' : 'Đăng nhập')}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <button
                            className="text-blue-400 hover:underline"
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký'}
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <button
                            className="text-gray-400 hover:underline"
                            onClick={() => setShowLogin(false)}
                        >
                            ← Quay lại
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="mt-16 text-gray-500 text-sm">
                Adventure World - Game giáo dục chống lừa đảo
            </footer>
        </main>
    );
}
