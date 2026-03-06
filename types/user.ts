export interface User{id:string;email:string;name?:string;avatar?:string;role:'USER'|'ADMIN'|'MODERATOR';tier:'FREE'|'PRO'|'BUSINESS'|'ENTERPRISE';status:'ACTIVE'|'SUSPENDED'|'BANNED';createdAt:string}
export interface UserProfile extends User{totalScans:number;dailyScans:number;dailyImageScans:number;lastResetAt:string}
export interface UserPreferences{theme:'light'|'dark'|'system';language:'vi'|'en';emailNotifications:boolean;pushNotifications:boolean}
export type UserRole='USER'|'ADMIN'|'MODERATOR'feat: add user-related type definitions
