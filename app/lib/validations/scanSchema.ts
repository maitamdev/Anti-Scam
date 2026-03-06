import{z}from'zod'
export const scanUrlSchema=z.object({url:z.string().min(1,'URL is required').max(2048,'URL too long').url('Invalid URL format'),source:z.enum(['web','api','extension']).optional().default('web')})
export const scanImageSchema=z.object({image:z.string().min(1,'Image is required'),format:z.enum(['base64','url']).optional().default('base64')})
export type ScanUrlInput=z.infer<typeof scanUrlSchema>
export type ScanImageInput=z.infer<typeof scanImageSchema>feat: add Zod scan validation schemas
