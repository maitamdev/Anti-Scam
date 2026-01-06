// ==================== USER TYPES ====================

export interface User {
    id: string;
    email: string;
    username: string;
    role: 'USER' | 'MODERATOR' | 'ADMIN';
    createdAt: Date;
}

export interface UserProfile {
    id: string;
    userId: string;
    displayName: string | null;
    avatarId: string;
    titleId: string | null;
    bio: string | null;
}

export interface UserProgress {
    level: number;
    xp: number;
    coins: number;
    reputation: number;
    zonesUnlocked: string[];
}

// ==================== GAME TYPES ====================

export type ZoneId = 'hub' | 'z1' | 'z2' | 'z3' | 'z4';

export interface Position {
    x: number;
    y: number;
    z: number;
}

export interface PlayerState {
    id: string;
    username: string;
    level: number;
    avatarId: string;
    position: Position;
    rotation: number;
    animation: 'idle' | 'walk' | 'run';
}

export interface NPCState {
    id: string;
    name: string;
    position: Position;
    dialogId: string;
}

// ==================== QUEST TYPES ====================

export type QuestType = 'TUTORIAL' | 'PUZZLE' | 'COLLECTION' | 'BOSS';
export type QuestStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface Quest {
    id: string;
    zoneId: ZoneId;
    name: string;
    description: string;
    type: QuestType;
    difficulty: Difficulty;
    minLevel: number;
    xpReward: number;
    coinReward: number;
    badgeReward: string | null;
}

export interface QuestProgress {
    questId: string;
    status: QuestStatus;
    progress: number; // 0-100
    completedAt: Date | null;
}

export interface QuestData {
    // Puzzle quest data
    questions?: PuzzleQuestion[];
    // Collection quest data
    collectibles?: Collectible[];
    // Boss quest data
    phases?: BossPhase[];
}

export interface PuzzleQuestion {
    id: string;
    question: string;
    options: { id: string; text: string; isCorrect: boolean }[];
    explanation: string;
}

export interface Collectible {
    id: string;
    name: string;
    found: boolean;
}

export interface BossPhase {
    phase: number;
    question: string;
    options: { id: string; text: string }[];
    correctAnswerId: string;
    explanation: string;
    timeLimit: number;
}

// ==================== BADGE TYPES ====================

export type BadgeRarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

export interface Badge {
    id: string;
    name: string;
    description: string;
    iconId: string;
    rarity: BadgeRarity;
}

export interface UserBadge extends Badge {
    earnedAt: Date;
}

// ==================== SCAN TYPES ====================

export type ScanInputType = 'URL' | 'TEXT' | 'IMAGE';
export type RiskLevel = 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS' | 'CRITICAL';

export interface ScanResult {
    id: string;
    inputType: ScanInputType;
    riskScore: number;
    riskLevel: RiskLevel;
    reasons: string[];
    recommendations: string[];
    scannedAt: Date;
}

// ==================== CHAT TYPES ====================

export type ChatChannel =
    | 'hub:global'
    | `zone:${string}`
    | `party:${string}`
    | `whisper:${string}`;

export interface ChatMessage {
    id: string;
    channel: string;
    senderId: string;
    senderName: string;
    senderLevel: number;
    content: string;
    timestamp: Date;
    isSystem: boolean;
}

// ==================== PARTY TYPES ====================

export type PartyStatus = 'OPEN' | 'FULL' | 'IN_ZONE' | 'DISBANDED';

export interface Party {
    id: string;
    code: string;
    leaderId: string;
    currentZone: string | null;
    status: PartyStatus;
    members: PartyMember[];
}

export interface PartyMember {
    id: string;
    oderId: string;
    username: string;
    level: number;
    isLeader: boolean;
}

// ==================== API RESPONSE TYPES ====================

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface LoginResponse {
    user: User;
    tokens: AuthTokens;
}

export interface QuestCompleteResponse {
    success: boolean;
    rewards: {
        xp: number;
        coins: number;
        badge: Badge | null;
    };
    newProgress: {
        level: number;
        xp: number;
        coins: number;
    };
    levelUp: boolean;
}

// ==================== COLYSEUS MESSAGE TYPES ====================

export interface MoveData {
    x: number;
    y: number;
    z: number;
    rotation: number;
    animation: 'idle' | 'walk' | 'run';
}

export interface InteractData {
    targetId: string;
    interactionType: 'talk' | 'use' | 'open';
}

export interface EnterPortalData {
    zoneId: ZoneId;
    partyId?: string;
}

// ==================== SOCKET.IO EVENT TYPES ====================

export interface ChatSendData {
    channel: string;
    content: string;
}

export interface PresenceUpdateData {
    status: 'online' | 'away' | 'busy' | 'invisible';
    location?: string;
}
