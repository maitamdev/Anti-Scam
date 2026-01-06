import { Room, Client } from '@colyseus/core';
import { HubState, PlayerState, NPCState } from '../schemas/GameState';

interface JoinOptions {
    userId: string;
    username: string;
    level: number;
    avatarId: string;
}

export class HubRoom extends Room<HubState> {
    maxClients = 100;

    onCreate() {
        this.setState(new HubState());

        // Add NPCs
        this.addNPCs();

        // Handle movement
        this.onMessage('move', (client, data) => {
            const player = this.state.players.get(client.sessionId);
            if (player) {
                player.x = data.x;
                player.y = data.y;
                player.z = data.z;
                player.rotation = data.rotation;
                player.animation = data.animation || 'idle';
            }
        });

        // Handle interaction
        this.onMessage('interact', (client, data) => {
            const npc = this.state.npcs.find(n => n.id === data.targetId);
            if (npc) {
                // Send dialog to client
                client.send('npc_dialog', {
                    npcId: npc.id,
                    dialogId: npc.dialogId,
                });
            }
        });

        // Handle portal entry
        this.onMessage('enter_portal', (client, data) => {
            client.send('zone_transfer', {
                zoneId: data.zoneId,
                partyId: data.partyId,
            });
        });

        console.log('Hub room created!');
    }

    onJoin(client: Client, options: JoinOptions) {
        console.log(`${options.username} joined Hub`);

        const player = new PlayerState();
        player.id = client.sessionId;
        player.oderId = options.userId;
        player.username = options.username;
        player.level = options.level || 1;
        player.avatarId = options.avatarId || 'default_avatar';

        // Spawn at plaza center
        player.x = 0;
        player.y = 0;
        player.z = 0;

        this.state.players.set(client.sessionId, player);
        this.state.playerCount = this.state.players.size;

        // Notify others
        this.broadcast('player_joined', {
            id: player.id,
            username: player.username,
            level: player.level,
        }, { except: client });
    }

    onLeave(client: Client) {
        const player = this.state.players.get(client.sessionId);
        if (player) {
            console.log(`${player.username} left Hub`);
            this.broadcast('player_left', { id: client.sessionId });
        }

        this.state.players.delete(client.sessionId);
        this.state.playerCount = this.state.players.size;
    }

    onDispose() {
        console.log('Hub room disposed');
    }

    private addNPCs() {
        // Tutorial Guide
        const guide = new NPCState();
        guide.id = 'npc_guide';
        guide.name = 'Guardian Owl';
        guide.x = 5;
        guide.y = 0;
        guide.z = 0;
        guide.dialogId = 'tutorial_intro';
        this.state.npcs.push(guide);

        // Quest Board NPC
        const questMaster = new NPCState();
        questMaster.id = 'npc_quest_master';
        questMaster.name = 'Quest Master';
        questMaster.x = -5;
        questMaster.y = 0;
        questMaster.z = 5;
        questMaster.dialogId = 'quest_board';
        this.state.npcs.push(questMaster);

        // Scan Center NPC
        const scanner = new NPCState();
        scanner.id = 'npc_scanner';
        scanner.name = 'Scanner';
        scanner.x = 10;
        scanner.y = 0;
        scanner.z = -5;
        scanner.dialogId = 'scan_center';
        this.state.npcs.push(scanner);
    }
}
