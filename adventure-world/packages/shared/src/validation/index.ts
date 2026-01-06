import { z } from 'zod';

// ==================== AUTH VALIDATION ====================

export const RegisterSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
    username: z.string()
        .min(3, 'Tên người dùng phải có ít nhất 3 ký tự')
        .max(20, 'Tên người dùng tối đa 20 ký tự')
        .regex(/^[a-zA-Z0-9_]+$/, 'Tên người dùng chỉ được chứa chữ, số và dấu gạch dưới'),
    password: z.string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .regex(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ hoa')
        .regex(/[a-z]/, 'Mật khẩu phải có ít nhất 1 chữ thường')
        .regex(/[0-9]/, 'Mật khẩu phải có ít nhất 1 số'),
});

export const LoginSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

// ==================== GAME VALIDATION ====================

export const MoveSchema = z.object({
    x: z.number().min(-1000).max(1000),
    y: z.number().min(0).max(100),
    z: z.number().min(-1000).max(1000),
    rotation: z.number().min(0).max(360),
    animation: z.enum(['idle', 'walk', 'run']),
});

export const InteractSchema = z.object({
    targetId: z.string().min(1),
    interactionType: z.enum(['talk', 'use', 'open']),
});

export const EnterPortalSchema = z.object({
    zoneId: z.enum(['z1', 'z2', 'z3', 'z4']),
    partyId: z.string().optional(),
});

// ==================== QUEST VALIDATION ====================

export const QuestStartSchema = z.object({
    questId: z.string().min(1),
});

export const QuestAnswerSchema = z.object({
    questId: z.string().min(1),
    answers: z.record(z.string(), z.string()),
});

export const BossAnswerSchema = z.object({
    phase: z.number().min(1).max(5),
    answerId: z.string().min(1),
});

// ==================== CHAT VALIDATION ====================

export const ChatMessageSchema = z.object({
    channel: z.string().max(50),
    content: z.string().min(1).max(500),
});

// ==================== SCAN VALIDATION ====================

export const ScanUrlSchema = z.object({
    url: z.string().url('URL không hợp lệ').max(2048),
});

export const ScanTextSchema = z.object({
    text: z.string().min(1).max(5000),
});

// ==================== REPORT VALIDATION ====================

export const ReportSchema = z.object({
    targetType: z.enum(['MESSAGE', 'USER', 'URL', 'CONTENT']),
    targetId: z.string().min(1),
    targetContent: z.string().optional(),
    reason: z.enum(['SPAM', 'SCAM_ATTEMPT', 'HARASSMENT', 'INAPPROPRIATE', 'IMPERSONATION', 'OTHER']),
    description: z.string().max(500).optional(),
});

// ==================== PROFILE VALIDATION ====================

export const UpdateProfileSchema = z.object({
    displayName: z.string().max(50).optional(),
    avatarId: z.string().optional(),
    titleId: z.string().optional(),
    bio: z.string().max(200).optional(),
});

// Type exports
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type MoveInput = z.infer<typeof MoveSchema>;
export type ChatMessageInput = z.infer<typeof ChatMessageSchema>;
export type ScanUrlInput = z.infer<typeof ScanUrlSchema>;
export type ScanTextInput = z.infer<typeof ScanTextSchema>;
export type ReportInput = z.infer<typeof ReportSchema>;
