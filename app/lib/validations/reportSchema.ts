import{z}from'zod'
export const reportSchema=z.object({url:z.string().url('URL khong hop le'),reason:z.enum(['phishing','scam','malware','spam','other']),description:z.string().max(2000).optional(),screenshot:z.string().optional()})
export const reportUpdateSchema=z.object({status:z.enum(['PENDING','APPROVED','REJECTED','SPAM','DUPLICATE']),moderatorNote:z.string().max(1000).optional()})
export type ReportInput=z.infer<typeof reportSchema>feat: add Zod report validation schemas
