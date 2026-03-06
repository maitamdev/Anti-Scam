export interface QuizQuestion{id:string;question:string;options:string[];correctIndex:number;explanation:string;difficulty:'easy'|'medium'|'hard';category:string}
export interface QuizAttempt{questionId:string;selectedIndex:number;isCorrect:boolean;timeSpent:number}
export interface QuizResult{score:number;total:number;accuracy:number;timeSpent:number;answers:QuizAttempt[]}feat: add quiz type definitions
