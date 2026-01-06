'use client';

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface ChatMessage {
    id: string;
    senderId: string;
    senderName: string;
    senderLevel: number;
    content: string;
    timestamp: Date;
    isSystem: boolean;
}

interface ChatPanelProps {
    userId: string;
    username: string;
    channel: string;
    onClose: () => void;
}

export default function ChatPanel({ userId, username, channel, onClose }: ChatPanelProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [rateLimited, setRateLimited] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Connect to social server
        const socket = io(process.env.NEXT_PUBLIC_SOCIAL_SERVER_URL || 'http://localhost:3001', {
            path: '/socket.io',
            transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
            console.log('Chat connected');
            setIsConnected(true);

            // Authenticate
            socket.emit('auth', { userId, username, level: 1 });

            // Join channel
            socket.emit('join_channel', channel);
        });

        socket.on('disconnect', () => {
            console.log('Chat disconnected');
            setIsConnected(false);
        });

        socket.on('channel_joined', (data: { channel: string; recentMessages: ChatMessage[] }) => {
            setMessages(data.recentMessages || []);
        });

        socket.on('message', (message: ChatMessage) => {
            setMessages(prev => [...prev, message]);
        });

        socket.on('rate_limited', (data: { waitSeconds: number }) => {
            setRateLimited(true);
            setTimeout(() => setRateLimited(false), data.waitSeconds * 1000);
        });

        socket.on('message_blocked', (data: { reason: string }) => {
            alert(`Tin nhắn bị chặn: ${data.reason}`);
        });

        socketRef.current = socket;

        return () => {
            socket.emit('leave_channel', channel);
            socket.disconnect();
        };
    }, [userId, username, channel]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim() || !socketRef.current || rateLimited) return;

        socketRef.current.emit('send_message', {
            channel,
            content: input.trim(),
        });

        setInput('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="game-panel flex flex-col h-[400px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">💬 Chat</h3>
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                    <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
                </div>
            </div>

            {/* Channel indicator */}
            <div className="text-xs text-gray-400 mb-2">
                {channel === 'hub:global' ? '🌍 Hub Global' : `📍 ${channel}`}
            </div>

            {/* Messages */}
            <div className="chat-messages flex-1">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                        Chưa có tin nhắn nào
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`chat-message ${msg.isSystem ? 'bg-blue-500/20' : ''}`}
                        >
                            {!msg.isSystem && (
                                <span className="sender">{msg.senderName}</span>
                            )}
                            <span className={msg.isSystem ? 'text-blue-300 italic' : ''}>
                                {msg.isSystem ? msg.content : `: ${msg.content}`}
                            </span>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="mt-3">
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="chat-input flex-1"
                        placeholder={rateLimited ? 'Đợi một chút...' : 'Nhập tin nhắn...'}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={rateLimited}
                        maxLength={500}
                    />
                    <button
                        className="btn-game px-4"
                        onClick={sendMessage}
                        disabled={rateLimited || !input.trim()}
                    >
                        Gửi
                    </button>
                </div>
                {rateLimited && (
                    <div className="text-xs text-yellow-400 mt-1">
                        ⏳ Bạn đang gửi tin quá nhanh
                    </div>
                )}
            </div>
        </div>
    );
}
