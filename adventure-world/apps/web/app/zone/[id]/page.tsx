'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import HUD from '../../../components/game/HUD';
import ChatPanel from '../../../components/game/ChatPanel';
import QuestUI from '../../../components/game/QuestUI';
import BossUI from '../../../components/game/BossUI';

const BabylonScene = dynamic(
    () => import('../../../components/babylon/Scene'),
    { ssr: false }
);

const ZONE_NAMES: Record<string, string> = {
    z1: 'Phishing Forest',
    z2: 'Message Mirage',
    z3: 'Fake Shop Harbor',
    z4: 'Identity Rift',
};

export default function ZonePage() {
    const router = useRouter();
    const params = useParams();
    const zoneId = params.id as string;

    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showChat, setShowChat] = useState(false);

    // Quest state
    const [activeQuest, setActiveQuest] = useState<any>(null);
    const [questData, setQuestData] = useState<any>(null);

    // Boss state
    const [bossActive, setBossActive] = useState(false);
    const [bossData, setBossData] = useState<any>(null);

    // Player state
    const [playerProgress, setPlayerProgress] = useState({
        level: 1,
        xp: 25,
        xpToNext: 100,
        coins: 50,
    });

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            router.push('/');
            return;
        }

        setUser(JSON.parse(userData));
        setIsLoading(false);
    }, [router]);

    const handleQuestStart = (questId: string) => {
        // Mock quest data - in real app, fetch from server
        const mockQuests: Record<string, any> = {
            z1_q1: {
                id: 'z1_q1',
                name: 'Email Detective',
                questions: [
                    {
                        id: 'q1',
                        question: 'Email này từ "vietcombank-alerts@gmail.com" yêu cầu xác minh tài khoản. Đây là:',
                        options: [
                            { id: 'a', text: 'Email hợp lệ từ ngân hàng' },
                            { id: 'b', text: 'Email lừa đảo - Ngân hàng không dùng Gmail' },
                        ],
                    },
                    {
                        id: 'q2',
                        question: '"Bạn đã trúng thưởng 100 triệu! Click link để nhận ngay!" Email này là:',
                        options: [
                            { id: 'a', text: 'Thật - Ai không muốn trúng thưởng' },
                            { id: 'b', text: 'Lừa đảo - Trúng thưởng ngẫu nhiên không có thật' },
                        ],
                    },
                    {
                        id: 'q3',
                        question: 'Email có tiêu đề "URGENT: Account will be closed" từ địa chỉ lạ:',
                        options: [
                            { id: 'a', text: 'Hợp lệ - Cần hành động gấp' },
                            { id: 'b', text: 'Lừa đảo - Tạo áp lực tâm lý' },
                        ],
                    },
                ],
            },
        };

        setActiveQuest(questId);
        setQuestData(mockQuests[questId] || mockQuests.z1_q1);
    };

    const handleQuestComplete = (answers: Record<string, string>) => {
        // Calculate score
        const correctAnswers: Record<string, string> = {
            q1: 'b',
            q2: 'b',
            q3: 'b',
        };

        let correct = 0;
        Object.keys(answers).forEach(qId => {
            if (answers[qId] === correctAnswers[qId]) correct++;
        });

        const score = Math.round((correct / Object.keys(correctAnswers).length) * 100);

        if (score >= 60) {
            // Add XP
            const newXP = playerProgress.xp + 100;
            const levelUp = newXP >= playerProgress.xpToNext;

            setPlayerProgress({
                ...playerProgress,
                xp: levelUp ? newXP - playerProgress.xpToNext : newXP,
                level: levelUp ? playerProgress.level + 1 : playerProgress.level,
                coins: playerProgress.coins + 20,
            });

            alert(`🎉 Quest hoàn thành! Điểm: ${score}%\n+100 XP, +20 Coins`);
        } else {
            alert(`❌ Chưa đạt! Điểm: ${score}%\nCần ít nhất 60% để hoàn thành.`);
        }

        setActiveQuest(null);
        setQuestData(null);
    };

    const handleReturnToHub = () => {
        router.push('/hub');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl loading">Đang tải {ZONE_NAMES[zoneId] || 'Zone'}...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* 3D Scene */}
            <div className="game-canvas-container">
                <BabylonScene
                    sceneType="zone"
                    zoneId={zoneId}
                    userId={user?.id}
                    username={user?.username}
                    onReturnToHub={handleReturnToHub}
                />
            </div>

            {/* UI Overlay */}
            <div className="game-ui-overlay">
                {/* Zone Header */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                    <div className="game-panel px-8 py-3">
                        <h2 className="text-xl font-bold text-center">
                            🌲 {ZONE_NAMES[zoneId] || 'Zone'}
                        </h2>
                    </div>
                </div>

                {/* Top HUD */}
                <HUD
                    username={user?.username || 'Player'}
                    level={playerProgress.level}
                    xp={playerProgress.xp}
                    xpToNext={playerProgress.xpToNext}
                    coins={playerProgress.coins}
                    onProfileClick={() => { }}
                    onMenuClick={handleReturnToHub}
                />

                {/* Quest List (when no active quest) */}
                {!activeQuest && !bossActive && (
                    <div className="hud-left">
                        <div className="game-panel">
                            <h3 className="font-bold mb-4">📋 Nhiệm vụ Zone</h3>
                            <div className="space-y-2">
                                <button
                                    className="w-full text-left p-3 rounded bg-blue-500/20 hover:bg-blue-500/30 transition"
                                    onClick={() => handleQuestStart('z1_q1')}
                                >
                                    <div className="font-medium">Email Detective</div>
                                    <div className="text-sm text-gray-400">Dễ • 100 XP</div>
                                </button>
                                <button
                                    className="w-full text-left p-3 rounded bg-blue-500/20 hover:bg-blue-500/30 transition"
                                    onClick={() => handleQuestStart('z1_q2')}
                                >
                                    <div className="font-medium">Domain Hunter</div>
                                    <div className="text-sm text-gray-400">Dễ • 150 XP</div>
                                </button>
                                <button
                                    className="w-full text-left p-3 rounded bg-yellow-500/20 hover:bg-yellow-500/30 transition"
                                    onClick={() => handleQuestStart('z1_q3')}
                                >
                                    <div className="font-medium">Link Labyrinth</div>
                                    <div className="text-sm text-gray-400">Trung bình • 200 XP</div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Active Quest UI */}
                {activeQuest && questData && (
                    <QuestUI
                        quest={questData}
                        onComplete={handleQuestComplete}
                        onCancel={() => {
                            setActiveQuest(null);
                            setQuestData(null);
                        }}
                    />
                )}

                {/* Boss UI */}
                {bossActive && bossData && (
                    <BossUI
                        boss={bossData}
                        onAnswer={(phase, answerId) => { }}
                        onComplete={(success) => {
                            setBossActive(false);
                            if (success) {
                                setPlayerProgress({
                                    ...playerProgress,
                                    xp: playerProgress.xp + 500,
                                    coins: playerProgress.coins + 100,
                                });
                            }
                        }}
                    />
                )}

                {/* Chat */}
                {showChat && (
                    <div className="hud-right">
                        <ChatPanel
                            userId={user?.id}
                            username={user?.username}
                            channel={`zone:${zoneId}`}
                            onClose={() => setShowChat(false)}
                        />
                    </div>
                )}

                {/* Bottom Bar */}
                <div className="hud-bottom">
                    <button className="btn-game" onClick={handleReturnToHub}>
                        🏠 Về Hub
                    </button>
                    <button className="btn-game" onClick={() => setShowChat(!showChat)}>
                        💬 Chat
                    </button>
                </div>
            </div>

            {/* Controls Help */}
            <div className="fixed bottom-4 left-4 text-sm text-gray-400 bg-black/50 p-2 rounded">
                <div>WASD - Di chuyển</div>
                <div>E - Tương tác</div>
                <div>ESC - Menu</div>
            </div>
        </div>
    );
}
