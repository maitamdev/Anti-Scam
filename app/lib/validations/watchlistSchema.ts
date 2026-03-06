import{z}from'zod'
export const addWatchlistSchema=z.object({type:z.enum(['DOMAIN','EMAIL','PHONE','BANK_ACCOUNT','SOCIAL_MEDIA']),value:z.string().min(1),name:z.string().max(100).optional(),notes:z.string().max(1000).optional(),alertEmail:z.boolean().optional(),alertInApp:z.boolean().optional()})
export type AddWatchlistInput=z.infer<typeof addWatchlistSchema>feat: add Zod watchlist validation schemas
