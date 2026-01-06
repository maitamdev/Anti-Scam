import { Server, Socket } from 'socket.io';

interface Notification {
    id: string;
    type: 'achievement' | 'reward' | 'system' | 'social' | 'moderation';
    title: string;
    message: string;
    icon?: string;
    createdAt: Date;
}

// User socket mapping for targeted notifications
const userSockets = new Map<string, Socket>();

export function setupNotificationsNamespace(io: Server) {
    const notificationNamespace = io.of('/notifications');

    notificationNamespace.on('connection', (socket: Socket) => {
        console.log('Notifications client connected:', socket.id);

        let userId = '';

        // Register for notifications
        socket.on('register', (data: { userId: string }) => {
            userId = data.userId;
            userSockets.set(userId, socket);
            console.log(`Notifications registered for user: ${userId}`);
        });

        socket.on('disconnect', () => {
            if (userId) {
                userSockets.delete(userId);
            }
            console.log('Notifications client disconnected:', socket.id);
        });
    });

    // Helper to send notification to specific user
    function sendToUser(userId: string, event: string, data: any) {
        const socket = userSockets.get(userId);
        if (socket) {
            socket.emit(event, data);
        }
    }

    // Export helper functions
    return {
        namespace: notificationNamespace,

        sendNotification: (userId: string, notification: Omit<Notification, 'id' | 'createdAt'>) => {
            sendToUser(userId, 'notification', {
                ...notification,
                id: `notif_${Date.now()}`,
                createdAt: new Date(),
            });
        },

        sendBadgeEarned: (userId: string, badge: { id: string; name: string; iconId: string; rarity: string }) => {
            sendToUser(userId, 'badge_earned', { badge });
        },

        sendLevelUp: (userId: string, newLevel: number, unlockedFeatures: string[] = []) => {
            sendToUser(userId, 'level_up', { newLevel, unlockedFeatures });
        },

        sendPartyInvite: (userId: string, partyId: string, inviterId: string, inviterName: string) => {
            sendToUser(userId, 'party_invite', { partyId, inviterId, inviterName });
        },

        broadcastSystemMessage: (message: string) => {
            notificationNamespace.emit('notification', {
                id: `notif_${Date.now()}`,
                type: 'system',
                title: 'Thông báo hệ thống',
                message,
                createdAt: new Date(),
            });
        },
    };
}
