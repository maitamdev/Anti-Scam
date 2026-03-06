export interface Notification{id:string;userId:string;type:NotificationType;title:string;message:string;isRead:boolean;actionUrl?:string;createdAt:string}
export type NotificationType='SCAN_COMPLETE'|'REPORT_UPDATE'|'WATCHLIST_ALERT'|'SYSTEM'|'CAMPAIGN'|'SECURITY'
export interface NotificationPreferences{email:boolean;push:boolean;inApp:boolean;scanAlerts:boolean;reportUpdates:boolean;weeklyDigest:boolean}feat: add notification type definitions
