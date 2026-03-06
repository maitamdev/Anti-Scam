import{z}from'zod'
export const createOrgSchema=z.object({name:z.string().min(2).max(100),industry:z.string().optional(),contactEmail:z.string().email().optional(),website:z.string().url().optional()})
export const inviteMemberSchema=z.object({email:z.string().email(),role:z.enum(['ADMIN','TRAINER','MEMBER']),message:z.string().max(500).optional()})
export type CreateOrgInput=z.infer<typeof createOrgSchema>feat: add Zod organization validation schemas
