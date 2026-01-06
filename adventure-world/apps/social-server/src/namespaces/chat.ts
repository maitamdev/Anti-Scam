import { Server, Socket } from 'socket.io';
import { filterContent, maskLinks } from '@adventure/shared';

interface ChatMessage {
    id: string;
    channel: string;
    senderId: string;
    senderName: string;
    senderLevel: number;
    content: string;
    timestamp: Date;
    isSystem: boolean;
}

// Rate limiting
const userMessageTimestamps = new Map<string, number[]>();
const RATE_LIMIT_MESSAGES = 5;
const RATE_LIMIT_WINDOW = 10000; // 10 seconds

function checkRateLimit(userId: string): boolean {
    const now = Date.now();
    const timestamps = userMessageTimestamps.get(userId) || [];

    // Remove old timestamps
    const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);

    if (recentTimestamps.length >= RATE_LIMIT_MESSAGES) {
        return false;
    }

    recentTimestamps.push(now);
    userMessageTimestamps.set(userId, recentTimestamps);
    return true;
}

export function setupChatNamespace(
    io: Server,
    onlineUsers: Map<string, any>
) {
    const chatNamespace = io.of('/chat');

    // Store recent messages per channel
    const channelMessages = new Map<string, ChatMessage[]>();
    const MAX_MESSAGES_PER_CHANNEL = 100;

    chatNamespace.on('connection', (socket: Socket) => {
        console.log('Chat client connected:', socket.id);

        // User info from auth
        let userId = '';
        let username = '';
        let userLevel = 1;

        // Authenticate
        socket.on('auth', (data: { userId: string; username: string; level: number }) => {
            userId = data.userId;
            username = data.username;
            userLevel = data.level;
            console.log(`Chat authenticated: ${username}`);
        });

        // Join channel
        socket.on('join_channel', (channel: string) => {
            socket.join(channel);
            console.log(`${username} joined channel: ${channel}`);

            // Send recent messages
            const recentMessages = channelMessages.get(channel) || [];
            socket.emit('channel_joined', {
                channel,
                recentMessages: recentMessages.slice(-20),
            });
        });

        // Leave channel
        socket.on('leave_channel', (channel: string) => {
            socket.leave(channel);
            console.log(`${username} left channel: ${channel}`);
        });

        // Send message
        socket.on('send_message', (data: { channel: string; content: string }) => {
            if (!userId || !username) {
                socket.emit('error', { message: 'Not authenticated' });
                return;
            }

            // Rate limiting
            if (!checkRateLimit(userId)) {
                socket.emit('rate_limited', { waitSeconds: 5 });
                return;
            }

            // Content filtering
            const filtered = filterContent(data.content);

            if (filtered.violations.includes('scam_pattern')) {
                socket.emit('message_blocked', {
                    reason: 'Nội dung có dấu hiệu lừa đảo',
                });
                return;
            }

            // Mask links
            const maskedContent = maskLinks(filtered.cleaned);

            const message: ChatMessage = {
                id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                channel: data.channel,
                senderId: userId,
                senderName: username,
                senderLevel: userLevel,
                content: maskedContent,
                timestamp: new Date(),
                isSystem: false,
            };

            // Store message
            const messages = channelMessages.get(data.channel) || [];
            messages.push(message);
            if (messages.length > MAX_MESSAGES_PER_CHANNEL) {
                messages.shift();
            }
            channelMessages.set(data.channel, messages);

            // Broadcast to channel
            chatNamespace.to(data.channel).emit('message', message);
        });

        // Typing indicator
        socket.on('typing_start', (channel: string) => {
            socket.to(channel).emit('user_typing', {
                channel,
                userId,
                username,
            });
        });

        socket.on('typing_stop', (channel: string) => {
            socket.to(channel).emit('user_stopped_typing', {
                channel,
                userId,
            });
        });

        socket.on('disconnect', () => {
            console.log('Chat client disconnected:', socket.id);
        });
    });

    return chatNamespace;
}
