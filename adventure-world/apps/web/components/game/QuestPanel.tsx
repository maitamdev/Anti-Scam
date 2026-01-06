'use client';

interface Quest {
    id: string;
    name: string;
    zone: string;
    status: 'available' | 'in_progress' | 'completed' | 'locked';
}

interface QuestPanelProps {
    quests: Quest[];
    onQuestClick: (questId: string) => void;
}

export default function QuestPanel({ quests, onQuestClick }: QuestPanelProps) {
    const statusIcons = {
        available: '📋',
        in_progress: '⏳',
        completed: '✅',
        locked: '🔒',
    };

    const statusColors = {
        available: 'bg-blue-500/20 hover:bg-blue-500/30',
        in_progress: 'bg-yellow-500/20',
        completed: 'bg-green-500/20',
        locked: 'bg-gray-500/20 opacity-50',
    };

    return (
        <div className="game-panel">
            <h3 className="font-bold mb-4">📋 Nhiệm Vụ</h3>

            <div className="space-y-2">
                {quests.map((quest) => (
                    <button
                        key={quest.id}
                        className={`w-full text-left p-3 rounded transition ${statusColors[quest.status]}`}
                        onClick={() => quest.status !== 'locked' && onQuestClick(quest.id)}
                        disabled={quest.status === 'locked'}
                    >
                        <div className="flex items-center gap-2">
                            <span>{statusIcons[quest.status]}</span>
                            <div className="flex-1">
                                <div className="font-medium">{quest.name}</div>
                                <div className="text-xs text-gray-400">{quest.zone}</div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {quests.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                    Không có nhiệm vụ nào
                </div>
            )}
        </div>
    );
}
