import { Schema, MapSchema, ArraySchema, type } from '@colyseus/schema';

// ==================== PLAYER STATE ====================

export class PlayerState extends Schema {
    @type('string') id: string = '';
    @type('string') oderId: string = '';
    @type('string') username: string = '';
    @type('number') level: number = 1;
    @type('string') avatarId: string = 'default_avatar';

    @type('number') x: number = 0;
    @type('number') y: number = 0;
    @type('number') z: number = 0;
    @type('number') rotation: number = 0;
    @type('string') animation: string = 'idle';
}

// ==================== NPC STATE ====================

export class NPCState extends Schema {
    @type('string') id: string = '';
    @type('string') name: string = '';
    @type('number') x: number = 0;
    @type('number') y: number = 0;
    @type('number') z: number = 0;
    @type('string') dialogId: string = '';
}

// ==================== HUB STATE ====================

export class HubState extends Schema {
    @type({ map: PlayerState }) players = new MapSchema<PlayerState>();
    @type([NPCState]) npcs = new ArraySchema<NPCState>();
    @type('number') playerCount: number = 0;
}

// ==================== QUEST STATE ====================

export class QuestState extends Schema {
    @type('string') questId: string = '';
    @type('string') status: string = 'active'; // active, completed, failed
    @type('number') progress: number = 0;
    @type(['string']) completedByPlayers = new ArraySchema<string>();
}

// ==================== BOSS STATE ====================

export class BossState extends Schema {
    @type('string') bossId: string = '';
    @type('string') bossName: string = '';
    @type('number') currentPhase: number = 0;
    @type('number') totalPhases: number = 5;
    @type('boolean') isActive: boolean = false;
    @type({ map: 'boolean' }) playerReady = new MapSchema<boolean>();
    @type({ map: 'number' }) playerScores = new MapSchema<number>();
}

// ==================== ZONE STATE ====================

export class ZoneState extends Schema {
    @type('string') zoneId: string = '';
    @type({ map: PlayerState }) players = new MapSchema<PlayerState>();
    @type({ map: QuestState }) activeQuests = new MapSchema<QuestState>();
    @type(BossState) boss: BossState = new BossState();
    @type('boolean') isCompleted: boolean = false;
}
