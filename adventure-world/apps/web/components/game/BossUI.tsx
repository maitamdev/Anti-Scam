'use client';

import { useState } from 'react';

interface BossPhase {
    question: string;
    options: { id: string; text: string }[];
}

interface BossUIProps {
    boss: {
        id: string;
        name: string;
        phases: BossPhase[];
    };
    onAnswer: (phase: number, answerId: string) => void;
    onComplete: (success: boolean) => void;
}

export default function BossUI({ boss, onAnswer, onComplete }: BossUIProps) {
    const [currentPhase, setCurrentPhase] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [showResult, setShowResult] = useState(false);
    const [lastResult, setLastResult] = useState<{ correct: boolean; explanation: string } | null>(null);

    const totalPhases = boss.phases?.length || 5;
    const phase = boss.phases?.[currentPhase];

    const handleAnswer = (answerId: string) => {
        // Mock correct answer check
        const correct = answerId === 'a' || answerId === 'b';

        setLastResult({
            correct,
            explanation: correct
                ? 'Chính xác! Bạn đã nhận ra dấu hiệu lừa đảo.'
                : 'Chưa đúng. Hãy chú ý kỹ hơn các dấu hiệu.',
        });

        if (correct) setScore(score + 1);

        setShowResult(true);

        setTimeout(() => {
            setShowResult(false);
            if (currentPhase < totalPhases - 1) {
                setCurrentPhase(currentPhase + 1);
                setTimeLeft(30);
            } else {
                onComplete(score >= 3);
            }
        }, 2500);

        onAnswer(currentPhase, answerId);
    };

    if (!phase) {
        return (
            <div className="modal-overlay">
                <div className="modal-content text-center">
                    <h2 className="text-3xl font-bold mb-4">⚔️ {boss.name}</h2>
                    <p className="mb-6">Đang tải trận đấu boss...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content max-w-3xl relative">
                {/* Boss header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-red-400 mb-2">⚔️ {boss.name}</h2>
                    <div className="flex justify-center items-center gap-4">
                        <span className="text-gray-400">Phase {currentPhase + 1}/{totalPhases}</span>
                        <span className="text-yellow-400">⭐ Score: {score}</span>
                    </div>
                </div>

                {/* Timer bar */}
                <div className="mb-6">
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-red-500 transition-all duration-1000"
                            style={{ width: `${(timeLeft / 30) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Result overlay */}
                {showResult && lastResult && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg z-10">
                        <div className="text-center p-8">
                            <div className={`text-6xl mb-4 ${lastResult.correct ? 'text-green-400' : 'text-red-400'}`}>
                                {lastResult.correct ? '✓' : '✗'}
                            </div>
                            <p className="text-xl mb-2">
                                {lastResult.correct ? 'Chính xác!' : 'Sai rồi!'}
                            </p>
                            <p className="text-gray-400">{lastResult.explanation}</p>
                        </div>
                    </div>
                )}

                {/* Question */}
                <div className="mb-6">
                    <h3 className="text-xl mb-6 text-center">{phase.question}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {phase.options.map((option) => (
                            <button
                                key={option.id}
                                className="p-4 rounded-lg border-2 border-gray-600 hover:border-blue-500 hover:bg-blue-500/20 transition text-left"
                                onClick={() => !showResult && handleAnswer(option.id)}
                                disabled={showResult}
                            >
                                <span className="mr-2 font-bold text-blue-400">
                                    {option.id.toUpperCase()}.
                                </span>
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tips */}
                <div className="text-center text-sm text-gray-400">
                    💡 Chọn câu trả lời đúng để đánh bại Boss
                </div>
            </div>
        </div>
    );
}
