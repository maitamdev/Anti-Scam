// ==================== GAME CONSTANTS ====================

export const ZONES = {
    HUB: 'hub',
    Z1: 'z1', // Phishing Forest
    Z2: 'z2', // Message Mirage
    Z3: 'z3', // Fake Shop Harbor
    Z4: 'z4', // Identity Rift
} as const;

export const ZONE_NAMES: Record<string, string> = {
    hub: 'Hub World',
    z1: 'Phishing Forest',
    z2: 'Message Mirage',
    z3: 'Fake Shop Harbor',
    z4: 'Identity Rift',
};

// ==================== XP & LEVEL ====================

export const XP_PER_LEVEL = [
    0,     // Level 1 (start)
    100,   // Level 2
    200,   // Level 3
    300,   // Level 4
    400,   // Level 5
    500,   // Level 6
    600,   // Level 7
    700,   // Level 8
    800,   // Level 9
    1000,  // Level 10
    // After level 10, use formula
];

export function getXPForLevel(level: number): number {
    if (level <= 10) return XP_PER_LEVEL[level] || 0;
    if (level <= 25) return 1000 + (level - 10) * 250;
    if (level <= 50) return 4750 + (level - 25) * 500;
    if (level <= 75) return 17250 + (level - 50) * 1000;
    return 42250 + (level - 75) * 2000;
}

export function getLevelFromXP(totalXP: number): number {
    let level = 1;
    let xpNeeded = 0;

    while (xpNeeded <= totalXP && level < 100) {
        level++;
        xpNeeded = getXPForLevel(level);
    }

    return level - 1;
}

// ==================== QUEST REWARDS ====================

export const QUEST_REWARDS = {
    EASY: { xp: 100, coins: 20 },
    MEDIUM: { xp: 200, coins: 40 },
    HARD: { xp: 500, coins: 100 },
} as const;

// ==================== RATE LIMITS ====================

export const RATE_LIMITS = {
    CHAT_HUB_GLOBAL: { messages: 1, windowMs: 5000 },
    CHAT_ZONE: { messages: 1, windowMs: 3000 },
    CHAT_PARTY: { messages: 1, windowMs: 1000 },
    CHAT_WHISPER: { messages: 1, windowMs: 2000 },
    SCAN_URL: { requests: 10, windowMs: 60000 },
    REPORT: { requests: 5, windowMs: 3600000 },
} as const;

// ==================== RISK LEVELS ====================

export const RISK_THRESHOLDS = {
    SAFE: { min: 0, max: 20, color: '#10B981', label: 'An toàn' },
    SUSPICIOUS: { min: 21, max: 50, color: '#F59E0B', label: 'Đáng ngờ' },
    DANGEROUS: { min: 51, max: 80, color: '#F97316', label: 'Nguy hiểm' },
    CRITICAL: { min: 81, max: 100, color: '#EF4444', label: 'Rất nguy hiểm' },
} as const;

export function getRiskLevel(score: number): keyof typeof RISK_THRESHOLDS {
    if (score <= 20) return 'SAFE';
    if (score <= 50) return 'SUSPICIOUS';
    if (score <= 80) return 'DANGEROUS';
    return 'CRITICAL';
}

// ==================== BADGE IDs ====================

export const BADGE_IDS = {
    FIRST_STEPS: 'first_steps',
    FOREST_EXPLORER: 'forest_explorer',
    DESERT_WANDERER: 'desert_wanderer',
    HARBOR_MASTER: 'harbor_master',
    RIFT_WALKER: 'rift_walker',
    PHISHING_EXPERT: 'phishing_expert',
    SCANNER_PRO: 'scanner_pro',
    COMMUNITY_HERO: 'community_hero',
} as const;

// ==================== SERVER PORTS ====================

export const PORTS = {
    WEB: 3000,
    GAME_SERVER: 2567,
    SOCIAL_SERVER: 3001,
} as const;
