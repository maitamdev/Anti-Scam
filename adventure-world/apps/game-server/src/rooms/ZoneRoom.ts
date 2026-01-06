import { Room, Client } from '@colyseus/core';
import { ZoneState, PlayerState, QuestState, BossState } from '../schemas/GameState';
import { QUESTS_Z1 } from '../data/quests';

interface JoinOptions {
    oderId: string;
    username: string;
    level: number;
    avatarId: string;
    zoneId: string;
    partyId?: string;
}

interface QuestAnswer {
    questId: string;
    answers: Record<string, string>;
}

export class ZoneRoom extends Room<ZoneState> {
    maxClients = 4;
    private questData: Map<string, any> = new Map();

    onCreate(options: { zoneId: string }) {
        this.setState(new ZoneState());
        this.state.zoneId = options.zoneId || 'z1';

        // Load quest data for this zone
        this.loadQuestData();

        // Movement handler
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

        // Quest start
        this.onMessage('quest_start', (client, data) => {
            this.startQuest(client, data.questId);
        });

        // Quest answer
        this.onMessage('quest_answer', (client, data: QuestAnswer) => {
            this.handleQuestAnswer(client, data);
        });

        // Boss ready
        this.onMessage('boss_ready', (client) => {
            this.state.boss.playerReady.set(client.sessionId, true);
            this.checkBossStart();
        });

        // Boss answer
        this.onMessage('boss_answer', (client, data) => {
            this.handleBossAnswer(client, data.phase, data.answerId);
        });

        console.log(`Zone ${this.state.zoneId} room created!`);
    }

    onJoin(client: Client, options: JoinOptions) {
        console.log(`${options.username} joined Zone ${this.state.zoneId}`);

        const player = new PlayerState();
        player.id = client.sessionId;
        player.oderId = options.oderId;
        player.username = options.username;
        player.level = options.level || 1;
        player.avatarId = options.avatarId || 'default_avatar';

        // Zone spawn point
        player.x = 0;
        player.y = 0;
        player.z = -10;

        this.state.players.set(client.sessionId, player);

        // Send zone init data
        client.send('zone_init', {
            zoneId: this.state.zoneId,
            quests: this.getAvailableQuests(),
        });

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
            console.log(`${player.username} left Zone ${this.state.zoneId}`);
            this.broadcast('player_left', { id: client.sessionId });
        }

