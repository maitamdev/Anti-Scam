import{z}from'zod'
export const createPostSchema=z.object({title:z.string().min(5).max(200),content:z.string().min(50),excerpt:z.string().max(500).optional(),tags:z.array(z.string()).max(10).optional(),thumbnail:z.string().url().optional()})
export type CreatePostInput=z.infer<typeof createPostSchema>feat: add Zod blog post validation schemas
