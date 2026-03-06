export interface PhoneCheckResult{phone:string;isScam:boolean;reportCount:number;carrier?:string;lastReported?:string}
export interface EmailCheckResult{email:string;isScam:boolean;reportCount:number;domain:string;category?:string}
export interface WhoisResult{domain:string;registrar:string;createdDate:string;expiryDate:string;nameServers:string[];status:string}feat: add tool result type definitions
