import{z}from'zod'
export const createCampaignSchema=z.object({name:z.string().min(3).max(200),description:z.string().max(5000).optional(),type:z.enum(['TRAINING_7DAY','TRAINING_14DAY','TRAINING_30DAY','ONBOARDING','ASSESSMENT','PUBLIC_AWARENESS']),duration:z.number().min(1).max(90),questionsPerDay:z.number().min(1).max(20).optional(),isPublic:z.boolean().optional()})
export type CreateCampaignInput=z.infer<typeof createCampaignSchema>feat: add Zod campaign validation schemas
