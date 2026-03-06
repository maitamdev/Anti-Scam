export interface AnalyticsEvent{name:string;properties?:Record<string,unknown>;timestamp:number;userId?:string;sessionId:string}
export interface DashboardStats{totalScans:number;todayScans:number;safePercentage:number;dangerousCount:number;reportsReceived:number;activeUsers:number}
export interface ScanTrend{date:string;safe:number;caution:number;dangerous:number}feat: add analytics event type definitions
