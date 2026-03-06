import{z}from'zod'
export const searchSchema=z.object({q:z.string().min(1).max(200),type:z.enum(['all','scans','reports','guides','tools']).optional(),page:z.number().min(1).optional(),limit:z.number().min(1).max(100).optional()})
export type SearchInput=z.infer<typeof searchSchema>feat: add Zod search validation schema
