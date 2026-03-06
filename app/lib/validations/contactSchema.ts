import{z}from'zod'
export const contactSchema=z.object({name:z.string().min(2,'Ten qua ngan').max(100),email:z.string().email('Email khong hop le'),subject:z.string().min(5,'Chu de qua ngan').max(200),message:z.string().min(10,'Noi dung qua ngan').max(5000),category:z.enum(['support','bug','feature','partnership','other']).optional()})
export type ContactInput=z.infer<typeof contactSchema>feat: add Zod contact form validation schema
