import{z}from'zod'
export const feedbackSchema=z.object({type:z.enum(['bug','feature','improvement','other']),title:z.string().min(5).max(200),description:z.string().min(10).max(5000),priority:z.enum(['low','medium','high']).optional(),email:z.string().email().optional()})
export type FeedbackInput=z.infer<typeof feedbackSchema>feat: add Zod feedback validation schema
