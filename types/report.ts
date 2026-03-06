export interface Report{id:string;url:string;domain:string;reason:string;description?:string;screenshot?:string;status:'PENDING'|'APPROVED'|'REJECTED'|'SPAM'|'DUPLICATE';verified:boolean;createdAt:string}
export interface ReportSubmission{url:string;reason:string;description?:string;screenshot?:string}
export interface ReportStats{total:number;pending:number;approved:number;rejected:number}feat: add report type definitions
