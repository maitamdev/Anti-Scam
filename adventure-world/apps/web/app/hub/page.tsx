'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import HUD from '../../components/game/HUD';
import ChatPanel from '../../components/game/ChatPanel';
import QuestPanel from '../../components/game/QuestPanel';
import ScanCenter from '../../components/game/ScanCenter';
import ProfileModal from '../../components/game/ProfileModal';

// Dynamic import for Babylon scene (client only)
const BabylonScene = dynamic(
    () => import('../../components/babylon/Scene'),
    { ssr: false }
);

export default function HubPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showScanCenter, setShowScanCenter] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showChat, setShowChat] = useState(true);

    // Player state
    const [playerProgress, setPlayerProgress] = useState({
        level: 1,
        xp: 0,
        xpToNext: 100,
        coins: 0,
    });

    useEffect(() => {
        // Check auth
        const userData = localStorage.getItem('user');
        if (!userData) {
            router.push('/');
            return;
        }

        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        // Load progress from API (mock for now)
        setPlayerProgress({
            level: parsedUser.level || 1,
            xp: 25,
            xpToNext: 100,
            coins: 50,
        });

        setIsLoading(false);
    }, [router]);

    const handlePortalEnter = (zoneId: string) => {
        router.push(`/zone/${zoneId}`);
    };

    const handleScanClick = () => {
        setShowScanCenter(true);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl loading">Đang tải thế giới...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* 3D Scene */}
            <div className="game-canvas-container">
                <BabylonScene
                    sceneType="hub"
                    userId={user?.id}
                    username={user?.username}
                    onPortalEnter={handlePortalEnter}
                    onNPCInteract={(npcId: string) => {
                        if (npcId === 'npc_scanner') {
                            setShowScanCenter(true);
                        }
                    }}
                />
            </div>

            {/* UI Overlay */}
            <div className="game-ui-overlay">
                {/* Top HUD */}
                <HUD
                    username={user?.username || 'Player'}
                    level={playerProgress.level}
                    xp={playerProgress.xp}
                    xpToNext={playerProgress.xpToNext}
                    coins={playerProgress.coins}
                    onProfileClick={() => setShowProfile(true)}
                    onMenuClick={() => router.push('/')}
                />

                {/* Left Panel - Quests */}
                <div className="hud-left">
                    <QuestPanel
                        quests={[
                            { id: 'z1_q1', name: 'Email Detective', zone: 'Phishing Forest', status: 'available' },
                            { id: 'z1_q2', name: 'Domain Hunter', zone: 'Phishing Forest', status: 'available' },
                            { id: 'z1_q3', name: 'Link Labyrinth', zone: 'Phishing Forest', status: 'locked' },
                        ]}
                        onQuestClick={(questId) => router.push('/zone/z1')}
                    />
                </div>

                {/* Right Panel - Chat */}
                {showChat && (
                    <div className="hud-right">
                        <ChatPanel
                            userId={user?.id}
                            username={user?.username}
                            channel="hub:global"
                            onClose={() => setShowChat(false)}
                        />
                    </div>
                )}

                {/* Bottom Bar */}
                <div className="hud-bottom">
                    <button className="btn-game" onClick={() => setShowChat(!showChat)}>
                        💬 Chat
                    </button>
                    <button className="btn-game" onClick={handleScanClick}>
                        🔍 Scan Center
                    </button>
                    <button className="btn-game" onClick={() => setShowProfile(true)}>
                        👤 Profile
                    </button>
                </div>
            </div>

            {/* Modals */}
            {showScanCenter && (
                <ScanCenter
                    userId={user?.id}
                    onClose={() => setShowScanCenter(false)}
                />
            )}

            {showProfile && (
                <ProfileModal
                    user={user}
                    progress={playerProgress}
                    onClose={() => setShowProfile(false)}
                />
            )}

            {/* Controls Help */}
            <div className="fixed bottom-4 left-4 text-sm text-gray-400 bg-black/50 p-2 rounded">
                <div>WASD - Di chuyển</div>
                <div>Mouse - Xoay camera</div>
                <div>E - Tương tác</div>
            </div>
        </div>
    );
}
