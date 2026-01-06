import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { setupChatNamespace } from './namespaces/chat';
import { setupPresenceNamespace } from './namespaces/presence';
import { setupNotificationsNamespace } from './namespaces/notifications';

const port = Number(process.env.SOCIAL_SERVER_PORT) || 3001;

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const httpServer = createServer(app);

// Create Socket.IO server
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

// User tracking for presence
const onlineUsers = new Map<string, {
    oderId: string;
    username: string;
    location: string;
    status: string;
}>();

// Setup namespaces
setupChatNamespace(io, onlineUsers);
setupPresenceNamespace(io, onlineUsers);
setupNotificationsNamespace(io);

httpServer.listen(port, () => {
    console.log(`💬 Social Server running on http://localhost:${port}`);
});

export { io, onlineUsers };
