import{z}from'zod'
export const quizAnswerSchema=z.object({questionId:z.string(),selectedIndex:z.number().min(0).max(5),timeSpent:z.number().min(0)})
export const quizSubmitSchema=z.object({quizId:z.string(),answers:z.array(quizAnswerSchema).min(1),totalTime:z.number()})
export type QuizSubmitInput=z.infer<typeof quizSubmitSchema>feat: add Zod quiz validation schemas
