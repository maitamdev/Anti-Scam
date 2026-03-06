import{z}from'zod'
export const createAlertSchema=z.object({title:z.string().min(5).max(200),summary:z.string().min(10),content:z.string().min(50),category:z.enum(['PHISHING','INVESTMENT','ROMANCE','JOB','PRIZE','IMPERSONATION','CRYPTO','OTHER']),severity:z.enum(['CRITICAL','HIGH','MEDIUM','LOW']),targetGroup:z.array(z.string()),platform:z.array(z.string())})
export type CreateAlertInput=z.infer<typeof createAlertSchema>feat: add Zod scam alert validation schema
