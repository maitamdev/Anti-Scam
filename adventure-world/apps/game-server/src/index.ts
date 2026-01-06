import 'dotenv/config';
import { Server } from '@colyseus/core';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { monitor } from '@colyseus/monitor';
import express from 'express';
import cors from 'cors';

import { HubRoom } from './rooms/HubRoom';
import { ZoneRoom } from './rooms/ZoneRoom';

const port = Number(process.env.GAME_SERVER_PORT) || 2567;

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Colyseus monitor (development only)
if (process.env.NODE_ENV !== 'production') {
    app.use('/colyseus', monitor());
}

// Create game server
const gameServer = new Server({
    transport: new WebSocketTransport({
        server: app.listen(port),
    }),
});

// Register rooms
gameServer.define('hub', HubRoom);
gameServer.define('zone', ZoneRoom);

console.log(`🎮 Game Server running on ws://localhost:${port}`);
console.log(`📊 Monitor available at http://localhost:${port}/colyseus`);
