import{z}from'zod'
export const updateProfileSchema=z.object({name:z.string().min(2,'Ten qua ngan').max(100).optional(),avatar:z.string().url().optional()})
export const changePasswordSchema=z.object({currentPassword:z.string().min(8),newPassword:z.string().min(8).regex(/[A-Z]/,'Can co chu hoa').regex(/[0-9]/,'Can co so'),confirmPassword:z.string()}).refine(d=>d.newPassword===d.confirmPassword,{message:'Mat khau khong khop',path:['confirmPassword']})
export type UpdateProfileInput=z.infer<typeof updateProfileSchema>feat: add Zod user validation schemas
