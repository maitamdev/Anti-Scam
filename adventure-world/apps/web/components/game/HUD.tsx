'use client';

interface HUDProps {
    username: string;
    level: number;
    xp: number;
    xpToNext: number;
    coins: number;
    onProfileClick: () => void;
    onMenuClick: () => void;
}

export default function HUD({
    username,
    level,
    xp,
    xpToNext,
    coins,
    onProfileClick,
    onMenuClick,
}: HUDProps) {
    const xpPercent = (xp / xpToNext) * 100;

    return (
        <div className="hud-top">
            {/* Left - Player Info */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onProfileClick}
                    className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold hover:bg-blue-400 transition"
                >
                    {username.charAt(0).toUpperCase()}
                </button>

                <div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold">{username}</span>
                        <span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-sm font-bold">
                            Lv.{level}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <div className="xp-bar w-32">
                            <div className="xp-bar-fill" style={{ width: `${xpPercent}%` }} />
                        </div>
                        <span className="text-xs text-gray-400">{xp}/{xpToNext}</span>
                    </div>
                </div>
            </div>

            {/* Right - Resources & Menu */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-black/50 px-3 py-2 rounded-lg">
                    <span className="text-yellow-400">🪙</span>
                    <span className="font-bold">{coins}</span>
                </div>

                <button
                    onClick={onMenuClick}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                    ☰
                </button>
            </div>
        </div>
    );
}
