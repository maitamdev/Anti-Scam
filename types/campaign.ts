export interface Campaign{id:string;name:string;slug:string;description?:string;type:CampaignType;duration:number;status:'DRAFT'|'SCHEDULED'|'ACTIVE'|'COMPLETED'|'ARCHIVED';startDate?:string;endDate?:string}
export type CampaignType='TRAINING_7DAY'|'TRAINING_14DAY'|'TRAINING_30DAY'|'ONBOARDING'|'ASSESSMENT'|'PUBLIC_AWARENESS'
export interface CampaignEnrollment{campaignId:string;userId:string;currentDay:number;totalScore:number;status:'ACTIVE'|'COMPLETED'|'DROPPED'}feat: add campaign type definitions
