'use client';

import { useState } from 'react';

interface Question {
    id: string;
    question: string;
    options: { id: string; text: string }[];
}

interface QuestUIProps {
    quest: {
        id: string;
        name: string;
        questions: Question[];
    };
    onComplete: (answers: Record<string, string>) => void;
    onCancel: () => void;
}

export default function QuestUI({ quest, onComplete, onCancel }: QuestUIProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const question = quest.questions[currentQuestion];
    const totalQuestions = quest.questions.length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    const handleNext = () => {
        if (!selectedOption) return;

        const newAnswers = { ...answers, [question.id]: selectedOption };
        setAnswers(newAnswers);

        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
        } else {
            onComplete(newAnswers);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content max-w-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{quest.name}</h2>
                    <button onClick={onCancel} className="text-gray-400 hover:text-white text-2xl">
                        ✕
                    </button>
                </div>

                {/* Progress */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                        <span>Câu hỏi {currentQuestion + 1}/{totalQuestions}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question */}
                <div className="mb-6">
                    <h3 className="text-xl mb-4">{question.question}</h3>

                    <div className="space-y-3">
                        {question.options.map((option) => (
                            <button
                                key={option.id}
                                className={`w-full text-left p-4 rounded-lg border-2 transition ${selectedOption === option.id
                                        ? 'border-blue-500 bg-blue-500/20'
                                        : 'border-gray-600 hover:border-gray-500'
                                    }`}
                                onClick={() => setSelectedOption(option.id)}
                            >
                                <span className="mr-3 font-bold text-blue-400">
                                    {option.id.toUpperCase()}.
                                </span>
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between">
                    <button
                        className="px-6 py-3 rounded-lg bg-gray-600 hover:bg-gray-500 transition"
                        onClick={onCancel}
                    >
                        Hủy bỏ
                    </button>

                    <button
                        className={`btn-game px-8 ${!selectedOption ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleNext}
                        disabled={!selectedOption}
                    >
                        {currentQuestion < totalQuestions - 1 ? 'Tiếp theo →' : 'Hoàn thành ✓'}
                    </button>
                </div>
            </div>
        </div>
    );
}
