'use client';

interface ProfileModalProps {
    user: {
        id: string;
        username: string;
    };
    progress: {
        level: number;
        xp: number;
        xpToNext: number;
        coins: number;
    };
    onClose: () => void;
}

const BADGES = [
    { id: 'first_steps', name: 'Bước Đầu Tiên', icon: '🎒', earned: true },
    { id: 'forest_explorer', name: 'Nhà Thám Hiểm Rừng', icon: '🌲', earned: true },
    { id: 'scanner_pro', name: 'Scanner Pro', icon: '🔍', earned: true },
    { id: 'phishing_expert', name: 'Chuyên Gia Phishing', icon: '🎣', earned: false },
    { id: 'community_hero', name: 'Anh Hùng Cộng Đồng', icon: '🦸', earned: false },
];

export default function ProfileModal({ user, progress, onClose }: ProfileModalProps) {
    const xpPercent = (progress.xp / progress.xpToNext) * 100;

    return (
        <div className="modal-overlay">
            <div className="modal-content max-w-lg">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">👤 Hồ Sơ</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
                        ✕
                    </button>
                </div>

                {/* Avatar & Name */}
                <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-4xl font-bold mx-auto mb-4">
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="text-2xl font-bold">{user.username}</h3>
                    <div className="flex justify-center items-center gap-2 mt-2">
                        <span className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
                            Level {progress.level}
                        </span>
                        <span className="text-gray-400">⭐⭐⭐ Veteran</span>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="game-panel text-center">
                        <div className="text-2xl font-bold text-yellow-400">{progress.xp}</div>
                        <div className="text-sm text-gray-400">XP</div>
                    </div>
                    <div className="game-panel text-center">
                        <div className="text-2xl font-bold text-amber-400">{progress.coins}</div>
                        <div className="text-sm text-gray-400">Coins</div>
                    </div>
                    <div className="game-panel text-center">
                        <div className="text-2xl font-bold text-green-400">3</div>
                        <div className="text-sm text-gray-400">Badges</div>
                    </div>
                </div>

                {/* XP Progress */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                        <span>Level {progress.level}</span>
                        <span>{progress.xp}/{progress.xpToNext} XP</span>
                        <span>Level {progress.level + 1}</span>
                    </div>
                    <div className="xp-bar h-4">
                        <div className="xp-bar-fill" style={{ width: `${xpPercent}%` }} />
                    </div>
                </div>

                {/* Badges */}
                <div>
                    <h4 className="font-bold mb-3">🏆 Huy Hiệu</h4>
                    <div className="grid grid-cols-5 gap-3">
                        {BADGES.map((badge) => (
                            <div
                                key={badge.id}
                                className={`text-center p-2 rounded-lg ${badge.earned ? 'bg-blue-500/20' : 'bg-gray-800 opacity-50'
                                    }`}
                                title={badge.name}
                            >
                                <div className="text-3xl mb-1">{badge.icon}</div>
                                <div className="text-xs truncate">{badge.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                    <button className="btn-game flex-1">
                        ⚙️ Cài đặt
                    </button>
                    <button
                        className="flex-1 py-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
                        onClick={() => {
                            localStorage.removeItem('user');
                            localStorage.removeItem('accessToken');
                            window.location.href = '/';
                        }}
                    >
                        🚪 Đăng xuất
                    </button>
                </div>
            </div>
        </div>
    );
}
