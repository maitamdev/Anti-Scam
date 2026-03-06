import{z}from'zod'
export const createApiKeySchema=z.object({name:z.string().min(1,'Ten khong duoc trong').max(50),expiresInDays:z.number().min(1).max(365).optional()})
export const updateApiKeySchema=z.object({name:z.string().min(1).max(50).optional(),isActive:z.boolean().optional()})
export type CreateApiKeyInput=z.infer<typeof createApiKeySchema>feat: add Zod API key validation schemas
