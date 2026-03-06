import{z}from'zod'
export const newsletterSchema=z.object({email:z.string().email('Email khong hop le'),name:z.string().max(100).optional(),topics:z.array(z.string()).optional()})
export type NewsletterInput=z.infer<typeof newsletterSchema>feat: add Zod newsletter validation schema
