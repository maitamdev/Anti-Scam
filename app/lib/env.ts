import{z}from'zod'
const envSchema=z.object({DATABASE_URL:z.string().min(1),NEXTAUTH_SECRET:z.string().min(1),ADMIN_SECRET:z.string().min(1),NEXTAUTH_URL:z.string().url().optional(),HUGGINGFACE_API_KEY:z.string().optional(),GROQ_API_KEY:z.string().optional(),STRIPE_SECRET_KEY:z.string().optional(),STRIPE_PUBLISHABLE_KEY:z.string().optional()})
export function validateEnv(){const result=envSchema.safeParse(process.env);if(!result.success){console.error('Invalid environment variables:',result.error.flatten().fieldErrors);throw new Error('Invalid environment variables')}return result.data}
export const env=typeof process!=='undefined'?validateEnv():({} as ReturnType<typeof validateEnv>)feat: add environment variable validation with Zod