        this.state.players.delete(client.sessionId);
        this.state.boss.playerReady.delete(client.sessionId);
        this.state.boss.playerScores.delete(client.sessionId);
    }

    onDispose() {
        console.log(`Zone ${this.state.zoneId} room disposed`);
    }

    private loadQuestData() {
        // Load Z1 quests
        if (this.state.zoneId === 'z1') {
            QUESTS_Z1.forEach(quest => {
                this.questData.set(quest.id, quest);
            });
        }
    }

    private getAvailableQuests() {
        return Array.from(this.questData.values()).map(q => ({
            id: q.id,
            name: q.name,
            description: q.description,
            difficulty: q.difficulty,
            xpReward: q.xpReward,
            coinReward: q.coinReward,
        }));
    }

    private startQuest(client: Client, questId: string) {
        const quest = this.questData.get(questId);
        if (!quest) return;

        const questState = new QuestState();
        questState.questId = questId;
        questState.status = 'active';
        questState.progress = 0;

        this.state.activeQuests.set(questId, questState);

        // Send quest data to client
        client.send('quest_started', {
            questId,
            questData: quest.data,
        });

        this.broadcast('quest_progress', {
            questId,
            status: 'started',
            startedBy: client.sessionId,
        });
    }

    private handleQuestAnswer(client: Client, data: QuestAnswer) {
        const quest = this.questData.get(data.questId);
        const questState = this.state.activeQuests.get(data.questId);

        if (!quest || !questState) return;

        // Validate answers
        let correctCount = 0;
        const totalQuestions = quest.data.questions.length;

        for (const question of quest.data.questions) {
            const userAnswer = data.answers[question.id];
            const correctOption = question.options.find((o: any) => o.isCorrect);
            if (userAnswer === correctOption?.id) {
                correctCount++;
            }
        }

        const progress = Math.round((correctCount / totalQuestions) * 100);
        questState.progress = progress;

        if (progress >= 60) {
            // Quest completed
            questState.status = 'completed';
            questState.completedByPlayers.push(client.sessionId);

            client.send('quest_completed', {
                questId: data.questId,
                success: true,
                score: progress,
                rewards: {
                    xp: quest.xpReward,
                    coins: quest.coinReward,
                    badge: quest.badgeReward,
                },
            });
        } else {
            // Quest failed, can retry
            client.send('quest_failed', {
                questId: data.questId,
                score: progress,
                message: 'Chưa đạt! Cần đúng ít nhất 60% để hoàn thành.',
            });
        }
    }

    private checkBossStart() {
        const readyCount = Array.from(this.state.boss.playerReady.values()).filter(r => r).length;
        const totalPlayers = this.state.players.size;

        // Start if all players ready or at least 1 player after 10s
        if (readyCount === totalPlayers && totalPlayers > 0) {
            this.startBoss();
        }
    }

    private startBoss() {
        this.state.boss.isActive = true;
        this.state.boss.currentPhase = 1;
        this.state.boss.bossId = `boss_${this.state.zoneId}`;
        this.state.boss.bossName = this.getBossName();

        this.broadcast('boss_started', {
            bossId: this.state.boss.bossId,
            bossName: this.state.boss.bossName,
            totalPhases: this.state.boss.totalPhases,
        });

        // Send first phase
        this.sendBossPhase(1);
    }

    private getBossName(): string {
        const names: Record<string, string> = {
            z1: 'Phishing King',
            z2: 'Mirage Caller',
            z3: 'Captain Fake Deal',
            z4: 'The Impersonator',
        };
        return names[this.state.zoneId] || 'Boss';
    }

    private sendBossPhase(phase: number) {
        const phaseData = this.getBossPhaseData(phase);

        this.broadcast('boss_phase', {
            phase,
            question: phaseData.question,
            options: phaseData.options,
            timeLimit: 30,
        });
    }

    private getBossPhaseData(phase: number) {
        // Z1 Phishing King phases
        const phases = [
            {
                question: 'Email này có phải lừa đảo không? "Tài khoản của bạn sẽ bị khóa trong 24h nếu không xác minh ngay!"',
                options: [
                    { id: 'a', text: 'Có - Tạo áp lực thời gian' },
                    { id: 'b', text: 'Không - Ngân hàng thường gửi email như vậy' },
                ],
                correctId: 'a',
                explanation: 'Email lừa đảo thường tạo áp lực thời gian để bạn hành động vội vàng.',
            },
            {
                question: 'Địa chỉ email nào đáng tin cậy hơn?',
                options: [
                    { id: 'a', text: 'support@vietcombank.com.vn' },
                    { id: 'b', text: 'vietcombank-support@gmail.com' },
                ],
                correctId: 'a',
                explanation: 'Ngân hàng chính thống dùng domain riêng, không dùng Gmail.',
            },
            {
                question: 'Link nào có vẻ an toàn?',
                options: [
                    { id: 'a', text: 'https://vietcombank.com.vn/login' },
                    { id: 'b', text: 'https://vietcombank-secure-login.xyz/verify' },
                ],
                correctId: 'a',
                explanation: 'Domain .xyz và từ khóa như "secure-login" thường là dấu hiệu lừa đảo.',
            },
            {
                question: 'Bạn nhận được email yêu cầu cung cấp OTP. Bạn nên làm gì?',
                options: [
                    { id: 'a', text: 'Cung cấp ngay vì email từ ngân hàng' },
                    { id: 'b', text: 'Không cung cấp - Ngân hàng không bao giờ hỏi OTP qua email' },
                ],
                correctId: 'b',
                explanation: 'Ngân hàng KHÔNG BAO GIỜ yêu cầu OTP qua email hoặc điện thoại.',
            },
            {
                question: 'Email có lỗi chính tả và ngữ pháp. Đây có phải dấu hiệu lừa đảo?',
                options: [
                    { id: 'a', text: 'Có - Tổ chức chuyên nghiệp không mắc lỗi như vậy' },
                    { id: 'b', text: 'Không - Ai cũng có thể mắc lỗi chính tả' },
                ],
                correctId: 'a',
                explanation: 'Lỗi chính tả/ngữ pháp là dấu hiệu phổ biến của email lừa đảo.',
            },
        ];

        return phases[phase - 1] || phases[0];
    }

    private handleBossAnswer(client: Client, phase: number, answerId: string) {
        const phaseData = this.getBossPhaseData(phase);
        const isCorrect = answerId === phaseData.correctId;

        // Update score
        const currentScore = this.state.boss.playerScores.get(client.sessionId) || 0;
        if (isCorrect) {
            this.state.boss.playerScores.set(client.sessionId, currentScore + 1);
        }

        // Send result
        client.send('boss_phase_result', {
            phase,
            correct: isCorrect,
            correctAnswerId: phaseData.correctId,
            explanation: phaseData.explanation,
        });

        // Check if phase complete for all players
        // For simplicity, move to next phase after any answer
        if (phase < this.state.boss.totalPhases) {
            this.state.boss.currentPhase = phase + 1;
            setTimeout(() => {
                this.sendBossPhase(phase + 1);
            }, 3000);
        } else {
            // Boss battle ended
            this.endBoss();
        }
    }

    private endBoss() {
        this.state.boss.isActive = false;

        // Calculate results
        const results: { oderId: string; score: number; win: boolean }[] = [];

        this.state.boss.playerScores.forEach((score, sessionId) => {
            const player = this.state.players.get(sessionId);
            const win = score >= 4; // Need 4/5 to win

            results.push({
                oderId: player?.oderId || sessionId,
                score,
                win,
            });
        });

        this.broadcast('boss_ended', {
            results,
            rewards: {
                xp: 500,
                coins: 100,
                badge: 'phishing_expert',
            },
        });
    }
}
